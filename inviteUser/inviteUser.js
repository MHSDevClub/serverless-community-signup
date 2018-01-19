const fetch = require("node-fetch");
const FormData = require("form-data");

const hubspotApiKey = process.env.hubspotApiKey;

const Discourse = require("./Discourse");
const discourseApiKey = process.env.discourseApiKey;
const discourseApiUsername = process.env.discourseApiUsername;
const discourseBaseUrl = process.env.discourseBaseUrl;

const Slack = require("./Slack");
const slackApiToken = process.env.slackApiToken;
const slackTeamName = process.env.slackTeamName;

let discourse = new Discourse(discourseApiKey, discourseApiUsername, discourseBaseUrl);
let slack = new Slack(slackApiToken, slackTeamName);

module.exports.inviteUser = (event, context, callback) => {
    const userId = JSON.parse(event).objectId;

    fetch(`https://api.hubapi.com/contacts/v1/contact/vid/${userId}/profile?hapikey=${hubspotApiKey}}`)
        .then(res => {
            const user = JSON.parse(res);
            const userEmail = user.properties.email.value;
            const userFirstName = user.properties.firstname.value;
            const userLastName = user.properties.lastname.value;

            discourse.invite(userEmail);
            slack.invite(userEmail, userFirstName, userLastName);
        })
        .catch(err => callback(err));
};