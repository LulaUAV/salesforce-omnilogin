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
}
