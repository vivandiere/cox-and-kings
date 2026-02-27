import React, { useState } from 'react';
import { palette, brandDecorativeDeep } from '../tokens/index.js';
import { FONT_HEADING, FONT_BODY, FONT_MONO, TS } from '../tokens/index.js';
import { ChevronLeft, ChevronRight, X, Menu, Phone, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { LogoInline, LogoCompact } from '../components/Logo.jsx';

const WARM_ACCENT = brandDecorativeDeep.warmSandDeep.hex;

// ── Nav content ───────────────────────────────────────────────────────────────

const PRIMARY_NAV = [
  { label: 'Destinations', hasArrow: true },
  { label: 'Small group tours' },
  { label: 'Tailor-made journeys' },
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
const LOCATION_TAGS = ['India', 'Peru', 'Uzbekistan', 'Japan', 'Morocco', 'Greece'];
const INSPIRATION_TAGS = ['Specialist Tours', 'Solo Travel', 'Wildlife', 'Cultural'];
const MENU_NAV_ITEMS = ['Small Group Tours', 'Tailormade Journeys', 'Travel Brochures'];

// ── Shared hero shell ─────────────────────────────────────────────────────────
// Renders the full homepage hero context. Pass nav as children — it layers on top.

function HeroShell({ children, mob = false }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: palette.primary.default }}>

      {/* Utility bar */}
      <div style={{
        backgroundColor: palette.primary.default,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: mob ? '8px 16px' : '9px 32px',
        borderBottom: `1px solid ${palette.primary.light}`,
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Phone size={mob ? 11 : 13} strokeWidth={1.5} color={palette.surface.stone} />
          <span style={{ fontFamily: FONT_BODY, fontSize: mob ? '10px' : '11px', fontWeight: '400', color: palette.surface.stone, letterSpacing: '0.04em' }}>020 3936 0647</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: mob ? '8px' : '10px' }}>
          <span style={{ fontFamily: FONT_BODY, fontSize: mob ? '9px' : '11px', fontWeight: '400', color: palette.surface.stone, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>Subscribe</span>
          <span style={{ color: palette.surface.stone, fontSize: mob ? '9px' : '11px', opacity: 0.5 }}>·</span>
          <span style={{ fontFamily: FONT_BODY, fontSize: mob ? '9px' : '11px', fontWeight: '400', color: palette.surface.stone, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>Brochures</span>
        </div>
      </div>

      {/* Hero area */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {/* Background image */}
        <img
          src="/images/hero-01.png"
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Light overlay — matches homepage #10203719 */}
        <div style={{ position: 'absolute', inset: 0, backgroundColor: '#10203719' }} />

        {/* Nav layer (option-specific) */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          {children}
        </div>

        {/* "Guided by Curiosity" — centered */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none', padding: mob ? '0 16px' : '0',
        }}>
          <h1 style={{
            fontFamily: FONT_HEADING,
            color: palette.surface.stone,
            fontSize: mob ? TS['2xl'] : TS['4xl'],
            fontWeight: '400',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            lineHeight: 1.05,
            textAlign: 'center',
          }}>
            Guided by Curiosity
          </h1>
        </div>

        {/* Bottom row */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3,
          display: 'flex', flexDirection: 'row',
          justifyContent: 'space-between', alignItems: 'flex-end',
          padding: mob ? '12px 16px' : '16px 24px',
          pointerEvents: 'none',
        }}>
          <button style={{
            fontFamily: FONT_BODY,
            backgroundColor: palette.surface.stone,
            color: palette.primary.default,
            padding: mob ? '10px 20px' : '13px 28px',
            border: 'none', fontWeight: '500',
            fontSize: mob ? '12px' : '14px',
            cursor: 'pointer', pointerEvents: 'auto',
            whiteSpace: 'nowrap',
          }}>
            Explore Destinations
          </button>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', textAlign: 'right' }}>
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: palette.surface.stone, opacity: 0.6, display: 'inline-block', flexShrink: 0, marginBottom: '2px' }} />
            <span style={{ fontFamily: FONT_MONO, color: palette.surface.stone, fontSize: '8px', fontWeight: '400', letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.7, lineHeight: 1.3 }}>
              India,<br />Indian Subcontinent
            </span>
          </div>
        </div>
      </div>

      {/* Slide pagination line */}
      <div style={{ display: 'flex', height: '2px', flexShrink: 0 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{ flex: 1, height: '2px', backgroundColor: palette.primary.default, opacity: i === 0 ? 1 : 0.15 }} />
        ))}
      </div>

    </div>
  );
}

// ── Frames ────────────────────────────────────────────────────────────────────

function MobileFrame({ children, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
      <span style={{ fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '400', color: palette.neutral[400], textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
      <div style={{ width: '375px', height: '640px', border: `1px solid ${palette.neutral[200]}`, borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(16,32,55,0.06)' }}>
        {children}
      </div>
    </div>
  );
}

function DesktopFrame({ children, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', width: '100%' }}>
      <span style={{ fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '400', color: palette.neutral[400], textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
      <div style={{ width: '100%', height: '640px', border: `1px solid ${palette.neutral[200]}`, borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(16,32,55,0.06)' }}>
        {children}
      </div>
    </div>
  );
}

// ── Option 1 — Current site rebrand ──────────────────────────────────────────

function Opt1DrawerContent({ headingSize = '28px', activeSection, onSectionClick }) {
  return (
    <div style={{ padding: '28px 24px' }}>
      {PRIMARY_NAV.map(item => (
        <div key={item.label} onClick={() => onSectionClick && onSectionClick(item.label)} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '6px', paddingBottom: '6px', cursor: 'pointer',
          borderLeft: activeSection === item.label ? `2px solid ${palette.primary.default}` : '2px solid transparent',
          paddingLeft: '10px',
        }}>
          <span style={{ fontFamily: FONT_HEADING, fontSize: headingSize, fontWeight: '300', color: palette.primary.default, lineHeight: 1.15 }}>{item.label}</span>
          {item.hasArrow && <ChevronRight size={18} strokeWidth={1} color={palette.neutral[400]} />}
        </div>
      ))}
      <div style={{ height: '1px', backgroundColor: palette.neutral[200], margin: '20px 0 20px 12px' }} />
      <div style={{ paddingLeft: '12px' }}>
        <p style={{ fontFamily: FONT_MONO, fontSize: '10px', color: WARM_ACCENT, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '14px' }}>Popular</p>
        {POPULAR.map(dest => (
          <p key={dest} style={{ fontFamily: FONT_MONO, fontSize: '13px', color: palette.primary.default, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px', cursor: 'pointer' }}>{dest}</p>
        ))}
        <div style={{ height: '1px', backgroundColor: palette.neutral[200], margin: '20px 0' }} />
        {SECONDARY_NAV.map(item => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px', cursor: 'pointer' }}>
            <span style={{ fontFamily: FONT_MONO, fontSize: '12px', color: palette.primary.default, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item.label}</span>
            {item.hasArrow && <ChevronRight size={13} strokeWidth={1.5} color={palette.neutral[400]} />}
          </div>
        ))}
        <div style={{ height: '1px', backgroundColor: palette.neutral[200], margin: '20px 0' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Phone size={13} strokeWidth={1.5} color={palette.neutral[500]} />
          <span style={{ fontFamily: FONT_MONO, fontSize: '12px', color: palette.neutral[500], letterSpacing: '0.04em' }}>020 3993 3757</span>
        </div>
      </div>
    </div>
  );
}

function Opt1Mobile() {
  const [open, setOpen] = useState(true);
  return (
    <HeroShell mob>
      {/* Top bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', backgroundColor: palette.primary.default, padding: '0 16px', height: '52px' }}>
          <div onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <div style={{ width: '18px', height: '10px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, width: '18px', height: '2px', backgroundColor: palette.surface.stone, top: open ? '4px' : 0, transform: open ? 'rotate(45deg)' : 'none', transition: 'all 0.3s ease' }} />
              <div style={{ position: 'absolute', left: 0, width: '18px', height: '2px', backgroundColor: palette.surface.stone, top: open ? '4px' : '8px', transform: open ? 'rotate(-45deg)' : 'none', transition: 'all 0.3s ease' }} />
            </div>
          </div>
          <LogoInline color={palette.surface.stone} height={20} />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Search size={18} strokeWidth={1.5} color={palette.surface.stone} style={{ cursor: 'pointer' }} />
          </div>
        </div>
        {open && (
          <div style={{ backgroundColor: '#FFFFFF', overflowY: 'auto', maxHeight: '500px', scrollbarWidth: 'none' }}>
            <Opt1DrawerContent activeSection={null} />
          </div>
        )}
      </div>
    </HeroShell>
  );
}

function Opt1Desktop() {
  const [open, setOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('Destinations');
  return (
    <HeroShell>
      {/* Top bar + drawer */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', zIndex: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', backgroundColor: palette.primary.default, padding: '0 24px', height: '56px', flexShrink: 0 }}>
          <div onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <div style={{ width: '20px', height: '10px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, width: '20px', height: '2px', backgroundColor: palette.surface.stone, top: open ? '4px' : 0, transform: open ? 'rotate(45deg)' : 'none', transition: 'all 0.3s ease' }} />
              <div style={{ position: 'absolute', left: 0, width: '20px', height: '2px', backgroundColor: palette.surface.stone, top: open ? '4px' : '8px', transform: open ? 'rotate(-45deg)' : 'none', transition: 'all 0.3s ease' }} />
            </div>
          </div>
          <LogoInline color={palette.surface.stone} height={22} />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Search size={20} strokeWidth={1.5} color={palette.surface.stone} style={{ cursor: 'pointer' }} />
          </div>
        </div>
        {open && (
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            <div style={{ width: '380px', flexShrink: 0, backgroundColor: '#FFFFFF', overflowY: 'auto', scrollbarWidth: 'none' }}>
              <Opt1DrawerContent headingSize="30px" activeSection={activeSection} onSectionClick={setActiveSection} />
            </div>
            {activeSection === 'Destinations' && (
              <div style={{ flex: 1, backgroundColor: palette.surface.stone, overflowY: 'auto', scrollbarWidth: 'none', padding: '24px' }}>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
                  {FEATURED_DESTINATIONS.map(dest => (
                    <div key={dest.label} style={{ flex: 1, position: 'relative', height: '110px', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer' }}>
                      <img src={dest.img} alt={dest.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(16,32,55,0.28)' }} />
                      <span style={{ position: 'absolute', bottom: '8px', left: 0, right: 0, textAlign: 'center', fontFamily: FONT_MONO, fontSize: '9px', color: '#FFFFFF', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{dest.label}</span>
                    </div>
                  ))}
                </div>
                <div style={{ backgroundColor: palette.primary.default, padding: '11px 14px', cursor: 'pointer', marginBottom: '4px' }}>
                  <span style={{ fontFamily: FONT_MONO, fontSize: '11px', color: palette.surface.stone, letterSpacing: '0.1em', textTransform: 'uppercase' }}>All Destinations</span>
                </div>
                {DESTINATIONS_LIST.map(dest => (
                  <div key={dest} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 8px', borderBottom: `1px solid ${palette.neutral[200]}`, cursor: 'pointer' }}>
                    <span style={{ fontFamily: FONT_MONO, fontSize: '11px', color: palette.primary.default, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{dest}</span>
                    <ChevronRight size={12} strokeWidth={1.5} color={palette.neutral[400]} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </HeroShell>
  );
}

// ── Option 2 — Detached floating menu ────────────────────────────────────────

function TagPill({ label }) {
  return (
    <span style={{ fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '400', color: palette.primary.default, backgroundColor: palette.neutral[100], border: `1px solid ${palette.neutral[200]}`, padding: '7px 14px', borderRadius: '20px', letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap' }}>{label}</span>
  );
}

function Opt2Menu({ mob = false }) {
  const [search, setSearch] = useState('');
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ backgroundColor: palette.surface.stone, border: `1px solid ${palette.neutral[200]}`, borderTop: 'none', overflowY: 'auto', maxHeight: mob ? '520px' : '560px', scrollbarWidth: 'none' }}>
      <style>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}.opt2-input::placeholder{color:${palette.neutral[300]};opacity:1}`}</style>

      {/* Search */}
      <div style={{ padding: mob ? '22px 20px 28px' : '28px 28px 40px' }}>
        <div style={{ position: 'relative', width: '100%' }}>
          <input className="opt2-input" type="text" value={search} onChange={e => setSearch(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder="Where would you like to go?"
            style={{ fontFamily: FONT_HEADING, fontSize: mob ? '19px' : '23px', fontWeight: '400', color: palette.primary.default, letterSpacing: '0.02em', border: 'none', outline: 'none', background: 'transparent', width: '100%', padding: 0, caretColor: focused ? palette.primary.default : 'transparent' }} />
          {!search && !focused && (
            <span style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '2px', height: mob ? '20px' : '24px', backgroundColor: palette.neutral[300], animation: 'blink 1s ease-in-out infinite', pointerEvents: 'none' }} />
          )}
        </div>
      </div>

      {/* Destination tags */}
      <div style={{ padding: mob ? '0 20px 16px' : '0 28px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={palette.primary.default} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
          <span style={{ fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '300', color: palette.primary.default, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Destinations</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {LOCATION_TAGS.map(tag => <TagPill key={tag} label={tag} />)}
          <span style={{ fontFamily: FONT_BODY, fontSize: '12px', color: palette.primary.default, backgroundColor: 'transparent', padding: '7px 14px', borderRadius: '20px', border: `1px solid ${palette.neutral[200]}`, letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap' }}>View all →</span>
        </div>
      </div>

      {/* Inspiration tags */}
      <div style={{ padding: mob ? '8px 20px 20px' : '8px 28px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={palette.primary.default} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
          <span style={{ fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '300', color: palette.primary.default, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Inspiration</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {INSPIRATION_TAGS.map(tag => <TagPill key={tag} label={tag} />)}
        </div>
      </div>

      {/* Nav rows */}
      <div style={{ padding: mob ? '0 20px' : '0 28px' }}>
        {MENU_NAV_ITEMS.map(label => (
          <div key={label} style={{ borderTop: `1px solid ${palette.neutral[100]}`, padding: '16px 0', cursor: 'pointer' }}>
            <span style={{ fontFamily: FONT_HEADING, fontSize: '15px', fontWeight: '400', color: palette.primary.default, letterSpacing: '0.06em' }}>{label}</span>
          </div>
        ))}
      </div>

      {/* CTA footer */}
      <div style={{ backgroundColor: palette.primary.default, margin: '12px 0 0', padding: mob ? '18px 20px 22px' : '20px 28px 24px' }}>
        <p style={{ fontFamily: FONT_HEADING, fontSize: '15px', fontWeight: '400', color: palette.surface.stone, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>Speak to our experts</p>
        <p style={{ fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '300', color: palette.surface.stone, opacity: 0.7, lineHeight: 1.6, letterSpacing: '0.04em' }}>MON–FRI &nbsp;9:00am – 6:00pm<br />SAT &nbsp;10:00am – 4:30pm</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
          <span style={{ fontFamily: FONT_BODY, fontSize: '15px', fontWeight: '500', color: palette.surface.stone, letterSpacing: '0.06em' }}>020 3993 4424</span>
          <button style={{ fontFamily: FONT_BODY, backgroundColor: palette.surface.stone, color: palette.primary.default, padding: '8px 20px', border: 'none', fontWeight: '400', fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}>Enquire</button>
        </div>
      </div>
    </div>
  );
}

function Opt2Mobile() {
  const [open, setOpen] = useState(true);
  return (
    <HeroShell mob>
      {/* Floating compact nav bar */}
      <div style={{ position: 'absolute', top: '10px', left: '12px', right: '12px', zIndex: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', backgroundColor: palette.surface.stone, padding: '9px 14px', border: `1px solid ${palette.neutral[200]}` }}>
          <div onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', gap: '7px', cursor: 'pointer' }}>
            <div style={{ width: '17px', height: '9px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, width: '17px', height: '2px', backgroundColor: palette.primary.default, top: open ? '3.5px' : 0, transform: open ? 'rotate(45deg)' : 'none', transition: 'all 0.3s ease' }} />
              <div style={{ position: 'absolute', left: 0, width: '17px', height: '2px', backgroundColor: palette.primary.default, top: open ? '3.5px' : '7px', transform: open ? 'rotate(-45deg)' : 'none', transition: 'all 0.3s ease' }} />
            </div>
            <span style={{ fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '400', color: palette.primary.default, letterSpacing: '1px', textTransform: 'uppercase' }}>{open ? 'Close' : 'Menu'}</span>
          </div>
          <LogoCompact color={palette.primary.default} height={20} />
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button style={{ fontFamily: FONT_BODY, backgroundColor: palette.primary.default, color: '#FFFFFF', padding: '7px 12px', border: 'none', fontWeight: '400', fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>Enquire</button>
          </div>
        </div>
        {open && <Opt2Menu mob />}
      </div>
    </HeroShell>
  );
}

function Opt2Desktop() {
  const [open, setOpen] = useState(true);
  return (
    <HeroShell>
      {/* Floating compact nav bar — centred */}
      <div style={{ position: 'absolute', top: '14px', left: '50%', transform: 'translateX(-50%)', width: '560px', zIndex: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', backgroundColor: palette.surface.stone, padding: '11px 20px', border: `1px solid ${palette.neutral[200]}` }}>
          <div onClick={() => setOpen(!open)} style={{ display: 'flex', alignItems: 'center', gap: '9px', cursor: 'pointer' }}>
            <div style={{ width: '20px', height: '10px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, width: '20px', height: '2px', backgroundColor: palette.primary.default, top: open ? '4px' : 0, transform: open ? 'rotate(45deg)' : 'none', transition: 'all 0.3s ease' }} />
              <div style={{ position: 'absolute', left: 0, width: '20px', height: '2px', backgroundColor: palette.primary.default, top: open ? '4px' : '8px', transform: open ? 'rotate(-45deg)' : 'none', transition: 'all 0.3s ease' }} />
            </div>
            <span style={{ fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '400', color: palette.primary.default, letterSpacing: '1px', textTransform: 'uppercase' }}>{open ? 'Close' : 'Menu'}</span>
          </div>
          <LogoCompact color={palette.primary.default} height={22} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
            <button style={{ fontFamily: FONT_BODY, backgroundColor: palette.primary.default, color: '#FFFFFF', padding: '10px 18px', border: 'none', fontWeight: '400', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>Enquire</button>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={palette.primary.default} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>
        {open && <Opt2Menu />}
      </div>
    </HeroShell>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function NavigationPage() {
  const [viewMode, setViewMode] = useState('mobile');

  const toggleBtn = (active) => ({
    border: `1px solid ${active ? palette.primary.default : palette.neutral[200]}`,
    backgroundColor: active ? palette.primary.default : 'transparent',
    color: active ? '#FFFFFF' : palette.neutral[500],
    fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '500',
    letterSpacing: '0.04em', padding: '6px 16px',
    borderRadius: '4px', cursor: 'pointer', transition: 'all 0.15s ease',
  });

  const sectionStyle = { marginBottom: '80px' };
  const sectionLabel = { fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '300', color: palette.neutral[400], textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' };
  const sectionTitle = { fontFamily: FONT_HEADING, fontSize: TS.bodyLg, fontWeight: '500', color: palette.primary.default, marginBottom: '6px' };
  const sectionDesc = { fontFamily: FONT_BODY, fontSize: '14px', fontWeight: '300', color: palette.neutral[500], lineHeight: '1.6', marginBottom: '28px', maxWidth: '640px' };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: palette.surface.stone }}>

      {/* Sticky toolbar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 20, backgroundColor: palette.surface.stone, borderBottom: `1px solid ${palette.neutral[200]}`, padding: '12px 56px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '300', color: palette.neutral[400], textTransform: 'uppercase', letterSpacing: '0.08em' }}>View</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button onClick={() => setViewMode('mobile')} style={toggleBtn(viewMode === 'mobile')}>Mobile</button>
            <button onClick={() => setViewMode('desktop')} style={toggleBtn(viewMode === 'desktop')}>Desktop</button>
          </div>
        </div>
      </div>

      <div style={{ padding: '48px 56px' }}>
        <div style={{ marginBottom: '56px' }}>
          <Link to="/foundations" style={{ fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '400', color: palette.neutral[400], textDecoration: 'none', letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
            <ChevronLeft size={14} strokeWidth={1.5} /> Back to Foundations
          </Link>
          <h1 style={{ fontFamily: FONT_HEADING, fontSize: TS['2xl'], fontWeight: '300', color: palette.primary.default, marginBottom: '8px' }}>Navigation Exploration</h1>
          <p style={{ fontFamily: FONT_BODY, fontSize: '15px', fontWeight: '300', color: palette.neutral[500], lineHeight: '1.6', maxWidth: '640px' }}>
            Two navigation approaches shown in the context of the homepage hero. Toggle the view above to compare mobile and desktop.
          </p>
        </div>

        {/* Option 1 */}
        <div style={sectionStyle}>
          <p style={sectionLabel}>Option 1</p>
          <h2 style={sectionTitle}>Current Site — Rebrand</h2>
          <p style={sectionDesc}>Replicates the existing Cox & Kings navigation structure with new design tokens. Full-width drawer slides over the hero. Desktop splits into a left nav column and a right destinations panel.</p>
          {viewMode === 'mobile'
            ? <MobileFrame label="Mobile — 375px"><Opt1Mobile /></MobileFrame>
            : <DesktopFrame label="Desktop"><Opt1Desktop /></DesktopFrame>
          }
        </div>

        {/* Option 2 */}
        <div style={sectionStyle}>
          <p style={sectionLabel}>Option 2</p>
          <h2 style={sectionTitle}>Detached Floating Menu</h2>
          <p style={sectionDesc}>A centred floating nav bar sits over the hero. Opening the menu drops a detached panel below it — search-led with destination and inspiration tags, keeping the hero visible around it.</p>
          {viewMode === 'mobile'
            ? <MobileFrame label="Mobile — 375px"><Opt2Mobile /></MobileFrame>
            : <DesktopFrame label="Desktop"><Opt2Desktop /></DesktopFrame>
          }
        </div>

      </div>
    </div>
  );
}
