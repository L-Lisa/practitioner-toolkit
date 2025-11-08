/**
 * Utility to dynamically update meta tags for social sharing
 * Updates Open Graph, Twitter Card, and standard meta tags
 */

export const updateMetaTags = (exercise) => {
  if (!exercise) return;

  const baseUrl = window.location.origin;
  const exerciseUrl = `${baseUrl}${window.location.pathname}#exercise-${exercise.id}`;
  // Use absolute URL for images (required for Open Graph)
  const imageUrl = `${baseUrl}/logo_transparent.webp`;
  
  // Description: Use oneLiner or a default
  const description = exercise.oneLiner || 
    `Mindfulnessövning: ${exercise.title} - ${exercise.competency}`;

  // Title
  const title = `${exercise.title} | Mindfulnessguiden Verktygslådan`;

  // Helper function to set or update meta tag
  const setMetaTag = (property, content, isProperty = true) => {
    const attribute = isProperty ? 'property' : 'name';
    let meta = document.querySelector(`meta[${attribute}="${property}"]`);
    
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, property);
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  };

  // Update document title
  document.title = title;

  // Standard meta tags
  setMetaTag('description', description, false);
  setMetaTag('title', title, false);

  // Open Graph tags
  setMetaTag('og:title', title);
  setMetaTag('og:description', description);
  setMetaTag('og:url', exerciseUrl);
  setMetaTag('og:type', 'website');
  setMetaTag('og:image', imageUrl);
  setMetaTag('og:image:width', '1200');
  setMetaTag('og:image:height', '630');
  setMetaTag('og:site_name', 'Mindfulnessguiden Verktygslådan');
  setMetaTag('og:locale', 'sv_SE');

  // Twitter Card tags
  setMetaTag('twitter:card', 'summary_large_image', false);
  setMetaTag('twitter:title', title, false);
  setMetaTag('twitter:description', description, false);
  setMetaTag('twitter:image', imageUrl, false);

  // Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', exerciseUrl);
};

export const resetMetaTags = () => {
  const defaultTitle = 'Mindfulnessguiden Verktygslådan';
  const defaultDescription = 'Verktygslåda för certifierade mindfulnessguider';
  const baseUrl = window.location.origin;
  const defaultUrl = baseUrl + window.location.pathname;

  document.title = defaultTitle;

  const setMetaTag = (property, content, isProperty = true) => {
    const attribute = isProperty ? 'property' : 'name';
    let meta = document.querySelector(`meta[${attribute}="${property}"]`);
    
    if (meta) {
      meta.setAttribute('content', content);
    }
  };

  setMetaTag('description', defaultDescription, false);
  setMetaTag('og:title', defaultTitle);
  setMetaTag('og:description', defaultDescription);
  setMetaTag('og:url', defaultUrl);
  setMetaTag('og:type', 'website');
  setMetaTag('og:image', `${baseUrl}/logo_transparent.webp`);
};

