import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { HiLink } from "react-icons/hi2";
import CircularProgress from "@mui/material/CircularProgress";
import { IconContext } from "react-icons";
import { Link, useParams, useNavigate } from "react-router-dom";

import * as tmdbClient from "../Client/tmdb";
import * as originalClient from "../Client/original";

const Search = () => {
	const { query } = useParams();
	const navigate = useNavigate();

	const errorString = "There is an error when searching your movie in TMDB.";
	const noResultsString = "There are no results for your search in TMDB.";

	const [searchQuery, setSearchQuery] = useState(query || "");
	const [searchResults, setSearchResults] = useState([]);
	const [localResults, setLocalResults] = useState([]);
	const [searchError, setSearchError] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSearch = async () => {
		const trimmedQuery = searchQuery.trim();
		if (trimmedQuery.length <= 0) {
			navigate(`/search`);
		} else {
			navigate(`/search/${searchQuery.trim()}`);
		}
	};

	useEffect(() => {
		setSearchResults([]);
		setLoading([]);
		setLoading(false);
		setSearchError(null);
		if (!query) {
			return;
		}
		const fetchSearchResults = async () => {
			setLoading(true);
			try {
				const data = await tmdbClient.searchMovies(query);
				if (data.results.length <= 0) {
					setSearchError(noResultsString);
					setLoading(false);
					return;
				}
				setSearchError(null);
				setSearchResults(
					data.results.map((result) => {
						return {
							original_title: result.original_title,
							id: result.id,
							release_date: result.release_date,
							popularity: result.popularity,
							overview: result.overview,
						};
					}),
				);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setSearchError(errorString);
				setLoading(false);
			}
		};
		const fetchLocalResults = async () => {
			try {
				const resp = await originalClient.findSimilar(query);
				setLocalResults(resp.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchSearchResults();
		fetchLocalResults();
	}, [query]);

	return (
		<Container className="mt-5">
			<div className="d-flex justify-content-center mb-5">
				<IconContext.Provider value={{ size: 100 }}>
					<IoSearchOutline />
				</IconContext.Provider>
			</div>
			<div className="d-flex justify-content-center mb-5">
				<h2 className="display-6">Find your favorite movie here</h2>
			</div>

			<div className="input-group mt-5">
				<input
					type="search"
					className="form-control rounded-left"
					placeholder="Enter a movie name"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					style={{ height: "50px" }}
				/>
				<button
					type="button"
					className="btn btn-primary"
					onClick={handleSearch}
				>
					Search
				</button>
			</div>
			{searchError && (
				<h6 className="text-center mt-5"> {searchError} </h6>
			)}
			{loading && (
				<div className="d-flex justify-content-center mt-5">
					<CircularProgress size={30} />
				</div>
			)}
			{!searchError && searchResults.length > 0 && (
				<>
					<Card className="mt-5" style={{ border: "none" }}>
						<Card.Header
							style={{ border: "none" }}
							className="text-center"
						>
							<h5>TMDB Results</h5>
						</Card.Header>
					</Card>
					{searchResults.map((result, index) => (
						<Card style={{ border: "none" }} key={index}>
							<Card.Body>
								<Card.Title>
									<Link
										to={`/details/${result.id}`}
										style={{
											color: "black",
											textDecoration: "none",
										}}
									>
										{result.original_title}{" "}
										{result.release_date
											? ` (${
													result.release_date.split(
														"-",
													)[0]
											  })`
											: ""}
										<span className="ms-2">
											<HiLink />
										</span>
									</Link>
								</Card.Title>
								<Card.Text>{result.overview}</Card.Text>
							</Card.Body>
						</Card>
					))}
				</>
			)}
			{localResults.length > 0 && (
				<>
					<Card className="mt-5" style={{ border: "none" }}>
						<Card.Header
							style={{ border: "none" }}
							className="text-center"
						>
							<h5>Movie Fans Results</h5>
						</Card.Header>
					</Card>
					{localResults.map((result, index) => (
						<Card style={{ border: "none" }} key={index}>
							<Card.Body>
								<Card.Title>
									<Link
										to={`/original/${result._id}`}
										style={{
											color: "black",
											textDecoration: "none",
										}}
									>
										{result.title}{" "}
										{result.creationDate
											? ` (${
													result.creationDate.split(
														"-",
													)[0]
											  })`
											: ""}
										<span className="ms-2">
											<HiLink />
										</span>
									</Link>
								</Card.Title>
								<Card.Text>{result.overview}</Card.Text>
							</Card.Body>
						</Card>
					))}
				</>
			)}
		</Container>
	);
};

export default Search;
