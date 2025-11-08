import React from 'react';

/**
 * ResearchIcon - Professional mindfulness-inspired icon
 * Replaces star emojis with a clean, professional design
 */
export default function ResearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="research-icon"
    >
      {/* Simple checkmark badge - professional and clean */}
      <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

