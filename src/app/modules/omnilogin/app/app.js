import { LightningElement, track  } from 'lwc';
import Home from 'view/home';
import NewLogin from 'view/newLogin';
import NewLoginActions from 'view/newLoginActions';
import EditSection from 'view/editSection';
import EditSectionActions from 'view/editSectionActions';
import DeleteSection from 'view/deleteSection';
import DeleteSectionActions from 'view/deleteSectionActions';
import DeleteLogin from 'view/deleteLogin';
import DeleteLoginActions from 'view/deleteLoginActions';
import HomeActions from 'view/homeActions';
import { 
    store, 
    fetchLogins,
    back,
    globalSearchEnabled, 
    globalSearchDisabled, 
    globalSearchTextChanged
} from 'omnilogin/store';

export default class App extends LightningElement {
    @track title;
    @track showBackButton;
    @track iconName;
    @track showActionBar = false;
    
    @track 
    _allowSearch = false;

    get allowSearch() {
        return this.allowSearch;
    }

    set allowSearch(value) {
        this._allowSearch = value;
        
        if(value) {
            store.dispatch(globalSearchEnabled());
        } else {
            store.dispatch(globalSearchDisabled());
        }
    }

    @track
    route = 'main';

    isInit = false;

    @track
    viewTitle = 'OmniLogin';

    @track
    allowSearchOnView = false;

    routes = {
        'main': {
            views: {
                'main': {
                    tagName: 'view-home',
                    component: Home,
                    transition: 'slideIn'
                },
                'header-controls': {
                    tagName: 'view-home-actions',
                    component: HomeActions,
                    transition: 'fade'
                }
            },
            attributes: {
                allowSearchOnView: true,
                showBackButton: false,
                viewTitle: 'OmniLogin',
                showActionBar: false
            }
        },
        'new-entry': {
            views: {
                'main': {
                    tagName: 'view-new-login',
                    component: NewLogin,
                    transition: 'slideOut'
                },
                'header-actions': {
                    tagName: 'view-new-login-actions',
                    component: NewLoginActions,
                    transition: 'fade'
                }
            },
            attributes: {
                allowSearchOnView: false,
                viewTitle: 'New Login',
                showActionBar: false,
                showBackButton: true,
            }
        },
        'edit-section': {
            views: {
                'main': {
                    tagName: 'view-edit-section',
                    component: EditSection,
                    transition: 'slideOut'
                },
                'header-actions': {
                    tagName: 'view-edit-section-actions',
                    component: EditSectionActions,
                    transition: 'fade'
                },
            },
            attributes: {
                allowSearchOnView: false,
                viewTitle: 'New Section',
                showActionBar: false,
                showBackButton: true
            }
        },
        'delete-section': {
            views: {
                'main': {
                    tagName: 'view-delete-section',
                    component: DeleteSection,
                    transition: 'slideOut'
                },
                'header-actions': {
                    tagName: 'view-delete-section-actions',
                    component: DeleteSectionActions,
                    transition: 'fade'
                },
            },
            attributes: {
                allowSearchOnView: false,
                viewTitle: 'Delete Section',
                showActionBar: false,
                showBackButton: true
            }
        },
        'delete-login': {
            views: {
                'main': {
                    tagName: 'view-delete-login',
                    component: DeleteLogin,
                    transition: 'slideOut'
                },
                'header-actions': {
                    tagName: 'view-delete-login-actions',
                    component: DeleteLoginActions,
                    transition: 'fade'
                },
            },
            attributes: {
                allowSearchOnView: false,
                viewTitle: 'Delete Login',
                showActionBar: false,
                showBackButton: true
            }
        }
    }

    connectedCallback() {
        store.dispatch(fetchLogins());
        store.subscribe(() => {
            const route = store.getState().router.route;

            if(route.name && this.route !== route.name) {
                this.route = route.name || 'main';
                this.setView(route.params);    
            }
        });
    }

    renderedCallback() {
        if (!this.isInit) {
            this.isInit = true;
            this.setView('main', 'no-transition');
        }
    }

    setView(props={}, transition) {
        let routeConfig = this.routes[this.route] || {};

        this.template.querySelectorAll('omnilogin-route-view').forEach(view => {
            let routeViewConfig = routeConfig.views[view.name] || {};

            view.setView(
                routeViewConfig.tagName,
                routeViewConfig.component,
                props,
                transition || routeViewConfig.transition
            );
        });

        this.allowSearchOnView = routeConfig.attributes.allowSearchOnView || false;
        this.showBackButton = routeConfig.attributes.showBackButton || false;
        this.viewTitle = routeConfig.attributes.viewTitle || '';
        this.showActionBar = routeConfig.attributes.showActionBar || false;
    }

    goBack(event) {
        event.stopPropagation();

        store.dispatch(back());
    }

    globalSearch(event) {
        event.stopPropagation();

        if(event.detail.text === undefined) {
            if(event.detail.enabled) {
                store.dispatch(globalSearchEnabled());
            } else {
                store.dispatch(globalSearchDisabled());
            }
           
        } else {
            store.dispatch(globalSearchTextChanged(event.detail.text));
        }

        
    }
}
