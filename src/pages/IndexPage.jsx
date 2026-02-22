import React from 'react';
import { Link } from 'react-router-dom';
import { palette } from '../tokens/index.js';
import { FONT_HEADING, FONT_BODY, TS } from '../tokens/index.js';
import { LogoStacked } from '../components/Logo.jsx';

const sections = [
  {
    heading: 'Design Foundations',
    pages: [
      {
        to: '/foundations',
        title: 'Foundations',
        desc: 'Colour palette, accent selection, typography, UI examples, and product card variants.',
        status: 'live',
      },
      {
        to: '/maps',
        title: 'Maps',
        desc: 'Navigational SVG maps, interactive world map, and itinerary maps using a map platform API.',
        status: 'live',
      },
    ],
  },
  {
    heading: 'Templates & Flows',
    pages: [
      {
        to: '/homepage',
        title: 'Homepage',
        desc: 'Full homepage preview with hero slider, navigation, destinations carousel, and brand statement.',
        status: 'live',
      },
      {
        to: '/destinations',
        title: 'Destinations',
        desc: 'Destination templates — Landing, T1 Region, T2 Country, T3 Sub-region, and Itinerary pages.',
        status: 'upcoming',
      },
      {
        to: '/journey-type',
        title: 'Journey Type',
        desc: 'Product line pages for Small Group Tours and Tailormade Journeys.',
        status: 'upcoming',
      },
      {
        to: '/journey-finder',
        title: 'Journey Finder',
        desc: 'Direct journey search with filters — bypassing the destination-based flow.',
        status: 'upcoming',
      },
      {
        to: '/inspiration',
        title: 'Inspiration',
        desc: 'Discover pages for travel types — solo, specialist-led, wildlife, cultural, and more.',
        status: 'upcoming',
      },
      {
        to: '/enquiry',
        title: 'Enquiry',
        desc: 'Enquiry touchpoints — navigation CTAs, enquiry banners, and the main request-a-quote flow.',
        status: 'upcoming',
      },
    ],
  },
];

export default function IndexPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: palette.surface.stone,
      fontFamily: FONT_BODY,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 32px',
    }}>
      <LogoStacked color={palette.primary.default} height={56} />

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
        Design System
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
        Templates, components, and design foundations for the Cox &amp; Kings rebrand.
      </p>

      <div style={{ width: '100%', maxWidth: '960px' }}>
        {sections.map((section, si) => (
          <div key={section.heading} style={{ marginTop: si > 0 ? '40px' : 0 }}>
            {si > 0 && (
              <div style={{
                height: '1px',
                backgroundColor: palette.neutral[200],
                marginBottom: '32px',
              }} />
            )}
            <p style={{
              fontFamily: FONT_BODY,
              fontSize: '11px',
              fontWeight: '300',
              color: palette.neutral[400],
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '16px',
            }}>
              {section.heading}
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '16px',
            }}>
              {section.pages.map((page) => {
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h3 style={{
                        fontFamily: FONT_HEADING,
                        fontSize: TS.bodyLg,
                        fontWeight: '500',
                        color: palette.primary.default,
                        margin: 0,
                      }}>
                        {page.title}
                      </h3>
                      {isUpcoming && (
                        <span style={{
                          fontFamily: FONT_BODY,
                          fontSize: '10px',
                          fontWeight: '500',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: palette.neutral[400],
                          backgroundColor: palette.surface.subtleStone,
                          padding: '4px 10px',
                          borderRadius: '4px',
                        }}>
                          Coming Soon
                        </span>
                      )}
                    </div>
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
        ))}
      </div>

      <p style={{
        fontFamily: FONT_BODY,
        color: palette.neutral[400],
        fontSize: '12px',
        marginTop: '48px',
        textAlign: 'center',
      }}>
        Cox &amp; Kings — Design System — {new Date().getFullYear()}
      </p>
    </div>
  );
}
