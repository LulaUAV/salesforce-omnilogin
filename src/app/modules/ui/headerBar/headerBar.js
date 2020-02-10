import { LightningElement, track, api } from 'lwc';
export default class HeaderBar extends LightningElement {
    @api title;
    @api subtitle = 'Test';
    @api showBackButton;

    @track
    _allowSearch;

    @api 
    get allowSearch() {
        return this._allowSearch;
    }
    set allowSearch(value) {
        this._allowSearch = value;
        this.isSearching = false;
    }
    
    @track 
    _isSearching = false;

    get isSearching() {
        return this._isSearching;
    }
    set isSearching(value) {
        this._isSearching = value;

        this.dispatchEvent(new CustomEvent('globalsearch', {
            detail: {
                enabled: this.isSearching
            }
        }));
    }

    searchTimeout = null;

    get hasStringTitle() {
        return this.title? true:false;
    }

    toggleSearch() {
        this.isSearching = !this.isSearching;
    }

    dispatchSearchEvent(event) {
        clearTimeout(this.searchInterval);

        this.searchInterval = setTimeout(() => {
            const searchInput = this.template.querySelector('ui-input[name="search-input"]');

            if(searchInput) {
                const searchEvent = new CustomEvent('globalsearch', {
                    detail: {
                        enabled: this.isSearching,
                        text: searchInput.value
                    }
                });

                this.dispatchEvent(searchEvent);
            }
        }, 250);
    }

    dispatchBackEvent(event) {
        const backEvent = new CustomEvent('back');

        this.dispatchEvent(backEvent);
    }
}
