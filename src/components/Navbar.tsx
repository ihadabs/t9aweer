import { Link } from 'react-router-dom';

export function Navbar() {
	return (
		<nav>
			<Link to={'/'}>Home</Link>
			<Link to={'/posts'}>Posts</Link>
			<Link to={'/profile'}>Profile</Link>
		</nav>
	);
}
