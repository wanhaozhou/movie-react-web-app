import axios from "axios";

const client = axios.create({
	baseURL: process.env.REACT_APP_API_URL
		? `${process.env.REACT_APP_API_URL}/api/movieReview`
		: `http://localhost:4000/api/movieReview`,
	withCredentials: true,
});

export const fetchReviews = async (movieId) => {
	return await client.get(`/${movieId}`);
};

export const createReview = async (data) => {
	return await client.post("", data);
};

export const deleteReview = async (id) => {
	return await client.delete(`/${id}`);
};

export const fetchReviewsByUser = async (username) => {
	return await client.get(`/user/${username}`);
};
