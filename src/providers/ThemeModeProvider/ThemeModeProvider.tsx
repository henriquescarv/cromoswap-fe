import React, { createContext, useState, useEffect, useContext } from 'react';
import { Appearance } from 'react-native';
import lightTheme from '@/styles/themes/light';
import darkTheme from '@/styles/themes/dark';

interface ThemeContextProps {
  theme: typeof lightTheme;
  toggleTheme: () => void;
  getSystemTheme: () => 'light' | 'dark' | null | undefined;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: lightTheme,
  toggleTheme: () => { },
  getSystemTheme: () => undefined,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(Appearance.getColorScheme() === 'dark' ? darkTheme : lightTheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
    });

    return () => subscription.remove();
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  const getSystemTheme = () => {
    return Appearance.getColorScheme();
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, getSystemTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);