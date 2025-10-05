import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import kk from "./locales/kk.json";
import ru from "./locales/ru.json";
import es from "./locales/es.json";

const resources = {
  en: { translation: en },
  kk: { translation: kk },
  ru: { translation: ru },
  es: { translation: es },
};

// Supported languages
const supportedLanguages = ["en", "kk", "ru", "es"];

// Detect browser language
const getBrowserLanguage = (): string => {
  if (typeof window === "undefined") return "en";

  // Check localStorage first
  const savedLanguage = localStorage.getItem("language");
  if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
    return savedLanguage;
  }

  // Detect browser language
  const browserLang = navigator.language.toLowerCase();

  console.log("browserLang", browserLang);

  // Check exact match (e.g., "en", "es", "ru")
  if (supportedLanguages.includes(browserLang)) {
    return browserLang;
  }

  // Check language code only (e.g., "en-US" -> "en")
  const langCode = browserLang.split("-")[0];
  if (supportedLanguages.includes(langCode)) {
    return langCode;
  }

  // Default to English
  return "en";
};

i18n.use(initReactI18next).init({
  resources,
  lng: getBrowserLanguage(),
  fallbackLng: "en",
  supportedLngs: supportedLanguages,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
