import React from 'react';
import './BrandLink.css';

/**
 * BrandLink Component
 * Subtle link to mindfulnessguiden.se website
 * Appears in header/footer with logo
 */
export default function BrandLink({ variant = 'header' }) {
  return (
    <a
      href="https://www.mindfulnessguiden.se/"
      target="_blank"
      rel="noopener noreferrer"
      className={`brand-link brand-link-${variant}`}
      aria-label="Besök Mindfulnessguiden.se (öppnas i ny flik)"
    >
      <img
        src="/logo_transparent.webp"
        alt="Mindfulnessguiden"
        className="brand-logo"
        onError={(e) => {
          // Fallback to SVG if webp doesn't exist
          e.target.src = '/logo.svg';
          e.target.onerror = () => {
            // Final fallback to PNG
            e.target.src = '/logo.png';
            e.target.onerror = () => {
              e.target.style.display = 'none';
            };
          };
        }}
      />
      <span className="brand-text">mindfulnessguiden.se</span>
    </a>
  );
}

