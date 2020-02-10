import credentials from 'credentials';
import SalesforceAuthProvider from './salesforceProvider.js';

const authProvider = new SalesforceAuthProvider(credentials);

export default authProvider;