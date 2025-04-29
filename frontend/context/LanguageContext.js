"use client"

import { createContext, useContext, useState, useEffect } from "react"
import translations from "@/translations"

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("pt")

  // Check if browser language is available and set it on first load
  useEffect(() => {
    const browserLang = navigator.language.split("-")[0]
    if (["pt", "es", "en"].includes(browserLang)) {
      setLanguage(browserLang)
    }
   
  }, [])
  let t = translations[language]
  useEffect(() => {
    document.title = `${t.meta.title}`
 }, [t])

  return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>
}



export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
