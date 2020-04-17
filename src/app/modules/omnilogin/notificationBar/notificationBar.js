import { LightningElement, track } from 'lwc';
import { store, closeNotification, closeScopedNotification,showNotification } from 'omnilogin/store'

export default class NotificationBar extends LightningElement {
    @track
    scopedNotification = {};

    @track
    notifications = [];

    get showScoped() {
        return this.scopedNotification.message || this.scopedNotification.title? true:false;
    }

    connectedCallback() {
        store.subscribe(() => {
            const state = store.getState();

            this.notifications = Object.values(state.application.notifications);
            this.scopedNotification = state.application.ui.notification;
        });
    }

    closeNotification(event) {
        store.dispatch(closeNotification(event.detail.id));
    }

    closeScopedNotification(event) {
        store.dispatch(closeScopedNotification());
    }

    showNotif() {
        store.dispatch(showNotification({
            title: 'HOLA!'
        }));
    }
}