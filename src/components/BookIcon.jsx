import React from 'react';

/**
 * BookIcon - Mindfulness-inspired book/source icon
 * Represents knowledge and sources (replaces 📚)
 */
export default function BookIcon({ size = 20, className = '' }) {
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
      className={`book-icon ${className}`}
    >
      {/* Open book */}
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      {/* Pages/lines */}
      <line x1="9" y1="7" x2="18" y2="7" strokeWidth="1.5" />
      <line x1="9" y1="11" x2="18" y2="11" strokeWidth="1.5" />
    </svg>
  );
}

