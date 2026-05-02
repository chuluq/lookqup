<script lang="ts">
	import Container from './Container.svelte';

	const year = new Date().getFullYear();

	const links = [
		{ label: 'About', href: '#' },
		{ label: 'Privacy', href: '#' },
		{ label: 'Contact', href: '#' }
	];
</script>

<footer class="border-t border-border bg-surface">
	<Container>
		<div class="flex flex-col items-center gap-4 py-8 sm:flex-row sm:justify-between">
			<p class="text-sm text-muted-foreground">© {year} Lookqup</p>
			<ul class="flex flex-wrap justify-center gap-x-6 gap-y-2">
				{#each links as link}
					<li>
						<a
							href={link.href}
							class="inline-flex min-h-[44px] items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</Container>
</footer>
