const AUTHORIZATION_ENDPOINT = '/services/oauth2/authorize';
const TOKEN_ENDPOINT = '/services/oauth2/token';
const IDENTITY_ENDPOINT = '/services/oauth2/userinfo?version=latest';

function requestAuthorizationCode(client_id, domain) {
    var authorizationURL = new URL(
        AUTHORIZATION_ENDPOINT,
        domain || 'https://login.salesforce.com'
    );

    authorizationURL.searchParams.append('response_type', 'code');
    authorizationURL.searchParams.append('show', 'popup');
    authorizationURL.searchParams.append('prompt', 'login');
    authorizationURL.searchParams.append('scope', 'web refresh_token');

    authorizationURL.searchParams.append('redirect_uri', chrome.identity.getRedirectURL());
    authorizationURL.searchParams.append('client_id', client_id);

    return new Promise((resolve, reject) => {
        chrome.identity.launchWebAuthFlow({
            url: authorizationURL.toString(),
            interactive: true
        }, function (redirect_uri) {
            return resolve(new URL(redirect_uri).searchParams.get('code'));
        });
    });
}

function requestAccessToken(client_id, code, domain) {
    var tokenURL = new URL(
        TOKEN_ENDPOINT,
        domain || 'https://login.salesforce.com'
    );

    tokenURL.searchParams.append('grant_type', 'authorization_code');

    tokenURL.searchParams.append('code', code);
    tokenURL.searchParams.append('redirect_uri', chrome.identity.getRedirectURL());
    tokenURL.searchParams.append('client_id', client_id);
    tokenURL.searchParams.append('format', 'json');

    return fetch(tokenURL.toString()).then(response => {
        return response.json();
    });
}

function requestIdentity(access_token, domain) {
    var identityURL = new URL(
        IDENTITY_ENDPOINT,
        domain || 'https://login.salesforce.com'
    );

    return fetch(`${identityURL}&oauth_token=${access_token}`).then(response => {
        return response.json().then(identity => {
            return identity;
        });
    });
}

function refreshToken(client_id, refresh_token, domain) {
    var tokenURL = new URL(
        TOKEN_ENDPOINT,
        domain || 'https://login.salesforce.com'
    );

    tokenURL.searchParams.append('grant_type', 'refresh_token');
    tokenURL.searchParams.append('format', 'json');
    tokenURL.searchParams.append('redirect_uri', chrome.identity.getRedirectURL());
    tokenURL.searchParams.append('client_id', client_id);
    tokenURL.searchParams.append('refresh_token', refresh_token);
    
    return fetch(tokenURL.toString(), { method: 'POST'}).then(response => {
        return response.json();
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
            return requestIdentity(authorization.access_token, authorization.instance_url).then(identity => {
                return {
                    identity: identity,
                    authorization: authorization
                }
            })
        });
    }

    refresh(authorization) {
        return refreshToken(this.client_id, authorization.refresh_token, authorization.instance_url).then(auth => {
            authorization = Object.assign(authorization, auth);

            return requestIdentity(authorization.access_token, authorization.instance_url)
        }).then(identity => {
            return {
                identity: identity,
                authorization: authorization
            };
        });
    }
}

export default SalesforceProvider;