import { LightningElement, api } from 'lwc';
import { store, deleteLogin } from 'omnilogin/store';

export default class LoginEntry extends LightningElement {
    @api
    value;

    loginAs() {
        this.dispatchEvent(new CustomEvent('action', {
            detail: {
                action: 'login-as',
                loginId: this.value.id
            },
            bubbles: true,
            composed: true
        }));
        //window.open(`${this.value.instance_url}/secur/frontdoor.jsp?sid=${this.value.access_token}`);
    }


    dispatchActionEvent() {
        this.dispatchEvent(new CustomEvent('action', {
            detail: {
                action: 'delete-login',
                loginId: this.value.id
            },
            bubbles: true,
            composed: true
        }));
    }
}
