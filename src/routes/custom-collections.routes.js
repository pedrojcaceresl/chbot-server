const { Router } = require("express");
const { getShopifyCustomCollections} = require("../controllers/custom-collections.controllers");
const router = Router();

router.get("/", getShopifyCustomCollections);

module.exports = router;