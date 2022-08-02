import { defineConfig } from 'astro/config';
import fs from 'fs';
import JSON5 from 'json5';

import preact from '@astrojs/preact';

// https://astro.build/config
export default defineConfig({
	integrations: [preact()],
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
