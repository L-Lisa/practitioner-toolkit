import React from 'react';

/**
 * ScriptIcon - Mindfulness-inspired script/microphone icon
 * Represents voice and guidance (replaces 🎤)
 */
export default function ScriptIcon({ size = 20, className = '' }) {
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
      className={`script-icon ${className}`}
    >
      {/* Microphone with gentle waves representing voice */}
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
      {/* Sound waves - gentle and flowing */}
      <path d="M5 10c0 2 1 3 3 3s3-1 3-3" strokeWidth="1.5" opacity="0.6" />
      <path d="M19 10c0 2-1 3-3 3s-3-1-3-3" strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

