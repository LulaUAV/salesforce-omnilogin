import { LightningElement } from 'lwc';
import { store, authorizeLogin } from 'omnilogin/store'

export default class NewLoginActions  extends LightningElement {
    registerLogin() {
        store.dispatch(authorizeLogin());
    }
}