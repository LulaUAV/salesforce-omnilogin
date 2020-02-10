import 'webextension-polyfill';
import '@lwc/synthetic-shadow';
import { buildCustomElementConstructor } from 'lwc';
import OmniloginApp from 'omnilogin/app';

customElements.define('omnilogin-app', buildCustomElementConstructor(OmniloginApp));