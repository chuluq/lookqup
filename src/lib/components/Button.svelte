<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'primary' | 'secondary' | 'ghost';
	type Size = 'sm' | 'md' | 'lg';

	let {
		variant = 'primary' as Variant,
		size = 'md' as Size,
		href,
		class: className = '',
		children,
		...rest
	}: {
		variant?: Variant;
		size?: Size;
		href?: string;
		class?: string;
		children: Snippet;
		[key: string]: unknown;
	} = $props();

	const variantClasses: Record<Variant, string> = {
		primary: 'bg-primary text-primary-foreground hover:opacity-90',
		secondary: 'bg-surface text-foreground border border-border hover:bg-muted',
		ghost: 'text-foreground hover:bg-muted'
	};

	const sizeClasses: Record<Size, string> = {
		sm: 'px-3 py-1.5 text-sm min-h-[36px]',
		md: 'px-4 py-2 text-base min-h-[44px]',
		lg: 'px-6 py-3 text-lg min-h-[52px]'
	};

	const base =
		'inline-flex items-center justify-center rounded-md font-medium transition-colors cursor-pointer';
	const classes = $derived(`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`);
</script>

{#if href}
	<a {href} class={classes} {...rest}>
		{@render children()}
	</a>
{:else}
	<button class={classes} {...rest}>
		{@render children()}
	</button>
{/if}
