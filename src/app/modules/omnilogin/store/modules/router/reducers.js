import { 
    ROUTER_NAVIGATE,
    ROUTER_BACK
} from './constants';

export default function router(
    state = {
        history: [],
        route: {
            name: 'main'
        }
    },
    action,
) {
    switch (action.type) {
        case ROUTER_NAVIGATE:   
                    
            return {
                history: state.history.concat([state.route]),
                route: {
                    name: action.name,
                    params: action.params
                }
            };

        case ROUTER_BACK:
            let route = state.history.length? state.history.pop():state.route;
            
            return {
                history: state.history,
                route: route
            };

        default:
            return state;
    }
}
