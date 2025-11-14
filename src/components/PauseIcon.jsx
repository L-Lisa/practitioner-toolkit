import React from 'react';

/**
 * PauseIcon - Mindfulness-inspired pause/moment icon
 * Represents presence and pause (replaces ⏸️)
 */
export default function PauseIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`pause-icon ${className}`}
    >
      {/* Two vertical bars representing pause */}
      <rect x="8" y="5" width="3" height="14" rx="1" />
      <rect x="13" y="5" width="3" height="14" rx="1" />
    </svg>
  );
}

