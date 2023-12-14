import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useWindowSize } from "usehooks-ts";

import { FaRegCircleUser } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { MdOutlineReviews } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";
import { PiGooglePhotosLogo } from "react-icons/pi";

const Sidebar = ({ onMenuItemClick, uid }) => {
	const [activePage, setActivePage] = useState("Profile");

	useEffect(() => {
		setActivePage("Profile");
	}, [uid]);

	const handleItemClick = (page) => {
		onMenuItemClick(page);
		setActivePage(page);
	};

	const limit = 850;
	const { width } = useWindowSize();

	const iconSize = 20;
	const iconSizeLarge = 23;
	const pages = [
		[
			"Profile",
			<FaRegCircleUser
				size={width >= limit ? iconSize : iconSizeLarge}
			/>,
		],
		[
			"Favorites",
			<FaHeart size={width >= limit ? iconSize : iconSizeLarge} />,
		],
		[
			"Reviews",
			<MdOutlineReviews
				size={width >= limit ? iconSize : iconSizeLarge}
			/>,
		],
		[
			"Follows",
			<RiUserFollowLine
				size={width >= limit ? iconSize : iconSizeLarge}
			/>,
		],
		[
			"Followers",
			<BsPeople size={width >= limit ? iconSize : iconSizeLarge} />,
		],
		[
			"Misc",
			<PiGooglePhotosLogo
				size={width >= limit ? iconSize : iconSizeLarge}
			/>,
		],
	];

	return (
		<Nav className="flex-column">
			{pages.map((page) => (
				<Nav.Item key={page}>
					<Nav.Link
						style={{ color: "black", textDecoration: "none" }}
						className={`${
							activePage === page[0] ? "fw-bold" : ""
						} ps-0 pe-0`}
						onClick={() => handleItemClick(page[0])}
					>
						{width >= limit ? (
							<>
								{page[1]}
								<span className="ms-3">{page[0]}</span>
							</>
						) : (
							page[1]
						)}
					</Nav.Link>
				</Nav.Item>
			))}
		</Nav>
	);
};

export default Sidebar;
