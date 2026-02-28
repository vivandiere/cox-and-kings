import React, { useState, useEffect, useRef } from 'react';
import { palette } from '../tokens/index.js';
import { FONT_HEADING, FONT_BODY, FONT_MONO, TS } from '../tokens/index.js';
import { Search, Phone, ChevronRight, ChevronDown, X, SlidersHorizontal, Landmark, BookOpen, UtensilsCrossed, Leaf, Binoculars, Mountain, Camera, Sparkles, Compass, Crown, Building2, Gem } from 'lucide-react';
import { LogoInline, LogoStacked } from '../components/Logo.jsx';

const UTIL_H = 35;
const NAV_H  = 68;

// ── Data ──────────────────────────────────────────────────────────────────────

const ALL_PRODUCTS = [
  { id: 1,  title: 'The Grand Tour of India',         location: 'Agra, India',               region: 'Indian Subcontinent',        days: 17, price: '£4,095', img: '/images/hero-01.png',                         stops: ['Delhi', 'Agra', 'Jaipur', 'Udaipur', 'Varanasi'],         type: 'small-group', level: 2, offer: 'Save £500', interests: ['Culture & History', 'Art & Architecture'], accommodation: 'Luxury'    },
  { id: 2,  title: 'Grand Tour of South America',     location: 'Lima, Peru',                region: 'South America',              days: 17, price: '£4,695', img: '/images/dest-south-america.png',              stops: ['Lima', 'Cuzco', 'Aguas Calientes', 'Buenos Aires'],        type: 'small-group', level: 2, offer: 'Save £500', interests: ['Adventure', 'Nature & Wildlife'],            accommodation: 'Standard'  },
  { id: 3,  title: 'Highlights of Japan',             location: 'Kyoto, Japan',              region: 'Far East',                   days: 12, price: '£4,295', img: '/images/dest-far-east.png',                   stops: ['Tokyo', 'Hakone', 'Kyoto', 'Hiroshima'],                   type: 'small-group', level: 1,                       interests: ['Culture & History', 'Food & Wine'],          accommodation: 'Superior'  },
  { id: 4,  title: 'Kenya Safari',                    location: 'Masai Mara, Kenya',         region: 'Africa',                     days: 12, price: '£4,795', img: '/images/dest-africa.png',                     stops: ['Nairobi', 'Amboseli', 'Masai Mara', 'Lake Nakuru'],        type: 'small-group', level: 2, offer: 'Save £400', interests: ['Safari', 'Nature & Wildlife'],               accommodation: 'Discovery' },
  { id: 5,  title: 'Morocco Discovery',               location: 'Marrakech, Morocco',        region: 'North Africa & Middle East', days: 10, price: '£2,195', img: '/images/dest-north-africa-middle-east.png',   stops: ['Marrakech', 'Atlas Mountains', 'Sahara', 'Fes'],           type: 'small-group', level: 2,                       interests: ['Culture & History', 'Photography'],          accommodation: 'Standard'  },
  { id: 6,  title: 'Patagonia Explorer',              location: 'Torres del Paine, Chile',   region: 'South America',              days: 16, price: '£5,495', img: '/images/dest-south-america.png',              stops: ['Buenos Aires', 'El Calafate', 'Torres del Paine'],         type: 'tailormade',  level: 3,                       interests: ['Adventure', 'Nature & Wildlife'],            accommodation: 'Discovery' },
  { id: 7,  title: 'Kerala & the Backwaters',         location: 'Kerala, India',             region: 'Indian Subcontinent',        days: 14, price: '£3,895', img: '/images/dest-india-subcontinent.png',         stops: ['Cochin', 'Munnar', 'Periyar', 'Kumarakom'],                type: 'tailormade',  level: 1,                       interests: ['Nature & Wildlife', 'Wellness'],             accommodation: 'Luxury'    },
  { id: 8,  title: 'Silk Road Adventure',             location: 'Samarkand, Uzbekistan',     region: 'Central Asia',               days: 15, price: '£4,195', img: '/images/dest-central-asia.png',               stops: ['Tashkent', 'Samarkand', 'Bukhara', 'Khiva'],               type: 'small-group', level: 2,                       interests: ['Culture & History', 'Art & Architecture'],  accommodation: 'Standard'  },
  { id: 9,  title: 'Classical Italy',                 location: 'Rome, Italy',               region: 'Europe',                     days: 14, price: '£3,895', img: '/images/dest-europe.png',                     stops: ['Rome', 'Florence', 'Venice', 'Amalfi'],                    type: 'small-group', level: 1,                       interests: ['Art & Architecture', 'Food & Wine'],         accommodation: 'Superior'  },
  { id: 10, title: 'Tanzania & Zanzibar',             location: 'Serengeti, Tanzania',       region: 'Africa',                     days: 14, price: '£5,295', img: '/images/dest-africa.png',                     stops: ['Arusha', 'Serengeti', 'Ngorongoro', 'Zanzibar'],           type: 'tailormade',  level: 2,                       interests: ['Safari', 'Nature & Wildlife'],               accommodation: 'Discovery' },
  { id: 11, title: 'Wonders of Jordan',               location: 'Petra, Jordan',             region: 'North Africa & Middle East', days: 10, price: '£2,995', img: '/images/dest-north-africa-middle-east.png',   stops: ['Amman', 'Jerash', 'Petra', 'Wadi Rum'],                    type: 'small-group', level: 2,                       interests: ['Culture & History', 'Art & Architecture'],  accommodation: 'Standard'  },
  { id: 12, title: 'South Africa Explorer',           location: 'Cape Town, South Africa',   region: 'Africa',                     days: 13, price: '£3,895', img: '/images/dest-africa.png',                     stops: ['Cape Town', 'Winelands', 'Garden Route', 'Kruger'],        type: 'tailormade',  level: 1,                       interests: ['Safari', 'Nature & Wildlife'],               accommodation: 'Luxury'    },
  { id: 13, title: 'Exotic India — Solo Travellers',  location: 'New Delhi, India',          region: 'Indian Subcontinent',        days: 14, price: '£4,295', img: '/images/hero-02.png',                         stops: ['New Delhi', 'Agra', 'Rajasthan', 'Jaipur', 'Udaipur'],     type: 'small-group', level: 2, offer: 'Save £300', interests: ['Culture & History', 'Photography'],          accommodation: 'Standard'  },
  { id: 14, title: 'Peru Uncovered',                  location: 'Cusco, Peru',               region: 'South America',              days: 14, price: '£3,695', img: '/images/dest-south-america.png',              stops: ['Lima', 'Cusco', 'Sacred Valley', 'Machu Picchu'],          type: 'tailormade',  level: 2,                       interests: ['Adventure', 'Photography'],                  accommodation: 'Luxury'    },
  { id: 15, title: 'Iberian Discovery',               location: 'Seville, Spain',            region: 'Europe',                     days: 12, price: '£3,295', img: '/images/dest-europe.png',                     stops: ['Madrid', 'Seville', 'Granada', 'Barcelona'],               type: 'small-group', level: 1,                       interests: ['Art & Architecture', 'Food & Wine'],         accommodation: 'Superior'  },
];

const REGIONS_LIST  = ['Africa', 'Central Asia', 'Europe', 'Far East', 'Indian Subcontinent', 'North Africa & Middle East', 'South America'];
const DURATION_OPTS = [
  { label: '4–9 Days',   min: 4,  max: 9  },
  { label: '10–14 Days', min: 10, max: 14 },
  { label: '15+ Days',   min: 15, max: 99 },
];
const INTERESTS_LIST = [
  { label: 'Art & Architecture', icon: Landmark        },
  { label: 'Culture & History',  icon: BookOpen        },
  { label: 'Food & Wine',        icon: UtensilsCrossed },
  { label: 'Nature & Wildlife',  icon: Leaf            },
  { label: 'Safari',             icon: Binoculars      },
  { label: 'Adventure',          icon: Mountain        },
  { label: 'Photography',        icon: Camera          },
  { label: 'Wellness',           icon: Sparkles        },
];

const ACCOMMODATIONS_LIST = [
  { label: 'Discovery', icon: Compass   },
  { label: 'Luxury',    icon: Crown     },
  { label: 'Standard',  icon: Building2 },
  { label: 'Superior',  icon: Gem       },
];

const PRICE_MIN = 1000;
const PRICE_MAX = 6000;
const parsePrice = (str) => parseInt(str.replace(/[^0-9]/g, ''), 10);

const POPULAR       = ['India', 'Peru', 'Japan', 'Morocco', 'Kenya', 'Tanzania'];
const PRIMARY_NAV   = ['Destinations', 'Small Group Tours', 'Tailor-Made Journeys'];
const SECONDARY_NAV = ['Holiday Types', 'Solo Travel', 'Specialist-led Tours', 'Offers', 'About Us', 'Brochure'];

// ── Filter chip ───────────────────────────────────────────────────────────────

function Chip({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '400',
      letterSpacing: '0.06em', textTransform: 'uppercase',
      border: `1px solid ${palette.neutral[300]}`,
      backgroundColor: active ? palette.neutral[100] : 'transparent',
      color: palette.primary.default,
      padding: '5px 12px', borderRadius: '20px',
      cursor: 'pointer', transition: 'all 0.15s ease',
      whiteSpace: 'nowrap', lineHeight: 1.4,
    }}>
      {label}
    </button>
  );
}

// ── Price range slider ────────────────────────────────────────────────────────

function PriceSlider({ min, max, value, onChange }) {
  const trackRef = useRef(null);
  // Use a ref so the stable event listeners always see current state/callbacks
  const live = useRef({ dragging: null, value, onChange, min, max });
  live.current = { ...live.current, value, onChange };

  const pct = (v) => ((v - min) / (max - min)) * 100;

  useEffect(() => {
    const snap = (v) =>
      Math.round(Math.max(live.current.min, Math.min(live.current.max, v)) / 100) * 100;

    const getVal = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      return snap(live.current.min + ratio * (live.current.max - live.current.min));
    };

    const onMove = (e) => {
      const { dragging, value: v, onChange: cb } = live.current;
      if (!dragging) return;
      if (e.cancelable) e.preventDefault();
      const newVal = getVal(e);
      if (dragging === 'min') cb([Math.min(newVal, v[1] - 100), v[1]]);
      else                    cb([v[0], Math.max(newVal, v[0] + 100)]);
    };
    const onUp = () => { live.current.dragging = null; };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup',   onUp);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend',  onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup',   onUp);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend',  onUp);
    };
  }, []);

  return (
    <div style={{ padding: '4px 4px 8px' }}>
      {/* Track */}
      <div ref={trackRef} style={{
        position: 'relative', height: '2px',
        backgroundColor: palette.neutral[200], borderRadius: '2px',
        margin: '18px 8px 22px', cursor: 'pointer',
      }}>
        {/* Selected fill */}
        <div style={{
          position: 'absolute', height: '100%', borderRadius: '2px',
          left: `${pct(value[0])}%`, right: `${100 - pct(value[1])}%`,
          backgroundColor: palette.primary.default,
        }} />
        {/* Handles */}
        {['min', 'max'].map(handle => (
          <div
            key={handle}
            onMouseDown={(e) => { e.preventDefault(); live.current.dragging = handle; }}
            onTouchStart={() => { live.current.dragging = handle; }}
            style={{
              position: 'absolute', top: '50%',
              left: `${pct(handle === 'min' ? value[0] : value[1])}%`,
              transform: 'translate(-50%, -50%)',
              width: '14px', height: '14px',
              backgroundColor: palette.surface.stone,
              border: `1.5px solid ${palette.primary.default}`,
              borderRadius: '50%', cursor: 'grab',
              boxShadow: '0 1px 4px rgba(16,32,55,0.18)',
              zIndex: 2,
            }}
          />
        ))}
      </div>

      {/* Value labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '500', color: palette.primary.default }}>
          £{value[0].toLocaleString()}
        </span>
        <span style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: palette.neutral[400] }}>
          to
        </span>
        <span style={{ fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '500', color: palette.primary.default }}>
          £{value[1].toLocaleString()}
        </span>
      </div>
    </div>
  );
}

function IconChip({ icon: Icon, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: '6px',
      fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '400',
      letterSpacing: '0.06em', textTransform: 'uppercase',
      border: `1px solid ${palette.neutral[300]}`,
      backgroundColor: active ? palette.neutral[100] : 'transparent',
      color: palette.primary.default,
      padding: '5px 12px 5px 10px', borderRadius: '20px',
      cursor: 'pointer', transition: 'all 0.15s ease',
      whiteSpace: 'nowrap', lineHeight: 1.4,
    }}>
      <Icon size={12} strokeWidth={1.5} />
      {label}
    </button>
  );
}

// ── Filter accordion ──────────────────────────────────────────────────────────

function FilterSection({ title, defaultOpen = true, plain = false, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: '2px' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '11px 10px',
        border: 'none', borderBottom: `1px solid ${palette.neutral[200]}`,
        backgroundColor: 'transparent',
        cursor: 'pointer',
        fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '500', letterSpacing: '0.1em',
        textTransform: 'uppercase', color: palette.primary.default,
      }}>
        {title}
        <ChevronDown size={12} strokeWidth={1.5} color={palette.neutral[400]}
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', flexShrink: 0 }} />
      </button>
      {open && <div style={{ padding: '12px 4px 16px' }}>{children}</div>}
    </div>
  );
}

// ── V1 Product Card ───────────────────────────────────────────────────────────

function ProductCard({ p, compact = false }) {
  const imgH = compact ? '150px' : '190px';
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      backgroundColor: palette.surface.stone,
      boxShadow: '0 2px 12px rgba(16,32,55,0.08)',
      padding: '6px 6px 0',
    }}>
      <div style={{ position: 'relative', zIndex: 1, marginBottom: '-16px' }}>
        <img
          src={p.img} alt={p.title}
          style={{ width: '100%', height: imgH, objectFit: 'cover', display: 'block', borderRadius: '16px' }}
        />
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '400',
            letterSpacing: '0.06em', textTransform: 'uppercase',
            backgroundColor: palette.surface.stone, color: palette.primary.default,
            border: `1px solid ${palette.neutral[200]}`,
            padding: '5px 12px', borderRadius: '20px',
          }}>
            {p.type === 'small-group' ? 'Small Group Tour' : 'Tailormade'}
          </span>
          {p.offer && (
            <span style={{
              fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '400',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              backgroundColor: palette.primary.default, color: palette.surface.stone,
              padding: '5px 12px', borderRadius: '20px',
            }}>{p.offer}</span>
          )}
        </div>
        <span style={{
          position: 'absolute', bottom: '14px', right: '12px',
          fontFamily: FONT_MONO, color: 'rgb(242,242,235)',
          fontSize: '9px', letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.7,
        }}>
          {p.location}
        </span>
      </div>
      <div style={{ padding: compact ? '22px 14px 18px' : '26px 16px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h4 style={{
          fontFamily: FONT_HEADING, fontSize: compact ? '16px' : TS.lg, fontWeight: '500',
          color: palette.primary.default, marginBottom: '5px', lineHeight: 1.2,
        }}>{p.title}</h4>
        <p style={{
          fontFamily: FONT_BODY, fontSize: TS.sm, fontWeight: '500',
          color: palette.primary.default, letterSpacing: '0.04em',
          textTransform: 'uppercase', marginBottom: '10px',
        }}>
          {p.days} Days &bull; Limited to 18 Guests
        </p>
        <p style={{
          fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '300',
          color: palette.neutral[400], textTransform: 'uppercase',
          letterSpacing: '0.06em', marginBottom: '4px',
        }}>Itinerary</p>
        <p style={{
          fontFamily: FONT_MONO, fontSize: '10px', fontWeight: '400',
          color: palette.primary.default, lineHeight: 1.6, marginBottom: '14px',
          letterSpacing: '0.04em',
        }}>
          {p.stops.map((s, i) => (
            <React.Fragment key={s}>
              {s}{i < p.stops.length - 1 && <span style={{ margin: '0 4px', color: palette.neutral[300] }}>&bull;</span>}
            </React.Fragment>
          ))}
        </p>
        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <p style={{ fontFamily: FONT_BODY, fontSize: TS.bodyLg, fontWeight: '400', color: palette.primary.default }}>
            From {p.price}
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px' }}>
            <span style={{
              fontFamily: FONT_BODY, fontSize: '9px', fontWeight: '500',
              color: palette.neutral[400], textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>Level:</span>
            <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end' }}>
              {[8, 12, 16].map((h, i) => (
                <div key={i} style={{
                  width: '4px', height: `${h}px`, borderRadius: '1px',
                  backgroundColor: i < p.level ? palette.primary.default : palette.neutral[200],
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Filter content (shared between sidebar and mobile panel) ──────────────────

function FilterContent({ journeyType, setJourneyType, regions, toggleRegion, durations, toggleDuration, interests, toggleInterest, accommodations, toggleAccommodation, priceRange, setPriceRange, mobile = false }) {
  return (
    <>
      <FilterSection title="Region" defaultOpen={true} plain={mobile}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {REGIONS_LIST.map(r => (
            <Chip key={r} label={r} active={regions.has(r)} onClick={() => toggleRegion(r)} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Travel Style" defaultOpen={true} plain={mobile}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          <Chip label="Small Group Tours" active={journeyType === 'small-group'} onClick={() => setJourneyType(journeyType === 'small-group' ? 'all' : 'small-group')} />
          <Chip label="Tailor-Made"       active={journeyType === 'tailormade'}  onClick={() => setJourneyType(journeyType === 'tailormade' ? 'all' : 'tailormade')} />
        </div>
      </FilterSection>

      <FilterSection title="Duration" defaultOpen={true} plain={mobile}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {DURATION_OPTS.map(d => (
            <Chip key={d.label} label={d.label} active={durations.has(d.label)} onClick={() => toggleDuration(d.label)} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Activity Level" defaultOpen={!mobile} plain={mobile}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[{ label: 'Leisurely', level: 1 }, { label: 'Moderate', level: 2 }, { label: 'Active', level: 3 }].map(({ label, level }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end' }}>
                {[8, 12, 16].map((h, i) => (
                  <div key={i} style={{ width: '4px', height: `${h}px`, borderRadius: '1px', backgroundColor: i < level ? palette.primary.default : palette.neutral[200] }} />
                ))}
              </div>
              <span style={{ fontFamily: FONT_BODY, fontSize: '12px', color: palette.primary.default }}>{label}</span>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Interests" defaultOpen={true} plain={mobile}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {INTERESTS_LIST.map(({ label, icon }) => (
            <IconChip key={label} icon={icon} label={label} active={interests.has(label)} onClick={() => toggleInterest(label)} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Accommodation" defaultOpen={true} plain={mobile}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {ACCOMMODATIONS_LIST.map(({ label, icon }) => (
            <IconChip key={label} icon={icon} label={label} active={accommodations.has(label)} onClick={() => toggleAccommodation(label)} />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price Range" defaultOpen={true} plain={mobile}>
        <PriceSlider min={PRICE_MIN} max={PRICE_MAX} value={priceRange} onChange={setPriceRange} />
      </FilterSection>
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function JourneyFinderPage() {
  const [winW,            setWinW]           = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [scrolled,        setScrolled]       = useState(false);
  const [drawerOpen,      setDrawerOpen]     = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [journeyType,     setJourneyType]    = useState('all');
  const [regions,         setRegions]        = useState(new Set());
  const [durations,       setDurations]      = useState(new Set());
  const [interests,       setInterests]      = useState(new Set());
  const [accommodations,  setAccommodations] = useState(new Set());
  const [priceRange,      setPriceRange]     = useState([PRICE_MIN, PRICE_MAX]);
  const [query,           setQuery]          = useState('');

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Trigger compact nav early — just as the search input starts to scroll away
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Lock body scroll when mobile filter open
  useEffect(() => {
    document.body.style.overflow = mobileFilterOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileFilterOpen]);

  const isMobile = winW < 860;
  const compact  = scrolled || drawerOpen;

  const toggleRegion       = (r) => setRegions(prev        => { const n = new Set(prev); n.has(r) ? n.delete(r) : n.add(r); return n; });
  const toggleDuration     = (d) => setDurations(prev      => { const n = new Set(prev); n.has(d) ? n.delete(d) : n.add(d); return n; });
  const toggleInterest     = (i) => setInterests(prev      => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  const toggleAccommodation = (a) => setAccommodations(prev => { const n = new Set(prev); n.has(a) ? n.delete(a) : n.add(a); return n; });
  const clearAll           = () => { setRegions(new Set()); setDurations(new Set()); setInterests(new Set()); setAccommodations(new Set()); setPriceRange([PRICE_MIN, PRICE_MAX]); setJourneyType('all'); setQuery(''); };

  const priceActive       = priceRange[0] > PRICE_MIN || priceRange[1] < PRICE_MAX;
  const hasFilters        = regions.size > 0 || durations.size > 0 || interests.size > 0 || accommodations.size > 0 || priceActive || journeyType !== 'all' || !!query;
  const activeFilterCount = regions.size + durations.size + interests.size + accommodations.size + (priceActive ? 1 : 0) + (journeyType !== 'all' ? 1 : 0) + (query ? 1 : 0);

  const filtered = ALL_PRODUCTS.filter(p => {
    if (journeyType !== 'all' && p.type !== journeyType) return false;
    if (regions.size > 0 && !regions.has(p.region)) return false;
    if (durations.size > 0) {
      const hit = [...durations].some(d => {
        const o = DURATION_OPTS.find(x => x.label === d);
        return o && p.days >= o.min && p.days <= o.max;
      });
      if (!hit) return false;
    }
    if (interests.size > 0 && !p.interests.some(i => interests.has(i))) return false;
    if (accommodations.size > 0 && !accommodations.has(p.accommodation)) return false;
    if (priceActive) {
      const price = parsePrice(p.price);
      if (price < priceRange[0] || price > priceRange[1]) return false;
    }
    if (query) {
      const q = query.toLowerCase();
      if (!p.title.toLowerCase().includes(q) && !p.location.toLowerCase().includes(q) && !p.region.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const countByType = (t) => t === 'all' ? ALL_PRODUCTS.length : ALL_PRODUCTS.filter(p => p.type === t).length;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: palette.surface.stone }}>
      <style>{`
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        .jf-search::placeholder{color:rgba(242,242,235,0.35);opacity:1}
        .jf-search:focus{outline:none}
        .jf-search{caret-color:rgba(242,242,235,0.8);}
        .jf-panel{animation:slideUp 0.28s cubic-bezier(0.4,0,0.2,1)}
        @keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
      `}</style>

      {/* ── Sticky nav ──────────────────────────────────────────────────── */}
      <div style={{ position: 'sticky', top: 0, zIndex: 30 }}>

        {/* Utility bar — hidden on mobile to save space */}
        {!isMobile && (
          <div style={{
            backgroundColor: palette.primary.default,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 40px', height: `${UTIL_H}px`,
            borderBottom: `1px solid ${palette.primary.light}`,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Phone size={12} strokeWidth={1.5} color={palette.surface.stone} />
              <span style={{ fontFamily: FONT_BODY, fontSize: '11px', color: palette.surface.stone, letterSpacing: '0.04em' }}>020 3936 0647</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontFamily: FONT_BODY, fontSize: '11px', color: palette.surface.stone, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>Subscribe</span>
              <span style={{ color: palette.surface.stone, opacity: 0.4 }}>·</span>
              <span style={{ fontFamily: FONT_BODY, fontSize: '11px', color: palette.surface.stone, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>Brochures</span>
            </div>
          </div>
        )}

        {/* Nav bar */}
        <div style={{
          backgroundColor: compact ? palette.surface.stone : 'transparent',
          borderBottom: compact ? `1px solid ${palette.neutral[200]}` : 'none',
          transition: 'background-color 0.35s ease',
          display: 'grid', gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          padding: isMobile ? '0 16px' : '0 40px',
          height: isMobile ? '52px' : `${NAV_H}px`,
        }}>
          {/* Hamburger */}
          <div onClick={() => setDrawerOpen(o => !o)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <div style={{ width: '20px', height: '12px', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, width: '20px', height: '2px', top: drawerOpen ? '5px' : 0, transform: drawerOpen ? 'rotate(45deg)' : 'none', backgroundColor: compact ? palette.primary.default : palette.surface.stone, transition: 'all 0.3s ease' }} />
              <div style={{ position: 'absolute', left: 0, width: '20px', height: '2px', top: drawerOpen ? '5px' : '10px', transform: drawerOpen ? 'rotate(-45deg)' : 'none', backgroundColor: compact ? palette.primary.default : palette.surface.stone, transition: 'all 0.3s ease' }} />
            </div>
          </div>

          {/* Logo — stacked on dark, inline when compact */}
          {isMobile ? (
            <LogoInline color={compact ? palette.primary.default : palette.surface.stone} height={18} />
          ) : (
            <div style={{ position: 'relative', width: '174px', height: `${NAV_H}px` }}>
              <div style={{ position: 'absolute', top: '23px', left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity: compact ? 0 : 1, transition: 'opacity 0.35s ease', pointerEvents: compact ? 'none' : 'auto' }}>
                <LogoStacked color={palette.surface.stone} height={52} />
              </div>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: compact ? 1 : 0, transition: 'opacity 0.35s ease', pointerEvents: compact ? 'auto' : 'none' }}>
                <LogoInline color={palette.primary.default} height={22} />
              </div>
            </div>
          )}

          {/* Right */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: isMobile ? '12px' : '20px' }}>
            {!isMobile && (
              <button style={{
                fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '400', letterSpacing: '0.08em', textTransform: 'uppercase',
                backgroundColor: compact ? palette.primary.default : 'transparent',
                color: palette.surface.stone,
                border: compact ? `1px solid ${palette.primary.default}` : `1px solid ${palette.surface.stone}`,
                padding: '8px 20px', cursor: 'pointer', transition: 'all 0.35s ease',
              }}>Enquire</button>
            )}
            <Search size={isMobile ? 18 : 20} strokeWidth={1.5} color={compact ? palette.primary.default : palette.surface.stone} style={{ cursor: 'pointer' }} />
          </div>
        </div>

        {/* Menu drawer */}
        {drawerOpen && (
          <div style={{
            position: 'absolute', top: isMobile ? '52px' : `${UTIL_H + NAV_H}px`, left: 0,
            width: isMobile ? '100%' : '360px', maxHeight: '80vh', overflowY: 'auto', scrollbarWidth: 'none',
            backgroundColor: '#FFFFFF', boxShadow: '4px 8px 32px rgba(16,32,55,0.14)',
            border: `1px solid ${palette.neutral[200]}`,
          }}>
            <div style={{ padding: '24px 28px 0' }}>
              {PRIMARY_NAV.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0 12px 10px', borderLeft: '2px solid transparent', cursor: 'pointer' }}>
                  <span style={{ fontFamily: FONT_HEADING, fontSize: TS.lg, fontWeight: '300', color: palette.primary.default }}>{item}</span>
                  <ChevronRight size={16} strokeWidth={1} color={palette.neutral[300]} />
                </div>
              ))}
              <div style={{ height: '1px', backgroundColor: palette.neutral[200], margin: '16px 10px' }} />
              <div style={{ paddingLeft: '10px' }}>
                {SECONDARY_NAV.map(item => (
                  <p key={item} style={{ fontFamily: FONT_MONO, fontSize: '11px', color: palette.primary.default, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '14px', cursor: 'pointer' }}>{item}</p>
                ))}
              </div>
            </div>
            <div style={{ backgroundColor: palette.primary.default, margin: '20px 0 0', padding: '20px 28px 28px' }}>
              <p style={{ fontFamily: FONT_HEADING, fontSize: '15px', color: palette.surface.stone, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '4px' }}>Speak to our experts</p>
              <p style={{ fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '300', color: palette.surface.stone, opacity: 0.6, lineHeight: 1.6, marginBottom: '12px' }}>MON–FRI &nbsp;9:00am – 6:00pm &nbsp;·&nbsp; SAT &nbsp;10:00am – 4:30pm</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: FONT_BODY, fontSize: '15px', fontWeight: '500', color: palette.surface.stone }}>020 3993 4424</span>
                <button style={{ fontFamily: FONT_BODY, backgroundColor: palette.surface.stone, color: palette.primary.default, padding: '8px 20px', border: 'none', fontWeight: '400', fontSize: '11px', letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer' }}>Enquire</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Search band ─────────────────────────────────────────────────── */}
      <div style={{
        backgroundColor: palette.primary.default,
        marginTop: isMobile ? '-52px' : `-${UTIL_H + NAV_H}px`,
        paddingTop: isMobile ? `${52 + 48}px` : `${UTIL_H + NAV_H + 72}px`,
        paddingBottom: isMobile ? '40px' : '56px',
        paddingLeft: isMobile ? '20px' : '10%',
        paddingRight: isMobile ? '20px' : '10%',
      }}>

        {/* Search input + CTA on same line */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', gap: '16px',
          borderBottom: `1px solid rgba(242,242,235,0.25)`,
          marginBottom: '16px',
        }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              className="jf-search"
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Where would you like to go?"
              style={{
                fontFamily: FONT_HEADING,
                fontSize: isMobile ? '22px' : '34px',
                fontWeight: '300',
                color: palette.surface.stone, letterSpacing: '0.01em',
                background: 'transparent', border: 'none',
                width: '100%', paddingRight: query ? '36px' : '0', paddingBottom: '16px',
              }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{ position: 'absolute', right: 0, top: isMobile ? '8px' : '14px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
                <X size={15} strokeWidth={1.5} color="rgba(242,242,235,0.5)" />
              </button>
            )}
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0,
            fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '500', letterSpacing: '0.1em', textTransform: 'uppercase',
            backgroundColor: palette.surface.stone, color: palette.primary.default,
            border: 'none', cursor: 'pointer',
            padding: isMobile ? '8px 14px' : '10px 18px',
            marginBottom: '10px',
          }}>
            Find Journeys
            <Search size={12} strokeWidth={1.5} color={palette.primary.default} />
          </button>
        </div>

        {/* Popular searches */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: isMobile ? '24px' : '32px' }}>
          <span style={{ fontFamily: FONT_MONO, fontSize: '9px', color: 'rgba(242,242,235,0.4)', letterSpacing: '0.12em', textTransform: 'uppercase', marginRight: '2px' }}>Popular</span>
          {POPULAR.map(tag => (
            <button key={tag} onClick={() => setQuery(query === tag ? '' : tag)} style={{
              fontFamily: FONT_BODY, fontSize: isMobile ? '11px' : '12px',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              color: query === tag ? 'rgba(242,242,235,0.95)' : 'rgba(242,242,235,0.6)',
              backgroundColor: query === tag ? 'rgba(242,242,235,0.1)' : 'transparent',
              border: `1px solid ${query === tag ? 'rgba(242,242,235,0.4)' : 'rgba(242,242,235,0.2)'}`,
              padding: '5px 14px', borderRadius: '20px',
              cursor: 'pointer', transition: 'all 0.15s ease',
            }}>{tag}</button>
          ))}
        </div>

        {/* Journey type tabs — shown on mobile and desktop */}
        <div style={{ borderTop: `1px solid rgba(242,242,235,0.12)`, paddingTop: isMobile ? '20px' : '28px', display: 'flex' }}>
          {[
            { key: 'all',         label: 'All Journeys'         },
            { key: 'small-group', label: 'Small Group Tours'    },
            { key: 'tailormade',  label: 'Tailor-Made Journeys' },
          ].map((tab, i) => {
            const active = journeyType === tab.key;
            return (
              <button key={tab.key} onClick={() => setJourneyType(tab.key)} style={{
                background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                paddingRight: isMobile ? '16px' : '40px',
                paddingLeft: i > 0 ? (isMobile ? '16px' : '40px') : 0,
                borderLeft: i > 0 ? `1px solid rgba(242,242,235,0.15)` : 'none',
              }}>
                <span style={{
                  display: 'block', fontFamily: FONT_HEADING,
                  fontSize: isMobile ? '16px' : '22px', fontWeight: '300', lineHeight: 1.1, marginBottom: '4px',
                  color: active ? palette.surface.stone : 'rgba(242,242,235,0.35)',
                  transition: 'color 0.2s ease',
                }}>{tab.label}</span>
                <span style={{
                  fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: active ? 'rgba(242,242,235,0.6)' : 'rgba(242,242,235,0.25)',
                  transition: 'color 0.2s ease',
                }}>{countByType(tab.key)} journeys</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Body: Sidebar + Results ──────────────────────────────────────── */}
      <div style={{ display: 'flex', alignItems: 'flex-start' }}>

        {/* ── Desktop filter sidebar ─────────────────────────────────────── */}
        {!isMobile && (
          <div style={{
            width: '256px', flexShrink: 0,
            borderRight: `1px solid ${palette.neutral[200]}`,
            padding: '28px 24px 48px',
            position: 'sticky', top: `${UTIL_H + NAV_H}px`,
            maxHeight: `calc(100vh - ${UTIL_H + NAV_H}px)`,
            overflowY: 'auto', scrollbarWidth: 'none',
            backgroundColor: palette.surface.stone,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <p style={{ fontFamily: FONT_HEADING, fontSize: '24px', fontWeight: '300', letterSpacing: '0.01em', color: palette.primary.default }}>Refine</p>
              {hasFilters && (
                <button onClick={clearAll} style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '0.08em', textTransform: 'uppercase', color: palette.neutral[400], background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline', textUnderlineOffset: '2px' }}>
                  Clear all
                </button>
              )}
            </div>
            <FilterContent
              journeyType={journeyType} setJourneyType={setJourneyType}
              regions={regions} toggleRegion={toggleRegion}
              durations={durations} toggleDuration={toggleDuration}
              interests={interests} toggleInterest={toggleInterest}
              accommodations={accommodations} toggleAccommodation={toggleAccommodation}
              priceRange={priceRange} setPriceRange={setPriceRange}
            />
          </div>
        )}

        {/* ── Results ───────────────────────────────────────────────────── */}
        <div style={{ flex: 1, padding: isMobile ? '20px 16px 80px' : '28px 32px 64px', minWidth: 0 }}>

          {/* Result bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: '13px', fontWeight: '300', color: palette.neutral[500] }}>
              Showing{' '}
              <span style={{ fontWeight: '500', color: palette.primary.default }}>{filtered.length}</span>
              {' '}{filtered.length === 1 ? 'journey' : 'journeys'}
              {query && <> matching <em>"{query}"</em></>}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Mobile: Refine button */}
              {isMobile && (
                <button onClick={() => setMobileFilterOpen(true)} style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '500', letterSpacing: '0.04em',
                  color: hasFilters ? palette.surface.stone : palette.primary.default,
                  backgroundColor: hasFilters ? palette.primary.default : 'transparent',
                  border: `1px solid ${palette.primary.default}`,
                  padding: '7px 14px', cursor: 'pointer',
                }}>
                  <SlidersHorizontal size={13} strokeWidth={1.5} />
                  Refine
                  {activeFilterCount > 0 && (
                    <span style={{
                      backgroundColor: hasFilters ? palette.surface.stone : palette.primary.default,
                      color: hasFilters ? palette.primary.default : palette.surface.stone,
                      fontFamily: FONT_MONO, fontSize: '9px', fontWeight: '500',
                      width: '16px', height: '16px', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>{activeFilterCount}</span>
                  )}
                </button>
              )}
              {/* Desktop: sort */}
              {!isMobile && (
                <>
                  <span style={{ fontFamily: FONT_BODY, fontSize: '11px', color: palette.neutral[400] }}>Sort</span>
                  <select style={{
                    fontFamily: FONT_BODY, fontSize: '11px', color: palette.primary.default,
                    border: `1px solid ${palette.neutral[200]}`, padding: '5px 10px',
                    background: palette.surface.stone, cursor: 'pointer', letterSpacing: '0.02em',
                  }}>
                    <option>Recommended</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Duration</option>
                  </select>
                </>
              )}
            </div>
          </div>

          {/* Card grid */}
          {filtered.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? '12px' : '20px' }}>
              {filtered.map(p => <ProductCard key={p.id} p={p} compact={isMobile} />)}
            </div>
          ) : (
            <div style={{ paddingTop: '80px', textAlign: 'center' }}>
              <p style={{ fontFamily: FONT_HEADING, fontSize: TS.xl, fontWeight: '300', color: palette.primary.default, marginBottom: '10px' }}>No journeys found</p>
              <p style={{ fontFamily: FONT_BODY, fontSize: '14px', fontWeight: '300', color: palette.neutral[400], marginBottom: '20px' }}>Try adjusting your filters or search term.</p>
              <button onClick={clearAll} style={{ fontFamily: FONT_BODY, fontSize: '12px', color: palette.primary.default, background: 'none', border: `1px solid ${palette.neutral[300]}`, padding: '8px 20px', cursor: 'pointer', letterSpacing: '0.04em' }}>
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Mobile filter panel ─────────────────────────────────────────── */}
      {isMobile && mobileFilterOpen && (
        <div
          onClick={() => setMobileFilterOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 50, backgroundColor: 'rgba(16,32,55,0.48)' }}
        >
          <div
            className="jf-panel"
            onClick={e => e.stopPropagation()}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              backgroundColor: palette.surface.stone,
              maxHeight: '88vh', display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Panel header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px 20px', borderBottom: `1px solid ${palette.neutral[200]}`,
              flexShrink: 0,
            }}>
              <span style={{ fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '500', letterSpacing: '0.1em', textTransform: 'uppercase', color: palette.primary.default }}>Refine Results</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {hasFilters && (
                  <button onClick={clearAll} style={{ fontFamily: FONT_MONO, fontSize: '9px', letterSpacing: '0.08em', textTransform: 'uppercase', color: palette.neutral[400], background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}>
                    Clear all
                  </button>
                )}
                <button onClick={() => setMobileFilterOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
                  <X size={18} strokeWidth={1.5} color={palette.primary.default} />
                </button>
              </div>
            </div>

            {/* Scrollable filters */}
            <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', padding: '0 20px' }}>
              {/* Journey type tabs — mobile only shown here */}
              <div style={{ paddingTop: '12px', paddingBottom: '4px', borderBottom: `1px solid ${palette.neutral[200]}`, marginBottom: '0' }}>
                <p style={{ fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '500', letterSpacing: '0.1em', textTransform: 'uppercase', color: palette.primary.default, marginBottom: '10px' }}>Journey Type</p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', paddingBottom: '14px' }}>
                  {[
                    { key: 'all',         label: 'All' },
                    { key: 'small-group', label: 'Small Group' },
                    { key: 'tailormade',  label: 'Tailor-Made' },
                  ].map(t => (
                    <Chip key={t.key} label={t.label} active={journeyType === t.key} onClick={() => setJourneyType(t.key)} />
                  ))}
                </div>
              </div>
              <FilterContent
                journeyType={journeyType} setJourneyType={setJourneyType}
                regions={regions} toggleRegion={toggleRegion}
                durations={durations} toggleDuration={toggleDuration}
                interests={interests} toggleInterest={toggleInterest}
                accommodations={accommodations} toggleAccommodation={toggleAccommodation}
                priceRange={priceRange} setPriceRange={setPriceRange}
                mobile
              />
            </div>

            {/* Sticky footer — live journey count feedback */}
            <div style={{
              flexShrink: 0, padding: '14px 20px',
              borderTop: `1px solid ${palette.neutral[200]}`,
              backgroundColor: palette.surface.stone,
            }}>
              {/* Count feedback line */}
              <p style={{
                fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '300',
                color: palette.neutral[500], textAlign: 'center', marginBottom: '10px',
              }}>
                {filtered.length === 0
                  ? 'No journeys match your filters'
                  : <><span style={{ fontWeight: '600', color: palette.primary.default }}>{filtered.length}</span> {filtered.length === 1 ? 'journey' : 'journeys'} found</>
                }
              </p>
              <button
                onClick={() => setMobileFilterOpen(false)}
                disabled={filtered.length === 0}
                style={{
                  width: '100%',
                  backgroundColor: filtered.length > 0 ? palette.primary.default : palette.neutral[200],
                  color: filtered.length > 0 ? palette.surface.stone : palette.neutral[400],
                  fontFamily: FONT_BODY, fontSize: '13px', fontWeight: '500', letterSpacing: '0.06em', textTransform: 'uppercase',
                  border: 'none', padding: '14px 20px', cursor: filtered.length > 0 ? 'pointer' : 'default',
                  transition: 'background-color 0.2s ease',
                }}
              >
                View {filtered.length} {filtered.length === 1 ? 'Journey' : 'Journeys'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
