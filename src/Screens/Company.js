import { useParams } from "react-router";
import React, { useEffect, useState } from "react";

import * as tmdbClient from "../Client/tmdb";
import ErrorPage from "./ErrorPage";

const Company = () => {
	const { cid } = useParams();
	const [company, setCompany] = useState(null);
	const countryCode = new Intl.DisplayNames(["en"], { type: "region" });

	useEffect(() => {
		const fetch = async () => {
			try {
				const data = await tmdbClient.fetchCompany(cid);
				setCompany(data);
			} catch (e) {
				setCompany(undefined);
			}
		};
		fetch();
	}, [cid]);

	return (
		<>
			{company === undefined && <ErrorPage />}
			{company && (
				<div className="container mt-5">
					<div className="col">
						<div className="text-center">
							<img
								src={`https://placehold.co/300x200?text=${company.name}`}
								alt={company.name}
								className="rounded"
							/>
						</div>
					</div>
					<div className="col mt-5">
						<h3>{company.name}</h3>

						{company.description && (
							<>
								<h5 className="mt-4">Description</h5>
								<p>{company.description}</p>
							</>
						)}

						{company.headquarters && (
							<>
								<h5 className="mt-4">Headquarters</h5>
								<p>{company.headquarters}</p>
							</>
						)}

						{company.origin_country && (
							<>
								<h5 className="mt-4">Origin Country</h5>
								<p>{countryCode.of(company.origin_country)}</p>
							</>
						)}

						{company.homepage && (
							<>
								<h5 className="mt-4">Homepage</h5>
								<a
									href={company.homepage}
									style={{ textDecoration: "none" }}
								>
									{company.homepage}
								</a>
							</>
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default Company;
