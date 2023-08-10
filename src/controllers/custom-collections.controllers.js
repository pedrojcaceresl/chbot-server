const { default: axios } = require("axios");
const { handleSuccessResponse, handleErrorResponse } = require("../shared/helpers/responseHandler");
const { HTTP_STATUSES } = require("../shared/constants");

const { client } = require("../config/shopifyConfig");

// Devuelve el conjunto de categorias personalizadas
const getShopifyCustomCollections = async (req, res) => {
  try {
    const data = await client.get({
      path: `custom_collections`,
    });

    handleSuccessResponse({
      res,
      status: HTTP_STATUSES.OK,
      data,
    });
  } catch (error) {
    handleErrorResponse(error, req, res);
  }
};

module.exports = {
  getShopifyCustomCollections,
};
