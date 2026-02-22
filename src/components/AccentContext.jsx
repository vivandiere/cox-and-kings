import React, { createContext, useContext, useState, useMemo } from 'react';
import { allAccents, buildAccentScale, deriveAccentHelpers } from '../tokens/palette.js';

const AccentContext = createContext();

export function AccentProvider({ children }) {
  const [activeAccent, setActiveAccent] = useState('primary');

  const value = useMemo(() => {
    const accent = allAccents[activeAccent];
    const accentScale = buildAccentScale(accent.hex);
    const helpers = deriveAccentHelpers(activeAccent, accent);
    return { activeAccent, setActiveAccent, accent, accentScale, ...helpers };
  }, [activeAccent]);

  return (
    <AccentContext.Provider value={value}>
      {children}
    </AccentContext.Provider>
  );
}

export function useAccent() {
  const ctx = useContext(AccentContext);
  if (!ctx) throw new Error('useAccent must be used inside AccentProvider');
  return ctx;
}
