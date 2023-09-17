const { Router } = require("express");
const { getCollection} = require("../controllers/custom-collections.controllers");
const router = Router();

router.get("/", getCollection);

module.exports = router;