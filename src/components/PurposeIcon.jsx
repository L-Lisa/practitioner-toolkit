import React from 'react';

/**
 * PurposeIcon - Mindfulness-inspired purpose/intention icon
 * Represents direction and intention (replaces 📍)
 */
export default function PurposeIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`purpose-icon ${className}`}
    >
      {/* Compass-like design - represents direction and purpose */}
      <circle cx="12" cy="12" r="10" />
      {/* North indicator */}
      <line x1="12" y1="2" x2="12" y2="6" strokeWidth="2.5" />
      {/* Center point */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

