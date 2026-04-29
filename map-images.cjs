/**
 * ============================================================
 * Image-to-Menu Mapper Script
 * ============================================================
 * Reads optimized image filenames and maps them to menu items
 * in menuData.json by fuzzy-matching the Arabic name (name.ar)
 * against the image filename (without extension).
 *
 * Usage:  node map-images.cjs
 * ============================================================
 */

const fs = require('fs');
const path = require('path');

// ── Configuration ──────────────────────────────────────────
const MENU_DATA_PATH = path.resolve(__dirname, 'src', 'data', 'menuData.json');
const OPTIMIZED_DIR = path.resolve(__dirname, 'public', 'images', 'optimized');
const IMAGE_BASE_PATH = '/images/optimized'; // Web-relative path

// ── Helpers ────────────────────────────────────────────────

/**
 * Normalize Arabic text for fuzzy comparison:
 * - Remove diacritics (tashkeel)
 * - Normalize common letter variations (أإآ → ا, ة → ه, ى → ي)
 * - Remove extra whitespace
 * - Lowercase
 */
function normalizeArabic(text) {
  return text
    .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/g, '') // Remove tashkeel
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calculate similarity between two strings (Dice coefficient).
 * Returns a score between 0 and 1.
 */
function similarity(a, b) {
  const na = normalizeArabic(a);
  const nb = normalizeArabic(b);
  
  if (na === nb) return 1;
  if (na.length < 2 || nb.length < 2) return 0;

  const bigramsA = new Map();
  for (let i = 0; i < na.length - 1; i++) {
    const bigram = na.substring(i, i + 2);
    bigramsA.set(bigram, (bigramsA.get(bigram) || 0) + 1);
  }

  let intersectionSize = 0;
  for (let i = 0; i < nb.length - 1; i++) {
    const bigram = nb.substring(i, i + 2);
    const count = bigramsA.get(bigram) || 0;
    if (count > 0) {
      bigramsA.set(bigram, count - 1);
      intersectionSize++;
    }
  }

  return (2.0 * intersectionSize) / (na.length - 1 + nb.length - 1);
}

// ── Main ───────────────────────────────────────────────────
function mapImages() {
  console.log('\n🗺️  Starting Image-to-Menu Mapping...\n');

  // 1. Read menu data
  const rawData = fs.readFileSync(MENU_DATA_PATH, 'utf-8');
  const menuData = JSON.parse(rawData);

  // 2. Read optimized image filenames
  const imageFiles = fs.readdirSync(OPTIMIZED_DIR)
    .filter(f => f.endsWith('.webp'))
    .map(f => ({
      filename: f,
      baseName: path.parse(f).name, // Arabic name without extension
    }));

  console.log(`📷 Found ${imageFiles.length} optimized images.`);
  console.log(`📋 Found ${menuData.menu.reduce((acc, cat) => acc + cat.items.length, 0)} menu items.\n`);
  console.log('─'.repeat(60));

  let matchCount = 0;
  let unmatchedItems = [];
  let usedImages = new Set();

  // 3. Iterate through each category and item
  for (const category of menuData.menu) {
    for (const item of category.items) {
      const itemNameAr = item.name.ar;

      // Find best matching image
      let bestMatch = null;
      let bestScore = 0;

      for (const img of imageFiles) {
        const score = similarity(itemNameAr, img.baseName);
        if (score > bestScore) {
          bestScore = score;
          bestMatch = img;
        }
      }

      // Threshold: only accept matches above 0.6 similarity
      if (bestMatch && bestScore >= 0.6) {
        item.image = `${IMAGE_BASE_PATH}/${encodeURIComponent(bestMatch.filename)}`;
        usedImages.add(bestMatch.filename);
        matchCount++;
        const indicator = bestScore >= 0.9 ? '✅' : '🟡';
        console.log(`${indicator} [${(bestScore * 100).toFixed(0)}%] "${itemNameAr}" → ${bestMatch.filename}`);
      } else {
        unmatchedItems.push({
          id: item.id,
          name: itemNameAr,
          bestGuess: bestMatch ? bestMatch.filename : 'N/A',
          score: bestScore,
        });
        // Keep the placeholder for unmatched items
        console.log(`❌ [${(bestScore * 100).toFixed(0)}%] "${itemNameAr}" → NO MATCH (best: ${bestMatch?.filename})`);
      }
    }
  }

  // 4. Write updated menu data
  fs.writeFileSync(MENU_DATA_PATH, JSON.stringify(menuData, null, 2), 'utf-8');

  // 5. Summary
  const unusedImages = imageFiles.filter(img => !usedImages.has(img.filename));

  console.log('\n' + '─'.repeat(60));
  console.log(`\n🏁 Mapping Complete!`);
  console.log(`   ✅ Matched:   ${matchCount} items`);
  console.log(`   ❌ Unmatched: ${unmatchedItems.length} items`);
  console.log(`   📷 Unused images: ${unusedImages.length}`);

  if (unmatchedItems.length > 0) {
    console.log('\n📋 Unmatched Items (need manual mapping):');
    unmatchedItems.forEach(u => {
      console.log(`   • [${u.id}] "${u.name}" (best guess: "${u.bestGuess}" at ${(u.score * 100).toFixed(0)}%)`);
    });
  }

  if (unusedImages.length > 0) {
    console.log('\n📷 Unused Optimized Images:');
    unusedImages.forEach(img => {
      console.log(`   • ${img.filename}`);
    });
  }

  console.log(`\n📂 Updated: ${MENU_DATA_PATH}\n`);
}

// ── Execute ────────────────────────────────────────────────
try {
  mapImages();
} catch (err) {
  console.error('\n💥 Error:', err.message);
  process.exit(1);
}
