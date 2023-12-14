import Avatar from "@mui/material/Avatar";
import { Stack, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import * as followClient from "../../Client/follow";
import NoRecord from "../NoRecord";
import { avatarStyle, avatarName } from "../constants";

const Followers = ({ uid }) => {
	const navigate = useNavigate();
	const [follower, setFollower] = useState([]);

	useEffect(() => {
		followClient
			.findFollowersByUsername(uid)
			.then((resp) => {
				setFollower(resp.data.map((item) => item.out_));
			})
			.catch((e) => console.log(e));
	}, [uid, navigate]);

	return (
		<>
			<div className="display-6 mb-5">Followers</div>
			<Row sm={2} md={3} lg={4} className="g-4 ms-0 ps-0 mb-5">
				{follower.length === 0 && <NoRecord />}
				{follower.length > 0 &&
					follower.map((user, idx) => (
						<Col key={idx} className="ms-0 ps-0">
							<Card>
								<Card.Body>
									<Stack direction="horizontal" gap={3}>
										<Avatar
											variant="rounded"
											sx={avatarStyle(user.avatar)}
											style={{ cursor: "pointer" }}
											onClick={() =>
												navigate(
													`/profile/${user.username}`,
												)
											}
										>
											{avatarName(user)}
										</Avatar>
										<div
											className="my-auto"
											style={{ cursor: "pointer" }}
											onClick={() =>
												navigate(
													`/profile/${user.username}`,
												)
											}
										>
											{user.username}
										</div>
									</Stack>
								</Card.Body>
							</Card>
						</Col>
					))}
			</Row>
		</>
	);
};
export default Followers;
