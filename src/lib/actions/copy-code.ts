import type { Action } from 'svelte/action';

export const copyCode: Action<HTMLElement> = (node) => {
	const blocks = node.querySelectorAll<HTMLPreElement>('pre');

	blocks.forEach((pre) => {
		if (pre.querySelector('[data-copy-button]')) return;

		const button = document.createElement('button');
		button.type = 'button';
		button.textContent = 'Copy';
		button.setAttribute('data-copy-button', '');
		button.setAttribute('aria-label', 'Copy code to clipboard');
		button.className =
			'absolute top-2 right-2 rounded-md border border-border bg-background/80 px-2 py-1 text-xs text-muted-foreground backdrop-blur-sm hover:text-foreground transition-colors cursor-pointer';

		button.addEventListener('click', async () => {
			const code = pre.querySelector('code')?.innerText ?? pre.innerText;
			try {
				await navigator.clipboard.writeText(code);
				button.textContent = 'Copied!';
			} catch {
				button.textContent = 'Failed';
			} finally {
				setTimeout(() => (button.textContent = 'Copy'), 1500);
			}
		});

		pre.style.position = 'relative';
		pre.appendChild(button);
	});

	return {
		destroy() {
			blocks.forEach((pre) => {
				pre.querySelector('[data-copy-button]')?.remove();
			});
		}
	};
};
