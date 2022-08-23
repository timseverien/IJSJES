import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import fs from 'fs';
import JSON5 from 'json5';

// https://astro.build/config
export default defineConfig({
	integrations: [
		mdx(),
		preact(),
		sitemap({
			changefreq: 'monthly',
			serialize(item) {
				const url = new URL(item.url);

				if (url.pathname === '/') {
					item.changefreq = 'daily';
				}

				return item;
			},
		}),
	],
	site: 'https://ijsjes.dev',
	markdown: {
		shikiConfig: {
			fontFamily: 'monospace, monospace',
			theme: JSON5.parse(fs.readFileSync('./data/vscode-cobalt2-theme.json')),
			wrap: false,
		},
	},
	vite: {
		ssr: {
			noExternal: ['modern-css-reset'],
		},
	},
});
