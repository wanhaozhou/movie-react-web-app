import axios from "axios";

const client = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	headers: { Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}` },
});

export const fetchPopularMovies = async (page = 1) => {
	const { data } = await client.get(
		`/movie/popular?language=en-US&page=${page}`,
	);
	return data;
};

export const fetchMovieDetails = async (id) => {
	const { data } = await client.get(`/movie/${id}`);
	return data;
};

export const searchMovies = async (query, page = 1) => {
	const { data } = await client.get(
		`/search/movie?&query=${query}&page=${page}&&include_adult=true`,
	);
	return data;
};

export const fetchStaff = async (id) => {
	const { data } = await client.get(`/movie/${id}/credits`);
	return data;
};

export const fetchCompany = async (id) => {
	const { data } = await client.get(`/company/${id}`);
	return data;
};
