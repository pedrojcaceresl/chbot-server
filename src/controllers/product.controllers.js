const { default: axios } = require("axios")
const { FAKE_STORE_API_URL } = require("../config/index");
const { handleSuccessResponse } = require("../shared/helpers/responseHandler");
const { HTTP_STATUSES } = require("../shared/constants");
const fakeStoreUrl = FAKE_STORE_API_URL

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


module.exports = {
    getProducts
}