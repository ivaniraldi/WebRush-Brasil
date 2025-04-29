"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

// Translations for es, en, pt
const translations = {
  es: {
    cookieNotification: {
      title: "🍪 ¡Galletas Digitales!",
      description:
        "No, no son galletas de chocolate, pero usamos cookies digitales para hacer tu visita más sabrosa: mejorar el sitio, recordar tus preferencias y mostrar anuncios que te gusten. ¿Nos das un mordisco y aceptas, o prefieres elegir tus ingredientes?",
      accept: "¡Aceptar Todas!",
      customize: "Elegir Ingredientes",
      learnMore: "Saber Más",
      save: "Guardar Sabor",
      essential: "Cookies Esenciales (¡imprescindibles como la harina!)",
      performance: "Cookies de Rendimiento (para saber cómo navegas)",
      functionality: "Cookies de Funcionalidad (para recordar tus gustos)",
      advertising: "Cookies de Publicidad (para anuncios que te encanten)",
    },
  },
  en: {
    cookieNotification: {
      title: "🍪 Digital Cookies!",
      description:
        "Not the chocolate chip kind, but we use digital cookies to make your visit tastier: improve the site, remember your preferences, and show ads you’ll love. Ready to take a bite and accept, or want to pick your ingredients?",
      accept: "Accept All!",
      customize: "Pick Ingredients",
      learnMore: "Learn More",
      save: "Save Flavor",
      essential: "Essential Cookies (non-negotiable, like flour!)",
      performance: "Performance Cookies (to see how you navigate)",
      functionality: "Functionality Cookies (to remember your tastes)",
      advertising: "Advertising Cookies (for ads you’ll love)",
    },
  },
  pt: {
    cookieNotification: {
      title: "🍪 Cookies Digitais!",
      description:
        "Não são biscoitos de chocolate, mas usamos cookies digitais para tornar sua visita mais gostosa: melhorar o site, lembrar suas preferências e mostrar anúncios que você vai curtir. Quer dar uma mordida e aceitar, ou prefere escolher os ingredientes?",
      accept: "Aceitar Todos!",
      customize: "Escolher Ingredientes",
      learnMore: "Saber Mais",
      save: "Salvar Sabor",
      essential: "Cookies Essenciais (indispensáveis, como farinha!)",
      performance: "Cookies de Desempenho (para ver como você navega)",
      functionality: "Cookies de Funcionalidade (para lembrar seus gostos)",
      advertising: "Cookies de Publicidade (para anúncios que você vai amar)",
    },
  },
};

export default function CookieNotification() {
  const { language } = useLanguage();
  const t = translations[language] || translations.pt; // Fallback to Portuguese
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [preferences, setPreferences] = useState({
    performance: false,
    functionality: false,
    advertising: false,
  });

  // Check if user has already made a choice
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  // Handle accept all cookies
  const handleAcceptAll = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
    // Implement cookie setting logic here (e.g., enable all cookies)
  };

  // Handle save preferences
  const handleSavePreferences = () => {
    localStorage.setItem("cookieConsent", JSON.stringify(preferences));
    setIsVisible(false);
    // Implement cookie setting logic based on preferences
  };

  // Toggle preference checkboxes
  const togglePreference = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed bottom-4 left-4 right-4 sm:max-w-md mx-auto z-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="bg-[var(--background)]/90 backdrop-blur-md rounded-2xl p-6 border border-[var(--primary)]/20 shadow-xl">
        <div className="flex items-center mb-3">
          <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
            {t.cookieNotification.title}
          </h3>
        </div>
        <p className="text-gray-300 text-sm sm:text-base font-body mb-5">
          {t.cookieNotification.description}{" "}
          <Link href="/cookies-policy" className="nav-link text-[var(--primary)] hover:text-[var(--secondary)]">
            {t.cookieNotification.learnMore}
          </Link>
        </p>

        {showCustomize ? (
          <div className="mb-5 space-y-3">
            <div className="flex items-center">
              <input type="checkbox" checked disabled className="mr-2 h-4 w-4 text-[var(--primary)]" />
              <span className="text-gray-400 text-sm font-body">
                {t.cookieNotification.essential}
              </span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.performance}
                onChange={() => togglePreference("performance")}
                className="mr-2 h-4 w-4 text-[var(--primary)]"
              />
              <span className="text-gray-300 text-sm font-body">
                {t.cookieNotification.performance}
              </span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.functionality}
                onChange={() => togglePreference("functionality")}
                className="mr-2 h-4 w-4 text-[var(--primary)]"
              />
              <span className="text-gray-300 text-sm font-body">
                {t.cookieNotification.functionality}
              </span>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={preferences.advertising}
                onChange={() => togglePreference("advertising")}
                className="mr-2 h-4 w-4 text-[var(--primary)]"
              />
              <span className="text-gray-300 text-sm font-body">
                {t.cookieNotification.advertising}
              </span>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          {showCustomize ? (
            <button
              onClick={handleSavePreferences}
              className="nav-link bg-[var(--primary)] text-white font-bold py-2 px-5 rounded-full hover:bg-[var(--secondary)] transition-colors font-body"
            >
              {t.cookieNotification.save}
            </button>
          ) : (
            <>
              <button
                onClick={handleAcceptAll}
                className="nav-link bg-[var(--primary)] text-white font-bold py-2 px-5 rounded-full hover:bg-[var(--secondary)] transition-colors font-body"
              >
                {t.cookieNotification.accept}
              </button>
              <button
                onClick={() => setShowCustomize(true)}
                className="nav-link bg-gray-800 text-gray-200 font-bold py-2 px-5 rounded-full hover:bg-gray-700 transition-colors font-body"
              >
                {t.cookieNotification.customize}
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}