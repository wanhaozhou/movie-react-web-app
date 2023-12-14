import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import * as movieReviewClient from "../../Client/movieReview";
import NoRecord from "../NoRecord";

const Reviews = ({ uid }) => {
	const [reviews, setReviews] = useState([]);

	const currentUser = useSelector((state) => state.context.currentUser);

	useEffect(() => {
		movieReviewClient
			.fetchReviewsByUser(uid)
			.then((resp) => setReviews(resp.data))
			.catch((e) => console.log(e));
	}, [uid]);

	const handleDelete = (_id) => {
		movieReviewClient
			.deleteReview(_id)
			.then(() => {
				setReviews(reviews.filter((r) => r._id !== _id));
			})
			.catch((e) => console.log(e));
	};

	return (
		<>
			<div className="display-6 mb-5">Reviews</div>
			{reviews.length === 0 && <NoRecord />}
			{reviews.length > 0 && (
				<Row xs={1} className="g-4 ms-0 ps-0 mb-5">
					{reviews.map((review, idx) => (
						<Col key={idx} className="ms-0 ps-0">
							<Card>
								<Card.Body>
									<Link
										to={`/details/${review.movie}`}
										style={{
											textDecoration: "none",
											color: "black",
										}}
									>
										<Card.Title>{review.title}</Card.Title>
									</Link>
									<Card.Text>{review.review}</Card.Text>
								</Card.Body>
								{currentUser &&
									(currentUser.username === uid || !uid) && (
										<Card.Footer>
											<div className="text-center">
												<RiDeleteBin5Line
													size={20}
													onClick={() =>
														handleDelete(review._id)
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
export default Reviews;
