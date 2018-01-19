const fetch = require("node-fetch");
const FormData = require("form-data");

const discourseInvite = (baseUrl, apiKey, apiUsername, email, firstname) => {
    const requestUrl = `${baseUrl}/invites`;

    const customMessage = `Thank you for joining MHS Developers Club, ${firstname}! Check your inbox for more invites`;

    const payload = {
        api_key: apiKey,
        api_username: apiUsername,
        email: email,
        custom_message: customMessage
    };

    let data = new FormData();
    for (let key in payload) {
        data.append(key, payload[key]);
    }

    fetch(requestUrl, {
        method: "POST",
        body: data
    })
        .then(res => console.log(res))
        .catch(err => console.log(err));
};