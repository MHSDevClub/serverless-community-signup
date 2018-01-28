class Github {
    constructor(fetch, querystring, orgName, clientId, clientSecret, orgApiKey) {
        this.fetch = fetch;
        this.querystring = querystring;

        this.orgName = orgName;
        this.orgApiKey = orgApiKey;
    }

    addOrgMembership(email) {
        return this.fetch(`https://api.github.com/orgs/MHSDevClub/invitations/`, {
            method: "POST",
            headers: {
                "Authorization": `token ${this.orgApiKey}`,
                "Content-Type": "application/json",
                "Accept": "application/vnd.github.dazzler-preview+json"
            },
            body: JSON.stringify({
                email,
                role: "direct_member"
            })
        })
            .then(res => res)
            .catch(err => err);
    }
}

module.exports = Github;