import { useSelector } from "react-redux";
import ErrorPage from "./ErrorPage";
import React, { useState } from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import * as client from "../Client/original";

const Studio = () => {
	const currentUser = useSelector((state) => state.context.currentUser);
	const navigate = useNavigate();

	const initialData = {
		title: "",
		link: "",
		overview: "",
		creationDate: new Date().toISOString().slice(0, 10),
	};
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState(initialData);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		client
			.create({ ...formData, user: currentUser._id })
			.then((resp) => {
				console.log(resp);
				setFormData({ ...initialData });
				setError(null);
				navigate("/profile");
			})
			.catch((error) => setError(e.response.data.error));
	};

	if (!currentUser || currentUser.role !== "CREATOR") {
		return <ErrorPage code={"403"} />;
	}

	return (
		<Row className="justify-content-md-center">
			<Col md={6} className="mt-3 p-5 rounded">
				<h2 className="my-3 text-center display-6">
					Create an original work
				</h2>
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="formUsername" className="mb-4">
						<Form.Label className="ms-1">Title</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Title"
							name="title"
							value={formData.title}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					<Form.Group controlId="formFirstName" className="mb-4">
						<Form.Label className="ms-1">Link</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Link"
							name="link"
							value={formData.link}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					<Form.Group controlId="formLastName" className="mb-4">
						<Form.Label className="ms-1">Overview</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter Overview"
							name="overview"
							value={formData.overview}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					<Form.Group controlId="formDateOfBirth" className="mb-4">
						<Form.Label className="ms-1">Creation Date</Form.Label>
						<Form.Control
							type="date"
							name="creationDate"
							value={formData.creationDate}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					{error && <p className="text-danger mb-4">{error}</p>}

					<Row className="mx-auto mb-4">
						<Button variant="primary" type="submit">
							Save
						</Button>
					</Row>
				</Form>
			</Col>
		</Row>
	);
};

export default Studio;
