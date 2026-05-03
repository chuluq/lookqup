import type { Component } from 'svelte';
import type { Post, PostMetadata } from '$lib/types/post';
import GithubSlugger from 'github-slugger';

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

export type Heading = {
	depth: 2 | 3;
	text: string;
	slug: string;
};

export function getHeadings(slug: string): Heading[] {
	const entry = Object.entries(rawModules).find(([path]) => path.endsWith(`/${slug}.md`));
	if (!entry) return [];

	const body = entry[1].replace(/^---[\s\S]*?---/, '');
	const slugger = new GithubSlugger();
	const headings: Heading[] = [];
	const lines = body.split('\n');

	let inCodeBlock = false;
	for (const line of lines) {
		if (/^```/.test(line)) {
			inCodeBlock = !inCodeBlock;
			continue;
		}
		if (inCodeBlock) continue;

		const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
		if (!match) continue;

		const depth = match[1].length as 2 | 3;
		const text = match[2].trim();
		headings.push({ depth, text, slug: slugger.slug(text) });
	}

	return headings;
}

export function getReadingTime(slug: string): string {
	const entry = Object.entries(rawModules).find(([path]) => path.endsWith(`/${slug}.md`));
	if (!entry) return '';

	let text = entry[1];

	text = text.replace(/^---[\s\S]*?---/, '');
	text = text.replace(/```[\s\S]*?```/g, ' ');
	text = text.replace(/`[^`]*`/g, ' ');
	text = text.replace(/!\[[^\]]*\]\([^)]*\)/g, ' ');
	text = text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1');
	text = text.replace(/<[^>]+>/g, ' ');
	text = text
		.replace(/^#{1,6}\s+/gm, '')
		.replace(/^\s*[-*+]\s+/gm, '')
		.replace(/^\s*>\s?/gm, '')
		.replace(/[*_~]+/g, '')
		.replace(/\|/g, ' ');

	const words = text.trim().split(/\s+/).filter(Boolean).length;
	const minutes = Math.max(1, Math.ceil(words / 200));
	return `${minutes} menit baca`;
}

export function getRelatedPosts(slug: string, limit = 3): Post[] {
	const all = getAllPosts();
	const current = all.find((p) => p.slug === slug);
	if (!current) return [];

	const others = all.filter((p) => p.slug !== slug);

	const scored = others.map((p) => ({
		post: p,
		shared: p.tags.filter((t) => current.tags.includes(t)).length
	}));

	const withSharedTags = scored
		.filter((s) => s.shared > 0)
		.sort((a, b) => {
			if (b.shared !== a.shared) return b.shared - a.shared;
			return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
		})
		.map((s) => s.post);

	if (withSharedTags.length >= limit) return withSharedTags.slice(0, limit);

	const used = new Set(withSharedTags.map((p) => p.slug));
	const filler = others
		.filter((p) => !used.has(p.slug))
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return [...withSharedTags, ...filler].slice(0, limit);
}
