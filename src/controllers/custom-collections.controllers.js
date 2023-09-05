const { default: axios } = require("axios");
const { handleSuccessResponse, handleErrorResponse } = require("../shared/helpers/responseHandler");
const { HTTP_STATUSES } = require("../shared/constants");

const { client } = require("../config/shopifyConfig");
const customCollectionsModel = require("../models/custom-collections.model");

// Devuelve el conjunto de categorias personalizadas
const getShopifyCustomCollections = async (req, res) => {
  try {
    const data = await client.get({
      path: `custom_collections`,
    });

    const custom_collections = data.body.custom_collections.map(async collection => {
      const { id, handle, title, body_html, image } =  collection
      
       await customCollectionsModel.create({
        idCustom : id, 
        handle, 
        title, 
        body_html, 
        image: image.src
      })
      
      
      
    });
    
    handleSuccessResponse({
      res,
      status: HTTP_STATUSES.OK,
      // data,
      data: custom_collections,
    });
  } catch (error) {
    handleErrorResponse(error, req, res);
  }
};

module.exports = {
  getShopifyCustomCollections,
};
