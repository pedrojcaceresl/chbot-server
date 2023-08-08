const { Router } = require("express");
const { sendWhatsappMessage } = require("../whatsapp/whatsapp");
const router = Router();

router.post("/", sendWhatsappMessage);

module.exports = router;
