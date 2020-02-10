import 'webextension-polyfill';
import oauthProvider from './modules/oauth';

function getCredentials() {
    return new Promise( (resolve, reject) => {
        chrome.storage.local.get('credentials', function (storedCredentials) {
            resolve(storedCredentials? storedCredentials.credentials:{});
        });
    });
}

function saveCredentials(credentials) {
    return getCredentials().then(storedCredentials => {
        storedCredentials = storedCredentials || {};
        storedCredentials[credentials.identity.user_id] = credentials;

        chrome.storage.local.set({ credentials: storedCredentials });
    });
}

function deleteCredentials(id) {
    return getCredentials().then(storedCredentials => {
        storedCredentials = storedCredentials || {};

        delete storedCredentials[id];

        chrome.storage.local.set({ credentials: storedCredentials });
    });
}

function loginAs(id) {
    return getCredentials().then(storedCredentials => {
        storedCredentials = storedCredentials || {};
        
        let credentials = storedCredentials[id] || {};

        oauthProvider.refresh(credentials.authorization).then(updatedCredentials => {
            chrome.tabs.create({
                url: `${updatedCredentials.authorization.instance_url}/secur/frontdoor.jsp?sid=${updatedCredentials.authorization.access_token}`
              });
            return saveCredentials(Object.assign(credentials, updatedCredentials));
        });
    });
}



chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    var keepOpened = false;

    if (message.namespace === 'omnilogin') {
        if (message.channel === 'oauth') {
            if (message.payload.method === 'authorize') {
                keepOpened = true;

                oauthProvider.authorize({
                    domain: message.payload.params.loginUrl
                }).then(credentials => {
                    credentials.sectionId = message.payload.params.sectionId;

                    saveCredentials(credentials).then( () => {
                        chrome.tabs.create({
                            url: `${credentials.authorization.instance_url}/secur/frontdoor.jsp?sid=${credentials.authorization.access_token}`
                          });
                    })
                });
            } else if (message.payload.method === 'getCredentials') {
                keepOpened = true;
                getCredentials().then( (credentials) => {
                    sendResponse(credentials);
                });
            } else if (message.payload.method === 'deleteCredentials') {
                keepOpened = true;
                deleteCredentials(message.payload.params.id).then( () => {
                    sendResponse();
                });
            } else if (message.payload.method === 'loginAs') {
                keepOpened = true;
                loginAs(message.payload.params.id).then( () => {
                    sendResponse();
                });
            }
        }


    }

    return keepOpened;
});