import { 
    LOGIN_CREATE_AUTHORIZE,
    LOGIN_CREATE_DRAFT,
    LOGIN_UPDATE,
    LOGIN_DELETE,
    LOGIN_FETCH
 } from './constants';
 import authProvider from 'omnilogin/authProvider';

export function authorizeLogin() {
    return function(dispatch, getState) {
        var draftLoginValue = getState().logins.draftValue;

        return authProvider.authorize({
            loginUrl: `https://${draftLoginValue.loginUrl}`,
            sectionId: draftLoginValue.sectionId
        });
    }
}

export function draftLogin(login) {
    return {
        type: LOGIN_CREATE_DRAFT,
        loginUrl: login.loginUrl,
        sectionId: login.sectionId
    };
}

export function updateLogin(login) {
    return {
        type: LOGIN_UPDATE,
        id: login.id,
        login: login
    };
}

export function deleteLogin(loginId) {
    return function(dispatch) {
        authProvider.deleteCredentials(loginId).then(() => {
            return dispatch({
                type: LOGIN_DELETE,
                id: loginId
            });
        });
    }
}

export function fetchLogins() {
    return function(dispatch) {
        authProvider.getCredentials().then(credentials => {
            return dispatch({
                type: LOGIN_FETCH,
                logins: credentials || {}
            });
        });
    }
}
