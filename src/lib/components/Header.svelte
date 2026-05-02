<script lang="ts">
	import Container from './Container.svelte';
	import Nav from './Nav.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import { navItems } from '$lib/config/nav';
</script>

<header class="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
	<Container>
		<div class="flex h-16 items-center justify-between gap-4">
			<a href="/" class="text-xl font-bold text-foreground">Lookqup</a>
			<div class="flex items-center gap-2">
				<Nav items={navItems} class="hidden sm:block" />
				<ThemeToggle />
			</div>
		</div>
	</Container>
</header>
