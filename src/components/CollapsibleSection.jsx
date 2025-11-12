import React from 'react';
import './CollapsibleSection.css';

/**
 * CollapsibleSection Component
 * Reusable collapsible section with toggle button
 * Used for Research, Facilitation, When to Use, and Script sections
 */
export default function CollapsibleSection({
  title,
  icon,
  isExpanded,
  onToggle,
  children,
  className = '',
  toggleClassName = '',
  contentClassName = '',
  preview,
  count
}) {
  const displayTitle = count ? `${title} (${count})` : title;
  const toggleText = isExpanded ? '▲' : '▼';

  return (
    <section className={`collapsible-section ${className}`}>
      <button 
        className={`collapsible-toggle ${toggleClassName}`}
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? 'Dölj' : 'Visa'} ${title}`}
      >
        <h2 className="section-icon">
          {icon} {displayTitle} {toggleText}
        </h2>
        {!isExpanded && preview && (
          <p className="section-preview">{preview}</p>
        )}
      </button>

      {isExpanded && (
        <div className={contentClassName || 'collapsible-content'}>
          {children}
        </div>
      )}
    </section>
  );
}

