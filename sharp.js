const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.resolve(__dirname, 'src/public/images/heros');
const outputDir = path.resolve(__dirname, 'dist/images/heros');

if (!fs.existsSync(outputDir)) {
	fs.mkdirSync(outputDir, { recursive: true });
}

const resizeImage = (inputPath, outputPath, width, format) => {
	sharp(inputPath)
		.resize(width)
		.toFormat(format)
		.toFile(outputPath)
		.then(() => {
			console.log(`Resized ${inputPath} and saved to ${outputPath}`);
		})
		.catch((err) => {
			console.error(`Error resizing ${inputPath}:`, err);
		});
};

fs.readdirSync(inputDir).forEach((file) => {
	const inputPath = path.join(inputDir, file);
	const outputPathSmallJpg = path.join(outputDir, file.replace('.', '-small.'));
	const outputPathLargeJpg = path.join(outputDir, file.replace('.', '-large.'));
	const outputPathSmallWebp = path.join(outputDir, file.replace(/\.(jpe?g|png)$/, '-small.webp'));
	const outputPathLargeWebp = path.join(outputDir, file.replace(/\.(jpe?g|png)$/, '-large.webp'));

	resizeImage(inputPath, outputPathSmallJpg, 600, 'jpeg');
	resizeImage(inputPath, outputPathLargeJpg, 1200, 'jpeg');
	resizeImage(inputPath, outputPathSmallWebp, 600, 'webp');
	resizeImage(inputPath, outputPathLargeWebp, 1200, 'webp');
});
