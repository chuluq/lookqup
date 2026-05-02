<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		class: className = ''
	}: {
		children: Snippet;
		class?: string;
	} = $props();
</script>

<div class="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 {className}">
	{@render children()}
</div>
