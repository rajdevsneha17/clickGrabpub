require("dotenv").config()
const accountSid = process.env.accountSid;
const authToken=process.env.authToken

const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
                from: '+14423337452',
        to: '+918054510607'
    })
    .then(message => console.log(message.sid))
    .done();