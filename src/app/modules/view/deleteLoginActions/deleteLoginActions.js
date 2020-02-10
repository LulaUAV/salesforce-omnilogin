import { LightningElement, api } from 'lwc';
import { store, deleteLogin, navigate } from 'omnilogin/store'

export default class DeleteSectionActions  extends LightningElement {
    @api
    loginId = '';

    deleteSection() {
        store.dispatch(deleteLogin(this.loginId));
        store.dispatch(navigate('main'));
    }
}