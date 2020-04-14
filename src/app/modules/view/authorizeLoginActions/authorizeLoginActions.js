import { LightningElement } from 'lwc';
import { store, navigate } from 'omnilogin/store'

export default class AuthorizeLoginActions  extends LightningElement {
    next() {
        store.dispatch(navigate('confirm-login-authorization'));
    }
}