"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/translations";
import ContactCTA from "@/components/ContactCTA";
import Link from "next/link";
import PageTransition from "@/components/PageTransition";
import ParallaxHero from "@/components/ParallaxHero";
import ProcessSection from "@/components/ProcessSection";
import TechnologiesSection from "@/components/TechnologiesSection";
import { useRef } from "react";
import PortfolioCarousel from "@/components/PortfolioCarousel";

export default function DesarrolloPage() {
  const { language } = useLanguage();
  const t = translations[language] || translations.pt; // Fallback to Portuguese
  const cardRef = useRef(null);

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
    }),
    hover: { scale: 1.03, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" },
  };

  // Animation variants for tech tags
  const techVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, delay: 1.3 + i * 0.05, ease: "easeOut" },
    }),
    hover: { scale: 1.1, backgroundColor: "#1e293b", color: "#ffffff" },
  };

  const changeIcon = (iconName) => {
    switch (iconName) {
      case "code":
        return <span className="material-icons text-white text-xl">web</span>;

      case "phone_iphone":
        return (
          <span className="material-icons text-white text-xl">
            phone_iphone
          </span>
        );
      case "monitor":
        return <span className="material-icons text-white text-xl">code</span>;
      default:
        return <span className="material-icons text-white text-xl">star</span>;
    }
  };

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen bg-gray-950">
        {/* ParallaxHero - Unchanged */}
        <ParallaxHero
          title={t.development.title}
          subtitle={t.development.description}
          backgroundImage="/images/software_1.webp"
          height="70vh"
          overlayOpacity={0.5}
        />

        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-950 to-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Services Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-16 sm:mb-20"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
                {t.development.services.map((service, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    ref={cardRef}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="relative card-bg rounded-lg p-6 sm:p-7 gradient-border shadow-lg card-hover overflow-hidden group"
                    role="article"
                    aria-labelledby={`service-title-${index}`}
                  >
                    {/* Fondo decorativo dinámico */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--primary)]/15 to-[var(--secondary)]/5 opacity-70 transition-opacity duration-300 group-hover:opacity-0" />

                    {/* Ícono superior */}
                    <div className="flex justify-center mb-5">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center shadow-md">
                        {changeIcon(service.icon)}
                      </div>
                    </div>

                    <h3
                      id={`service-title-${index}`}
                      className="relative text-xl sm:text-2xl font-bold mb-3 text-white font-heading text-center z-10"
                    >
                      <span className="nav-link gradient-text">
                        {service.title}
                      </span>
                    </h3>
                    <p className="relative text-gray-300 text-sm sm:text-base mb-5 font-body text-center z-10">
                      {service.description}
                    </p>

                    {/* Divisor estilizado */}
                    <div className="w-16 h-1 mx-auto bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-full mb-5 z-10" />

                    <div className="space-y-3">
                      {service.features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center group/feature"
                        >
                          <span className="material-icons text-[var(--accent)] mr-2 text-base transition-transform duration-300 group-hover/feature:translate-x-1">
                            arrow_forward
                          </span>
                          <span className="text-gray-200 text-sm sm:text-base font-body">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Decoración lateral */}
                    <div className="absolute left-0 top-1/4 w-2 h-1/3 bg-[var(--accent)]/30 rounded-r-md transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Portfolio Section */}
            <PortfolioCarousel />

            {/* Process Section - Replaced with ProcessSection */}
            <ProcessSection translations={t.development.process} />

            {/* Technologies Section */}
            {/* <TechnologiesSection translations={t.development.technologies} /> */}
          </div>
        </section>

        {/* ContactCTA - Unchanged */}
        <ContactCTA />
      </div>
    </PageTransition>
  );
}
