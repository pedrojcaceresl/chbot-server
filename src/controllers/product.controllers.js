const { default: axios } = require("axios");
const { handleSuccessResponse, handleErrorResponse } = require("../shared/helpers/responseHandler");
const { HTTP_STATUSES } = require("../shared/constants");

const { client } = require("../config/shopifyConfig");

const getShopifyProducts = async (req, res) => {
  try {
    const data = await client.get({
      path: `products`,
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

const getShopifyProdById = async (req, res) => {
  try {
    const data = await client.get({
      path: `products/${req.params.id}`,
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
  getShopifyProducts,
  getShopifyProdById,
};
