<script lang="ts">
	import Post, { metadata } from '../../../content/posts/hello-world.md';
	import type { PostMetadata } from '$lib/types/post';

	const meta = metadata as PostMetadata;
</script>

<svelte:head>
	<title>{meta.title}</title>
	<meta name="description" content={meta.description} />
</svelte:head>

<article class="mx-auto max-w-2xl px-4 py-12">
	<header class="mb-8">
		<h1 class="mb-2 text-3xl font-bold">{meta.title}</h1>
		<p class="text-sm text-gray-500">{meta.date}</p>
		<p class="mt-2 text-gray-600">{meta.description}</p>
		<div class="mt-3 flex gap-2">
			{#each meta.tags as tag}
				<span class="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700">{tag}</span>
			{/each}
		</div>
	</header>

	<div class="prose">
		<Post />
	</div>
</article>
