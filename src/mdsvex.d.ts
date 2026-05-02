declare module '*.md' {
	import type { Component } from 'svelte';
	import type { PostMetadata } from '$lib/types/post';

	const component: Component;
	export const metadata: PostMetadata;
	export default component;
}

declare module '*.svx' {
	import type { Component } from 'svelte';
	import type { PostMetadata } from '$lib/types/post';

	const component: Component;
	export const metadata: PostMetadata;
	export default component;
}
