import Avatar from "@mui/material/Avatar";
import { Stack, Button, Row, Col, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as followClient from "../../Client/follow";
import { avatarStyle, avatarName } from "../constants";
import NoRecord from "../NoRecord";
import { useSelector } from "react-redux";

const Follows = ({ uid }) => {
	const navigate = useNavigate();
	const [follow, setFollow] = useState([]);
	const currentUser = useSelector((state) => state.context.currentUser);

	useEffect(() => {
		followClient
			.findFollowingByUsername(uid)
			.then((resp) => {
				setFollow(resp.data.map((item) => item.in_));
			})
			.catch((e) => console.log(e));
	}, [uid, navigate]);

	const handleUnfollow = (idx) => {
		followClient
			.unfollow(currentUser._id, follow[idx]._id)
			.then(() => {
				setFollow(follow.filter((_, id) => id !== idx));
			})
			.catch((e) => console.log(e));
	};

	return (
		<>
			<div className="display-6 mb-5">Following</div>
			<Row sm={1} md={2} lg={3} className="g-4 ms-0 ps-0 mb-5">
				{follow.length === 0 && <NoRecord />}
				{follow.length > 0 &&
					follow.map((user, idx) => (
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
										{currentUser &&
											(currentUser.username === uid ||
												!uid) && (
												<div className="ms-auto">
													<Button
														variant="outline-secondary"
														size="sm"
														onClick={() =>
															handleUnfollow(idx)
														}
													>
														Unfollow
													</Button>
												</div>
											)}
									</Stack>
								</Card.Body>
							</Card>
						</Col>
					))}
			</Row>
		</>
	);
};
export default Follows;
