const { default: axios } = require("axios");
const {
  handleSuccessResponse,
  handleErrorResponse,
} = require("../shared/helpers/responseHandler");
const { HTTP_STATUSES } = require("../shared/constants");

const { client } = require("../config/shopifyConfig");
const ProductsModel = require("../models/products.model");
const productsModel = require("../models/products.model");

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
    
    const { id, title, body_html, product_type, status, tags, image } = data.body.product;
    const { price } = data.body.product.variants[0];
    
    
    console.log({
      title,
      body_html,
      product_type,
      status,
      tags,
      image,
      price,
    });

    // const product = await ProductsModel.create({
    //   idProduct: id,
    //   title,
    //   body_html,
    //   product_type,
    //   status,
    //   tags,
    //   image: image.src,
    //   price,
    // })



    handleSuccessResponse({
      res,
      status: HTTP_STATUSES.OK,
      data
      // data: product,
    });
  } catch (error) {
    handleErrorResponse(error, req, res);
  }
};

const saveShopifyProduct = async (req, res) => {
  try {
    // const data = await client.get({
    //   path: `products/${req.params.id}`,
    // });

    const data = ProductsModel.create(req.body);

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
  saveShopifyProduct,
};
