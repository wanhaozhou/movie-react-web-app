import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { FiEdit3 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SlUserFollow, SlUserFollowing } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { FaRegEyeSlash } from "react-icons/fa6";

import * as userClient from "../../Client/users";
import * as followClient from "../../Client/follow";
import { avatarStyle, avatarName } from "../constants";
import {
	addFollowing,
	removeFollowing,
	setCurrentUser,
} from "../../Reducers/contextReducer";
import { Button, Form, Modal, Row } from "react-bootstrap";

const labelStyle = {
	fontWeight: 350,
};

const Profile = ({ uid }) => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.context.currentUser);
	const followingUsernames = useSelector(
		(state) => state.context.following,
	).map((item) => item.in_.username);

	const [displayFollow, setDisplayFollow] = useState(
		!followingUsernames.includes(uid),
	);

	const navigate = useNavigate();
	const [user, setUser] = useState(null);

	const editMode = !uid || (currentUser && currentUser.username === uid);
	const [showEdit, setShowEdit] = useState(false);

	useEffect(() => {
		if (!uid) {
			navigate("/profile");
			return;
		}
		const fetchUser = async () => {
			userClient
				.findByUsername(uid)
				.then((resp) => {
					setUser(resp.data);
				})
				.catch((err) => {
					console.log(err);
					navigate("/404");
				});
		};
		fetchUser();
	}, [uid, navigate, currentUser]);

	const handleFollow = () => {
		followClient
			.follow(currentUser._id, user._id)
			.then(() => {
				setDisplayFollow(false);
				dispatch(addFollowing(user));
			})
			.catch((error) => console.log(error));
	};

	const handleUnFollow = async () => {
		followClient
			.unfollow(currentUser._id, user._id)
			.then(() => {
				setDisplayFollow(true);
				dispatch(removeFollowing(user._id));
			})
			.catch((error) => console.log(error));
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser({
			...user,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("Form submitted:", user);
		setShowEdit(false);
		userClient
			.updateUser(user._id, user)
			.then(() => {
				dispatch(setCurrentUser(user));
			})
			.catch((e) => console.log(e));
	};

	return (
		user && (
			<>
				<div className="display-6 mb-4">
					Profile
					{editMode && (
						<span className="ms-3 my-auto">
							<FiEdit3
								className="my-auto"
								size={35}
								onClick={() => setShowEdit(true)}
							/>
						</span>
					)}
					{currentUser && !editMode && displayFollow && (
						<span className="ms-3 my-auto">
							<SlUserFollow
								className="my-auto"
								size={35}
								onClick={handleFollow}
							/>
						</span>
					)}
					{currentUser && !editMode && !displayFollow && (
						<span className="ms-3 my-auto">
							<SlUserFollowing
								className="my-auto"
								size={35}
								onClick={handleUnFollow}
							/>
						</span>
					)}
				</div>

				<div className="row mb-3">
					<label
						htmlFor="inputName"
						className="col-xs-4 col-lg-4 col-form-label"
					>
						<h3 style={labelStyle}>Avatar</h3>
						<Avatar variant="rounded" sx={avatarStyle(user.avatar)}>
							{avatarName(user)}
						</Avatar>
					</label>
				</div>

				<div className="row mb-3">
					<h3 style={labelStyle}>Username</h3>
					<p className="lead">{user.username}</p>
				</div>

				<div className="row mb-3">
					<h3 style={labelStyle}>First Name</h3>
					<p className="lead">{user.firstName}</p>
				</div>

				<div className="row mb-3">
					<h3 style={labelStyle}>Last Name</h3>
					<p className="lead">{user.lastName}</p>
				</div>

				<div className="row mb-3">
					<h3 style={labelStyle}>Role</h3>
					<p className="lead">{user.role}</p>
				</div>

				<div className="row mb-3">
					<h3 style={labelStyle}>Status</h3>
					<p className="lead">{user.active ? "ACTIVE" : "BLOCKED"}</p>
				</div>

				{editMode && (
					<div className="row mb-3">
						<h3 style={labelStyle}>
							Email <FaRegEyeSlash className="ms-2" />
						</h3>
						<p className="lead">{user.email || "N/A"}</p>
					</div>
				)}

				{editMode && (
					<div className="row mb-3">
						<h3 style={labelStyle}>
							Date of Birth <FaRegEyeSlash className="ms-2" />
						</h3>
						<p className="lead">{user.dateOfBirth || "N/A"}</p>
					</div>
				)}

				<Modal
					show={showEdit}
					onHide={() => {
						setShowEdit(false);
						setUser({ ...currentUser });
					}}
				>
					<Modal.Header closeButton>
						<Modal.Title>Edit Profile</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={(e) => handleSubmit(e)}>
							<Form.Group
								controlId="formFirstName"
								className="mb-4"
							>
								<Form.Label className="ms-1">
									First Name
								</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter First Name"
									name="firstName"
									value={user.firstName}
									onChange={handleChange}
									required
								/>
							</Form.Group>

							<Form.Group
								controlId="formLastName"
								className="mb-4"
							>
								<Form.Label className="ms-1">
									Last Name
								</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter Last Name"
									name="lastName"
									value={user.lastName}
									onChange={handleChange}
									required
								/>
							</Form.Group>

							<Form.Group
								controlId="formPassword"
								className="mb-4"
							>
								<Form.Label className="ms-1">
									Password
								</Form.Label>
								<Form.Control
									type="password"
									placeholder="Enter Password"
									name="password"
									value={user.password}
									onChange={handleChange}
									required
								/>
							</Form.Group>

							<Form.Group controlId="formEmail" className="mb-4">
								<Form.Label className="ms-1">Email</Form.Label>
								<Form.Control
									placeholder="Enter Email"
									name="email"
									value={user.email}
									onChange={handleChange}
								/>
							</Form.Group>

							<Form.Group
								controlId="formDateOfBirth"
								className="mb-4"
							>
								<Form.Label className="ms-1">
									Date of Birth
								</Form.Label>
								<Form.Control
									type="date"
									name="dateOfBirth"
									value={user.dateOfBirth}
									onChange={handleChange}
								/>
							</Form.Group>

							<Row className="mx-auto mb-4">
								<Button variant="primary" type="submit">
									Save
								</Button>
							</Row>
						</Form>
					</Modal.Body>
				</Modal>
			</>
		)
	);
};
export default Profile;
