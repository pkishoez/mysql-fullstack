const mysqlx = require("@mysql/xdevapi");

// Connect to server on localhost
const dbsession = mysqlx.getSession({
	user: "root",
	password: "rootroot",
	host: "localhost",
	port: "33060",
});

const executeQuery = async (query) => {
	const session = await dbsession;
	await session.sql("USE whatsapp_clone").execute();
	return await session
		.sql(query)
		.execute()
		.then((data) => {
			return data.fetchAll();
		});
};

module.exports = {
	executeQuery,
};
