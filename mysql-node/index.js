const express = require("express");
const cors = require("cors");
const { executeQuery } = require("./db");

const app = express();

app.use(cors());
app.get("/api/film", async (req, res) => {
	const filmData = await executeQuery(`
        select * from film
    `);
	res.send({
		data: filmData,
	});
});

app.listen(2222, () => {
	console.log("Server is running on port 2222");
});
