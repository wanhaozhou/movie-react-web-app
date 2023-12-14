import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
	const style = {
		border: "none",
		padding: "0",
		width: movie.width || "200px",
	};
	const tmdbImageBaseUrl = "https://image.tmdb.org/t/p/w500";

	return (
		<Card style={style} className="mb-3 me-3">
			<Link to={movie.id ? `/details/${movie.id}` : "#"}>
				<Card.Img
					variant="top"
					src={
						movie.poster ||
						`${tmdbImageBaseUrl}${movie.poster_path}`
					}
				/>
			</Link>
		</Card>
	);
};

export default MovieCard;
