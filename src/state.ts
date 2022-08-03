import { Blog, Post } from '@prisma/client';
import { cloneDeep } from 'lodash';
import { useSelector } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { initialPosts } from './data';

// Redux

///// Types
interface AppState {
	userId: string | null;
	posts: Post[];
	blogs: Blog[];
	lastMovedDate: Date;
}
interface IAction<X> {
	type: 'ADD_POST' | 'DELETE_POST' | 'UPDATE_POST' | 'USER_MOVED';
	payload: X;
}

///// State
const initialState: AppState = {
	userId: null,
	posts: initialPosts,
	blogs: [],
	lastMovedDate: new Date(),
};

///// Reducer
function stateReducer(oldState: AppState = initialState, action: IAction<any>): AppState {
	const newState = cloneDeep(oldState);

	switch (action.type) {
		case 'USER_MOVED':
			newState.lastMovedDate = new Date();
			return newState;
		case 'ADD_POST':
			newState.posts.push(action.payload);
			return newState;
		case 'DELETE_POST':
			newState.posts = newState.posts.filter((p) => p.id !== action.payload.id);
			return newState;
		case 'UPDATE_POST':
			const index = oldState.posts.findIndex((p) => p.id === action.payload.id);
			if (index === -1) return oldState;
			newState.posts[index] = action.payload;
			return newState;
		default:
			return oldState;
	}
}

/// Actions
export function userMoved(): IAction<null> {
	return {
		type: 'USER_MOVED',
		payload: null,
	};
}

export function addPost(post: Post): IAction<Post> {
	return {
		type: 'ADD_POST',
		payload: post,
	};
}
export function deletePost(post: Post): IAction<Post> {
	return {
		type: 'DELETE_POST',
		payload: post,
	};
}
export function updatePost(post: Post): IAction<Post> {
	return {
		type: 'UPDATE_POST',
		payload: post,
	};
}

/// Selector
export function usePosts(): Post[] {
	const posts = useSelector<AppState, Post[]>((state) => state.posts);
	return posts;
}

export function useBlogs(): Blog[] {
	return useSelector<AppState, Blog[]>((state) => state.blogs);
}

export function useUserId(): string | null {
	const userId = useSelector<AppState, string | null>((state) => state.userId);
	return userId;
}

/// Store

export const store = createStore(stateReducer, composeWithDevTools());
