class Slack {
    constructor(apiToken, teamName) {
        this.apiToken = apiToken;
        this.teamName = teamName;
    }

    invite(email, firstName, lastName) {
        const requestUrl = `https://${this.teamName}.slack.com/api/users.admin.invite`;

        fetch(requestUrl, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `token=${this.apiToken}&email=${email}&first_name=${firstName}&last_name=${lastName}`
        })
            .then(res => callback(res))
            .catch(err => callback(res));
    }
}

module.exports = Slack;