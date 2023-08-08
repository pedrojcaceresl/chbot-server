
const { default: axios } = require("axios");
const { FAKE_STORE_API_URL } = require("../config");

const getFakeProducts = async () => {
    const { data } = await axios.get(`${FAKE_STORE_API_URL}/products`);

    return data;
}

const getFakeProductById = async (id) => {
    const { data } = await axios.get(`${FAKE_STORE_API_URL}/products/${id}`);

    return data;
}


module.exports = {
    getFakeProducts,
    getFakeProductById,
};