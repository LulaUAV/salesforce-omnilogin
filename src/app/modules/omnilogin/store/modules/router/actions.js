import { 
    ROUTER_NAVIGATE,
    ROUTER_BACK
} from './constants';

export function navigate(name, params) {
    return {
        type: ROUTER_NAVIGATE,
        name: name,
        params: params
    };
}

export function back() {
    return {
        type: ROUTER_BACK
    };
}