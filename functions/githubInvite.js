const octokit = require("@octokit/rest")({});

const githubInvite = (token, username, org) => {
    octokit.authenticate({
        type: "token",
        token,
    });

    octokit.orgs.addOrgMembership({ org, username, role: "member" })
        .then(res => console.log(res))
        .catch(err => console.log(err));
};