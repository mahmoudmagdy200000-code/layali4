const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = 'd:\\restaurant\\img';
const OUTPUT_DIR = path.resolve(__dirname, '..', 'public', 'assets', 'about');
const TARGET_FILE = path.resolve(__dirname, '..', 'src', 'pages', 'AboutPage.jsx');

async function processGalleryBatch() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const files = ['1.jpg', '6.jpg', 'DSC03289.jpg'];
  const processedPaths = [];

  for (const file of files) {
    const inputPath = path.join(INPUT_DIR, file);
    if (!fs.existsSync(inputPath)) continue;

    let baseName = path.parse(file).name;
    // Avoid conflict with existing 1.webp
    if (baseName === '1') baseName = '1_new';
    
    const outputFilename = `${baseName}.webp`;
    const outputPath = path.join(OUTPUT_DIR, outputFilename);
    
    console.log(`⏳ Optimizing: ${file}...`);
    await sharp(inputPath)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath);
    
    processedPaths.push(`/assets/about/${outputFilename}`);
    console.log(`✅ Saved to: ${outputPath}`);
  }

  // Update AboutPage.jsx
  if (processedPaths.length > 0) {
    let content = fs.readFileSync(TARGET_FILE, 'utf-8');
    
    // Find the gallery array
    const galleryRegex = /\[\s*([\s\S]*?)\s*\]\.map\(/;
    const match = content.match(galleryRegex);
    
    if (match) {
      let arrayItems = match[1].split(',').map(s => s.trim()).filter(s => s);
      
      // Add new paths if not already there
      processedPaths.forEach(p => {
        const quoted = `'${p}'`;
        if (!arrayItems.includes(quoted)) {
          arrayItems.push(quoted);
        }
      });

      const newArray = `[\n              ${arrayItems.join(',\n              ')}\n            ]`;
      content = content.replace(match[0], `${newArray}.map(`);
      
      fs.writeFileSync(TARGET_FILE, content);
      console.log('✅ Updated AboutPage.jsx with new gallery images.');
    }
  }
}

processGalleryBatch().catch(console.error);
