// These tests are examples to get you started on how how to test
// Lightning Web Components using the Jest testing framework.
//
// See the LWC Recipes Open Source sample application for many other
// test scenarios and best practices.
//
// https://github.com/trailheadapps/lwc-recipes-oss

import { createElement } from 'lwc';
import OmniloginApp from 'omnilogin/app';

describe('omnilogin-app', () => {
    afterEach(() => {
        // The jsdom instance is shared across test cases in a single file so reset the DOM
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('contains a link to the LWC documentation with target set to _blank', () => {
        const element = createElement('omnilogin-app', {
            is: OmniloginApp
        });
        document.body.appendChild(element);

        // Get link
        const linkEl = element.shadowRoot.querySelector('a');

        expect(linkEl.target).toBe('_blank');
    });

    it('contains a link to the LWC documentation with https://', () => {
        const element = createElement('omnilogin-app', {
            is: OmniloginApp
        });
        document.body.appendChild(element);

        // Get link
        const linkEl = element.shadowRoot.querySelector('a');

        expect(linkEl.href).toMatch(/^https:/);
    });

    it('contains one active custom element omnilogin-greeting', () => {
        const element = createElement('omnilogin-app', {
            is: OmniloginApp
        });
        document.body.appendChild(element);

        // Get array of omnilogin-greeting custom elements
        const greetingEls = element.shadowRoot.querySelectorAll('omnilogin-greeting');

        expect(greetingEls.length).toBe(1);
    });
});
