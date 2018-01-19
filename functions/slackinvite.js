const fetch = require("node-fetch");

const slackInvite = (slackTeam, token, email, firstname, lastname) => {
    const requestUrl = `https://${slackTeam}.slack.com/api/users.admin.invite`;

    fetch(requestUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `token=${token}&email=${email}&first_name=${firstname}&last_name=${lastname}`
    })
        .then(res => res.json())
        .then(res => console.log(res));
};