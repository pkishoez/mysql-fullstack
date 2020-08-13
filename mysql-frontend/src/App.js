import React, { useEffect, useState } from "react";

function App() {
	const [data, setData] = useState([]);
	useEffect(() => {
		fetch("http://localhost:2222/api/film")
			.then((d) => d.json())
			.then((d) => {
				setData(d.data);
			})
			.catch((err) => {
				console.log("ERROR IN REQUEST : ", err.message);
			});
	}, []);
	return (
		<table border="1">
			<tbody>
				{data.map(([id, name, title, year]) => (
					<tr key={id}>
						<td>{id}</td>
						<td>{name}</td>
						<td>{title}</td>
						<td>{year}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default App;
