import { CircularProgress } from "@mui/material";

const Spinner = () => {
	return (
		<div className="d-flex align-items-center justify-content-center vh-100">
			<div className="text-center">
				<CircularProgress />
			</div>
		</div>
	);
};

export default Spinner;
