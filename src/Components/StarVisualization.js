import React from "react";
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";
import { IconContext } from "react-icons";

const StarVisualization = ({ score, size = 30, variant = "text-warning" }) => {
	const renderStar = (starNumber) => {
		return score >= starNumber ? (
			<FaStar className={variant} />
		) : score + 0.5 >= starNumber ? (
			<FaStarHalfAlt className={variant} />
		) : (
			<FaRegStar className={variant} />
		);
	};

	return (
		<>
			{[2, 4, 6, 8, 10].map((starNumber) => (
				<span key={starNumber}>
					<IconContext.Provider value={{ size }}>
						{renderStar(starNumber)}
					</IconContext.Provider>
				</span>
			))}
		</>
	);
};

export default StarVisualization;
