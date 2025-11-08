/**
 * Script to create favicon and PWA icons with beige background
 * Requires: sharp (npm install sharp)
 * Run: node scripts/create-favicon.js
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BEIGE_BACKGROUND = '#F6F4EA';
const OUTPUT_DIR = path.join(__dirname, '../public');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function createFaviconWithBackground() {
  try {
    const logoPath = path.join(OUTPUT_DIR, 'logo_transparent.webp');
    
    // Check if logo exists
    if (!fs.existsSync(logoPath)) {
      console.error('❌ logo_transparent.webp not found in public/');
      console.log('Please ensure logo_transparent.webp exists in the public folder');
      return;
    }

    console.log('🎨 Creating favicon and icons with beige background...');

    // Create favicon (32x32) - full beige background
    await sharp({
      create: {
        width: 32,
        height: 32,
        channels: 3,
        background: BEIGE_BACKGROUND
      }
    })
      .composite([{
        input: await sharp(logoPath)
          .resize(24, 24, { fit: 'contain', background: 'transparent' })
          .toBuffer(),
        gravity: 'center'
      }])
      .png()
      .toFile(path.join(OUTPUT_DIR, 'favicon-32x32.png'));

    console.log('✅ Created favicon-32x32.png');

    // Create favicon (16x16) - full beige background
    await sharp({
      create: {
        width: 16,
        height: 16,
        channels: 3,
        background: BEIGE_BACKGROUND
      }
    })
      .composite([{
        input: await sharp(logoPath)
          .resize(12, 12, { fit: 'contain', background: 'transparent' })
          .toBuffer(),
        gravity: 'center'
      }])
      .png()
      .toFile(path.join(OUTPUT_DIR, 'favicon-16x16.png'));

    console.log('✅ Created favicon-16x16.png');

    // Update PWA icons with full beige background
    await sharp({
      create: {
        width: 192,
        height: 192,
        channels: 3,
        background: BEIGE_BACKGROUND
      }
    })
      .composite([{
        input: await sharp(logoPath)
          .resize(160, 160, { fit: 'contain', background: 'transparent' })
          .toBuffer(),
        gravity: 'center'
      }])
      .png()
      .toFile(path.join(OUTPUT_DIR, 'icon-192.png'));

    console.log('✅ Updated icon-192.png');

    await sharp({
      create: {
        width: 512,
        height: 512,
        channels: 3,
        background: BEIGE_BACKGROUND
      }
    })
      .composite([{
        input: await sharp(logoPath)
          .resize(420, 420, { fit: 'contain', background: 'transparent' })
          .toBuffer(),
        gravity: 'center'
      }])
      .png()
      .toFile(path.join(OUTPUT_DIR, 'icon-512.png'));

    console.log('✅ Updated icon-512.png');

    // Create apple-touch-icon (180x180) - full beige background
    await sharp({
      create: {
        width: 180,
        height: 180,
        channels: 3,
        background: BEIGE_BACKGROUND
      }
    })
      .composite([{
        input: await sharp(logoPath)
          .resize(150, 150, { fit: 'contain', background: 'transparent' })
          .toBuffer(),
        gravity: 'center'
      }])
      .png()
      .toFile(path.join(OUTPUT_DIR, 'apple-touch-icon.png'));

    console.log('✅ Created apple-touch-icon.png');

    console.log('\n✨ All icons created successfully!');
    console.log('📝 Update index.html to use the new favicon files.');

  } catch (error) {
    console.error('❌ Error creating icons:', error.message);
    if (error.code === 'MODULE_NOT_FOUND') {
      console.log('\n💡 Install sharp first: npm install sharp');
    }
  }
}

createFaviconWithBackground();

