const { Router } = require("express");
const { user, conversation } = require("../db");

const router = Router();
// User creation and fetching user information!
router.post("/user/create", (req, res) => {
	const { email, name } = req.body;
	user.add({ email, name })
		.then((d) => {
			res.send({
				data: {
					userid: d[0][0],
					email,
					name,
				},
			});
		})
		.catch((err) => {
			res.send({
				error: err.message,
			});
		});
});
router.get("/user/get", (req, res) => {});

// Conversation Details
router.get("/conversation/get", (req, res) => {
	const { user1, user2, offset, limit } = req.query;

	conversation
		.get({ user1, user2, offset, limit })
		.then((data) => {
			res.send({
				data,
			});
		})
		.catch((err) => {
			res.send({
				error: err.message,
			});
		});
});

module.exports = router;
