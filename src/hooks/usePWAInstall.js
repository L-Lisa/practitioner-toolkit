/**
 * usePWAInstall Hook
 * Detects if PWA is already installed/running in standalone mode
 * Returns whether install button should be shown
 */
import { useState, useEffect } from 'react';

export function usePWAInstall() {
  const [isInstalled, setIsInstalled] = useState(false);
  const [showInstallButton, setShowInstallButton] = useState(true);

  useEffect(() => {
    // Check if running in standalone mode (PWA is installed)
    const checkIfInstalled = () => {
      // Standard way: Check display mode
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
      
      // iOS Safari specific check
      const isIOSStandalone = window.navigator.standalone === true;
      
      // Check for minimal-ui mode (another PWA display mode)
      const isMinimalUI = window.matchMedia('(display-mode: minimal-ui)').matches;
      
      // If any of these are true, PWA is installed
      const installed = isStandalone || isIOSStandalone || isMinimalUI;
      
      setIsInstalled(installed);
      setShowInstallButton(!installed);
    };

    // Check immediately
    checkIfInstalled();

    // Also listen for changes (in case user installs while on page)
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleChange = () => checkIfInstalled();
    
    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return {
    isInstalled,
    showInstallButton
  };
}

