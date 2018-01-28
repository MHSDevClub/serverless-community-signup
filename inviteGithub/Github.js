class Github {
    constructor(fetch, querystring, orgName, clientId, clientSecret, orgApiKey) {
        this.fetch = fetch;
        this.querystring = querystring;

        this.orgName = orgName;
        this.orgApiKey = orgApiKey;
    }

    getOAuthToken(authCode) {
        console.log("Authcode: " + authCode);
        return this.fetch("https://github.com/login/oauth/access_token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            },
            body: this.querystring.stringify({
                code: authCode,
                client_id: this.clientId,
                client_secret: this.clientSecret
            })
        })
            .then(res => res.json())
            .then(res => res.access_token)
            .catch(err => err);
    }

    getUserInfo(userOAuthToken) {
        return this.fetch(`https://api.github.com/user?access_token=${userOAuthToken}`)
            .then(res => res.json())
            .then(res => res)
            .catch(err => err);
    }

    addOrgMembership(username) {
        console.log(username);
        return this.fetch(`https://api.github.com/orgs/MHSDevClub/memberships/${username}`, {
            method: "PUT",
            headers: {
                "Authorization": `token ${this.orgApiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ role: "member" })
        })
            .then(res => res)
            .catch(err => err);
    }
}

module.exports = Github;