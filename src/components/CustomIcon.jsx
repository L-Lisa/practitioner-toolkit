import './CustomIcon.css';

/**
 * CustomIcon Component
 * Branded CSS-based icons (no emojis)
 * Types: target, lightbulb, research, book, script, clock
 */
const CustomIcon = ({ type, size = 20, className = '' }) => {
  return (
    <span 
      className={`custom-icon icon-${type} ${className}`} 
      style={{ width: size, height: size }}
      aria-hidden="true"
    />
  );
};

export default CustomIcon;

