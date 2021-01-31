import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../actions/post';
import { getDpsByIds } from '../../actions/profile';

const Post = ({
	getPost,
	getDpsByIds,
	post        : { post, loading },
	match,
	location    : { state: { dpPic } },
	profile     : { dpPics }
}) => {
	useEffect(
		() => {
			getPost(match.params.id);
		},
		[ getPost, match.params.id ]
	);
	useEffect(
		() => {
			let users = [];
			post.comments
				? (users = post.comments.map((comment) => comment.user))
				: (users = []);
			if (users.length > 0) {
				getDpsByIds({ userIds: users });
			}
		},
		[ post, getDpsByIds ]
	);
	const getDpUrl = (userId) => {
		let ret = '';
		dpPics.forEach((dp) => {
			if (dp.user === userId && dp.displayPic.fileUrl !== '') {
				ret = dp.displayPic.fileUrl;
			}
		});
		return ret;
	};
	const getCommentElemnt = (com) => {
		let dp = getDpUrl(com.user);
		return <CommentItem key={com._id} dp={dp} comment={com} postId={post._id} />;
	};
	return loading || post === null ? (
		<Spinner />
	) : (
		<Fragment>
			<Link to="/posts" className="btn">
				Back To Posts
			</Link>
			<PostItem post={post} dpPic={dpPic} showActions={false} />
			<CommentForm postId={post._id} />
			<div className="comments">{post.comments?.map((com) => getCommentElemnt(com))}</div>
		</Fragment>
	);
};

Post.propTypes = {
	getPost     : PropTypes.func.isRequired,
	post        : PropTypes.object.isRequired,
	getDpsByIds : PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	post    : state.post,
	profile : state.profile
});

export default connect(mapStateToProps, { getPost, getDpsByIds })(Post);
