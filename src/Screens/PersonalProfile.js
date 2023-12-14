import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import PublicProfile from "../Components/PublicProfile";
import ErrorPage from "./ErrorPage";

const PersonalProfile = () => {
	const { uid } = useParams();
	const currentUser = useSelector((state) => state.context.currentUser);
	if (!uid) {
		return currentUser ? (
			<PublicProfile uid={currentUser.username} />
		) : (
			<ErrorPage code="401" />
		);
	}
	return <PublicProfile uid={uid} />;
};
export default PersonalProfile;
