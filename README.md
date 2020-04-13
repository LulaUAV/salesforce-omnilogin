# Salesforce Omnilogin

This repository contains the source code of Salesforce Omnilogin, a free and Open Source Web Browser extension which allows to store and manage Salesforce orgs logins from the browser using then standard OAuth2 Flow.

The extension is written using Open Source Lightning Web Components, as a use case to test LWC Framework outside Salesforce Platform or the more frequent "Web app" context.

If you are looking for the extension, Salesforce OmniLogin should be published for Google Chrome and Mozilla Firefox.

## Building and testing the extension

### Building the project

Instal the project dependencies running  `npm install` and build the extension by running `npm run build:development`. To build the extension for production, use `npm run build`.

Although the extension will work, you will need a valid Salesforce client_id for being able of launching the Salesforce OAuth2 flow from the extension. In order to do so, you will need to register your own Connected App in a Salesforce org (check Creating the Connected App section for details) and copy the client_id in project root `credentials.json` file as shown below.

credentials.json
````
{
    "client_id": "COPY_YOUR_CLIENT_ID_HERE"
}

````

These steps will generate an unpacked extension into the `build` folder.