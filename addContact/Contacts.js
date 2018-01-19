class Contacts {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    add(email, firstname, lastname, studentCode) {
        const requestUrl = `https://api.hubapi.com/contacts/v1/contact/?hapikey=${this.apiKey}`

        fetch(requestUrl, {
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
            .catch(err => callback(err));
    };
}

module.exports = Contacts;