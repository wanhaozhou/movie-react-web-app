import { Container, Row, Badge, Modal, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useSelector } from "react-redux";

import StarVisualization from "../Components/StarVisualization";
import MoviePosterPlaceholder from "../Components/MoviePosterPlaceholder";
import MovieCard from "../Components/MovieCard";
import * as tmdbClient from "../Client/tmdb";
import * as favoriteMovieClient from "../Client/favoriteMovie";
import * as movieReviewClient from "../Client/movieReview";
import NoRecord from "../Components/NoRecord";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { RiDeleteBin5Line } from "react-icons/ri";

const Details = () => {
	const { did } = useParams();
	const navigate = useNavigate();

	const currentUser = useSelector((state) => state.context.currentUser);
	const [favorite, setFavorite] = useState(
		useSelector((state) =>
			state.context.favorite
				.map((item) => item.movie)
				.includes(parseInt(did)),
		),
	);

	const [movie, setMovie] = useState(null);
	const [reviews, setReviews] = useState([]);

	const tmdbImageBaseUrl = "https://image.tmdb.org/t/p/w500";

	useEffect(() => {
		const fetchMovieDetails = async () => {
			try {
				const data = await tmdbClient.fetchMovieDetails(did);
				setMovie(data);
			} catch (error) {
				console.log(error);
				navigate("/404");
			}
		};
		const fetchMoviewReviews = async () => {
			try {
				const { data } = await movieReviewClient.fetchReviews(did);
				setReviews(data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchMovieDetails();
		fetchMoviewReviews();
	}, [did, navigate]);

	const handleAddFavorite = () => {
		favoriteMovieClient
			.addFavorite(currentUser._id, did, movie)
			.then(() => setFavorite(true))
			.catch((e) => console.log(e));
	};

	const handleRemoveFavorite = () => {
		favoriteMovieClient
			.removeFavorite(currentUser._id, did)
			.then(() => setFavorite(false))
			.catch((e) => console.log(e));
	};

	const [showModal, setShowModal] = useState(false);
	const [reviewText, setReviewText] = useState("");
	const handleClose = () => {
		setReviewText("");
		setShowModal(false);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const data = {
				user: currentUser._id,
				movie: parseInt(did),
				review: reviewText,
				title: movie.title,
				poster_path: movie.poster_path,
			};
			await movieReviewClient.createReview(data);
			setReviews([
				...reviews,
				{
					...data,
					user: { ...currentUser },
				},
			]);
		} catch (error) {
			console.log(error);
		} finally {
			setReviewText("");
			setShowModal(false);
		}
	};

	const handleDeleteReview = async (reviewId) => {
		movieReviewClient
			.deleteReview(reviewId)
			.then(() => setReviews(reviews.filter((r) => r._id !== reviewId)))
			.catch((e) => console.log(e));
	};

	return (
		<Container fluid className="mt-3">
			{
				<Modal show={showModal} onHide={handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Write a Review</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form onSubmit={(e) => handleSubmit(e)}>
							<Form.Group>
								<Form.Label className="mt-3">
									Your Review
								</Form.Label>
								<Form.Control
									as="textarea"
									rows={6}
									value={reviewText}
									onChange={(e) =>
										setReviewText(e.target.value)
									}
									required
								/>
							</Form.Group>
							<Row className="mx-auto mt-4">
								<Button variant="primary" type="submit">
									Submit Review
								</Button>
							</Row>
						</Form>
					</Modal.Body>
				</Modal>
			}
			{movie && (
				<>
					<Row className="mt-5">
						<div className="col-md-4 d-flex align-items-center justify-content-center">
							{movie.poster_path ? (
								<MovieCard
									movie={{
										id: did,
										poster:
											tmdbImageBaseUrl +
											movie.poster_path,
										width: "230px",
									}}
								/>
							) : (
								<MoviePosterPlaceholder />
							)}
						</div>
						<div className="col-md-7">
							<h3>
								{movie.original_title}
								{currentUser &&
									(favorite ? (
										<div
											className="text-danger float-end"
											onClick={handleRemoveFavorite}
										>
											<MdFavorite />
										</div>
									) : (
										<div
											className="text-danger float-end"
											onClick={handleAddFavorite}
										>
											<MdFavoriteBorder />
										</div>
									))}
							</h3>

							<h5 className="mt-4">Genre</h5>
							{movie.genres.length > 0 ? (
								movie.genres.map((item, index) => (
									<Badge
										bg="primary"
										className="me-2 px-2"
										pill
										key={index}
									>
										{item.name}
									</Badge>
								))
							) : (
								<Badge bg="warning" className="me-2 px-2" pill>
									Unknown
								</Badge>
							)}

							<h5 className="mt-4">TMDB Rating</h5>
							{movie.vote_average ? (
								<StarVisualization score={movie.vote_average} />
							) : (
								<h5 style={{ fontWeight: 300 }}>N/A</h5>
							)}

							<h5 className="mt-4">Overview</h5>
							<p>{movie.overview}</p>
						</div>
					</Row>
					<Row className="mt-5">
						<div className="offset-md-1 col-md-10">
							<h3>
								Reviews
								{currentUser && (
									<span className="float-end">
										<FaRegEdit
											onClick={() => setShowModal(true)}
										/>
									</span>
								)}
							</h3>
							{reviews.length > 0 && (
								<Row xs={1} className="ms-0 ps-0 mb-5 mt-3">
									{reviews.map((review, idx) => (
										<Col
											key={idx}
											className="ms-0 ps-0 mb-3"
										>
											<Card>
												<Card.Body>
													<Card.Title>
														<div className="my-auto">
															<span
																style={{
																	cursor: "pointer",
																}}
																onClick={() =>
																	navigate(
																		`/profile/${review.user.username}`,
																	)
																}
															>
																{
																	review.user
																		.username
																}
															</span>
															{currentUser &&
																currentUser.username ===
																	review.user
																		.username && (
																	<span className="float-end">
																		<RiDeleteBin5Line
																			onClick={() =>
																				handleDeleteReview(
																					review._id,
																				)
																			}
																		/>
																	</span>
																)}
														</div>
													</Card.Title>
													<Card.Text>
														{review.review}
													</Card.Text>
												</Card.Body>
											</Card>
										</Col>
									))}
								</Row>
							)}
							{reviews.length === 0 && (
								<div className="mt-3">
									<NoRecord />
								</div>
							)}
						</div>
					</Row>
				</>
			)}
		</Container>
	);
};

export default Details;
