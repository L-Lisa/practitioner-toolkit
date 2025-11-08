import React, { useState, useEffect } from 'react';
import './DesktopInstallBanner.css';

/**
 * DesktopInstallBanner
 * Shows install instructions for desktop users
 * Dismissible and only shows on desktop viewports
 * Automatically hides if PWA is already installed
 */
export default function DesktopInstallBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if PWA is already installed (standalone mode)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isIOSStandalone = window.navigator.standalone === true;
    const isMinimalUI = window.matchMedia('(display-mode: minimal-ui)').matches;
    
    if (isStandalone || isIOSStandalone || isMinimalUI) {
      setIsVisible(false);
      return;
    }

    // Check if dismissed in localStorage
    const dismissed = localStorage.getItem('desktop-install-dismissed');
    if (dismissed) {
      setIsDismissed(true);
      setIsVisible(false);
      return;
    }

    // Check if desktop viewport
    const checkDesktop = () => {
      const isDesktopView = window.innerWidth >= 768;
      setIsVisible(isDesktopView);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    localStorage.setItem('desktop-install-dismissed', 'true');
  };

  if (!isVisible || isDismissed) return null;

  // Detect browser for specific instructions
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  const isEdge = /Edg/.test(navigator.userAgent);
  const isFirefox = /Firefox/.test(navigator.userAgent);
  const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

  return (
    <div className="desktop-install-banner">
      <div className="desktop-install-content">
        <div className="desktop-install-icon">📱</div>
        <div className="desktop-install-text">
          <strong>Denna app är designad för mobil</strong>
          <p>För bästa upplevelse, installera appen på din telefon eller använd den på en surfplatta.</p>
          {isChrome || isEdge ? (
            <div className="install-steps">
              <p><strong>Chrome/Edge:</strong> Klicka på install-ikonen i adressfältet → "Installera"</p>
            </div>
          ) : isFirefox ? (
            <div className="install-steps">
              <p><strong>Firefox:</strong> Klicka på "+" i adressfältet → "Lägg till på startsidan"</p>
            </div>
          ) : isSafari ? (
            <div className="install-steps">
              <p><strong>Safari:</strong> Dela-knappen → "Lägg till på hemskärmen"</p>
            </div>
          ) : (
            <div className="install-steps">
              <p>Leta efter "Installera app" eller "Lägg till på hemskärmen" i din webbläsares meny</p>
            </div>
          )}
        </div>
        <button
          className="desktop-install-close"
          onClick={handleDismiss}
          aria-label="Stäng"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

