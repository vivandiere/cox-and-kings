import React, { useState, useEffect, useRef } from 'react';
import { palette } from '../tokens/index.js';
import { FONT_HEADING, FONT_BODY } from '../tokens/index.js';
import { LogoStacked } from './Logo.jsx';

const PASS = 'C&K26';
const STORAGE_KEY = 'ck-auth';

export default function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(STORAGE_KEY) === '1');
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!unlocked && inputRef.current) inputRef.current.focus();
  }, [unlocked]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === PASS) {
      setFadeOut(true);
      setTimeout(() => {
        sessionStorage.setItem(STORAGE_KEY, '1');
        setUnlocked(true);
      }, 400);
    } else {
      setError(true);
      setValue('');
      setTimeout(() => setError(false), 1200);
    }
  };

  if (unlocked) return children;

  return (
    <>
      <div style={{
        filter: 'blur(20px)',
        pointerEvents: 'none',
        opacity: 0.4,
      }}>
        {children}
      </div>

      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(16, 32, 55, 0.6)',
        backdropFilter: 'blur(24px)',
        transition: 'opacity 0.4s ease',
        opacity: fadeOut ? 0 : 1,
      }}>
        <LogoStacked color={palette.surface.stone} height={48} />

        <form onSubmit={handleSubmit} style={{
          marginTop: '32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}>
          <label style={{
            fontFamily: FONT_BODY,
            fontSize: '12px',
            fontWeight: '300',
            color: palette.surface.stone,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0.7,
          }}>
            Password
          </label>
          <input
            ref={inputRef}
            type="password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{
              fontFamily: FONT_BODY,
              fontSize: '15px',
              padding: '12px 20px',
              width: '220px',
              textAlign: 'center',
              backgroundColor: 'rgba(255,255,255,0.08)',
              border: `1px solid ${error ? palette.semantic.error : 'rgba(255,255,255,0.2)'}`,
              borderRadius: '0',
              color: palette.surface.stone,
              outline: 'none',
              letterSpacing: '0.15em',
              transition: 'border-color 0.3s ease',
            }}
          />
          {error && (
            <p style={{
              fontFamily: FONT_BODY,
              fontSize: '12px',
              color: palette.semantic.error,
              margin: 0,
            }}>
              Incorrect password
            </p>
          )}
        </form>
      </div>
    </>
  );
}
