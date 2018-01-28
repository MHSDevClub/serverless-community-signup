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

const zapierWebhookToken = process.env.zapierWebhookToken;

let discourse = new Discourse(discourseApiKey, discourseApiUsername, discourseBaseUrl, fetch, FormData);
let slack = new Slack(slackApiToken, slackTeamName, fetch);

module.exports.inviteUser = (event, context, callback) => {
    if (event.headers.apiToken === zapierWebhookToken) {
        const user = JSON.parse(event.body);

        discourse.invite(user.email)
            .then(res => {
                callback(null, {
                    statusCode: res.status,
                    body: JSON.stringify({
                        statusText: res.statusText
                    })
                })
            })
            .catch(err => callback(err));

        slack.invite(user.email, user.firstName, user.lastName)
            .then(res => {
                callback(null, {
                    statusCode: res.status,
                    body: JSON.stringify({
                        statusText: res.statusText
                    })
                })
            })
            .catch(err => callback(err));
    }
};