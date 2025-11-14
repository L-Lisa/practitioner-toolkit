import React from 'react';

/**
 * InsightIcon - Mindfulness-inspired lightbulb/insight icon
 * Represents wisdom and understanding (replaces 💡)
 */
export default function InsightIcon({ size = 20, className = '' }) {
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
      className={`insight-icon ${className}`}
    >
      {/* Lightbulb - organic, flowing shape */}
      <path d="M9 21h6" />
      <path d="M12 3a6 6 0 0 1 6 6c0 3.314-2.686 6-6 6a6 6 0 0 1-6-6c0-3.314 2.686-6 6-6z" />
      {/* Gentle rays of light */}
      <line x1="12" y1="9" x2="12" y2="3" strokeWidth="1.5" opacity="0.5" />
      <line x1="8" y1="7" x2="6" y2="5" strokeWidth="1.5" opacity="0.5" />
      <line x1="16" y1="7" x2="18" y2="5" strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

