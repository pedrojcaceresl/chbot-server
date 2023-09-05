const { Router } = require("express");
const { getShopifyCollect, getShopifyCollectionsById } = require("../controllers/collects.controllers");
const router = Router();

router.get("/", getShopifyCollect);
router.get("/:id", getShopifyCollectionsById);

module.exports = router;
