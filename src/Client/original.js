import axios from "axios";

const client = axios.create({
	baseURL: process.env.REACT_APP_API_URL
		? `${process.env.REACT_APP_API_URL}/api/original`
		: `http://localhost:4000/api/original`,
	withCredentials: true,
});

export const create = async (data) => {
	return await client.post("", data);
};

export const findByUser = async (_id) => {
	return await client.get(`/user/${_id}`);
};

export const findById = async (_id) => {
	return await client.get(`/id/${_id}`);
};

export const deleteById = async (_id) => {
	return await client.delete(`/${_id}`);
};

export const findSimilar = async (q) => {
	return await client.get(`/similar/${q}`);
};
