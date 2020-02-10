import { 
    LOGIN_CREATE_DRAFT,
    LOGIN_UPDATE,
    LOGIN_DELETE,
    LOGIN_FETCH
 } from './constants';


function Login(credentials) {
    return {
        id: credentials.identity.user_id,
        sectionId: credentials.sectionId,
        username: credentials.identity.preferred_username,
        email: credentials.identity.email,
        name: credentials.identity.name,
        photo: credentials.identity.photos.thumbnail,
        access_token: credentials.authorization.access_token,
        instance_url: credentials.authorization.instance_url,
    }
}

export default function logins(
    state = {
        byId: {},
        draftValue: {}
    },
    action,
) {
    switch (action.type) {
        case LOGIN_UPDATE:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: Object.assign(
                        {},
                        state[action.id], 
                        action.login
                    )
                }
                
            };

        case LOGIN_DELETE:
            delete state.byId[action.id];
            
            return {
                ...state
            };

        case LOGIN_FETCH:
            let loginsById = Object.values(action.logins).reduce((previousValue, currentValue) => {
                let newLogin = new Login(currentValue);

                previousValue[newLogin.id] = newLogin;

                return previousValue;
            }, {});
            
            return {
                ...state,
                byId: loginsById
            }

        case LOGIN_CREATE_DRAFT:
            return {
                ...state,
                draftValue: {
                    sectionId: action.sectionId,
                    loginUrl: action.loginUrl,
                }
            };
    
        default:
            return state;
    }
}
