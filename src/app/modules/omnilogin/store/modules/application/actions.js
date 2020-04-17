import {
    GLOBAL_SEARCH_DISABLED,
    GLOBAL_SEARCH_ENABLED,
    GLOBAL_SEARCH_TEXT_CHANGED,
    NOTIFICATION_SHOW,
    NOTIFICATION_CLOSE,
    SCOPED_NOTIFICATION_SHOW,
    SCOPED_NOTIFICATION_CLOSE
} from './constants';

export function globalSearchEnabled() {
    return {
        type: GLOBAL_SEARCH_ENABLED
    };
}

export function globalSearchDisabled() {
    return {
        type: GLOBAL_SEARCH_DISABLED
    };
}

export function globalSearchTextChanged(searchText) {
    return {
        type: GLOBAL_SEARCH_TEXT_CHANGED,
        text: searchText
    };
}

export function showScopedNotification(notification) {
    return {
        type: SCOPED_NOTIFICATION_SHOW,
        variant: notification.variant,
        title: notification.title,
        message: notification.message
    };
}

export function closeScopedNotification() {
    return {
        type: SCOPED_NOTIFICATION_CLOSE
    };
}

export function showNotification(notification) {
    return function (dispatch) {
        const notificationId = Date.now();

        setTimeout(() => {
            dispatch(closeNotification(notificationId))
        }, 5000);

        return dispatch({
            type: NOTIFICATION_SHOW,
            id: notificationId,
            variant: notification.variant,
            title: notification.title,
            message: notification.message
        });
    }
}

export function closeNotification(id) {
    return {
        type: NOTIFICATION_CLOSE,
        id: id
    };
}
