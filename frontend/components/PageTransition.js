"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function PageTransition({ children }) {
  const pathname = usePathname()

  // Scroll to top on page change
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
