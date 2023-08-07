const express = require("express");
const corsOptions = require("./src/config/cors");
const app = express();
const cors = require("cors");


app.use(express.json())
	.use(cors(corsOptions))
	.use("/healthcheck", require("./src/config/healthCheck"))
	.use("/v1", require("./src/routes"));

module.exports = app;

