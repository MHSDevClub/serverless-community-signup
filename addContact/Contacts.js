class Contacts {
    constructor(apiKey, fetch) {
        this.apiKey = apiKey;
        this.fetch = fetch;
    }

    add(email, firstname, lastname, studentCode, callback) {
        const requestUrl = `https://api.hubapi.com/contacts/v1/contact/?hapikey=${this.apiKey}`

        this.fetch(requestUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                properties: [
                    {
                        property: "email",
                        value: email
                    },
                    {
                        property: "firstname",
                        value: firstname
                    },
                    {
                        property: "lastname",
                        value: lastname
                    },
                    {
                        property: "student_code",
                        value: studentCode
                    }
                ]
            })
        })
            .then(res => callback(res))
            .catch(err => console.log(err));
    };
}

module.exports = Contacts;