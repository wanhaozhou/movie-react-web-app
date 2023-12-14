import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

import * as favoriteMovieClient from "../../Client/favoriteMovie";
import NoRecord from "../NoRecord";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Favorites = ({ uid }) => {
	const tmdbImageBaseUrl = "https://image.tmdb.org/t/p/w500";
	const currentUser = useSelector((state) => state.context.currentUser);

	const [movies, setMovies] = useState([]);

	useEffect(() => {
		favoriteMovieClient
			.fetchFavorite(uid)
			.then((resp) => setMovies(resp.data))
			.catch((err) => console.log(err));
	}, [uid]);

	const handleRemoveFavorite = (movieId) => {
		const movieId_ = parseInt(movieId);
		favoriteMovieClient
			.removeFavorite(currentUser._id, movieId_)
			.then(() => {
				setMovies(movies.filter((m) => m.id !== movieId_));
			})
			.catch((e) => console.log(e));
	};

	return (
		<>
			<div className="display-6 mb-5">Favorite Movies</div>
			{movies.length <= 0 && <NoRecord />}
			{movies.length > 0 && (
				<Row xs={1} md={3} xl={4} className="g-4 ms-0 ps-0 mb-5">
					{movies.map((m, idx) => (
						<Col key={idx} className="ms-0 ps-0">
							<Card>
								<Link
									to={`/details/${m.id}`}
									className="text-black"
									style={{ textDecoration: "none" }}
								>
									<Card.Img
										variant="top"
										src={`${tmdbImageBaseUrl}/${m.poster_path}`}
									/>
								</Link>
								{currentUser &&
									(currentUser.username === uid || !uid) && (
										<Card.Footer>
											<div className="text-center">
												<RiDeleteBin5Line
													size={20}
													onClick={() =>
														handleRemoveFavorite(
															m.id,
														)
													}
												/>
											</div>
										</Card.Footer>
									)}
							</Card>
						</Col>
					))}
				</Row>
			)}
		</>
	);
};
export default Favorites;
