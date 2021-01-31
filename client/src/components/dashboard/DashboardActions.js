import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { updateDp } from '../../actions/profile';

const DashboardActions = () => {
	const { displayPic, user: { avatar } } = useSelector((state) => state.profile.profile);

	const dispatch = useDispatch();

	const [ dpProgress, setdpProgress ] = useState(0);
	const handleFileUpload = ({ target: { files } }) => {
		console.log(files[0]);
		let data = new FormData();
		data.append('profileImg', files[0]);

		const options = {
			onUploadProgress : (progressEvent) => {
				const { loaded, total } = progressEvent;
				let percent = Math.floor(loaded * 100 / total);
				console.log(`${loaded}kb of ${total}kb`);
				setdpProgress(percent);
			}
		};
		dispatch(updateDp(data, options));
	};

	const inputFile = useRef(null);
	const onUploadClick = () => {
		inputFile.current.click();
	};

	useEffect(
		() => {
			dispatch(getCurrentProfile());
		},
		[ dispatch ]
	);

	return (
		<div className="dash-buttons">
			<div className="dp_wrapper">
				<img
					alt="dp_img"
					src={
						displayPic.fileUrl && displayPic.fileUrl !== '' ? displayPic.fileUrl : avatar
					}
				/>
			</div>
			{dpState !== 0 && d}
			<div className="upload__progress" />
			<div onClick={onUploadClick} className="btn btn-light">
				<input
					style={{ display: 'none' }}
					accept=".jpg,.png,.gif"
					ref={inputFile}
					onChange={handleFileUpload}
					type="file"
				/>
				<i className="fas fa-user-circle text-primary" /> Change Profile Picture
			</div>
			<Link to="/edit-profile" className="btn btn-light">
				<i className="fas fa-user-circle text-primary" /> Edit Profile
			</Link>
			<Link to="/add-experience" className="btn btn-light">
				<i className="fab fa-black-tie text-primary" /> Add Experience
			</Link>
			<Link to="/add-education" className="btn btn-light">
				<i className="fas fa-graduation-cap text-primary" /> Add Education
			</Link>
		</div>
	);
};

export default DashboardActions;
