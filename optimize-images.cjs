/**
 * ============================================================
 * Image Optimization Script
 * ============================================================
 * Converts raw high-resolution images to optimized WebP format
 * for web deployment with minimal bandwidth usage.
 *
 * Usage:  node optimize-images.js
 *
 * Input:  ./raw_images/
 * Output: ./public/images/optimized/
 * ============================================================
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// ── Configuration ──────────────────────────────────────────
const INPUT_DIR = path.resolve(__dirname, 'raw_images');
const OUTPUT_DIR = path.resolve(__dirname, 'public', 'images', 'optimized');
const MAX_WIDTH = 800;
const WEBP_QUALITY = 80;
const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.tiff', '.bmp', '.gif', '.webp', '.avif'];

// ── Main ───────────────────────────────────────────────────
async function optimizeImages() {
  console.log('\n🚀 Starting Image Optimization...');
  console.log(`   📂 Input:  ${INPUT_DIR}`);
  console.log(`   📂 Output: ${OUTPUT_DIR}`);
  console.log(`   📐 Max Width: ${MAX_WIDTH}px`);
  console.log(`   🎨 WebP Quality: ${WEBP_QUALITY}%\n`);

  // 1. Validate input directory exists
  if (!fs.existsSync(INPUT_DIR)) {
    console.error(`❌ Error: Input directory not found: ${INPUT_DIR}`);
    console.error(`   Please create the "raw_images" folder and add your images.`);
    process.exit(1);
  }

  // 2. Create output directory (recursive) if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Created output directory: ${OUTPUT_DIR}\n`);
  }

  // 3. Read all files and filter for supported image extensions
  const allFiles = fs.readdirSync(INPUT_DIR);
  const imageFiles = allFiles.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return SUPPORTED_EXTENSIONS.includes(ext);
  });

  if (imageFiles.length === 0) {
    console.warn('⚠️  No supported image files found in the input directory.');
    console.warn(`   Supported formats: ${SUPPORTED_EXTENSIONS.join(', ')}`);
    process.exit(0);
  }

  console.log(`📷 Found ${imageFiles.length} image(s) to process.\n`);
  console.log('─'.repeat(50));

  // 4. Process each image
  let successCount = 0;
  let failCount = 0;
  const startTime = Date.now();

  for (const file of imageFiles) {
    const inputPath = path.join(INPUT_DIR, file);
    const baseName = path.parse(file).name;
    const outputFileName = `${baseName}.webp`;
    const outputPath = path.join(OUTPUT_DIR, outputFileName);

    try {
      const inputStats = fs.statSync(inputPath);
      const inputSizeKB = (inputStats.size / 1024).toFixed(1);

      await sharp(inputPath)
        .resize({
          width: MAX_WIDTH,
          withoutEnlargement: true, // Don't upscale small images
          fit: 'inside',           // Maintain aspect ratio
        })
        .webp({ quality: WEBP_QUALITY })
        .toFile(outputPath);

      const outputStats = fs.statSync(outputPath);
      const outputSizeKB = (outputStats.size / 1024).toFixed(1);
      const savings = (((inputStats.size - outputStats.size) / inputStats.size) * 100).toFixed(1);

      console.log(`✅ Processed: ${outputFileName}  (${inputSizeKB} KB → ${outputSizeKB} KB | -${savings}%)`);
      successCount++;
    } catch (error) {
      console.error(`❌ Failed:    ${file}  →  ${error.message}`);
      failCount++;
    }
  }

  // 5. Summary
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

  console.log('\n' + '─'.repeat(50));
  console.log(`\n🏁 Optimization Complete!`);
  console.log(`   ✅ Success: ${successCount} image(s)`);
  if (failCount > 0) {
    console.log(`   ❌ Failed:  ${failCount} image(s)`);
  }
  console.log(`   ⏱️  Time:    ${elapsed}s`);
  console.log(`   📂 Output:  ${OUTPUT_DIR}\n`);
}

// ── Execute ────────────────────────────────────────────────
optimizeImages().catch((err) => {
  console.error('\n💥 Unexpected error:', err.message);
  process.exit(1);
});
