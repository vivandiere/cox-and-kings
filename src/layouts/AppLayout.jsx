import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { palette } from '../tokens/index.js';
import { FONT_HEADING, FONT_BODY, TS } from '../tokens/index.js';
import { LogoCompact } from '../components/Logo.jsx';

const navGroups = [
  {
    items: [
      { to: '/', label: 'Home' },
    ],
  },
  {
    label: 'Design Foundations',
    items: [
      { to: '/foundations', label: 'Foundations' },
      { to: '/maps', label: 'Maps' },
      { to: '/icons', label: 'Icons' },
    ],
  },
  {
    label: 'Templates & Flows',
    items: [
      { to: '/homepage', label: 'Homepage', external: true },
      { to: '/journey-finder', label: 'Journey Finder', external: true },
      { to: '/destinations', label: 'Destinations' },
      { to: '/journey-type', label: 'Journey Type' },
      { to: '/inspiration', label: 'Inspiration' },
      { to: '/enquiry', label: 'Enquiry' },
    ],
  },
  {
    label: 'Patterns',
    items: [
      { to: '/tabs', label: 'Tab Exploration', internalLink: true },
      { to: '/navigation', label: 'Navigation', internalLink: true },
    ],
  },
];

export default function AppLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <nav style={{
        width: '220px',
        flexShrink: 0,
        backgroundColor: palette.primary.default,
        padding: '28px 20px',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 100,
        overflowY: 'auto',
      }}>
        <div style={{ marginBottom: '32px' }}>
          <LogoCompact color={palette.surface.stone} height={24} />
        </div>

        {navGroups.map((group, gi) => (
          <div key={group.label || `group-${gi}`}>
            {gi > 0 && (
              <div style={{
                height: '1px',
                backgroundColor: palette.primary.light,
                margin: '14px 0',
              }} />
            )}
            {group.label && (
              <p style={{
                fontFamily: FONT_BODY,
                fontSize: '10px',
                fontWeight: '300',
                color: palette.primary.faded,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '8px',
              }}>
                {group.label}
              </p>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {group.items.map((item) => {
                if (item.internalLink) {
                  return (
                    <a
                      key={item.to}
                      href={item.to}
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: '13px',
                        fontWeight: '400',
                        color: palette.primary.faded,
                        textDecoration: 'none',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        transition: 'all 0.15s ease',
                        letterSpacing: '0.02em',
                        display: 'block',
                      }}
                    >
                      {item.label}
                    </a>
                  );
                }
                if (item.external) {
                  return (
                    <a
                      key={item.to}
                      href={item.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: '13px',
                        fontWeight: '400',
                        color: palette.primary.faded,
                        textDecoration: 'none',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        transition: 'all 0.15s ease',
                        letterSpacing: '0.02em',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      {item.label}
                      <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3.5 1.5h7m0 0v7m0-7L1.5 10.5" />
                      </svg>
                    </a>
                  );
                }
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/'}
                    style={({ isActive }) => ({
                      fontFamily: FONT_BODY,
                      fontSize: '13px',
                      fontWeight: isActive ? '500' : '400',
                      color: isActive ? palette.surface.stone : palette.primary.faded,
                      backgroundColor: isActive ? palette.primary.light : 'transparent',
                      textDecoration: 'none',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      transition: 'all 0.15s ease',
                      letterSpacing: '0.02em',
                    })}
                  >
                    {item.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
          <a
            href="https://github.com/vivandiere/cox-and-kings"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: FONT_BODY,
              fontSize: '11px',
              fontWeight: '400',
              color: palette.primary.faded,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              letterSpacing: '0.04em',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            View on GitHub
          </a>
          <p style={{
            fontFamily: FONT_BODY,
            fontSize: '10px',
            color: palette.primary.muted,
            marginTop: '12px',
          }}>
            Cox &amp; Kings {new Date().getFullYear()}
          </p>
        </div>
      </nav>

      <main style={{ flex: 1, marginLeft: '220px', minHeight: '100vh' }}>
        <Outlet />
      </main>
    </div>
  );
}
