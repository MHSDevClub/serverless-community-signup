class Slack {
    constructor(apiToken, teamName, fetch) {
        this.apiToken = apiToken;
        this.teamName = teamName;
        this.fetch = fetch;
    }

    invite(email, firstName, lastName) {
        const requestUrl = `https://${this.teamName}.slack.com/api/users.admin.invite`;

        return this.fetch(requestUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `token=${this.apiToken}&email=${email}&first_name=${firstName}&last_name=${lastName}`
        })
            .then(res => res)
            .catch(err => res);
    }
}

module.exports = Slack;