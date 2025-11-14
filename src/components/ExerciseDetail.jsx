import React, { useState, useEffect, useRef } from 'react';
import './ExerciseDetail.css';
import ShareIcon from './ShareIcon';
import DesktopInstallBanner from './DesktopInstallBanner';
import BrandLink from './BrandLink';
import ShareModal from './ShareModal';
import ResearchIcon from './ResearchIcon';
import ExpandIcon from './ExpandIcon';
import ExerciseMeta from './ExerciseMeta';
import CollapsibleSection from './CollapsibleSection';
import TargetIcon from './TargetIcon';
import PurposeIcon from './PurposeIcon';
import NotesIcon from './NotesIcon';
import ScriptIcon from './ScriptIcon';
import InsightIcon from './InsightIcon';
import ClockIcon from './ClockIcon';
import PauseIcon from './PauseIcon';
import ClipboardIcon from './ClipboardIcon';
import BookIcon from './BookIcon';
import PlusIcon from './PlusIcon';
import MinusIcon from './MinusIcon';
import { updateMetaTags, resetMetaTags } from '../utils/metaTags';

/**
 * ExerciseDetail Component
 * Full exercise view with Script Mode toggle, Quick Reference Bar, Duration Adjustment, and Sharing
 * Mobile-first design optimized for phone in lap or quick glance
 */

const ExerciseDetail = ({ exercise, onBack }) => {
  // Initialize all toggle states to false (closed) - no localStorage loading
  const [researchExpanded, setResearchExpanded] = useState(false);
  const [facilitationExpanded, setFacilitationExpanded] = useState(false);
  const [scriptExpanded, setScriptExpanded] = useState(false);
  const [whenToUseExpanded, setWhenToUseExpanded] = useState(false);
  const [whyUseExpanded, setWhyUseExpanded] = useState(false);
  const [scriptMode, setScriptMode] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(exercise.duration);
  const [showQuickRef, setShowQuickRef] = useState(false);
  const [allExpanded, setAllExpanded] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const quickRefBarRef = useRef(null);
  const contentRef = useRef(null);
  const scriptSectionRef = useRef(null);

  // Parse duration options if exercise has variable durations
  const durationOptions = parseDurationOptions(exercise.duration);
  const hasVariableDuration = durationOptions.length > 1;

  // Update meta tags when exercise is viewed
  useEffect(() => {
    updateMetaTags(exercise);
    
    // Cleanup: reset meta tags when component unmounts or exercise changes
    return () => {
      resetMetaTags();
    };
  }, [exercise]);

  // Reset all toggle states when exercise changes
  useEffect(() => {
    setResearchExpanded(false);
    setFacilitationExpanded(false);
    setScriptExpanded(false);
    setWhenToUseExpanded(false);
    setWhyUseExpanded(false);
    setScriptMode(false);
    setSelectedDuration(exercise.duration);
    setShowQuickRef(false);
    setAllExpanded(false);
    setShareModalOpen(false);
  }, [exercise.id, exercise.duration]);

  // Auto-expand script when entering script mode
  useEffect(() => {
    if (scriptMode) {
      setScriptExpanded(true);
    }
  }, [scriptMode]);

  // Show quick reference bar when scrolling in script mode
  useEffect(() => {
    if (!scriptMode) {
      setShowQuickRef(false);
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setShowQuickRef(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scriptMode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      // Check for modifier keys (don't override browser shortcuts)
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      switch (e.key.toLowerCase()) {
        case 's':
          e.preventDefault();
          setScriptMode(prev => !prev);
          break;
        case 'r':
          if (!scriptMode) {
            e.preventDefault();
            setResearchExpanded(prev => !prev);
          }
          break;
        case 'f':
          if (!scriptMode) {
            e.preventDefault();
            setFacilitationExpanded(prev => !prev);
          }
          break;
        case 'k':
          if (!scriptMode) {
            e.preventDefault();
            setScriptExpanded(prev => {
              const newState = !prev;
              if (newState && scriptSectionRef.current) {
                setTimeout(() => {
                  scriptSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }
              return newState;
            });
          }
          break;
        case 'e':
          if (!scriptMode) {
            e.preventDefault();
            setAllExpanded(prev => {
              const newState = !prev;
              setResearchExpanded(newState);
              setFacilitationExpanded(newState);
              setScriptExpanded(newState);
              setWhenToUseExpanded(newState);
              return newState;
            });
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scriptMode]);

  // Update allExpanded state when individual sections change
  useEffect(() => {
    if (!scriptMode) {
      const allCurrentlyExpanded = researchExpanded && facilitationExpanded && scriptExpanded && whenToUseExpanded;
      setAllExpanded(allCurrentlyExpanded);
    }
  }, [scriptMode, researchExpanded, facilitationExpanded, scriptExpanded, whenToUseExpanded]);

  // Handle sharing - open modal
  const handleShare = () => {
    setShareModalOpen(true);
  };

  // Parse instructions into script phrases, timing cues, and practitioner notes
  const parseInstructions = (instructions) => {
    const lines = instructions.split('\n').filter(line => line.trim());
    return lines.map(line => {
      const trimmed = line.trim();
      
      // Detect timing cues (contains pause, vänta, andas, etc.)
      const timingPattern = /(paus|vänta|andas|innehåll|stanna|ta.*tid)/i;
      const isTimingCue = timingPattern.test(trimmed);
      
      // Detect practitioner notes (bullet points, setup instructions)
      const isPractitionerNote = trimmed.startsWith('•') || 
                                 trimmed.startsWith('-') ||
                                 trimmed.match(/^(STEG|HUVUD|HALS|BRÖST|MAGE|HÄNDER|NAMNGE|NÄR|VAR|VARNING)/i);
      
      return {
        text: trimmed,
        type: isTimingCue ? 'timing' : isPractitionerNote ? 'note' : 'script',
        hasBreathing: /andas/i.test(trimmed)
      };
    });
  };

  const parsedInstructions = parseInstructions(exercise.instructions);

  // Extract URL from research source text if present
  const extractResearchUrl = (sourceText) => {
    if (!sourceText) return null;
    // Match URLs in text (http://, https://, or www.)
    const urlPattern = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
    const match = sourceText.match(urlPattern);
    return match ? match[0] : null;
  };

  const researchUrl = extractResearchUrl(exercise.research?.source);
  const researchSourceText = exercise.research?.source?.replace(/(https?:\/\/[^\s]+|www\.[^\s]+)/gi, '').trim() || exercise.research?.source;

  return (
    <main className={`exercise-detail ${showQuickRef && scriptMode ? 'has-quick-ref' : ''}`} ref={contentRef} role="main" aria-label={`Detaljer för ${exercise.title}`}>
      <DesktopInstallBanner />
      {/* Skip to content link */}
      <a href="#exercise-content" className="skip-link">
        Hoppa till övningsinnehåll
      </a>
      {/* Quick Reference Bar (sticky, shows in script mode when scrolling) */}
      {showQuickRef && scriptMode && (
        <div className="quick-ref-bar" ref={quickRefBarRef} role="banner" aria-label="Snabbmeny">
          <button className="quick-ref-back" onClick={onBack} aria-label="Tillbaka till övningslista">
          </button>
          <div className="quick-ref-title">{exercise.title}</div>
          <div className="quick-ref-duration">
            <ClockIcon size={16} />
            <span>{selectedDuration}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="detail-header" role="banner">
        <button className="back-button" onClick={onBack}>
          Tillbaka
        </button>
        <div className="header-actions">
          <BrandLink variant="header" />
          {hasVariableDuration && (
            <button 
              className="duration-toggle-button"
              onClick={() => {
                const currentIndex = durationOptions.findIndex(d => d === selectedDuration);
                const nextIndex = (currentIndex + 1) % durationOptions.length;
                setSelectedDuration(durationOptions[nextIndex]);
              }}
              aria-label={`Ändra varaktighet. Nuvarande: ${selectedDuration}. Klicka för att växla till ${durationOptions[(durationOptions.findIndex(d => d === selectedDuration) + 1) % durationOptions.length]}`}
            >
              <ClockIcon size={18} />
              <span>{selectedDuration}</span>
            </button>
          )}
          <button 
            className="share-button"
            onClick={handleShare}
            aria-label="Dela övning"
            title="Dela övning"
          >
            <ShareIcon />
          </button>
        </div>
      </header>

      {/* Meta Bar */}
      <ExerciseMeta 
        duration={selectedDuration} 
        competency={exercise.competency}
        className="detail-meta"
      />

      {/* Title */}
      <h1 className="detail-title">{exercise.title}</h1>

      {/* Exercise Content */}
      <div id="exercise-content">
      {/* Script Mode Toggle & Expand All Toggle */}
      <div className="mode-toggle-container" role="toolbar" aria-label="Vylägesalternativ">
        <button 
          className={`mode-toggle ${scriptMode ? 'active' : ''}`}
          onClick={() => setScriptMode(!scriptMode)}
          aria-label={scriptMode ? 'Visa detaljerad vy' : 'Visa skriptläge'}
          title="Tryck S för att växla"
        >
          <span className="mode-label">
            {scriptMode ? (
              <>
                <ClipboardIcon size={18} />
                <span> Detaljerad vy</span>
              </>
            ) : (
              <>
                <NotesIcon size={18} />
                <span> Skriptläge</span>
              </>
            )}
          </span>
        </button>
        {!scriptMode && (
          <button
            className="expand-all-toggle"
            onClick={() => {
              const newState = !allExpanded;
              setAllExpanded(newState);
              setResearchExpanded(newState);
              setFacilitationExpanded(newState);
              setScriptExpanded(newState);
              setWhenToUseExpanded(newState);
            }}
            aria-label={allExpanded ? 'Dölj alla sektioner' : 'Visa alla sektioner'}
            title="Tryck E för att växla"
          >
            <ExpandIcon isExpanded={allExpanded} />
            <span>{allExpanded ? 'Dölj alla' : 'Visa alla'}</span>
          </button>
        )}
      </div>

      {!scriptMode && <hr className="divider" />}

      {!scriptMode && (
        <>
          {/* What Section */}
          <section className="detail-section section-card">
            <h2 className="section-icon">
              <TargetIcon size={20} />
              <span> VAD ÄR DETTA?</span>
            </h2>
            <p className="section-content">{exercise.oneLiner}</p>
          </section>

          {/* Why Use - Converted to bullet points for better scannability */}
          <section className="detail-section section-card">
            <h2 className="section-icon">
              <PurposeIcon size={20} />
              <span> VARFÖR DENNA ÖVNING?</span>
            </h2>
            <div className="why-use-content">
              {formatWhyUse(exercise.whyUse, whyUseExpanded)}
              {(() => {
                const items = getWhyUseItems(exercise.whyUse);
                if (items && items.length > 3) {
                  return (
                    <button
                      className="why-use-expand-button"
                      onClick={() => setWhyUseExpanded(!whyUseExpanded)}
                      aria-label={whyUseExpanded ? 'Visa färre punkter' : 'Visa alla punkter'}
                    >
                      {whyUseExpanded ? 'Visa färre' : `Visa ${items.length - 3} fler`}
                    </button>
                  );
                }
                return null;
              })()}
            </div>
          </section>

          {/* Research Section (Collapsible) */}
          <section className="detail-section section-card">
            <CollapsibleSection
              title="FORSKNINGSBAKGRUND"
              icon={<ResearchIcon />}
              isExpanded={researchExpanded}
              onToggle={() => setResearchExpanded(!researchExpanded)}
              toggleClassName="research-toggle"
              contentClassName="research-content"
            >
              <div className="research-level">
                <ResearchIcon />
                <span>{exercise.research.summary}</span>
              </div>
              
              <h3>
                <PlusIcon size={18} />
                <span> POSITIVA FYND:</span>
              </h3>
              <ul>
                {exercise.research.findings.map((finding, index) => (
                  <li key={index}>{finding}</li>
                ))}
              </ul>

              {exercise.research.limitations && (
                <>
                  <h3>
                    <MinusIcon size={18} />
                    <span> BEGRÄNSNINGAR:</span>
                  </h3>
                  <p>{exercise.research.limitations}</p>
                </>
              )}

              <h3>
                <BookIcon size={18} />
                <span> KÄLLA:</span>
              </h3>
              <p className="research-source">
                {researchUrl ? (
                  <>
                    <a 
                      href={researchUrl.startsWith('http') ? researchUrl : `https://${researchUrl}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="research-link"
                      aria-label={`${researchSourceText} (öppnas i ny flik)`}
                    >
                      {researchSourceText}
                    </a>
                    <span className="research-url-hint" aria-hidden="true"> (klicka för att öppna länk)</span>
                  </>
                ) : (
                  researchSourceText
                )}
              </p>
            </CollapsibleSection>
          </section>

          {/* How to Facilitate Section - Collapsible */}
          <section className="detail-section section-card">
            <CollapsibleSection
              title="HUR FACILITERA?"
              icon={<NotesIcon size={20} />}
              isExpanded={facilitationExpanded}
              onToggle={() => setFacilitationExpanded(!facilitationExpanded)}
              toggleClassName="facilitation-toggle"
              contentClassName="facilitation-notes"
            >
              {getFacilitationNotes(exercise)}
            </CollapsibleSection>
          </section>
        </>
      )}

      {/* Instructions - Script Mode or Detail Mode */}
      <section 
        ref={scriptSectionRef}
        className={`instructions-section ${scriptMode ? 'script-mode' : 'detail-mode'} ${!scriptMode ? 'section-card' : ''}`}
      >
        {scriptMode ? (
          <div className="script-content">
            {/* Breathing indicator - shows when there are breathing cues */}
            {parsedInstructions.some(inst => inst.hasBreathing) && (
              <div className="breathing-indicator">
                <div className="breath-circle"></div>
              </div>
            )}
            <div className="script-text">
              {parsedInstructions.map((instruction, index) => {
                if (instruction.type === 'timing') {
                  return (
                    <div key={index} className="script-timing-cue">
                      <span className="timing-icon">
                        <PauseIcon size={20} />
                      </span>
                      <span className="timing-text">{instruction.text}</span>
                    </div>
                  );
                } else if (instruction.type === 'note') {
                  return (
                    <p key={index} className="script-practitioner-note">
                      {instruction.text}
                    </p>
                  );
                } else {
                  return (
                    <p key={index} className={`script-line ${instruction.hasBreathing ? 'has-breathing' : ''}`}>
                      {instruction.text}
                    </p>
                  );
                }
              })}
            </div>
          </div>
        ) : (
          <>
            <CollapsibleSection
              title="SKRIPT"
              icon={<ScriptIcon size={20} />}
              count={`${getScriptLineCount(parsedInstructions)} rader`}
              isExpanded={scriptExpanded}
              onToggle={() => setScriptExpanded(!scriptExpanded)}
              toggleClassName="script-toggle"
              preview={!scriptExpanded ? getScriptPreview(parsedInstructions) : null}
            >
              <div className="instructions-content">
                {parsedInstructions.map((instruction, index) => {
                  if (instruction.type === 'timing') {
                    return (
                      <p key={index} className="timing-cue">
                        <span className="timing-icon-inline">
                          <PauseIcon size={18} />
                        </span> {instruction.text}
                      </p>
                    );
                  } else if (instruction.type === 'note') {
                    return (
                      <p key={index} className="practitioner-note">
                        {instruction.text}
                      </p>
                    );
                  } else {
                    return (
                      <p key={index} className="instruction-line">
                        {instruction.text}
                      </p>
                    );
                  }
                })}
              </div>
            </CollapsibleSection>
          </>
        )}
      </section>

      {!scriptMode && (
        <section className="detail-section section-card">
          <CollapsibleSection
            title="NÄR ANVÄNDA"
            icon={<InsightIcon size={20} />}
            count={`${exercise.whenToUse.length} scenarier`}
            isExpanded={whenToUseExpanded}
            onToggle={() => setWhenToUseExpanded(!whenToUseExpanded)}
            toggleClassName="when-to-use-toggle"
            contentClassName="when-to-use-content"
          >
            <ul className="when-to-use-list">
              {exercise.whenToUse.map((scenario, index) => (
                <li key={index}>{scenario}</li>
              ))}
            </ul>
          </CollapsibleSection>
        </section>
      )}

      {/* Jump to Script Button (floating, shows when script is collapsed in detail mode) */}
      {!scriptMode && !scriptExpanded && (
        <button
          className="jump-to-script-button"
          onClick={() => {
            setScriptExpanded(true);
            setTimeout(() => {
              scriptSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
          }}
          aria-label="Visa skript"
        >
          <NotesIcon size={18} />
          <span> Visa skript</span>
        </button>
      )}

      {/* Logo Watermark - Subtle background */}
      <div className="detail-logo-watermark">
        <img
          src="/logo_transparent.webp"
          alt=""
          className="detail-watermark-logo"
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

      {/* Brand Link Footer */}
      <div className="detail-brand-footer">
        <BrandLink variant="footer" />
      </div>

      </div>
      {/* Bottom spacing */}
      <div className="detail-footer"></div>

      {/* Share Modal */}
      <ShareModal
        exercise={exercise}
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </main>
  );
};

// Helper function to parse duration options
function parseDurationOptions(duration) {
  // Handle ranges like "10-15 min" or single values like "10 min"
  if (duration.includes('-')) {
    const match = duration.match(/(\d+)\s*-\s*(\d+)\s*min/i);
    if (match) {
      const min = parseInt(match[1]);
      const max = parseInt(match[2]);
      const options = [];
      // Generate options in 5-minute increments
      for (let i = min; i <= max; i += 5) {
        options.push(`${i} min`);
      }
      return options.length > 0 ? options : [duration];
    }
  }
  // Single duration
  return [duration];
}

// Get exercise-specific facilitation notes - concise, exercise-specific, practitioner-focused
function getFacilitationNotes(exercise) {
  const notes = {
    'being-still': { // Stillhetsmeditation
      setup: "Känn in gruppens energi först. Rastlöshet eller redan närvaro - båda fungerar. Denna övning skapar utrymme för både.",
      guidance: "Om någon verkar obekväm med stillheten, det är normalt. Vi är vana vid att göra, inte bara vara. Du modellerar just nu att det är säkert att inte ha alla svar. Det är kraftfullt."
    },
    'noticing-judgments': { // Att lägga märke till bedömningar
      setup: "Påminn gruppen att vi alla bedömer - det är inte något att skämmas över. Det handlar om att lära känna mönstren så vi kan välja vårt svar.",
      guidance: "Bedömningar kan kännas jobbiga att erkänna i grupp. När du modellerar att det är okej att märka dem utan att agera, skapar du trygghet för andra att vara ärliga."
    },
    'stop-practice': { // STOP-övningen
      setup: "Nämn att de kan öva nu, men kraften kommer när de använder den i ögonblicket - när emailen kommer, när kollegan avbryter.",
      guidance: "Detta är praktiskt, inte filosofi. Om någon verkar skeptisk, det är okej - de behöver bara prova. Du vet att det fungerar, låt det ge dig trygghet."
    },
    'breathing-irritation': { // Andningsövningar för irritation
      setup: "De kan göra detta med öppna ögon, mitt i ett möte, utan att någon märker. Nämn att de kan använda den nu, här.",
      guidance: "Det handlar inte om att bli avslappnad - det handlar om att vara med vad som är där. Irritationen kan finnas kvar, och det är okej."
    },
    'body-scan-emotional': { // Kroppsskanning för emotionell medvetenhet
      setup: "Det handlar inte om att hitta rätt svar - 'är det ilska eller stress?' - utan om att bara märka vad som är där. Ibland är det lättare att utforska det man hittar genom att se det som färger eller former. Till exempel att man har en tung klump i magen.",
      guidance: "Låt varje område få sin tid. Om någon verkar obekväm med att känna känslor, påminn dem att de bara behöver märka, inte göra något åt det. Föreslå även att det kan vara en trevlig övning att låta olika förnimmelser ha olika färger eller former."
    },
    'emotion-labeling': { // Känslomärkning
      setup: "De kan göra detta flera gånger per dag, utan att någon märker. De behöver inte sitta ner eller stänga ögonen.",
      guidance: "Om någon verkar förvirrad - 'men vad gör jag sen?' - påminn dem att det är allt. Bara märka. Bara namnge. Hjärnan gör resten. Denna övning fungerar på minst två sätt. 1. Den utvecklar emotionellt medvetande 2. Den uppmuntrar till en kort paus där man slår av den mentala autopiloten."
    },
    'impermanence-reflection': { // Reflektion om förgänglighet
      setup: "Det handlar inte om att bli av med känslor eller situationer - det handlar om att förstå att de förändras.",
      guidance: "Om någon verkar motståndskraftig - 'men min situation förändras inte' - det är okej. De behöver inte tro på det. Bara observera. Förändringen händer ändå."
    },
    'building-resilience': { // Att bygga motståndskraft genom svårigheter
      setup: "Förklara forskningsgrunden: 'Studier visar att det är acceptans-träning - förmågan att välkomna in svårigheter och sedan släppa taget - som bygger resiliens. Inte avslappning. Inte enbart medvetenhet. Acceptans.' Säkerhet först: Välj 3-5/10 svårighet. Detta är kapacitetsbyggande, inte traumabearbetning.",
      guidance: "Fas 1 (Välkomna in): 'Detta är där vi tränar acceptans. Känslan kommer att vara obehaglig - det är där ni bygger kapacitet.' Fas 2 (Släppa taget): 'Lägg märke till att ni INTE försökte ändra känslan, ändå förändrades den. Detta är beviset på acceptans-mekanismen.' Efter övningen: 'Känslorna är kanske inte borta - det var inte målet. Ni bevisade att ni KAN VARA MED SVÅRIGHETER. Det är resiliens.'"
    },
    'body-scan-stress': { // Att hantera stress med kroppsskanning
      setup: "Skapa en lugn miljö. Påminn deltagarna om att kroppsskanning inte handlar om att slappna av 'på kommando', utan om att observera kroppen som den är just nu. Det är okej om de känner spänning eller rastlöshet – det är en del av övningen.",
      guidance: "Förklara att man kommer att vandra genom kroppen med uppmärksamhet. Ingen prestation, bara nyfikenhet. Om sinnet vandrar – kom tillbaka till den del av kroppen ni just fokuserade på. Låt tystnad finnas mellan instruktionerna. Det är bättre att skapa utrymme än att försöka 'fylla' upplevelsen."
    }
  };

  const note = notes[exercise.slug];
  if (!note) {
    // Fallback for exercises without specific notes
    return (
      <>
        <div className="facilitation-setup">
          <h3>Förberedelse:</h3>
          <p>Ta ett ögonblick att känna in gruppens energi innan du börjar. Det finns ingen brådska här - låt det finnas utrymme för vad som behöver hända.</p>
        </div>
        <div className="facilitation-guidance">
          <h3>Tips:</h3>
          <p>När du guidar denna, låt orden sjunka in mellan meningarna. Det finns ingen brådska. Om du märker att någon i gruppen verkar obekväm, det är okej. Vi är så vana vid att göra, att bara vara kan kännas konstigt. Låt det vara okej.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="facilitation-setup">
        <h3>Förberedelse:</h3>
        <p>{note.setup}</p>
      </div>
      <div className="facilitation-guidance">
        <h3>Tips:</h3>
        <p>{note.guidance}</p>
      </div>
    </>
  );
}

// Get preview of script (first 2-3 lines)
function getScriptPreview(parsedInstructions) {
  const scriptLines = parsedInstructions
    .filter(inst => inst.type === 'script')
    .slice(0, 2)
    .map(inst => inst.text);
  
  if (scriptLines.length === 0) return 'Klicka för att se skriptet';
  if (scriptLines.length === 1) return scriptLines[0].substring(0, 80) + '...';
  return scriptLines[0].substring(0, 60) + '...';
}

// Get count of script lines
function getScriptLineCount(parsedInstructions) {
  return parsedInstructions.filter(inst => inst.type === 'script').length;
}

// Get "Why Use" items as array
function getWhyUseItems(whyUseText) {
  if (!whyUseText) return null;
  
  // Split by sentences (periods, exclamation, question marks)
  // Keep the delimiter to preserve sentence endings
  let sentences = whyUseText.split(/([.!?]+)/).filter(s => s.trim().length > 0);
  
  // Recombine sentences with their punctuation
  const combined = [];
  for (let i = 0; i < sentences.length; i += 2) {
    const sentence = sentences[i]?.trim();
    const punctuation = sentences[i + 1] || '';
    if (sentence && sentence.length > 10) { // Lower threshold to catch shorter sentences
      combined.push(sentence + punctuation);
    }
  }
  
  // If we still only have one item, try splitting by colons or key phrases
  if (combined.length === 1) {
    const text = combined[0];
    // Split by colons (often used for lists)
    if (text.includes(':')) {
      const parts = text.split(/:\s*/);
      if (parts.length > 1) {
        const firstPart = parts[0] + ':';
        const rest = parts.slice(1).join(' ').split(/\.\s+/).filter(s => s.trim().length > 10);
        return [firstPart, ...rest.map(s => s.trim() + (s.trim().endsWith('.') ? '' : '.'))];
      }
    }
    
    // Try splitting by common Swedish connectors
    const naturalBreaks = text.split(/(?=\s*(?:Detta|Det|Vilket|Som|Därför|Men|Och|Eller)\s+)/i);
    if (naturalBreaks.length > 1 && naturalBreaks.every(b => b.trim().length > 15)) {
      return naturalBreaks.map(s => s.trim() + (s.trim().match(/[.!?]$/) ? '' : '.'));
    }
  }
  
  return combined.length > 0 ? combined : [whyUseText];
}

// Format "Why Use" text into scannable format
function formatWhyUse(whyUseText, expanded = false) {
  if (!whyUseText) return null;
  
  const items = getWhyUseItems(whyUseText);
  
  // If only 1-2 short items, return as paragraph
  if (items.length <= 2 && whyUseText.length < 200) {
    return <p className="section-content">{whyUseText}</p>;
  }
  
  // Show only first 3 items if not expanded, otherwise show all
  const displayItems = expanded ? items : items.slice(0, 3);
  
  // Convert to bullet points
  return (
    <ul className="why-use-list">
      {displayItems.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default ExerciseDetail;

