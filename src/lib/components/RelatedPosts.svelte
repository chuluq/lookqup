<script lang="ts">
	import type { Post } from '$lib/types/post';

	let { posts }: { posts: Post[] } = $props();

	function formatDate(date: string) {
		return new Date(date).toLocaleDateString('id-ID', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

{#if posts.length > 0}
	<section class="mt-16 border-t border-border pt-10">
		<h2 class="mb-6 text-xl font-semibold text-foreground">Post Terkait</h2>
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each posts as post (post.slug)}
				<a
					href="/blog/{post.slug}"
					class="group flex flex-col rounded-lg border border-border bg-surface/50 p-4 transition-colors hover:border-foreground/30"
				>
					<time class="text-xs text-muted-foreground" datetime={post.date}>
						{formatDate(post.date)}
					</time>
					<h3 class="mt-2 font-medium text-foreground group-hover:text-primary">
						{post.title}
					</h3>
					<p class="mt-2 line-clamp-2 text-sm text-muted-foreground">
						{post.description}
					</p>
				</a>
			{/each}
		</div>
	</section>
{/if}
