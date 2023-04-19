// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendSMS = () => {
  client.messages
    .create({
      body: "Coughing detected. Suspected respiratory infection.",
      from: "+16204041661",
      to: "+254114931050",
    })
    .then((message) => console.log(message.sid));
};

module.exports = sendSMS;
