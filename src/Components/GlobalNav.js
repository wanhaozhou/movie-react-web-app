import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { RiMovie2Line } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setCurrentUser } from "../Reducers/contextReducer";
import { signout } from "../Client/users";

const GlobalNav = () => {
	const currentUser = useSelector((state) => state.context.currentUser);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSignOut = () => {
		signout()
			.then(() => {
				dispatch(setCurrentUser(null));
			})
			.catch(() => {
				console.log("Error signing out");
			})
			.finally(() => {
				navigate("/");
			});
	};

	return (
		<Navbar expand="lg" className="rounded">
			<Navbar.Brand className="ms-2" href="/">
				Movie Fans
				<span className="ms-2">
					<RiMovie2Line size={32} />
				</span>
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="me-auto ms-2">
					<Nav.Link href="/home">Home</Nav.Link>
					<Nav.Link href="/search">Search</Nav.Link>
					{currentUser && (
						<Nav.Link href="/profile">Profile</Nav.Link>
					)}
					{currentUser && currentUser.role === "ADMIN" && (
						<Nav.Link href="/admin">Admin</Nav.Link>
					)}
					{currentUser && currentUser.role === "CREATOR" && (
						<Nav.Link href="/studio">Studio</Nav.Link>
					)}
				</Nav>
			</Navbar.Collapse>
			<Navbar.Collapse className=" mb-1 ms-2 justify-content-end">
				<Nav>
					{currentUser ? (
						<>
							<Navbar.Text className="me-3">
								Welcome, {currentUser.username}!
							</Navbar.Text>
							<Navbar.Text className="me-2">
								<span
									onClick={handleSignOut}
									style={{ cursor: "pointer" }}
								>
									Sign Out
								</span>
							</Navbar.Text>
						</>
					) : (
						<>
							<Navbar.Text>
								<a
									href="/signin"
									style={{ textDecoration: "none" }}
								>
									Sign In
								</a>
							</Navbar.Text>
						</>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default GlobalNav;
