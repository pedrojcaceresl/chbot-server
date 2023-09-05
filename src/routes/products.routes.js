const { Router } = require("express");
const { getShopifyProducts, getShopifyProdById, saveShopifyProduct} = require("../controllers/product.controllers");
const router = Router();

router.get("/", getShopifyProducts);
router.get("/:id", getShopifyProdById);
router.post("/", saveShopifyProduct);


module.exports = router;