import React, { useState, useRef, useEffect, useCallback } from 'react';

/* ────────────────────────────────────────────────────
   Inline SVG Logo Components
   ──────────────────────────────────────────────────── */

function LogoMark({ color = 'currentColor', height = 48 }) {
  return (
    <svg viewBox="0 0 478.29 396.85" height={height} fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M383.75,100.93h-3.15v-20.42c-.12,0-.23,0-.35,0-8.8,0-18.35,6.06-18.76,23.08l-.05,1.96-1.78.83c-22.37,10.35-41.19,34.23-50.35,63.89l-4.7,15.31c-2.98-11.74-2.33-21.07-2.33-21.07,1.76-50.15,34.48-93.09,67.9-122.34l.47-17.33,83.46,71.41-2.69,4.68h-67.65ZM360.86,243.35s-11.47,14.38-25.38,17.57c-27.6-59.56-1.47-119.81,31.31-139.26,10.78,38.5,21.89,89.61-5.92,121.69M178.33,230.23l.85,20.86,9.56,4.05,3.07,1.13-1.29,3.01c-3.53,8.65-8.66,15.84-15.27,21.38-10.77,9.04-25.51,13.84-43.82,14.27l-6.25.14,3.6-5.12c6.58-9.34,10.06-20.55,10.06-32.4l.34-54.01c0-14.21,10.32-24.53,24.54-24.53l118.89-.17c3.22,44.3,29.75,88.03,29.75,88.03-56.92-4.18-134.04-36.63-134.04-36.63M52.57,257.55l.33-54.02c0-13.09,6.74-24.36,29.28-24.36-.66,1.21-1.28,2.45-1.83,3.74l-.44,1.05c-2.13,5.41-3.21,11.31-3.21,17.55v46.24c0,24.71-6.67,47.36-28.86,47.36l-7.26-.04s11.99-12.09,11.99-37.52M125.51,179.17c-3.53,6.38-5.49,13.94-5.49,22.34v49.24c0,9.65-2.67,18.58-7.72,25.84-4.71,6.76-11.31,11.84-19.1,14.71v70.77l-.2.54-12.91,34.23h33.62v-83.47l3.39.26c4.4.34,8.21.5,11.63.5,18.58,0,34.67-3.77,47.84-11.22l.04-.02c1.12-.64,2.22-1.3,3.29-1.98l45.15,63.16.31.43.16.51,9.73,31.84h43.18l-26.13-30.45-.09-.1-.07-.1-47.08-65.9h-24.24c2.52-1.65,4.9-3.4,7.08-5.25,9.1-7.74,16.07-17.63,20.7-29.39l1.13-2.86,2.89,1.05.48.18c3.99,1.24,8.14,2.57,12.31,3.89,27.82,8.88,56.59,18.05,85.76,18.05,4.53,0,9.03-.22,13.38-.66l1.8-.18,1.06,1.46,56.51,77.47.31.43.16.51,9.73,31.84h43.18l-26.13-30.45-.08-.09-.07-.1-61.78-84.3-2.07-2.82,3.01-1.77c19.3-12.82,30.75-24.09,39.59-41.09,3.93-7.67,5.28-12.77,5.28-12.77l15.33,19.33h11.99l-2.08,4.48-13.32,28.81-.36.79-.73.49-21.7,14.72,24.89,30.43,45.27-99.52h-59.1s.8-1.24,1.26-3.06l.16-.78c7.08-35.14-1.14-63.99-10.05-94.41l-1.18-4.04h77.42l15.43-30.5L369.39,0l-24.94,24.83c-43.78,41.74-57.75,85.58-61.56,133.39l-119.16-.07c-17.25,0-31.01,8.02-38.21,21l-15.1-20.91h-36.12c-24.04,1.4-40.55,18.8-40.55,43.27v49.24c0,22.98-13.77,56.3-33.75,62.83h37.66c33.83,0,57.87-24.18,57.87-56.04l.34-54.02c0-13.96,3.91-24.36,29.65-24.36"/>
    </svg>
  );
}

function LogoInline({ color = 'currentColor', height = 40 }) {
  return (
    <svg viewBox="0 0 501.97 141.73" height={height} fill={color} xmlns="http://www.w3.org/2000/svg">
      <polygon points="304.77 53.89 304.77 14.61 286.36 26.15 286.36 17.96 311.91 1.84 312.26 1.84 312.26 53.89 316.31 64.64 300.72 64.64 304.77 53.89"/>
      <polygon points="356.03 10.03 336.3 10.03 322.74 14.96 325.03 8.44 326.97 2.98 366.87 2.98 366.87 3.33 344.23 54.95 345.64 64.64 332.07 64.64 356.03 10.03"/>
      <path d="M280.41,137.5v-12.6c5.2,6.78,10.31,9.78,17,9.78,8.46,0,14.09-4.85,14.09-12.07s-5.64-11.89-14.62-11.89c-4.23,0-9.16.88-14.62,4.23l4.76-36.03h28.8l.79,5.64.79,5.81-13.48-4.4h-10.48l-2.38,18.41c2.2-.44,4.67-.71,7.58-.71,12.07,0,20.79,7.49,20.79,18.67,0,11.8-8.55,19.38-21.93,19.38-6.08,0-11.63-1.32-17.09-4.23"/>
      <path d="M361.71,94.69c0-5.99-4.76-9.86-11.98-9.86s-11.98,3.88-11.98,9.86,4.76,9.95,11.98,9.95,11.98-4.14,11.98-9.95M363.65,123.23c0-6.78-5.64-11.54-13.92-11.54s-13.92,4.76-13.92,11.54,5.55,11.45,13.92,11.45,13.92-4.58,13.92-11.45M327.88,123.5c0-7.14,4.67-13.04,12.86-15.33-6.78-2.11-10.92-6.87-10.92-13.74,0-9.95,8.72-16.65,19.91-16.65s19.91,6.7,19.91,16.65c0,6.87-4.14,11.63-9.86,13.74,7.14,2.29,11.8,8.19,11.8,15.33,0,11.63-9.78,18.23-21.84,18.23s-21.84-6.61-21.84-18.23"/>
      <path d="M0,70.46C0,29.12,29.89,0,71.82,0c16.11,0,31.44,3.69,45.61,12.42v29.7c-11.84-18.44-27.57-26.2-46.2-26.2-31.83,0-53.77,22.52-53.77,54.54s22.13,54.54,53.18,54.54c19.8,0,36.1-7.96,47.95-26.59v29.7c-14.56,8.93-30.09,12.81-49.3,12.81C29.51,140.92,0,111.81,0,70.46"/>
      <polygon points="470.71 139.19 461.79 120.16 415.59 71.44 415.59 116.67 424.13 139.19 390.55 139.19 399.09 116.67 399.09 25.83 390.55 3.31 424.13 3.31 415.59 25.83 415.59 60.96 459.07 20.97 469.36 3.31 501.77 3.31 433.45 66.39 501.97 139.19 470.71 139.19"/>
      <path d="M185.13,140.92c-29.26,0-51.33-22.07-51.33-51.33,0-19.73,10.42-37.11,27.25-45.51l-12.63-24.08V1.23h71.28v20.01h-1.27l-.18-.15c-2.73-2.23-6.46-3.36-11.09-3.36h-36.45c-1.65,0-3.2-.36-4.62-1.08l1.69,3.25,9.62,19.4v16.05l-3.16,1.13c-14.84,5.06-23.35,17.13-23.35,33.11,0,20.18,14.4,34.83,34.24,34.83s34.25-14.65,34.25-34.83c0-1.54,0-2.88-.19-4.2-.27-1.62.25-3.02,1.51-4.12h-15.29c-6.85,0-11.63,4.78-11.63,11.63v.65h-16.89v-.65c0-16.22,11.25-27.55,27.35-27.55h28.27c12.95,0,22.35-9.16,22.35-21.77v-.65h17.09v.65c0,21.37-15.28,37.49-35.54,37.49h-.59c.45,2.65.65,5.32.65,8.51,0,29.26-22.07,51.33-51.33,51.33"/>
    </svg>
  );
}

function LogoStacked({ color = 'currentColor', height = 64 }) {
  return (
    <svg viewBox="0 0 863.47 255.12" height={height} fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M0,53.43C0,22.08,22.67,0,54.47,0c12.22,0,23.85,2.8,34.59,9.42v22.52c-8.98-13.98-20.9-19.87-35.04-19.87-24.14,0-40.77,17.07-40.77,41.36s16.78,41.36,40.33,41.36c15.02,0,27.38-6.04,36.36-20.17v22.52c-11.04,6.77-22.82,9.71-37.39,9.71C22.38,106.87,0,84.79,0,53.43"/>
      <path d="M195.77,53.43c0-24.29-17.08-41.36-40.33-41.36s-40.33,17.07-40.33,41.36,17.08,41.36,40.33,41.36,40.33-17.07,40.33-41.36M101.86,53.43C101.86,22.08,125.26,0,155.44,0s53.58,22.08,53.58,53.43-23.4,53.43-53.58,53.43-53.58-22.08-53.58-53.43"/>
      <polygon points="224.62 88.32 250.52 52.99 225.2 18.55 210.93 1.92 235.36 1.92 240.22 17.81 259.21 43.72 278.34 17.81 283.35 1.92 307.34 1.92 293.06 18.55 267.75 52.7 293.65 88.32 307.93 104.96 283.5 104.96 278.64 89.06 258.91 61.97 239.04 89.06 234.18 104.96 210.34 104.96 224.62 88.32"/>
      <polygon points="494.73 104.96 487.96 90.53 452.92 53.58 452.92 87.88 459.4 104.96 433.94 104.96 440.41 87.88 440.41 18.99 433.94 1.92 459.4 1.92 452.92 18.99 452.92 45.63 485.9 15.31 493.7 1.92 518.28 1.92 466.47 49.76 518.43 104.96 494.73 104.96"/>
      <polygon points="536.7 87.88 536.7 18.99 530.22 1.91 555.69 1.91 549.21 18.99 549.21 87.88 555.69 104.95 530.22 104.95 536.7 87.88"/>
      <polygon points="576.59 87.88 576.59 17.22 570.11 1.91 590.57 1.91 648.42 83.32 648.42 18.99 641.95 1.91 667.12 1.91 660.64 18.99 660.64 104.95 648.13 104.95 588.81 21.49 588.81 87.88 595.28 104.95 570.11 104.95 576.59 87.88"/>
      <path d="M679.62,53.43c0-31.35,22.96-53.43,55.79-53.43,13.54,0,25.61,2.8,36.8,9.42v22.52c-9.57-13.98-22.23-19.87-36.51-19.87-26.05,0-42.84,17.07-42.84,41.36s16.34,41.36,39.6,41.36c12.95,0,23.99-4.71,31.06-12.07v-25.61h-33.41l4.86-11.19h44.31l-2.8,17.66v23.99c-9.27,11.19-25.32,19.28-44.01,19.28-30.18,0-52.84-22.08-52.84-53.43"/>
      <path d="M796.35,97.74v-22.82c8.69,13.1,20.02,19.87,33.56,19.87,12.66,0,20.61-6.77,20.61-17.37s-6.33-14.72-23.84-20.31c-22.23-7.07-29.88-15.6-29.88-29.73,0-16.63,13.69-27.38,34.59-27.38,10.01,0,20.46,2.5,29.59,7.21v22.08c-8.68-11.92-18.25-17.22-30.91-17.22-11.92,0-20.31,6.03-20.31,14.42,0,9.42,5.15,13.84,23.11,19.58,21.93,6.92,30.62,15.6,30.62,30.47,0,18.11-13.54,30.32-34,30.32-11.48,0-22.23-2.94-33.12-9.13"/>
      <polygon points="187.73 219.5 189.88 213.8 189.88 190.84 187.73 185.15 209.27 185.15 210.3 188.19 211.52 191.87 204.02 189.07 194.05 189.07 194.05 199.33 208.92 199.33 207.45 203.26 194.05 203.26 194.05 215.57 203.72 215.57 211.82 212.77 210.59 216.45 209.56 219.5 187.73 219.5"/>
      <path d="M215.74,217.98v-6.23c2.7,3.38,5.45,4.66,8.88,4.66,2.36,0,4.71-.79,4.71-3.24,0-2.21-2.45-2.85-5.25-3.48-4.27-.98-8.34-2.26-8.34-7.07s4.07-7.21,8.88-7.21c2.65,0,5.54.49,7.85,2.01v6.18c-2.6-3.09-4.91-4.46-8.1-4.46-2.65,0-4.51,1.23-4.51,3.19,0,2.21,2.45,2.85,5.25,3.48,4.27.98,8.34,2.26,8.34,7.07s-4.17,7.26-8.88,7.26c-2.99,0-6.23-.54-8.83-2.16"/>
      <path d="M241.5,211.25v-11.68h-6.13l1.47-3.63h4.66v-6.43l4.17-1.33v7.75h9.71l-1.47,3.63h-8.24v11.19c0,3.98,1.86,5.64,4.71,5.64,2.16,0,3.73-.98,5.05-2.6v5.1c-1.52.98-3.48,1.23-5.15,1.23-6.28,0-8.78-3.73-8.78-8.88"/>
      <polygon points="314.19 235.25 314.19 169.6 283.43 188.88 283.43 175.19 326.11 148.25 326.7 148.25 326.7 235.25 333.47 253.21 307.42 253.21 314.19 235.25"/>
      <polygon points="399.86 161.94 366.88 161.94 344.21 170.18 348.04 159.29 351.28 150.17 417.96 150.17 417.96 150.75 380.13 237.01 382.49 253.21 359.82 253.21 399.86 161.94"/>
      <path d="M425.61,248.05v-21.05c8.68,11.33,17.22,16.34,28.41,16.34,14.13,0,23.55-8.1,23.55-20.17s-9.42-19.87-24.43-19.87c-7.07,0-15.31,1.47-24.44,7.07l7.95-60.21h48.14l1.33,9.42,1.32,9.71-22.52-7.36h-17.52l-3.98,30.77c3.68-.74,7.8-1.18,12.66-1.18,20.17,0,34.74,12.51,34.74,31.21,0,19.73-14.28,32.38-36.65,32.38-10.16,0-19.43-2.21-28.56-7.07"/>
      <path d="M561.47,176.51c0-10.01-7.95-16.49-20.02-16.49s-20.02,6.48-20.02,16.49,7.95,16.63,20.02,16.63,20.02-6.92,20.02-16.63M564.71,224.21c0-11.33-9.42-19.28-23.26-19.28s-23.26,7.95-23.26,19.28,9.27,19.14,23.26,19.14,23.26-7.65,23.26-19.14M504.95,224.65c0-11.92,7.8-21.79,21.49-25.61-11.33-3.53-18.25-11.48-18.25-22.96,0-16.63,14.57-27.82,33.27-27.82s33.27,11.19,33.27,27.82c0,11.48-6.92,19.43-16.48,22.96,11.92,3.83,19.72,13.69,19.72,25.61,0,19.43-16.34,30.47-36.51,30.47s-36.51-11.04-36.51-30.47"/>
      <path d="M377.55,13.44l5.43-12.51h-54.05v14.24l9.58,18.26c-12.76,6.37-20.66,19.55-20.66,34.51,0,22.19,16.73,38.93,38.92,38.93s38.93-16.73,38.93-38.93c0-2.42-.15-4.44-.5-6.45h.45c15.36,0,26.95-12.22,26.95-28.43v-.49h-12.96v.49c0,9.57-7.13,16.51-16.95,16.51h-21.44c-12.21,0-20.74,8.59-20.74,20.89v.49h12.81v-.49c0-5.19,3.63-8.82,8.82-8.82h11.6c-.96.84-1.35,1.9-1.14,3.12.14,1,.14,2.01.14,3.18,0,15.3-10.92,26.41-25.97,26.41s-25.97-11.11-25.97-26.41c0-12.12,6.45-21.27,17.71-25.11l2.4-.86v-12.17l-7.3-14.71-1.28-2.46c1.08.54,2.25.82,3.5.82h31.72Z"/>
    </svg>
  );
}

// AnimatedLogo removed — SVG paths in assets/logo-animated.svg

/* ────────────────────────────────────────────────────
   Font Constants
   ──────────────────────────────────────────────────── */
const FONT_HEADING = "'MesoTRIAL', Georgia, 'Times New Roman', serif";
const FONT_BODY    = "'CenoTRIAL', system-ui, -apple-system, sans-serif";
const FONT_MONO    = "'chainprinter', 'Courier New', monospace";

export default function ColorPalette() {
  const [activeAccent, setActiveAccent] = useState('primary');
  const [heroMode, setHeroMode] = useState('offWhite');
  const [logoCompact, setLogoCompact] = useState(false);
  const [heroSlide, setHeroSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuSearch, setMenuSearch] = useState('');
  const scrollContainerRef = useRef(null);

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

  const handleViewportScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrolled = el.scrollTop > 40;
    if (scrolled && !logoCompact) setLogoCompact(true);
    else if (!scrolled && logoCompact) setLogoCompact(false);
  }, [logoCompact]);
  
  const brandAccents = {
    primary: { name: 'Primary Only', hex: '#102037', desc: 'No additional accent — uses primary throughout' },
  };
  
  const brandDecorative = {
    warmSand: { name: 'Warm Sand', hex: '#E5BDB1', desc: 'Brand decorative — soft blush sand' },
    cream: { name: 'Soft Cream', hex: '#F8F1CD', desc: 'Brand decorative — warm cream' },
    mist: { name: 'Cool Mist', hex: '#DAE0EF', desc: 'Brand decorative — soft blue-grey' },
  };
  
  const brandDecorativeDeep = {
    warmSandDeep: { name: 'Warm Sand Deep', hex: '#B58474', desc: 'Brand compound — legible warm sand' },
    creamDeep: { name: 'Soft Cream Deep', hex: '#9A8A5A', desc: 'Brand compound — legible ochre cream' },
    mistDeep: { name: 'Cool Mist Deep', hex: '#566A9B', desc: 'Brand compound — deeper blue-grey' },
  };
  
  const uiAccents = {
    sandDeep: { name: 'Desert Sand', hex: '#C4897A', desc: 'Deeper sand — good contrast on light surfaces' },
    khaki: { name: 'Soft Khaki', hex: '#8A8562', desc: 'Earthy neutral — safari-friendly, legible' },
    khakiGold: { name: 'Golden Khaki', hex: '#A08C4A', desc: 'Warmer gold-toned khaki — luxe feel' },
    terracotta: { name: 'Soft Terracotta', hex: '#D4836A', desc: 'Warm, earthy, very travel-appropriate' },
    sage: { name: 'Muted Sage', hex: '#6B9B7A', desc: 'Natural, calming, safari-friendly' },
    periwinkle: { name: 'Dusty Periwinkle', hex: '#7B8CDE', desc: 'Soft but distinctive, modern feel' },
    rose: { name: 'Dusty Rose', hex: '#C4727E', desc: 'Sophisticated warmth, luxury feel' },
    teal: { name: 'Soft Teal', hex: '#5B9A8B', desc: 'Fresh, oceanic, cruise-appropriate' },
    amber: { name: 'Muted Amber', hex: '#C9944A', desc: 'Golden hour warmth, premium' },
    slate: { name: 'Warm Slate', hex: '#7889A4', desc: 'Subtle, professional, very versatile' },
    mauve: { name: 'Soft Mauve', hex: '#A87CA0', desc: 'Unique, memorable, slightly unexpected' },
  };
  
  const accents = { ...brandAccents, ...brandDecorative, ...brandDecorativeDeep, ...uiAccents };

  const palette = {
    surface: {
      white: '#FFFFFF',
      stone: '#F2F2EB',
      subtleStone: '#E8E8E0',
    },
    primary: {
      default: '#102037',
      light: '#1E3A5F',
      lighter: '#2D5280',
      muted: '#4A6380',
      faded: '#8FA3B8',
      tint: '#E8ECF0',
    },
    semantic: {
      success: '#4A9B8A',
      successLight: '#E8F2EF',
      warning: '#B08968',
      warningLight: '#F5EDE6',
      error: '#B07878',
      errorLight: '#F5EBEB',
      info: '#8E9AAF',
      infoLight: '#ECEEF2',
    },
    neutral: {
      900: '#1A1A18',
      700: '#4A4A46',
      500: '#7A7A74',
      400: '#9A9A94',
      300: '#BABAB4',
      200: '#D4D4CC',
      100: '#EAEAE4',
    }
  };

  const accent = accents[activeAccent];
  const isPrimaryAccent = activeAccent === 'primary';
  const lightAccents = ['warmSand', 'cream', 'mist'];
  const isLightAccent = lightAccents.includes(activeAccent);
  const onPrimaryText = isPrimaryAccent ? palette.surface.stone : accent.hex;
  const onPrimaryButtonBg = isPrimaryAccent ? palette.surface.stone : accent.hex;
  const onPrimaryButtonText = isPrimaryAccent ? palette.primary.default : palette.primary.default;

  // Perfect Fourth type scale — ratio 1.333, base 16px
  const TS = {
    xs:     '9px',    // 16 / 1.333³
    sm:     '12px',   // 16 / 1.333
    base:   '16px',   // base
    bodyLg: '21px',   // body large
    lg:     '26px',   // 16 × 1.333 (brand statement)
    xl:     '28px',   // 16 × 1.333²
    '2xl':  '38px',   // 16 × 1.333³
    '3xl':  '51px',   // 16 × 1.333⁴
    '4xl':  '67px',   // 16 × 1.333⁵
    hero:   '72px',   // hero display
  };

  const sectionLabel = {
    fontFamily: FONT_BODY,
    fontSize: TS.sm,
    fontWeight: '300',
    color: palette.neutral[400],
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '8px',
  };

  const sectionHeading = {
    fontFamily: FONT_HEADING,
    fontSize: TS.bodyLg,
    fontWeight: '500',
    color: palette.primary.default,
    marginBottom: '16px',
  };

  const card = {
    backgroundColor: '#FFFFFF',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 1px 3px rgba(16,32,55,0.08)',
  };

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

  const filteredDestinations = menuSearch.trim()
    ? destinations.filter(d =>
        d.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
        d.region.toLowerCase().includes(menuSearch.toLowerCase())
      )
    : [];

  const menuNavItems = [
    { label: 'Destinations', type: 'heading' },
    { label: 'Inspiration', type: 'heading' },
    { label: 'Small Group Tours', type: 'link' },
    { label: 'Tailormade Journeys', type: 'link' },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: palette.surface.stone,
      fontFamily: FONT_BODY,
      padding: '40px 32px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* ════════════════ HEADER ════════════════ */}
        <div style={{ marginBottom: '8px' }}>
          <h1 style={{ 
            fontFamily: FONT_HEADING,
            color: palette.primary.default, 
            fontSize: TS['2xl'], 
            fontWeight: '500',
            letterSpacing: '0.05em',
            lineHeight: 1.1,
            textTransform: 'uppercase',
          }}>
            UI Color Palette
          </h1>
          <p style={{ 
            fontFamily: FONT_BODY,
            color: palette.neutral[500], 
            fontSize: TS.sm,
            marginTop: '4px',
          }}>
            Based on primary #102037 and stone #F2F2EB
          </p>
        </div>
        <p style={{ 
          fontFamily: FONT_BODY,
          color: palette.neutral[400], 
          fontSize: TS.sm,
          marginBottom: '32px',
        }}>
          Headers in <strong style={{ fontFamily: FONT_HEADING, fontWeight: '500' }}>MesoTRIAL Medium</strong> &middot; Body in <strong>CenoTRIAL</strong> &middot; Labels in <span style={{ fontWeight: '300' }}>CenoTRIAL Light</span>
        </p>

        {/* ════════════════ ACCENT SELECTOR ════════════════ */}
        <div style={{ ...card, marginBottom: '24px' }}>
          <h2 style={{ 
            fontFamily: FONT_BODY,
            fontSize: '11px', 
            fontWeight: '300', 
            color: palette.neutral[400],
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '16px'
          }}>
            Choose Accent Color
          </h2>
          
          <div style={{ marginBottom: '16px' }}>
            {Object.entries(brandAccents).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveAccent(key)}
                style={{
                  fontFamily: FONT_BODY,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: activeAccent === key ? `2px solid ${palette.primary.default}` : '2px solid transparent',
                  backgroundColor: activeAccent === key ? palette.primary.tint : palette.surface.stone,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '5px',
                  backgroundColor: value.hex,
                }}/>
                <span style={{ fontWeight: '500', color: palette.primary.default, fontSize: '13px' }}>
                  {value.name}
                </span>
              </button>
            ))}
          </div>

          <p style={sectionLabel}>Brand Decorative</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {Object.entries(brandDecorative).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveAccent(key)}
                style={{
                  fontFamily: FONT_BODY,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: activeAccent === key ? `2px solid ${value.hex}` : '2px solid transparent',
                  backgroundColor: activeAccent === key ? `${value.hex}40` : palette.surface.stone,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '5px',
                  backgroundColor: value.hex,
                  border: `1px solid ${palette.neutral[300]}`,
                }}/>
                <span style={{ fontWeight: '500', color: palette.primary.default, fontSize: '13px' }}>
                  {value.name}
                </span>
              </button>
            ))}
          </div>

          <p style={sectionLabel}>Brand (Deeper Variants)</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {Object.entries(brandDecorativeDeep).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveAccent(key)}
                style={{
                  fontFamily: FONT_BODY,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: activeAccent === key ? `2px solid ${value.hex}` : '2px solid transparent',
                  backgroundColor: activeAccent === key ? `${value.hex}40` : palette.surface.stone,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '5px',
                  backgroundColor: value.hex,
                }}/>
                <span style={{ fontWeight: '500', color: palette.primary.default, fontSize: '13px' }}>
                  {value.name}
                </span>
              </button>
            ))}
          </div>

          <p style={sectionLabel}>UI Accent Options (higher contrast)</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {Object.entries(uiAccents).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveAccent(key)}
                style={{
                  fontFamily: FONT_BODY,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: activeAccent === key ? `2px solid ${value.hex}` : '2px solid transparent',
                  backgroundColor: activeAccent === key ? `${value.hex}30` : palette.surface.stone,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '5px',
                  backgroundColor: value.hex,
                }}/>
                <span style={{ fontWeight: '500', color: palette.primary.default, fontSize: '13px' }}>
                  {value.name}
                </span>
              </button>
            ))}
          </div>
          
          <p style={{ marginTop: '12px', fontSize: '14px', color: palette.neutral[500], fontFamily: FONT_BODY }}>
            {accent.desc}
          </p>
        </div>

        {/* ════════════════ LOGO SHOWCASE ════════════════ */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{ 
            ...card,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            padding: '32px 24px',
          }}>
            <p style={sectionLabel}>Logo Mark — On White</p>
            <LogoMark color={palette.primary.default} height={56} />
            {!isPrimaryAccent && (
              <LogoMark color={accent.hex} height={40} />
            )}
          </div>

          <div style={{ 
            backgroundColor: palette.surface.stone,
            borderRadius: '12px',
            padding: '32px 24px',
            border: '1px solid #E0E0D8',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}>
            <p style={sectionLabel}>Inline Logo — On Stone</p>
            <LogoInline color={palette.primary.default} height={36} />
          </div>

          <div style={{ 
            backgroundColor: palette.primary.default,
            borderRadius: '12px',
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
          }}>
            <p style={{ ...sectionLabel, color: palette.primary.faded }}>Stacked Logo — On Primary</p>
            <LogoStacked color={palette.surface.stone} height={56} />
            {!isPrimaryAccent && (
              <LogoStacked color={accent.hex} height={44} />
            )}
          </div>
        </div>

        {/* ════════════════ CONTRAST TEST PANEL ════════════════ */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{ ...card, textAlign: 'center' }}>
            <p style={sectionLabel}>On White</p>
            <p style={{ color: accent.hex, fontSize: '18px', fontWeight: '500', marginBottom: '8px', fontFamily: FONT_HEADING }}>
              Accent Text
            </p>
            {isLightAccent && (
              <p style={{ fontSize: '11px', color: palette.semantic.warning, marginBottom: '8px', fontFamily: FONT_BODY }}>⚠ Low contrast</p>
            )}
            <button style={{
              fontFamily: FONT_BODY,
              backgroundColor: accent.hex,
              color: isLightAccent ? palette.primary.default : '#FFFFFF',
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              fontWeight: '500',
              fontSize: '13px',
            }}>
              Button
            </button>
          </div>

          <div style={{ 
            backgroundColor: palette.surface.stone, 
            borderRadius: '12px', 
            padding: '24px',
            border: '1px solid #E0E0D8',
            textAlign: 'center'
          }}>
            <p style={sectionLabel}>On Stone</p>
            <p style={{ color: accent.hex, fontSize: '18px', fontWeight: '500', marginBottom: '8px', fontFamily: FONT_HEADING }}>
              Accent Text
            </p>
            {isLightAccent && (
              <p style={{ fontSize: '11px', color: palette.semantic.warning, marginBottom: '8px', fontFamily: FONT_BODY }}>⚠ Low contrast</p>
            )}
            <button style={{
              fontFamily: FONT_BODY,
              backgroundColor: accent.hex,
              color: isLightAccent ? palette.primary.default : '#FFFFFF',
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              fontWeight: '500',
              fontSize: '13px',
            }}>
              Button
            </button>
          </div>

          <div style={{ 
            backgroundColor: palette.primary.default, 
            borderRadius: '12px', 
            padding: '24px',
            textAlign: 'center'
          }}>
            <p style={{ ...sectionLabel, color: palette.primary.faded }}>On Primary</p>
            <p style={{ color: onPrimaryText, fontSize: '18px', fontWeight: '500', marginBottom: '8px', fontFamily: FONT_HEADING }}>
              {isPrimaryAccent ? 'Stone Text' : 'Accent Text'}
            </p>
            {isLightAccent && (
              <p style={{ fontSize: '11px', color: palette.semantic.success, marginBottom: '8px', fontFamily: FONT_BODY }}>✓ Good contrast</p>
            )}
            <button style={{
              fontFamily: FONT_BODY,
              backgroundColor: onPrimaryButtonBg,
              color: onPrimaryButtonText,
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              fontWeight: '500',
              fontSize: '13px',
            }}>
              Button
            </button>
          </div>
        </div>

        {/* ════════════════ MAIN PALETTE GRID ════════════════ */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          
          {/* Surfaces */}
          <div style={card}>
            <h3 style={sectionHeading}>Surface</h3>
            {Object.entries(palette.surface).map(([key, hex]) => {
              const displayNames = { white: 'White', stone: 'Stone', subtleStone: 'Subtle Stone' };
              return (
                <div key={key} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '8px',
                    backgroundColor: hex, border: '1px solid #E0E0D8', marginRight: '12px'
                  }}/>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: palette.primary.default }}>{displayNames[key] || key}</div>
                    <div style={{ fontSize: '13px', color: palette.neutral[500], fontFamily: 'monospace' }}>{hex}</div>
                  </div>
                </div>
              );
            })}
            <p style={{ ...sectionLabel, marginTop: '16px', marginBottom: '12px' }}>Brand Decorative (sparingly as backgrounds)</p>
            {[
              { name: 'Warm Sand', hex: '#E5BDB1' },
              { name: 'Soft Cream', hex: '#F8F1CD' },
              { name: 'Cool Mist', hex: '#DAE0EF' },
            ].map(({ name, hex }) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '8px',
                  backgroundColor: hex, border: '1px solid #E0E0D8', marginRight: '12px'
                }}/>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: palette.primary.default }}>{name}</div>
                  <div style={{ fontSize: '13px', color: palette.neutral[500], fontFamily: 'monospace' }}>{hex}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Primary */}
          <div style={card}>
            <h3 style={sectionHeading}>Primary</h3>
            {Object.entries(palette.primary).map(([name, hex]) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '8px',
                  backgroundColor: hex, marginRight: '12px'
                }}/>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: palette.primary.default }}>{name}</div>
                  <div style={{ fontSize: '13px', color: palette.neutral[500], fontFamily: 'monospace' }}>{hex}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Accent */}
          <div style={card}>
            <h3 style={sectionHeading}>
              Accent {isPrimaryAccent && <span style={{ fontWeight: '400', color: palette.neutral[400] }}>(using primary)</span>}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '8px',
                backgroundColor: accent.hex, marginRight: '12px',
                border: isLightAccent ? '1px solid #E0E0D8' : 'none'
              }}/>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: palette.primary.default }}>default</div>
                <div style={{ fontSize: '13px', color: palette.neutral[500], fontFamily: 'monospace' }}>{accent.hex}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '8px',
                backgroundColor: isPrimaryAccent ? palette.primary.tint : `${accent.hex}20`,
                marginRight: '12px', border: '1px solid #E0E0D8'
              }}/>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: palette.primary.default }}>tint</div>
                <div style={{ fontSize: '13px', color: palette.neutral[500], fontFamily: 'monospace' }}>{isPrimaryAccent ? palette.primary.tint : `${accent.hex}20`}</div>
              </div>
            </div>
            {isPrimaryAccent && (
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '8px',
                  backgroundColor: palette.surface.stone, marginRight: '12px', border: '1px solid #E0E0D8'
                }}/>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: palette.primary.default }}>onPrimary</div>
                  <div style={{ fontSize: '13px', color: palette.neutral[500], fontFamily: 'monospace' }}>{palette.surface.stone}</div>
                </div>
              </div>
            )}
          </div>

          {/* Semantic */}
          <div style={card}>
            <h3 style={sectionHeading}>Semantic (compound)</h3>
            {[
              { name: 'success', hex: palette.semantic.success, light: palette.semantic.successLight },
              { name: 'warning', hex: palette.semantic.warning, light: palette.semantic.warningLight },
              { name: 'error', hex: palette.semantic.error, light: palette.semantic.errorLight },
              { name: 'info', hex: palette.semantic.info, light: palette.semantic.infoLight },
            ].map(({ name, hex, light }) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '8px',
                  backgroundColor: hex, marginRight: '8px'
                }}/>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '8px',
                  backgroundColor: light, marginRight: '12px', border: '1px solid #E0E0D8'
                }}/>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: palette.primary.default }}>{name}</div>
                  <div style={{ fontSize: '13px', color: palette.neutral[500], fontFamily: 'monospace' }}>{hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════ NEUTRALS BAR ════════════════ */}
        <div style={{ ...card, marginBottom: '24px' }}>
          <h3 style={sectionHeading}>Neutrals (warm-shifted to match stone)</h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {Object.entries(palette.neutral).map(([name, hex]) => (
              <div key={name} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '60px', height: '60px', borderRadius: '8px',
                  backgroundColor: hex, marginBottom: '8px',
                  border: name === '100' || name === '200' ? '1px solid #E0E0D8' : 'none'
                }}/>
                <div style={{ fontSize: '12px', color: palette.neutral[500] }}>{name}</div>
                <div style={{ fontSize: '11px', color: palette.neutral[400], fontFamily: 'monospace' }}>{hex}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════ TYPOGRAPHY PREVIEW ════════════════ */}
        <div style={{ ...card, marginBottom: '24px' }}>
          <h3 style={sectionHeading}>Typography Preview</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <p style={sectionLabel}>MesoTRIAL — Headers</p>
              <h2 style={{ fontFamily: FONT_HEADING, color: palette.primary.default, fontSize: TS.xl, fontWeight: '700', marginBottom: '8px' }}>
                Bold 700
              </h2>
              <h2 style={{ fontFamily: FONT_HEADING, color: palette.primary.default, fontSize: TS.xl, fontWeight: '500', marginBottom: '8px' }}>
                Medium 500
              </h2>
              <h2 style={{ fontFamily: FONT_HEADING, color: palette.primary.default, fontSize: TS.xl, fontWeight: '400', marginBottom: '8px' }}>
                Regular 400
              </h2>
              <h2 style={{ fontFamily: FONT_HEADING, color: palette.primary.default, fontSize: TS.xl, fontWeight: '300', marginBottom: '8px' }}>
                Light 300
              </h2>
              <h3 style={{ fontFamily: FONT_HEADING, color: palette.primary.light, fontSize: TS.bodyLg, fontWeight: '500', marginBottom: '4px', marginTop: '16px' }}>
                Discover India's Hidden Gems
              </h3>
              <h4 style={{ fontFamily: FONT_HEADING, color: palette.primary.muted, fontSize: TS.base, fontWeight: '500' }}>
                A Journey Through Time &amp; Culture
              </h4>
            </div>
            <div>
              <p style={sectionLabel}>CenoTRIAL — Body &amp; Labels</p>
              <p style={{ fontFamily: FONT_BODY, color: palette.primary.default, fontSize: TS.base, lineHeight: 1.65, marginBottom: '12px' }}>
                Cox &amp; Kings, established in 1758, is the world's longest-established travel company. From the majestic palaces of Rajasthan to the serene backwaters of Kerala, every journey tells a story.
              </p>
              <p style={{ fontFamily: FONT_BODY, color: palette.neutral[500], fontSize: '14px', lineHeight: 1.6, marginBottom: '12px' }}>
                <strong style={{ fontWeight: '700' }}>Bold 700</strong> &middot;
                <span style={{ fontWeight: '500' }}> Medium 500</span> &middot;
                <span style={{ fontWeight: '400' }}> Regular 400</span> &middot;
                <span style={{ fontWeight: '300' }}> Light 300</span>
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '300',
                  color: palette.neutral[500], textTransform: 'uppercase', letterSpacing: '0.08em',
                  padding: '6px 10px', backgroundColor: palette.surface.subtleStone, borderRadius: '4px',
                }}>Label Style</span>
                <span style={{
                  fontFamily: FONT_BODY, fontSize: '13px', fontWeight: '400',
                  color: palette.neutral[700], padding: '6px 10px',
                  backgroundColor: palette.surface.subtleStone, borderRadius: '4px',
                }}>Caption Style</span>
                <span style={{
                  fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '300',
                  color: isPrimaryAccent ? palette.primary.default : accent.hex,
                  padding: '6px 10px', backgroundColor: isPrimaryAccent ? palette.primary.tint : `${accent.hex}15`,
                  borderRadius: '4px',
                }}>Accent Label</span>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════ UI EXAMPLES ════════════════ */}
        <div style={{ ...card, padding: '32px', marginBottom: '24px' }}>
          <h3 style={sectionHeading}>UI Examples</h3>
          
          {/* Buttons */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ ...sectionLabel, marginBottom: '12px' }}>Buttons</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button style={{
                fontFamily: FONT_BODY,
                backgroundColor: palette.primary.default,
                color: '#FFFFFF',
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '500',
                fontSize: '14px',
                cursor: 'pointer',
              }}>
                Primary Button
              </button>
              {!isPrimaryAccent && (
                <button style={{
                  fontFamily: FONT_BODY,
                  backgroundColor: accent.hex,
                  color: isLightAccent ? palette.primary.default : '#FFFFFF',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '500',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}>
                  Accent Button
                </button>
              )}
              <button style={{
                fontFamily: FONT_BODY,
                backgroundColor: 'transparent',
                color: palette.primary.default,
                padding: '12px 24px',
                borderRadius: '8px',
                border: `1px solid ${palette.neutral[200]}`,
                fontWeight: '500',
                fontSize: '14px',
                cursor: 'pointer',
              }}>
                Secondary
              </button>
              <button style={{
                fontFamily: FONT_BODY,
                backgroundColor: 'transparent',
                color: isPrimaryAccent ? palette.primary.default : (isLightAccent ? palette.primary.muted : accent.hex),
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '500',
                fontSize: '14px',
                cursor: 'pointer',
                textDecoration: isPrimaryAccent || isLightAccent ? 'underline' : 'none',
              }}>
                Text Link →
              </button>
            </div>
          </div>

          {/* Form Elements */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ ...sectionLabel, marginBottom: '12px' }}>Form Elements</p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ width: '200px' }}>
                <label style={{ fontFamily: FONT_BODY, fontSize: '13px', fontWeight: '300', color: palette.neutral[700], display: 'block', marginBottom: '6px' }}>Input Field</label>
                <input 
                  type="text" 
                  placeholder="Enter text..."
                  style={{
                    fontFamily: FONT_BODY,
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: `1px solid ${palette.neutral[200]}`,
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>
              <div style={{ width: '200px' }}>
                <label style={{ fontFamily: FONT_BODY, fontSize: '13px', fontWeight: '300', color: palette.neutral[700], display: 'block', marginBottom: '6px' }}>Focused State</label>
                <input 
                  type="text" 
                  placeholder="Focused..."
                  style={{
                    fontFamily: FONT_BODY,
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: `2px solid ${isPrimaryAccent ? palette.primary.default : accent.hex}`,
                    fontSize: '14px',
                    outline: 'none',
                  }}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '24px' }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '4px',
                  backgroundColor: isPrimaryAccent ? palette.primary.default : accent.hex,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: isLightAccent ? palette.primary.default : '#FFFFFF', fontSize: '12px'
                }}>✓</div>
                <span style={{ fontFamily: FONT_BODY, fontSize: '14px', color: palette.neutral[700] }}>Checkbox</span>
              </div>
            </div>
          </div>

          {/* Cards with Logo */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ ...sectionLabel, marginBottom: '12px' }}>Cards</p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{
                backgroundColor: palette.surface.stone,
                borderRadius: '12px',
                padding: '20px',
                width: '220px',
              }}>
                <div style={{ 
                  width: '100%', height: '100px', 
                  backgroundColor: palette.primary.tint,
                  borderRadius: '8px', marginBottom: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <LogoMark color={palette.primary.muted} height={48} />
                </div>
                <h4 style={{ fontFamily: FONT_HEADING, fontSize: '15px', fontWeight: '500', color: palette.primary.default, marginBottom: '4px' }}>Rajasthan Tour</h4>
                <p style={{ fontFamily: FONT_BODY, fontSize: '13px', color: palette.neutral[500], marginBottom: '12px' }}>Discover the land of kings and forts</p>
                <span style={{ 
                  fontFamily: FONT_BODY,
                  fontSize: '13px', 
                  color: isPrimaryAccent || isLightAccent ? palette.primary.default : accent.hex, 
                  fontWeight: '500',
                  textDecoration: isPrimaryAccent || isLightAccent ? 'underline' : 'none'
                }}>Learn more →</span>
              </div>
              
              <div style={{
                backgroundColor: palette.primary.default,
                borderRadius: '12px',
                padding: '20px',
                width: '220px',
              }}>
                <div style={{ marginBottom: '12px' }}>
                  <LogoMark color={isPrimaryAccent ? palette.surface.stone : accent.hex} height={32} />
                </div>
                <div style={{ 
                  fontFamily: FONT_BODY,
                  fontSize: '12px', color: onPrimaryText, fontWeight: '300',
                  marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em'
                }}>
                  Featured
                </div>
                <h4 style={{ fontFamily: FONT_HEADING, fontSize: '15px', fontWeight: '500', color: '#FFFFFF', marginBottom: '4px' }}>Kerala Backwaters</h4>
                <p style={{ fontFamily: FONT_BODY, fontSize: '13px', color: palette.primary.faded, marginBottom: '12px' }}>Serene houseboats &amp; spice gardens</p>
                <button style={{
                  fontFamily: FONT_BODY,
                  backgroundColor: onPrimaryButtonBg,
                  color: onPrimaryButtonText,
                  padding: '8px 16px',
                  borderRadius: '6px',
                  border: 'none',
                  fontWeight: '500',
                  fontSize: '13px',
                }}>
                  Explore
                </button>
              </div>

              {isLightAccent && (
                <div style={{
                  backgroundColor: accent.hex,
                  borderRadius: '12px',
                  padding: '20px',
                  width: '220px',
                }}>
                  <div style={{ marginBottom: '12px' }}>
                    <LogoMark color={palette.primary.default} height={32} />
                  </div>
                  <div style={{ 
                    fontFamily: FONT_BODY,
                    fontSize: '12px', color: palette.primary.default, fontWeight: '300',
                    marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em'
                  }}>
                    On Accent
                  </div>
                  <h4 style={{ fontFamily: FONT_HEADING, fontSize: '15px', fontWeight: '500', color: palette.primary.default, marginBottom: '4px' }}>Accent Card</h4>
                  <p style={{ fontFamily: FONT_BODY, fontSize: '13px', color: palette.primary.muted, marginBottom: '12px' }}>Light accents work great as fills</p>
                  <button style={{
                    fontFamily: FONT_BODY,
                    backgroundColor: palette.primary.default,
                    color: '#FFFFFF',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    fontWeight: '500',
                    fontSize: '13px',
                  }}>
                    Action
                  </button>
                </div>
              )}
            </div>
          </div>


          {/* Alerts */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ ...sectionLabel, marginBottom: '12px' }}>Alerts (compound semantic)</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
              {[
                { bg: palette.semantic.successLight, border: palette.semantic.success, icon: '✓', label: 'Success message', desc: 'Your changes have been saved.' },
                { bg: palette.semantic.warningLight, border: palette.semantic.warning, icon: '⚠', label: 'Warning message', desc: 'Please review before continuing.' },
                { bg: palette.semantic.errorLight, border: palette.semantic.error, icon: '✕', label: 'Error message', desc: 'Something went wrong.' },
                { bg: palette.semantic.infoLight, border: palette.semantic.info, icon: 'ℹ', label: 'Info message', desc: 'Here\'s some helpful information.' },
              ].map(({ bg, border, icon, label, desc }) => (
                <div key={label} style={{
                  backgroundColor: bg,
                  borderLeft: `3px solid ${border}`,
                  padding: '12px 16px',
                  borderRadius: '0 8px 8px 0',
                }}>
                  <span style={{ fontFamily: FONT_BODY, color: border, fontSize: '14px', fontWeight: '500' }}>{icon} {label}</span>
                  <p style={{ fontFamily: FONT_BODY, color: palette.neutral[700], fontSize: '13px', marginTop: '4px' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Status Badges */}
          <div>
            <p style={{ ...sectionLabel, marginBottom: '12px' }}>Status Badges</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              {[
                { bg: palette.semantic.successLight, color: palette.semantic.success, label: 'Confirmed' },
                { bg: palette.semantic.warningLight, color: palette.semantic.warning, label: 'Pending' },
                { bg: palette.semantic.errorLight, color: palette.semantic.error, label: 'Cancelled' },
                { bg: palette.semantic.infoLight, color: palette.semantic.info, label: 'Processing' },
              ].map(({ bg, color, label }) => (
                <span key={label} style={{
                  fontFamily: FONT_BODY,
                  backgroundColor: bg,
                  color: color,
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: '500',
                }}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════ NAV + HERO COMBINED PREVIEW (scrollable viewport) ════════════════ */}
        {(() => {
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
          return (
            <div style={{ 
              ...card,
              padding: '0',
              overflow: 'hidden',
              marginBottom: '24px',
            }}>
              {/* Controls bar */}
              <div style={{ 
                padding: '24px 24px 0 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <p style={{ ...sectionLabel, marginBottom: 0 }}>Nav + Hero Preview</p>
                  <span style={{
                    fontFamily: FONT_BODY, fontSize: '10px', color: palette.neutral[400],
                    backgroundColor: palette.surface.subtleStone, borderRadius: '4px', padding: '3px 8px',
                    letterSpacing: '0.04em',
                  }}>
                    {logoCompact ? 'SCROLLED — FLOATING NAV' : 'TOP — FULL NAV'}
                  </span>
                </div>
                <div style={{
                  display: 'flex',
                  backgroundColor: palette.surface.subtleStone,
                  borderRadius: '8px',
                  padding: '3px',
                  gap: '2px',
                }}>
                  {[
                    { key: 'offWhite', label: 'Stone' },
                    { key: 'dark', label: 'Dark' },
                  ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setHeroMode(key)}
                      style={{
                        fontFamily: FONT_BODY,
                        fontSize: '12px',
                        fontWeight: heroMode === key ? '600' : '400',
                        color: heroMode === key ? palette.primary.default : palette.neutral[500],
                        backgroundColor: heroMode === key ? '#FFFFFF' : 'transparent',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '6px 14px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: heroMode === key ? '0 1px 2px rgba(0,0,0,0.08)' : 'none',
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              {/* Browser-like viewport */}
              <div style={{ padding: '16px 24px 24px' }}>
                {/* Fake browser chrome */}
                <div style={{
                  backgroundColor: palette.neutral[100],
                  borderRadius: '12px 12px 0 0',
                  padding: '10px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderBottom: `1px solid ${palette.neutral[200]}`,
                }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FF5F57' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FEBC2E' }} />
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#28C840' }} />
                  </div>
                  <div style={{
                    flex: 1, backgroundColor: '#FFFFFF', borderRadius: '6px', padding: '5px 12px',
                    fontSize: '11px', fontFamily: FONT_BODY, color: palette.neutral[400],
                  }}>
                    coxandkings.com
                  </div>
                </div>
                {/* Scrollable viewport */}
                <div
                  ref={scrollContainerRef}
                  onScroll={handleViewportScroll}
                  style={{
                    height: '620px',
                    overflowY: 'auto',
                    borderRadius: '0 0 12px 12px',
                    border: `1px solid ${palette.neutral[200]}`,
                    borderTop: 'none',
                    position: 'relative',
                    backgroundColor: palette.primary.default,
                  }}
                >
                  {/* Sticky nav — direct child of scroll container so sticky works */}
                  <div style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    height: '104px',
                  }}>
                    {/* Full-width nav (top / not scrolled) */}
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0,
                      display: 'grid',
                      gridTemplateColumns: '1fr auto 1fr',
                      alignItems: 'center',
                      padding: '20px 24px',
                      opacity: logoCompact ? 0 : 1,
                      pointerEvents: logoCompact ? 'none' : 'auto',
                      transition: 'opacity 0.35s ease',
                    }}>
                      <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
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

                    {/* Floating compact nav (scrolled) */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      left: '50%',
                      transform: logoCompact ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-12px)',
                      width: '100%',
                      maxWidth: '540px',
                      opacity: logoCompact ? 1 : 0,
                      pointerEvents: logoCompact ? 'auto' : 'none',
                      transition: 'opacity 0.4s ease, transform 0.4s ease, background-color 0.3s ease',
                    }}>
                      {/* Nav bar */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto 1fr',
                        alignItems: 'center',
                        backgroundColor: hm.navBg,
                        padding: '12px 20px',
                        backdropFilter: 'blur(16px)',
                        border: `1px solid ${navBorderColor}`,
                      }}>
                      {/* Left — Hamburger + Menu */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setMenuOpen(!menuOpen)}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <div style={{ width: '18px', height: '1.5px', backgroundColor: hm.navLinkActive }} />
                          <div style={{ width: '18px', height: '1.5px', backgroundColor: hm.navLinkActive }} />
                        </div>
                        <span style={{
                          fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '500',
                          color: hm.navLinkActive, letterSpacing: '0.08em', textTransform: 'uppercase',
                        }}>Menu</span>
                      </div>
                      {/* Center — Inline logo */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <LogoInline color={hm.navLogoColor} height={28} />
                      </div>
                      {/* Right — Enquire CTA + Search icon */}
                      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px' }}>
                        <button style={{
                          fontFamily: FONT_BODY,
                          backgroundColor: hm.navBtnBg,
                          color: hm.navBtnColor,
                          padding: '8px 20px',
                          borderRadius: '0',
                          border: 'none',
                          fontWeight: '500',
                          fontSize: '11px',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                        }}>
                          Enquire
                        </button>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={hm.navLinkActive} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer', flexShrink: 0 }}>
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                      </div>
                      </div>
                      {/* ═══ MENU DROPDOWN ═══ */}
                      {menuOpen && (
                        <div style={{
                          backgroundColor: palette.surface.stone,
                          border: `1px solid ${palette.neutral[200]}`,
                          borderTop: 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          maxHeight: '420px',
                          overflow: 'auto',
                        }}>
                      {/* Search bar */}
                      <div style={{ padding: '20px 24px 0' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          borderBottom: `1px solid ${palette.primary.default}`,
                          paddingBottom: '12px',
                        }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={palette.primary.default} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          </svg>
                          <input
                            type="text"
                            value={menuSearch}
                            onChange={(e) => setMenuSearch(e.target.value)}
                            placeholder="Search destinations..."
                            style={{
                              flex: 1,
                              border: 'none',
                              outline: 'none',
                              backgroundColor: 'transparent',
                              fontFamily: FONT_BODY,
                              fontSize: '16px',
                              fontWeight: '300',
                              color: palette.primary.default,
                              letterSpacing: '0.02em',
                            }}
                          />
                          {menuSearch && (
                            <span
                              onClick={() => setMenuSearch('')}
                              style={{ cursor: 'pointer', color: palette.neutral[400], fontSize: '12px' }}
                            >✕</span>
                          )}
                        </div>
                      </div>

                      {/* Search results — destination images */}
                      {filteredDestinations.length > 0 && (
                        <div style={{
                          padding: '16px 24px',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(3, 1fr)',
                          gap: '8px',
                        }}>
                          {filteredDestinations.map((d) => (
                            <div key={d.name} style={{
                              position: 'relative',
                              aspectRatio: '4 / 3',
                              overflow: 'hidden',
                              cursor: 'pointer',
                            }}>
                              <img src={d.image} alt={d.name} style={{
                                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                              }} />
                              <div style={{
                                position: 'absolute', inset: 0,
                                backgroundColor: '#10203740',
                                display: 'flex', flexDirection: 'column',
                                justifyContent: 'flex-end', padding: '12px',
                              }}>
                                <span style={{
                                  fontFamily: FONT_HEADING, color: '#FFFFFF',
                                  fontSize: '18px', fontWeight: '400',
                                  textTransform: 'uppercase', letterSpacing: '0.04em',
                                }}>{d.name}</span>
                                <span style={{
                                  fontFamily: FONT_MONO, color: 'rgba(255,255,255,0.7)',
                                  fontSize: '9px', letterSpacing: '0.06em', textTransform: 'uppercase',
                                  marginTop: '2px',
                                }}>{d.region}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* No results message */}
                      {menuSearch.trim() && filteredDestinations.length === 0 && (
                        <div style={{ padding: '32px', textAlign: 'center' }}>
                          <p style={{
                            fontFamily: FONT_BODY, fontSize: '14px', fontWeight: '300',
                            color: palette.neutral[400],
                          }}>No destinations found for "{menuSearch}"</p>
                        </div>
                      )}

                      {/* Nav items */}
                      <div style={{ padding: '4px 24px' }}>
                        {menuNavItems.map((item, i) => (
                          <div key={item.label} style={{
                            borderBottom: `1px solid ${palette.neutral[200]}`,
                            padding: '14px 0',
                            cursor: 'pointer',
                          }}>
                            <span style={{
                              fontFamily: FONT_BODY,
                              fontSize: '15px',
                              fontWeight: item.type === 'heading' ? '500' : '300',
                              color: palette.primary.default,
                              letterSpacing: '0.02em',
                            }}>{item.label}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA bar at bottom */}
                      <div style={{
                        backgroundColor: palette.primary.default,
                        padding: '14px 24px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.surface.stone} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.6 }}>
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                          </svg>
                          <span style={{
                            fontFamily: FONT_BODY, fontSize: '13px', color: palette.surface.stone,
                            fontWeight: '300',
                          }}>020 3993 4424</span>
                        </div>
                        <button style={{
                          fontFamily: FONT_BODY,
                          backgroundColor: palette.surface.stone,
                          color: palette.primary.default,
                          padding: '8px 20px',
                          borderRadius: '0',
                          border: 'none',
                          fontWeight: '500',
                          fontSize: '11px',
                          letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}>
                          Enquire
                        </button>
                      </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hero section — pulled up behind transparent nav */}
                  <div style={{
                    position: 'relative',
                    minHeight: '620px',
                    marginTop: '-104px',
                    overflow: 'hidden',
                  }}>
                    {/* Sliding background layers */}
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
                    {/* Navy tint overlay */}
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundColor: '#10203719',
                      zIndex: 1,
                    }} />
                    {/* Hero content overlay */}
                    <div style={{
                      position: 'relative',
                      zIndex: 2,
                      padding: '48px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      minHeight: '620px',
                    }}>
                      {/* Centered heading */}
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pointerEvents: 'none',
                      }}>
                        <h1 style={{
                          fontFamily: FONT_HEADING,
                          color: palette.surface.stone,
                          fontSize: TS.hero,
                          fontWeight: '400',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          lineHeight: 1.05,
                          textAlign: 'center',
                        }}>
                          Guided by Curiosity
                        </h1>
                      </div>
                      {/* Bottom bar — buttons & indicators left, location right */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        width: '100%',
                        marginTop: '8px',
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <button style={{
                              fontFamily: FONT_BODY,
                              backgroundColor: palette.surface.stone,
                              color: palette.primary.default,
                              padding: '14px 32px',
                              borderRadius: '0',
                              border: 'none',
                              fontWeight: '500',
                              fontSize: '15px',
                            }}>
                              Explore Destinations
                            </button>
                          </div>
                        </div>
                        {/* Location label — bottom right */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
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
                    padding: '120px 48px 48px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    gap: '48px',
                    transition: 'all 0.3s ease',
                  }}>
                    <p style={{
                      fontFamily: FONT_BODY,
                      color: heroMode === 'dark' ? palette.primary.faded : palette.neutral[600],
                      fontSize: '24px',
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
                        padding: '14px 32px',
                        borderRadius: '0',
                        border: `1px solid ${heroMode === 'dark' ? palette.surface.stone : palette.primary.default}`,
                        fontWeight: '500',
                        fontSize: '15px',
                        transition: 'all 0.3s ease',
                      }}>
                        Our Story
                      </button>
                    </div>
                  </div>
                  {/* Journey Product Lines */}
                  <div style={{
                    background: '#FFFFFF',
                    padding: '80px 48px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '64px',
                    transition: 'all 0.3s ease',
                  }}>
                    {[
                      { label: 'Small Group Tours', image: '/images/journey-small-group.png' },
                      { label: 'Tailormade Journeys', image: '/images/journey-tailormade.png' },
                    ].map((item) => (
                      <div key={item.label} style={{
                        position: 'relative',
                        cursor: 'pointer',
                        flex: 1,
                        aspectRatio: '4 / 3',
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
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <p style={{
                            fontFamily: FONT_HEADING,
                            color: palette.surface.stone,
                            fontSize: '56px',
                            fontWeight: '400',
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            textAlign: 'center',
                            lineHeight: 1.05,
                            margin: 0,
                          }}>
                            {item.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Spacer for scrollability */}
                  <div style={{
                    background: heroMode === 'dark'
                      ? palette.primary.default
                      : heroMode === 'offWhite'
                        ? palette.surface.stone
                        : '#FFFFFF',
                    padding: '120px 48px',
                    transition: 'all 0.3s ease',
                  }} />
                </div>
              </div>
            </div>
          );
        })()}

        {/* ════════════════ COLOR VALUES EXPORT ════════════════ */}
        <div style={{ 
          backgroundColor: palette.primary.default, 
          borderRadius: '12px', 
          padding: '24px',
          boxShadow: '0 1px 3px rgba(16,32,55,0.08)'
        }}>
          <h3 style={{ fontFamily: FONT_HEADING, fontSize: TS.base, fontWeight: '500', color: '#FFFFFF', marginBottom: '16px' }}>
            {isPrimaryAccent ? 'Primary Only Mode' : `Selected Accent: ${accent.name}`}
          </h3>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {isPrimaryAccent ? (
              <>
                <div>
                  <p style={{ fontFamily: FONT_BODY, fontSize: '12px', color: palette.primary.faded, marginBottom: '4px' }}>Accent (primary)</p>
                  <code style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'monospace' }}>#102037</code>
                </div>
                <div>
                  <p style={{ fontFamily: FONT_BODY, fontSize: '12px', color: palette.primary.faded, marginBottom: '4px' }}>On Primary</p>
                  <code style={{ color: palette.surface.stone, fontSize: '14px', fontFamily: 'monospace' }}>#F2F2EB</code>
                </div>
                <div>
                  <p style={{ fontFamily: FONT_BODY, fontSize: '12px', color: palette.primary.faded, marginBottom: '4px' }}>Tint</p>
                  <code style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'monospace' }}>#E8ECF0</code>
                </div>
                <div>
                  <p style={{ fontFamily: FONT_BODY, fontSize: '12px', color: palette.primary.faded, marginBottom: '4px' }}>Heading Font</p>
                  <code style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'monospace' }}>MesoTRIAL</code>
                </div>
                <div>
                  <p style={{ fontFamily: FONT_BODY, fontSize: '12px', color: palette.primary.faded, marginBottom: '4px' }}>Body Font</p>
                  <code style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'monospace' }}>CenoTRIAL</code>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p style={{ fontFamily: FONT_BODY, fontSize: '12px', color: palette.primary.faded, marginBottom: '4px' }}>Base</p>
                  <code style={{ color: accent.hex, fontSize: '14px', fontFamily: 'monospace' }}>{accent.hex}</code>
                </div>
                <div>
                  <p style={{ fontFamily: FONT_BODY, fontSize: '12px', color: palette.primary.faded, marginBottom: '4px' }}>Text on accent</p>
                  <code style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'monospace' }}>{isLightAccent ? '#102037' : '#FFFFFF'}</code>
                </div>
                <div>
                  <p style={{ fontFamily: FONT_BODY, fontSize: '12px', color: palette.primary.faded, marginBottom: '4px' }}>Best use</p>
                  <code style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'monospace' }}>{isLightAccent ? 'Fills, dark BGs' : 'Text, buttons'}</code>
                </div>
                <div>
                  <p style={{ fontFamily: FONT_BODY, fontSize: '12px', color: palette.primary.faded, marginBottom: '4px' }}>Heading Font</p>
                  <code style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'monospace' }}>MesoTRIAL</code>
                </div>
                <div>
                  <p style={{ fontFamily: FONT_BODY, fontSize: '12px', color: palette.primary.faded, marginBottom: '4px' }}>Body Font</p>
                  <code style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'monospace' }}>CenoTRIAL</code>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div style={{ 
          textAlign: 'center', 
          padding: '32px 0 8px',
          color: palette.neutral[400],
          fontSize: '12px',
          fontFamily: FONT_BODY,
        }}>
          Cox &amp; Kings — Color Palette Tester — {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
}
