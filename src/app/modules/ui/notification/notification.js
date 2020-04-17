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