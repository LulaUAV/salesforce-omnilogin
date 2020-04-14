import { LightningElement, track } from 'lwc';
import { store } from 'omnilogin/store';

export default class ConfirmLoginAuthorization extends LightningElement {
    @track
    url = '';
    
    connectedCallback() {
        const draftLogin = store.getState().logins.draftValue;

        this.url = draftLogin.loginUrl;
    }
}
