"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    setIsNavigating(true);
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <motion.div
        className="hidden md:block fixed top-0 left-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#a855f7] to-[#2563eb] pointer-events-none z-50 opacity-60"
        animate={{
          x: mousePosition.x - 12, // Ajustar offset para centrar el cursor (w-6 / 2 = 3, pero usamos 12 para alineación visual)
          y: mousePosition.y - 12,
          scale: isClicking ? 0.4 : 0.7,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
      {isNavigating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center z-40 pointer-events-none"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              rotate: { duration: 1, repeat: 2, ease: "linear" },
            }}
            className="w-12 h-12 border-2 border-t-[#a855f7] border-r-[#2563eb] border-b-[#9333ea] border-l-transparent rounded-full"
          />
        </motion.div>
      )}
    </>
  );
}