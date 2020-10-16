import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../actions/auth';

const Login = ({ loginUser, isAuth }) => {
	const [ formData, setFormData ] = useState({
		email    : '',
		password : ''
	});
	const { email, password } = formData;

	const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (e) => {
		e.preventDefault();
		loginUser(email, password);
	};

	//redirect if login success
	if (isAuth) {
		return <Redirect to="/dashboard" />;
	}

	return (
		<Fragment>
			<h1 className="large text-primary">Sign In</h1>
			<p className="lead">
				<i className="fas fa-user" /> Sign Into Your Account
			</p>
			<form className="form" onSubmit={onSubmit}>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={onChange}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={password}
						onChange={onChange}
						minLength="6"
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Login" />
			</form>
			<p className="my-1">
				Don't have an account? <Link to="/register">Sign Up</Link>
			</p>
		</Fragment>
	);
};
Login.prototypes = {
	loginUser : PropTypes.func.isRequired,
	isAuth    : PropTypes.bool.isRequired
};
const mapStateToProps = (state) => ({
	isAuth : state.auth.isAuthenticated
});

export default connect(mapStateToProps, { loginUser })(Login);
