import React from 'react';

/**
 * TargetIcon - Mindfulness-inspired target/focus icon
 * Represents clarity and intention (replaces 🎯)
 */
export default function TargetIcon({ size = 20, className = '' }) {
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
      className={`target-icon ${className}`}
    >
      {/* Outer circle - represents awareness */}
      <circle cx="12" cy="12" r="10" />
      {/* Middle circle - represents focus */}
      <circle cx="12" cy="12" r="6" />
      {/* Inner dot - represents presence */}
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

