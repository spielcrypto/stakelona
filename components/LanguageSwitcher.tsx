"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", name: "English" },
  { code: "kk", name: "Қазақша" },
  { code: "ru", name: "Русский" },
  { code: "es", name: "Español" },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(
    languages.find((lang) => lang.code === i18n.language) || languages[0]
  );

  useEffect(() => {
    const savedLang = localStorage.getItem("language");
    if (savedLang) {
      const lang = languages.find((l) => l.code === savedLang);
      if (lang) {
        setCurrentLang(lang);
        i18n.changeLanguage(savedLang);
      }
    }
  }, [i18n]);

  const changeLanguage = (langCode: string) => {
    const lang = languages.find((l) => l.code === langCode);
    if (lang) {
      setCurrentLang(lang);
      i18n.changeLanguage(langCode);
      localStorage.setItem("language", langCode);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white hover:bg-gray-100 border border-gray-200 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700">
          {currentLang.name}
        </span>
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 transition-colors ${
                  currentLang.code === lang.code ? "bg-primary-50" : ""
                }`}
              >
                <span className="text-sm font-medium text-gray-700">
                  {lang.name}
                </span>
                {currentLang.code === lang.code && (
                  <svg
                    className="w-4 h-4 text-primary-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
