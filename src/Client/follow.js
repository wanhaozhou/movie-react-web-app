import axios from "axios";

const client = axios.create({
	baseURL: process.env.REACT_APP_API_URL
		? `${process.env.REACT_APP_API_URL}/api/follow`
		: `http://localhost:4000/api/follow`,
	withCredentials: true,
});

export const follow = async (out_, in_) => {
	return await client.post("", { out_, in_ });
};

export const unfollow = async (out_, in_) => {
	return await client.post("/unfollow", { out_, in_ });
};

export const findFollowingByUsername = async (username) => {
	return await client.post("/following/username", { username });
};

export const findFollowersByUsername = async (username) => {
	return await client.post("/follower/username", { username });
};
