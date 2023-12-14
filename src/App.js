import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Container } from "react-bootstrap";

import GlobalNav from "./Components/GlobalNav";
import Home from "./Screens/Home";
import Search from "./Screens/Search";
import Details from "./Screens/Details";
import PersonalProfile from "./Screens/PersonalProfile";
import SignIn from "./Screens/SignIn";
import SignUp from "./Screens/SignUp";
import ErrorPage from "./Screens/ErrorPage";
import Footer from "./Components/Footer";
import Admin from "./Screens/Admin";
import Studio from "./Screens/Studio";

import "bootstrap/dist/css/bootstrap.min.css";
import Original from "./Screens/Original";

const App = () => {
	return (
		<Container fluid className="bg-light">
			<BrowserRouter forceRefresh>
				<Container fluid>
					<GlobalNav />
				</Container>
				<Container fluid className="min-vh-100 mb-5">
					<Routes>
						<Route path="/home" element={<Home />} />
						<Route path="/search" element={<Search />} />
						<Route path="/search/:query" element={<Search />} />
						<Route path="/details/:did" element={<Details />} />
						<Route path="/profile" element={<PersonalProfile />} />
						<Route
							path="/profile/:uid"
							element={<PersonalProfile />}
						/>
						<Route path="/signin" element={<SignIn />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/admin" element={<Admin />} />
						<Route path="/studio" element={<Studio />} />
						<Route path="/original/:oid" element={<Original />} />
						<Route path="/404" element={<ErrorPage />} />
						<Route path="/" element={<Navigate to="/home" />} />
						<Route path="*" element={<ErrorPage code="404" />} />
					</Routes>
				</Container>
			</BrowserRouter>
			<Container fluid className="mt-5">
				<Footer />
			</Container>
		</Container>
	);
};

export default App;
