class Discourse {
    constructor(apiKey, apiUsername, baseUrl, fetch, FormData) {
        this.apiKey = apiKey;
        this.apiUsername = apiUsername;
        this.baseUrl = baseUrl;
        this.fetch = fetch;
        this.FormData = FormData;
    }

    invite(email) {
        const requestUrl = `${this.baseUrl}/invites`;

        const payload = {
            api_key: this.apiKey,
            api_username: this.apiUsername,
            email
        };

        let data = new this.FormData();
        for (let key in payload) {
            data.append(key, payload[key]);
        }

        return this.fetch(requestUrl, {
            method: "POST",
            body: data
        })
            .then(res => res)
            .catch(err => err);
    }
}

module.exports = Discourse;