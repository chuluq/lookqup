<script lang="ts">
	import { page } from '$app/state';

	let {
		items,
		class: className = ''
	}: {
		items: { label: string; href: string }[];
		class?: string;
	} = $props();
</script>

<nav class={className} aria-label="Main navigation">
	<ul class="flex items-center gap-1">
		{#each items as item}
			<li>
				<a
					href={item.href}
					class="inline-flex min-h-[44px] items-center rounded-md px-3 py-2 text-sm font-medium transition-colors
						{page.url.pathname === item.href
						? 'text-primary'
						: 'text-muted-foreground hover:bg-muted hover:text-foreground'}"
					aria-current={page.url.pathname === item.href ? 'page' : undefined}
				>
					{item.label}
				</a>
			</li>
		{/each}
	</ul>
</nav>
