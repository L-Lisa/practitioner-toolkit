import React from 'react';

/**
 * MinusIcon - Clean minus icon for limitations
 * Represents subtraction and limitations (replaces ➖)
 */
export default function MinusIcon({ size = 20, className = '' }) {
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
      className={`minus-icon ${className}`}
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

