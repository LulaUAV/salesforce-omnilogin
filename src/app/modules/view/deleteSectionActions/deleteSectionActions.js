import { LightningElement, api } from 'lwc';
import { store, deleteSection, navigate } from 'omnilogin/store'

export default class DeleteSectionActions  extends LightningElement {
    @api
    sectionId = '';

    deleteSection() {
        store.dispatch(deleteSection(this.sectionId));
        store.dispatch(navigate('main'));
    }
}