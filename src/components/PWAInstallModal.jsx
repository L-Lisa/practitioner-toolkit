import React from 'react';
import './PWAInstallModal.css';
import { useModal } from '../hooks/useModal';

/**
 * PWA Install Modal
 * Provides instructions for installing the PWA to home screen
 * Works on both mobile and desktop
 */
export default function PWAInstallModal({ isOpen, onClose }) {
  const modalRef = useModal(isOpen, onClose);

  if (!isOpen) return null;

  // Detect device and browser
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);
  const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  const isEdge = /Edg/.test(navigator.userAgent);
  const isFirefox = /Firefox/.test(navigator.userAgent);
  const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
  const isDesktop = window.innerWidth >= 768;

  return (
    <div className="pwa-install-modal-overlay">
      <div className="pwa-install-modal" ref={modalRef}>
        <div className="pwa-install-header">
          <h2>Ladda ned app</h2>
          <button
            className="pwa-install-close"
            onClick={onClose}
            aria-label="Stäng"
          >
            ✕
          </button>
        </div>

        <div className="pwa-install-content">
          <div className="pwa-install-icon">📱</div>
          
          <p className="pwa-install-intro">
            Installera denna app på din enhet för snabbare åtkomst och bättre upplevelse.
          </p>

          {isIOS && isSafari ? (
            <div className="pwa-install-steps">
              <h3>iPhone/iPad (Safari):</h3>
              <ol>
                <li>Tryck på <strong>Dela</strong>-knappen <span className="icon-placeholder">📤</span> längst ner i Safari</li>
                <li>Scrolla ner och välj <strong>"Lägg till på hemskärmen"</strong></li>
                <li>Tryck på <strong>"Lägg till"</strong> i övre högra hörnet</li>
                <li>Appen visas nu som en ikon på din hemskärm</li>
              </ol>
            </div>
          ) : isAndroid && isChrome ? (
            <div className="pwa-install-steps">
              <h3>Android (Chrome):</h3>
              <ol>
                <li>Tryck på <strong>menyn</strong> <span className="icon-placeholder">⋮</span> i övre högra hörnet</li>
                <li>Välj <strong>"Lägg till på startsidan"</strong> eller <strong>"Installera app"</strong></li>
                <li>Bekräfta genom att trycka <strong>"Lägg till"</strong> eller <strong>"Installera"</strong></li>
                <li>Appen visas nu på din startskärm</li>
              </ol>
            </div>
          ) : isDesktop && (isChrome || isEdge) ? (
            <div className="pwa-install-steps">
              <h3>Desktop (Chrome/Edge):</h3>
              <ol>
                <li>Leta efter <strong>install-ikonen</strong> <span className="icon-placeholder">⬇️</span> i adressfältet</li>
                <li>Klicka på ikonen och välj <strong>"Installera"</strong></li>
                <li>Appen öppnas i ett eget fönster</li>
                <li><strong>Tips:</strong> Denna app är optimerad för mobil - för bästa upplevelse, installera på din telefon</li>
              </ol>
            </div>
          ) : isDesktop && isFirefox ? (
            <div className="pwa-install-steps">
              <h3>Desktop (Firefox):</h3>
              <ol>
                <li>Klicka på <strong>"+"</strong>-ikonen i adressfältet</li>
                <li>Välj <strong>"Lägg till på startsidan"</strong></li>
                <li><strong>Tips:</strong> Denna app är optimerad för mobil - för bästa upplevelse, installera på din telefon</li>
              </ol>
            </div>
          ) : (
            <div className="pwa-install-steps">
              <h3>Allmänna instruktioner:</h3>
              <ol>
                <li>Leta efter <strong>"Installera app"</strong> eller <strong>"Lägg till på hemskärmen"</strong> i din webbläsares meny</li>
                <li>Följ instruktionerna som visas</li>
                <li>Appen kommer att fungera offline efter installation</li>
              </ol>
            </div>
          )}

          <div className="pwa-install-benefits">
            <h3>Fördelar:</h3>
            <ul>
              <li>✓ Snabbare åtkomst direkt från hemskärmen</li>
              <li>✓ Fungerar offline</li>
              <li>✓ Uppdateras automatiskt</li>
              <li>✓ Ingen app store behövs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

