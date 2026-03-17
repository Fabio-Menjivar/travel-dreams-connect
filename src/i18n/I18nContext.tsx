import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import en from "./en.json";
import es from "./es.json";

type Language = "en" | "es";

type TranslationResources = typeof en;

type I18nContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const STORAGE_KEY = "app_language";

const resources: Record<Language, TranslationResources> = {
  en,
  es,
};

const isBrowser = typeof window !== "undefined";

const detectInitialLanguage = (): Language => {
  if (!isBrowser) return "en";

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "es") {
      return stored;
    }
  } catch {
    // ignore storage errors
  }

  const navLang =
    (navigator.languages && navigator.languages[0]) ||
    navigator.language ||
    (navigator as any).userLanguage ||
    "en";

  if (navLang.toLowerCase().startsWith("es")) {
    return "es";
  }

  return "en";
};

const getNestedValue = (obj: unknown, path: string[]): unknown => {
  return path.reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => detectInitialLanguage());

  useEffect(() => {
    if (!isBrowser) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore storage errors
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = useMemo(() => {
    return (key: string): string => {
      const path = key.split(".");

      const langValue = getNestedValue(resources[language], path);
      if (typeof langValue === "string") {
        return langValue;
      }

      const fallbackValue = getNestedValue(resources.en, path);
      if (typeof fallbackValue === "string") {
        return fallbackValue;
      }

      return key;
    };
  }, [language]);

  const value: I18nContextValue = {
    language,
    setLanguage,
    t,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
};

