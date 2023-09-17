const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = require("./src/config/index");

const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

function sendTextMessage(sender, message){
return new Promise((resolve, reject) => {
    client.messages
    .create({
        body: message,
        from: 'whatsapp:+14155238886',
        // to: 'whatsapp:+595975174920'
        to: 'whatsapp:+'+sender,
    })
    .then((message) => resolve())
    .catch((err) => reject(err));
       
});
}

module.exports={
    sendTextMessage
}