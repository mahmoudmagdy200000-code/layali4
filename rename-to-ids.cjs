/**
 * ============================================================
 * Rename to IDs Script
 * ============================================================
 * Cleans up image links in menuData.json by replacing Arabic
 * filenames with alphanumeric IDs. Renames the physical files
 * in public/images/optimized/ and sets missing images to null.
 *
 * Usage:  node rename-to-ids.cjs
 * ============================================================
 */

const fs = require('fs');
const path = require('path');

const MENU_DATA_PATH = path.resolve(__dirname, 'src', 'data', 'menuData.json');
const OPTIMIZED_DIR = path.resolve(__dirname, 'public', 'images', 'optimized');

function renameToIds() {
  console.log('\n🚀 Starting Image Renaming to IDs...\n');

  // Load menu data
  const rawData = fs.readFileSync(MENU_DATA_PATH, 'utf-8');
  const menuData = JSON.parse(rawData);

  let renamedCount = 0;
  let nulledCount = 0;
  let errorCount = 0;

  for (const category of menuData.menu) {
    for (const item of category.items) {
      const currentImage = item.image;

      // If there's an image path and it's pointing to the optimized folder
      if (currentImage && currentImage.includes('/images/optimized/')) {
        // Extract filename and decode it (in case it's URL-encoded)
        const filename = decodeURIComponent(path.basename(currentImage));
        const oldFilePath = path.join(OPTIMIZED_DIR, filename);
        const newFilename = `${item.id}.webp`;
        const newFilePath = path.join(OPTIMIZED_DIR, newFilename);

        try {
          // Check if old file exists before renaming
          if (fs.existsSync(oldFilePath)) {
            // Rename the physical file
            fs.renameSync(oldFilePath, newFilePath);
            // Update JSON data
            item.image = `/images/optimized/${newFilename}`;
            renamedCount++;
            console.log(`✅ Renamed: "${filename}" → "${newFilename}"`);
          } else if (fs.existsSync(newFilePath)) {
            // It was already renamed previously
            item.image = `/images/optimized/${newFilename}`;
            renamedCount++;
            console.log(`ℹ️ Already exists: "${newFilename}"`);
          } else {
             // File doesn't exist
             console.warn(`⚠️ File not found, nulling: "${filename}"`);
             item.image = null;
             nulledCount++;
          }
        } catch (error) {
          console.error(`❌ Error renaming "${filename}": ${error.message}`);
          errorCount++;
        }
      } else {
        // It's a placeholder or no image -> set to null
        item.image = null;
        nulledCount++;
      }
    }
  }

  // Write updated data back
  fs.writeFileSync(MENU_DATA_PATH, JSON.stringify(menuData, null, 2), 'utf-8');

  console.log('\n' + '─'.repeat(50));
  console.log(`\n🏁 Cleanup and Renaming Complete!`);
  console.log(`   ✅ Renamed files: ${renamedCount}`);
  console.log(`   🧹 Nulled links:  ${nulledCount}`);
  if (errorCount > 0) console.log(`   ❌ Errors:        ${errorCount}`);
  console.log(`\n📂 Updated: ${MENU_DATA_PATH}\n`);
}

try {
  renameToIds();
} catch (err) {
  console.error('\n💥 Critical Error:', err.message);
  process.exit(1);
}
