import React, { useState, useRef, useEffect } from 'react';
import { palette } from '../tokens/index.js';
import { FONT_HEADING, FONT_BODY, FONT_MONO, TS } from '../tokens/index.js';
import { ChevronDown, ChevronRight, ChevronLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const REGIONS = ['Asia', 'Europe', 'Americas', 'Africa', 'Middle East'];

const REGION_PRODUCTS = {
  'Asia': [
    { title: 'Highlights of Japan', location: 'Kyoto, Japan', days: 12, price: '£4,295', img: '/images/dest-far-east.png', stops: ['Tokyo', 'Hakone', 'Kyoto', 'Hiroshima'], level: 1 },
    { title: 'The Grand Tour of India', location: 'Agra, India', days: 17, price: '£4,095', img: '/images/hero-01.png', stops: ['Delhi', 'Agra', 'Jaipur', 'Udaipur', 'Varanasi'], level: 2, offer: 'Save £500' },
    { title: 'Kerala & the Backwaters', location: 'Kerala, India', days: 14, price: '£3,895', img: '/images/dest-india-subcontinent.png', stops: ['Cochin', 'Munnar', 'Periyar', 'Kumarakom'], level: 1 },
    { title: 'Silk Road Adventure', location: 'Samarkand, Uzbekistan', days: 15, price: '£4,195', img: '/images/dest-central-asia.png', stops: ['Tashkent', 'Samarkand', 'Bukhara', 'Khiva'], level: 2 },
  ],
  'Europe': [
    { title: 'Classical Italy', location: 'Rome, Italy', days: 14, price: '£3,895', img: '/images/dest-europe.png', stops: ['Rome', 'Florence', 'Venice', 'Amalfi'], level: 1 },
    { title: 'Iberian Discovery', location: 'Seville, Spain', days: 12, price: '£3,295', img: '/images/dest-europe.png', stops: ['Madrid', 'Seville', 'Granada', 'Barcelona'], level: 2 },
    { title: 'Greek Island Odyssey', location: 'Santorini, Greece', days: 10, price: '£3,495', img: '/images/dest-europe.png', stops: ['Athens', 'Mykonos', 'Santorini', 'Crete'], level: 1, offer: '2 for 1' },
    { title: 'Scandinavian Explorer', location: 'Bergen, Norway', days: 13, price: '£4,695', img: '/images/dest-europe.png', stops: ['Copenhagen', 'Bergen', 'Fjords', 'Stockholm'], level: 2 },
  ],
  'Americas': [
    { title: 'Patagonia Explorer', location: 'Torres del Paine, Chile', days: 16, price: '£5,495', img: '/images/dest-south-america.png', stops: ['Buenos Aires', 'El Calafate', 'Torres del Paine'], level: 3 },
    { title: 'Peru Uncovered', location: 'Cusco, Peru', days: 14, price: '£3,695', img: '/images/dest-south-america.png', stops: ['Lima', 'Cusco', 'Sacred Valley', 'Machu Picchu'], level: 2 },
    { title: 'Costa Rica & Panama', location: 'Arenal, Costa Rica', days: 12, price: '£3,195', img: '/images/dest-central-america.png', stops: ['San José', 'Arenal', 'Monteverde', 'Panama City'], level: 2 },
    { title: 'Colombia Discovery', location: 'Cartagena, Colombia', days: 11, price: '£2,995', img: '/images/dest-south-america.png', stops: ['Bogotá', 'Coffee Region', 'Cartagena', 'Medellín'], level: 1 },
  ],
  'Africa': [
    { title: 'Morocco Discovery', location: 'Marrakech, Morocco', days: 10, price: '£2,195', img: '/images/dest-north-africa-middle-east.png', stops: ['Marrakech', 'Atlas Mountains', 'Sahara', 'Fes'], level: 2 },
    { title: 'Kenya Safari', location: 'Masai Mara, Kenya', days: 12, price: '£4,795', img: '/images/dest-africa.png', stops: ['Nairobi', 'Amboseli', 'Masai Mara', 'Lake Nakuru'], level: 2, offer: 'Save £400' },
    { title: 'Tanzania & Zanzibar', location: 'Serengeti, Tanzania', days: 14, price: '£5,295', img: '/images/dest-africa.png', stops: ['Arusha', 'Serengeti', 'Ngorongoro', 'Zanzibar'], level: 2 },
    { title: 'South Africa Explorer', location: 'Cape Town, South Africa', days: 13, price: '£3,895', img: '/images/dest-africa.png', stops: ['Cape Town', 'Winelands', 'Garden Route', 'Kruger'], level: 1 },
  ],
  'Middle East': [
    { title: 'Wonders of Jordan', location: 'Petra, Jordan', days: 10, price: '£2,995', img: '/images/dest-north-africa-middle-east.png', stops: ['Amman', 'Jerash', 'Petra', 'Wadi Rum'], level: 2 },
    { title: 'Oman Explorer', location: 'Muscat, Oman', days: 11, price: '£3,395', img: '/images/dest-north-africa-middle-east.png', stops: ['Muscat', 'Nizwa', 'Wahiba Sands', 'Sur'], level: 1 },
    { title: 'Egypt & the Nile', location: 'Luxor, Egypt', days: 12, price: '£3,695', img: '/images/dest-north-africa-middle-east.png', stops: ['Cairo', 'Luxor', 'Aswan', 'Abu Simbel'], level: 1 },
    { title: 'Dubai & Abu Dhabi', location: 'Dubai, UAE', days: 8, price: '£2,495', img: '/images/dest-north-africa-middle-east.png', stops: ['Dubai', 'Abu Dhabi', 'Al Ain', 'Desert Safari'], level: 1 },
  ],
};

function MobileFrame({ children, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
      <span style={{ fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '400', color: palette.neutral[400], textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {label}
      </span>
      <div style={{
        width: '375px', minHeight: '280px', border: `1px solid ${palette.neutral[200]}`,
        borderRadius: '16px', overflow: 'hidden', backgroundColor: '#FFFFFF',
        boxShadow: '0 4px 24px rgba(16,32,55,0.06)',
      }}>
        {children}
      </div>
    </div>
  );
}

function DesktopFrame({ children, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
      <span style={{ fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '400', color: palette.neutral[400], textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {label}
      </span>
      <div style={{
        width: '100%', minHeight: '280px', border: `1px solid ${palette.neutral[200]}`,
        borderRadius: '8px', overflow: 'hidden', backgroundColor: '#FFFFFF',
        boxShadow: '0 4px 24px rgba(16,32,55,0.06)',
      }}>
        {children}
      </div>
    </div>
  );
}

function RegionPanel({ region, compact: isCompact }) {
  const products = REGION_PRODUCTS[region] || [];
  return (
    <div style={{ padding: isCompact ? '16px 12px' : '20px 24px' }}>
      <div style={{ display: 'flex', gap: isCompact ? '12px' : '20px', overflowX: 'auto', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
        {products.map((p) => (
          <div key={p.title} style={{
            minWidth: isCompact ? '220px' : '320px', maxWidth: isCompact ? '220px' : '320px',
            display: 'flex', flexDirection: 'column', flexShrink: 0,
            backgroundColor: palette.surface.stone, boxShadow: '0 2px 12px rgba(16,32,55,0.08)',
            border: `1px solid ${palette.neutral[200]}`,
            padding: '4px 4px 0',
          }}>
            <div style={{ position: 'relative', marginBottom: '-12px' }}>
              <img src={p.img} alt={p.title} style={{
                width: '100%', height: isCompact ? '120px' : '190px',
                objectFit: 'cover', display: 'block', borderRadius: '16px',
              }} />
              <div style={{
                position: 'absolute', top: '10px', left: '10px',
                display: 'flex', alignItems: 'center', gap: '5px',
              }}>
                <span style={{
                  fontFamily: FONT_BODY, fontSize: '9px', fontWeight: '500',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  backgroundColor: palette.surface.stone, color: palette.primary.default,
                  padding: '4px 8px', borderRadius: '4px',
                }}>Small Group Tour</span>
                {p.offer && (
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{
                      fontFamily: FONT_BODY, fontSize: isCompact ? '8px' : '9px', fontWeight: '600',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      backgroundColor: palette.primary.default, color: '#FFFFFF',
                      padding: isCompact ? '4px 8px 4px 8px' : '4px 10px 4px 10px',
                      borderRadius: '4px 0 0 4px',
                      lineHeight: isCompact ? '14px' : '16px',
                    }}>{p.offer}</span>
                    <svg width={isCompact ? '7' : '8'} height={isCompact ? '22' : '24'} viewBox="0 0 8 24" style={{ display: 'block' }}>
                      <polygon points="0,0 8,12 0,24" fill={palette.primary.default} />
                    </svg>
                  </span>
                )}
              </div>
              <span style={{
                position: 'absolute', bottom: '10px', right: '10px',
                fontFamily: FONT_MONO, color: 'rgb(242, 242, 235)',
                fontSize: '8px', fontWeight: '400', letterSpacing: '0.06em',
                textTransform: 'uppercase', opacity: 0.7,
              }}>{p.location}</span>
            </div>
            <div style={{ padding: isCompact ? '18px 12px 16px' : '24px 16px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h4 style={{
                fontFamily: FONT_HEADING, fontSize: isCompact ? '16px' : '20px', fontWeight: '500',
                color: palette.primary.default, marginBottom: '4px', lineHeight: 1.2,
              }}>{p.title}</h4>
              <p style={{
                fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '500',
                color: palette.primary.default, letterSpacing: '0.04em',
                textTransform: 'uppercase', marginBottom: '10px',
              }}>{p.days} Days</p>
              <p style={{
                fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '500',
                color: palette.primary.default, lineHeight: 1.5, marginBottom: '12px',
              }}>
                {p.stops.map((s, i) => (
                  <React.Fragment key={s}>{s}{i < p.stops.length - 1 && <span style={{ margin: '0 4px', color: palette.neutral[300] }}>&bull;</span>}</React.Fragment>
                ))}
              </p>
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <p style={{ fontFamily: FONT_BODY, fontSize: '15px', fontWeight: '400', color: palette.primary.default }}>
                  From {p.price}
                </p>
                <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end' }}>
                  {[6, 10, 14].map((h, i) => (
                    <div key={i} style={{
                      width: '3px', height: `${h}px`, borderRadius: '1px',
                      backgroundColor: i < p.level ? palette.primary.default : palette.neutral[200],
                    }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function PatternA() {
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);

  return (
    <>
      <div style={{ position: 'relative' }}>
        <div ref={scrollRef} style={{
          display: 'flex', overflowX: 'auto', WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory', scrollbarWidth: 'none',
          borderBottom: `1px solid ${palette.neutral[200]}`,
        }}>
          {REGIONS.map((r, i) => (
            <button key={r} onClick={() => setActive(i)} style={{
              border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', scrollSnapAlign: 'start',
              fontFamily: FONT_BODY, fontSize: '13px', fontWeight: active === i ? '500' : '400',
              letterSpacing: '0.03em', padding: '14px 20px',
              color: active === i ? palette.primary.default : palette.neutral[400],
              backgroundColor: 'transparent',
              borderBottom: active === i ? `2px solid ${palette.primary.default}` : '2px solid transparent',
              marginBottom: '-1px', transition: 'all 0.2s ease',
            }}>{r}</button>
          ))}
        </div>
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 1, width: '40px',
          background: 'linear-gradient(to right, transparent, #FFFFFF)', pointerEvents: 'none',
        }} />
      </div>
      <RegionPanel region={REGIONS[active]} compact />
    </>
  );
}


function PatternB() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div style={{ position: 'relative', borderBottom: `1px solid ${palette.neutral[200]}` }}>
        <button onClick={() => setOpen(!open)} style={{
          border: 'none', cursor: 'pointer', width: '100%', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px',
          fontFamily: FONT_BODY, fontSize: '14px', fontWeight: '500',
          color: palette.primary.default, backgroundColor: 'transparent',
          letterSpacing: '0.03em',
        }}>
          {REGIONS[active]}
          <ChevronDown size={16} strokeWidth={1.5} style={{
            transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease',
            color: palette.neutral[400],
          }} />
        </button>
        {open && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10,
            backgroundColor: '#FFFFFF', borderBottom: `1px solid ${palette.neutral[200]}`,
            boxShadow: '0 8px 24px rgba(16,32,55,0.08)',
          }}>
            {REGIONS.map((r, i) => (
              <button key={r} onClick={() => { setActive(i); setOpen(false); }} style={{
                border: 'none', cursor: 'pointer', display: 'block', width: '100%',
                textAlign: 'left', padding: '12px 20px',
                fontFamily: FONT_BODY, fontSize: '13px', fontWeight: active === i ? '500' : '400',
                color: active === i ? palette.primary.default : palette.neutral[700],
                backgroundColor: active === i ? palette.neutral[100] : 'transparent',
                letterSpacing: '0.02em', transition: 'background-color 0.15s ease',
              }}>{r}</button>
            ))}
          </div>
        )}
      </div>
      <RegionPanel region={REGIONS[active]} compact />
    </>
  );
}


function PatternC() {
  const [active, setActive] = useState(0);

  return (
    <>
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '8px', padding: '16px 20px',
        borderBottom: `1px solid ${palette.neutral[200]}`,
      }}>
        {REGIONS.map((r, i) => (
          <button key={r} onClick={() => setActive(i)} style={{
            border: active === i ? `1px solid ${palette.primary.default}` : `1px solid ${palette.neutral[200]}`,
            cursor: 'pointer', borderRadius: '24px', padding: '8px 18px',
            fontFamily: FONT_BODY, fontSize: '13px', fontWeight: '500',
            letterSpacing: '0.02em',
            color: active === i ? '#FFFFFF' : palette.primary.default,
            backgroundColor: active === i ? palette.primary.default : 'transparent',
            transition: 'all 0.2s ease',
          }}>{r}</button>
        ))}
      </div>
      <RegionPanel region={REGIONS[active]} compact />
    </>
  );
}


function PatternD() {
  const [expanded, setExpanded] = useState(0);

  return (
    <div>
      {REGIONS.map((r, i) => (
        <div key={r} style={{ borderBottom: `1px solid ${palette.neutral[200]}` }}>
          <button onClick={() => setExpanded(expanded === i ? -1 : i)} style={{
            border: 'none', cursor: 'pointer', width: '100%', display: 'flex',
            alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px',
            fontFamily: FONT_BODY, fontSize: '14px', fontWeight: expanded === i ? '500' : '400',
            color: expanded === i ? palette.primary.default : palette.neutral[700],
            backgroundColor: expanded === i ? palette.primary.tint : 'transparent',
            letterSpacing: '0.02em', transition: 'all 0.2s ease',
          }}>
            {r}
            <ChevronRight size={14} strokeWidth={1.5} style={{
              transform: expanded === i ? 'rotate(90deg)' : 'none',
              transition: 'transform 0.2s ease',
              color: palette.neutral[400],
            }} />
          </button>
          {expanded === i && <RegionPanel region={r} compact />}
        </div>
      ))}
    </div>
  );
}


function PatternADesktop() {
  const [active, setActive] = useState(0);

  return (
    <>
      <div style={{
        display: 'flex', borderBottom: `1px solid ${palette.neutral[200]}`,
      }}>
        {REGIONS.map((r, i) => (
          <button key={r} onClick={() => setActive(i)} style={{
            border: 'none', cursor: 'pointer', flex: 1, textAlign: 'center',
            fontFamily: FONT_BODY, fontSize: '13px', fontWeight: active === i ? '500' : '400',
            letterSpacing: '0.03em', padding: '14px 16px',
            color: active === i ? palette.primary.default : palette.neutral[400],
            backgroundColor: 'transparent',
            borderBottom: active === i ? `2px solid ${palette.primary.default}` : '2px solid transparent',
            marginBottom: '-1px', transition: 'all 0.2s ease',
          }}>{r}</button>
        ))}
      </div>
      <RegionPanel region={REGIONS[active]} />
    </>
  );
}


function PatternBDesktop() {
  const [active, setActive] = useState(0);

  return (
    <>
      <div style={{
        display: 'flex', borderBottom: `1px solid ${palette.neutral[200]}`,
      }}>
        {REGIONS.map((r, i) => (
          <button key={r} onClick={() => setActive(i)} style={{
            border: 'none', cursor: 'pointer', flex: 1, textAlign: 'center',
            fontFamily: FONT_BODY, fontSize: '13px', fontWeight: active === i ? '500' : '400',
            letterSpacing: '0.03em', padding: '14px 16px',
            color: active === i ? palette.primary.default : palette.neutral[400],
            backgroundColor: 'transparent',
            borderBottom: active === i ? `2px solid ${palette.primary.default}` : '2px solid transparent',
            marginBottom: '-1px', transition: 'all 0.2s ease',
          }}>{r}</button>
        ))}
      </div>
      <RegionPanel region={REGIONS[active]} />
    </>
  );
}


function PatternCDesktop() {
  const [active, setActive] = useState(0);

  return (
    <>
      <div style={{
        display: 'flex', gap: '10px', padding: '16px 20px',
        borderBottom: `1px solid ${palette.neutral[200]}`,
      }}>
        {REGIONS.map((r, i) => (
          <button key={r} onClick={() => setActive(i)} style={{
            border: active === i ? `1px solid ${palette.primary.default}` : `1px solid ${palette.neutral[200]}`,
            cursor: 'pointer', borderRadius: '24px', padding: '8px 22px',
            fontFamily: FONT_BODY, fontSize: '13px', fontWeight: '500',
            letterSpacing: '0.02em',
            color: active === i ? '#FFFFFF' : palette.primary.default,
            backgroundColor: active === i ? palette.primary.default : 'transparent',
            transition: 'all 0.2s ease',
          }}>{r}</button>
        ))}
      </div>
      <RegionPanel region={REGIONS[active]} />
    </>
  );
}


function PatternDDesktop() {
  const [active, setActive] = useState(0);

  return (
    <>
      <div style={{
        display: 'flex', gap: '32px', padding: '16px 24px',
        borderBottom: `1px solid ${palette.neutral[200]}`,
      }}>
        {REGIONS.map((r, i) => (
          <button key={r} onClick={() => setActive(i)} style={{
            border: 'none', cursor: 'pointer', padding: '0 0 6px',
            fontFamily: FONT_HEADING, fontSize: '15px', fontWeight: '400',
            color: active === i ? palette.primary.default : palette.neutral[300],
            backgroundColor: 'transparent',
            borderBottom: active === i ? `1px solid ${palette.primary.default}` : '1px solid transparent',
            transition: 'all 0.2s ease',
          }}>{r}</button>
        ))}
      </div>
      <RegionPanel region={REGIONS[active]} />
    </>
  );
}


export default function TabExplorationPage() {
  const [winW, setWinW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setWinW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  const compact = winW < 860;

  const sectionStyle = {
    marginBottom: '64px',
  };

  const sectionTitle = {
    fontFamily: FONT_HEADING, fontSize: TS.bodyLg, fontWeight: '500',
    color: palette.primary.default, marginBottom: '6px',
  };

  const sectionDesc = {
    fontFamily: FONT_BODY, fontSize: '14px', fontWeight: '300',
    color: palette.neutral[500], lineHeight: '1.6', marginBottom: '28px', maxWidth: '640px',
  };

  const labelStyle = {
    fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '300',
    color: palette.neutral[400], textTransform: 'uppercase', letterSpacing: '0.08em',
    marginBottom: '12px',
  };

  const frameRow = compact
    ? { display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }
    : { display: 'flex', gap: '40px', alignItems: 'flex-start' };

  return (
    <div style={{
      minHeight: '100vh', backgroundColor: palette.surface.stone, padding: compact ? '32px 16px' : '48px 56px',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <Link to="/foundations" style={{
          fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '400',
          color: palette.neutral[400], textDecoration: 'none', letterSpacing: '0.04em',
          display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px',
        }}>
          <ChevronLeft size={14} strokeWidth={1.5} /> Back to Foundations
        </Link>
        <h1 style={{
          fontFamily: FONT_HEADING, fontSize: compact ? TS.lg : TS['2xl'], fontWeight: '300',
          color: palette.primary.default, marginBottom: '8px',
        }}>
          Tab Patterns &mdash; Mobile Exploration
        </h1>
        <p style={{
          fontFamily: FONT_BODY, fontSize: '15px', fontWeight: '300',
          color: palette.neutral[500], lineHeight: '1.6', maxWidth: '640px',
        }}>
          These four patterns each solve the overflow problem differently.
          Each is shown at mobile (375px) and desktop width.
        </p>
      </div>

      {/* Pattern A — Scrollable Strip */}
      <div style={sectionStyle}>
        <p style={labelStyle}>Pattern A</p>
        <h2 style={sectionTitle}>Scrollable Strip</h2>
        <p style={sectionDesc}>
          Tabs sit in a single horizontal row and scroll with swipe. A fade-edge hints
          at more options. The most common approach on travel and e-commerce sites.
        </p>
        <div style={frameRow}>
          <MobileFrame label="Mobile — 375px">
            <PatternA />
          </MobileFrame>
          <DesktopFrame label="Desktop">
            <PatternADesktop />
          </DesktopFrame>
        </div>
      </div>

      {/* Pattern B — Dropdown Select */}
      <div style={sectionStyle}>
        <p style={labelStyle}>Pattern B</p>
        <h2 style={sectionTitle}>Dropdown Select</h2>
        <p style={sectionDesc}>
          On mobile, tabs collapse into a single dropdown trigger showing the active region.
          Tap to reveal the full list. Extremely compact — ideal when vertical space is premium.
        </p>
        <div style={frameRow}>
          <MobileFrame label="Mobile — 375px">
            <PatternB />
          </MobileFrame>
          <DesktopFrame label="Desktop">
            <PatternBDesktop />
          </DesktopFrame>
        </div>
      </div>

      {/* Pattern C — Wrapping Chips */}
      <div style={sectionStyle}>
        <p style={labelStyle}>Pattern C</p>
        <h2 style={sectionTitle}>Wrapping Chips</h2>
        <p style={sectionDesc}>
          All options remain visible, wrapping to a second line when needed. Good for discovery
          since every region is visible without interaction. Works well with 5-7 items.
        </p>
        <div style={frameRow}>
          <MobileFrame label="Mobile — 375px">
            <PatternC />
          </MobileFrame>
          <DesktopFrame label="Desktop">
            <PatternCDesktop />
          </DesktopFrame>
        </div>
      </div>

      {/* Pattern D — Accordion */}
      <div style={sectionStyle}>
        <p style={labelStyle}>Pattern D</p>
        <h2 style={sectionTitle}>Accordion</h2>
        <p style={sectionDesc}>
          Each region becomes an expandable section. Fully vertical, no horizontal overflow.
          Every label is always visible, and the expanded content sits naturally in-flow.
        </p>
        <div style={frameRow}>
          <MobileFrame label="Mobile — 375px">
            <PatternD />
          </MobileFrame>
          <DesktopFrame label="Desktop">
            <PatternDDesktop />
          </DesktopFrame>
        </div>
      </div>

      {/* Notes */}
      <div style={{
        borderTop: `1px solid ${palette.neutral[200]}`, paddingTop: '32px', marginTop: '16px',
      }}>
        <h3 style={{ fontFamily: FONT_HEADING, fontSize: TS.base, fontWeight: '500', color: palette.primary.default, marginBottom: '12px' }}>
          Considerations
        </h3>
        <ul style={{ fontFamily: FONT_BODY, fontSize: '14px', color: palette.neutral[700], lineHeight: '1.8', paddingLeft: '20px', maxWidth: '640px' }}>
          <li><strong>A (Scrollable Strip)</strong> — Familiar but relies on users noticing the fade edge. Add left/right arrows on touch for extra affordance.</li>
          <li><strong>B (Dropdown)</strong> — Most space-efficient. Risk: hides options behind a tap. Best paired with a clear chevron indicator.</li>
          <li><strong>C (Chips)</strong> — Best discoverability. Slightly taller if items wrap to two rows. Works well with brand pill styling.</li>
          <li><strong>D (Accordion)</strong> — Best for content-heavy views. Eliminates horizontal scrolling entirely. Slightly unconventional for filter/tab use.</li>
        </ul>
      </div>
    </div>
  );
}
