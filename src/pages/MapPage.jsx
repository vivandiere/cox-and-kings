import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { palette } from '../tokens/index.js';
import { FONT_HEADING, FONT_BODY, FONT_MONO, TS } from '../tokens/index.js';
import { useAccent } from '../components/AccentContext.jsx';

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

const countryToRegion = {};
Object.entries(REGIONS).forEach(([region, codes]) => {
  codes.forEach((code) => { countryToRegion[code] = region; });
});

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

export default function MapPage() {
  const { accent } = useAccent();
  const [mapActiveRegion, setMapActiveRegion] = useState(null);
  const [mapHoverRegion, setMapHoverRegion] = useState(null);
  const [mapZoom, setMapZoom] = useState(1);
  const [mapCenter, setMapCenter] = useState([20, 30]);

  const regionHighlight = accent.hex;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: palette.surface.stone,
      fontFamily: FONT_BODY,
      padding: '40px 32px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '8px' }}>
          <p style={sectionLabel}>Cox &amp; Kings Rebrand</p>
          <h1 style={{
            fontFamily: FONT_HEADING,
            color: palette.primary.default,
            fontSize: TS['2xl'],
            fontWeight: '500',
            letterSpacing: '0.05em',
            lineHeight: 1.1,
            textTransform: 'uppercase',
          }}>
            Navigational Map
          </h1>
        </div>

        <div style={{
          ...card,
          marginTop: '24px',
          marginBottom: '24px',
          padding: 0,
          overflow: 'hidden',
          position: 'relative',
        }}>
          <p style={{ ...sectionLabel, padding: '24px 24px 0 24px' }}>Navigational Map</p>
          <h3 style={{ ...sectionHeading, padding: '0 24px 4px 24px', fontSize: TS.bodyLg }}>
            Explore Our Destinations
          </h3>

          <div style={{ padding: '0 24px 24px' }}>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {Object.keys(REGIONS).map((region) => {
                const isActive = mapActiveRegion === region;
                return (
                  <button
                    key={region}
                    onClick={() => setMapActiveRegion(isActive ? null : region)}
                    style={{
                      fontFamily: FONT_BODY,
                      fontSize: '11px',
                      fontWeight: isActive ? '600' : '400',
                      color: isActive ? '#FFFFFF' : palette.primary.default,
                      backgroundColor: isActive ? palette.primary.default : palette.surface.stone,
                      border: `1px solid ${isActive ? palette.primary.default : palette.neutral[200]}`,
                      borderRadius: '16px',
                      padding: '5px 12px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {region}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{
            backgroundColor: palette.primary.default,
            borderRadius: '0 0 12px 12px',
            overflow: 'hidden',
            position: 'relative',
          }}>
            {mapActiveRegion && (
              <p style={{
                position: 'absolute',
                top: '16px',
                left: '20px',
                zIndex: 2,
                fontFamily: FONT_HEADING,
                fontSize: '18px',
                fontWeight: '500',
                color: palette.surface.stone,
                margin: 0,
              }}>
                {mapActiveRegion}
              </p>
            )}
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 120, center: mapCenter }}
              width={800}
              height={420}
              style={{ width: '100%', height: 'auto' }}
            >
              <ZoomableGroup zoom={mapZoom} center={mapCenter} onMoveEnd={({ coordinates, zoom: z }) => { setMapCenter(coordinates); setMapZoom(z); }}>
                <Geographies geography={GEO_URL}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const numId = parseInt(geo.id, 10);
                      const region = countryToRegion[numId];
                      const isActiveRegion = mapActiveRegion && region === mapActiveRegion;
                      const isHoverRegion = mapHoverRegion && region === mapHoverRegion;
                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={() => { if (region) setMapHoverRegion(region); }}
                          onMouseLeave={() => setMapHoverRegion(null)}
                          onClick={() => { if (region) setMapActiveRegion(mapActiveRegion === region ? null : region); }}
                          style={{
                            default: {
                              fill: isActiveRegion ? regionHighlight : (isHoverRegion ? palette.primary.lighter : palette.primary.light),
                              stroke: palette.primary.default,
                              strokeWidth: 0.4,
                              transition: 'fill 0.2s ease',
                              cursor: region ? 'pointer' : 'default',
                              outline: 'none',
                            },
                            hover: {
                              fill: isActiveRegion ? regionHighlight : palette.primary.lighter,
                              stroke: palette.primary.default,
                              strokeWidth: 0.4,
                              outline: 'none',
                              cursor: region ? 'pointer' : 'default',
                            },
                            pressed: {
                              fill: isActiveRegion ? regionHighlight : palette.primary.muted,
                              stroke: palette.primary.default,
                              strokeWidth: 0.4,
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

            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              {mapActiveRegion && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <span style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    backgroundColor: regionHighlight,
                    display: 'inline-block',
                  }} />
                  <span style={{
                    fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '500',
                    color: palette.surface.stone,
                  }}>
                    {mapActiveRegion}
                  </span>
                  <span
                    onClick={() => setMapActiveRegion(null)}
                    style={{
                      fontFamily: FONT_BODY, fontSize: '11px',
                      color: palette.primary.faded, cursor: 'pointer',
                      marginLeft: '4px',
                    }}
                  >
                    Clear
                  </span>
                </div>
              )}
              {!mapActiveRegion && mapHoverRegion && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{
                    width: '6px', height: '6px', borderRadius: '50%',
                    backgroundColor: palette.primary.faded,
                    display: 'inline-block',
                  }} />
                  <span style={{
                    fontFamily: FONT_BODY, fontSize: '12px', fontWeight: '400',
                    color: palette.surface.stone, opacity: 0.7,
                  }}>
                    {mapHoverRegion}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
