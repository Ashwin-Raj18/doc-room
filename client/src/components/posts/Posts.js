import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import PostItem from './PostItem';
import PostForm from './PostForm';
import { getPosts } from '../../actions/post';
import { getDpsByIds } from '../../actions/profile';

//using react-redux hooks to connect in this component
const Posts = () => {
	//instead of mapStateToProps and connect
	const { posts } = useSelector((state) => state.post);
	const dps = useSelector((state) => state.profile.dpPics);

	//instead of passing dispatching function in connect
	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(getPosts());
		},
		[ dispatch ]
	);
	useEffect(
		() => {
			let users = posts.map((post) => post.user);
			if (users.length > 0) {
				dispatch(getDpsByIds({ userIds: users }));
			}
		},
		[ posts, dispatch ]
	);

	const getDpUrl = (userId) => {
		let ret = '';
		dps.forEach((dp) => {
			if (dp.user === userId && dp.displayPic.fileUrl !== '') {
				ret = dp.displayPic.fileUrl;
			}
		});
		return ret;
	};
	const getPostElement = (post) => {
		let dpUrl = getDpUrl(post.user);
		return <PostItem key={post._id} post={post} dpPic={dpUrl} />;
	};

	return (
		<Fragment>
			<h1 className="large text-primary">Posts</h1>
			<p className="lead">
				<i className="fas fa-user" /> Welcome to the community
			</p>
			<PostForm />
			<div className="posts">{posts.map((post) => getPostElement(post))}</div>
		</Fragment>
	);
};

Posts.propTypes = {
	getPosts : PropTypes.func.isRequired,
	post     : PropTypes.object.isRequired
};

export default Posts;
