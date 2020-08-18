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
router.get("/user/getList", (req, res) => {
	user.getAll()
		.then((data) => {
			res.send({
				data: data.map(([id, email, name]) => ({
					id,
					email,
					name,
				})),
			});
		})
		.catch((err) => {
			res.send({
				error: err.message,
			});
		});
});

// Conversation Details
router.get("/conversation/get", (req, res) => {
	const { user1, user2, offset, limit } = req.query;

	conversation
		.get({ user1, user2, offset, limit })
		.then((data) => {
			res.send({
				data: data.map(([from_id, from, to, content, type, time]) => ({
					from_id,
					from,
					to,
					content,
					type,
					time,
				})),
			});
		})
		.catch((err) => {
			res.send({
				error: err.message,
			});
		});
});
router.post("/conversation/addMessage", (req, res) => {
	const { content, from_user, to_user } = req.body;
	conversation
		.addMessage({ content, from_user, to_user })
		.then(() => {
			res.send({
				data: "Successfully sent message.",
			});
		})
		.catch((err) => {
			console.log("MESSAGE : ", err);
			res.send({
				error: err.message,
			});
		});
});

module.exports = router;
