import { LightningElement, track } from 'lwc';
import {store} from 'omnilogin/store';

export default class Breadcrumbs extends LightningElement {
    @track
    heading = '';
    @track
    subheading = '';

    @track
    _currentRoute = '';

    get currentRoute() {
        return this._currentRoute;
    }

    set currentRoute(value) {
        let oldValue = this._currentRoute;

        this._currentRoute = value;

        if(value !== oldValue) {
            switch(this._currentRoute) {
                case 'edit-section':
                    this.setEditSectionDetails();
                    break;

                case 'delete-section':
                    this.setDeleteSectionDetails();
                    break;

                case 'authorize-login':
                    this.setNewLoginDetails();
                    break;

                case 'confirm-login-authorization':
                    this.setConfirmLoginDetails();
                    break;

                case 'delete-login':
                    this.setDeleteLoginDetails();
                    break;
                default:
                    this.heading = '';
                    this.subheading = '';
            }
        }
    }

    connectedCallback() {
        this.currentRoute = store.getState().router.route.name;

        store.subscribe(() => {
            this.currentRoute = store.getState().router.route.name;
        })
    }

    setNewLoginDetails() {
        const state = store.getState();
        var currentSectionId = state.router.route.params? state.router.route.params.sectionId:'';
        var sections = state.sections.byId;


        this.heading = 'New Login';
        this.subheading = sections[currentSectionId].label;
    }

    setConfirmLoginDetails() {
        this.heading = 'Confirm New Login';
        this.subheading = '';
    }

    setEditSectionDetails() {
        const state = store.getState();
        var currentSectionId = state.router.route.params? state.router.route.params.sectionId:'';
        var sections = state.sections.byId;

        if(!currentSectionId) {
            this.heading = 'New Section';
            this.subheading = '';
        } else {
            this.heading = 'Edit Section';
            this.subheading = sections[currentSectionId].label;
        }
    }

    setDeleteSectionDetails() {
        const state = store.getState();

        var currentSectionId = state.router.route.params? state.router.route.params.sectionId:'';
        var sections = state.sections.byId;

        this.heading = 'Delete Section';
        this.subheading = sections[currentSectionId].label;
    }

    setDeleteLoginDetails() {
        const state = store.getState();
        var currentLoginId = state.router.route.params? state.router.route.params.sectionId:'';
        var logins = state.logins.byId;

        this.subheading = logins[currentLoginId].username;
        this.heading = 'Delete Login';
    }
}
