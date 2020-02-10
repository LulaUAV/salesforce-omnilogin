import { LightningElement } from 'lwc';
import { store, navigate } from 'omnilogin/store';

export default class HomeActions extends LightningElement {
    addSection() {
        store.dispatch(navigate('edit-section'));
    }
}