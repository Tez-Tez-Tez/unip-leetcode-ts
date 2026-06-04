import { createContext, useState, useEffect, type ReactNode } from "react";

const STORAGE_KEY = "quizTheme";

interface ThemeContextValue {
  isDark: boolean;
  toggle: () => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  isDark: true,
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = stored !== null ? stored === "true" : prefersDark;
    setIsDark(shouldBeDark);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isDark));
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggle = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
