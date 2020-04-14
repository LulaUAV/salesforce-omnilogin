import { LightningElement, track } from 'lwc';
import { store, navigate } from 'omnilogin/store';
import authProvider from 'omnilogin/authProvider';

export default class Home extends LightningElement {
    @track
    _sections = {}

    @track
    logins = {}

    isInit = false;
    activeSections = [];

    get sections() {
        let loginsBySection = {};

        this.activeSections = [];

        Object.values(this.logins).forEach(login => {
            if(!loginsBySection[login.sectionId]) {
                loginsBySection[login.sectionId] = [];
            }
            
            if(!this.filterBy) {
                loginsBySection[login.sectionId].push(login);
            } else if (login.name.toLowerCase().includes(this.filterBy.toLowerCase()) 
                        || login.username.includes(this.filterBy.toLowerCase()) 
            ) {
                loginsBySection[login.sectionId].push(login);
                this.activeSections.push(login.sectionId);
            }
        });
    

        return Object.values(this._sections).map(section => {
            return Object.assign({}, {
                logins: loginsBySection[section.id] || []
            }, section);
        })
    }

    @track
    filterBy = '';

    connectedCallback() {
        if(!this.isInit) {
            this.isInit = true;
            this._sections = store.getState().sections.byId;
            this.logins = store.getState().logins.byId;

            store.subscribe(() => {
                const state = store.getState();

                this._sections = state.sections.byId;
                this.logins = state.logins.byId;
                this.filterBy = state.application.ui.globalSearch.isActive? state.application.ui.globalSearch.text:'';
            });
        }
    }

    handleAction(event) {
        switch(event.detail.action) {
            case 'authorize-login':
                return store.dispatch(navigate('authorize-login', {
                    sectionId: event.detail.sectionId
                }));
            case 'edit-section':
                return store.dispatch(navigate('edit-section', {
                    sectionId: event.detail.sectionId
                }));
            case 'delete-section':
                return store.dispatch(navigate('delete-section', {
                    sectionId: event.detail.sectionId
                }));

            case 'delete-login':
                return store.dispatch(navigate('delete-login', {
                    loginId: event.detail.loginId
                }));

            case 'login-as':
                return authProvider.loginAs(event.detail.loginId);
            default: return Promise.resolve();
        }
    }
}
