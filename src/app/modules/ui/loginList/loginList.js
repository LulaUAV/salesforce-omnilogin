import { LightningElement, api } from 'lwc';
import {store, navigate} from 'omnilogin/store';

export default class LoginList extends LightningElement {
    @api sections = [];
    @api activeSections = [];

    dispatchActionEvent(event) {
        this.dispatchEvent(new CustomEvent('action', {
            detail: {
                action: event.target.dataset.action,
                sectionId: event.target.dataset.sectionId,
                loginId: null
            },
            bubbles: true,
            composed: true
        }));
    }
    /*addLogin(event) {
        this.dispatchEvent(new CustomEvent('route', {
            detail: {
                route: 'new-entry',
                params: {
                    sectionId: event.target.dataset.sectionId
                }
            },
            bubbles: true,
            composed: true
        }))
    }

    editSection(event) {
        store.dispatch(navigate('edit-section', {
            sectionId: event.target.dataset.sectionId
        }));
        /*this.dispatchEvent(new CustomEvent('route', {
            detail: {
                route: 'edit-section',
                params: {
                    sectionId: event.target.dataset.sectionId
                }
            },
            bubbles: true,
            composed: true
        }))
    }

    removeSection(event) {
        this.dispatchEvent(new CustomEvent('route', {
            detail: {
                route: 'delete-section',
                params: {
                    sectionId: event.target.dataset.sectionId
                }
            },
            bubbles: true,
            composed: true
        }));
    }*/
}
