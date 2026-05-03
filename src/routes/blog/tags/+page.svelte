<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Tags — Lookqup</title>
	<meta name="description" content="Telusuri tulisan berdasarkan topik di Lookqup." />
</svelte:head>

<div class="mx-auto max-w-2xl">
	<header class="mb-10">
		<h1 class="text-3xl font-bold text-foreground">Tags</h1>
		<p class="mt-2 text-muted-foreground">Telusuri tulisan berdasarkan topik.</p>
	</header>

	{#if data.tags.length === 0}
		<p class="text-muted-foreground">Belum ada tag.</p>
	{:else}
		<ul class="flex flex-col gap-3">
			{#each data.tags as { tag, count }}
				<li>
					<a
						href="/blog/tags/{tag}"
						class="flex items-center justify-between rounded-xl border border-border bg-surface px-5 py-4 transition-colors hover:border-primary hover:bg-muted"
					>
						<span class="font-medium text-foreground">{tag}</span>
						<span class="text-sm text-muted-foreground">{count} post</span>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
