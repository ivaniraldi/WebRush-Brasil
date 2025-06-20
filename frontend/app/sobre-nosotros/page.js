"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/translations";
import ContactCTA from "@/components/ContactCTA";
import PageTransition from "@/components/PageTransition";
import ParallaxHero from "@/components/ParallaxHero";

export default function SobreNosotrosPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        <ParallaxHero
          title={t.aboutUs.title}
          subtitle={t.aboutUs.description}
          backgroundImage="/images/about_1.webp"
          height="70vh"
        />

        <section className="py-16 bg-[#0f172a]">
          <div className="container mx-auto px-4">
            <section className="py-16 bg-[#0f172a]">
              <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-20 items-center">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#a855f7]/10 to-[#2563eb]/10 rounded-xl -z-10" />
                    <img
                      src="/images/about_2.webp"
                      alt="Oficina de WebRush Brasil en Santa Catarina"
                      width={1024}
                      height={656}
                      className="rounded-xl shadow-lg w-full h-auto object-cover"
                      loading="lazy"
                      quality={85}
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                    className="space-y-10"
                  >
                    <div className="bg-gray-900 p-6 rounded-xl shadow-md">
                      <h2 className="relative text-2xl md:text-3xl font-bold mb-4 text-white font-heading">
                        {t.aboutUs.mission}
                        <span className="absolute bottom-0 left-0 w-40 md:w-60 h-1 bg-gradient-to-r from-[#a855f7] to-[#2563eb] rounded-full transition-all duration-300 group-hover:w-24" />
                      </h2>
                      <p className="text-gray-300 font-body leading-relaxed">
                        {t.aboutUs.missionText}
                      </p>
                    </div>
                    <div className="bg-gray-900 p-6 rounded-xl shadow-md">
                      <h2 className="relative text-2xl md:text-3xl font-bold mb-4 text-white font-heading">
                        {t.aboutUs.vision}
                        <span className="absolute bottom-0 left-0 w-40 md:w-60 h-1 bg-gradient-to-r from-[#a855f7] to-[#2563eb] rounded-full transition-all duration-300 group-hover:w-24" />
                      </h2>
                      <p className="text-gray-300 font-body leading-relaxed">
                        {t.aboutUs.visionText}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Sección de Valores */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
                  className="mb-20"
                >
                  <h2 className="relative text-3xl md:text-4xl font-bold mb-12 text-center text-white font-heading">
                    <span className="relative z-[1010]">{t.aboutUs.values}</span>
                    <span className="absolute bottom-[-0.16rem] left-1/2 -translate-x-1/2 w-32 md:w-64 h-1 bg-gradient-to-r from-[#a855f7] to-[#2563eb] rounded-full transition-all duration-300 group-hover:w-24" />
                  </h2>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    {t.aboutUs.valuesList.map((value, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.8 + index * 0.1,
                          ease: "easeOut",
                        }}
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2 },
                        }}
                        className="group bg-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                      >
                        <h3 className="relative text-xl font-bold mb-4 text-white font-heading">
                          {value.title}
                          <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-[#a855f7] to-[#2563eb] rounded-full transition-all duration-300 group-hover:w-32" />
                        </h3>
                        <p className="text-gray-300 font-body leading-relaxed">
                          {value.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>
          </div>
        </section>

        <ContactCTA />
      </div>
    </PageTransition>
  );
}
