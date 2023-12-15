import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import * as tmdbClient from "../Client/tmdb";
import ErrorPage from "./ErrorPage";
import { Card, Col, Stack } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import MoviePosterPlaceholder from "../Components/MoviePosterPlaceholder";
import Row from "react-bootstrap/Row";

const Staff = () => {
	const tmdbImageBaseUrl = "https://image.tmdb.org/t/p/w500";

	const { sid } = useParams();
	const [movie, setMovie] = useState(null);
	const [staff, setStaff] = useState(null);

	useEffect(() => {
		const fetch = async () => {
			try {
				const movieData = await tmdbClient.fetchMovieDetails(sid);
				setMovie(movieData);

				const staffData = await tmdbClient.fetchStaff(sid);
				setStaff(staffData);
			} catch (e) {
				setMovie(undefined);
				setStaff(undefined);
			}
		};
		fetch();
	}, [sid]);

	return (
		<>
			{(movie === undefined || staff === undefined) && <ErrorPage />}
			{movie && staff && (
				<div className="container mt-5">
					<div className="col">
						<div className="text-center">
							{movie.poster_path ? (
								<Card
									style={{
										border: "none",
										width: "200px",
									}}
									className="mb-3 mx-auto"
								>
									<Card.Img
										variant="top"
										src={`${tmdbImageBaseUrl}${movie.poster_path}`}
									/>
								</Card>
							) : (
								<MoviePosterPlaceholder />
							)}
						</div>
					</div>
					<div className="col mt-5">
						<h3>{movie.title}</h3>

						{staff.cast && (
							<>
								<h5 className="mt-4">Cast</h5>
								<Row
									sm={2}
									md={3}
									lg={4}
									className="g-4 ms-0 ps-0"
								>
									{staff.cast
										.slice(
											0,
											Math.min(staff.cast.length, 4),
										)
										.map((user, idx) => (
											<Col
												key={idx}
												className="ms-0 ps-0 mb-2"
											>
												<Card>
													<Card.Body>
														<Stack
															direction="horizontal"
															gap={3}
														>
															<Avatar
																variant="rounded"
																src={`${tmdbImageBaseUrl}${user.profile_path}`}
																sx={{
																	width: 60,
																	height: 60,
																}}
															/>
															<div className="my-auto">
																{user.name}
															</div>
														</Stack>
													</Card.Body>
												</Card>
											</Col>
										))}
								</Row>
							</>
						)}

						{staff.crew && (
							<>
								<h5 className="mt-4">Crew</h5>
								<Row
									sm={2}
									md={3}
									lg={4}
									className="g-4 ms-0 ps-0"
								>
									{staff.crew
										.slice(
											0,
											Math.min(staff.crew.length, 4),
										)
										.map((user, idx) => (
											<Col
												key={idx}
												className="ms-0 ps-0 mb-2"
											>
												<Card>
													<Card.Body>
														<Stack
															direction="horizontal"
															gap={3}
														>
															<Avatar
																variant="rounded"
																src={`${tmdbImageBaseUrl}${user.profile_path}`}
																sx={{
																	width: 60,
																	height: 60,
																}}
															/>
															<div className="my-auto">
																{user.name}
															</div>
														</Stack>
													</Card.Body>
												</Card>
											</Col>
										))}
								</Row>
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default Staff;
