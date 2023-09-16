const express = require("express");
const corsOptions = require("./src/config/cors");
const app = express();
const cors = require("cors");
// TODO: cambiar por la API de whatsapp
const uuid = require('uuid')
const venom = require('venom-bot');
const dialogflow = require('./dialogflow.js');
const sessionIds = new Map();

const dbConnection = require('./src/config/dbConfig')

dbConnection();

venom
  .create({
    session: 'session-name' //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage(async (message) => {
    // if (message.body === 'Hola' && message.isGroupMsg === false) {
    setSessionAndUser(message.from);
    let session = sessionIds.get(message.from);
     let payload = await dialogflow.sendToDialogFlow(message.body,'123123')
     let responses = payload.fulfillmentMessages;

     for (const response of responses) {
       await sendMessageToWhatsapp(client, message, response);
        // }
      }
  });
}

function sendMessageToWhatsapp(client, message, response) {
  return new Promise((resolve, reject) => {
    client
    .sendText(message.from, response.text.text[0])
    .then((result) => {
      console.log('Result: ', result); //return object success
      resolve(result)
    })
    .catch((erro) => {
      console.error('Error when sending: ', erro);
      reject(erro)
    });
  });
}

async function setSessionAndUser(senderId){
	try {
	  if(!sessionIds.has(senderId)){
		console.log('valorrr',uuid);
		sessionIds.set(senderId, uuid.v1());
	  }
	} catch (error) {
	  throw error;
	}
  }
  

app.use(express.json())
	.use(cors(corsOptions))
	.use("/healthcheck", require("./src/config/healthCheck"))
	.use("/v1", require("./src/routes"));

module.exports = app;

