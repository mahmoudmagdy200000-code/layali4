const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const INPUT_IMAGE = path.join(__dirname, '..', 'img', '_DSC3410.jpg');
const OUTPUT_DIR = path.join(__dirname, 'public', 'images', 'optimized');
const MENU_DATA_PATH = path.join(__dirname, 'src', 'data', 'menuData.json');
const TARGET_FILENAME = '_DSC3410.webp';
const PUBLIC_PATH = `/images/optimized/${TARGET_FILENAME}`;

async function run() {
  console.log('🚀 Starting Single Image Batch & Fallback Update...');

  // 1. Process the source image
  if (!fs.existsSync(INPUT_IMAGE)) {
    console.error(`❌ Error: Source image not found at ${INPUT_IMAGE}`);
    return;
  }

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const outputPath = path.join(OUTPUT_DIR, TARGET_FILENAME);

  try {
    console.log(`⏳ Optimizing ${path.basename(INPUT_IMAGE)} ...`);
    await sharp(INPUT_IMAGE)
      .resize(800, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(outputPath);
    console.log(`✅ Image optimized and saved to: ${outputPath}`);
  } catch (error) {
    console.error(`❌ Failed to process image:`, error.message);
    return;
  }

  // 2. Update menuData.json fallbacks
  if (!fs.existsSync(MENU_DATA_PATH)) {
    console.error(`❌ Error: menuData.json not found at ${MENU_DATA_PATH}`);
    return;
  }

  try {
    console.log(`⏳ Updating fallbacks in menuData.json ...`);
    let menuData = JSON.parse(fs.readFileSync(MENU_DATA_PATH, 'utf-8'));
    let updateCount = 0;

    if (menuData.menu && Array.isArray(menuData.menu)) {
      menuData.menu.forEach(category => {
        if (category.items && Array.isArray(category.items)) {
          category.items.forEach(item => {
            if (item.image === null || item.image === "") {
              item.image = PUBLIC_PATH;
              updateCount++;
            }
          });
        }
      });
    }

    fs.writeFileSync(MENU_DATA_PATH, JSON.stringify(menuData, null, 2));
    console.log(`✅ Updated ${updateCount} items with the new fallback image.`);
  } catch (error) {
    console.error(`❌ Failed to update menuData.json:`, error.message);
  }

  console.log('\n🏁 Process finished successfully!');
}

run();
