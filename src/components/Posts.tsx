import { usePosts } from '../state';
import { PostComp } from './Post';

export function Posts() {
	const posts = usePosts();

	const postsDivs = posts.map((post) => <PostComp key={post.id} post={post} />);

	return (
		<div className='posts' id=''>
			{postsDivs}
		</div>
	);
}
