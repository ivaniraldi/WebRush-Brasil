"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import translations from "@/translations"
import Link from "next/link"

export default function ContactCTA() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden transition-colors duration-300">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white/80 dark:bg-[#0f172a]/80 z-10"></div>
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#a855f7]/20 to-[#2563eb]/20 z-20"
          style={{
            backgroundImage: "url('/images/cta.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">{t.contactCTA.title}</h2>
          <p className="text-lg text-gray-300 mb-8">{t.contactCTA.description}</p>
          <Link
            href="/contato"
            className="px-8 py-3 rounded-md bg-gradient-to-r from-[#a855f7] to-[#2563eb] text-white font-medium hover:opacity-90 transition-opacity inline-flex items-center"
          >
            {t.contactCTA.button}
            <span className="material-icons ml-1">arrow_forward</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
