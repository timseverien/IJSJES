function getOptimalTextLines(
	context: CanvasRenderingContext2D,
	text: string,
	width: number,
): string[] {
	const words: string[] = text.split(/\s+/g);

	if (words.length <= 1) {
		return [text];
	}

	const lines = [words.shift() as string];

	while (words.length > 0) {
		const lastLine = lines.at(-1);
		const word = words.shift();
		const testLine = `${lastLine} ${word}`;
		const testMeasurement = context.measureText(testLine);

		const testWidth =
			testMeasurement.actualBoundingBoxLeft +
			testMeasurement.actualBoundingBoxRight;

		if (testWidth <= width) {
			lines[lines.length - 1] = testLine;
		} else {
			lines.push(word as string);
		}
	}

	return lines;
}

function getOptimalText(
	context: CanvasRenderingContext2D,
	text: string,
	width: number,
	height: number,
	createFont: (fontSize: number) => string,
	{ fontSizeEnd = 128, fontSizeStep = 8, lineHeight = 1 } = {},
) {
	let lines: string[] = [];
	let fontSize = 1;

	context.save();

	for (
		let fontSizeTest = fontSizeEnd;
		fontSizeTest > 0;
		fontSizeTest -= fontSizeStep
	) {
		context.font = createFont(fontSizeTest);

		const linesTest = getOptimalTextLines(context, text, width);
		const textHeight = lineHeight * fontSizeTest * linesTest.length;

		if (textHeight < height) {
			fontSize = fontSizeTest;
			lines = linesTest;

			break;
		}
	}

	context.restore();

	return {
		fontSize,
		lines,
	};
}

function createFont(fontFamily: string) {
	return (fontSize: number) => `bold ${fontSize}px '${fontFamily}'`;
}

const DEBUG = false;
const IMAGE_SPLIT_X = 459 / 1200;
const FONT_LINE_HEIGHT = 0.8;
const TEXT_MARGIN = 80;

export function generateSocialImage(
	context: CanvasRenderingContext2D,
	text: string,
	{
		image,
		designTokens,
		fontFamily,
	}: {
		image: any;
		designTokens: {
			colorAccent: string;
			colorPrimary: string;
			colorSecondary: string;
		};
		fontFamily: string;
	},
) {
	const imageSplitX = Math.round(IMAGE_SPLIT_X * context.canvas.width);
	const textHeightMax = context.canvas.height - 2 * TEXT_MARGIN;
	const textWidth = context.canvas.width - imageSplitX - 2 * TEXT_MARGIN;
	const textX = imageSplitX + TEXT_MARGIN;

	context.fillStyle = designTokens.colorAccent;
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);

	context.fillStyle = designTokens.colorPrimary;
	context.fillRect(imageSplitX, 0, context.canvas.width, context.canvas.height);

	const { fontSize, lines } = getOptimalText(
		context,
		text,
		textWidth,
		textHeightMax,
		createFont(fontFamily),
		{
			lineHeight: FONT_LINE_HEIGHT,
		},
	);

	context.fillStyle = designTokens.colorSecondary;

	const textHeight = lines.length * fontSize * FONT_LINE_HEIGHT;
	const textY =
		0.5 * context.canvas.height - 0.5 * textHeight + 0.666 * fontSize;

	for (let i = 0; i < lines.length; i++) {
		const y = textY + i * fontSize * FONT_LINE_HEIGHT;

		context.font = createFont(fontFamily)(fontSize);
		context.textAlign = 'left';
		context.fillText(lines.at(i), textX, y);
	}

	if (DEBUG) {
		context.strokeStyle = 'black';
		context.lineWidth = 4;
		context.strokeRect(textX, textY, textWidth, textHeight);
	}

	const imageX = 0.5 * imageSplitX - 0.5 * image.naturalWidth;
	const imageY = 0.5 * context.canvas.height - 0.5 * image.naturalHeight;

	context.drawImage(image as CanvasImageSource, imageX, imageY);
}
