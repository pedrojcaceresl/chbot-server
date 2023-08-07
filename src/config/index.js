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
};


module.exports = config;