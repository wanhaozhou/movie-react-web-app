import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as originalClient from "../Client/original";
import ErrorPage from "./ErrorPage";
import Avatar from "@mui/material/Avatar";
import { avatarName, avatarStyle } from "../Components/constants";
import { Stack } from "react-bootstrap";

const Original = () => {
	const { oid } = useParams();
	const navigate = useNavigate();
	const [original, setOriginal] = useState(null);
	useEffect(() => {
		const fetch = async () => {
			try {
				const resp = await originalClient.findById(oid);
				if (!resp.data) {
					setOriginal(undefined);
					return;
				}
				setOriginal(resp.data);
			} catch (error) {
				setOriginal(undefined);
				console.log(error);
			}
		};
		fetch();
	}, [oid, navigate]);
	return (
		<>
			{original === undefined && <ErrorPage />}
			{original && (
				<div className="container mt-5">
					<div className="col">
						<div className="text-center">
							<img
								src={`https://placehold.co/400x600?text=${original.title}'s+Poster`}
								alt={original.title}
								className="rounded"
							/>
						</div>
					</div>
					<div className="col mt-5">
						<h3>{original.title}</h3>

						<h5 className="mt-4">Creator</h5>
						<Stack direction="horizontal" gap={3}>
							<Avatar
								variant="rounded"
								sx={avatarStyle(original.user.avatar)}
								style={{ cursor: "pointer" }}
								onClick={() =>
									navigate(
										`/profile/${original.user.username}`,
									)
								}
							>
								{avatarName(original.user)}
							</Avatar>
							<div
								className="my-auto"
								style={{ cursor: "pointer" }}
								onClick={() =>
									navigate(
										`/profile/${original.user.username}`,
									)
								}
							>
								{original.user.username}
							</div>
						</Stack>

						<h5 className="mt-4">Overview</h5>
						<p>{original.overview}</p>

						<h5 className="mt-4">Link</h5>
						<p>{original.link}</p>

						<h5 className="mt-4">Creation Date</h5>
						<p>{original.creationDate}</p>
					</div>
				</div>
			)}
		</>
	);
};

export default Original;
