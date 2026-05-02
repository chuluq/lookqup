import type { Component } from 'svelte';
import type { Post, PostMetadata } from '$lib/types/post';

type GlobModule = { metadata: PostMetadata };

type PostModule = {
	default: Component;
	metadata: PostMetadata;
};

const modules = import.meta.glob<GlobModule>('../content/posts/*.md', { eager: true });

const postModules = import.meta.glob<PostModule>('../content/posts/*.md', { eager: true });

const rawModules = import.meta.glob('../content/posts/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
}) as Record<string, string>;

export function getAllPosts(): Post[] {
	return Object.entries(modules)
		.map(([path, mod]) => {
			const slug = path.split('/').pop()!.replace(/\.md$/, '');
			return { slug, ...mod.metadata };
		})
		.filter((post) => !post.draft)
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostSlugs(): string[] {
	return Object.entries(modules)
		.filter(([, mod]) => !mod.metadata.draft)
		.map(([path]) => path.split('/').pop()!.replace(/\.md$/, ''));
}

export function getPost(slug: string): PostModule | null {
	const entry = Object.entries(postModules).find(([path]) => path.endsWith(`/${slug}.md`));
	if (!entry) return null;
	const mod = entry[1];
	if (mod.metadata.draft) return null;
	return mod;
}

export function getReadingTime(slug: string): string {
	const entry = Object.entries(rawModules).find(([path]) => path.endsWith(`/${slug}.md`));
	if (!entry) return '';
	const text = entry[1].replace(/^---[\s\S]*?---/, '');
	const words = text.trim().split(/\s+/).filter(Boolean).length;
	const minutes = Math.max(1, Math.ceil(words / 200));
	return `${minutes} menit baca`;
}
