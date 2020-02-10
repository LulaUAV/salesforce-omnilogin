import { LightningElement, api } from 'lwc';

export default class ComboInput extends LightningElement {
    @api
    label = '';

    @api
    readOnly = false;

    @api
    placeholder = '';

    @api
    type = 'text';

    @api
    options = [];

    @api
    selectValue;

    @api
    inputValue = '';

    handleChange(event) {
        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                selectValue: this.template.querySelector('select').value,
                inputValue: this.template.querySelector('input').value,
            }
        }))
    }
}
