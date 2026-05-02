<script lang="ts">
	import type { PageData } from './$types';

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
	<title>Blog — Lookqup</title>
	<meta name="description" content="Kumpulan tulisan dan catatan dari Lookqup." />
</svelte:head>

<div class="mx-auto max-w-2xl">
	<header class="mb-10">
		<h1 class="text-3xl font-bold text-foreground">Blog</h1>
		<p class="mt-2 text-muted-foreground">Kumpulan tulisan dan catatan.</p>
	</header>

	{#if data.posts.length === 0}
		<p class="text-muted-foreground">Belum ada post yang dipublikasikan.</p>
	{:else}
		<ul class="flex flex-col gap-4">
			{#each data.posts as post}
				<li>
					<a
						href="/posts/{post.slug}"
						class="block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-primary hover:bg-muted"
					>
						<article>
							<h2 class="text-lg font-semibold text-foreground">{post.title}</h2>
							<time class="mt-1 block text-xs text-muted-foreground" datetime={post.date}>
								{formatDate(post.date)}
							</time>
							<p class="mt-2 text-sm text-muted-foreground">{post.description}</p>
							{#if post.tags.length > 0}
								<div class="mt-3 flex flex-wrap gap-2">
									{#each post.tags as tag}
										<span class="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
											{tag}
										</span>
									{/each}
								</div>
							{/if}
						</article>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</div>
