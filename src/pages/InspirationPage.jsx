import React from 'react';
import { palette } from '../tokens/index.js';
import { FONT_HEADING, FONT_BODY, TS } from '../tokens/index.js';
import { LogoMark } from '../components/Logo.jsx';

export default function InspirationPage() {
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
      textAlign: 'center',
    }}>
      <LogoMark color={palette.neutral[200]} height={64} />
      <h1 style={{
        fontFamily: FONT_HEADING,
        color: palette.primary.default,
        fontSize: TS['2xl'],
        fontWeight: '500',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        marginTop: '32px',
        marginBottom: '12px',
      }}>
        Inspiration
      </h1>
      <p style={{
        fontFamily: FONT_BODY,
        color: palette.neutral[500],
        fontSize: TS.base,
        maxWidth: '440px',
        lineHeight: 1.6,
      }}>
        Discover pages for travel types — solo travel, specialist-led expeditions, wildlife safaris, cultural immersions, and more.
      </p>
    </div>
  );
}
