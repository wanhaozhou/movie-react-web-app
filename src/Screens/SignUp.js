import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { createUser } from "../Client/users";
import { useSelector } from "react-redux";
import ErrorPage from "./ErrorPage";

const SignUp = () => {
	const currentUser = useSelector((state) => state.context.currentUser);
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		username: "",
		firstName: "",
		lastName: "",
		password: "",
		confirmPassword: "",
		role: "FAN",
		email: "",
		dateOfBirth: "",
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
		console.log("Form submitted:", formData);
		if (formData.confirmPassword !== formData.password) {
			setError("Passwords do not match.");
			return;
		}
		try {
			const body = { ...formData };
			delete body.confirmPassword;
			await createUser(body);
			navigate("/signin");
		} catch (e) {
			setError(e.response.data.error);
		}
	};

	return currentUser ? (
		<ErrorPage code="400" />
	) : (
		<Row className="justify-content-md-center">
			<Col md={6} className="mt-3 p-5 rounded">
				<h2 className="my-3 text-center display-6">Sign Up</h2>

				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="formUsername" className="mb-4">
						<Form.Label className="ms-1">Username</Form.Label>
						<Form.Control
							maxLength={8}
							type="text"
							placeholder="Enter Username"
							name="username"
							value={formData.username}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					<Form.Group controlId="formFirstName" className="mb-4">
						<Form.Label className="ms-1">First Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter First Name"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					<Form.Group controlId="formLastName" className="mb-4">
						<Form.Label className="ms-1">Last Name</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Last Name"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					<Form.Group controlId="formPassword" className="mb-4">
						<Form.Label className="ms-1">Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter Password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					<Form.Group
						controlId="formConfirmPassword"
						className="mb-4"
					>
						<Form.Label className="ms-1">
							Confirm Password
						</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm Password"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					<Form.Group controlId="formRole" className="mb-4">
						<Form.Label className="ms-1">Role</Form.Label>
						<Form.Select
							required
							onChange={handleChange}
							value={formData.role}
							name="role"
						>
							<option value="ADMIN">ADMIN</option>
							<option value="FAN">FAN</option>
							<option value="CREATOR">CREATOR</option>
						</Form.Select>
					</Form.Group>

					<Form.Group controlId="formEmail" className="mb-4">
						<Form.Label className="ms-1">Email</Form.Label>
						<Form.Control
							placeholder="Enter Email"
							name="email"
							value={formData.email}
							onChange={handleChange}
						/>
					</Form.Group>

					<Form.Group controlId="formDateOfBirth" className="mb-4">
						<Form.Label className="ms-1">Date of Birth</Form.Label>
						<Form.Control
							type="date"
							name="dateOfBirth"
							value={formData.dateOfBirth}
							onChange={handleChange}
						/>
					</Form.Group>

					{error && <p className="text-danger mb-4">{error}</p>}

					<Row className="mx-auto mb-4">
						<Button variant="primary" type="submit">
							Sign Up
						</Button>
					</Row>

					<Row className="mx-auto mb-4">
						<div className="text-center">
							<span className="me-2">
								Already have an account?
							</span>
							<Link
								to="/signin"
								style={{ textDecoration: "none" }}
							>
								Sign In
							</Link>
						</div>
					</Row>
				</Form>
			</Col>
		</Row>
	);
};

export default SignUp;
