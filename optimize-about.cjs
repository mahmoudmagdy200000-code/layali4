const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.resolve(__dirname, 'raw_images');
const OUTPUT_DIR = path.resolve(__dirname, 'public', 'assets', 'about');
const MAX_WIDTH = 1920;
const WEBP_QUALITY = 85;

async function processAboutImages() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = fs.readdirSync(INPUT_DIR).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  
  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, `${path.parse(file).name}.webp`);
    
    console.log(`⏳ Optimizing: ${file}...`);
    await sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toFile(outputPath);
    console.log(`✅ Saved to: ${outputPath}`);
  }
}

processAboutImages().catch(console.error);
