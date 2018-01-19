const fetch = require("node-fetch");

const Contacts = require("./Contacts");
const apiKey = process.env.hubspotApiKey;

let contacts = new Contacts(apiKey);

module.exports.addContact = (event, context, callback) => {
    contacts.add(event.body.email,
        event.body.firstName,
        event.body.lastName,
        event.body.studentCode
    );
};