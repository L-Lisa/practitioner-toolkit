# Favicon & Icon Generation Instructions

## Quick Setup

To create favicon and PWA icons with beige background:

1. **Install sharp** (image processing library):
   ```bash
   npm install --save-dev sharp
   ```

2. **Run the script**:
   ```bash
   npm run create-favicon
   ```

This will create:
- `favicon-32x32.png` - Standard favicon (32x32)
- `favicon-16x16.png` - Small favicon (16x16)
- `apple-touch-icon.png` - Apple touch icon (180x180)
- Updated `icon-192.png` - PWA icon with beige background
- Updated `icon-512.png` - PWA icon with beige background

## Manual Alternative

If you prefer to create the icons manually:

1. Open your logo in an image editor (Photoshop, GIMP, Figma, etc.)
2. Create a beige background (#F6F4EA)
3. Place your logo on top with some padding
4. Export at these sizes:
   - 16x16px → `favicon-16x16.png`
   - 32x32px → `favicon-32x32.png`
   - 180x180px → `apple-touch-icon.png`
   - 192x192px → `icon-192.png` (replace existing)
   - 512x512px → `icon-512.png` (replace existing)

5. Save all files in the `public/` folder

## What's Already Done

✅ `index.html` has been updated to use the new favicon files
✅ Script created at `scripts/create-favicon.js`
✅ Package.json script added: `npm run create-favicon`

Just install sharp and run the script!

