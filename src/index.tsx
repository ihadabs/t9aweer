import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { HomePage } from './routes/home';
import GgComponents from './routes/NotFound';
import { PostsPage } from './routes/posts';
import { ProfilePage } from './routes/profile';
import './styles/index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/posts' element={<PostsPage />} />
			<Route path='/profile' element={<ProfilePage />} />
			<Route path='/*' element={<GgComponents.Gg404Page />} />
		</Routes>
	</BrowserRouter>
	// <React.StrictMode>

	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
