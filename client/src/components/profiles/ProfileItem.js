import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
	profile : {
		user: { _id, name, avatar },
		status,
		organization,
		location,
		expertise,
		displayPic
	}
}) => {
	return (
		<div className="profile bg-light">
			<img
				src={displayPic.fileUrl ? displayPic.fileUrl : avatar}
				alt=""
				className="round-img"
			/>
			<div>
				<h2>{name}</h2>
				<p>
					{status} {organization && <span> at {organization}</span>}
				</p>
				<p className="my-1">{location && <span>{location}</span>}</p>
				<Link to={`/profile/${_id}`} className="btn btn-primary">
					View Profile
				</Link>
			</div>
			<ul>
				{expertise.slice(0, 4).map((ex, index) => (
					<li key={index} className="text-primary">
						<i className="fas fa-check" /> {ex}
					</li>
				))}
			</ul>
		</div>
	);
};

ProfileItem.propTypes = {
	profile : PropTypes.object.isRequired
};

export default ProfileItem;
