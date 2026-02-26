import React, { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { Phone, Mail, BookOpen } from 'lucide-react';
import { palette, buildAccentScale } from '../tokens/index.js';
import { FONT_HEADING, FONT_BODY, FONT_MONO, TS } from '../tokens/index.js';
import { LogoInline, LogoStacked } from '../components/Logo.jsx';
import { useAccent } from '../components/AccentContext.jsx';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener('change', handler);
  }, [breakpoint]);
  return isMobile;
}

export default function HomepagePage() {
  const { accent, accentScale, isPrimaryAccent, isLightAccent } = useAccent();
  const mob = useIsMobile();

  const [heroMode, setHeroMode] = useState('offWhite');
  const [logoCompact, setLogoCompact] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');
  const [menuSearchFocused, setMenuSearchFocused] = useState(false);
  const [destSlide, setDestSlide] = useState(0);
  const [destHover, setDestHover] = useState(-1);

  const scrollContainerRef = useRef(null);
  const menuRef = useRef(null);
  const destScrollRef = useRef(null);
  const destDrag = useRef({ active: false, startX: 0, startSlide: 0 });

  const heroSlides = [
    { src: '/images/hero-01.png', city: 'Jaipur', country: 'India' },
    { src: '/images/hero-02.png', city: 'Marrakech', country: 'Morocco' },
    { src: '/images/hero-03.png', city: 'Kyoto', country: 'Japan' },
    { src: '/images/hero-04.png', city: 'Cusco', country: 'Peru' },
    { src: '/images/hero-05.png', city: 'Santorini', country: 'Greece' },
    { src: '/images/hero-06.png', city: 'Cape Town', country: 'South Africa' },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [heroSlides.length]);

  const destRegions = [
    { name: 'Europe', viewBox: '0 0 415 554', d: 'M391.798 184.374C391.798 82.5485 309.25 0 207.424 0C105.598 0 23.0498 82.5485 23.0498 184.374H0V553.123H414.848V184.374H391.798Z', image: '/images/dest-europe.png' },
    { name: 'Indian\nSubcontinent', viewBox: '0 0 415 554', d: 'M368.74 184.374C368.74 158.918 348.105 138.283 322.649 138.283C322.649 114.225 310.356 93.053 291.721 80.6622H291.729C291.729 80.6622 291.656 80.6216 291.623 80.5972C289.534 79.215 287.363 77.9466 285.127 76.7921C228.799 42.758 207.416 0 207.416 0C207.416 0 186.025 42.7662 129.681 76.8084C127.461 77.9548 125.307 79.2069 123.233 80.5809C123.184 80.6053 123.136 80.6378 123.095 80.6622H123.111C104.476 93.0449 92.1831 114.225 92.1831 138.283C66.7266 138.283 46.0915 158.918 46.0915 184.374C20.6351 184.374 0 205.009 0 230.466V276.557V322.649C0 348.105 20.6351 368.74 46.0915 368.74C46.0915 394.197 66.7266 414.832 92.1831 414.832C92.1831 438.89 104.476 460.062 123.111 472.452H123.095C123.144 472.477 123.193 472.509 123.233 472.534C125.307 473.908 127.461 475.16 129.681 476.306C186.017 510.348 207.416 553.115 207.416 553.115C207.416 553.115 228.799 510.357 285.127 476.314C287.363 475.16 289.542 473.892 291.623 472.509C291.656 472.485 291.696 472.469 291.729 472.444H291.721C310.356 460.062 322.649 438.882 322.649 414.824C348.105 414.824 368.74 394.189 368.74 368.732C394.197 368.732 414.832 348.097 414.832 322.641V276.549V230.458C414.832 205.001 394.197 184.366 368.74 184.366V184.374Z', image: '/images/dest-india-subcontinent.png' },
    { name: 'Far East', viewBox: '0 0 415 554', d: 'M414.848 460.94V92.1912C363.935 92.1912 322.657 50.921 322.657 0H92.1912C92.1912 50.9129 50.921 92.1912 0 92.1912V460.94C50.9129 460.94 92.1912 502.218 92.1912 553.131H322.657C322.657 502.218 363.927 460.94 414.848 460.94Z', image: '/images/dest-far-east.png' },
    { name: 'Central\nAsia', viewBox: '0 0 415 554', d: 'M414.848 230.466C414.848 92.1831 207.375 0 207.375 0C207.375 0 0 92.1912 0 230.466H0.105696V553.123H414.954V230.466H414.856H414.848Z', image: '/images/dest-central-asia.png' },
    { name: 'North Africa\n& Middle East', viewBox: '0 0 415 554', d: 'M368.749 230.466V46.0915H253.516L207.424 0L161.333 46.0915H46.0915V230.466L0 276.565L46.0915 322.657V507.031H161.333L207.424 553.123L253.516 507.031H368.749V322.657L414.848 276.565L368.749 230.466Z', image: '/images/dest-north-africa-middle-east.png' },
    { name: 'Africa', viewBox: '0 0 415 554', d: 'M0 0L46.0915 138.283L0 276.565L46.0915 414.848L0 553.131H414.848L368.749 414.848L414.848 276.565L368.749 138.283L414.848 0H0Z', image: '/images/dest-africa.png' },
    { name: 'South\nAmerica', viewBox: '0 0 415 554', d: 'M345.707 184.374L414.848 92.1831H334.178L368.749 46.0915H241.995L276.565 0H138.283L172.853 46.0915H46.0915L80.6622 92.1831H0L69.1414 184.374H0L69.1414 276.565L0 368.749H69.1414L0 460.94H80.6622L46.0915 507.031H172.853L138.283 553.123H276.565L241.995 507.031H368.749L334.178 460.94H414.848L345.707 368.749H414.848L345.707 276.565L414.848 184.374H345.707Z', image: '/images/dest-south-america.png' },
    { name: 'Central\nAmerica', viewBox: '0 0 415 554', d: 'M138.283 0V46.0915H92.1912V92.1912H46.0915V138.502L0 138.283V414.629L46.0915 414.921V460.988H92.1912V506.763L138.283 507.056V553.123H276.565V507.031H322.657V460.94H368.749V414.848H414.848V138.283L368.749 138.502V92.1912H322.657V46.0915H276.565V0H138.283Z', image: '/images/dest-central-america.png' },
    { name: 'North\nAmerica', viewBox: '0 0 415 554', d: 'M345.707 23.0417C319.763 23.0417 295.827 14.4641 276.565 0C257.304 14.4641 233.368 23.0417 207.424 23.0417C181.48 23.0417 157.544 14.4641 138.283 0C119.022 14.4641 95.0856 23.0417 69.1414 23.0417C43.1971 23.0417 19.261 14.4641 0 0V92.1831V368.749C0 470.574 82.5485 553.123 184.374 553.123H230.466C332.292 553.123 414.84 470.574 414.84 368.749V0C395.579 14.4641 371.643 23.0417 345.699 23.0417H345.707Z', image: '/images/dest-north-america.png' },
    { name: 'Polar', viewBox: '0 0 415 554', d: 'M138.283 0L0 138.283V460.94L92.1912 553.131H276.565L414.848 414.84V92.1912L322.657 0H138.283Z', image: '/images/dest-polar.png' },
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setDestSlide((prev) => (prev + 1) % destRegions.length);
    }, 4000);
    return () => clearInterval(id);
  }, [destRegions.length]);

  useEffect(() => {
    if (menuOpen && menuRef.current) {
      const items = menuRef.current.querySelectorAll('[data-menu-animate]');
      gsap.fromTo(items,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
      );
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape' && menuOpen) setMenuOpen(false); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [menuOpen]);

  const handleViewportScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrolled = el.scrollTop > 40;
    if (scrolled && !logoCompact) setLogoCompact(true);
    else if (!scrolled && logoCompact) {
      setLogoCompact(false);
      if (menuOpen) setMenuOpen(false);
    }
  }, [logoCompact, menuOpen]);

  const heroModes = {
    dark: {
      navBg: palette.primary.default,
      navLogoColor: palette.surface.stone,
      navLinkActive: palette.surface.stone,
      navLinkDefault: palette.primary.faded,
      navBtnBg: isPrimaryAccent ? palette.surface.stone : accent.hex,
      navBtnColor: isPrimaryAccent ? palette.primary.default : (isLightAccent ? palette.primary.default : '#FFFFFF'),
    },
    offWhite: {
      navBg: palette.surface.stone,
      navLogoColor: palette.primary.default,
      navLinkActive: palette.primary.default,
      navLinkDefault: palette.neutral[500],
      navBtnBg: isPrimaryAccent ? palette.primary.default : accent.hex,
      navBtnColor: isPrimaryAccent ? '#FFFFFF' : (isLightAccent ? palette.primary.default : '#FFFFFF'),
    },
  };
  const hm = heroModes[heroMode];
  const navBorderColor = heroMode === 'dark' ? palette.primary.light : palette.neutral[200];

  const destinations = [
    { name: 'India', region: 'Indian Subcontinent', image: '/images/hero-01.png' },
    { name: 'Morocco', region: 'North Africa', image: '/images/hero-02.png' },
    { name: 'Japan', region: 'Far East', image: '/images/hero-03.png' },
    { name: 'Peru', region: 'South America', image: '/images/hero-04.png' },
    { name: 'Greece', region: 'Europe', image: '/images/hero-05.png' },
    { name: 'South Africa', region: 'Africa', image: '/images/hero-06.png' },
    { name: 'Sri Lanka', region: 'Indian Subcontinent', image: '/images/hero-01.png' },
    { name: 'Nepal', region: 'Indian Subcontinent', image: '/images/hero-04.png' },
    { name: 'Italy', region: 'Europe', image: '/images/hero-05.png' },
    { name: 'Tanzania', region: 'Africa', image: '/images/hero-06.png' },
    { name: 'Bhutan', region: 'Indian Subcontinent', image: '/images/hero-03.png' },
    { name: 'Uzbekistan', region: 'Central Asia', image: '/images/hero-02.png' },
    { name: 'Egypt', region: 'North Africa', image: '/images/hero-01.png' },
    { name: 'Vietnam', region: 'Far East', image: '/images/hero-03.png' },
    { name: 'Costa Rica', region: 'Central America', image: '/images/hero-04.png' },
    { name: 'Iceland', region: 'Polar', image: '/images/hero-05.png' },
  ];

  const menuNavItems = ['Small Group Tours', 'Tailormade Journeys', 'Travel Brochures'];
  const locationTags = ['India', 'Peru', 'Uzbekistan', 'Japan', 'Morocco', 'Greece'];
  const inspirationTags = ['Specialist Tours', 'Solo Travel', 'Wildlife', 'Cultural'];

  const filteredDestinations = menuSearch.trim()
    ? destinations.filter(d =>
        d.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
        d.region.toLowerCase().includes(menuSearch.toLowerCase())
      )
    : [];

  return (
    <div style={{
      height: '100vh',
      backgroundColor: palette.primary.default,
      fontFamily: FONT_BODY,
    }}>
      <div
        ref={scrollContainerRef}
        onScroll={handleViewportScroll}
        style={{
          height: '100vh',
          overflowY: 'auto',
          position: 'relative',
          backgroundColor: palette.primary.default,
        }}
      >
        {/* ═══════ UTILITY TOP BAR ═══════ */}
        <div style={{
          backgroundColor: palette.primary.default,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: mob ? '10px 16px' : '11px 40px',
          fontFamily: FONT_BODY,
          fontSize: mob ? '11px' : '12px',
          letterSpacing: '0.04em',
          color: palette.surface.stone,
          borderBottom: `1px solid ${palette.primary.light}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: mob ? '14px' : '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
              <Phone size={mob ? 13 : 14} strokeWidth={1.5} />
              <span style={{ fontWeight: 400 }}>020 3936 0647</span>
            </div>
            <span style={{ color: palette.primary.faded, fontSize: mob ? '10px' : '12px' }}>|</span>
            <span style={{ fontWeight: 400, color: palette.primary.faded }}>
              {mob ? 'Opens 9am' : 'We will open at 9am GMT'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: mob ? '16px' : '24px' }}>
            {[
              { label: 'Brochures', icon: BookOpen },
              { label: 'Newsletter', icon: Mail },
            ].map(({ label, icon: Icon }) => (
              <a
                key={label}
                href="#"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  color: palette.surface.stone,
                  textDecoration: 'none',
                  fontWeight: 400,
                  fontSize: mob ? '11px' : '12px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  transition: 'opacity 0.15s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                {!mob && <Icon size={13} strokeWidth={1.5} />}
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Sticky nav */}
        <div style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          height: mob ? '80px' : '104px',
        }}>
          {/* Full-width nav (top / not scrolled) — desktop only */}
          {!mob && (
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              opacity: logoCompact ? 0 : 1,
              pointerEvents: logoCompact ? 'none' : 'auto',
              transition: 'opacity 0.35s ease',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                alignItems: 'center',
                padding: '20px 24px',
              }}>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setMenuOpen(!menuOpen)}>
                    <div style={{ width: '18px', height: '10px', position: 'relative' }}>
                      <div style={{
                        position: 'absolute', left: 0, width: '18px', height: '2px', backgroundColor: palette.surface.stone,
                        top: menuOpen ? '4px' : 0, transform: menuOpen ? 'rotate(45deg)' : 'none',
                        transition: 'all 0.3s ease',
                      }} />
                      <div style={{
                        position: 'absolute', left: 0, width: '18px', height: '2px', backgroundColor: palette.surface.stone,
                        top: menuOpen ? '4px' : '8px', transform: menuOpen ? 'rotate(-45deg)' : 'none',
                        transition: 'all 0.3s ease',
                      }} />
                    </div>
                    <span style={{
                      fontFamily: FONT_BODY, fontSize: '14px', fontWeight: '500',
                      color: palette.surface.stone, letterSpacing: '0.06em', textTransform: 'uppercase',
                    }}>{menuOpen ? 'Close' : 'Menu'}</span>
                  </div>
                  <span style={{ width: '1px', height: '16px', backgroundColor: 'rgba(242,242,235,0.2)' }} />
                  <span style={{ fontFamily: FONT_BODY, fontSize: '14px', color: palette.surface.stone, fontWeight: '500', cursor: 'pointer' }}>Destinations</span>
                  <span style={{ fontFamily: FONT_BODY, fontSize: '14px', color: 'rgba(242,242,235,0.7)', cursor: 'pointer' }}>Inspiration</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <LogoStacked color={palette.surface.stone} height={64} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button style={{
                    fontFamily: FONT_BODY,
                    backgroundColor: palette.surface.stone,
                    color: palette.primary.default,
                    padding: '14px 32px',
                    borderRadius: '0',
                    border: 'none',
                    fontWeight: '500',
                    fontSize: '13px',
                  }}>
                    Enquire
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Compact nav — always visible on mobile, scrolled on desktop */}
          <div style={{
            position: 'absolute',
            top: mob ? '12px' : '12px',
            left: '50%',
            transform: (mob || logoCompact) ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-12px)',
            width: mob ? 'calc(100% - 32px)' : '100%',
            maxWidth: '540px',
            opacity: (mob || logoCompact) ? 1 : 0,
            pointerEvents: (mob || logoCompact) ? 'auto' : 'none',
            transition: 'opacity 0.4s ease, transform 0.4s ease, background-color 0.3s ease',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              backgroundColor: palette.surface.stone,
              padding: mob ? '10px 16px' : '12px 20px',
              backdropFilter: 'blur(16px)',
              border: `1px solid ${palette.neutral[200]}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setMenuOpen(!menuOpen)}>
                <div style={{ width: '20px', height: '10px', position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: 0, width: '20px', height: '2px', backgroundColor: palette.primary.default,
                    top: menuOpen ? '4px' : 0, transform: menuOpen ? 'rotate(45deg)' : 'none',
                    transition: 'all 0.3s ease',
                  }} />
                  <div style={{
                    position: 'absolute', left: 0, width: '20px', height: '2px', backgroundColor: palette.primary.default,
                    top: menuOpen ? '4px' : '8px', transform: menuOpen ? 'rotate(-45deg)' : 'none',
                    transition: 'all 0.3s ease',
                  }} />
                </div>
                <span style={{
                  fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '400',
                  color: palette.primary.default, letterSpacing: '1px', textTransform: 'uppercase',
                }}>{menuOpen ? 'Close' : 'Menu'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LogoInline color={palette.primary.default} height={mob ? 32 : 28} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '10px' }}>
                <button style={{
                  fontFamily: FONT_BODY,
                  backgroundColor: palette.primary.default,
                  color: '#FFFFFF',
                  padding: '10px 16px',
                  borderRadius: '0',
                  border: 'none',
                  fontWeight: '400',
                  fontSize: '12px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  Enquire
                </button>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={palette.primary.default} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer', flexShrink: 0 }}>
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
            </div>
          </div>

          {/* Menu dropdown */}
          {menuOpen && (
            <div style={{
              position: 'absolute',
              top: mob ? '64px' : (logoCompact ? '64px' : '104px'),
              left: '50%',
              transform: 'translateX(-50%)',
              width: mob ? 'calc(100% - 32px)' : '100%',
              maxWidth: '540px',
              zIndex: 10,
              transition: 'top 0.35s ease',
            }}>
              <div ref={menuRef} style={{
                backgroundColor: palette.surface.stone,
                border: `1px solid ${palette.neutral[200]}`,
                borderTop: 'none',
                display: 'flex',
                flexDirection: 'column',
                maxHeight: '680px',
                overflow: 'auto',
              }}>
                {/* Search prompt */}
                <div data-menu-animate style={{ padding: mob ? '28px 20px 40px' : '36px 28px 60px' }}>
                  <style>{`
                    @keyframes menuCursorBlink {
                      0%, 100% { opacity: 1; }
                      50% { opacity: 0; }
                    }
                    .menu-search-input::placeholder {
                      color: ${accentScale[80]};
                      opacity: 1;
                    }
                  `}</style>
                  <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                    <input
                      className="menu-search-input"
                      type="text"
                      value={menuSearch}
                      onChange={(e) => setMenuSearch(e.target.value)}
                      onFocus={() => setMenuSearchFocused(true)}
                      onBlur={() => setMenuSearchFocused(false)}
                      placeholder="Where would you like go?"
                      style={{
                        fontFamily: FONT_HEADING,
                        fontSize: mob ? '20px' : '26px',
                        fontWeight: '400',
                        color: palette.primary.default,
                        letterSpacing: '0.02em',
                        border: 'none',
                        outline: 'none',
                        background: 'transparent',
                        width: '100%',
                        padding: 0,
                        caretColor: menuSearchFocused ? palette.primary.default : 'transparent',
                      }}
                    />
                    {!menuSearch && !menuSearchFocused && (
                      <span style={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '2px',
                        height: '26px',
                        backgroundColor: accentScale[80],
                        animation: 'menuCursorBlink 1s ease-in-out infinite',
                        pointerEvents: 'none',
                      }} />
                    )}
                  </div>
                </div>

                {/* Location tags */}
                <div data-menu-animate style={{ padding: mob ? '0 20px 16px' : '0 28px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={palette.primary.default} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span style={{
                      fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '300',
                      color: palette.primary.default, letterSpacing: '0.1em', textTransform: 'uppercase',
                    }}>Destinations</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {locationTags.map(tag => (
                      <span key={tag} style={{
                        fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '400',
                        color: accentScale[120], backgroundColor: accentScale[20],
                        padding: '7px 14px', borderRadius: '20px',
                        letterSpacing: '0.06em', textTransform: 'uppercase',
                        cursor: 'pointer',
                      }}>{tag}</span>
                    ))}
                    <span style={{
                      fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '400',
                      color: accentScale[120], backgroundColor: 'transparent',
                      padding: '7px 14px', borderRadius: '20px',
                      border: `1px solid ${accentScale[50]}`,
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}>View all →</span>
                  </div>
                </div>

                {/* Inspiration tags */}
                <div data-menu-animate style={{ padding: mob ? '8px 20px 24px' : '8px 28px 28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={palette.primary.default} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span style={{
                      fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '300',
                      color: palette.primary.default, letterSpacing: '0.1em', textTransform: 'uppercase',
                    }}>Inspiration</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {inspirationTags.map(tag => (
                      <span key={tag} style={{
                        fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '400',
                        color: accentScale[120], backgroundColor: accentScale[20],
                        padding: '7px 14px', borderRadius: '20px',
                        letterSpacing: '0.06em', textTransform: 'uppercase',
                        cursor: 'pointer',
                      }}>{tag}</span>
                    ))}
                    <span style={{
                      fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '400',
                      color: accentScale[120], backgroundColor: 'transparent',
                      padding: '7px 14px', borderRadius: '20px',
                      border: `1px solid ${accentScale[50]}`,
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}>View all →</span>
                  </div>
                </div>

                {/* Nav items */}
                <div style={{ padding: mob ? '0 20px' : '0 28px' }}>
                  {menuNavItems.map((label) => (
                    <div key={label} data-menu-animate style={{
                      borderTop: `1px solid ${accentScale[10]}`,
                      padding: '18px 0',
                      cursor: 'pointer',
                    }}>
                      <span style={{
                        fontFamily: FONT_HEADING,
                        fontSize: '16px',
                        fontWeight: '400',
                        color: palette.primary.default,
                        letterSpacing: '0.06em',
                      }}>{label}</span>
                    </div>
                  ))}
                </div>

                {/* CTA bar */}
                <div data-menu-animate style={{
                  backgroundColor: palette.primary.default,
                  margin: '12px 0 0',
                  padding: mob ? '20px 20px 24px' : '20px 28px 24px',
                }}>
                  <p style={{
                    fontFamily: FONT_HEADING, fontSize: '16px', fontWeight: '400',
                    color: palette.surface.stone, letterSpacing: '0.06em',
                    textTransform: 'uppercase', marginBottom: '8px',
                  }}>Speak to our experts</p>
                  <p style={{
                    fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '300',
                    color: palette.surface.stone, opacity: 0.7, lineHeight: 1.6,
                    letterSpacing: '0.04em',
                  }}>
                    MON-FRI  9:00am - 6:00pm<br />
                    SAT  10:00am - 4:30pm
                  </p>
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', marginTop: '12px',
                  }}>
                    <span style={{
                      fontFamily: FONT_BODY, fontSize: '15px', fontWeight: '500',
                      color: palette.surface.stone, letterSpacing: '0.06em',
                    }}>020 3993 4424</span>
                    <button style={{
                      fontFamily: FONT_BODY,
                      backgroundColor: palette.surface.stone,
                      color: palette.primary.default,
                      padding: '8px 20px',
                      borderRadius: '0',
                      border: 'none',
                      fontWeight: '400',
                      fontSize: '11px',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}>
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hero section */}
        <div style={{
          position: 'relative',
          minHeight: mob ? '480px' : '620px',
          marginTop: mob ? '-64px' : '-104px',
          overflow: 'hidden',
        }}>
          {heroSlides.map((slide, i) => (
            <div key={slide.src} style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${slide.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: i === heroSlide ? 1 : 0,
              transition: 'opacity 1.2s ease-in-out',
            }} />
          ))}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#10203719',
            zIndex: 1,
          }} />
          <div style={{
            position: 'relative',
            zIndex: 2,
            padding: mob ? '16px' : '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            minHeight: mob ? '480px' : '620px',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              padding: mob ? '0 16px' : 0,
            }}>
              <h1 style={{
                fontFamily: FONT_HEADING,
                color: palette.surface.stone,
                fontSize: mob ? TS['2xl'] : TS.hero,
                fontWeight: '400',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                lineHeight: 1.05,
                textAlign: 'center',
              }}>
                Guided by Curiosity
              </h1>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: mob ? 'center' : 'flex-end',
              width: '100%',
              marginTop: '8px',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                order: mob ? 0 : 1,
              }}>
                <span style={{
                  width: '5px',
                  height: '5px',
                  borderRadius: '50%',
                  backgroundColor: palette.surface.stone,
                  opacity: 0.6,
                  display: 'inline-block',
                }} />
                <span style={{
                  fontFamily: FONT_MONO,
                  color: palette.surface.stone,
                  fontSize: '10px',
                  fontWeight: '400',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  opacity: 0.7,
                }}>
                  {heroSlides[heroSlide].city}, {heroSlides[heroSlide].country}
                </span>
              </div>
              <button style={{
                fontFamily: FONT_BODY,
                backgroundColor: palette.surface.stone,
                color: palette.primary.default,
                padding: mob ? '12px 24px' : '14px 32px',
                borderRadius: '0',
                border: 'none',
                fontWeight: '500',
                fontSize: mob ? '13px' : '15px',
                order: mob ? 1 : 0,
              }}>
                Explore Destinations
              </button>
            </div>
          </div>
        </div>

        {/* Slide pagination line */}
        <div style={{
          display: 'flex',
          width: '100%',
          height: '1px',
        }}>
          {heroSlides.map((_, i) => (
            <div
              key={i}
              onClick={() => setHeroSlide(i)}
              style={{
                flex: 1,
                height: '1px',
                backgroundColor: palette.primary.default,
                opacity: i === heroSlide ? 1 : 0.15,
                transition: 'opacity 0.6s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        {/* Brand Statement */}
        <div style={{
          background: heroMode === 'dark'
            ? palette.primary.default
            : heroMode === 'offWhite'
              ? palette.surface.stone
              : '#FFFFFF',
          padding: mob ? '64px 20px 32px' : '120px 48px 48px',
          display: 'flex',
          flexDirection: mob ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: mob ? 'flex-start' : 'flex-end',
          gap: mob ? '28px' : '48px',
          transition: 'all 0.3s ease',
        }}>
          <p style={{
            fontFamily: FONT_HEADING,
            color: heroMode === 'dark' ? palette.primary.faded : palette.neutral[600],
            fontSize: mob ? '18px' : '24px',
            fontWeight: '300',
            maxWidth: '620px',
            lineHeight: 1.7,
            textAlign: 'left',
            margin: 0,
            transition: 'color 0.3s ease',
          }}>
            Since 1758, Cox &amp; Kings has helped curious travellers go beyond the obvious — crafting enriching, immersive journeys to the world's most remarkable destinations, built on a heritage of trust and expertise.
          </p>
          <div style={{ flexShrink: 0 }}>
            <button style={{
              fontFamily: FONT_BODY,
              backgroundColor: 'transparent',
              color: heroMode === 'dark' ? palette.surface.stone : palette.primary.default,
              padding: mob ? '12px 24px' : '14px 32px',
              borderRadius: '0',
              border: `1px solid ${heroMode === 'dark' ? palette.surface.stone : palette.primary.default}`,
              fontWeight: '500',
              fontSize: mob ? '13px' : '15px',
              transition: 'all 0.3s ease',
            }}>
              Our Story
            </button>
          </div>
        </div>

        {/* Journey Product Lines */}
        <div style={{
          background: '#FFFFFF',
          padding: mob ? '32px 20px' : '80px 48px',
          display: 'flex',
          flexDirection: mob ? 'column' : 'row',
          justifyContent: 'center',
          gap: mob ? '20px' : '64px',
          transition: 'all 0.3s ease',
        }}>
          {[
            { label: 'Small Group Tours', image: '/images/journey-small-group.png' },
            { label: 'Tailormade Journeys', image: '/images/journey-tailormade.png' },
          ].map((item) => (
            <div key={item.label} style={{
              position: 'relative',
              cursor: 'pointer',
              flex: mob ? 'none' : 1,
              aspectRatio: mob ? '16 / 9' : '4 / 3',
              overflow: 'hidden',
            }}>
              <img
                src={item.image}
                alt={item.label}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: '#10203719',
              }} />
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: mob ? '16px' : '24px',
              }}>
                <p style={{
                  fontFamily: FONT_HEADING,
                  color: palette.surface.stone,
                  fontSize: mob ? '28px' : '56px',
                  fontWeight: '400',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  lineHeight: 1.05,
                  margin: 0,
                }}>
                  {item.label}
                </p>
                <button style={{
                  fontFamily: FONT_BODY,
                  backgroundColor: palette.surface.stone,
                  color: palette.primary.default,
                  padding: mob ? '10px 24px' : '14px 32px',
                  borderRadius: '0',
                  border: 'none',
                  fontWeight: '500',
                  fontSize: mob ? '12px' : '13px',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  marginTop: mob ? '16px' : '24px',
                  cursor: 'pointer',
                }}>
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Destinations Module */}
        <div style={{
          background: palette.surface.stone,
          padding: mob ? '48px 0 48px' : '80px 0 0',
          transition: 'all 0.3s ease',
          overflow: 'hidden',
        }}>
          {/* Top row */}
          <div style={{
            display: 'flex',
            flexDirection: mob ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: mob ? 'flex-start' : 'flex-start',
            marginBottom: mob ? '24px' : '48px',
            padding: mob ? '0 20px' : '0 48px',
            gap: mob ? '16px' : 0,
          }}>
            <h2 style={{
              fontFamily: FONT_HEADING,
              fontSize: mob ? '24px' : '32px',
              fontWeight: '400',
              color: palette.primary.default,
              letterSpacing: '0.02em',
              margin: 0,
            }}>
              Destinations
            </h2>
            {!mob && (
              <button style={{
                fontFamily: FONT_BODY,
                backgroundColor: palette.primary.default,
                color: palette.surface.stone,
                padding: '14px 32px',
                borderRadius: '0',
                border: 'none',
                fontWeight: '500',
                fontSize: '13px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                flexShrink: 0,
              }}>
                View All Destinations
              </button>
            )}
          </div>

          {/* Content row */}
          {mob ? (
            <>
              {/* Mobile: description */}
              <div style={{ padding: '0 24px 32px' }}>
                <p style={{
                  fontFamily: FONT_BODY,
                  fontSize: '20px',
                  fontWeight: '400',
                  color: palette.primary.default,
                  lineHeight: 1.55,
                  margin: 0,
                }}>
                  If you are looking for the best holiday destinations, Cox &amp; Kings offers worldwide holidays to some of the most fascinating parts of the globe.
                </p>
              </div>

              {/* Mobile: horizontal scroll shapes — edge bleed */}
              <div
                ref={destScrollRef}
                onScroll={(e) => {
                  const el = e.currentTarget;
                  const cardW = el.scrollWidth / destRegions.length;
                  const idx = Math.round(el.scrollLeft / cardW);
                  if (idx !== destSlide && idx >= 0 && idx < destRegions.length) setDestSlide(idx);
                }}
                style={{
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  WebkitOverflowScrolling: 'touch',
                  display: 'flex',
                  gap: '16px',
                  paddingLeft: '24px',
                  paddingRight: '24px',
                  paddingBottom: '8px',
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none',
                  scrollSnapType: 'x mandatory',
                }}
              >
                <style>{`
                  .dest-mob-scroll::-webkit-scrollbar { display: none; }
                `}</style>
                {destRegions.map((region, idx) => {
                  const hasImage = !!region.image;
                  const clipId = `dest-clip-mob-${idx}`;
                  const vb = region.viewBox.split(' ').map(Number);
                  return (
                    <div key={region.name} className="dest-mob-scroll" style={{
                      position: 'relative',
                      flexShrink: 0,
                      width: '38vw',
                      scrollSnapAlign: 'start',
                    }}
                      onClick={() => setDestSlide(idx)}
                    >
                      <svg viewBox={region.viewBox} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', overflow: 'hidden' }}>
                        <defs>
                          <clipPath id={clipId}>
                            <path d={region.d} />
                          </clipPath>
                        </defs>
                        <g clipPath={`url(#${clipId})`}>
                          <path d={region.d} fill={palette.primary.default} />
                          {hasImage && (
                            <>
                              <image
                                href={region.image}
                                x="0" y="0"
                                width={vb[2]} height={vb[3]}
                                preserveAspectRatio="xMidYMid slice"
                              />
                              <rect x="0" y="0" width={vb[2]} height={vb[3]}
                                fill="#102037" fillOpacity="0.15"
                              />
                            </>
                          )}
                        </g>
                      </svg>
                      <div style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', padding: '12px',
                      }}>
                        <p style={{
                          fontFamily: FONT_HEADING,
                          color: palette.surface.stone,
                          fontSize: '22px',
                          fontWeight: '400',
                          textAlign: 'center',
                          lineHeight: 1.1,
                          margin: 0,
                          whiteSpace: 'pre-line',
                        }}>
                          {region.name}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile: bottom nav */}
              <div style={{ padding: '24px 24px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  onClick={() => {
                    const next = (destSlide - 1 + destRegions.length) % destRegions.length;
                    setDestSlide(next);
                    if (destScrollRef.current) {
                      const cardW = destScrollRef.current.scrollWidth / destRegions.length;
                      destScrollRef.current.scrollTo({ left: next * cardW, behavior: 'smooth' });
                    }
                  }}
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.primary.default} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </div>
                <div style={{ flex: 1, position: 'relative' }}>
                  <div style={{ height: '1px', backgroundColor: palette.neutral[200], width: '100%' }} />
                  <div style={{
                    position: 'absolute', top: 0, left: 0, height: '1px',
                    backgroundColor: palette.primary.default,
                    width: `${((destSlide + 1) / destRegions.length) * 100}%`,
                    transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                    <span style={{
                      fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '500',
                      color: palette.primary.default, letterSpacing: '0.03em',
                    }}>
                      {destRegions[destSlide].name.replace('\n', ' ')}
                    </span>
                    <span style={{
                      fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '500',
                      color: palette.neutral[400], letterSpacing: '0.06em',
                    }}>
                      {destSlide + 1} / {destRegions.length}
                    </span>
                  </div>
                </div>
                <div
                  onClick={() => {
                    const next = (destSlide + 1) % destRegions.length;
                    setDestSlide(next);
                    if (destScrollRef.current) {
                      const cardW = destScrollRef.current.scrollWidth / destRegions.length;
                      destScrollRef.current.scrollTo({ left: next * cardW, behavior: 'smooth' });
                    }
                  }}
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', flexShrink: 0 }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.primary.default} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </div>
              </div>
            </>
          ) : (
            <div style={{
              display: 'flex',
              gap: '48px',
              alignItems: 'flex-end',
            }}>
              {/* Description text */}
              <div style={{ padding: '0 64px 80px 48px', flexShrink: 0, width: '30%' }}>
                <p style={{
                  fontFamily: FONT_BODY,
                  fontSize: '18px',
                  fontWeight: '300',
                  color: palette.primary.default,
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  If you are looking for the best holiday destinations, Cox &amp; Kings offers worldwide holidays to some of the most fascinating parts of the globe.
                </p>

                {/* "You are here" anchor */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '36px', cursor: 'pointer' }}>
                  <style>{`
                    @keyframes youAreHerePing {
                      0% { transform: scale(1); opacity: 0.45; }
                      70% { transform: scale(2.4); opacity: 0; }
                      100% { transform: scale(2.4); opacity: 0; }
                    }
                    @keyframes youAreHerePing2 {
                      0% { transform: scale(1); opacity: 0.25; }
                      70% { transform: scale(3.2); opacity: 0; }
                      100% { transform: scale(3.2); opacity: 0; }
                    }
                  `}</style>
                  <div style={{ position: 'relative', width: '18px', height: '18px', flexShrink: 0 }}>
                    <span style={{
                      position: 'absolute', top: '50%', left: '50%',
                      width: '10px', height: '10px', marginTop: '-5px', marginLeft: '-5px',
                      borderRadius: '50%', backgroundColor: accentScale[80],
                      animation: 'youAreHerePing 2.4s cubic-bezier(0, 0, 0.2, 1) infinite',
                    }} />
                    <span style={{
                      position: 'absolute', top: '50%', left: '50%',
                      width: '10px', height: '10px', marginTop: '-5px', marginLeft: '-5px',
                      borderRadius: '50%', backgroundColor: accentScale[80],
                      animation: 'youAreHerePing2 2.4s cubic-bezier(0, 0, 0.2, 1) infinite',
                      animationDelay: '0.6s',
                    }} />
                    <span style={{
                      position: 'absolute', top: '50%', left: '50%',
                      width: '10px', height: '10px', marginTop: '-5px', marginLeft: '-5px',
                      borderRadius: '50%', backgroundColor: palette.primary.default, zIndex: 1,
                    }} />
                  </div>
                  <span style={{
                    fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '600',
                    letterSpacing: '0.12em', textTransform: 'uppercase', color: palette.primary.default,
                  }}>You are here — Start exploring</span>
                </div>
              </div>

              {/* Shapes slider */}
              <div
                style={{
                  flex: 1,
                  overflow: 'hidden',
                  alignSelf: 'stretch',
                  display: 'flex',
                  alignItems: 'flex-end',
                  cursor: destDrag.current.active ? 'grabbing' : 'grab',
                  userSelect: 'none',
                }}
                onPointerDown={(e) => {
                  destDrag.current = { active: true, dragged: false, startX: e.clientX, startSlide: destSlide };
                  e.currentTarget.setPointerCapture(e.pointerId);
                }}
                onPointerMove={(e) => {
                  if (!destDrag.current.active) return;
                  const dx = e.clientX - destDrag.current.startX;
                  if (Math.abs(dx) > 5) destDrag.current.dragged = true;
                  const slideWidth = 400 + 28;
                  const slidesOffset = Math.round(-dx / slideWidth);
                  if (Math.abs(dx) > slideWidth * 0.2) {
                    const next = Math.max(0, Math.min(destRegions.length - 1, destDrag.current.startSlide + slidesOffset));
                    if (next !== destSlide) setDestSlide(next);
                  }
                }}
                onPointerUp={() => { destDrag.current.active = false; }}
                onPointerCancel={() => { destDrag.current.active = false; }}
              >
                <div style={{
                  display: 'flex',
                  gap: '28px',
                  alignItems: 'flex-end',
                  transform: `translateX(-${destSlide * (400 + 28)}px)`,
                  transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                }}>
                  {destRegions.map((region, idx) => {
                    const isActive = idx === destSlide;
                    const hasImage = !!region.image;
                    const clipId = `dest-clip-${idx}`;
                    const vb = region.viewBox.split(' ').map(Number);
                    return (
                      <div key={region.name} style={{
                        position: 'relative',
                        flexShrink: 0,
                        width: '400px',
                      }}
                        onClick={() => { if (!destDrag.current.dragged) setDestSlide(idx); }}
                        onMouseEnter={() => setDestHover(idx)}
                        onMouseLeave={() => setDestHover(-1)}
                      >
                        <svg viewBox={region.viewBox} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', overflow: 'hidden' }}>
                          <defs>
                            <clipPath id={clipId}>
                              <path d={region.d} />
                            </clipPath>
                          </defs>
                          <g clipPath={`url(#${clipId})`}>
                            <path d={region.d} fill={palette.primary.default} />
                            {hasImage && (
                              <>
                                <image
                                  href={region.image}
                                  x="0" y="0"
                                  width={vb[2]} height={vb[3]}
                                  preserveAspectRatio="xMidYMid slice"
                                  style={{
                                    opacity: (isActive || destHover === idx) ? 1 : 0,
                                    transition: 'opacity 0.6s ease, transform 0.5s ease',
                                    transformOrigin: `${vb[2] / 2}px ${vb[3] / 2}px`,
                                    transform: destHover === idx ? 'scale(1.05)' : 'scale(1)',
                                  }}
                                />
                                <rect x="0" y="0" width={vb[2]} height={vb[3]}
                                  fill="#102037" fillOpacity="0.10"
                                  style={{ opacity: (isActive || destHover === idx) ? 1 : 0, transition: 'opacity 0.6s ease' }}
                                />
                              </>
                            )}
                            <rect x="0" y="0" width={vb[2]} height={vb[3]}
                              fill={palette.primary.default}
                              style={{ opacity: destHover === idx && !isActive ? 0.25 : 0, transition: 'opacity 0.3s ease', pointerEvents: 'none' }}
                            />
                          </g>
                        </svg>
                        <div style={{
                          position: 'absolute', inset: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px',
                        }}>
                          <p style={{
                            fontFamily: FONT_HEADING, color: palette.surface.stone,
                            fontSize: '40px', fontWeight: '400', textAlign: 'center',
                            lineHeight: 1.15, margin: 0, whiteSpace: 'pre-line',
                          }}>
                            {region.name}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Region navigation bar — desktop only */}
          {!mob && (
            <div style={{ display: 'flex', gap: '48px', marginTop: '80px', paddingBottom: '48px' }}>
              <div style={{ flexShrink: 0, width: '30%', padding: '0 0 0 48px', display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div
                    onClick={() => setDestSlide((prev) => (prev - 1 + destRegions.length) % destRegions.length)}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.primary.default} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </div>
                  <span style={{
                    fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '500',
                    color: palette.neutral[400], letterSpacing: '0.06em', textTransform: 'uppercase',
                  }}>
                    {destSlide + 1} / {destRegions.length}
                  </span>
                  <div
                    onClick={() => setDestSlide((prev) => (prev + 1) % destRegions.length)}
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.primary.default} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{
                  position: 'relative',
                  width: `${destRegions.length * (400 + 28) - 28}px`,
                  transform: `translateX(-${destSlide * (400 + 28)}px)`,
                  transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                }}>
                  <div style={{ height: '1px', backgroundColor: palette.neutral[200], width: '100%' }}/>
                  <div style={{
                    position: 'absolute', top: 0, left: 0, height: '1px',
                    backgroundColor: palette.primary.default,
                    width: `${((destSlide + 1) / destRegions.length) * 100}%`,
                    transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}/>
                  <div style={{ display: 'flex' }}>
                    {destRegions.map((region, i) => (
                      <div
                        key={region.name}
                        onClick={() => setDestSlide(i)}
                        style={{
                          width: '400px',
                          marginRight: i < destRegions.length - 1 ? '28px' : 0,
                          flexShrink: 0,
                          cursor: 'pointer',
                        }}
                      >
                        <span style={{
                          display: 'block', marginTop: '12px',
                          fontFamily: FONT_BODY, fontSize: '11px',
                          fontWeight: i === destSlide ? '500' : '400',
                          color: i === destSlide ? palette.primary.default : palette.neutral[400],
                          letterSpacing: '0.03em', whiteSpace: 'nowrap',
                          transition: 'color 0.3s ease',
                        }}>
                          {region.name.replace('\n', ' ')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Spacer */}
        <div style={{
          background: heroMode === 'dark'
            ? palette.primary.default
            : heroMode === 'offWhite'
              ? palette.surface.stone
              : '#FFFFFF',
          padding: mob ? '60px 20px' : '120px 48px',
          transition: 'all 0.3s ease',
        }} />
      </div>
    </div>
  );
}
