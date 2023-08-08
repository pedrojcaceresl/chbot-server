const { Router } = require("express");
const { getShopifyProducts } = require("../controllers/product.controllers");
const router = Router();

router.get("/", getShopifyProducts);

module.exports = router;