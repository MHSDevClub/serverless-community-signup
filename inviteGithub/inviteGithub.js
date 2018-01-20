const fetch = require("node-fetch");
const querystring = require("querystring");

const Github = require("./Github");
const githubOrgName = process.env.githubOrgName;
const githubClientId = process.env.githubClientId;
const githubClientSecret = process.env.githubClientSecret;
const githubOrgApiKey = process.env.githubOrgApiKey;

let github = new Github(fetch, querystring, githubOrgName, githubClientId, githubClientSecret, githubOrgApiKey);

module.exports.inviteGithub = (event, context, callback) => {
    github.getOAuthToken(event.queryStringParameters.code)
        .then(res => {
            github.getUserInfo(res)
                .then(res => {
                    github.addOrgMembership(res.login)
                        .then(res => callback(null, {
                            statusCode: res.status,
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                message: res.statusText
                            })
                        }))
                        .catch(err => callback(err))
                })
                .catch(err => callback(err));
        })
        .catch(err => callback(err));
}