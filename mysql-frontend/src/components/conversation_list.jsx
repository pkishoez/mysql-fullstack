import React, { useState, useEffect } from "react";
import { getUsers } from "../api";
import cx from "classnames";

export const ConversationList = ({ onUserClick }) => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		getUsers().then((d) => {
			setUsers(d);
		});
	}, []);
	return (
		<div className="text-white">
			<h2 className="text-3xl p-3">ConversationList!</h2>
			{users
				.filter((user) => user.id !== 1)
				.map((user) => {
					return (
						<div
							key={user.id}
							className={cx(
								"p-3 cursor-pointer",
								"hover:bg-gray-400 hover:text-teal-700"
							)}
							onClick={(e) => onUserClick(user)}
						>
							{user.name}
						</div>
					);
				})}
		</div>
	);
};
