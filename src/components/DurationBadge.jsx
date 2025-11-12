import React from 'react';
import './DurationBadge.css';

/**
 * DurationBadge Component
 * Reusable badge displaying exercise duration
 * Used in ExerciseCard, ExerciseDetail, and ShareModal
 */
export default function DurationBadge({ duration, className = '' }) {
  return (
    <span className={`duration-badge ${className}`}>
      ⏱️ {duration}
    </span>
  );
}

