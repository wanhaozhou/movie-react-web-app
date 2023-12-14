import { RiMovie2Line } from "react-icons/ri";

const Footer = () => {
	return (
		<footer className="rounded text-center p-3 mt-5">
			<p>
				&copy; 2023 Movie Fans{" "}
				<span>
					<RiMovie2Line size={25} />
				</span>
			</p>
			<p>
				<img
					className="ms-2"
					width={150}
					src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
					alt="TMDB Logo"
				/>
			</p>
			<p>
				<small>
					This product uses the TMDB API but is not endorsed or
					certified by TMDB.
				</small>
			</p>
		</footer>
	);
};

export default Footer;
