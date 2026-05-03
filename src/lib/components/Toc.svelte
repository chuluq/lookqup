<script lang="ts">
	import type { Heading } from '$lib/posts';

	let { headings }: { headings: Heading[] } = $props();

	let activeSlug = $state<string | null>(null);

	$effect(() => {
		if (headings.length === 0) return;

		const elements = headings
			.map((h) => document.getElementById(h.slug))
			.filter((el): el is HTMLElement => el !== null);

		if (elements.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((entry) => entry.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

				if (visible[0]) {
					activeSlug = visible[0].target.id;
				}
			},
			{ rootMargin: '0px 0px -70% 0px', threshold: 0 }
		);

		for (const el of elements) observer.observe(el);

		return () => observer.disconnect();
	});
</script>

{#if headings.length > 0}
	<nav aria-label="Daftar isi" class="text-sm">
		<p class="mb-3 font-medium text-foreground">Daftar Isi</p>
		<ul class="space-y-2 border-l border-border">
			{#each headings as heading (heading.slug)}
				<li class:pl-4={heading.depth === 2} class:pl-8={heading.depth === 3}>
					<a
						href="#{heading.slug}"
						class="block -ml-px border-l-2 py-0.5 transition-colors {activeSlug === heading.slug
							? 'border-foreground font-medium text-foreground'
							: 'border-transparent text-muted-foreground hover:text-foreground'}"
					>
						{heading.text}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}
