"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";

export default function ProcessSection({ translations }) {
  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
    hover: { scale: 1.05, boxShadow: "0 15px 25px rgba(0, 0, 0, 0.3)" },
  };

  const mediaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    controls.start(isInView ? "visible" : "visible");
  }, [isInView, controls]);

  return (
    <section ref={sectionRef} className=" ">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
        }}
        className="text-4xl font-bold text-center gradient-text font-heading mb-12"
      >
        {translations.title}
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"
      >
        {translations.steps.map((step, i) => (
          <motion.article
            key={i}
            custom={i}
            variants={stepVariants}
            whileHover="hover"
            className={`relative card-bg rounded-2xl p-6 flex flex-col items-center text-center gradient-border shadow-lg card-hover ${
              i === 6 ? "lg:col-start-2 lg:col-end-3" : ""
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center mb-4 shadow-md">
              <span className="text-white text-xl font-bold">{i + 1}</span>
            </div>
            <div className="flex text-center justify-center gap-3 items-center">
              {step.material_icon && (
               <h3><i className="material-icons text-[var(--primary)] text-sm font-bold">{step.material_icon}</i></h3>
              )}
              <h3 className="text-md md:text-xl font-semibold text-white mb-2 font-heading">{step.title}</h3>
            </div>
            <p className="text-gray-300 mb-4 font-body">{step.description}</p>

            {/* Imagen */}
            {!step.imageUrl && (
              <motion.img
                src={step.imageUrl}
                alt={`Ejemplo paso ${i + 1}`}
                variants={mediaVariants}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
            )}

            {/* Divider */}
            <div className="w-full border border-gray-800 bg-gray-700/50 rounded-lg mb-4"></div>

            {/* Texto adicional */}
            {step.example && (
              <motion.p variants={mediaVariants} className="text-gray-400 text-xs italic font-body">
                {step.example}
              </motion.p>
            )}
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}