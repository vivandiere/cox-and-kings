import React from 'react';
import { palette, brandAccents, brandDecorative, brandDecorativeDeep, uiAccents, buildAccentScale, lightAccents } from '../tokens/index.js';
import { FONT_HEADING, FONT_BODY, FONT_MONO, TS } from '../tokens/index.js';
import { LogoMark, LogoInline, LogoStacked } from '../components/Logo.jsx';
import { useAccent } from '../components/AccentContext.jsx';
import { Link } from 'react-router-dom';

export default function FoundationsPage() {
  const { activeAccent, setActiveAccent, accent, accentScale, isPrimaryAccent, isLightAccent, onPrimaryText, onPrimaryButtonBg, onPrimaryButtonText } = useAccent();

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
            marginBottom: '16px',
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
          marginBottom: '24px',
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
          marginBottom: '24px',
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
            textAlign: 'center',
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
            textAlign: 'center',
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
                    backgroundColor: hex, border: '1px solid #E0E0D8', marginRight: '12px',
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
                  backgroundColor: hex, border: '1px solid #E0E0D8', marginRight: '12px',
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
                  backgroundColor: hex, marginRight: '12px',
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
                  backgroundColor: hex, marginRight: '8px',
                }}/>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '8px',
                  backgroundColor: light, marginRight: '12px', border: '1px solid #E0E0D8',
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
                  border: name === '100' || name === '200' ? '1px solid #E0E0D8' : 'none',
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
                  color: isLightAccent ? palette.primary.default : '#FFFFFF', fontSize: '12px',
                }}>✓</div>
                <span style={{ fontFamily: FONT_BODY, fontSize: '14px', color: palette.neutral[700] }}>Checkbox</span>
              </div>
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

          {/* ════════════════ PRODUCT CARDS ════════════════ */}
          <div style={{ marginTop: '40px' }}>
            <p style={{ ...sectionLabel, marginBottom: '16px' }}>Product Cards</p>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'stretch' }}>

              {/* Card 1 — Serif-led */}
              {(() => {
                const stops = ['Delhi', 'Agra', 'Jaipur', 'Udaipur', 'Varanasi'];
                return (
                  <div style={{ width: '340px', display: 'flex', flexDirection: 'column' }}>
                    <p style={{
                      fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '300',
                      color: palette.neutral[400], textTransform: 'uppercase',
                      letterSpacing: '0.08em', marginBottom: '8px', textAlign: 'center',
                    }}>V1 &mdash; Serif-led, Meso title, Ceno price</p>
                    <div style={{
                      flex: 1, display: 'flex', flexDirection: 'column',
                      backgroundColor: palette.surface.stone,
                      borderRadius: '16px',
                      boxShadow: '0 2px 12px rgba(16,32,55,0.08)',
                      padding: '6px 6px 0',
                    }}>
                      <div style={{ position: 'relative', zIndex: 1, marginBottom: '-16px' }}>
                        <img
                          src="/images/hero-01.png"
                          alt="The Grand Tour of India"
                          style={{ width: '100%', height: '230px', objectFit: 'cover', display: 'block', borderRadius: '24px' }}
                        />
                        <span style={{
                          position: 'absolute', top: '14px', left: '14px',
                          fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '500',
                          letterSpacing: '0.08em', textTransform: 'uppercase',
                          backgroundColor: isPrimaryAccent ? palette.surface.stone : accent.hex,
                          color: isPrimaryAccent ? palette.primary.default : (isLightAccent ? palette.primary.default : '#FFFFFF'),
                          padding: '6px 12px', borderRadius: '6px',
                        }}>
                          Small Group Tour
                        </span>
                        <span style={{
                          position: 'absolute', bottom: '14px', right: '14px',
                          fontFamily: 'chainprinter, "Courier New", monospace',
                          color: 'rgb(242, 242, 235)', fontSize: '10px', fontWeight: '400',
                          letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.7,
                        }}>
                          Agra, India
                        </span>
                      </div>
                      <div style={{ padding: '28px 18px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h4 style={{
                          fontFamily: FONT_HEADING, fontSize: TS.lg, fontWeight: '500',
                          color: palette.primary.default, marginBottom: '6px', lineHeight: 1.2,
                        }}>
                          The Grand Tour of India
                        </h4>
                        <p style={{
                          fontFamily: FONT_BODY, fontSize: TS.sm, fontWeight: '500',
                          color: palette.primary.default, letterSpacing: '0.04em',
                          textTransform: 'uppercase', marginBottom: '14px',
                        }}>
                          17 Days &bull; Limited to 18 Guests
                        </p>
                        <p style={{
                          fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '300',
                          color: palette.neutral[400], textTransform: 'uppercase',
                          letterSpacing: '0.06em', marginBottom: '6px',
                        }}>
                          Itinerary
                        </p>
                        <p style={{
                          fontFamily: FONT_BODY, fontSize: TS.sm, fontWeight: '500',
                          color: palette.primary.default, lineHeight: 1.6, marginBottom: '18px',
                        }}>
                          {stops.map((s, i) => (
                            <React.Fragment key={s}>{s}{i < stops.length - 1 && <span style={{ margin: '0 6px', color: palette.neutral[300] }}>&bull;</span>}</React.Fragment>
                          ))}
                        </p>
                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                          <p style={{
                            fontFamily: FONT_BODY, fontSize: TS.bodyLg, fontWeight: '400',
                            color: isPrimaryAccent ? palette.primary.default : accent.hex,
                          }}>
                            From £4,095
                          </p>
                          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
                            <span style={{
                              fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '500',
                              color: palette.neutral[400], textTransform: 'uppercase',
                              letterSpacing: '0.06em',
                            }}>
                              Activity Level:
                            </span>
                            <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end' }}>
                              {[8, 12, 16].map((h, i) => (
                                <div key={i} style={{
                                  width: '4px', height: `${h}px`, borderRadius: '1px',
                                  backgroundColor: i < 2 ? palette.primary.default : palette.neutral[200],
                                }}/>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Card 2 — Sans-led dark */}
              {(() => {
                const stops = ['Marrakech', 'Atlas Mountains', 'Sahara', 'Fes'];
                return (
                  <div style={{ width: '340px', display: 'flex', flexDirection: 'column' }}>
                    <p style={{
                      fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '300',
                      color: palette.neutral[400], textTransform: 'uppercase',
                      letterSpacing: '0.08em', marginBottom: '8px', textAlign: 'center',
                    }}>V2 &mdash; Sans-led, All Ceno</p>
                    <div style={{
                      flex: 1, display: 'flex', flexDirection: 'column',
                      backgroundColor: palette.primary.default,
                      borderRadius: '16px',
                      overflow: 'hidden',
                      boxShadow: '0 2px 12px rgba(16,32,55,0.15)',
                    }}>
                      <div style={{ padding: '20px 24px 14px' }}>
                        <span style={{
                          fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '500',
                          letterSpacing: '0.08em', textTransform: 'uppercase',
                          color: isPrimaryAccent ? palette.primary.faded : accent.hex,
                        }}>
                          Tailormade
                        </span>
                        <h4 style={{
                          fontFamily: FONT_BODY, fontSize: TS.xl, fontWeight: '500',
                          color: '#FFFFFF', marginTop: '6px', marginBottom: '4px', lineHeight: 1.15,
                        }}>
                          Morocco Uncovered
                        </h4>
                        <p style={{
                          fontFamily: FONT_BODY, fontSize: TS.sm, fontWeight: '400',
                          color: palette.primary.faded, letterSpacing: '0.04em',
                          textTransform: 'uppercase',
                        }}>
                          12 Days &bull; Private Journey
                        </p>
                      </div>
                      <div style={{ position: 'relative' }}>
                        <img
                          src="/images/hero-02.png"
                          alt="Morocco Uncovered"
                          style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                        />
                        <span style={{
                          position: 'absolute', bottom: '12px', right: '14px',
                          fontFamily: 'chainprinter, "Courier New", monospace',
                          color: 'rgb(242, 242, 235)', fontSize: '10px', fontWeight: '400',
                          letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.7,
                        }}>
                          Marrakech, Morocco
                        </span>
                      </div>
                      <div style={{ padding: '16px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <p style={{
                          fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '300',
                          color: palette.primary.faded, textTransform: 'uppercase',
                          letterSpacing: '0.06em', marginBottom: '6px', opacity: 0.7,
                        }}>
                          Itinerary
                        </p>
                        <p style={{
                          fontFamily: FONT_BODY, fontSize: TS.sm, fontWeight: '400',
                          color: palette.surface.stone, lineHeight: 1.6, marginBottom: '18px',
                        }}>
                          {stops.map((s, i) => (
                            <React.Fragment key={s}>{s}{i < stops.length - 1 && <span style={{ margin: '0 6px', color: palette.primary.muted }}>&bull;</span>}</React.Fragment>
                          ))}
                        </p>
                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                          <p style={{
                            fontFamily: FONT_BODY, fontSize: TS.bodyLg, fontWeight: '700',
                            color: isPrimaryAccent ? palette.surface.stone : accent.hex,
                          }}>
                            From £3,250
                          </p>
                          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
                            <span style={{
                              fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '500',
                              color: palette.primary.faded, textTransform: 'uppercase',
                              letterSpacing: '0.06em', opacity: 0.7,
                            }}>
                              Activity Level:
                            </span>
                            <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end' }}>
                              {[8, 12, 16].map((h, i) => (
                                <div key={i} style={{
                                  width: '4px', height: `${h}px`, borderRadius: '1px',
                                  backgroundColor: i < 3 ? palette.surface.stone : palette.primary.muted,
                                }}/>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Card 3 — Editorial white */}
              <div style={{ width: '340px', display: 'flex', flexDirection: 'column' }}>
                <p style={{
                  fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '300',
                  color: palette.neutral[400], textTransform: 'uppercase',
                  letterSpacing: '0.08em', marginBottom: '8px', textAlign: 'center',
                }}>V3 &mdash; Editorial, Meso Light + Meso stops</p>
                <div style={{
                  flex: 1, display: 'flex', flexDirection: 'column',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(16,32,55,0.08)',
                  border: `1px solid ${palette.neutral[100]}`,
                }}>
                  <div style={{ position: 'relative' }}>
                    <img
                      src="/images/hero-03.png"
                      alt="Japan in Cherry Blossom"
                      style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                    />
                    <span style={{
                      position: 'absolute', top: '14px', left: '14px',
                      fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '500',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      backgroundColor: palette.primary.default,
                      color: '#FFFFFF',
                      padding: '6px 12px', borderRadius: '6px',
                    }}>
                      Small Group Tour
                    </span>
                    <span style={{
                      position: 'absolute', bottom: '12px', right: '14px',
                      fontFamily: 'chainprinter, "Courier New", monospace',
                      color: 'rgb(242, 242, 235)', fontSize: '10px', fontWeight: '400',
                      letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.7,
                    }}>
                      Kyoto, Japan
                    </span>
                  </div>
                  <div style={{ padding: '20px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h4 style={{
                      fontFamily: FONT_HEADING, fontSize: TS.xl, fontWeight: '500',
                      color: palette.primary.default, marginBottom: '6px', lineHeight: 1.15,
                    }}>
                      Japan in Cherry Blossom
                    </h4>
                    <p style={{
                      fontFamily: FONT_HEADING, fontSize: TS.sm, fontWeight: '400',
                      color: palette.primary.default, letterSpacing: '0.04em',
                      textTransform: 'uppercase', marginBottom: '14px',
                    }}>
                      14 Days &bull; Limited to 16 Guests
                    </p>
                    <p style={{
                      fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '300',
                      color: palette.neutral[400], textTransform: 'uppercase',
                      letterSpacing: '0.06em', marginBottom: '6px',
                    }}>
                      Itinerary
                    </p>
                    <p style={{
                      fontFamily: FONT_HEADING, fontSize: TS.sm, fontWeight: '400',
                      color: palette.primary.default, lineHeight: 1.6, marginBottom: '18px',
                    }}>
                      {['Tokyo', 'Hakone', 'Kyoto', 'Osaka', 'Hiroshima'].map((s, i, arr) => (
                        <React.Fragment key={s}>{s}{i < arr.length - 1 && <span style={{ margin: '0 6px', color: palette.neutral[300] }}>&bull;</span>}</React.Fragment>
                      ))}
                    </p>
                    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <p>
                        <span style={{
                          fontFamily: FONT_BODY, fontSize: TS.sm, fontWeight: '300',
                          color: palette.neutral[500],
                        }}>From </span>
                        <span style={{
                          fontFamily: FONT_HEADING, fontSize: TS.bodyLg, fontWeight: '500',
                          color: isPrimaryAccent ? palette.primary.default : accent.hex,
                        }}>£5,495</span>
                      </p>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
                        <span style={{
                          fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '500',
                          color: palette.neutral[400], textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}>
                          Activity Level:
                        </span>
                        <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end' }}>
                          {[8, 12, 16].map((h, i) => (
                            <div key={i} style={{
                              width: '4px', height: `${h}px`, borderRadius: '1px',
                              backgroundColor: i < 1 ? palette.primary.default : palette.neutral[200],
                            }}/>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ════════════════ PRODUCT CARDS — DETAILED ════════════════ */}
          <div style={{ marginTop: '40px' }}>
            <p style={{ ...sectionLabel, marginBottom: '16px' }}>Product Cards — Detailed</p>

            {/* Detailed V1 — Classic horizontal */}
            <p style={{
              fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '300',
              color: palette.neutral[400], textTransform: 'uppercase',
              letterSpacing: '0.08em', marginBottom: '10px',
            }}>V1 &mdash; Classic horizontal</p>
            <div style={{
              display: 'flex', borderRadius: '16px', overflow: 'hidden',
              backgroundColor: palette.surface.stone,
              boxShadow: '0 2px 12px rgba(16,32,55,0.08)',
              marginBottom: '28px',
            }}>
              <div style={{ position: 'relative', width: '420px', minHeight: '320px', flexShrink: 0 }}>
                <img
                  src="/images/hero-01.png"
                  alt="The Grand Tour of India"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <span style={{
                  position: 'absolute', top: '16px', left: '16px',
                  fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '500',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  backgroundColor: isPrimaryAccent ? palette.surface.stone : accent.hex,
                  color: isPrimaryAccent ? palette.primary.default : (isLightAccent ? palette.primary.default : '#FFFFFF'),
                  padding: '6px 14px', borderRadius: '6px',
                }}>
                  Small Group Tour
                </span>
                <span style={{
                  position: 'absolute', bottom: '14px', right: '14px',
                  fontFamily: 'chainprinter, "Courier New", monospace',
                  color: 'rgb(242, 242, 235)', fontSize: '10px', fontWeight: '400',
                  letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.7,
                }}>
                  Agra, India
                </span>
              </div>
              <div style={{ padding: '28px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h4 style={{
                  fontFamily: FONT_HEADING, fontSize: TS.xl, fontWeight: '500',
                  color: palette.primary.default, marginBottom: '6px', lineHeight: 1.2,
                }}>
                  The Grand Tour of India
                </h4>
                <p style={{
                  fontFamily: FONT_BODY, fontSize: TS.sm, fontWeight: '500',
                  color: palette.primary.default, letterSpacing: '0.04em',
                  textTransform: 'uppercase', marginBottom: '16px',
                }}>
                  17 Days &bull; 8 Destinations
                </p>
                <p style={{
                  fontFamily: FONT_BODY, fontSize: TS.base, fontWeight: '400',
                  color: palette.neutral[700], lineHeight: 1.65, marginBottom: '20px',
                }}>
                  Explore the diverse cultural influences that have created the fascinating heritage of India. This tour encompasses holy cities, the resplendent Taj Mahal, Jodhpur's bluewashed houses, and the beautiful lakes and palaces of Udaipur.
                </p>
                <p style={{
                  fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '300',
                  color: palette.neutral[400], textTransform: 'uppercase',
                  letterSpacing: '0.06em', marginBottom: '6px',
                }}>
                  Itinerary
                </p>
                <p style={{
                  fontFamily: FONT_BODY, fontSize: TS.sm, fontWeight: '500',
                  color: palette.primary.default, lineHeight: 1.6, marginBottom: '20px',
                }}>
                  {['Amritsar', 'Varanasi', 'New Delhi', 'Agra', 'Rajasthan', 'Jaipur', 'Jodhpur', 'Udaipur'].map((s, i, arr) => (
                    <React.Fragment key={s}>{s}{i < arr.length - 1 && <span style={{ margin: '0 6px', color: palette.neutral[300] }}>&bull;</span>}</React.Fragment>
                  ))}
                </p>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{
                    fontFamily: FONT_HEADING, fontSize: TS.bodyLg, fontWeight: '400',
                    color: isPrimaryAccent ? palette.primary.default : accent.hex,
                  }}>
                    From £4,095
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
                      <span style={{
                        fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '500',
                        color: palette.neutral[400], textTransform: 'uppercase', letterSpacing: '0.06em',
                      }}>Activity Level:</span>
                      <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end' }}>
                        {[8, 12, 16].map((h, i) => (
                          <div key={i} style={{
                            width: '4px', height: `${h}px`, borderRadius: '1px',
                            backgroundColor: i < 2 ? palette.primary.default : palette.neutral[200],
                          }}/>
                        ))}
                      </div>
                    </div>
                    <button style={{
                      fontFamily: FONT_BODY, fontSize: TS.sm, fontWeight: '500',
                      backgroundColor: palette.primary.default, color: '#FFFFFF',
                      padding: '10px 24px', borderRadius: '8px', border: 'none',
                      cursor: 'pointer', letterSpacing: '0.02em',
                    }}>
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed V2 — Content left, image right 50% */}
            <p style={{
              fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '300',
              color: palette.neutral[400], textTransform: 'uppercase',
              letterSpacing: '0.08em', marginBottom: '10px',
            }}>V2 &mdash; Content left, image right</p>
            <div style={{
              display: 'flex', borderRadius: '16px', overflow: 'hidden',
              backgroundColor: palette.surface.stone,
              boxShadow: '0 2px 12px rgba(16,32,55,0.08)',
              marginBottom: '28px',
            }}>
              <div style={{ width: '50%', padding: '32px 36px', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '16px' }}>
                  <span style={{
                    fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '500',
                    letterSpacing: '0.08em', textTransform: 'uppercase',
                    color: isPrimaryAccent ? palette.neutral[400] : accent.hex,
                  }}>
                    Small Group Tour
                  </span>
                </div>
                <h4 style={{
                  fontFamily: FONT_HEADING, fontSize: TS['2xl'], fontWeight: '500',
                  color: palette.primary.default, marginBottom: '6px', lineHeight: 1.15,
                }}>
                  The Grand Tour of India
                </h4>
                <p style={{
                  fontFamily: FONT_BODY, fontSize: TS.sm, fontWeight: '400',
                  color: palette.neutral[500], letterSpacing: '0.04em',
                  textTransform: 'uppercase', marginBottom: '18px',
                }}>
                  17 Days &bull; 8 Destinations &bull; Limited to 18 Guests
                </p>
                <p style={{
                  fontFamily: FONT_BODY, fontSize: TS.base, fontWeight: '400',
                  color: palette.neutral[700], lineHeight: 1.65, marginBottom: '20px',
                }}>
                  Explore the diverse cultural influences that have created the fascinating heritage of India. This tour encompasses holy cities, the resplendent Taj Mahal, Jodhpur's bluewashed houses, and the beautiful lakes and palaces of Udaipur.
                </p>
                <p style={{
                  fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '300',
                  color: palette.neutral[400], textTransform: 'uppercase',
                  letterSpacing: '0.06em', marginBottom: '6px',
                }}>
                  Itinerary
                </p>
                <p style={{
                  fontFamily: FONT_BODY, fontSize: TS.sm, fontWeight: '500',
                  color: palette.primary.default, lineHeight: 1.8, marginBottom: '24px',
                }}>
                  {['Amritsar', 'Varanasi', 'New Delhi', 'Agra', 'Rajasthan', 'Jaipur', 'Jodhpur', 'Udaipur'].map((s, i, arr) => (
                    <React.Fragment key={s}>{s}{i < arr.length - 1 && <span style={{ margin: '0 6px', color: palette.neutral[300] }}>&bull;</span>}</React.Fragment>
                  ))}
                </p>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <p style={{
                    fontFamily: FONT_HEADING, fontSize: TS.lg, fontWeight: '400',
                    color: isPrimaryAccent ? palette.primary.default : accent.hex,
                  }}>
                    From £4,095
                  </p>
                  <button style={{
                    fontFamily: FONT_BODY, fontSize: TS.sm, fontWeight: '500',
                    backgroundColor: palette.primary.default,
                    color: '#FFFFFF',
                    padding: '10px 24px', borderRadius: '8px', border: 'none',
                    cursor: 'pointer', letterSpacing: '0.02em',
                  }}>
                    Explore
                  </button>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', marginLeft: 'auto' }}>
                    <span style={{
                      fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '500',
                      color: palette.neutral[400], textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}>Activity Level:</span>
                    <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end' }}>
                      {[8, 12, 16].map((h, i) => (
                        <div key={i} style={{
                          width: '4px', height: `${h}px`, borderRadius: '1px',
                          backgroundColor: i < 2 ? palette.primary.default : palette.neutral[200],
                        }}/>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ width: '50%', flexShrink: 0, position: 'relative' }}>
                <img
                  src="/images/hero-01.png"
                  alt="The Grand Tour of India"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <span style={{
                  position: 'absolute', bottom: '14px', right: '14px',
                  fontFamily: 'chainprinter, "Courier New", monospace',
                  color: 'rgb(242, 242, 235)', fontSize: '10px', fontWeight: '400',
                  letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.7,
                }}>
                  Agra, India
                </span>
              </div>
            </div>

            {/* Detailed V3 — Editorial overlay */}
            <p style={{
              fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '300',
              color: palette.neutral[400], textTransform: 'uppercase',
              letterSpacing: '0.08em', marginBottom: '10px',
            }}>V3 &mdash; Editorial overlay</p>
            <div style={{
              borderRadius: '16px', overflow: 'hidden',
              boxShadow: '0 2px 16px rgba(16,32,55,0.12)',
              marginBottom: '28px',
            }}>
              <div style={{ position: 'relative', height: '400px' }}>
                <img
                  src="/images/hero-01.png"
                  alt="The Grand Tour of India"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to right, rgba(16,32,55,0.92) 0%, rgba(16,32,55,0.75) 50%, rgba(16,32,55,0) 100%)',
                }}/>
                <span style={{
                  position: 'absolute', bottom: '14px', right: '14px', zIndex: 1,
                  fontFamily: 'chainprinter, "Courier New", monospace',
                  color: 'rgb(242, 242, 235)', fontSize: '10px', fontWeight: '400',
                  letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.7,
                }}>
                  Agra, India
                </span>
                <div style={{
                  position: 'absolute', top: 0, left: 0, bottom: 0,
                  width: '60%', padding: '32px 36px',
                  display: 'flex', flexDirection: 'column',
                }}>
                  <div style={{ marginBottom: '16px' }}>
                    <span style={{
                      fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '500',
                      letterSpacing: '0.08em', textTransform: 'uppercase',
                      backgroundColor: isPrimaryAccent ? palette.surface.stone : accent.hex,
                      color: isPrimaryAccent ? palette.primary.default : (isLightAccent ? palette.primary.default : '#FFFFFF'),
                      padding: '5px 12px', borderRadius: '5px',
                    }}>
                      Small Group Tour
                    </span>
                  </div>
                  <h4 style={{
                    fontFamily: FONT_HEADING, fontSize: TS['2xl'], fontWeight: '500',
                    color: '#FFFFFF', marginBottom: '4px', lineHeight: 1.15,
                  }}>
                    The Grand Tour of India
                  </h4>
                  <p style={{
                    fontFamily: FONT_BODY, fontSize: TS.sm, fontWeight: '400',
                    color: palette.primary.faded, letterSpacing: '0.04em',
                    textTransform: 'uppercase', marginBottom: '18px',
                  }}>
                    17 Days &bull; 8 Destinations &bull; Limited to 18 Guests
                  </p>
                  <p style={{
                    fontFamily: FONT_BODY, fontSize: '15px', fontWeight: '400',
                    color: 'rgba(242,242,235,0.85)', lineHeight: 1.65, marginBottom: '20px',
                  }}>
                    Explore the diverse cultural influences that have created the fascinating heritage of India. This tour encompasses holy cities, the resplendent Taj Mahal, and the beautiful lakes of Udaipur.
                  </p>
                  <div style={{ marginTop: 'auto' }}>
                    <p style={{
                      fontFamily: FONT_BODY, fontSize: '11px', fontWeight: '300',
                      color: palette.primary.faded, textTransform: 'uppercase',
                      letterSpacing: '0.06em', marginBottom: '6px', opacity: 0.7,
                    }}>
                      Itinerary
                    </p>
                    <p style={{
                      fontFamily: FONT_BODY, fontSize: TS.sm, fontWeight: '400',
                      color: palette.surface.stone, lineHeight: 1.8, marginBottom: '20px',
                    }}>
                      {['Amritsar', 'Varanasi', 'New Delhi', 'Agra', 'Rajasthan', 'Jaipur', 'Jodhpur', 'Udaipur'].map((s, i, arr) => (
                        <React.Fragment key={s}>{s}{i < arr.length - 1 && <span style={{ margin: '0 6px', color: palette.primary.muted }}>&bull;</span>}</React.Fragment>
                      ))}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                      <p style={{
                        fontFamily: FONT_HEADING, fontSize: TS.lg, fontWeight: '400',
                        color: isPrimaryAccent ? palette.surface.stone : accent.hex,
                      }}>
                        From £4,095
                      </p>
                      <button style={{
                        fontFamily: FONT_BODY, fontSize: TS.sm, fontWeight: '500',
                        backgroundColor: isPrimaryAccent ? palette.surface.stone : accent.hex,
                        color: isPrimaryAccent ? palette.primary.default : (isLightAccent ? palette.primary.default : '#FFFFFF'),
                        padding: '10px 24px', borderRadius: '8px', border: 'none',
                        cursor: 'pointer', letterSpacing: '0.02em',
                      }}>
                        Explore
                      </button>
                      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
                        <span style={{
                          fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '500',
                          color: palette.primary.faded, textTransform: 'uppercase',
                          letterSpacing: '0.06em', opacity: 0.7,
                        }}>Activity Level:</span>
                        <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end' }}>
                          {[8, 12, 16].map((h, i) => (
                            <div key={i} style={{
                              width: '4px', height: `${h}px`, borderRadius: '1px',
                              backgroundColor: i < 2 ? palette.surface.stone : palette.primary.muted,
                            }}/>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════ HOMEPAGE PREVIEW LINK ════════════════ */}
        <div style={{ ...card, marginBottom: '24px', textAlign: 'center' }}>
          <Link to="/homepage" style={{
            fontFamily: FONT_HEADING, fontSize: TS.bodyLg, fontWeight: '500',
            color: palette.primary.default, textDecoration: 'none',
            display: 'block', padding: '12px 0',
          }}>
            View Homepage Preview →
          </Link>
          <span
            onClick={() => window.open('/homepage', '_blank')}
            style={{
              fontFamily: FONT_BODY, fontSize: '10px', fontWeight: '500',
              color: palette.primary.muted, cursor: 'pointer',
              letterSpacing: '0.04em', textTransform: 'uppercase',
              display: 'inline-flex', alignItems: 'center', gap: '4px',
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

        {/* ════════════════ COLOR VALUES EXPORT ════════════════ */}
        <div style={{
          backgroundColor: palette.primary.default,
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(16,32,55,0.08)',
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

        {/* ════════════════ FIGMA TOKENS DOC LINK ════════════════ */}
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

        {/* ════════════════ FOOTER ════════════════ */}
        <div style={{
          textAlign: 'center',
          padding: '32px 0 8px',
          color: palette.neutral[400],
          fontSize: '12px',
          fontFamily: FONT_BODY,
        }}>
          Cox &amp; Kings — Design Foundations — {new Date().getFullYear()}
        </div>

        <div style={{ textAlign: 'center', padding: '16px 0 32px' }}>
          <Link to="/homepage" style={{
            fontFamily: FONT_BODY, fontSize: '13px', fontWeight: '500',
            color: palette.primary.muted, textDecoration: 'none',
            letterSpacing: '0.04em',
          }}>
            View Homepage Preview →
          </Link>
        </div>

      </div>
    </div>
  );
}
