const fs = require('fs');
const path = require('path');

const OPTIMIZED_DIR = path.join(__dirname, 'public', 'images', 'optimized');
const MENU_DATA_PATH = path.join(__dirname, 'src', 'data', 'menuData.json');
const FALLBACK_IMAGE = '/images/optimized/_DSC3410.webp';

function check() {
  const menuData = JSON.parse(fs.readFileSync(MENU_DATA_PATH, 'utf-8'));
  const existingFiles = new Set(fs.readdirSync(OPTIMIZED_DIR));
  let updateCount = 0;

  menuData.menu.forEach(category => {
    category.items.forEach(item => {
      if (item.image) {
        const filename = path.basename(item.image);
        if (!existingFiles.has(filename)) {
          console.log(`⚠️ Missing file: ${filename} for item ${item.id}. Replacing with fallback.`);
          item.image = FALLBACK_IMAGE;
          updateCount++;
        }
      } else {
        console.log(`⚠️ Item ${item.id} has no image field. Adding fallback.`);
        item.image = FALLBACK_IMAGE;
        updateCount++;
      }
    });
  });

  if (updateCount > 0) {
    fs.writeFileSync(MENU_DATA_PATH, JSON.stringify(menuData, null, 2));
    console.log(`✅ Updated ${updateCount} items with fallback image.`);
  } else {
    console.log('✅ All items have valid image paths.');
  }
}

check();
