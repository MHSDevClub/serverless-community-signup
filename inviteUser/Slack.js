class Slack {
    constructor(apiToken, teamName, fetch) {
        this.apiToken = apiToken;
        this.teamName = teamName;
        this.fetch = fetch;
    }

    invite(email, firstName, lastName, callback) {
        const requestUrl = `https://${this.teamName}.slack.com/api/users.admin.invite`;

        this.fetch(requestUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `token=${this.apiToken}&email=${email}&first_name=${firstName}&last_name=${lastName}`
        })
            .then(res => callback(null, {
                statusCode: res.statusCode,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    res
                })
            }))
            .catch(err => callback(res));
    }
}

module.exports = Slack;