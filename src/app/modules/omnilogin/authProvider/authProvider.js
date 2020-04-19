function sendMessage(payload) {
    return new Promise( (resolve, reject) => {
        chrome.runtime.sendMessage({
            namespace: 'omnilogin',
            channel: 'oauth',
            payload: payload
        }, function (response) {
            if(response.success) {
                return resolve(response.payload);
            }

            return reject(response.error);
        });
    });
}

function getCredentials() {
    return sendMessage({
        method: 'getCredentials'
    });
}

function authorize(loginData) {
    return sendMessage({
        method: 'authorize',
        params: loginData
    });
}

function deleteCredentials(loginId) {
    return sendMessage({
        method: 'deleteCredentials',
        params: {
            id: loginId
        }
    });
}

function loginAs(loginId) {
    return sendMessage({
        method: 'loginAs',
        params: {
            id: loginId
        }
    });
}


export default {
    authorize: authorize,
    getCredentials: getCredentials,
    deleteCredentials: deleteCredentials,
    loginAs: loginAs
};