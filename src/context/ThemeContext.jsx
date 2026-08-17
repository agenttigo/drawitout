import React, { createContext, useContext, useState, useEffect } from 'react';
import { DarkLampEasterEgg } from '../components/Common/DarkLampEasterEgg';
import { LightSunriseEasterEgg } from '../components/Common/LightSunriseEasterEgg';
import { soundEngine } from '../utils/soundEngine';

const ThemeContext = createContext();

const THEME_STORAGE_KEY = 'drawitout_theme';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const [showLampAnimation, setShowLampAnimation] = useState(false);
  const [showSunriseAnimation, setShowSunriseAnimation] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch (_) {}

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'light') {
      // Switching to DARK -> trigger Lamp Easter Egg & sound!
      soundEngine.playLampSwitch();
      setShowSunriseAnimation(false);
      setShowLampAnimation(true);
      setTheme('dark');
    } else {
      // Switching to LIGHT -> trigger Sunrise Easter Egg & sound!
      soundEngine.playSunriseSound();
      setShowLampAnimation(false);
      setShowSunriseAnimation(true);
      setTheme('light');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme }}>
      {children}
      {showLampAnimation && (
        <DarkLampEasterEgg onComplete={() => setShowLampAnimation(false)} />
      )}
      {showSunriseAnimation && (
        <LightSunriseEasterEgg onComplete={() => setShowSunriseAnimation(false)} />
      )}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
