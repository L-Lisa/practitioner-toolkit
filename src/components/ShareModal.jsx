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
        }, 500);
      } catch (err) {
        // User cancelled or error
        if (err.name !== 'AbortError') {
          console.error('Share error:', err);
        }
      }
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(exerciseUrl);
      setCopied(true);
      setShareMethod('copy');
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
        setTimeout(() => {
          setCopied(false);
          onClose();
          setShareMethod(null);
        }, 1500);
      } catch (e) {
        console.error('Fallback copy failed:', e);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleShareWithColleague = async () => {
    const message = colleagueMessage;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Dela: ${shareTitle}`,
          text: message,
        });
        setShareMethod('colleague');
        setTimeout(() => {
          onClose();
          setShareMethod(null);
        }, 500);
      } catch (err) {
        if (err.name !== 'AbortError') {
          // Fallback: copy message to clipboard
          try {
            await navigator.clipboard.writeText(message);
            setCopied(true);
            setShareMethod('colleague-copy');
            setTimeout(() => {
              setCopied(false);
              onClose();
              setShareMethod(null);
            }, 2000);
          } catch (copyErr) {
            console.error('Copy error:', copyErr);
          }
        }
      }
    } else {
      // Fallback: copy message to clipboard
      try {
        await navigator.clipboard.writeText(message);
        setCopied(true);
        setShareMethod('colleague-copy');
        setTimeout(() => {
          setCopied(false);
          onClose();
          setShareMethod(null);
        }, 2000);
      } catch (err) {
        console.error('Copy error:', err);
      }
    }
  };

  if (!isOpen) return null;

  const hasNativeShare = navigator.share;

  return (
    <div className="share-modal-overlay">
      <div className="share-modal" ref={modalRef}>
        <div className="share-modal-header">
          <h2>Dela övning</h2>
          <button
            className="share-modal-close"
            onClick={onClose}
            aria-label="Stäng"
          >
            ✕
          </button>
        </div>

        <div className="share-modal-content">
          <div className="share-exercise-preview">
            <h3>{exercise.title}</h3>
            <p className="share-exercise-meta">
              <span>⏱️ {exercise.duration}</span>
              <span>{exercise.competency}</span>
            </p>
            <p className="share-exercise-description">{exercise.oneLiner}</p>
          </div>

          <div className="share-options">
            {hasNativeShare && (
              <button
                className="share-option share-option-primary"
                onClick={handleNativeShare}
              >
                <span className="share-option-icon">📤</span>
                <div className="share-option-content">
                  <strong>Dela via...</strong>
                  <span>Använd din appar eller meddelanden</span>
                </div>
              </button>
            )}

            <button
              className="share-option"
              onClick={handleShareWithColleague}
            >
              <span className="share-option-icon">👥</span>
              <div className="share-option-content">
                <strong>Dela med en kollega</strong>
                <span>Med förifyllt meddelande</span>
              </div>
            </button>

            <button
              className="share-option"
              onClick={handleCopyLink}
            >
              <span className="share-option-icon">🔗</span>
              <div className="share-option-content">
                <strong>Kopiera länk</strong>
                <span>{copied ? 'Kopierad!' : 'Kopiera till urklipp'}</span>
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

