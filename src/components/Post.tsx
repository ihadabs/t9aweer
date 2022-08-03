import { Post } from '@prisma/client';
import { FiBookmark, FiHeart, FiMessageCircle, FiMoreHorizontal, FiSend } from 'react-icons/fi';
import { useDispatch } from 'react-redux';

import { updatePost, userMoved, useUserId } from '../state';

interface PostProps {
	post: Post;
}

export function PostComp({ post }: PostProps) {
	const userId = useUserId() ?? '';
	const isLiked = post.likes.includes(userId);
	const heartIconClasses = isLiked ? 'icon heart liked' : 'icon heart';
	const dispatch = useDispatch();

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
					<FiMessageCircle className='icon' size={40} />
					<FiSend className='icon' size={40} />
					<div className='spacer'></div>
					<FiBookmark className='icon' size={40} />
				</div>
				<p className='description'>{post.description}</p>
			</div>
		</div>
	);
}
