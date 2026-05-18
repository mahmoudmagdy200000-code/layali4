const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMG_DIR = path.join(__dirname, 'img');
const OUTPUT_DIR = path.join(__dirname, 'public', 'images', 'optimized');
const MENU_DATA_PATH = path.join(__dirname, 'src', 'data', 'menuData.json');

async function patchImages() {
  console.log('🚀 Starting Image Patching Pipeline...');

  if (!fs.existsSync(IMG_DIR)) {
    console.error(`❌ Error: Directory "${IMG_DIR}" not found.`);
    return;
  }

  const files = fs.readdirSync(IMG_DIR).filter(file =>
    ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file).toLowerCase())
  );

  if (files.length === 0) {
    console.log('ℹ️ No images found in ./img to process.');
    return;
  }

  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Load menu data
  let menuData = JSON.parse(fs.readFileSync(MENU_DATA_PATH, 'utf-8'));
  const patchedIds = [];

  for (const file of files) {
    const id = path.parse(file).name;
    const inputPath = path.join(IMG_DIR, file);
    const outputFilename = `${id}.webp`;
    const outputPath = path.join(OUTPUT_DIR, outputFilename);

    try {
      console.log(`⏳ Processing: ${file} ...`);
      await sharp(inputPath)
        .resize(800, null, { withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);

      patchedIds.push({ id, path: `/images/optimized/${outputFilename}` });
      console.log(`✅ Patched: [${id}] -> /images/optimized/${outputFilename}`);
    } catch (error) {
      console.error(`❌ Failed to process ${file}:`, error.message);
    }
  }

  // Update menuData.json
  let updateCount = 0;
  for (const patch of patchedIds) {
    let found = false;
    for (const category of menuData.menu) {
      const item = category.items.find(i => i.id === patch.id);
      if (item) {
        item.image = patch.path;
        updateCount++;
        found = true;
        break;
      }
    }
    if (!found) {
      console.warn(`⚠️ Warning: ID [${patch.id}] not found in menuData.json`);
    }
  }

  fs.writeFileSync(MENU_DATA_PATH, JSON.stringify(menuData, null, 2));
  console.log(`\n🏁 Patching Complete! Updated ${updateCount} items in menuData.json.`);
}

patchImages();
