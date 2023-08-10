const { default: axios } = require("axios");
const { handleSuccessResponse, handleErrorResponse } = require("../shared/helpers/responseHandler");
const { HTTP_STATUSES } = require("../shared/constants");

const { client } = require("../config/shopifyConfig");

// Devuelve el conjunto de productos categorizados (trae productos y categorias)
const getShopifyCollect = async (req, res) => {
  try {
    const data = await client.get({
      path: `collects`,
    });

    handleSuccessResponse({
      res,
      status: HTTP_STATUSES.OK,
      data,
    });
  } catch (error) {
    handleErrorResponse( error, req, res)
  }
};

// Devuelve una categoria por su id especifico
const getShopifyCollectionsById = async (req, res) => {
  try {
    const data = await client.get({
      path: `collections/${req.params.id}`,
    });

    handleSuccessResponse({
      res,
      status: HTTP_STATUSES.OK,
      data,
    });
  } catch (error) {
    handleErrorResponse( error, req, res)
  }
};

module.exports = {
  getShopifyCollect,
  getShopifyCollectionsById,
};
