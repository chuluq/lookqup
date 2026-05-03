<script lang="ts">
	import type { Heading } from '$lib/posts';

	let { headings }: { headings: Heading[] } = $props();

	let activeSlug = $state<string | null>(null);

	$effect(() => {
		if (headings.length === 0) return;

		function update() {
			const scrollY = window.scrollY;
			let current: string | null = null;

			for (const h of headings) {
				const el = document.getElementById(h.slug);
				// heading is "active" when its top edge has passed 96px from viewport top
				if (el && el.offsetTop - 96 <= scrollY) {
					current = h.slug;
				}
			}

			activeSlug = current;
		}

		window.addEventListener('scroll', update, { passive: true });
		update(); // set active on mount (e.g. when landing via URL hash)

		return () => window.removeEventListener('scroll', update);
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
