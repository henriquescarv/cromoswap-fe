import React, { createContext, useState, useEffect, useContext } from 'react';
import { Appearance } from 'react-native';
import lightTheme from '@/styles/themes/light';
import darkTheme from '@/styles/themes/dark';

interface ThemeContextProps {
    theme: typeof lightTheme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    theme: lightTheme,
    toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState(Appearance.getColorScheme() === 'light' ? darkTheme : lightTheme);

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setTheme(colorScheme === 'dark' ? darkTheme : lightTheme);
        });

        return () => subscription.remove();
    }, []);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);