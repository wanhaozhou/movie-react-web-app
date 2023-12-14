import axios from "axios";

const client = axios.create({
	baseURL: process.env.REACT_APP_API_URL
		? `${process.env.REACT_APP_API_URL}/api/users`
		: `http://localhost:4000/api/users`,
	withCredentials: true,
});

export const signin = async (data) => {
	return await client.post("/signin", data);
};

export const account = async () => {
	return await client.get("/account");
};

export const signout = async () => {
	return await client.post("/signout");
};

export const createUser = async (user) => {
	return await client.post("", user);
};

export const findByUsername = async (username) => {
	return await client.get(`/username/${username}`);
};

export const updateUser = async (userId, userData) => {
	return await client.put("", { userId, userData });
};

export const updateUserActive = async (userId, userData) => {
	return await client.put("/active", { userId, userData });
};

export const all = async () => {
	return await client.get("");
};
