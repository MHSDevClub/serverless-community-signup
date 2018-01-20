const octokit = require("@octokit/rest")({});
const fetch = require("node-fetch");
const querystring = require("querystring");

const Github = require("./Github");
const githubOrgName;
const githubClientId;
const githubClientSecret;

let github = new Github(octokit, githubOrgName, githubClientId.githubClientSecret);

module.exports.inviteGithub = (event, context, callback) => {
    github.getOAuthToken(JSON.parse(event.body).code)
        .then(res => {
            github.getUserInfo(res)
                .then(res => {
                    github.addOrgMembership(JSON.parse(res.body).login, callback);
                });
        });
}