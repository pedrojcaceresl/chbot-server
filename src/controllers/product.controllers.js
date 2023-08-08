const { default: axios } = require("axios")
const { FAKE_STORE_API_URL, SHOPIFY_API_KEY, SHOPIFY_ACCESS_TOKEN, SHOPIFY_STORE_NAME,  } = require("../config/index");
const { handleSuccessResponse } = require("../shared/helpers/responseHandler");
const { HTTP_STATUSES } = require("../shared/constants");
const fakeStoreUrl = FAKE_STORE_API_URL


const Shopify = require("shopify-api-node")

const shopify = new Shopify({
    shopName: SHOPIFY_STORE_NAME,
    apiKey: SHOPIFY_API_KEY,
    password:SHOPIFY_ACCESS_TOKEN
})



const getProducts = async (req, res) => {
    try {
        const { data } = await axios.get(`${fakeStoreUrl}/products`);

        handleSuccessResponse({
            res,
            status: HTTP_STATUSES.OK,
            data
        });
        
    } catch (error) {
        console.log(error)
    }
}

const getShopifyProducts = async (req, res) => {
    try {
        const data = await shopify.product.list()

        // console.log({data});
        handleSuccessResponse({
            res,
            status: HTTP_STATUSES.OK,
            data
        });
        
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    getProducts, getShopifyProducts
}