"use client";

import { motion } from "framer-motion";
import ParallaxHero from "@/components/ParallaxHero";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Differentials from "@/components/Differentials";
import ContactCTA from "@/components/ContactCTA";
import VideoSection from "@/components/VideoSection";
import LogoMarquee from "@/components/LogoMarquee";
import TextMarquee from "@/components/TextMarquee";
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/translations";
import PageTransition from "@/components/PageTransition";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];



  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen relative">
        <ParallaxHero
          backgroundImage="/images/hero.avif"
          height="100vh"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl md:text-6xl font-bold mb-4 md:mb-6 text-white font-heading md:mt-0"
          >
            <span className="block text-2xl">{t.hero.transformamos}</span>
            <span className="block text-3xl font-extrabold md:text-7xl gradient-text my-1 md:my-2">
              {t.hero.cliques}
            </span>
            <span className="block text 3xl">{t.hero.emConexoes}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs md:text-xl text-gray-200 mb-6 md:mb-8 max-w-2xl mx-auto font-body"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contacto"
              className="px-8 py-3 rounded-md bg-gradient-to-r from-[#a855f7] to-[#2563eb] text-white font-medium hover:opacity-90 transition-opacity font-body"
            >
              {t.hero.ctaButton}
            </Link>
            <Link
              href="/servicios"
              className="px-8 py-3 rounded-md bg-transparent border border-white text-white font-medium hover:bg-white/10 transition-colors font-body"
            >
              {t.hero.secondaryButton}
            </Link>
          </motion.div>
        </ParallaxHero>
        <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    className="relative container mx-auto px-4 py-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl py-1 md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
          {t.services.title}
        </h2>
        <p className="mt-3 text-base md:text-lg text-gray-400 max-w-xl mx-auto font-body">
          {t.services.description}
        </p>
      </motion.div>

      <Services t={t} />
    </motion.div>

        {/* <LogoMarquee /> */}
        <TextMarquee />

        {/* <VideoSection /> */}

        <Differentials />

        {/* <Projects /> */}

        <ContactCTA />
      </div>
    </PageTransition>
  );
}
