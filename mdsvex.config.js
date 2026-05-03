import { defineMDSveXConfig } from 'mdsvex';
import { getSingletonHighlighter } from 'shiki';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// Escape characters that are special inside Svelte template literals and {@html} blocks.
// Mirrors mdsvex's internal escape_svelty function.
function escapeSvelty(str) {
	return str
		.replace(/[{}`]/g, (c) => ({ '{': '&#123;', '}': '&#125;', '`': '&#96;' })[c])
		.replace(/\\([trn])/g, '&#92;$1');
}

// Pre-initialize the highlighter once at config-load time.
// Languages are loaded eagerly so codeToHtml() runs synchronously after this resolves.
const highlighterPromise = getSingletonHighlighter({
	themes: ['github-light-default', 'github-dark-default'],
	langs: [
		'typescript',
		'javascript',
		'svelte',
		'css',
		'bash',
		'json',
		'html',
		'yaml',
		'markdown'
	]
});

/**
 * Custom async highlighter for mdsvex.
 * Called as: highlighter(code, lang, meta, filename, optimise)
 * Must return a Svelte-safe HTML string.
 */
async function highlighter(code, lang) {
	const shiki = await highlighterPromise;

	const normalizedLang = lang?.toLowerCase() ?? 'text';
	const loadedLangs = shiki.getLoadedLanguages();
	const resolvedLang = loadedLangs.includes(normalizedLang) ? normalizedLang : 'text';

	const html = shiki.codeToHtml(code, {
		lang: resolvedLang,
		themes: {
			light: 'github-light-default',
			dark: 'github-dark-default'
		},
		defaultColor: false
	});

	// Wrap in {@html} so Svelte doesn't try to compile the highlighted markup.
	return `{@html \`${escapeSvelty(html)}\`}`;
}

export default defineMDSveXConfig({
	extensions: ['.md', '.svx'],
	smartypants: true,
	highlight: { highlighter },
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'append',
				properties: { class: 'heading-anchor', ariaLabel: 'Link to heading' },
				content: { type: 'text', value: '#' }
			}
		]
	]
});
