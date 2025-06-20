"use client";

import ParallaxHero from "@/components/ParallaxHero";
import Services from "@/components/Services";
import Differentials from "@/components/Differentials";
import ContactCTA from "@/components/ContactCTA";
import TextMarquee from "@/components/TextMarquee";
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/translations";
import Link from "next/link";

export default function Home() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Hero Section */}
      <ParallaxHero
        backgroundImage="/images/hero.avif"
        height="100vh"
      >
        <h1 className="text-xl md:text-6xl font-bold mb-4 md:mb-6 text-white font-heading md:mt-0 animate-fade-in">
          <span className="block text-2xl">{t.hero.transformamos}</span>
          <span className="block text-3xl font-extrabold md:text-7xl gradient-text my-1 md:my-2">
            {t.hero.cliques}
          </span>
          <span className="block text-3xl">{t.hero.emConexoes}</span>
        </h1>

        <p className="text-xs md:text-xl text-gray-200 mb-6 md:mb-8 max-w-2xl mx-auto font-body animate-fade-in-delay-1">
          {t.hero.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-delay-2">
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
        </div>
      </ParallaxHero>

      {/* Services Section */}
      <section className="relative container mx-auto px-4 py-16 md:py-20 bg-[#0f172a]">
        <div className="text-center mb-12">
          <h2 className="text-4xl py-1 md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
            {t.services.title}
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-400 max-w-xl mx-auto font-body">
            {t.services.description}
          </p>
        </div>

        <Services t={t} />
      </section>

      {/* Text Marquee */}
      <TextMarquee />

      {/* Differentials Section */}
      <Differentials />

      {/* Contact CTA */}
      <ContactCTA />
    </div>
  );
}
