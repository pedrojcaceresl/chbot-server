const { Router } = require("express");
const { getShopifyProducts, getShopifyProdById} = require("../controllers/product.controllers");
const router = Router();

router.get("/", getShopifyProducts);
router.get("/:id", getShopifyProdById);


module.exports = router;