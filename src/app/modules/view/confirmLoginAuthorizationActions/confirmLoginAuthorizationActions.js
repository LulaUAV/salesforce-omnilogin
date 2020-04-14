import { LightningElement } from 'lwc';
import { store, authorizeLogin } from 'omnilogin/store'

export default class ConfirmLoginAuthorizationActions  extends LightningElement {
    authorizeLogin() {
        store.dispatch(authorizeLogin());
    }
}