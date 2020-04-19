const AUTHORIZATION_ENDPOINT = '/services/oauth2/authorize';
const TOKEN_ENDPOINT = '/services/oauth2/token';
const IDENTITY_ENDPOINT = '/services/oauth2/userinfo';

function requestAuthorizationCode(client_id, domain) {
    var authorizationURL = new URL(
        domain || 'https://login.salesforce.com'
    );

    if (authorizationURL.pathname === '/') {
        authorizationURL.pathname = AUTHORIZATION_ENDPOINT;
    } else {
        authorizationURL.pathname += AUTHORIZATION_ENDPOINT;
    }

    authorizationURL.searchParams.append('response_type', 'code');
    authorizationURL.searchParams.append('show', 'popup');
    authorizationURL.searchParams.append('prompt', 'login');
    authorizationURL.searchParams.append('scope', [
        'web',
        'api',
        'refresh_token'
    ].join(' '));

    authorizationURL.searchParams.append('redirect_uri', chrome.identity.getRedirectURL());
    authorizationURL.searchParams.append('client_id', client_id);

    return new Promise((resolve, reject) => {
        chrome.identity.launchWebAuthFlow({
            url: authorizationURL.toString(),
            interactive: true
        }, function (redirect_uri) {
            if(!redirect_uri) {
                return reject('Could not load authorization page')
            }

            return resolve(new URL(redirect_uri).searchParams.get('code'));
        });
    });
}

function requestAccessToken(client_id, code, domain) {
    var tokenURL = new URL(
        domain || 'https://login.salesforce.com'
    );

    if (tokenURL.pathname === '/') {
        tokenURL.pathname = TOKEN_ENDPOINT;
    } else {
        tokenURL.pathname += TOKEN_ENDPOINT;
    }

    const body = new URLSearchParams();

    body.append('grant_type', 'authorization_code');
    body.append('client_id', client_id);
    body.append('code', code);
    body.append('redirect_uri', chrome.identity.getRedirectURL());

    return fetch(tokenURL.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        body: body
    }).then(response => {
        return response.json().then(jsonResponse => {
            if(!response.ok) {
                return Promise.reject(`${jsonResponse.error}: ${jsonResponse.error_description}`);
            }

            return jsonResponse;
        });
    });
}

function requestIdentity(authorization) {
    var identityURL = new URL(authorization.id);

    identityURL.pathname = IDENTITY_ENDPOINT;

    identityURL.searchParams.append('version', 'latest');
    identityURL.searchParams.append('format', 'json');
    identityURL.searchParams.append('oauth_token', authorization.access_token);

    return fetch(identityURL.toString()).then(response => {
        return response.json().then(identityResponse => {
            if(!response.ok) {
                return Promise.reject(`${identityResponse.error}: ${identityResponse.error_description}`);
            }

            return identityResponse;
        });
    });
}

function refreshToken(client_id, refresh_token, domain) {
    var tokenURL = new URL(
        domain || 'https://login.salesforce.com'
    );

    if (tokenURL.pathname === '/') {
        tokenURL.pathname = TOKEN_ENDPOINT;
    } else {
        tokenURL.pathname += TOKEN_ENDPOINT;
    }

    const body = new URLSearchParams();

    body.append('grant_type', 'refresh_token');
    body.append('client_id', client_id);
    body.append('refresh_token', refresh_token);
    body.append('redirect_uri', chrome.identity.getRedirectURL());

    return fetch(tokenURL.toString(), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        body: body
    }).then(response => {
        return response.json().then(jsonResponse => {
            if(!response.ok) {
                return Promise.reject(`${jsonResponse.error}: ${jsonResponse.error_description}`);
            }

            return jsonResponse;
        });
    });
}


class SalesforceProvider {
    client_id;
    client_secret;

    constructor(credentials = {}) {
        this.client_id = credentials.client_id;
        this.client_secret = credentials.client_secret;
    }

    authorize(options = {}) {
        return requestAuthorizationCode(this.client_id, options.domain).then(code => {
            return requestAccessToken(this.client_id, code, options.domain);
        }).then(authorization => {
            return requestIdentity(authorization).then(identity => {
                return {
                    identity: identity,
                    authorization: authorization
                }
            })
        });
    }

    refresh(authorization) {
        return refreshToken(
            this.client_id,
            authorization.refresh_token,
            authorization.instance_url
        ).then(auth => {
            authorization = Object.assign(authorization, auth);

            return requestIdentity(authorization);
        }).then(identity => {
            return {
                identity: identity,
                authorization: authorization
            };
        });
    }
}

export default SalesforceProvider;