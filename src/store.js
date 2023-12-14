import { configureStore } from "@reduxjs/toolkit";

import contextReducer from "./Reducers/contextReducer";

const store = configureStore({
	reducer: {
		context: contextReducer,
	},
});

export default store;
