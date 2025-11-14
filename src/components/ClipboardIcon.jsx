import React from 'react';

/**
 * ClipboardIcon - Mindfulness-inspired clipboard/view icon
 * Represents overview and detail view (replaces 📋)
 */
export default function ClipboardIcon({ size = 20, className = '' }) {
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
      className={`clipboard-icon ${className}`}
    >
      {/* Clipboard shape */}
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      {/* Clip */}
      <rect x="9" y="3" width="6" height="4" rx="1" />
      {/* Lines representing content */}
      <line x1="9" y1="12" x2="15" y2="12" strokeWidth="1.5" />
      <line x1="9" y1="16" x2="13" y2="16" strokeWidth="1.5" />
    </svg>
  );
}

