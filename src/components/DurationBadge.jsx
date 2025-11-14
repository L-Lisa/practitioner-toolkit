import React from 'react';
import './DurationBadge.css';
import ClockIcon from './ClockIcon';

/**
 * DurationBadge Component
 * Reusable badge displaying exercise duration with custom clock icon
 * Used in ExerciseCard, ExerciseDetail, and ShareModal
 */
export default function DurationBadge({ duration, className = '' }) {
  return (
    <div className={`duration-badge ${className}`}>
      <ClockIcon size={16} />
      <span>{duration}</span>
    </div>
  );
}

