import { error } from '@sveltejs/kit';
import { getPostsByTag, getTagSlugs } from '$lib/posts';

export const prerender = true;

export function entries() {
	return getTagSlugs().map((tag) => ({ tag }));
}

export function load({ params }) {
	const posts = getPostsByTag(params.tag);
	if (posts.length === 0) throw error(404, 'Tag tidak ditemukan');

	return { tag: params.tag, posts };
}
