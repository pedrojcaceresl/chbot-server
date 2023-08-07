const { Router } = require("express");
const { getProducts } = require("../controllers/product.controllers");
const router = Router();

router.get("/", getProducts);

module.exports = router;