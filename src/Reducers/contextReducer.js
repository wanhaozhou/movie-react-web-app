import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const contextSlice = createSlice({
	name: "context",
	initialState,
	reducers: {
		setContext: (state, action) => {
			for (let k in action.payload) {
				state[k] = action.payload[k];
			}
		},
		setCurrentUser: (state, action) => {
			state.currentUser = action.payload;
		},
		addFollowing: (state, action) => {
			state.following.push({ in_: action.payload });
		},
		removeFollowing: (state, action) => {
			state.following = state.following.filter(
				(item) => item.in_._id !== action.payload,
			);
		},
	},
});

export const { setContext, setCurrentUser, addFollowing, removeFollowing } =
	contextSlice.actions;
export default contextSlice.reducer;
