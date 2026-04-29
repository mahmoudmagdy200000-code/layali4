const fs = require('fs');
const path = require('path');

const MENU_DATA_PATH = path.join(__dirname, 'src', 'data', 'menuData.json');
const FALLBACK_IMAGE = '/images/optimized/_DSC3410.webp';

function audit() {
  const menuData = JSON.parse(fs.readFileSync(MENU_DATA_PATH, 'utf-8'));
  const missingImages = [];

  menuData.menu.forEach(category => {
    category.items.forEach(item => {
      if (!item.image || item.image === null || item.image === "") {
        missingImages.push(item.id);
      }
    });
  });

  console.log('Items with missing image property/value:', missingImages);
}

audit();
