import {
    GLOBAL_SEARCH_DISABLED,
    GLOBAL_SEARCH_ENABLED,
    GLOBAL_SEARCH_TEXT_CHANGED,
    NOTIFICATION_SHOW,
    NOTIFICATION_CLOSE,
    SCOPED_NOTIFICATION_SHOW,
    SCOPED_NOTIFICATION_CLOSE
} from './constants';

export default function application(
    state = {
        ui: {
            globalSearch: {
                isActive: false,
                text: ''
            },
            notification: {}
        },
        notifications: []
    },
    action,
) {
    switch (action.type) {
        case GLOBAL_SEARCH_DISABLED:
            return {
                ...state,
                ui: {
                    ...state.ui,
                    globalSearch: {
                        isActive: false,
                        text: ''
                    }
                }
            };

        case GLOBAL_SEARCH_ENABLED:
            return {
                ...state,
                ui: {
                    ...state.ui,
                    globalSearch: {
                        isActive: true,
                        text: ''
                    }
                }
            };

        case GLOBAL_SEARCH_TEXT_CHANGED:
            return {
                ...state,
                ui: {
                    ...state.ui,
                    globalSearch: {
                        ...state.ui.globalSearch,
                        text: action.text
                    }
                }
            };

        case NOTIFICATION_SHOW: 
            return {
                ...state,
                notifications: {
                    ...state.notifications,
                    [action.id]: {
                        id: action.id,
                        variant: action.variant,
                        title: action.title,
                        message: action.message
                    }
                }
            };

        case NOTIFICATION_CLOSE:
            let notifications = Object.assign({}, {}, state.notifications);

            delete notifications[action.id];

            return {
                ...state,
                notifications: notifications
            }; 

        case SCOPED_NOTIFICATION_SHOW:
            return {
                ...state,
                ui: {
                    ...state.ui,
                    notification: {
                        variant: action.variant,
                        message: action.message,
                        title: action.title
                    }
                }
            };
        case SCOPED_NOTIFICATION_CLOSE:
            return {
                ...state,
                ui: {
                    ...state.ui,
                    notification: {}
                }
            };

        default:
            return state;
    }
}
