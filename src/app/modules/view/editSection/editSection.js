import { LightningElement, track, api } from 'lwc';
import { store, draftSection } from 'omnilogin/store';

export default class EditSection extends LightningElement {
    @api sectionId;

    @track label = ''
    @track description = '';

    connectedCallback() {
        const sections = store.getState().sections;
        const currentSection = sections.byId[this.sectionId];

        if(currentSection) {
            store.dispatch(draftSection(currentSection));
            this.label = currentSection.label;
            this.description = currentSection.description;
        }
    }

    saveChanges(event) {
        const section = {
            id: this.sectionId,
            hasError: false
        };

        event.stopPropagation();
        
        this.template.querySelectorAll('ui-input').forEach(input => {
            section[input.name] = input.value;

            section.hasError = section.hasError || input.reportValidity();
        });

        store.dispatch(draftSection(section));    
    }
    
}
