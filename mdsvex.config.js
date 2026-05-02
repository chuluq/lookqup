import { defineMDSveXConfig } from 'mdsvex';

const config = defineMDSveXConfig({
	extensions: ['.md', '.svx'],
	smartypants: true
});

export default config;
