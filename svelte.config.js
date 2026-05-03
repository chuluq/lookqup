import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

// mdsvex generates `<script context="module">` which is deprecated in Svelte 5.
// This shim transforms it to `<script module>` after mdsvex runs.
const fixScriptModule = {
	markup({ content }) {
		return { code: content.replace(/<script context="module"/g, '<script module') };
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md', '.svx'],
	preprocess: [mdsvex(mdsvexConfig), fixScriptModule],
	compilerOptions: {
		// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	kit: {
		adapter: adapter({ fallback: '404.html' })
	}
};

export default config;
