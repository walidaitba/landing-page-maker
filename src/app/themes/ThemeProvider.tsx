'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { themeStyles, ThemeStyles } from './styles';

type ThemeContextType = {
  currentTheme: string;
  themeStyles: ThemeStyles;
  setTheme: (themeId: string) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState('modern-business');

  useEffect(() => {
    const root = document.documentElement;
    const styles = themeStyles[currentTheme];

    // Apply colors
    Object.entries(styles.colors.primary).forEach(([shade, value]) => {
      root.style.setProperty(`--primary-${shade}`, value);
    });

    Object.entries(styles.colors.secondary).forEach(([shade, value]) => {
      root.style.setProperty(`--secondary-${shade}`, value);
    });

    // Apply fonts
    root.style.setProperty('--font-heading', styles.fonts.heading);
    root.style.setProperty('--font-body', styles.fonts.body);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themeStyles: themeStyles[currentTheme],
        setTheme: setCurrentTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}