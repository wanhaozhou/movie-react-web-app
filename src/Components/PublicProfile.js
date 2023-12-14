import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Profile from "./ProfileScreens/Profile";
import Favorites from "./ProfileScreens/Favorites";
import Reviews from "./ProfileScreens/Reviews";
import Follows from "./ProfileScreens/Follows";
import Followers from "./ProfileScreens/Followers";
import Misc from "./ProfileScreens/Misc";

const PublicProfile = ({ uid }) => {
	const [currentPage, setCurrentPage] = useState("Profile");
	const handleMenuItemClick = (page) => {
		setCurrentPage(page);
	};

	const mapPageToComponent = {
		Profile: <Profile uid={uid} />,
		Favorites: <Favorites uid={uid} />,
		Reviews: <Reviews uid={uid} />,
		Follows: <Follows uid={uid} />,
		Followers: <Followers uid={uid} />,
		Misc: <Misc uid={uid} />,
	};

	useEffect(() => {
		setCurrentPage("Profile");
	}, [uid]);

	return (
		<div className="container-fluid mt-3">
			<div className="row">
				<div className="col-2">
					<Sidebar onMenuItemClick={handleMenuItemClick} uid={uid} />
				</div>
				<div className="col">{mapPageToComponent[currentPage]}</div>
			</div>
		</div>
	);
};

export default PublicProfile;
