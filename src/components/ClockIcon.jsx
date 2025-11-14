import React from 'react';

/**
 * ClockIcon - Mindfulness-inspired clock/time icon
 * Represents presence and time awareness (replaces ⏱️)
 */
export default function ClockIcon({ size = 20, className = '' }) {
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
      className={`clock-icon ${className}`}
    >
      {/* Circular clock face */}
      <circle cx="12" cy="12" r="10" />
      {/* Hour hand pointing to 3 */}
      <line x1="12" y1="12" x2="16" y2="12" strokeWidth="2.5" />
      {/* Minute hand pointing to 12 */}
      <line x1="12" y1="12" x2="12" y2="7" strokeWidth="2" />
      {/* Center dot */}
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

