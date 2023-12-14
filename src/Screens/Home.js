import MovieCarousel from "../Components/MovieCarousel";
import MovieCard from "../Components/MovieCard";
import { useEffect, useState } from "react";

import * as tmdbClient from "../Client/tmdb";
import * as favoriteMovieClient from "../Client/favoriteMovie";
import { useSelector } from "react-redux";
import NoRecord from "../Components/NoRecord";

const Home = () => {
	const currentUser = useSelector((state) => state.context.currentUser);
	const reviews = useSelector((state) => state.context.reviews);

	const tmdbImageBaseUrl = "https://image.tmdb.org/t/p/w500";
	const tmdbImageOriginalUrl = "https://image.tmdb.org/t/p/original";

	const [popularMovies, setPopularMovies] = useState([]);
	const [carousel, setCarousel] = useState([]);
	const [favoriteMovies, setFavoriteMovies] = useState([]);

	useEffect(() => {
		const fetchPopularMovies = async () => {
			try {
				const data = await tmdbClient.fetchPopularMovies(
					Math.floor(Math.random() * 5) + 1,
				);
				const posters = data.results.map((m) => {
					return {
						poster: tmdbImageBaseUrl + m.poster_path,
						id: m.id,
					};
				});
				const backdrops = data.results
					.filter(
						(m) =>
							m.backdrop_path !== null &&
							m.original_title !== null,
					)
					.map((m) => {
						return {
							backdrop: tmdbImageOriginalUrl + m.backdrop_path,
							id: m.id,
							title: m.original_title,
						};
					});
				setPopularMovies(posters || []);
				setCarousel(
					backdrops.slice(0, Math.min(backdrops.length, 5)) || [],
				);
			} catch (error) {
				console.log(error);
			}
		};
		fetchPopularMovies();

		if (currentUser) {
			favoriteMovieClient
				.fetchFavorite(currentUser.username)
				.then((resp) => setFavoriteMovies(resp.data))
				.catch((err) => console.log(err));
		}
	}, [currentUser]);

	return (
		<>
			<div className="container-fluid offset-2 d-none d-md-block col-8 mb-5">
				<div className="row mt-5">
					<MovieCarousel movies={carousel} />
				</div>
			</div>
			<div className="container-fluid offset-2 col-9 mb-5">
				{popularMovies.length > 0 && (
					<>
						<div className="row mt-5">
							<p
								style={{ fontWeight: 300, fontSize: "1.5rem" }}
								className="p-0"
							>
								Trending
							</p>
						</div>
						<div className="row mt-2">
							{popularMovies.map((movie, index) => (
								<MovieCard key={index} movie={movie} />
							))}
						</div>
					</>
				)}

				{/*
				Latest Reviews
				*/}

				{currentUser && (
					<>
						<div className="row mt-5">
							<p
								style={{ fontWeight: 300, fontSize: "1.5rem" }}
								className="p-0"
							>
								My Favorites
							</p>
						</div>
						{favoriteMovies.length === 0 && (
							<div className="row mt-2">
								<NoRecord />
							</div>
						)}
						{favoriteMovies.length > 0 && (
							<div className="row mt-2">
								{favoriteMovies.map((movie, index) => (
									<MovieCard key={index} movie={movie} />
								))}
							</div>
						)}
					</>
				)}

				{currentUser && (
					<>
						<div className="row mt-5">
							<p
								style={{ fontWeight: 300, fontSize: "1.5rem" }}
								className="p-0"
							>
								My Reviews
							</p>
						</div>
						{reviews.length === 0 && (
							<div className="row mt-2">
								<NoRecord />
							</div>
						)}
						{reviews.length > 0 && (
							<div className="row mt-2">
								{[
									...new Set(
										reviews.map((r) =>
											JSON.stringify({
												poster_path: r.poster_path,
												id: r.movie,
											}),
										),
									),
								].map((r, index) => (
									<MovieCard
										key={index}
										movie={JSON.parse(r)}
									/>
								))}
							</div>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default Home;
