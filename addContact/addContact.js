const fetch = require("node-fetch");
const querystring = require('querystring');

const Contacts = require("./Contacts");
const apiKey = process.env.hubspotApiKey;

let contacts = new Contacts(apiKey, fetch);

module.exports.addContact = (event, context, callback) => {
    const data = querystring.parse(event.body);

    contacts.add(data.email,
        data.firstName,
        data.lastName,
        data.studentCode,
        callback
    );
};