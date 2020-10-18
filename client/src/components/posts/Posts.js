import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';

//using react-redux hooks to connect in this component
const Posts = () => {
	//instead of mapStateToProps
	const { posts } = useSelector((state) => state.post);
	//instead of connect
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(getPosts());
		},
		[ dispatch ]
	);

	return (
		<Fragment>
			<h1 className="large text-primary">Posts</h1>
			<p className="lead">
				<i className="fas fa-user" /> Welcome to the community
			</p>
			<PostForm />
			<div className="posts">
				{posts.map((post) => <PostItem key={post._id} post={post} />)}
			</div>
		</Fragment>
	);
};

Posts.propTypes = {
	getPosts : PropTypes.func.isRequired,
	post     : PropTypes.object.isRequired
};

export default Posts;
