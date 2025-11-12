import './ExerciseCard.css';
import DurationBadge from './DurationBadge';

/**
 * ExerciseCard Component
 * Displays validated mindfulness exercise with research credibility
 * Mobile-first design for Swedish workplace facilitators
 */

const ExerciseCard = ({ exercise }) => {
  const {
    title,
    competency,
    duration,
    oneLiner
  } = exercise;

  return (
    <div className="exercise-card">
      {/* Duration Badge */}
      <div className="card-meta">
        <DurationBadge duration={duration} />
      </div>

      {/* Exercise Title */}
      <h2 className="card-title">{title}</h2>
      
      {/* Competency Tag */}
      <p className="card-competency">{competency}</p>

      {/* Benefit Statement */}
      <p className="card-benefit">{oneLiner}</p>

      {/* Action */}
      <div className="card-link">
        Läs mer
      </div>

      {/* Logo Watermark - Subtle, bottom right */}
      <div className="card-logo-watermark">
        <img
          src="/logo_transparent.webp"
          alt=""
          className="watermark-logo"
          onError={(e) => {
            e.target.src = '/logo.svg';
            e.target.onerror = () => {
              e.target.src = '/logo.png';
              e.target.onerror = () => {
                e.target.style.display = 'none';
              };
            };
          }}
        />
      </div>
    </div>
  );
};

export default ExerciseCard;
