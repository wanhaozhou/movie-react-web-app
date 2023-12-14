import axios from "axios";

const client = axios.create({
	baseURL: process.env.REACT_APP_API_URL
		? `${process.env.REACT_APP_API_URL}/api/context`
		: `http://localhost:4000/api/context`,
	withCredentials: true,
});

export const fetchContext = async () => {
	return await client.get("");
};
