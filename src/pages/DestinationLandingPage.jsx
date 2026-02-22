import React from 'react';
import { Link } from 'react-router-dom';
import { palette } from '../tokens/index.js';
import { FONT_HEADING, FONT_BODY, TS } from '../tokens/index.js';
import { LogoMark } from '../components/Logo.jsx';

const templates = [
  {
    to: '/destination-landing',
    title: 'Destinations Landing',
    desc: 'Top-level destinations hub — overview of all regions with navigation into region, country, and journey pages.',
    status: 'upcoming',
  },
  {
    to: '/destination-t1',
    title: 'T1 — Region',
    desc: 'Regional landing page with featured journeys, highlights, and entry points to country pages.',
    status: 'upcoming',
  },
  {
    to: '/destination-t2',
    title: 'T2 — Country',
    desc: 'Country-level destination page with highlights, practical info, and entry points to sub-regions.',
    status: 'upcoming',
  },
  {
    to: '/destination-t3',
    title: 'T3 — Sub-region',
    desc: 'Sub-region destination page with local highlights, featured journeys, and practical information.',
    status: 'upcoming',
  },
  {
    to: '/itinerary',
    title: 'Itinerary',
    desc: 'Journey product page — full itinerary with day-by-day breakdown, image gallery, itinerary map, pricing, and booking.',
    status: 'upcoming',
  },
];

export default function DestinationLandingPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: palette.surface.stone,
      fontFamily: FONT_BODY,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '60px 32px',
    }}>
      <LogoMark color={palette.neutral[200]} height={56} />
      <h1 style={{
        fontFamily: FONT_HEADING,
        color: palette.primary.default,
        fontSize: TS['2xl'],
        fontWeight: '500',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        marginTop: '32px',
        marginBottom: '8px',
        textAlign: 'center',
      }}>
        Destinations
      </h1>
      <p style={{
        fontFamily: FONT_BODY,
        color: palette.neutral[500],
        fontSize: TS.base,
        maxWidth: '520px',
        textAlign: 'center',
        lineHeight: 1.6,
        marginBottom: '48px',
      }}>
        Destination page templates — from the top-level landing through to individual journey detail.
      </p>

      <div style={{
        width: '100%',
        maxWidth: '960px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '16px',
      }}>
        {templates.map((page) => {
          const isUpcoming = page.status === 'upcoming';
          const Wrapper = isUpcoming ? 'div' : Link;
          const wrapperProps = isUpcoming ? {} : { to: page.to };

          return (
            <Wrapper
              key={page.to}
              {...wrapperProps}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '24px 22px',
                boxShadow: '0 1px 3px rgba(16,32,55,0.08)',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                cursor: isUpcoming ? 'default' : 'pointer',
                opacity: isUpcoming ? 0.55 : 1,
                border: `1px solid ${palette.neutral[100]}`,
              }}
            >
              <h3 style={{
                fontFamily: FONT_HEADING,
                fontSize: TS.bodyLg,
                fontWeight: '500',
                color: palette.primary.default,
                margin: 0,
              }}>
                {page.title}
              </h3>
              <p style={{
                fontFamily: FONT_BODY,
                fontSize: '14px',
                color: palette.neutral[500],
                lineHeight: 1.5,
                margin: 0,
              }}>
                {page.desc}
              </p>
              {!isUpcoming && (
                <span style={{
                  fontFamily: FONT_BODY,
                  fontSize: '12px',
                  fontWeight: '500',
                  color: palette.primary.muted,
                  marginTop: '4px',
                  letterSpacing: '0.04em',
                }}>
                  View →
                </span>
              )}
            </Wrapper>
          );
        })}
      </div>
    </div>
  );
}
