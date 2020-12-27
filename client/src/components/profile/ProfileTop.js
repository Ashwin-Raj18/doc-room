import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';

const ProfileTop = ({
	profile : { status, oraganization, location, website, social, user          : { name } }
}) => {
	return (
		<div className="profile-top bg-primary p-2">
			<Avatar
				color={Avatar.getRandomColor('sitebase', [ 'green' ])}
				name={name}
				round={true}
			/>
			{/* <img className="round-img my-1" src={avatar} alt="" /> */}
			<h1 className="large">{name}</h1>
			<p className="lead">
				{status} {oraganization && <span> at {oraganization}</span>}
			</p>
			<p>{location && <span>{location}</span>}</p>
			<div className="icons my-1">
				{website && (
					<a href={website} target="_blank" rel="noopener noreferrer">
						<i className="fas fa-globe fa-2x" />
					</a>
				)}
				{social &&
				social.twitter && (
					<a href={social.twitter} target="_blank" rel="noopener noreferrer">
						<i className="fab fa-twitter fa-2x" />
					</a>
				)}
				{social &&
				social.facebook && (
					<a href={social.facebook} target="_blank" rel="noopener noreferrer">
						<i className="fab fa-facebook fa-2x" />
					</a>
				)}
				{social &&
				social.linkedin && (
					<a href={social.linkedin} target="_blank" rel="noopener noreferrer">
						<i className="fab fa-linkedin fa-2x" />
					</a>
				)}
				{social &&
				social.youtube && (
					<a href={social.youtube} target="_blank" rel="noopener noreferrer">
						<i className="fab fa-youtube fa-2x" />
					</a>
				)}
				{social &&
				social.instagram && (
					<a href={social.instagram} target="_blank" rel="noopener noreferrer">
						<i className="fab fa-instagram fa-2x" />
					</a>
				)}
			</div>
		</div>
	);
};

ProfileTop.propTypes = {
	profile : PropTypes.object.isRequired
};

export default ProfileTop;
