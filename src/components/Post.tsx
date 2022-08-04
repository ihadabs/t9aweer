import { Comment, Post } from '@prisma/client';
import { FiBookmark, FiHeart, FiMessageCircle, FiMoreHorizontal, FiSend } from 'react-icons/fi';
import { useDispatch } from 'react-redux';

import { addComment, updatePost, usePostComments, userMoved, useUserId } from '../state';

import { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

interface PostProps {
	post: Post;
}

export function PostComp({ post }: PostProps) {
	const userId = useUserId() ?? '';
	const isLiked = post.likes.includes(userId);
	const heartIconClasses = isLiked ? 'icon heart liked' : 'icon heart';
	const dispatch = useDispatch();
	const comments = usePostComments(post.id);
	const commentsComponents = comments.map((comment) => <CommentComp key={comment.id} comment={comment} />);

	const [modalIsOpen, setModelIsOpen] = useState(false);
	const [comment, setComment] = useState('');

	function closeModal() {
		setModelIsOpen(false);
	}

	function toggleLike() {
		if (isLiked) {
			const action = updatePost({
				...post,
				likes: post.likes.filter((id: any) => id !== userId),
			});
			dispatch(action);
		} else {
			const action = updatePost({
				...post,
				likes: [...post.likes, userId],
			});
			dispatch(action);
		}
		const action2 = userMoved();
		dispatch(action2);
	}

	function openAddCommnetModal() {
		setModelIsOpen(true);
	}

	function sendComment() {
		const content = comment; // the thing inside input
		if (!content) return;

		const action = addComment({
			content,
			post_id: post.id,
			id: new Date() + '',
			username: 'ali999',
		});
		dispatch(action);

		setComment('');
		setModelIsOpen(false);
	}

	function handleKeyDown(event: any) {
		if (event.key === 'Enter') {
			sendComment();
		}
	}

	return (
		<div className='post'>
			<div className='header'>
				<img src={post.userAvatarUrl} alt='' />
				<h2>{post.username}</h2>
				<div className='spacer'></div>
				<FiMoreHorizontal />
			</div>
			<img src={post.imageUrl} alt='' />
			<div className='footer'>
				<div className='icons'>
					<div>
						<FiHeart onClick={toggleLike} className={heartIconClasses} size={40} />
						{post.likes.length}
					</div>
					<FiMessageCircle onClick={openAddCommnetModal} className='icon' size={40} />
					<FiSend className='icon' size={40} />
					<div className='spacer'></div>
					<FiBookmark className='icon' size={40} />
				</div>
				<p className='description'>{post.description}</p>
				{commentsComponents}
			</div>

			{/* This code is for the model */}
			<Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Example Modal'>
				<input
					onKeyDown={handleKeyDown}
					value={comment}
					onChange={(event) => setComment(event.target.value)}
					type='text'
				/>
				<FiSend onClick={sendComment} className='icon' size={40} />
			</Modal>
		</div>
	);
}

interface CommentProps {
	comment: Comment;
}

function CommentComp({ comment }: CommentProps) {
	return (
		<div className='comment-container'>
			<h2 className='username'>{comment.username}</h2>
			<div className='content'>{comment.content}</div>
		</div>
	);
}
