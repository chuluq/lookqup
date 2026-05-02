<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Container from '$lib/components/Container.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<Header />
	<main class="flex-1 py-8 sm:py-12">
		<Container>
			{@render children()}
		</Container>
	</main>
	<Footer />
</div>
