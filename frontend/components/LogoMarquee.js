"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import translations from "@/translations"

export default function LogoMarquee() {
  const { language } = useLanguage()
  const t = translations[language]
  const [width, setWidth] = useState(0)

  useEffect(() => {
    setWidth(window.innerWidth)

    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Lista de logos con URLs reales (reemplaza con tus propias URLs si tienes assets locales)
  const logos = [
    { name: "Google", image: "https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png" },
    { name: "Microsoft", image: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "Amazon", image: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Apple", image: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Facebook", image: "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" },
    { name: "Netflix", image: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "Spotify", image: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" },
    { name: "Salesforce", image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg" },
  ]

  const allLogos = [...logos, ...logos]

  return (
    <section className="py-16 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-4 text-white font-heading">
            {t.logoMarquee?.title || "Trusted by Leading Brands"}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-body">
            {t.logoMarquee?.description || "Companies of all sizes trust WebRush Brasil for their digital needs."}
          </p>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex items-center whitespace-nowrap"
          animate={{
            x: [0, -width],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {allLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="mx-4 flex items-center justify-center flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
              style={{ width: 120 }}
            >
              <img
                src={logo.image}
                alt={`${logo.name} logo`}
                className="h-10 md:h-12 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg"
                }}
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}