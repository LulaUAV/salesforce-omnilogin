import { 
    LOGIN_CREATE_AUTHORIZE,
    LOGIN_CREATE_DRAFT,
    LOGIN_UPDATE,
    LOGIN_DELETE,
    LOGIN_FETCH
 } from './constants';
 import authProvider from 'omnilogin/authProvider';
 import { showNotification } from '../application/actions';

export function authorizeLogin() {
    return function(dispatch, getState) {
        var draftLoginValue = getState().logins.draftValue;

        return authProvider.authorize({
            loginUrl: `https://${draftLoginValue.loginUrl}`,
            sectionId: draftLoginValue.sectionId
        }).then(() => {
            dispatch(showNotification({
                variant: 'success',
                title: 'Authorization Successful',
                message: 'The login has been saved.'
            }));
        }).catch((error) => {
            dispatch(showNotification({
                variant: 'error',
                title: 'Authorization Error',
                message: error
            }));
        })
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
        }).catch((error) => {
            return dispatch(showNotification({
                variant: 'error',
                title: 'Delete Error',
                message: error
            }));
        })
    }
}

export function fetchLogins() {
    return function(dispatch) {
        return authProvider.getCredentials().then(credentials => {
            return dispatch({
                type: LOGIN_FETCH,
                logins: credentials || {}
            });
        }).catch((error) => {
            dispatch(showNotification({
                variant: 'error',
                title: 'Error',
                message: error
            }));
        })
    }
}

export function loginAs(id) {
    return function(dispatch, getState) {
        return authProvider.loginAs(id).catch((error) => {
            return dispatch(showNotification({
                variant: 'error',
                title: 'Login Error',
                message: error
            }));
        })
    }
}
