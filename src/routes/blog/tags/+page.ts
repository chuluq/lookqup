import { getAllTags } from '$lib/posts';

export const prerender = true;

export function load() {
	return { tags: getAllTags() };
}
