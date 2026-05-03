<script lang="ts">
	import type { PageData } from './$types';
	import { copyCode } from '$lib/actions/copy-code';

	let { data }: { data: PageData } = $props();

	function formatDate(date: string) {
		return new Date(date).toLocaleDateString('id-ID', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{data.metadata.title} — Lookqup</title>
	<meta name="description" content={data.metadata.description} />
</svelte:head>

<article class="mx-auto max-w-2xl">
	<header class="mb-10">
		<h1 class="text-3xl font-bold text-foreground">{data.metadata.title}</h1>
		<div class="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
			<time datetime={data.metadata.date}>{formatDate(data.metadata.date)}</time>
			<span aria-hidden="true">·</span>
			<span>{data.readingTime}</span>
		</div>
		{#if data.metadata.tags.length > 0}
			<div class="mt-3 flex flex-wrap gap-2">
				{#each data.metadata.tags as tag}
					<span class="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
						{tag}
					</span>
				{/each}
			</div>
		{/if}
	</header>

	<div class="prose dark:prose-invert max-w-none" use:copyCode>
		<data.Component />
	</div>
</article>
