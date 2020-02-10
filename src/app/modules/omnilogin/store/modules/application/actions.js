import { GLOBAL_SEARCH_DISABLED, GLOBAL_SEARCH_ENABLED, GLOBAL_SEARCH_TEXT_CHANGED } from './constants';

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
