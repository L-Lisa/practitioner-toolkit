import './BrandIcon.css';

/**
 * BrandIcon Component
 * Mindfulnessguiden brand icon for headers
 */
const BrandIcon = ({ size = 32 }) => {
  return (
    <div className="brand-icon" style={{ width: size, height: size }}>
      <div className="brand-icon-circle"></div>
    </div>
  );
};

export default BrandIcon;

