import { createCanvas, loadImage, registerFont } from 'canvas';
import { default as frontmatter } from 'front-matter';
import * as fs from 'fs';
import { sync as globSync } from 'glob';
import * as path from 'path';
import { generateSocialImage } from './lib/generate-social-image';

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 630;

const DESIGN_TOKENS = {
	colorAccent: '#f7df1c',
	colorPrimary: '#fefefe',
	colorSecondary: '#2e2e2e',
};

const DIRECTORY_DESTINATION = path.resolve('dist/posts');

registerFont('./scripts/fonts/Neutra Text Bold.otf', {
	family: 'Neutra Text',
	weight: 'bold',
});

registerFont('./scripts/fonts/NanumPenScript-Regular.ttf', {
	family: 'Nanum Pen',
	weight: 'bold',
});

(async () => {
	const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
	const context = canvas.getContext('2d');
	const image = await loadImage(path.resolve('src/assets/logo.svg'));

	const files = globSync('src/pages/posts/*.{md,mdx}');

	for (const file of files) {
		const content = fs.readFileSync(file).toString();
		const data = frontmatter(content).attributes as { title?: string };

		if (!('title' in data)) {
			continue;
		}

		const directoryDestination = path.resolve(
			DIRECTORY_DESTINATION,
			path.basename(file, path.extname(file)),
		);

		if (!fs.existsSync(directoryDestination)) {
			continue;
		}

		const fileDestination = path.resolve(
			directoryDestination,
			'social-image.jpg',
		);

		await new Promise<void>((resolve, reject) => {
			console.log(
				`Creating "${path.relative(DIRECTORY_DESTINATION, fileDestination)}"`,
			);

			generateSocialImage(context, data.title, {
				designTokens: DESIGN_TOKENS,
				fontFamily: 'Nanum Pen',
				image,
			});

			canvas
				.createJPEGStream()
				.on('close', () => resolve())
				.on('error', reject)
				.pipe(fs.createWriteStream(fileDestination));
		});
	}
})();
