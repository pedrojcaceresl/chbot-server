require("dotenv").config();


const config = {
	PORT: process.env.PORT || 3200,
	MONGO_URI: process.env.MONGO_URI,
	DB_NAME: "chbotDb",
	OPENAI_API_KEY: process.env.OPENAI_API_KEY,
	SHOPIFY_API_KEY: process.env.SHOPIFY_API_KEY,
	SHOPIFY_API_SECRET: process.env.SHOPIFY_API_SECRET,
	SHOPIFY_ACCESS_TOKEN: process.env.SHOPIFY_ACCESS_TOKEN,
	SHOPIFY_STORE_NAME: process.env.SHOPIFY_STORE_NAME,
	FAKE_STORE_API_URL: "https://fakestoreapi.com",
	TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
	TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
	SANDBOX_NUMBER: process.env.SANDBOX_NUMBER,
	GOOGLE_PROJECT_ID : process.env.GOOGLE_PROJECT_ID ,  
	DF_LANGUAGE_CODE : process.env.DF_LANGUAGE_CODE,
	GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL, 
	GOOGLE_PRIVATE_KEY : process.env.GOOGLE_PRIVATE_KEY,
};


module.exports = config;