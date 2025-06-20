"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function PageTransition({ children }) {
  const pathname = usePathname()

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="page-transition">
      {children}
    </div>
  )
}

// Versión con Framer Motion para páginas secundarias (comentada para uso opcional)
/*
import { motion } from "framer-motion"

export function AnimatedPageTransition({ children }) {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: "tween",
        duration: 0.3,
      }}
    >
      {children}
    </motion.div>
  )
}
*/
