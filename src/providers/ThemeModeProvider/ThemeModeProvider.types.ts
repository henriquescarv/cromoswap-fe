import { ReactNode } from "react";
import light from "@/styles/themes/light";

export type ThemeModeContextProps = {
  theme: typeof light;
	setTheme: (theme: 'light' | 'dark') => void;
};

export type ThemeModeProviderProps = {
  children: ReactNode;
};
