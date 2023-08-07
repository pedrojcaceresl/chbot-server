
const { Router } = require("express");
const router = Router();

router.get("/", async (req, res, next) => {
	const healthcheck = {
		uptime: process.uptime(),
		message: "OK",
		timestamp: Date.now(),
	};

	try {
		res.send(healthcheck);
	} catch (error) {
		healthcheck.message = error;
		res.status(503).send();
	}
});


module.exports = router;