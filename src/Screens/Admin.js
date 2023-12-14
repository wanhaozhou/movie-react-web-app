import { useSelector } from "react-redux";
import { useWindowSize } from "usehooks-ts";
import { VscSettingsGear } from "react-icons/vsc";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Nav, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import ErrorPage from "./ErrorPage";
import * as userClient from "../Client/users";
import Avatar from "@mui/material/Avatar";
import { avatarName, avatarStyle } from "../Components/constants";

const Admin = () => {
	const navigate = useNavigate();

	const limit = 850;
	const { width } = useWindowSize();
	const iconSize = 20;
	const iconSizeLarge = 23;
	const page = [
		"Manage",
		<VscSettingsGear size={width >= limit ? iconSize : iconSizeLarge} />,
	];

	const currentUser = useSelector((state) => state.context.currentUser);
	const [allUsers, setAllUsers] = useState([]);

	useEffect(() => {
		if (!currentUser || currentUser.role !== "ADMIN") {
			return;
		}
		const worker = async () => {
			try {
				const resp = await userClient.all();
				setAllUsers(resp.data);
			} catch (error) {
				console.log(error);
			}
		};
		worker();
	}, [currentUser]);

	const toggleBlock = async (id) => {
		const newUser = { ...allUsers.find((u) => u._id === id) };
		newUser.active = !newUser.active;
		try {
			await userClient.updateUserActive(id, { active: newUser.active });
			setAllUsers(allUsers.map((u) => (u._id === id ? newUser : u)));
		} catch (error) {
			console.log(error);
		}
	};

	if (!currentUser || currentUser.role !== "ADMIN") {
		return <ErrorPage code={"403"} />;
	}
	return (
		<div className="container-fluid mt-3">
			<div className="row">
				<div className="col-2">
					<Nav.Item key={page}>
						<Nav.Link
							style={{ color: "black", textDecoration: "none" }}
							className={`fw-bold ps-0 pe-0`}
						>
							{width >= limit ? (
								<>
									{page[1]}
									<span className="ms-3">{page[0]}</span>
								</>
							) : (
								page[1]
							)}
						</Nav.Link>
					</Nav.Item>
				</div>
				<div className="col">
					<div className="display-6 mb-5">Manage Users</div>
					<Row sm={1} md={2} lg={3} className="g-4 ms-0 ps-0 mb-5">
						{allUsers.map((user, idx) => (
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
											<div className="ms-auto">
												{user.role === "ADMIN" ? (
													<></>
												) : (
													<Button
														variant="outline-secondary"
														size="sm"
														onClick={() =>
															toggleBlock(
																user._id,
															)
														}
													>
														{user.active
															? "Block"
															: "Unblock"}
													</Button>
												)}
											</div>
										</Stack>
									</Card.Body>
								</Card>
							</Col>
						))}
					</Row>
				</div>
			</div>
		</div>
	);
};

export default Admin;
