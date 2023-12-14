import {
	deepOrange,
	deepPurple,
	green,
	grey,
	pink,
} from "@mui/material/colors";

export const avatarStyle = (id = 0) => {
	const avatarColors = [
		grey[500],
		deepOrange[500],
		deepPurple[500],
		pink[500],
		green[500],
		grey[500],
	];
	return {
		width: 55,
		height: 55,
		bgcolor: avatarColors[id],
	};
};

export const avatarName = (user) => {
	return user.firstName && user.lastName
		? `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`
		: "AU";
};
