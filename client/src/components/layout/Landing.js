import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from './Footer';

const Landing = ({ isAuth }) => {
	if (isAuth) {
		return <Redirect to="/dashboard" />;
	}
	return (
		<Fragment>
			<section className="landing">
				<div className="dark-overlay">
					<div className="landing-inner">
						<h1 className="x-large">Doc Room</h1>
						<p className="lead">
							Create a profile/portfolio, share posts and exchange knowledge among experts
						</p>
						<div className="buttons">
							<Link to="/register" className="btn btn-primary">
								Sign Up
							</Link>
							<Link to="/login" className="btn btn-light">
								Login
							</Link>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</Fragment>
	);
};
Landing.prototype = {
	isAuth : PropTypes.bool.isRequired
};
const mapStateToProps = (state) => ({
	isAuth : state.auth.isAuthenticated
});
export default connect(mapStateToProps)(Landing);
