const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./api/index");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", router);

app.listen(2222, () => {
	console.log("Server is running on port 2222");
});
