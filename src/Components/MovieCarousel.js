import Carousel from "react-bootstrap/Carousel";
import { Link } from "react-router-dom";

const MovieCarousel = ({ movies }) => {
	return (
		movies &&
		movies.length > 0 && (
			<Carousel className="ms-2">
				{movies.map((m, index) => (
					<Carousel.Item key={index}>
						<Link to={`/details/${m.id}`}>
							<img
								className="d-block w-100 rounded"
								src={m.backdrop}
								alt="slide"
							/>
						</Link>
						<Carousel.Caption>
							<h3>
								<strong>{m.title}</strong>
							</h3>
						</Carousel.Caption>
					</Carousel.Item>
				))}
			</Carousel>
		)
	);
};

export default MovieCarousel;
