import React from 'react';

/**
 * NotesIcon - Mindfulness-inspired notes/guidance icon
 * Represents guidance and facilitation (replaces 📝)
 */
export default function NotesIcon({ size = 20, className = '' }) {
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
      className={`notes-icon ${className}`}
    >
      {/* Paper/document shape with flowing lines */}
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      {/* Gentle lines representing notes */}
      <line x1="8" y1="12" x2="16" y2="12" strokeWidth="1.5" />
      <line x1="8" y1="16" x2="14" y2="16" strokeWidth="1.5" />
    </svg>
  );
}

