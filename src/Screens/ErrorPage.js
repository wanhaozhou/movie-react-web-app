const ErrorPage = ({ code = "404" }) => {
	const errors = {
		400: {
			header: "Bad Request",
			description: "The request you made is invalid.",
		},
		401: {
			header: "Unauthorized",
			description: "You are not authorized to view this page.",
		},
		403: {
			header: "Forbidden",
			description: "You are not allowed to view this page.",
		},
		404: {
			header: "Not Found",
			description: "The page you are looking for does not exist.",
		},
	};
	return (
		<div className="d-flex align-items-center justify-content-center vh-100">
			<div className="text-center">
				<h1 className="display-1 text-danger fw-bold">{code}</h1>
				<p className="fs-4">{errors[code].header}</p>
				<p className="fs-6">{errors[code].description}</p>
			</div>
		</div>
	);
};

export default ErrorPage;
