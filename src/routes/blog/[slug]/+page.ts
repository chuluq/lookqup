import { error } from '@sveltejs/kit';
import { getPost, getPostSlugs, getReadingTime } from '$lib/posts';

export const prerender = true;

export function entries() {
	return getPostSlugs().map((slug) => ({ slug }));
}

export function load({ params }) {
	const post = getPost(params.slug);
	if (!post) throw error(404, 'Post tidak ditemukan');

	return {
		metadata: post.metadata,
		Component: post.default,
		readingTime: getReadingTime(params.slug)
	};
}
