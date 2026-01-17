import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

interface ThemeState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    getEffectiveTheme: () => "light" | "dark";
}

const getSystemTheme = (): "light" | "dark" => {
    if (typeof window !== "undefined") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }
    return "dark";
};

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: "system",
            setTheme: (theme) => {
                set({ theme });
                applyTheme(theme);
            },
            getEffectiveTheme: () => {
                const { theme } = get();
                if (theme === "system") {
                    return getSystemTheme();
                }
                return theme;
            },
        }),
        {
            name: "theme-storage",
        }
    )
);

export const applyTheme = (theme: Theme) => {
    const effectiveTheme = theme === "system" ? getSystemTheme() : theme;
    document.documentElement.setAttribute("data-theme", effectiveTheme);
};

export const initializeTheme = () => {
    const stored = localStorage.getItem("theme-storage");
    if (stored) {
        try {
            const { state } = JSON.parse(stored);
            applyTheme(state.theme || "system");
        } catch {
            applyTheme("system");
        }
    } else {
        applyTheme("system");
    }

    // Listen for system theme changes
    window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", () => {
            const currentTheme = useThemeStore.getState().theme;
            if (currentTheme === "system") {
                applyTheme("system");
            }
        });
};
