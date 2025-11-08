# Mindfulnessguiden Verktygslådan

A Progressive Web App (PWA) providing mindfulness guides with a portable toolkit of exercises accessible on mobile devices.

## Features

- ✅ Swipeable flashcard interface for quick access to mindfulness exercises
- ✅ Works 100% offline once installed
- ✅ No backend, no authentication, no data collection
- ✅ Small footprint, fast loading
- ✅ iOS HIG design principles
- ✅ Full keyboard and touch navigation
- ✅ Accessibility compliant (WCAG 2.1 Level AA)

## Tech Stack

- React 18+
- Vite 5+
- JavaScript
- CSS Modules
- Vite PWA Plugin (Workbox)

## Setup

### Prerequisites

- Node.js 18.x or 20.x
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── CardContainer.jsx       # Main container with swipe/navigation
│   ├── CoverCard.jsx           # Landing card with intro
│   ├── ExerciseCard.jsx        # Individual exercise card
│   ├── NavigationArrows.jsx    # Left/Right arrow buttons
│   ├── ProgressIndicator.jsx   # Card counter (1/11, 2/11, etc.)
│   ├── Accordion.jsx           # Reusable accordion component
│   └── InstallInstructions.jsx # Installation steps
├── data/
│   └── exercises.json           # Exercise content
├── styles/
│   └── global.css              # Global styles and CSS variables
└── App.jsx                     # Main app component
```

## Required Assets

Before running the app, you need to add:

1. **logo_transparent.webp** - Place in `/public/logo_transparent.webp`
   - This logo is used in the cover card and exercise cards
   - Will be used to generate PWA icons (192x192 and 512x512)

## PWA Icons

The app requires two icon sizes for PWA installation:

- `/public/icon-192.png` (192x192)
- `/public/icon-512.png` (512x512)

These should be generated from `logo_transparent.webp` with proper padding for iOS "maskable" requirements.

## Deployment

### Vercel

```bash
npm i -g vercel
vercel --prod
```

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

## Browser Support

- iOS Safari 15+ (primary target)
- Chrome 90+ (mobile & desktop)
- Edge 90+
- Firefox 88+
- DuckDuckGo Browser

## Development Notes

- The app uses CSS Modules for component-scoped styling
- Touch gestures are implemented for mobile swipe navigation
- Keyboard navigation (arrow keys) works on desktop
- All animations use CSS transforms for GPU acceleration
- Service worker caches all assets for offline functionality

## License

Private project - All rights reserved
