import type { Post, PostMetadata } from '$lib/types/post';

type GlobModule = { metadata: PostMetadata };

export function getAllPosts(): Post[] {
	const modules = import.meta.glob<GlobModule>('../content/posts/*.md', { eager: true });

	return Object.entries(modules)
		.map(([path, mod]) => {
			const slug = path.split('/').pop()!.replace(/\.md$/, '');
			return { slug, ...mod.metadata };
		})
		.filter((post) => !post.draft)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
