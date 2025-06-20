"use client"

import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { LanguageProvider } from "@/context/LanguageContext"
import { ThemeProvider } from "@/context/ThemeContext"
import CustomCursor from "@/components/CustomCursor"
import Preloader from "@/components/Preloader"
import { useEffect } from "react"
import { register } from "./registerSW"
import ChatIa from "@/components/ChatIa"
import CookieNotification from "@/components/CookieNotification"

export default function ClientLayout({ children }) {
  useEffect(() => {
    register();
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <Preloader />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <CustomCursor />
        <ChatIa />
        <CookieNotification />
      </ThemeProvider>
    </LanguageProvider>
  )
}
