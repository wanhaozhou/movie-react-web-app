import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import * as userClient from "../../Client/users";
import * as originalClient from "../../Client/original";
import NoRecord from "../NoRecord";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import Row from "react-bootstrap/Row";

const Misc = ({ uid }) => {
	const currentUser = useSelector((state) => state.context.currentUser);
	const [originals, setOriginals] = useState([]);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetch = async () => {
			try {
				const resp = await userClient.findByUsername(uid);
				setUser(resp.data);
				if (resp.data && resp.data.role === "CREATOR") {
					const resp2 = await originalClient.findByUser(
						resp.data._id,
					);
					setOriginals(resp2.data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetch();
	}, [uid]);

	const handleDeleteOriginal = async (_id) => {
		try {
			await originalClient.deleteById(_id);
			setOriginals(originals.filter((o) => o._id !== _id));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="display-6 mb-4">Misc</div>
			{user && user.role === "CREATOR" ? (
				<>
					<h3 style={{ fontWeight: 300 }}>Original</h3>
					{originals.length === 0 && <NoRecord />}
					{originals.length > 0 && (
						<Row xs={1} className="g-4 ms-0 ps-0 mb-5 mt-1">
							{originals.map((original, idx) => (
								<Col key={idx} className="ms-0 ps-0">
									<Card>
										<Card.Body>
											<Link
												to={`/original/${original._id}`}
												style={{
													textDecoration: "none",
													color: "black",
												}}
											>
												<Card.Title>
													{original.title}
												</Card.Title>
											</Link>
											<Card.Text>
												{original.overview}
											</Card.Text>
										</Card.Body>
										{currentUser &&
											(currentUser.username === uid ||
												!uid) && (
												<Card.Footer>
													<div className="text-center">
														<RiDeleteBin5Line
															onClick={() =>
																handleDeleteOriginal(
																	original._id,
																)
															}
															size={20}
														/>
													</div>
												</Card.Footer>
											)}
									</Card>
								</Col>
							))}
						</Row>
					)}
				</>
			) : (
				<NoRecord />
			)}
		</>
	);
};

export default Misc;
