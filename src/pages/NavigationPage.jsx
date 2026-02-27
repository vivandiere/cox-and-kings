import React, { useState } from 'react';
import { palette, brandDecorativeDeep } from '../tokens/index.js';
import { FONT_HEADING, FONT_BODY, FONT_MONO, TS } from '../tokens/index.js';
import { ChevronLeft, ChevronRight, X, Menu, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const WARM_ACCENT = brandDecorativeDeep.warmSandDeep.hex; // #C4897A

const PRIMARY_NAV = [
  { label: 'Destinations', hasArrow: true },
  { label: 'Small group tours', hasArrow: false },
  { label: 'Tailor-made journeys', hasArrow: false },
];

const POPULAR = ['India', 'Peru', 'Uzbekistan'];

const SECONDARY_NAV = [
  { label: 'Holiday Types', hasArrow: true },
  { label: 'Solo Travel' },
  { label: 'Specialist-led Tours' },
  { label: 'Offers' },
  { label: 'About Us' },
  { label: 'Inspiration' },
  { label: 'Brochure' },
  { label: 'Contact Us' },
];

const DESTINATIONS_LIST = [
  'Africa', 'Central America', 'Central Asia', 'Europe', 'Far East',
  'Indian Ocean', 'Indian Subcontinent', 'North Africa & Middle East',
  'North America', 'Polar', 'South America',
];

const FEATURED_DESTINATIONS = [
  { label: 'Indian Subcontinent', img: '/images/dest-india-subcontinent.png' },
  { label: 'South America', img: '/images/dest-south-america.png' },
];

// ── Shared frames ────────────────────────────────────────────────────────────

function MobileFrame({ children, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
      <span style={{ fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '400', color: palette.neutral[400], textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {label}
      </span>
      <div style={{
        width: '375px', height: '640px',
        border: `1px solid ${palette.neutral[200]}`,
        borderRadius: '16px', overflow: 'hidden', backgroundColor: '#FFFFFF',
        boxShadow: '0 4px 24px rgba(16,32,55,0.06)', position: 'relative',
      }}>
        {children}
      </div>
    </div>
  );
}

function DesktopFrame({ children, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', width: '100%' }}>
      <span style={{ fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '400', color: palette.neutral[400], textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {label}
      </span>
      <div style={{
        width: '100%', height: '640px',
        border: `1px solid ${palette.neutral[200]}`,
        borderRadius: '8px', backgroundColor: '#FFFFFF',
        boxShadow: '0 4px 24px rgba(16,32,55,0.06)', position: 'relative', overflow: 'hidden',
      }}>
        {children}
      </div>
    </div>
  );
}

// ── Shared nav top bar ───────────────────────────────────────────────────────

function NavTopBar({ isOpen, onToggle, transparent = false }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      backgroundColor: transparent ? 'transparent' : palette.primary.default,
      padding: '0 16px', height: '48px',
      position: 'relative', zIndex: 30,
    }}>
      <button onClick={onToggle} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        color: palette.surface.stone, padding: '4px', marginRight: '12px',
        display: 'flex', alignItems: 'center', flexShrink: 0,
      }}>
        {isOpen
          ? <X size={18} strokeWidth={1.5} />
          : <Menu size={18} strokeWidth={1.5} />
        }
      </button>
      <div style={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {PRIMARY_NAV.map(item => (
          <span key={item.label} style={{
            fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '500',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            color: palette.surface.stone, whiteSpace: 'nowrap',
            padding: '0 12px', opacity: 0.9,
          }}>{item.label}</span>
        ))}
      </div>
    </div>
  );
}

// ── Shared drawer content ────────────────────────────────────────────────────

function DrawerContent({ paddingLeft = '24px', headingSize = '28px', activeSection, onSectionClick }) {
  return (
    <div style={{ padding: `28px ${paddingLeft === '24px' ? '24px' : paddingLeft} 28px 24px` }}>
      {PRIMARY_NAV.map(item => (
        <div
          key={item.label}
          onClick={() => onSectionClick && onSectionClick(item.label)}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '6px', paddingBottom: '6px', cursor: 'pointer',
            borderLeft: activeSection === item.label
              ? `2px solid ${palette.primary.default}`
              : '2px solid transparent',
            paddingLeft: '10px',
          }}
        >
          <span style={{
            fontFamily: FONT_HEADING, fontSize: headingSize, fontWeight: '300',
            color: palette.primary.default, lineHeight: 1.15,
          }}>
            {item.label}
          </span>
          {item.hasArrow && (
            <ChevronRight size={headingSize === '28px' ? 18 : 22} strokeWidth={1} color={palette.neutral[400]} />
          )}
        </div>
      ))}

      <div style={{ height: '1px', backgroundColor: palette.neutral[200], margin: '20px 0 20px 12px' }} />

      <div style={{ paddingLeft: '12px' }}>
        <p style={{
          fontFamily: FONT_MONO, fontSize: '10px', color: WARM_ACCENT,
          letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px',
        }}>Popular</p>
        {POPULAR.map(dest => (
          <p key={dest} style={{
            fontFamily: FONT_MONO, fontSize: '13px', color: palette.primary.default,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            marginBottom: '14px', cursor: 'pointer',
          }}>{dest}</p>
        ))}

        <div style={{ height: '1px', backgroundColor: palette.neutral[200], margin: '20px 0' }} />

        {SECONDARY_NAV.map(item => (
          <div key={item.label} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: '15px', cursor: 'pointer',
          }}>
            <span style={{
              fontFamily: FONT_MONO, fontSize: '12px', color: palette.primary.default,
              letterSpacing: '0.08em', textTransform: 'uppercase',
            }}>{item.label}</span>
            {item.hasArrow && <ChevronRight size={13} strokeWidth={1.5} color={palette.neutral[400]} />}
          </div>
        ))}

        <div style={{ height: '1px', backgroundColor: palette.neutral[200], margin: '20px 0' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Phone size={13} strokeWidth={1.5} color={palette.neutral[500]} />
          <span style={{
            fontFamily: FONT_MONO, fontSize: '12px', color: palette.neutral[500], letterSpacing: '0.04em',
          }}>020 3993 3757</span>
        </div>
      </div>
    </div>
  );
}

// ── Pattern A — Mobile ───────────────────────────────────────────────────────

function PatternA_Mobile() {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <img src="/images/hero-01.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(16,32,55,0.4)' }} />
      <div style={{ position: 'relative', zIndex: 30 }}>
        <NavTopBar isOpen={open} onToggle={() => setOpen(!open)} />
      </div>
      {open && (
        <div style={{
          position: 'absolute', top: '48px', left: 0, right: 0, bottom: 0,
          backgroundColor: '#FFFFFF', overflowY: 'auto', zIndex: 20, scrollbarWidth: 'none',
        }}>
          <DrawerContent activeSection={null} />
        </div>
      )}
      {!open && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          textAlign: 'center', pointerEvents: 'none',
        }}>
          <p style={{ fontFamily: FONT_HEADING, fontSize: TS.lg, fontWeight: '300', color: '#FFFFFF', lineHeight: 1.3 }}>
            Journeys by<br />people who work<br />as experts.
          </p>
        </div>
      )}
    </div>
  );
}

// ── Pattern A — Desktop ──────────────────────────────────────────────────────

function PatternA_Desktop() {
  const [open, setOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('Destinations');
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <img src="/images/hero-01.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(16,32,55,0.4)' }} />
      <div style={{ position: 'relative', zIndex: 30 }}>
        <NavTopBar isOpen={open} onToggle={() => setOpen(!open)} />
      </div>
      {open && (
        <div style={{
          position: 'absolute', top: '48px', left: 0, right: 0, bottom: 0,
          display: 'flex', zIndex: 20,
        }}>
          {/* Left column */}
          <div style={{
            width: '420px', flexShrink: 0,
            backgroundColor: '#FFFFFF', overflowY: 'auto', scrollbarWidth: 'none',
          }}>
            <DrawerContent
              headingSize="32px"
              activeSection={activeSection}
              onSectionClick={setActiveSection}
            />
          </div>

          {/* Right column — destinations panel */}
          {activeSection === 'Destinations' && (
            <div style={{
              flex: 1, backgroundColor: palette.surface.stone,
              overflowY: 'auto', scrollbarWidth: 'none', padding: '28px 28px',
            }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                {FEATURED_DESTINATIONS.map(dest => (
                  <div key={dest.label} style={{ flex: 1, position: 'relative', height: '130px', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }}>
                    <img src={dest.img} alt={dest.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(16,32,55,0.28)' }} />
                    <span style={{
                      position: 'absolute', bottom: '10px', left: 0, right: 0,
                      textAlign: 'center', fontFamily: FONT_MONO, fontSize: '10px',
                      color: '#FFFFFF', letterSpacing: '0.1em', textTransform: 'uppercase',
                    }}>{dest.label}</span>
                  </div>
                ))}
              </div>
              <div style={{
                backgroundColor: palette.primary.default, padding: '13px 16px',
                cursor: 'pointer', marginBottom: '4px',
              }}>
                <span style={{
                  fontFamily: FONT_MONO, fontSize: '11px', color: palette.surface.stone,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>All Destinations</span>
              </div>
              {DESTINATIONS_LIST.map(dest => (
                <div key={dest} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 8px', borderBottom: `1px solid ${palette.neutral[200]}`, cursor: 'pointer',
                }}>
                  <span style={{
                    fontFamily: FONT_MONO, fontSize: '11px', color: palette.primary.default,
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                  }}>{dest}</span>
                  <ChevronRight size={13} strokeWidth={1.5} color={palette.neutral[400]} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {!open && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          textAlign: 'center', pointerEvents: 'none',
        }}>
          <p style={{ fontFamily: FONT_HEADING, fontSize: TS['2xl'], fontWeight: '300', color: '#FFFFFF', lineHeight: 1.3 }}>
            Journeys by people<br />who work as experts.
          </p>
        </div>
      )}
    </div>
  );
}

// ── Pattern B — Detached popup (Mobile) ─────────────────────────────────────

function PatternB_Mobile() {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <img src="/images/hero-01.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(16,32,55,0.4)' }} />

      {/* Transparent nav bar over hero */}
      <div style={{ position: 'relative', zIndex: 30 }}>
        <NavTopBar isOpen={open} onToggle={() => setOpen(!open)} transparent />
      </div>

      {!open && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          textAlign: 'center', pointerEvents: 'none',
        }}>
          <p style={{ fontFamily: FONT_HEADING, fontSize: TS.lg, fontWeight: '300', color: '#FFFFFF', lineHeight: 1.3 }}>
            Journeys by<br />people who work<br />as experts.
          </p>
        </div>
      )}

      {/* Detached floating popup */}
      {open && (
        <div style={{
          position: 'absolute', top: '56px', left: '12px', right: '12px', bottom: '12px',
          backgroundColor: '#FFFFFF', borderRadius: '12px',
          boxShadow: '0 16px 48px rgba(16,32,55,0.28)',
          overflowY: 'auto', zIndex: 20, scrollbarWidth: 'none',
        }}>
          <DrawerContent activeSection={null} />
        </div>
      )}
    </div>
  );
}

// ── Pattern B — Detached popup (Desktop) ────────────────────────────────────

function PatternB_Desktop() {
  const [open, setOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('Destinations');
  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <img src="/images/hero-01.png" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(16,32,55,0.4)' }} />

      <div style={{ position: 'relative', zIndex: 30 }}>
        <NavTopBar isOpen={open} onToggle={() => setOpen(!open)} transparent />
      </div>

      {!open && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          textAlign: 'center', pointerEvents: 'none',
        }}>
          <p style={{ fontFamily: FONT_HEADING, fontSize: TS['2xl'], fontWeight: '300', color: '#FFFFFF', lineHeight: 1.3 }}>
            Journeys by people<br />who work as experts.
          </p>
        </div>
      )}

      {open && (
        <div style={{
          position: 'absolute', top: '56px', left: '16px', right: '16px', bottom: '16px',
          display: 'flex', zIndex: 20,
          boxShadow: '0 20px 60px rgba(16,32,55,0.32)',
          borderRadius: '12px', overflow: 'hidden',
        }}>
          {/* Left column */}
          <div style={{
            width: '380px', flexShrink: 0,
            backgroundColor: '#FFFFFF', overflowY: 'auto', scrollbarWidth: 'none',
          }}>
            <DrawerContent
              headingSize="30px"
              activeSection={activeSection}
              onSectionClick={setActiveSection}
            />
          </div>

          {/* Right column */}
          {activeSection === 'Destinations' && (
            <div style={{
              flex: 1, backgroundColor: palette.surface.stone,
              overflowY: 'auto', scrollbarWidth: 'none', padding: '28px',
            }}>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                {FEATURED_DESTINATIONS.map(dest => (
                  <div key={dest.label} style={{ flex: 1, position: 'relative', height: '120px', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }}>
                    <img src={dest.img} alt={dest.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(16,32,55,0.28)' }} />
                    <span style={{
                      position: 'absolute', bottom: '10px', left: 0, right: 0,
                      textAlign: 'center', fontFamily: FONT_MONO, fontSize: '10px',
                      color: '#FFFFFF', letterSpacing: '0.1em', textTransform: 'uppercase',
                    }}>{dest.label}</span>
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor: palette.primary.default, padding: '13px 16px', cursor: 'pointer', marginBottom: '4px' }}>
                <span style={{ fontFamily: FONT_MONO, fontSize: '11px', color: palette.surface.stone, letterSpacing: '0.1em', textTransform: 'uppercase' }}>All Destinations</span>
              </div>
              {DESTINATIONS_LIST.map(dest => (
                <div key={dest} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 8px', borderBottom: `1px solid ${palette.neutral[200]}`, cursor: 'pointer',
                }}>
                  <span style={{ fontFamily: FONT_MONO, fontSize: '11px', color: palette.primary.default, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{dest}</span>
                  <ChevronRight size={13} strokeWidth={1.5} color={palette.neutral[400]} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NavigationPage() {
  const [viewMode, setViewMode] = useState('mobile');
  const [pattern, setPattern] = useState('A');

  const toggleBtn = (active) => ({
    border: `1px solid ${active ? palette.primary.default : palette.neutral[200]}`,
    backgroundColor: active ? palette.primary.default : 'transparent',
    color: active ? '#FFFFFF' : palette.neutral[500],
    fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '500',
    letterSpacing: '0.04em', padding: '6px 16px',
    borderRadius: '4px', cursor: 'pointer', transition: 'all 0.15s ease',
  });

  const divider = <div style={{ width: '1px', height: '20px', backgroundColor: palette.neutral[200] }} />;

  const sectionLabel = {
    fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '300',
    color: palette.neutral[400], textTransform: 'uppercase', letterSpacing: '0.08em',
    marginBottom: '12px',
  };

  const sectionTitle = {
    fontFamily: FONT_HEADING, fontSize: TS.bodyLg, fontWeight: '500',
    color: palette.primary.default, marginBottom: '6px',
  };

  const sectionDesc = {
    fontFamily: FONT_BODY, fontSize: '14px', fontWeight: '300',
    color: palette.neutral[500], lineHeight: '1.6', marginBottom: '28px', maxWidth: '640px',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: palette.surface.stone }}>

      {/* Sticky toolbar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 20,
        backgroundColor: palette.surface.stone,
        borderBottom: `1px solid ${palette.neutral[200]}`,
        padding: '12px 56px',
        display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '300', color: palette.neutral[400], textTransform: 'uppercase', letterSpacing: '0.08em' }}>View</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button onClick={() => setViewMode('mobile')} style={toggleBtn(viewMode === 'mobile')}>Mobile</button>
            <button onClick={() => setViewMode('desktop')} style={toggleBtn(viewMode === 'desktop')}>Desktop</button>
          </div>
        </div>
        {divider}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '300', color: palette.neutral[400], textTransform: 'uppercase', letterSpacing: '0.08em' }}>Pattern</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button onClick={() => setPattern('A')} style={toggleBtn(pattern === 'A')}>A</button>
            <button onClick={() => setPattern('B')} style={toggleBtn(pattern === 'B')}>B</button>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div style={{ padding: '48px 56px' }}>
        <div style={{ marginBottom: '48px' }}>
          <Link to="/foundations" style={{
            fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '400',
            color: palette.neutral[400], textDecoration: 'none', letterSpacing: '0.04em',
            display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px',
          }}>
            <ChevronLeft size={14} strokeWidth={1.5} /> Back to Foundations
          </Link>
          <h1 style={{ fontFamily: FONT_HEADING, fontSize: TS['2xl'], fontWeight: '300', color: palette.primary.default, marginBottom: '8px' }}>
            Navigation Exploration
          </h1>
          <p style={{ fontFamily: FONT_BODY, fontSize: '15px', fontWeight: '300', color: palette.neutral[500], lineHeight: '1.6', maxWidth: '640px' }}>
            Two navigation patterns shown in context over a hero section.
            Toggle the pattern and viewport above to compare approaches.
          </p>
        </div>

        {/* Pattern A */}
        {pattern === 'A' && (
          <div>
            <p style={sectionLabel}>Pattern A</p>
            <h2 style={sectionTitle}>Current Site — Rebrand</h2>
            <p style={sectionDesc}>
              Replicates the existing Cox & Kings navigation structure with new design tokens.
              Full-width drawer slides over the hero. Desktop splits into a left nav column
              and a right destinations panel.
            </p>
            {viewMode === 'mobile'
              ? <MobileFrame label="Mobile — 375px"><PatternA_Mobile /></MobileFrame>
              : <DesktopFrame label="Desktop"><PatternA_Desktop /></DesktopFrame>
            }
          </div>
        )}

        {/* Pattern B */}
        {pattern === 'B' && (
          <div>
            <p style={sectionLabel}>Pattern B</p>
            <h2 style={sectionTitle}>Detached Popup</h2>
            <p style={sectionDesc}>
              The nav bar sits transparently over the hero. Triggering the menu reveals a
              detached floating panel inset from all edges — keeping the hero visible around
              it and giving a more layered, editorial feel.
            </p>
            {viewMode === 'mobile'
              ? <MobileFrame label="Mobile — 375px"><PatternB_Mobile /></MobileFrame>
              : <DesktopFrame label="Desktop"><PatternB_Desktop /></DesktopFrame>
            }
          </div>
        )}
      </div>
    </div>
  );
}
