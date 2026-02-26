import React, { useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { BedDouble, UtensilsCrossed, Coffee, MapPin, Clock } from 'lucide-react';
import { palette, brandDecorativeDeep } from '../tokens/index.js';
import { FONT_HEADING, FONT_BODY, TS } from '../tokens/index.js';
import { useAccent } from '../components/AccentContext.jsx';
import { renderToStaticMarkup } from 'react-dom/server';

const INDIA_ITINERARY = [
  { name: 'Delhi', lat: 28.6139, lng: 77.2090, day: 1, nights: 1, hotel: 'The Imperial New Delhi', meals: ['Breakfast'], label: 'Arrive in Delhi' },
  { name: 'Amritsar', lat: 31.6340, lng: 74.8723, day: 2, nights: 2, hotel: 'Taj Swarna Amritsar', meals: ['Breakfast'], label: 'Amritsar & Wagah Border' },
  { name: 'Varanasi', lat: 25.3176, lng: 82.9739, day: 5, nights: 2, hotel: 'Taj Ganges Varanasi', meals: ['Breakfast'], label: 'Varanasi — Ganges at Dawn' },
  { name: 'Agra', lat: 27.1767, lng: 78.0081, day: 7, nights: 1, hotel: 'The Oberoi Amarvilas', meals: ['Breakfast'], label: 'Agra & Taj Mahal' },
  { name: 'Ranthambore', lat: 26.0173, lng: 76.5026, day: 8, nights: 2, hotel: 'The Oberoi Vanyavilas', meals: ['Breakfast', 'Dinner'], label: 'Ranthambore Safari' },
  { name: 'Jaipur', lat: 26.9124, lng: 75.7873, day: 10, nights: 2, hotel: 'Rambagh Palace', meals: ['Breakfast'], label: 'Jaipur — Pink City' },
  { name: 'Jodhpur', lat: 26.2389, lng: 73.0243, day: 12, nights: 1, hotel: 'Raas Jodhpur', meals: ['Breakfast', 'Lunch'], label: 'Jodhpur & Bishnoi' },
  { name: 'Udaipur', lat: 24.5854, lng: 73.7125, day: 14, nights: 2, hotel: 'Taj Lake Palace', meals: ['Breakfast'], label: 'Udaipur — City of Lakes' },
  { name: 'Delhi', lat: 28.6139, lng: 77.2090, day: 16, nights: 1, hotel: 'The Imperial New Delhi', meals: ['Breakfast'], label: 'Fly to Delhi' },
];

const createStopMarker = (color, isActive) => L.divIcon({
  className: '',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
  html: `<div style="
    width:${isActive ? 14 : 10}px;
    height:${isActive ? 14 : 10}px;
    border-radius:50%;
    background:${isActive ? color : '#FFFFFF'};
    border:2px solid ${color};
    box-shadow:0 1px 4px rgba(16,32,55,0.2);
    transition:all 0.2s ease;
  "></div>`,
});

const bedSvg = renderToStaticMarkup(<BedDouble size={14} strokeWidth={1.5} color={palette.primary.default} />);
const utSvg = renderToStaticMarkup(<UtensilsCrossed size={14} strokeWidth={1.5} color={palette.neutral[500]} />);

const TILE_STYLES = [
  {
    id: 'carto-voyager',
    label: 'Voyager',
    desc: 'Clean, readable, warm neutrals',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    filter: 'saturate(0.3) sepia(0.15) brightness(1.02)',
  },
  {
    id: 'carto-positron',
    label: 'Positron',
    desc: 'Minimal, light, very clean',
    url: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    filter: 'saturate(0.2) sepia(0.1) brightness(1.0)',
  },
  {
    id: 'carto-dark',
    label: 'Dark Matter',
    desc: 'Dark base, high contrast routes',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    filter: 'saturate(0.25) hue-rotate(10deg) brightness(0.95)',
  },
  {
    id: 'stamen-toner-lite',
    label: 'Toner Lite',
    desc: 'Stark minimal, B&W base',
    url: 'https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png',
    attr: '&copy; <a href="https://stadiamaps.com/">Stadia</a> &copy; <a href="https://stamen.com/">Stamen</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    filter: 'saturate(0) sepia(0.08) brightness(1.02)',
  },
  {
    id: 'osm-raw',
    label: 'OSM Raw',
    desc: 'Unstyled OpenStreetMap for reference',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attr: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    filter: 'none',
  },
];

const sectionLabel = {
  fontFamily: FONT_BODY,
  fontSize: '10px',
  fontWeight: '300',
  color: palette.neutral[400],
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: '8px',
};

export default function ItineraryMap() {
  const { accent, isPrimaryAccent } = useAccent();
  const [activeTile, setActiveTile] = useState('carto-voyager');
  const [activeStop, setActiveStop] = useState(null);
  const [routeColor, setRouteColor] = useState(palette.primary.default);

  const tile = TILE_STYLES.find((t) => t.id === activeTile);

  const bounds = useMemo(() => {
    const lats = INDIA_ITINERARY.map((s) => s.lat);
    const lngs = INDIA_ITINERARY.map((s) => s.lng);
    return [
      [Math.min(...lats) - 2, Math.min(...lngs) - 2],
      [Math.max(...lats) + 2, Math.max(...lngs) + 2],
    ];
  }, []);

  const routePoints = INDIA_ITINERARY.map((s) => [s.lat, s.lng]);
  const isDark = activeTile === 'carto-dark';
  const markerColor = isDark ? palette.surface.stone : routeColor;

  const routeColorOptions = [
    { hex: palette.primary.default, label: 'Primary' },
    { hex: palette.primary.muted, label: 'Muted Navy' },
    ...(!isPrimaryAccent ? [{ hex: accent.hex, label: 'Active Accent' }] : []),
    { hex: brandDecorativeDeep.warmSandDeep.hex, label: 'Warm Sand Deep' },
    { hex: brandDecorativeDeep.creamDeep.hex, label: 'Soft Cream Deep' },
    { hex: brandDecorativeDeep.mistDeep.hex, label: 'Cool Mist Deep' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', gap: '24px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div>
          <p style={sectionLabel}>Base Map Style</p>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {TILE_STYLES.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTile(t.id)}
                style={{
                  fontFamily: FONT_BODY, fontSize: '11px',
                  padding: '6px 12px', borderRadius: '4px',
                  border: activeTile === t.id ? `1px solid ${palette.primary.default}` : `1px solid ${palette.neutral[200]}`,
                  backgroundColor: activeTile === t.id ? palette.primary.tint : 'transparent',
                  color: palette.primary.default,
                  cursor: 'pointer', fontWeight: activeTile === t.id ? '500' : '400',
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p style={sectionLabel}>Route Colour</p>
          <div style={{ display: 'flex', gap: '6px' }}>
            {routeColorOptions.map((c) => (
              <button
                key={c.hex}
                onClick={() => setRouteColor(c.hex)}
                style={{
                  width: '28px', height: '28px', borderRadius: '4px',
                  backgroundColor: c.hex,
                  border: routeColor === c.hex ? '2px solid #FFFFFF' : '2px solid transparent',
                  boxShadow: routeColor === c.hex ? `0 0 0 1px ${palette.primary.default}` : 'none',
                  cursor: 'pointer',
                }}
                title={c.label}
              />
            ))}
          </div>
        </div>
      </div>

      <p style={{ fontFamily: FONT_BODY, fontSize: '12px', color: palette.neutral[400], marginBottom: '16px' }}>
        {tile.desc} · CSS filter: <code style={{ fontFamily: 'monospace', fontSize: '11px', backgroundColor: palette.surface.stone, padding: '2px 6px', borderRadius: '3px' }}>{tile.filter}</code>
      </p>

      <div style={{ borderRadius: '12px', overflow: 'hidden', border: `1px solid ${palette.neutral[200]}`, position: 'relative' }}>
        <style>{`
          .ck-map .leaflet-tile-pane { filter: ${tile.filter}; }
          .ck-map .leaflet-control-zoom a {
            background: ${isDark ? palette.primary.light : '#FFFFFF'} !important;
            color: ${isDark ? palette.surface.stone : palette.primary.default} !important;
            border-color: ${isDark ? palette.primary.muted : palette.neutral[200]} !important;
            font-family: ${FONT_BODY};
            width: 28px !important; height: 28px !important;
            line-height: 28px !important; font-size: 14px !important;
          }
          .ck-map .leaflet-control-zoom {
            border: none !important; border-radius: 6px !important;
            overflow: hidden; box-shadow: 0 1px 4px rgba(16,32,55,0.12);
          }
          .ck-map .leaflet-popup-content-wrapper {
            border-radius: 8px !important;
            box-shadow: 0 2px 12px rgba(16,32,55,0.12) !important;
            font-family: ${FONT_BODY};
          }
          .ck-map .leaflet-popup-tip { display: none; }
          .ck-map .leaflet-control-attribution {
            font-family: ${FONT_BODY} !important; font-size: 9px !important;
            background: rgba(255,255,255,0.7) !important;
          }
        `}</style>

        <MapContainer
          className="ck-map"
          bounds={bounds}
          style={{ height: '500px', width: '100%', background: isDark ? palette.primary.default : palette.surface.stone }}
          scrollWheelZoom={false}
          zoomControl={true}
        >
          <TileLayer url={tile.url} attribution={tile.attr} />

          <Polyline
            positions={routePoints}
            pathOptions={{
              color: isDark ? palette.surface.stone : routeColor,
              weight: 2,
              dashArray: '6 6',
              opacity: 0.7,
            }}
          />

          {INDIA_ITINERARY.map((stop, i) => (
            <Marker
              key={`${stop.name}-${i}`}
              position={[stop.lat, stop.lng]}
              icon={createStopMarker(markerColor, activeStop === i)}
              eventHandlers={{ click: () => setActiveStop(activeStop === i ? null : i) }}
            >
              <Popup>
                <div style={{ padding: '4px 2px', minWidth: '200px' }}>
                  <p style={{
                    fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '500',
                    color: routeColor, textTransform: 'uppercase',
                    letterSpacing: '0.08em', marginBottom: '4px',
                  }}>
                    {stop.name}
                  </p>
                  <p style={{
                    fontFamily: FONT_HEADING, fontSize: '14px', fontWeight: '500',
                    color: palette.primary.default, margin: '0 0 10px',
                  }}>
                    Day {stop.day}{stop.nights > 1 ? `–${stop.day + stop.nights - 1}` : ''} | {stop.label}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                    <BedDouble size={14} strokeWidth={1.5} color={palette.primary.default} />
                    <span style={{ fontFamily: FONT_BODY, fontSize: '12px', color: palette.primary.default, fontWeight: '500' }}>
                      {stop.hotel} →
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <UtensilsCrossed size={14} strokeWidth={1.5} color={palette.neutral[500]} />
                    <span style={{ fontFamily: FONT_BODY, fontSize: '11px', color: palette.neutral[500], textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      {stop.meals.join(', ')}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <div style={{
          position: 'absolute', bottom: '32px', left: '16px', zIndex: 1000,
          backgroundColor: isDark ? 'rgba(16,32,55,0.9)' : 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(8px)',
          borderRadius: '8px', padding: '12px 16px',
          boxShadow: '0 2px 8px rgba(16,32,55,0.12)',
          maxWidth: '240px',
        }}>
          <p style={{
            fontFamily: FONT_HEADING, fontSize: '13px', fontWeight: '500',
            color: isDark ? palette.surface.stone : palette.primary.default,
            margin: '0 0 6px', letterSpacing: '0.02em',
          }}>
            The Grand Tour of India
          </p>
          <p style={{
            fontFamily: FONT_BODY, fontSize: '11px',
            color: isDark ? palette.primary.faded : palette.neutral[500],
            margin: 0, lineHeight: 1.4,
          }}>
            17 days · 9 stops · Small Group Tour
          </p>
        </div>
      </div>

      <div style={{ marginTop: '20px' }}>
        <p style={sectionLabel}>Itinerary Stops</p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {INDIA_ITINERARY.map((stop, i) => (
            <button
              key={`${stop.name}-${i}`}
              onClick={() => setActiveStop(activeStop === i ? null : i)}
              style={{
                fontFamily: FONT_BODY, fontSize: '12px',
                padding: '8px 14px', borderRadius: '0',
                border: activeStop === i ? `1px solid ${routeColor}` : `1px solid ${palette.neutral[200]}`,
                backgroundColor: activeStop === i ? (isDark ? palette.primary.light : palette.primary.tint) : '#FFFFFF',
                color: palette.primary.default,
                cursor: 'pointer', fontWeight: activeStop === i ? '500' : '400',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}
            >
              <span style={{
                fontFamily: FONT_BODY, fontSize: '9px', fontWeight: '500',
                color: isDark ? palette.surface.stone : '#FFFFFF',
                backgroundColor: routeColor,
                padding: '2px 5px', borderRadius: '2px',
                letterSpacing: '0.04em',
              }}>
                D{stop.day}
              </span>
              {stop.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
