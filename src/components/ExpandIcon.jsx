import React from 'react';

/**
 * ExpandIcon - Professional expand/collapse icon
 * Replaces emoji with clean SVG
 */
export default function ExpandIcon({ isExpanded = false }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`expand-icon ${isExpanded ? 'expanded' : ''}`}
    >
      {isExpanded ? (
        <>
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </>
      ) : (
        <>
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </>
      )}
    </svg>
  );
}

