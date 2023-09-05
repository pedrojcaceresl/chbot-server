const {shopifyApi, LATEST_API_VERSION, Session, Shopify} = require('@shopify/shopify-api');
const { SHOPIFY_API_KEY, SHOPIFY_API_SECRET, SHOPIFY_STORE_NAME, SHOPIFY_ACCESS_TOKEN } = require("../config/index");

require("@shopify/shopify-api/adapters/node");

const shopify = shopifyApi({
	apiKey: SHOPIFY_API_KEY,
	apiSecretKey: SHOPIFY_API_SECRET,
	adminApiAccessToken: SHOPIFY_ACCESS_TOKEN,
	apiVersion: LATEST_API_VERSION,
	hostName: "localhost:3200",
	scopes: [
		"read_customers",
		"write_customers",
		"read_fulfillments",
		"write_fulfillments",
		"read_inventory",
		"write_inventory",
		"write_order_edits",
		"read_order_edits",
		"write_orders",
		"read_orders",
		"write_products",
		"read_products",
	],
});

const session = new Session({
	id: "not-a-real-session-id",
	shop: "creier-store.myshopify.com",
	state: "state",
	isOnline: false,
	accessToken: SHOPIFY_ACCESS_TOKEN
});

const client = new shopify.clients.Rest({ session: session, apiVersion: LATEST_API_VERSION })

module.exports = { client };