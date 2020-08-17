const db = require("./db/index");

// db.user
// 	.add({ email: "hello@gmail.com", name: "Hello" })
// 	.then((d) => {
// 		console.log("RESULT : ", d);
// 	})
// 	.catch((err) => {
// 		console.log("ERROR : ", err.message);
// 	});
db.user
	.get({ email: "hel@gmail.com" })
	.then(console.log)
	.catch((err) => console.log("ERROR: ", err.message));
