import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

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
  const [menuSearchFocused, setMenuSearchFocused] = useState(false);
  const [destSlide, setDestSlide] = useState(0);
  const [destHover, setDestHover] = useState(-1);
  const [mapActiveRegion, setMapActiveRegion] = useState(null);
  const [mapHoverRegion, setMapHoverRegion] = useState(null);
  const [mapZoom, setMapZoom] = useState(1);
  const [mapCenter, setMapCenter] = useState([20, 30]);
  const scrollContainerRef = useRef(null);
  const isFullScreen = window.location.pathname === '/homepage';
  const menuRef = useRef(null);

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
    { name: 'Europe', viewBox: '0 0 205 266.01', d: 'M102.5,0C45.89,0,0,45.89,0,102.5v163.51h205V102.5C205,45.89,159.11,0,102.5,0', image: '/images/dest-europe.png' },
    { name: 'Middle East\n& Africa', viewBox: '0 0 205 267.23', isPolygon: true, points: '33.76 0 33.76 22.5 11.25 22.5 11.25 11.25 22.5 11.25 22.5 33.76 0 33.76 0 233.48 22.5 233.48 22.5 255.98 11.25 255.98 11.25 244.73 33.76 244.73 33.76 267.23 171.24 267.23 171.24 244.73 193.75 244.73 193.75 255.98 182.5 255.98 182.5 233.48 205 233.48 205 33.76 182.5 33.76 182.5 11.25 193.75 11.25 193.75 22.5 171.24 22.5 171.24 0 33.76 0', image: '/images/dest-middle-east.png' },
    { name: 'Asia &\nOceania', viewBox: '0 0 205 269.06', isPolygon: true, points: '42 0 0 42 0 227.07 42 269.06 163 269.06 205 227.07 205 42 163 0 42 0', image: '/images/dest-asia.png' },
    { name: 'South\nAmerica', viewBox: '0 0 205 266.01', isPolygon: true, points: '28.47 0 28.47 28.47 0 28.47 0 237.54 28.47 237.54 28.47 266.01 176.53 266.01 176.53 237.54 205 237.54 205 28.47 176.53 28.47 176.53 0 28.47 0', image: '/images/dest-south-america.png' },
    { name: 'North\nAmerica', viewBox: '0 0 280 364', d: 'M190.243 21.0134C189.641 21.0134 189.052 21.0134 188.45 20.9677C171.586 20.3115 155.877 11.1095 140.829 0C125.721 10.9722 109.964 20.0368 93.0875 20.5556C92.4861 20.5709 91.8967 20.5862 91.2953 20.5862C76.2595 20.5251 60.5381 13.8716 44.8528 5.28007L1.41757 62.903L1.20105 63.1929L0.202677 64.5206L1.41757 62.903C52.8776 137.515 -53.6025 266.04 35.0736 318.666C71.8716 340.508 98.8391 337.5 139.855 362.158C139.181 362.86 138.508 363.562 137.846 364.279C138.52 363.562 139.181 362.86 139.855 362.158C179.339 339.361 207.932 341.103 244.864 319.551C332.133 268.637 229.09 136.735 279.868 64.1085L236.769 6.10412C221.048 14.5583 205.29 21.0745 190.243 21.0134Z', image: '/images/dest-north-america.png' },
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
  
  const brandAccents = {
    primary: { name: 'Primary Only', hex: '#102037', desc: 'No additional accent — uses primary throughout' },
  };
  
  const brandDecorative = {
    warmSand: { name: 'Warm Sand', hex: '#E5BDB1', desc: 'Brand decorative — soft blush sand. Sparingly as backgrounds, interactive maps' },
    cream: { name: 'Soft Cream', hex: '#F8F1CD', desc: 'Brand decorative — warm cream. Sparingly as backgrounds, interactive maps' },
    mist: { name: 'Cool Mist', hex: '#DAE0EF', desc: 'Brand decorative — soft blue-grey. Sparingly as backgrounds, interactive maps' },
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

  // Generate tint scale from accent hex — mix toward stone bg
  const hexToRgb = (hex) => {
    const h = hex.replace('#', '');
    return [parseInt(h.substring(0,2),16), parseInt(h.substring(2,4),16), parseInt(h.substring(4,6),16)];
  };
  const mixWith = (rgb, target, amount) =>
    rgb.map((c, i) => Math.round(c + (target[i] - c) * amount));
  const stone = [242, 242, 235];
  const dark = [16, 32, 55]; // palette.primary.default
  const rgbToHex = (rgb) => '#' + rgb.map(c => Math.min(255, Math.max(0, c)).toString(16).padStart(2, '0')).join('');
  const baseRgb = hexToRgb(accent.hex);
  const accentScale = {
    120: rgbToHex(mixWith(baseRgb, dark, 0.35)),        // darkened — high contrast text
    100: accent.hex,                                    // full accent — labels, icons
    80:  rgbToHex(mixWith(baseRgb, stone, 0.15)),       // 85% accent
    60:  rgbToHex(mixWith(baseRgb, stone, 0.3)),        // 70% accent
    50:  rgbToHex(mixWith(baseRgb, stone, 0.45)),       // 55% — medium
    40:  rgbToHex(mixWith(baseRgb, stone, 0.55)),       // 45%
    20:  rgbToHex(mixWith(baseRgb, stone, 0.72)),       // 28% — tag bg
    10:  rgbToHex(mixWith(baseRgb, stone, 0.82)),       // 18% — dividers
  };
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
    'Small Group Tours',
    'Tailormade Journeys',
    'Travel Brochures',
  ];

  const locationTags = ['India', 'Peru', 'Uzbekistan', 'Japan', 'Morocco', 'Greece'];
  const inspirationTags = ['Specialist Tours', 'Solo Travel', 'Wildlife', 'Cultural'];

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: isFullScreen ? palette.primary.default : palette.surface.stone,
      fontFamily: FONT_BODY,
      padding: isFullScreen ? 0 : '40px 32px',
    }}>
      <div style={{ maxWidth: isFullScreen ? 'none' : '1200px', margin: '0 auto' }}>

        {!isFullScreen && (<>
        {/* ════════════════ HEADER ════════════════ */}
        <div style={{ marginBottom: '8px' }}>
          <p style={{
            fontFamily: FONT_BODY,
            fontSize: TS.sm,
            fontWeight: '300',
            color: palette.neutral[400],
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '6px',
          }}>
            Cox &amp; Kings Rebrand
          </p>
          <h1 style={{ 
            fontFamily: FONT_HEADING,
            color: palette.primary.default, 
            fontSize: TS['2xl'], 
            fontWeight: '500',
            letterSpacing: '0.05em',
            lineHeight: 1.1,
            textTransform: 'uppercase',
          }}>
            Design Foundations
          </h1>
          <p style={{ 
            fontFamily: FONT_BODY,
            color: palette.neutral[500], 
            fontSize: TS.sm,
            marginTop: '4px',
            lineHeight: 1.6,
          }}>
            Interactive tester for colour palette, accent selection, typography, and component preview. Select an accent below to see it applied across the homepage prototype in real time.
          </p>
        </div>
        <p style={{ 
          fontFamily: FONT_BODY,
          color: palette.neutral[400], 
          fontSize: TS.sm,
          marginBottom: '32px',
        }}>
          Primary <code style={{ fontFamily: FONT_MONO, fontSize: '11px', color: palette.neutral[500] }}>#102037</code> &middot; Stone <code style={{ fontFamily: FONT_MONO, fontSize: '11px', color: palette.neutral[500] }}>#F2F2EB</code> &middot; Headers in <strong style={{ fontFamily: FONT_HEADING, fontWeight: '500' }}>MesoTRIAL Medium</strong> &middot; Body in <strong>CenoTRIAL</strong> &middot; Labels in <span style={{ fontWeight: '300' }}>CenoTRIAL Light</span>
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
            <p style={{ ...sectionLabel, marginTop: '16px', marginBottom: '12px' }}>Brand Decorative (sparingly as backgrounds, interactive maps)</p>
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

          {/* Accent Scale */}
          <div style={card}>
            <h3 style={sectionHeading}>
              Accent {isPrimaryAccent ? <span style={{ fontWeight: '400', color: palette.neutral[400] }}>(using primary)</span> : <span style={{ fontWeight: '400', color: palette.neutral[400] }}>Scale</span>}
            </h3>
            {isPrimaryAccent ? (
              <>
                {[
                  { token: 'default', hex: palette.primary.default },
                  { token: 'tint', hex: palette.primary.tint },
                  { token: 'onPrimary', hex: palette.surface.stone },
                ].map((item) => (
                  <div key={item.token} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '8px',
                      backgroundColor: item.hex, marginRight: '12px',
                      border: item.hex === palette.primary.default ? 'none' : '1px solid #E0E0D8',
                    }}/>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '500', color: palette.primary.default }}>{item.token}</div>
                      <div style={{ fontSize: '13px', color: palette.neutral[500], fontFamily: 'monospace' }}>{item.hex}</div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {[
                  { token: 'accent/120', value: accentScale[120], usage: 'High-contrast text' },
                  { token: 'accent/100', value: accentScale[100], usage: 'Base — icons, labels' },
                  { token: 'accent/80',  value: accentScale[80],  usage: 'Headings on light bg' },
                  { token: 'accent/60',  value: accentScale[60],  usage: 'Secondary elements' },
                  { token: 'accent/50',  value: accentScale[50],  usage: 'Decorative borders' },
                  { token: 'accent/40',  value: accentScale[40],  usage: 'Subtle highlights' },
                  { token: 'accent/20',  value: accentScale[20],  usage: 'Tag backgrounds' },
                  { token: 'accent/10',  value: accentScale[10],  usage: 'Dividers, faint bg' },
                ].map((item) => (
                  <div key={item.token} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '8px',
                      backgroundColor: item.value, marginRight: '12px',
                      border: `1px solid ${palette.neutral[200]}`,
                      flexShrink: 0,
                    }}/>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: '500', color: palette.primary.default }}>{item.token}</div>
                      <div style={{ fontSize: '12px', color: palette.neutral[500], fontFamily: 'monospace' }}>{item.value}</div>
                      <div style={{ fontSize: '11px', color: palette.neutral[400], marginTop: '1px' }}>{item.usage}</div>
                    </div>
                  </div>
                ))}
              </>
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

        </>)}

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
              ...(isFullScreen ? {} : card),
              padding: '0',
              overflow: 'hidden',
              marginBottom: isFullScreen ? 0 : '24px',
            }}>
              {/* Controls bar */}
              {!isFullScreen && (
              <div style={{ 
                padding: '24px 24px 0 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <p style={{ ...sectionLabel, marginBottom: 0 }}>HOMEPAGE TEST</p>
                  <span style={{
                    fontFamily: FONT_BODY, fontSize: '10px', color: palette.neutral[400],
                    backgroundColor: palette.surface.subtleStone, borderRadius: '4px', padding: '3px 8px',
                    letterSpacing: '0.04em',
                  }}>
                    {logoCompact ? 'SCROLLED — FLOATING NAV' : 'TOP — FULL NAV'}
                  </span>
                  <span
                    onClick={() => window.open('/homepage', '_blank')}
                    style={{
                      fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '500',
                      color: palette.primary.muted, cursor: 'pointer',
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                      display: 'flex', alignItems: 'center', gap: '4px',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Full Screen
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
              )}
              {/* Browser-like viewport */}
              <div style={{ padding: isFullScreen ? 0 : '16px 24px 24px' }}>
                {/* Fake browser chrome */}
                {!isFullScreen && (
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
                )}
                {/* Scrollable viewport */}
                <div
                  ref={scrollContainerRef}
                  onScroll={handleViewportScroll}
                  style={{
                    height: isFullScreen ? '100vh' : '780px',
                    overflowY: 'auto',
                    borderRadius: isFullScreen ? 0 : '0 0 12px 12px',
                    border: isFullScreen ? 'none' : `1px solid ${palette.neutral[200]}`,
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
                          {/* Menu hamburger / X */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setMenuOpen(!menuOpen)}>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '18px', height: '12px', position: 'relative' }}>
                              <div style={{
                                position: 'absolute', width: '18px', height: '1.5px', backgroundColor: palette.surface.stone,
                                top: menuOpen ? '5px' : '1px', transform: menuOpen ? 'rotate(45deg)' : 'none',
                                transition: 'all 0.3s ease',
                              }} />
                              <div style={{
                                position: 'absolute', width: '18px', height: '1.5px', backgroundColor: palette.surface.stone,
                                bottom: menuOpen ? '5px' : '1px', transform: menuOpen ? 'rotate(-45deg)' : 'none',
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
                      {/* Left — Hamburger / X + Menu/Close */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => setMenuOpen(!menuOpen)}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '18px', height: '12px', position: 'relative' }}>
                          <div style={{
                            position: 'absolute', width: '18px', height: '1.5px', backgroundColor: hm.navLinkActive,
                            top: menuOpen ? '5px' : '1px', transform: menuOpen ? 'rotate(45deg)' : 'none',
                            transition: 'all 0.3s ease',
                          }} />
                          <div style={{
                            position: 'absolute', width: '18px', height: '1.5px', backgroundColor: hm.navLinkActive,
                            bottom: menuOpen ? '5px' : '1px', transform: menuOpen ? 'rotate(-45deg)' : 'none',
                            transition: 'all 0.3s ease',
                          }} />
                        </div>
                        <span style={{
                          fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '500',
                          color: hm.navLinkActive, letterSpacing: '0.08em', textTransform: 'uppercase',
                        }}>{menuOpen ? 'Close' : 'Menu'}</span>
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
                    </div>

                    {/* ═══ MENU DROPDOWN — independent, positioned below active nav ═══ */}
                    {menuOpen && (
                      <div style={{
                        position: 'absolute',
                        top: logoCompact ? '64px' : '104px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '100%',
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
                          {/* Search prompt — editable with blinking cursor */}
                          <div data-menu-animate style={{ padding: '36px 28px 60px' }}>
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
                                  fontSize: '26px',
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
                          <div data-menu-animate style={{ padding: '0 28px 16px' }}>
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
                          <div data-menu-animate style={{ padding: '8px 28px 28px' }}>
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
                          <div style={{ padding: '0 28px' }}>
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

                          {/* CTA bar — Speak to our experts */}
                          <div data-menu-animate style={{
                            backgroundColor: palette.primary.default,
                            margin: '12px 0 0',
                            padding: '20px 28px 24px',
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
                      padding: '24px',
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
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '24px',
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
                          <button style={{
                            fontFamily: FONT_BODY,
                            backgroundColor: palette.surface.stone,
                            color: palette.primary.default,
                            padding: '14px 32px',
                            borderRadius: '0',
                            border: 'none',
                            fontWeight: '500',
                            fontSize: '13px',
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            marginTop: '24px',
                            cursor: 'pointer',
                          }}>
                            Explore
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* ──── Destinations Module ──── */}
                  <div style={{
                    background: palette.surface.stone,
                    padding: '80px 0 0',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                  }}>
                    {/* Top row — heading + CTA */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '48px',
                      padding: '0 48px',
                    }}>
                      <h2 style={{
                        fontFamily: FONT_HEADING,
                        fontSize: '32px',
                        fontWeight: '400',
                        color: palette.primary.default,
                        letterSpacing: '0.02em',
                        margin: 0,
                      }}>
                        Destinations
                      </h2>
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
                    </div>

                    {/* Content row — description left, shapes slider right (bleeds edge) */}
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
                            {/* Ping rings */}
                            <span style={{
                              position: 'absolute',
                              top: '50%', left: '50%',
                              width: '10px', height: '10px',
                              marginTop: '-5px', marginLeft: '-5px',
                              borderRadius: '50%',
                              backgroundColor: accentScale[80],
                              animation: 'youAreHerePing 2.4s cubic-bezier(0, 0, 0.2, 1) infinite',
                            }} />
                            <span style={{
                              position: 'absolute',
                              top: '50%', left: '50%',
                              width: '10px', height: '10px',
                              marginTop: '-5px', marginLeft: '-5px',
                              borderRadius: '50%',
                              backgroundColor: accentScale[80],
                              animation: 'youAreHerePing2 2.4s cubic-bezier(0, 0, 0.2, 1) infinite',
                              animationDelay: '0.6s',
                            }} />
                            {/* Solid dot */}
                            <span style={{
                              position: 'absolute',
                              top: '50%', left: '50%',
                              width: '10px', height: '10px',
                              marginTop: '-5px', marginLeft: '-5px',
                              borderRadius: '50%',
                              backgroundColor: palette.primary.default,
                              zIndex: 1,
                            }} />
                          </div>
                          <span style={{
                            fontFamily: FONT_BODY,
                            fontSize: '11px',
                            fontWeight: '600',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: palette.primary.default,
                          }}>You are here — Start exploring</span>
                        </div>
                      </div>

                      {/* Shapes slider — auto-scrolling, overflows right edge */}
                      <div style={{
                        flex: 1,
                        overflow: 'hidden',
                        alignSelf: 'stretch',
                        display: 'flex',
                        alignItems: 'flex-end',
                      }}>
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
                              cursor: 'pointer',
                            }}
                              onClick={() => setDestSlide(idx)}
                              onMouseEnter={() => setDestHover(idx)}
                              onMouseLeave={() => setDestHover(-1)}
                            >
                              <svg viewBox={region.viewBox} xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block', overflow: 'hidden' }}>
                                <defs>
                                  <clipPath id={clipId}>
                                    {region.isPolygon && region.points
                                      ? <polygon points={region.points} />
                                      : <path d={region.d} />
                                    }
                                  </clipPath>
                                </defs>
                                {region.isPolygon && region.points
                                  ? <polygon points={region.points} fill={palette.primary.default} />
                                  : <path d={region.d} fill={palette.primary.default} />
                                }
                                {hasImage && (
                                  <>
                                    <image
                                      href={region.image}
                                      x="0" y="0"
                                      width={vb[2]} height={vb[3]}
                                      preserveAspectRatio="xMidYMid slice"
                                      clipPath={`url(#${clipId})`}
                                      style={{
                                        opacity: isActive ? 1 : 0,
                                        transition: 'opacity 0.6s ease, transform 0.5s ease',
                                        transformOrigin: `${vb[2] / 2}px ${vb[3] / 2}px`,
                                        transform: destHover === idx ? 'scale(1.05)' : 'scale(1)',
                                      }}
                                    />
                                    <rect
                                      x="0" y="0"
                                      width={vb[2]} height={vb[3]}
                                      fill="#102037"
                                      fillOpacity="0.10"
                                      clipPath={`url(#${clipId})`}
                                      style={{
                                        opacity: isActive ? 1 : 0,
                                        transition: 'opacity 0.6s ease',
                                      }}
                                    />
                                  </>
                                )}
                                <rect
                                  x="0" y="0"
                                  width={vb[2]} height={vb[3]}
                                  fill={palette.primary.default}
                                  clipPath={`url(#${clipId})`}
                                  style={{
                                    opacity: destHover === idx ? 0.25 : 0,
                                    transition: 'opacity 0.3s ease',
                                    pointerEvents: 'none',
                                  }}
                                />
                              </svg>
                              <div style={{
                                position: 'absolute',
                                inset: 0,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '16px',
                              }}>
                                <p style={{
                                  fontFamily: FONT_HEADING,
                                  color: palette.surface.stone,
                                  fontSize: '40px',
                                  fontWeight: '400',
                                  textAlign: 'center',
                                  lineHeight: 1.15,
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
                      </div>
                    </div>
                    {/* Pagination line + arrows */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 48px', marginTop: '80px', paddingBottom: '48px' }}>
                      <div style={{ display: 'flex', flex: 1, height: '1px' }}>
                        {destRegions.map((_, i) => (
                          <div
                            key={i}
                            onClick={() => setDestSlide(i)}
                            style={{
                              flex: 1,
                              height: '1px',
                              backgroundColor: palette.primary.default,
                              opacity: i === destSlide ? 1 : 0.15,
                              transition: 'opacity 0.6s ease',
                              cursor: 'pointer',
                            }}
                          />
                        ))}
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                        <div
                          onClick={() => setDestSlide((prev) => (prev - 1 + destRegions.length) % destRegions.length)}
                          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.primary.default} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                          </svg>
                        </div>
                        <div
                          onClick={() => setDestSlide((prev) => (prev + 1) % destRegions.length)}
                          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={palette.primary.default} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </div>
                      </div>
                    </div>
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

        {/* ════════════════ INTERACTIVE WORLD MAP ════════════════ */}
        {!isFullScreen && (() => {
          const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

          const REGIONS = {
            'Africa': [24,72,108,120,132,140,148,174,178,180,204,226,231,232,262,266,270,288,324,328,332,384,404,426,430,434,450,454,466,478,480,504,508,516,562,566,646,678,686,694,706,710,716,728,729,732,748,768,788,800,834,854,894],
            'Central America': [44,52,84,188,192,212,214,222,308,320,332,340,388,484,558,591,630,659,662,670,780],
            'Central Asia': [398,417,762,795,860],
            'Europe': [8,20,40,56,70,100,112,191,196,203,208,233,246,250,268,276,292,300,348,352,372,380,428,438,440,442,470,492,498,499,528,578,616,620,642,643,674,688,703,705,724,752,756,804,807,826],
            'Far East': [104,116,144,156,344,360,392,410,418,458,496,608,626,702,704,764,158],
            'Indian Ocean': [174,462,480,690,144],
            'Indian Subcontinent': [50,64,356,462,524,586],
            'North Africa & Middle East': [12,48,51,31,196,818,368,376,400,414,422,434,504,512,275,634,682,760,788,792,887],
            'North America': [124,840],
            'Polar': [10,304,578,752,246,352,643],
            'South America': [32,68,76,152,170,218,238,254,328,600,604,740,858,862],
          };

          const regionHighlight = accent.hex;

          const countryToRegion = {};
          Object.entries(REGIONS).forEach(([region, codes]) => {
            codes.forEach((code) => { countryToRegion[code] = region; });
          });

          return (
            <div style={{
              ...card,
              marginTop: '24px',
              marginBottom: '24px',
              padding: 0,
              overflow: 'hidden',
              position: 'relative',
            }}>
              {/* Header bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 24px 0',
              }}>
                <div>
                  <p style={sectionLabel}>Destinations Page</p>
                  <h2 style={{ ...sectionHeading, marginBottom: '4px' }}>Interactive SVG Navigation Map</h2>
                  <p style={{ fontFamily: FONT_BODY, fontSize: '13px', color: palette.neutral[500], margin: 0 }}>
                    Click a region to highlight — colours from the design system
                  </p>
                </div>
                {mapActiveRegion && (
                  <button
                    onClick={() => setMapActiveRegion(null)}
                    style={{
                      fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '500',
                      letterSpacing: '0.04em', textTransform: 'uppercase',
                      color: palette.neutral[500], backgroundColor: 'transparent',
                      border: `1px solid ${palette.neutral[300]}`, borderRadius: '6px',
                      padding: '8px 16px', cursor: 'pointer',
                    }}
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Region pills */}
              <div style={{
                display: 'flex', flexWrap: 'wrap', gap: '6px',
                padding: '16px 24px',
              }}>
                {Object.keys(REGIONS).map((region) => {
                  const isActive = mapActiveRegion === region;
                  return (
                    <button
                      key={region}
                      onClick={() => setMapActiveRegion(isActive ? null : region)}
                      style={{
                        fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '500',
                        letterSpacing: '0.03em', textTransform: 'uppercase',
                        color: isActive ? '#FFFFFF' : palette.primary.default,
                        backgroundColor: isActive ? regionHighlight : palette.surface.stone,
                        border: 'none', borderRadius: '4px',
                        padding: '7px 12px', cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {region}
                    </button>
                  );
                })}
              </div>

              {/* Map */}
              <div style={{
                backgroundColor: palette.primary.default,
                borderRadius: '0 0 12px 12px',
                position: 'relative',
              }}>
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{ scale: 120, center: [20, 30] }}
                  style={{ width: '100%', height: 'auto' }}
                >
                  <ZoomableGroup
                    zoom={mapZoom}
                    center={mapCenter}
                    onMoveEnd={({ coordinates, zoom }) => { setMapCenter(coordinates); setMapZoom(zoom); }}
                    minZoom={1}
                    maxZoom={8}
                  >
                    <Geographies geography={GEO_URL}>
                      {({ geographies }) =>
                        geographies.map((geo) => {
                          const numId = parseInt(geo.id, 10);
                          const region = countryToRegion[numId];
                          const isActiveRegion = mapActiveRegion && region === mapActiveRegion;
                          const isHoveredRegion = mapHoverRegion && region === mapHoverRegion;

                          let fill = palette.primary.light;
                          if (isActiveRegion) fill = regionHighlight;
                          else if (isHoveredRegion) fill = palette.primary.lighter;

                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              onMouseEnter={() => { if (region) setMapHoverRegion(region); }}
                              onMouseLeave={() => setMapHoverRegion(null)}
                              onClick={() => { if (region) setMapActiveRegion(mapActiveRegion === region ? null : region); }}
                              style={{
                                default: {
                                  fill,
                                  stroke: palette.primary.default,
                                  strokeWidth: 0.5,
                                  transition: 'fill 0.3s ease',
                                  outline: 'none',
                                  cursor: region ? 'pointer' : 'default',
                                },
                                hover: {
                                  fill: isActiveRegion ? regionHighlight : (region ? palette.primary.lighter : palette.primary.light),
                                  stroke: palette.primary.default,
                                  strokeWidth: 0.5,
                                  outline: 'none',
                                  cursor: region ? 'pointer' : 'default',
                                },
                                pressed: {
                                  fill: region ? regionHighlight : palette.primary.light,
                                  stroke: palette.primary.default,
                                  strokeWidth: 0.5,
                                  outline: 'none',
                                },
                              }}
                            />
                          );
                        })
                      }
                    </Geographies>
                  </ZoomableGroup>
                </ComposableMap>

                {/* Zoom controls */}
                <div style={{
                  position: 'absolute',
                  top: '16px', right: '16px',
                  display: 'flex', flexDirection: 'column', gap: '2px',
                }}>
                  <button
                    onClick={() => setMapZoom((z) => Math.min(z * 1.5, 8))}
                    style={{
                      width: '32px', height: '32px',
                      backgroundColor: 'rgba(242,242,235,0.12)',
                      backdropFilter: 'blur(8px)',
                      border: `1px solid rgba(242,242,235,0.15)`,
                      borderRadius: '6px 6px 0 0',
                      color: palette.surface.stone,
                      fontSize: '16px', fontWeight: '300', fontFamily: FONT_BODY,
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background-color 0.2s ease',
                    }}
                  >+</button>
                  <button
                    onClick={() => setMapZoom((z) => Math.max(z / 1.5, 1))}
                    style={{
                      width: '32px', height: '32px',
                      backgroundColor: 'rgba(242,242,235,0.12)',
                      backdropFilter: 'blur(8px)',
                      border: `1px solid rgba(242,242,235,0.15)`,
                      borderRadius: '0 0 6px 6px',
                      color: palette.surface.stone,
                      fontSize: '16px', fontWeight: '300', fontFamily: FONT_BODY,
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background-color 0.2s ease',
                    }}
                  >−</button>
                  {mapZoom > 1 && (
                    <button
                      onClick={() => { setMapZoom(1); setMapCenter([20, 30]); }}
                      style={{
                        width: '32px', height: '32px',
                        marginTop: '6px',
                        backgroundColor: 'rgba(242,242,235,0.12)',
                        backdropFilter: 'blur(8px)',
                        border: `1px solid rgba(242,242,235,0.15)`,
                        borderRadius: '6px',
                        color: palette.surface.stone,
                        cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'background-color 0.2s ease',
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12h18M12 3v18M4.5 4.5l15 15M19.5 4.5l-15 15" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Active region label overlay */}
                {mapActiveRegion && (
                  <div style={{
                    position: 'absolute',
                    bottom: '24px', left: '24px',
                    display: 'flex', alignItems: 'center', gap: '12px',
                  }}>
                    <div style={{
                      width: '12px', height: '12px', borderRadius: '2px',
                      backgroundColor: regionHighlight,
                    }} />
                    <span style={{
                      fontFamily: FONT_BODY, fontSize: '13px', fontWeight: '500',
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                      color: palette.surface.stone,
                    }}>
                      {mapActiveRegion}
                    </span>
                  </div>
                )}

                {/* Hover region label */}
                {!mapActiveRegion && mapHoverRegion && (
                  <div style={{
                    position: 'absolute',
                    bottom: '24px', left: '24px',
                    display: 'flex', alignItems: 'center', gap: '12px',
                  }}>
                    <div style={{
                      width: '12px', height: '12px', borderRadius: '2px',
                      backgroundColor: palette.primary.lighter,
                    }} />
                    <span style={{
                      fontFamily: FONT_BODY, fontSize: '13px', fontWeight: '500',
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                      color: palette.surface.stone, opacity: 0.7,
                    }}>
                      {mapHoverRegion}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })()}

        {/* ════════════════ COLOR VALUES EXPORT ════════════════ */}
        {!isFullScreen && (<>
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

        {/* Figma Tokens Doc Link */}
        <div style={{ textAlign: 'center', padding: '32px 0 0' }}>
          <a
            href="https://github.com/vivandiere/cox-and-kings/blob/main/DESIGN-FOUNDATIONS.md"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: FONT_BODY,
              fontSize: '13px',
              fontWeight: '500',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: palette.primary.default,
              backgroundColor: palette.surface.white,
              padding: '14px 32px',
              borderRadius: '8px',
              border: `1px solid ${palette.neutral[200]}`,
              textDecoration: 'none',
              boxShadow: '0 1px 3px rgba(16,32,55,0.08)',
              cursor: 'pointer',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={palette.primary.default} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Design Foundations
          </a>
        </div>

        {/* Footer */}
        <div style={{ 
          textAlign: 'center', 
          padding: '32px 0 8px',
          color: palette.neutral[400],
          fontSize: '12px',
          fontFamily: FONT_BODY,
        }}>
          Cox &amp; Kings — Design Foundations — {new Date().getFullYear()}
        </div>
        </>)}
      </div>
    </div>
  );
}
