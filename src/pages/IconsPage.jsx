import React, { useState } from 'react';
import { palette } from '../tokens/index.js';
import { FONT_HEADING, FONT_BODY, TS } from '../tokens/index.js';
import { useAccent } from '../components/AccentContext.jsx';
import {
  Menu, X, ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  ArrowRight, ArrowLeft, ArrowUpRight, Search, Plus, Minus,
  Check, Copy, Download, Share2, ExternalLink, Filter,
  BedDouble, UtensilsCrossed, Coffee, Wine, MapPin, Calendar,
  Clock, Users, Star, Heart, Phone, Mail, Globe, Info,
  CreditCard, Shield, Award, Luggage, Plane, Ship, Train, Car,
  Sunrise, Mountain, Waves, TreePine, Camera, Compass,
  Eye, EyeOff, Settings, User, LogOut, ChevronFirst, ChevronLast,
} from 'lucide-react';

const uiIconGroups = [
  {
    label: 'Navigation',
    icons: [
      { Icon: Menu, name: 'Menu' },
      { Icon: X, name: 'Close' },
      { Icon: ChevronLeft, name: 'Chevron Left' },
      { Icon: ChevronRight, name: 'Chevron Right' },
      { Icon: ChevronDown, name: 'Chevron Down' },
      { Icon: ChevronUp, name: 'Chevron Up' },
      { Icon: ArrowLeft, name: 'Arrow Left' },
      { Icon: ArrowRight, name: 'Arrow Right' },
      { Icon: ArrowUpRight, name: 'External' },
      { Icon: ChevronFirst, name: 'First' },
      { Icon: ChevronLast, name: 'Last' },
    ],
  },
  {
    label: 'Actions',
    icons: [
      { Icon: Search, name: 'Search' },
      { Icon: Plus, name: 'Plus' },
      { Icon: Minus, name: 'Minus' },
      { Icon: Check, name: 'Check' },
      { Icon: Copy, name: 'Copy' },
      { Icon: Download, name: 'Download' },
      { Icon: Share2, name: 'Share' },
      { Icon: ExternalLink, name: 'External Link' },
      { Icon: Filter, name: 'Filter' },
      { Icon: Eye, name: 'Show' },
      { Icon: EyeOff, name: 'Hide' },
      { Icon: Settings, name: 'Settings' },
    ],
  },
  {
    label: 'Itinerary & Accommodation',
    icons: [
      { Icon: BedDouble, name: 'Hotel' },
      { Icon: UtensilsCrossed, name: 'Dining' },
      { Icon: Coffee, name: 'Breakfast' },
      { Icon: Wine, name: 'Drinks' },
      { Icon: MapPin, name: 'Location' },
      { Icon: Calendar, name: 'Date' },
      { Icon: Clock, name: 'Duration' },
      { Icon: Luggage, name: 'Luggage' },
      { Icon: CreditCard, name: 'Payment' },
    ],
  },
  {
    label: 'Travel & Transport',
    icons: [
      { Icon: Plane, name: 'Flight' },
      { Icon: Ship, name: 'Cruise' },
      { Icon: Train, name: 'Rail' },
      { Icon: Car, name: 'Transfer' },
      { Icon: Compass, name: 'Explore' },
      { Icon: Globe, name: 'World' },
    ],
  },
  {
    label: 'People & Communication',
    icons: [
      { Icon: Users, name: 'Group' },
      { Icon: User, name: 'Person' },
      { Icon: Phone, name: 'Phone' },
      { Icon: Mail, name: 'Email' },
      { Icon: Heart, name: 'Favourite' },
      { Icon: Star, name: 'Rating' },
      { Icon: Info, name: 'Info' },
      { Icon: LogOut, name: 'Log Out' },
    ],
  },
  {
    label: 'Experiences & Nature',
    icons: [
      { Icon: Sunrise, name: 'Sunrise' },
      { Icon: Mountain, name: 'Mountain' },
      { Icon: Waves, name: 'Coastal' },
      { Icon: TreePine, name: 'Wildlife' },
      { Icon: Camera, name: 'Photography' },
    ],
  },
];

const editorialIcons = [
  {
    name: 'Small Groups',
    title: 'Genuinely small groups',
    desc: 'Cox & Kings maintains a maximum group size of 18 guests on most tours, with an average of just 14.',
    svg: (color) => (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="14" r="5" />
        <circle cx="34" cy="16" r="4" />
        <path d="M8 36v-2a10 10 0 0 1 20 0v2" />
        <path d="M28 36v-2a7 7 0 0 1 13 0v2" />
      </svg>
    ),
  },
  {
    name: 'Worldwide Support',
    title: 'Worldwide support',
    desc: 'Round-the-clock support — in person, over the phone, and online through a global network of offices.',
    svg: (color) => (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="24" r="16" />
        <ellipse cx="24" cy="24" rx="8" ry="16" />
        <line x1="8" y1="24" x2="40" y2="24" />
        <line x1="24" y1="8" x2="24" y2="40" />
      </svg>
    ),
  },
  {
    name: 'Protected',
    title: 'Your money is protected',
    desc: 'ABTA bonded and ATOL protected — your booking is secure and your money is safe.',
    svg: (color) => (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M24 6L8 14v10c0 10 7.2 18.4 16 20 8.8-1.6 16-10 16-20V14L24 6z" />
        <path d="M17 24l5 5 9-10" />
      </svg>
    ),
  },
  {
    name: 'Heritage',
    title: 'Experts since 1758',
    desc: 'The world\'s longest-established travel company — over 265 years of expertise and trust.',
    svg: (color) => (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="24" cy="16" r="5" />
        <path d="M24 21v6" />
        <path d="M18 42l6-15 6 15" />
        <path d="M20 36h8" />
        <path d="M15 10l-3-4M33 10l3-4M24 6V2" />
      </svg>
    ),
  },
];

const sectionLabel = {
  fontFamily: FONT_BODY,
  fontSize: '10px',
  fontWeight: '300',
  color: palette.neutral[400],
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: '12px',
};

const sectionHeading = {
  fontFamily: FONT_HEADING,
  fontSize: TS.bodyLg,
  fontWeight: '500',
  color: palette.primary.default,
  marginBottom: '20px',
};

export default function IconsPage() {
  const { accent, accentScale, isPrimaryAccent } = useAccent();
  const [iconSize, setIconSize] = useState(20);
  const [strokeWidth, setStrokeWidth] = useState(1.5);

  const editorialColor = isPrimaryAccent ? palette.primary.muted : accent.hex;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: palette.surface.stone,
      fontFamily: FONT_BODY,
      padding: '40px 32px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <h1 style={{
          fontFamily: FONT_HEADING,
          color: palette.primary.default,
          fontSize: TS['2xl'],
          fontWeight: '500',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}>
          Icons
        </h1>
        <p style={{
          fontFamily: FONT_BODY,
          color: palette.neutral[500],
          fontSize: TS.base,
          lineHeight: 1.6,
          marginBottom: '40px',
          maxWidth: '640px',
        }}>
          Two icon treatments — UI icons for interface elements and navigation,
          and editorial icons for brand USPs and trust signals.
        </p>

        {/* ════════════════ UI ICONS ════════════════ */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 1px 3px rgba(16,32,55,0.08)',
          marginBottom: '32px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <h2 style={sectionHeading}>UI Icons</h2>
              <p style={{ fontFamily: FONT_BODY, fontSize: '13px', color: palette.neutral[500], lineHeight: 1.5, maxWidth: '480px', marginTop: '-12px' }}>
                Line-based icons from <a href="https://lucide.dev" target="_blank" rel="noopener noreferrer" style={{ color: palette.primary.muted, textDecoration: 'underline' }}>Lucide</a> — consistent stroke weight, optically balanced, and available as React components.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ ...sectionLabel, marginBottom: '4px' }}>Size</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {[16, 20, 24].map((s) => (
                    <button
                      key={s}
                      onClick={() => setIconSize(s)}
                      style={{
                        fontFamily: FONT_BODY, fontSize: '11px',
                        padding: '4px 8px', borderRadius: '4px',
                        border: iconSize === s ? `1px solid ${palette.primary.default}` : `1px solid ${palette.neutral[200]}`,
                        backgroundColor: iconSize === s ? palette.primary.tint : 'transparent',
                        color: palette.primary.default,
                        cursor: 'pointer', fontWeight: iconSize === s ? '500' : '400',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ ...sectionLabel, marginBottom: '4px' }}>Stroke</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {[1, 1.5, 2].map((w) => (
                    <button
                      key={w}
                      onClick={() => setStrokeWidth(w)}
                      style={{
                        fontFamily: FONT_BODY, fontSize: '11px',
                        padding: '4px 8px', borderRadius: '4px',
                        border: strokeWidth === w ? `1px solid ${palette.primary.default}` : `1px solid ${palette.neutral[200]}`,
                        backgroundColor: strokeWidth === w ? palette.primary.tint : 'transparent',
                        color: palette.primary.default,
                        cursor: 'pointer', fontWeight: strokeWidth === w ? '500' : '400',
                      }}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {uiIconGroups.map((group) => (
            <div key={group.label} style={{ marginBottom: '28px' }}>
              <p style={sectionLabel}>{group.label}</p>
              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                {group.icons.map(({ Icon, name }) => (
                  <div
                    key={name}
                    style={{
                      width: '88px',
                      padding: '14px 8px 10px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px',
                      borderRadius: '8px',
                      transition: 'background-color 0.15s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = palette.surface.stone}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <Icon
                      size={iconSize}
                      strokeWidth={strokeWidth}
                      color={palette.primary.default}
                    />
                    <span style={{
                      fontFamily: FONT_BODY,
                      fontSize: '10px',
                      color: palette.neutral[500],
                      textAlign: 'center',
                      lineHeight: 1.3,
                    }}>
                      {name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={{
            backgroundColor: palette.surface.stone,
            borderRadius: '8px',
            padding: '16px 20px',
            marginTop: '8px',
          }}>
            <p style={{ fontFamily: FONT_BODY, fontSize: '12px', color: palette.neutral[500], lineHeight: 1.6, margin: 0 }}>
              <strong style={{ fontWeight: '500', color: palette.primary.default }}>Usage:</strong> {' '}
              <code style={{ fontFamily: 'monospace', fontSize: '11px', backgroundColor: '#FFFFFF', padding: '2px 6px', borderRadius: '3px' }}>
                {'import { Menu } from "lucide-react"'}
              </code>
              {' → '}
              <code style={{ fontFamily: 'monospace', fontSize: '11px', backgroundColor: '#FFFFFF', padding: '2px 6px', borderRadius: '3px' }}>
                {'<Menu size={20} strokeWidth={1.5} />'}
              </code>
              {' · '}
              Default stroke: 1.5 · Recommended sizes: 16 (inline), 20 (standard), 24 (prominent)
            </p>
          </div>
        </div>

        {/* ════════════════ EDITORIAL ICONS ════════════════ */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 1px 3px rgba(16,32,55,0.08)',
          marginBottom: '32px',
        }}>
          <h2 style={sectionHeading}>Editorial Icons</h2>
          <p style={{ fontFamily: FONT_BODY, fontSize: '13px', color: palette.neutral[500], lineHeight: 1.5, maxWidth: '540px', marginTop: '-12px', marginBottom: '28px' }}>
            Bespoke line illustrations for brand USPs and trust signals. Larger scale, lighter stroke,
            designed to carry meaning at a glance within marketing contexts.
          </p>

          <p style={sectionLabel}>On White</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
            marginBottom: '32px',
          }}>
            {editorialIcons.map((item) => (
              <div key={item.name} style={{
                backgroundColor: palette.surface.stone,
                borderRadius: '12px',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}>
                {item.svg(editorialColor)}
                <h4 style={{
                  fontFamily: FONT_HEADING,
                  fontSize: '15px',
                  fontWeight: '500',
                  color: palette.primary.default,
                  margin: 0,
                }}>
                  {item.title}
                </h4>
                <p style={{
                  fontFamily: FONT_BODY,
                  fontSize: '13px',
                  color: palette.neutral[500],
                  lineHeight: 1.5,
                  margin: 0,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <p style={sectionLabel}>On Primary</p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '20px',
          }}>
            {editorialIcons.map((item) => (
              <div key={item.name} style={{
                backgroundColor: palette.primary.default,
                borderRadius: '12px',
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}>
                {item.svg(isPrimaryAccent ? palette.surface.stone : accent.hex)}
                <h4 style={{
                  fontFamily: FONT_HEADING,
                  fontSize: '15px',
                  fontWeight: '500',
                  color: palette.surface.stone,
                  margin: 0,
                }}>
                  {item.title}
                </h4>
                <p style={{
                  fontFamily: FONT_BODY,
                  fontSize: '13px',
                  color: palette.primary.faded,
                  lineHeight: 1.5,
                  margin: 0,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
