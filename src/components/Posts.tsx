import { posts } from '../data';
import { Post } from './Post';

export function Posts() {
	const postsDivs = posts.map((post) => <Post post={post} />);

	return (
		<div className='posts' id=''>
			{postsDivs}
		</div>
	);
}
