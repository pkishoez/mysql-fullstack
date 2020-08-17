const { executeQuery } = require("./bootstrap");

// Create a user or get a user information.
const user = {
	add({ email, name }) {
		const query = `
            INSERT INTO whatsapp_clone.user
                (email_id , name)
            VALUES
                (
                    "${email}",
                    "${name}"
                );
            `;
		console.log("QUERY IS : ", query);
		const getInsertedId = `
            select LAST_INSERT_ID();
        `;
		return executeQuery(query).then((d) => executeQuery(getInsertedId));
	},
	get({ email }) {
		const query = `
            SELECT *
            from
                user
            where
                email_id="${email}"
        `;
		return executeQuery(query);
	},
};

// Conversation Part.
const conversation = {
	addMessage({ content, type = "TEXT", from_user, to_user }) {
		const query = `
            START TRANSACTION;

            INSERT INTO whatsapp_clone.message(
                type,
                content
            )
            VALUES(
                "${type}",
                "${content}"
            );
            
            INSERT INTO whatsapp_clone.conversation(
                message_id,
                from_user,
                to_user
            )
            VALUES(
                LAST_INSERT_ID(),
                ${from_user},
                ${to_user}
            );
            
            COMMIT;
        `;
		return executeQuery(query);
	},
	get({ user1, user2, offset = 0, limit = 20 }) {
		const query = `
            SELECT
                (select name from user where id=from_user) as from_user,
                (select name from user where id=to_user) as to_user,
                content, type, DATE_FORMAT(time, "%D %b %Y, %r") 
            from
                conversation, message
            where 
                (from_user=${user1} and to_user=${user2} or
                from_user=${user2} and to_user=${user1}) and
                conversation.message_id = message.id
            ORDER by
                time desc
            LIMIT
                ${offset},${limit};
        `;
		return executeQuery(query);
	},
};

module.exports = { user, conversation };
