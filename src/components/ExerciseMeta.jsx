import React from 'react';
import DurationBadge from './DurationBadge';
import './ExerciseMeta.css';

/**
 * ExerciseMeta Component
 * Displays duration and competency badges together
 * Used in ExerciseDetail and other places where meta info is shown
 */
export default function ExerciseMeta({ duration, competency, className = '' }) {
  return (
    <div className={`exercise-meta ${className}`} role="contentinfo" aria-label="Övningsinformation">
      <DurationBadge duration={duration} />
      {competency && (
        <span className="competency-badge">{competency}</span>
      )}
    </div>
  );
}

