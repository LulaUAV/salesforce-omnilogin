import { LightningElement, api, track } from 'lwc';

export default class Input extends LightningElement {
    @api
    label = '';


    @track
    _name = '';

    @api
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
        this.setAttribute('name', value);
    }

    @track
    _value = '';

    @api
    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
        this.setAttribute('value', this.value);

        if (value || this.isFocused) {
            this.isLabelShown = true;
        } else {
            this.isLabelShown = false;
        }
    }

    @api
    labelVariant = 'static';

    @api
    outline = false;

    @api
    required = false;

    @api
    readOnly = false;

    @api
    placeholder = '';

    @api
    type = 'text';

    @track
    _errorMessage = '';

    @api
    get errorMessage() {
        return this._errorMessage;
    }

    set errorMessage(value) {
        var errorMessageElement = this.template.querySelector('.slds-form-element__help');

        if (errorMessageElement) {
            if (value !== this._errorMessage) {
                if (value) {
                    errorMessageElement.animate([
                        { transform: `scale(0)`, offset: 0 },
                        { transform: `scale(1)`, offset: 1 },
                    ],
                        {
                            duration: 250,
                            iterations: 1,
                            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'
                        }
                    );

                    this._errorMessage = value;
                } else {
                    errorMessageElement.animate([
                        { transform: `scale(1)`, offset: 0 },
                        { transform: `scale(0)`, offset: 1 },
                    ],
                        {
                            duration: 250,
                            iterations: 1,
                            easing: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)'
                        }
                    ).onfinish = () => {
                        this._errorMessage = '';
                    }
                }
            } else {
                this._errorMessage = value;
            }
        }
    }

    @track
    isLabelShown = false;

    @track
    isFocused = false;

    changeTimeout = null;

    get outerClass() {
        let classes = ['slds-form-element'];

        if (this.labelVariant === 'floating') {
            classes.push('floating-label');

            if (!this.isLabelShown) {
                classes.push('floating-label_static');
            }
        }

        if (!this.outline) {
            classes.push('outlineless');
        }

        if (this.errorMessage) {
            classes.push('slds-has-error');
        }

        return classes.join(' ');
    }


    get computedPlaceholder() {
        if (this.labelVariant === 'floating') {
            return '';
        }

        return this.placeholder;
    }

    showLabel(event) {
        this.isFocused = true;
        this.isLabelShown = true;
    }

    hideLabel(event) {
        this.isFocused = false;
        this.isLabelShown = !this.value ? false : true;
    }

    handleChange(event) {
        const newValue = this.template.querySelector('input').value;

        if (this.value !== newValue) {
            this.value = newValue;
            this.dispatchEvent(new CustomEvent('change', {
                detail: {
                    value: newValue
                },
                bubbles: true,
                composed: true
            }))
        }
    }

    handleDeferredChange(event) {
        clearTimeout(this.changeTimeout);

        this.changeTimeout = setTimeout(() => {
            this.handleChange(event);
        }, 250);
    }

    @api
    reportValidity() {
        if (this.required && !this.value) {
            this.errorMessage = 'The value is required';

            return true;
        }

        this.errorMessage = '';

        return false;
    }
}
