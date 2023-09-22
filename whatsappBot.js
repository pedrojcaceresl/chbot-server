const venom = require("venom-bot");
const uuid = require('uuid')
const dialogflow = require('./dialogflow.js');
const productsModel = require("./src/models/products.model.js");
const sequelize = require("./src/config/dbConfigSQL.js");
const sessionIds = new Map();


const initializeVenom = () => {
    venom
	.create({
		session: "session-name", //name of session
	})
	.then((client) => start(client))
	.catch((erro) => {
		console.log(erro);
	});
}

const start = (client) => {
    console.log("WHATSAPP CLIENT STARTED");
	client.onMessage(async (message) => {
        console.log("que contiene el message?:",{ message });
		if (!message.isGroupMsg) {
			setSessionAndUser(message.from);

            // TODO: reemplazar snippet por lo que corresponda
			let session = sessionIds.get(message.from);

			// let responses = payload.fulfillmentMessages;

            // TODO: crear la funcion para interceptar los mensajes
            // y responder de acuerdo a los actions

            if (!message.isGroupMsg) {
                await handleIncomingMessage(message, client);
            }

            // handleWhatsAppAction(session, payload.action)


			// for (const response of messages) {
			// 	await sendSimpleMessage(client, message, response);
			// }
            // const payload = {client, message, response}
		}
	});
}

const handleIncomingMessage = async (message, client) => {
    const senderId = "123123"
    const result =  await dialogflow.sendToDialogFlow(message.body, senderId);
    handleDialogFlowResponse(senderId, result, message, client)
	// for (const response of messages) {
	// 	await sendMessageToWhatsapp(client, message, response);
	// }
}

function handleDialogFlowResponse(sender, response, message, client) {
	let responseText = response.fulfillmentMessages;
	let messages = response.fulfillmentMessages;
	let action = response.action;
	let contexts = response.outputContexts;
	let parameters = response.parameters;
	// console.log("MESAGE FROMMM", message.from);



	if (isDefined(action)) {
		handleDialogFlowAction(
			sender,
			action,
			messages,
			contexts,
			parameters,
			message.from,
			client
		);
	} else if (responseText == "" && !isDefined(action)) {
		sendTextMessage(
			sender,
			"No entiendo lo que trataste de decir... puto",
			message.from,
			client
		);
	} else if (isDefined(responseText)) {
		sendTextMessage(sender, responseText, message.from, client);
	}
	// if (isDefined(action)) {
	// 	handleDialogFlowAction(sender, action, messages, contexts, parameters);
	// } else if (isDefined(messages)) {
	// 	handleMessages(messages, sender);
	// } else if (responseText == "" && !isDefined(action)) {
	// 	//dialogflow could not evaluate input.
	// 	sendTextMessage(sender, "No entiendo lo que trataste de decir ...");
	// } else if (isDefined(responseText)) {
	// 	sendTextMessage(sender, responseText);
	// }
}

const sendTextMessage = (sender, message, numberOrigin, client) => {
	return new Promise((resolve, reject) => {
		client
			.sendText(numberOrigin, message)
			.then((result) => {
				console.log("Result: ", result); //return object success
				resolve(result);
			})
			.catch((erro) => {
				console.error("Error when sending: ", erro);
				reject(erro);
			});
	});
};

async function handleDialogFlowAction(
	sender,
	action,
	messages,
	contexts,
	parameters,
    numberOrigin,
	client
) {

	console.log("De parameterrs>>>", parameters, parameters.fields.producto.stringValue);
	let producto = parameters.fields.producto.stringValue;

	switch (action) {
        case "PedidoSimple.action":
            sendTextMessage(sender, "Vamos a verificar, aguarde un momento...", numberOrigin, client);

			const fuzzyTitle = `%${producto.split('').join('%')}%`;

			const results = await sequelize.query(
			  `SELECT * FROM products WHERE title ILIKE :fuzzyTitle`,
			  {
				replacements: { fuzzyTitle },
				type: Sequelize.QueryTypes.SELECT,
			  }
			);

			console.log("el result>>>",result);
			// const stringProducts = JSON.stringify(products.slice(0,3), 0, 2);
			// console.log({stringProducts});
			// sendTextMessage(sender, stringProducts, numberOrigin, client);
            break;

		
		// case "Helados.info.action":
		// 	let icecreamName = parameters.fields.icecreamName.stringValue;
		// 	let icecreamInfo = await Product.findOne({ name: icecreamName });
		// 	sendGenericMessage(sender, [
		// 		{
		// 			title: icecreamInfo.name + " $" + icecreamInfo.price,
		// 			image_url: icecreamInfo.img,
		// 			subtitle: icecreamInfo.description,
		// 			buttons: [
		// 				{
		// 					type: "postback",
		// 					title: "Hacer compra",
		// 					payload: "hacer_compra",
		// 				},
		// 				{
		// 					type: "postback",
		// 					title: "Ver más helados",
		// 					payload: "ver_mas_helados",
		// 				},
		// 			],
		// 		},
		// 	]);
		// 	break;
		// case "Code.DemasElementos.action":
		// 	await sendTextMessage(
		// 		sender,
		// 		"Estoy mandando una imagen y un boton"
		// 	);
		// 	await sendImageMessage(
		// 		sender,
		// 		"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQeOnyjNIucV-XNe6DcdOuhKahh9jdNY4RkuQ&usqp=CAU"
		// 	);
		// 	await sendButtonMessage(sender, "Ejemplo de boton", [
		// 		{
		// 			type: "web_url",
		// 			url: "https://www.messenger.com",
		// 			title: "Visit Messenger",
		// 		},
		// 	]);
		// 	break;
		// case "Code.menuCarrusel.action":
		// 	let helados = [
		// 		{
		// 			id: 1,
		// 			nombre: "Helado de fresa",
		// 			img: "https://cocina-casera.com/wp-content/uploads/2018/05/helado-de-fresa-casero.jpg",
		// 			descripcion: "Los helados de fresa son muy ricos",
		// 			precio: 7,
		// 		},
		// 		{
		// 			id: 2,
		// 			nombre: "Helado de piña",
		// 			img: "https://okdiario.com/img/2019/07/07/receta-de-helado-casero-de-pina-1-655x368.jpg",
		// 			descripcion: "Los helados de piña son muy ricos",
		// 			precio: 5,
		// 		},
		// 		{
		// 			id: 3,
		// 			nombre: "Helado de chocolate",
		// 			img: "https://placeralplato.com/files/2015/08/helado-de-chocolate.jpg",
		// 			descripcion: "Los helados de chocolate son muy ricos",
		// 			precio: 10,
		// 		},
		// 	];
		// 	let tarjetas = [];
		// 	helados.forEach((helado) => {
		// 		tarjetas.push({
		// 			title: helado.nombre + " $" + helado.precio,
		// 			image_url: helado.img,
		// 			subtitle: helado.descripcion,
		// 			buttons: [
		// 				{
		// 					type: "postback",
		// 					title: "Hacer compra",
		// 					payload: "hacer_compra",
		// 				},
		// 				{
		// 					type: "postback",
		// 					title: "Ver más helados",
		// 					payload: "ver_mas_helados",
		// 				},
		// 			],
		// 		});
		// 	});
		// 	sendGenericMessage(sender, tarjetas);

		// 	break;
		// case "Codigo.quickReply.action":
		// 	let replies = [];
		// 	for (let i = 1; i <= 5; i++) {
		// 		replies.push({
		// 			image_url:
		// 				"https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Check_green_icon.svg/1200px-Check_green_icon.svg.png",
		// 			title: i,
		// 			payload: "si_acepto",
		// 			content_type: "text",
		// 		});
		// 	}
		// 	sendQuickReply(sender, "Ejemplo de quick reply", replies);
		// 	break;
		// case "Ubicacion.action":
			// sendTextMessage(
			// 	sender,
			// 	"este es un mensaje enviado desde el código"
			// );
			// handleMessages(messages, sender);
			// break;
		default:
			//unhandled action, just send back the text
			// handleMessages(messages, sender);
            console.log('UNHANDLED INTENT ACTIONNN, TRY AGAIN');
	}
}


const setSessionAndUser = async (senderId) => {
	try {
		if (!sessionIds.has(senderId)) {
			sessionIds.set(senderId, uuid.v1());
		}
	} catch (error) {
		throw new Error("Could not set session and user");
	}
}

// TODO Enviar mensajes de whatsapp con el cliente venom

async function handleWhatsAppAction(
	sender,
	action,
	messages,
	contexts,
	parameters
) {
	switch (action) {
		case "PedidoSimple.action":
			await sendTextMessage(
				sender,
				"Estoy enviando un mensaje desde node linea 7 y algo"
			);
			break;
		default:
			// Acción no gestionada, simplemente envía el texto de vuelta
			handleWhatsAppMessages(messages, sender);
	}
}

function isDefined(obj) {
	if (typeof obj == "undefined") {
		return false;
	}

	if (!obj) {
		return false;
	}

	return obj != null;
}

module.exports = {
	initializeVenom,
};