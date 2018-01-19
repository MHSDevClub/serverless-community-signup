const fetch = require("node-fetch")

const addContact = (apikey, email, firstname, lastname, studentCode) => {
    const requestUrl = `https://api.hubapi.com/contacts/v1/contact/?hapikey=${apikey}`

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
        .then(res => console.log(res))
        .catch(err => console.log(err));
};
