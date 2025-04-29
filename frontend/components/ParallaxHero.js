"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function ParallaxHero({
  backgroundImage,
  height = "100vh",
  title,
  subtitle,
  children,
  alignment = "center",
}) {
  const ref = useRef(null)
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollY, [0, 1000], [0, 300])
  const scale = useTransform(scrollY, [0, 1000], [1, 1.2])
  const textY = useTransform(scrollY, [0, 1000], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <div ref={ref} className={`relative overflow-hidden flex items-center justify-center parallax-container`} style={{ height }}>
      <motion.div className="absolute inset-0 w-full h-full" style={{ y, scale }}>
        {/* Imagen de fondo */}
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        {/* Capa violeta transparente */}
        <div className="absolute inset-0 bg-gray-900/60 z-20"></div>
      </motion.div>

      <div className="container mx-auto px-4 z-30 relative max-w-full overflow-hidden">
        <motion.div className={`max-w-4xl mx-auto text-${alignment}`} style={{ y: textY, opacity }}>
          {title && (
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-white font-heading"
            >
              {title}
            </motion.h1>
          )}

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-body"
            >
              {subtitle}
            </motion.p>
          )}

          {children}
        </motion.div>
      </div>
    </div>
  )
}