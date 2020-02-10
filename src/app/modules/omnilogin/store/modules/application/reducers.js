import { GLOBAL_SEARCH_DISABLED, GLOBAL_SEARCH_ENABLED, GLOBAL_SEARCH_TEXT_CHANGED } from './constants';

export default function application(
    state = {
        ui: {
            globalSearch: {
                isActive: false,
                text: ''
            }
        }
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

        default:
            return state;
    }
}
