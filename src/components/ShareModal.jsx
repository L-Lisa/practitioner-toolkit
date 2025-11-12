import React, { useState } from 'react';
import './ShareModal.css';
import { useModal } from '../hooks/useModal';

/**
 * ShareModal Component
 * Provides enhanced sharing options:
 * - Native Web Share API
 * - Copy link
 * - "Dela med en kollega" with pre-filled message
 */
export default function ShareModal({ exercise, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [shareMethod, setShareMethod] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useModal(isOpen, onClose);

  const exerciseUrl = `${window.location.origin}${window.location.pathname}#exercise-${exercise.id}`;
  const shareTitle = exercise.title;
  const shareText = exercise.oneLiner || `Kolla in denna mindfulnessövning: ${exercise.title}`;
  
  // Pre-filled message for "Dela med en kollega"
  const colleagueMessage = `Hej! 👋

Jag tänkte dela denna mindfulnessövning med dig som kan vara användbar i vårt arbete:

"${shareTitle}"
${shareText}

${exerciseUrl}

Hoppas den kan vara till nytta! 🙏`;


  const handleNativeShare = async () => {
    if (navigator.share) {
      setIsLoading(true);
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: exerciseUrl,
        });
        setShareMethod('native');
        setTimeout(() => {
          onClose();
          setShareMethod(null);
          setIsLoading(false);
        }, 500);
      } catch (err) {
        setIsLoading(false);
        // User cancelled or error
        if (err.name !== 'AbortError') {
          console.error('Share error:', err);
        }
      }
    }
  };

  const handleCopyLink = async () => {
    setIsLoading(true);
    try {
      await navigator.clipboard.writeText(exerciseUrl);
      setCopied(true);
      setShareMethod('copy');
      setIsLoading(false);
      setTimeout(() => {
        setCopied(false);
        onClose();
        setShareMethod(null);
      }, 1500);
    } catch (err) {
      console.error('Copy error:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = exerciseUrl;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopied(true);
        setShareMethod('copy');
        setIsLoading(false);
        setTimeout(() => {
          setCopied(false);
          onClose();
          setShareMethod(null);
        }, 1500);
      } catch (e) {
        console.error('Fallback copy failed:', e);
        setIsLoading(false);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleShareWithColleague = async () => {
    const message = colleagueMessage;
    setIsLoading(true);
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Dela: ${shareTitle}`,
          text: message,
        });
        setShareMethod('colleague');
        setIsLoading(false);
        setTimeout(() => {
          onClose();
          setShareMethod(null);
        }, 500);
      } catch (err) {
        setIsLoading(false);
        if (err.name !== 'AbortError') {
          // Fallback: copy message to clipboard
          setIsLoading(true);
          try {
            await navigator.clipboard.writeText(message);
            setCopied(true);
            setShareMethod('colleague-copy');
            setIsLoading(false);
            setTimeout(() => {
              setCopied(false);
              onClose();
              setShareMethod(null);
            }, 2000);
          } catch (copyErr) {
            console.error('Copy error:', copyErr);
            setIsLoading(false);
          }
        }
      }
    } else {
      // Fallback: copy message to clipboard
      try {
        await navigator.clipboard.writeText(message);
        setCopied(true);
        setShareMethod('colleague-copy');
        setIsLoading(false);
        setTimeout(() => {
          setCopied(false);
          onClose();
          setShareMethod(null);
        }, 2000);
      } catch (err) {
        console.error('Copy error:', err);
        setIsLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  const hasNativeShare = navigator.share;

  return (
    <div 
      className="share-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
      aria-describedby="share-modal-description"
    >
      <div className="share-modal" ref={modalRef}>
        <div className="share-modal-header">
          <h2 id="share-modal-title">Dela övning</h2>
          <button
            className="share-modal-close"
            onClick={onClose}
            aria-label="Stäng delningsdialog"
          >
            ✕
          </button>
        </div>

        <div className="share-modal-content">
          <div className="share-exercise-preview" id="share-modal-description">
            <h3>{exercise.title}</h3>
            <p className="share-exercise-meta">
              <span>⏱️ {exercise.duration}</span>
              <span>{exercise.competency}</span>
            </p>
            <p className="share-exercise-description">{exercise.oneLiner}</p>
          </div>

          <div className="share-options" role="group" aria-label="Delningsalternativ">
            {hasNativeShare && (
              <button
                className="share-option share-option-primary"
                onClick={handleNativeShare}
                aria-label="Dela via systemfunktioner"
                disabled={isLoading}
              >
                <span className="share-option-icon" aria-hidden="true">📤</span>
                <div className="share-option-content">
                  <strong>Dela via...</strong>
                  <span>{isLoading ? 'Bearbetar...' : 'Använd din appar eller meddelanden'}</span>
                </div>
              </button>
            )}

            <button
              className="share-option"
              onClick={handleShareWithColleague}
              aria-label="Dela med en kollega med förifyllt meddelande"
              disabled={isLoading}
            >
              <span className="share-option-icon" aria-hidden="true">👥</span>
              <div className="share-option-content">
                <strong>Dela med en kollega</strong>
                <span>{isLoading ? 'Bearbetar...' : 'Med förifyllt meddelande'}</span>
              </div>
            </button>

            <button
              className="share-option"
              onClick={handleCopyLink}
              aria-label={copied ? 'Länk kopierad' : 'Kopiera länk till urklipp'}
              aria-live="polite"
              disabled={isLoading}
            >
              <span className="share-option-icon" aria-hidden="true">🔗</span>
              <div className="share-option-content">
                <strong>Kopiera länk</strong>
                <span>{isLoading ? 'Kopierar...' : copied ? 'Kopierad!' : 'Kopiera till urklipp'}</span>
              </div>
            </button>
          </div>

          {shareMethod === 'copy' && (
            <div className="share-success">
              ✓ Länk kopierad till urklipp!
            </div>
          )}

          {shareMethod === 'colleague-copy' && (
            <div className="share-success">
              ✓ Meddelande kopierat! Klistra in det i ditt meddelandeprogram.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

