
const { TWILIO_AUTH_TOKEN, TWILIO_ACCOUNT_SID } = require("../config")

const accountSid = TWILIO_ACCOUNT_SID;
const authToken = TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);


const { getFakeProducts } = require('../services/products.services')

const sendWhatsappMessage = async (req, res) => {

    const {message, number} = req.body;
    
    
    try {
        getFakeProducts().then(result => {
        client.messages
			.create({
				body: `${JSON.stringify(result[0], 0, 2)}`,
				from: "whatsapp:+14155238886",
				to: `whatsapp:${number}`,
			})
			.then(async (message) => {
				res.send({
					ok: true,
					res: message.sid,
				});
			});

        })

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    sendWhatsappMessage,
}