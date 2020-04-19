import { LightningElement, api, track } from 'lwc';

export default class Notification extends LightningElement {
    @api
    notificationId = '';

    @api
    title = '';

    @api
    message = '';

    @api
    type = '';

    @api
    variant = 'default';

    get themeClass() {
        return `container ${this.type} ${this.variant}`;
    } 

    get themeIcon() {
        if(this.variant === 'error' || this.variant === 'warning') {
            return 'utility:warning';
        }

        return 'utility:info';
    } 


    dispatchCloseEvent() {
        const closeEvent = new CustomEvent('close', {
            detail: {
                id: this.notificationId
            },
            composed: true
        });

        this.dispatchEvent(closeEvent);
    }
}