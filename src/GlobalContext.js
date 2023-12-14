import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { fetchContext } from "./Client/context";
import { setContext } from "./Reducers/contextReducer";
import Spinner from "./Screens/Spinner";

const GlobalContext = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();
	useEffect(() => {
		fetchContext()
			.then((resp) => {
				dispatch(setContext(resp.data));
			})
			.catch((e) => {
				console.log(e);
			})
			.finally(() => {
				setTimeout(() => setLoading(false), 100);
			});
	}, [dispatch]);
	return loading ? <Spinner /> : children;
};

export default GlobalContext;
