/**
 * ============================================================
 * Manual Image Fix Script
 * ============================================================
 * Fixes unmatched menu items with their correct optimized images.
 * Run AFTER map-images.cjs to patch remaining items.
 *
 * Usage:  node fix-images.cjs
 * ============================================================
 */

const fs = require('fs');
const path = require('path');

const MENU_DATA_PATH = path.resolve(__dirname, 'src', 'data', 'menuData.json');
const IMAGE_BASE_PATH = '/images/optimized';

// ── Manual Mapping: item ID → image filename ───────────────
const MANUAL_MAP = {
  // Breakfast items
  'b1':  'بيض مخفوق.webp',          // بيض مخفوق أو بيض عيون
  'b3':  'بيض جبنة وفطر.webp',       // بيض مع الفطر والجبنة
  'b9':  'شكشوكة.webp',              // شكشوكة بالبيض
  'b11': 'فول.webp',                 // فول مدمس
  'b14': 'فتة بالفرن.webp',          // فتة بالبيض ناشف
  'b17': 'حمسة باذنجان.webp',        // حمسة بالبيض ناشف (closest available)
  'b24': null,                        // صحن خضر - no image available
  'b26': 'حمص.webp',                 // حمص سادة
  'b28': null,                        // صحن خضر - duplicate, no image
  'b34': 'لحمة بالعجين.webp',        // لحمة بعجين دبس رمان

  // Grills
  'g1':  'مكرر.webp',                // مشاوي مشكل كبير (8 سيخ)
  'g2':  'مكرر.webp',                // مشاوي مشكل (4 سيخ)
  'g16': 'ريش مشوي.webp',            // روش (كستليتة) 4 حبة

  // Hot dishes
  'h4':  'كبة قراص.webp',            // كبة أقراص محشية
  'h11': 'سوده بالليمون.webp',       // سودة دجاج
  'h12': 'بطاطا شيبس.webp',          // بطاطا مقلية
  'h14': null,                        // لسانات غنم - no image
  'h19': 'عرايس باللحمة.webp',       // عرايس كفتة
  'h21': 'شيكن برجر.webp',           // برغر دجاج

  // Daily dishes
  'd1':  'فريكة بالدحاج.webp',       // فريكة دجاج
  'd2':  'فريكة بالموزات.webp',      // فريكة لحم
  'd3':  null,                        // رز بالشعرية - no image

  // Cold appetizers / Salads
  'c4':  'روكا  الفيتا.webp',        // سلطة روكا
  'c5':  'روكا بالشمندر.webp',       // سلطة شمندر مع جرجير
  'c12': 'حمص باللحمة.webp',         // حمص بالصنوبر (closest)

  // Other
  'r1':  'تبوله.webp',               // تبالة

  // Desserts
  'ds6': 'غزل بنات بالايس كريم.webp', // غزل البنات بالبوظة

  // Hot drinks
  'hd1': 'قهوة فرنسية.webp',         // قهوة بيضاء (closest)
  'hd2': 'هوت شوكلت.webp',           // إبريق شاي (closest available)
  'hd3': 'هوت شوكلت.webp',           // إبريق شاي بالحليب
  'hd4': null,                        // شاي أخضر - no image
  'hd5': null,                        // إبريق شاي أخضر - no image
  'hd6': null,                        // شاي - no image

  // Coffee
  'cf1': 'قهوة فرنسية.webp',         // قهوة تركية (closest)
  'cf3': 'سبانش لاتيه ايس.webp',     // اسبريسو (closest)
  'cf4': 'سبانش لاتيه ايس.webp',     // كابتشينو (closest)

  // Soft drinks
  'sd1': null,                        // مشروبات غازية - no image
  'sd2': null,                        // قنينة مياه معدنية صغيرة - no image
  'sd3': null,                        // قنينة مياه معدنية كبيرة - no image
  'sd4': null,                        // قنينة ماء غازية صغيرة - no image
  'sd5': null,                        // قنينة ماء غازية كبيرة - no image

  // Juices
  'j3':  'ليموناضة.webp',            // ليموناضة اللبنانية طازج
  'j5':  null,                        // جلاب - no image
};

// ── Main ───────────────────────────────────────────────────
function fixImages() {
  console.log('\n🔧 Applying Manual Image Fixes...\n');

  const rawData = fs.readFileSync(MENU_DATA_PATH, 'utf-8');
  const menuData = JSON.parse(rawData);

  let fixedCount = 0;
  let skippedCount = 0;

  for (const category of menuData.menu) {
    for (const item of category.items) {
      if (item.id in MANUAL_MAP) {
        const filename = MANUAL_MAP[item.id];
        if (filename) {
          item.image = `${IMAGE_BASE_PATH}/${encodeURIComponent(filename)}`;
          console.log(`✅ Fixed: [${item.id}] "${item.name.ar}" → ${filename}`);
          fixedCount++;
        } else {
          // Keep placeholder for items with no available image
          item.image = '/assets/menu/placeholder.jpg';
          console.log(`⬜ No image: [${item.id}] "${item.name.ar}" → placeholder`);
          skippedCount++;
        }
      }
    }
  }

  fs.writeFileSync(MENU_DATA_PATH, JSON.stringify(menuData, null, 2), 'utf-8');

  console.log('\n' + '─'.repeat(50));
  console.log(`\n🏁 Manual Fixes Complete!`);
  console.log(`   ✅ Fixed:      ${fixedCount} items`);
  console.log(`   ⬜ No image:   ${skippedCount} items (kept placeholder)`);
  console.log(`\n📂 Updated: ${MENU_DATA_PATH}\n`);
}

try {
  fixImages();
} catch (err) {
  console.error('\n💥 Error:', err.message);
  process.exit(1);
}
