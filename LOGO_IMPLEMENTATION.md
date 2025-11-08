# Logo Implementation Instructions

## Step 1: Save the Logo File

Please save your meditation logo image to:
- **`/public/logo.svg`** (if SVG format - recommended for line art)
- OR **`/public/logo.png`** (if PNG format)

The logo should be:
- Line art illustration of meditating person
- Dark blue (#293556) lines on transparent background
- Light blue arcs for aura effect
- Optimized for small sizes (favicon) and larger displays

## Step 2: Generate Favicon

After saving the logo, you'll need to create favicon files:
- `/public/favicon.ico` (32x32 or 16x16)
- `/public/favicon-32x32.png`
- `/public/favicon-16x16.png`

You can use online tools like:
- https://favicon.io/
- https://realfavicongenerator.net/

## Implementation Complete

The code is already set up to use:
- `/public/logo.svg` or `/public/logo.png` for logo display
- Logo appears on exercise cards (bottom right, subtle)
- Logo appears as watermark in ExerciseDetail
- Logo used as favicon
- Brand link to mindfulnessguiden.se added to header

