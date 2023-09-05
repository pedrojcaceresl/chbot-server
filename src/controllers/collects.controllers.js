const { default: axios } = require("axios");
const { handleSuccessResponse, handleErrorResponse } = require("../shared/helpers/responseHandler");
const { HTTP_STATUSES } = require("../shared/constants");

const { client } = require("../config/shopifyConfig");
const CollectsModel = require("../models/collects.model");

// Devuelve el conjunto de productos categorizados (trae productos y categorias)
const getShopifyCollect = async (req, res) => {
  try {
    const data = await client.get({
      path: `collects`,
    });

    const collects = data.body.collects.map(async collect => {
      const { id, collection_id, product_id } =  collect
      console.log({id, collection_id, product_id });
      
      //  await CollectsModel.create({
      //   idCollects: id, 
      //   collectionId: collection_id,
      //   productsId: product_id
      // })
      
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
