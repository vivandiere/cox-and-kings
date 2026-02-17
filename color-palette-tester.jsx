import React, { useState } from 'react';

export default function ColorPalette() {
  const [activeAccent, setActiveAccent] = useState('primary');
  
  // Brand colors (from brand doc - decorative, low contrast)
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
  
  // UI accent options (higher contrast alternatives)
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
      offWhite: '#F2F2EB',
      subtle: '#E8E8E0',
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
  
  // Check if this is a light accent that needs special handling
  const lightAccents = ['warmSand', 'cream', 'mist'];
  const isLightAccent = lightAccents.includes(activeAccent);
  
  // Colors for "on primary" contexts
  const onPrimaryText = isPrimaryAccent ? palette.surface.offWhite : accent.hex;
  const onPrimaryButtonBg = isPrimaryAccent ? palette.surface.offWhite : accent.hex;
  const onPrimaryButtonText = isPrimaryAccent ? palette.primary.default : palette.primary.default;

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: palette.surface.offWhite,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '32px',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ 
          color: palette.primary.default, 
          fontSize: '28px', 
          fontWeight: '600',
          marginBottom: '8px',
          letterSpacing: '-0.02em'
        }}>
          UI Color Palette
        </h1>
        <p style={{ color: palette.neutral[500], marginBottom: '32px' }}>
          Based on primary #102037 and surface #F2F2EB
        </p>

        {/* Accent Selector */}
        <div style={{ 
          backgroundColor: '#FFFFFF', 
          borderRadius: '12px', 
          padding: '24px',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(16,32,55,0.08)'
        }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '600', 
            color: palette.neutral[500],
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '16px'
          }}>
            Choose Accent Color
          </h2>
          
          {/* Row 1: Primary Only */}
          <div style={{ marginBottom: '16px' }}>
            {Object.entries(brandAccents).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveAccent(key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: activeAccent === key ? `2px solid ${palette.primary.default}` : '2px solid transparent',
                  backgroundColor: activeAccent === key ? palette.primary.tint : palette.surface.offWhite,
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
                <span style={{ 
                  fontWeight: '500', 
                  color: palette.primary.default,
                  fontSize: '13px'
                }}>
                  {value.name}
                </span>
              </button>
            ))}
          </div>

          {/* Row 2: Brand Decorative Colors */}
          <p style={{ fontSize: '11px', color: palette.neutral[400], marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Brand Decorative</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {Object.entries(brandDecorative).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveAccent(key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: activeAccent === key ? `2px solid ${value.hex}` : '2px solid transparent',
                  backgroundColor: activeAccent === key ? `${value.hex}40` : palette.surface.offWhite,
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
                <span style={{ 
                  fontWeight: '500', 
                  color: palette.primary.default,
                  fontSize: '13px'
                }}>
                  {value.name}
                </span>
              </button>
            ))}
          </div>

          {/* Row 3: Brand Decorative Deep */}
          <p style={{ fontSize: '11px', color: palette.neutral[400], marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Brand (Deeper Variants)</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
            {Object.entries(brandDecorativeDeep).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveAccent(key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: activeAccent === key ? `2px solid ${value.hex}` : '2px solid transparent',
                  backgroundColor: activeAccent === key ? `${value.hex}40` : palette.surface.offWhite,
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
                <span style={{ 
                  fontWeight: '500', 
                  color: palette.primary.default,
                  fontSize: '13px'
                }}>
                  {value.name}
                </span>
              </button>
            ))}
          </div>

          {/* Row 4: UI Accent Options */}
          <p style={{ fontSize: '11px', color: palette.neutral[400], marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>UI Accent Options (higher contrast)</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {Object.entries(uiAccents).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveAccent(key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: activeAccent === key ? `2px solid ${value.hex}` : '2px solid transparent',
                  backgroundColor: activeAccent === key ? `${value.hex}30` : palette.surface.offWhite,
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
                <span style={{ 
                  fontWeight: '500', 
                  color: palette.primary.default,
                  fontSize: '13px'
                }}>
                  {value.name}
                </span>
              </button>
            ))}
          </div>
          
          <p style={{ 
            marginTop: '12px', 
            fontSize: '14px', 
            color: palette.neutral[500] 
          }}>
            {accent.desc}
          </p>
        </div>

        {/* Contrast Test Panel */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '16px',
          marginBottom: '24px'
        }}>
          <div style={{ 
            backgroundColor: '#FFFFFF', 
            borderRadius: '12px', 
            padding: '24px',
            boxShadow: '0 1px 3px rgba(16,32,55,0.08)',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '12px', color: palette.neutral[400], marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>On White</p>
            <p style={{ color: accent.hex, fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              Accent Text
            </p>
            {isLightAccent && (
              <p style={{ fontSize: '11px', color: palette.semantic.warning, marginBottom: '8px' }}>⚠ Low contrast</p>
            )}
            <button style={{
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
            backgroundColor: palette.surface.offWhite, 
            borderRadius: '12px', 
            padding: '24px',
            border: '1px solid #E0E0D8',
            textAlign: 'center'
          }}>
            <p style={{ fontSize: '12px', color: palette.neutral[400], marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>On Off-White</p>
            <p style={{ color: accent.hex, fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              Accent Text
            </p>
            {isLightAccent && (
              <p style={{ fontSize: '11px', color: palette.semantic.warning, marginBottom: '8px' }}>⚠ Low contrast</p>
            )}
            <button style={{
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
            <p style={{ fontSize: '12px', color: palette.primary.faded, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>On Primary</p>
            <p style={{ color: onPrimaryText, fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
              {isPrimaryAccent ? 'Off-White Text' : 'Accent Text'}
            </p>
            {isLightAccent && (
              <p style={{ fontSize: '11px', color: palette.semantic.success, marginBottom: '8px' }}>✓ Good contrast</p>
            )}
            <button style={{
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

        {/* Main Palette Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          
          {/* Surfaces */}
          <div style={{ 
            backgroundColor: '#FFFFFF', 
            borderRadius: '12px', 
            padding: '24px',
            boxShadow: '0 1px 3px rgba(16,32,55,0.08)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: palette.primary.default, marginBottom: '16px' }}>
              Surface
            </h3>
            {Object.entries(palette.surface).map(([name, hex]) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  backgroundColor: hex,
                  border: '1px solid #E0E0D8',
                  marginRight: '12px'
                }}/>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: palette.primary.default }}>{name}</div>
                  <div style={{ fontSize: '13px', color: palette.neutral[500] }}>{hex}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Primary */}
          <div style={{ 
            backgroundColor: '#FFFFFF', 
            borderRadius: '12px', 
            padding: '24px',
            boxShadow: '0 1px 3px rgba(16,32,55,0.08)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: palette.primary.default, marginBottom: '16px' }}>
              Primary
            </h3>
            {Object.entries(palette.primary).map(([name, hex]) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  backgroundColor: hex,
                  marginRight: '12px'
                }}/>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: palette.primary.default }}>{name}</div>
                  <div style={{ fontSize: '13px', color: palette.neutral[500] }}>{hex}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Accent */}
          <div style={{ 
            backgroundColor: '#FFFFFF', 
            borderRadius: '12px', 
            padding: '24px',
            boxShadow: '0 1px 3px rgba(16,32,55,0.08)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: palette.primary.default, marginBottom: '16px' }}>
              Accent {isPrimaryAccent && <span style={{ fontWeight: '400', color: palette.neutral[400] }}>(using primary)</span>}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                backgroundColor: accent.hex,
                marginRight: '12px',
                border: isLightAccent ? '1px solid #E0E0D8' : 'none'
              }}/>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: palette.primary.default }}>default</div>
                <div style={{ fontSize: '13px', color: palette.neutral[500] }}>{accent.hex}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                backgroundColor: isPrimaryAccent ? palette.primary.tint : `${accent.hex}20`,
                marginRight: '12px',
                border: '1px solid #E0E0D8'
              }}/>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: palette.primary.default }}>tint</div>
                <div style={{ fontSize: '13px', color: palette.neutral[500] }}>{isPrimaryAccent ? palette.primary.tint : `${accent.hex}20`}</div>
              </div>
            </div>
            {isPrimaryAccent && (
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  backgroundColor: palette.surface.offWhite,
                  marginRight: '12px',
                  border: '1px solid #E0E0D8'
                }}/>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: palette.primary.default }}>onPrimary</div>
                  <div style={{ fontSize: '13px', color: palette.neutral[500] }}>{palette.surface.offWhite}</div>
                </div>
              </div>
            )}
          </div>

          {/* Semantic */}
          <div style={{ 
            backgroundColor: '#FFFFFF', 
            borderRadius: '12px', 
            padding: '24px',
            boxShadow: '0 1px 3px rgba(16,32,55,0.08)'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', color: palette.primary.default, marginBottom: '16px' }}>
              Semantic (compound)
            </h3>
            {[
              { name: 'success', hex: palette.semantic.success, light: palette.semantic.successLight },
              { name: 'warning', hex: palette.semantic.warning, light: palette.semantic.warningLight },
              { name: 'error', hex: palette.semantic.error, light: palette.semantic.errorLight },
              { name: 'info', hex: palette.semantic.info, light: palette.semantic.infoLight },
            ].map(({ name, hex, light }) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  backgroundColor: hex,
                  marginRight: '8px'
                }}/>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '8px',
                  backgroundColor: light,
                  marginRight: '12px',
                  border: '1px solid #E0E0D8'
                }}/>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '500', color: palette.primary.default }}>{name}</div>
                  <div style={{ fontSize: '13px', color: palette.neutral[500] }}>{hex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Neutrals Bar */}
        <div style={{ 
          backgroundColor: '#FFFFFF', 
          borderRadius: '12px', 
          padding: '24px',
          boxShadow: '0 1px 3px rgba(16,32,55,0.08)',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: palette.primary.default, marginBottom: '16px' }}>
            Neutrals (warm-shifted to match off-white)
          </h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {Object.entries(palette.neutral).map(([name, hex]) => (
              <div key={name} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '8px',
                  backgroundColor: hex,
                  marginBottom: '8px',
                  border: name === '100' || name === '200' ? '1px solid #E0E0D8' : 'none'
                }}/>
                <div style={{ fontSize: '12px', color: palette.neutral[500] }}>{name}</div>
                <div style={{ fontSize: '11px', color: palette.neutral[400] }}>{hex}</div>
              </div>
            ))}
          </div>
        </div>

        {/* UI Examples */}
        <div style={{ 
          backgroundColor: '#FFFFFF', 
          borderRadius: '12px', 
          padding: '32px',
          boxShadow: '0 1px 3px rgba(16,32,55,0.08)',
          marginBottom: '24px'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: palette.primary.default, marginBottom: '24px' }}>
            UI Examples
          </h3>
          
          {/* Buttons */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '13px', color: palette.neutral[500], marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Buttons</p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button style={{
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
            <p style={{ fontSize: '13px', color: palette.neutral[500], marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Form Elements</p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              <div style={{ width: '200px' }}>
                <label style={{ fontSize: '13px', color: palette.neutral[700], display: 'block', marginBottom: '6px' }}>Input Field</label>
                <input 
                  type="text" 
                  placeholder="Enter text..."
                  style={{
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
                <label style={{ fontSize: '13px', color: palette.neutral[700], display: 'block', marginBottom: '6px' }}>Focused State</label>
                <input 
                  type="text" 
                  placeholder="Focused..."
                  style={{
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
                  width: '20px',
                  height: '20px',
                  borderRadius: '4px',
                  backgroundColor: isPrimaryAccent ? palette.primary.default : accent.hex,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isLightAccent ? palette.primary.default : '#FFFFFF',
                  fontSize: '12px'
                }}>✓</div>
                <span style={{ fontSize: '14px', color: palette.neutral[700] }}>Checkbox</span>
              </div>
            </div>
          </div>

          {/* Cards */}
          <div style={{ marginBottom: '32px' }}>
            <p style={{ fontSize: '13px', color: palette.neutral[500], marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cards</p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{
                backgroundColor: palette.surface.offWhite,
                borderRadius: '12px',
                padding: '20px',
                width: '200px',
              }}>
                <div style={{ 
                  width: '100%', 
                  height: '100px', 
                  backgroundColor: palette.primary.tint,
                  borderRadius: '8px',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: palette.primary.muted,
                  fontSize: '12px'
                }}>
                  Image
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: '600', color: palette.primary.default, marginBottom: '4px' }}>Card Title</h4>
                <p style={{ fontSize: '13px', color: palette.neutral[500], marginBottom: '12px' }}>Short description text here</p>
                <span style={{ 
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
                width: '200px',
              }}>
                <div style={{ 
                  fontSize: '12px', 
                  color: onPrimaryText,
                  fontWeight: '600',
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Featured
                </div>
                <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#FFFFFF', marginBottom: '4px' }}>Dark Card</h4>
                <p style={{ fontSize: '13px', color: palette.primary.faded, marginBottom: '12px' }}>Description on dark background</p>
                <button style={{
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

              {/* Light accent showcase card */}
              {isLightAccent && (
                <div style={{
                  backgroundColor: accent.hex,
                  borderRadius: '12px',
                  padding: '20px',
                  width: '200px',
                }}>
                  <div style={{ 
                    fontSize: '12px', 
                    color: palette.primary.default,
                    fontWeight: '600',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    On Accent
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: '600', color: palette.primary.default, marginBottom: '4px' }}>Accent Card</h4>
                  <p style={{ fontSize: '13px', color: palette.primary.muted, marginBottom: '12px' }}>Light accents work great as fills</p>
                  <button style={{
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
            <p style={{ fontSize: '13px', color: palette.neutral[500], marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Alerts (compound semantic)</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
              <div style={{
                backgroundColor: palette.semantic.successLight,
                borderLeft: `3px solid ${palette.semantic.success}`,
                padding: '12px 16px',
                borderRadius: '0 8px 8px 0',
              }}>
                <span style={{ color: palette.semantic.success, fontSize: '14px', fontWeight: '500' }}>✓ Success message</span>
                <p style={{ color: palette.neutral[700], fontSize: '13px', marginTop: '4px' }}>Your changes have been saved.</p>
              </div>
              <div style={{
                backgroundColor: palette.semantic.warningLight,
                borderLeft: `3px solid ${palette.semantic.warning}`,
                padding: '12px 16px',
                borderRadius: '0 8px 8px 0',
              }}>
                <span style={{ color: palette.semantic.warning, fontSize: '14px', fontWeight: '500' }}>⚠ Warning message</span>
                <p style={{ color: palette.neutral[700], fontSize: '13px', marginTop: '4px' }}>Please review before continuing.</p>
              </div>
              <div style={{
                backgroundColor: palette.semantic.errorLight,
                borderLeft: `3px solid ${palette.semantic.error}`,
                padding: '12px 16px',
                borderRadius: '0 8px 8px 0',
              }}>
                <span style={{ color: palette.semantic.error, fontSize: '14px', fontWeight: '500' }}>✕ Error message</span>
                <p style={{ color: palette.neutral[700], fontSize: '13px', marginTop: '4px' }}>Something went wrong.</p>
              </div>
              <div style={{
                backgroundColor: palette.semantic.infoLight,
                borderLeft: `3px solid ${palette.semantic.info}`,
                padding: '12px 16px',
                borderRadius: '0 8px 8px 0',
              }}>
                <span style={{ color: palette.semantic.info, fontSize: '14px', fontWeight: '500' }}>ℹ Info message</span>
                <p style={{ color: palette.neutral[700], fontSize: '13px', marginTop: '4px' }}>Here's some helpful information.</p>
              </div>
            </div>
          </div>

          {/* Status Badges */}
          <div>
            <p style={{ fontSize: '13px', color: palette.neutral[500], marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status Badges</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{
                backgroundColor: palette.semantic.successLight,
                color: palette.semantic.success,
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '500',
              }}>
                Confirmed
              </span>
              <span style={{
                backgroundColor: palette.semantic.warningLight,
                color: palette.semantic.warning,
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '500',
              }}>
                Pending
              </span>
              <span style={{
                backgroundColor: palette.semantic.errorLight,
                color: palette.semantic.error,
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '500',
              }}>
                Cancelled
              </span>
              <span style={{
                backgroundColor: palette.semantic.infoLight,
                color: palette.semantic.info,
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: '500',
              }}>
                Processing
              </span>
            </div>
          </div>
        </div>

        {/* Color Values Export */}
        <div style={{ 
          backgroundColor: palette.primary.default, 
          borderRadius: '12px', 
          padding: '24px',
          boxShadow: '0 1px 3px rgba(16,32,55,0.08)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px' }}>
            {isPrimaryAccent ? 'Primary Only Mode' : `Selected Accent: ${accent.name}`}
          </h3>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {isPrimaryAccent ? (
              <>
                <div>
                  <p style={{ fontSize: '12px', color: palette.primary.faded, marginBottom: '4px' }}>Accent (primary)</p>
                  <code style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'monospace' }}>#102037</code>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: palette.primary.faded, marginBottom: '4px' }}>On Primary</p>
                  <code style={{ color: palette.surface.offWhite, fontSize: '14px', fontFamily: 'monospace' }}>#F2F2EB</code>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: palette.primary.faded, marginBottom: '4px' }}>Tint</p>
                  <code style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'monospace' }}>#E8ECF0</code>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p style={{ fontSize: '12px', color: palette.primary.faded, marginBottom: '4px' }}>Base</p>
                  <code style={{ color: accent.hex, fontSize: '14px', fontFamily: 'monospace' }}>{accent.hex}</code>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: palette.primary.faded, marginBottom: '4px' }}>Text on accent</p>
                  <code style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'monospace' }}>{isLightAccent ? '#102037' : '#FFFFFF'}</code>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: palette.primary.faded, marginBottom: '4px' }}>Best use</p>
                  <code style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'monospace' }}>{isLightAccent ? 'Fills, dark BGs' : 'Text, buttons'}</code>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
