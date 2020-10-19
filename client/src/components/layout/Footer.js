import React from 'react';
function Footer () {
	return (
		<div className="footer">
			<div className="footer__content__left">
				<h5>Designed and developed by Ashwin Raj</h5>
				<h5>Web-app specs:</h5>
				<ul className="stack__list">
					<li> MERN stack </li>
					<li> React-redux, Thunk for state management</li>
					<li> Mongoose for object modelling</li>
					<li> Hosted on heroku</li>
				</ul>
			</div>
		</div>
	);
}

export default Footer;
