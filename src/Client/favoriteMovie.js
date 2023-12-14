import axios from "axios";

const client = axios.create({
	baseURL: process.env.REACT_APP_API_URL
		? `${process.env.REACT_APP_API_URL}/api/favoriteMovie`
		: `http://localhost:4000/api/favoriteMovie`,
	withCredentials: true,
});

export const addFavorite = async (user, movie, data = {}) => {
	return await client.post("/add", { user, movie: parseInt(movie), data });
};

export const removeFavorite = async (user, movie) => {
	return await client.post("/remove", { user, movie: parseInt(movie) });
};

export const fetchFavorite = async (user) => {
	return await client.get(`/fetch/${user}`);
};
