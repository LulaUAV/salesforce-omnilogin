import { LightningElement, track, api } from 'lwc';
import { store, draftLogin } from 'omnilogin/store';

export default class NewLogin extends LightningElement {
    @api
    sectionId = '';

    @track
    loginType = 'production';

    get options() {
        return [{
            label: 'Production',
            value: 'production'
        },
        {
            label: 'Sandbox',
            value: 'sandbox'
        },
        {
            label: 'Custom',
            value: 'custom'
        }]
    }

    get isStandardUrl() {
        return this.loginType !== 'custom';
    }
    
    connectedCallback() {
        this.setURLFromLoginType();
        store.dispatch(draftLogin({
            sectionId: this.sectionId,
            loginUrl: this.url
        }));
    }


    setLoginUrl(changeEvent) {
        var changes = changeEvent.detail;

        if(this.loginType !== changes.selectValue) {
            this.loginType = changes.selectValue;
            this.setURLFromLoginType();
        } else {
            this.url = changes.inputValue;
        }
        
        store.dispatch(draftLogin({
            sectionId: this.sectionId,
            loginUrl: this.url
        }));
    }

    setURLFromLoginType() {
        if(this.loginType === 'production') {
            this.url = 'login.salesforce.com';
        } else if(this.loginType === 'sandbox') {
            this.url = 'test.salesforce.com';
        } else {
            this.url = '';
        }
    }
}
