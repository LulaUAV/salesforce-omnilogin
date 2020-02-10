import { LightningElement, track } from 'lwc';
import { store, saveSection, navigate } from 'omnilogin/store'

export default class EditSectionActions  extends LightningElement {
    @track
    disabled = true;

    connectedCallback() {
        store.subscribe(() => {
            const sections = store.getState().sections;

            this.disabled = !sections.draftValue.id || sections.draftValue.hasError;
        });
    }

    saveSection() {
        store.dispatch(saveSection(store.getState().sections.draftValue));
        store.dispatch(navigate('main'));
    }
}