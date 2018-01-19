class Discourse {
    constructor(apiKey, apiUsername, baseUrl) {
        this.apiKey = apiKey;
        this.apiUsername = apiUsername;
        this.baseUrl = baseUrl;
    }

    invite(email) {
        const requestUrl = `${this.baseUrl}/invites`;

        const payload = {
            api_key: this.apiKey,
            api_username: this.apiUsername,
            email
        };

        let data = new FormData();
        for (let key in payload) {
            data.append(key, payload[key]);
        }

        fetch(requestUrl, {
            method: "POST",
            body: data
        })
            .then(res => callback(res))
            .catch(err => callback(err));
    }
}

module.exports = Discourse;