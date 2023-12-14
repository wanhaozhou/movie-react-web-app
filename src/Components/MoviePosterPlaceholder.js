const placeholderStyle = {
	width: "200px",
	height: "300px",
	backgroundColor: "#ddd",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	borderRadius: "8px",
	overflow: "hidden",
	color: "#555",
	fontSize: "16px",
	fontWeight: "bold",
};

const MoviePosterPlaceholder = ({ bootstrapProps }) => {
	return (
		<div style={placeholderStyle} className={bootstrapProps || ""}>
			<p className="text-center">Movie Poster Not Available</p>
		</div>
	);
};

export default MoviePosterPlaceholder;
