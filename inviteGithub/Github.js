class Github {
    constructor(octokit, fetch, orgName, clientId, clientSecret) {
        this.octokit = octokit;
        this.fetch = fetch;

        this.orgName = orgName;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    getOAuthToken(authCode) {
        return this.fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            },
            body: querystring.stringify({
                code: authCode,
                client_id: this.clientId,
                client_secret: this.clientSecret
            })
        }).then(res => JSON.stringify(res.body)[access_token]);
    }

    getUserInfo(userOAuthToken) {
        this.octokit.authenticate({
            type: "oauth",
            token: userOAuthToken
        });

        return this.octokit.users.get({})
            .then(res => res)
            .catch(err => err)
    }

    addOrgMembership(username, callback) {
        this.octokit.authenticate({
            type: "oauth",
            key: this.clientId,
            secret: this.clientSecret
        });

        this.octokit.orgs.addOrgMembership({ orgName: this.orgName, username, role: "member" })
            .then(res => callback(null, {
                statusCode: res.statusCode,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    res
                })
            }))
            .catch(err => callback(err));
    }
}