import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as usersClient from "../Client/users";
import { setCurrentUser } from "../Reducers/contextReducer";
import ErrorPage from "./ErrorPage";

const SignIn = () => {
	const currentUser = useSelector((state) => state.context.currentUser);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [error, setError] = useState(null);

	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		usersClient
			.signin(formData)
			.then((resp) => {
				setError(null);
				dispatch(setCurrentUser(resp.data));
				navigate("/profile");
			})
			.catch((e) => {
				setError(e.response.data.error);
			});
	};

	return currentUser ? (
		<ErrorPage code="400" />
	) : (
		<Row className="justify-content-md-center">
			<Col md={6} className="mt-3 p-5 rounded">
				<h2 className="my-3 text-center display-6">Sign In</h2>

				<Form onSubmit={handleSubmit}>
					<Form.Label className="ms-2">Username</Form.Label>
					<Form.Group controlId="formUsername" className="mb-4">
						<Form.Control
							type="text"
							placeholder="Enter Username"
							name="username"
							value={formData.username}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					<Form.Group controlId="formPassword" className="mb-4">
						<Form.Label className="ms-2">Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter Password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					{error && <p className="text-danger mb-4">{error}</p>}

					<Row className="mx-auto mb-4">
						<Button variant="primary" type="submit">
							Sign In
						</Button>
					</Row>

					<Row className="mx-auto mb-4">
						<div className="text-center">
							<span className="me-2">Don't have an account?</span>
							<Link
								to="/signup"
								style={{ textDecoration: "none" }}
							>
								Sign Up
							</Link>
						</div>
					</Row>
				</Form>
			</Col>
		</Row>
	);
};

export default SignIn;
