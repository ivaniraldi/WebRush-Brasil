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

  const team = [
    {
      name: "Ivan Iraldi",
      position: "CTO",
      bio: "Especialista en desarrollo de software y arquitectura de sistemas.",
      image:
        "https://cdn.vectorstock.com/i/500p/97/68/account-avatar-dark-mode-glyph-ui-icon-vector-44429768.jpg",
      linkedin: "https://www.linkedin.com/in/ivan-iraldi-8413a3213/",
    },
    {
      name: "Lucas Santos",
      position: "Diretor de Marketing",
      bio: "Estratega de marketing digital con experiencia en grandes marcas.",
      image:
        "https://cdn.vectorstock.com/i/500p/97/68/account-avatar-dark-mode-glyph-ui-icon-vector-44429768.jpg",
      linkedin: "https://www.linkedin.com/in/pablo-daniel-vallejos/",
    },
    {
      name: "Pablo Vallejos",
      position: "Diretor de Qualidade",
      bio: "Experta en aseguramiento de calidad y metodologías ágiles.",
      image:
        "https://cdn.vectorstock.com/i/500p/97/68/account-avatar-dark-mode-glyph-ui-icon-vector-44429768.jpg",
      linkedin: "https://www.linkedin.com/in/pablo-daniel-vallejos/",
    },
  ];

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
              </div>
            </section>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-20 px-4"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white font-heading">
                {t.aboutUs.values}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {t.aboutUs.valuesList.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + index * 0.15,
                      ease: "easeOut",
                    }}
                    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                    className="relative bg-gray-900 p-6 rounded-xl shadow-gray-800 hover:shadow-xl transition-shadow duration-300 border border-gray-700"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#a855f7] to-[#2563eb] rounded-t-xl" />
                    <h3 className="text-xl font-bold mb-3 text-white font-heading">
                      {value.title}
                    </h3>
                    <p className="text-gray-300 font-body leading-relaxed">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <section className="py-16 bg-[#0f172a]">
              <div className="container mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                >
                  <h2 className="relative text-3xl md:text-4xl font-bold mb-8 text-center text-white font-heading">
                    <span className="relative z-[1010]">{t.aboutUs.team}</span>
                    <span className="absolute bottom-[-0.16rem] left-1/2 -translate-x-1/2 w-32 md:w-64 h-1 bg-gradient-to-r from-[#a855f7] to-[#2563eb] rounded-full transition-all duration-300 group-hover:w-24 " />
                  </h2>
                  <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-12 font-body leading-relaxed">
                    {t.aboutUs.teamDescription}
                  </p>

                  <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8">
                    {team.map((member, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.3 + index * 0.15,
                          ease: "easeOut",
                        }}
                        whileHover={{
                          scale: 1.03,
                          transition: { duration: 0.2 },
                        }}
                        className="group bg-gray-900 rounded-xl shadow-slate-950 hover:shadow-xl transition-shadow duration-300 overflow-hidden text-center"
                      >
                        <div className="relative h-64 overflow-hidden">
                          <img
                            src={member.image || "/placeholder.svg"}
                            alt={`Foto de ${member.name}, ${member.position} en WebRush Brasil`}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            loading="lazy"
                            quality={85}
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="relative text-xl font-bold mb-1 text-white font-heading">
                            {member.name}
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-[#a855f7] to-[#2563eb] rounded-full transition-all duration-300 group-hover:w-32" />
                          </h3>
                          <p className="text-[#a855f7] font-medium mb-3 font-body">
                            {member.position}
                          </p>
                          <p className="text-gray-300 font-body leading-relaxed">
                            {member.bio}
                          </p>
                          <div className="flex justify-center mt-4">
                            <a
                              href={member.linkedin}
                              className="text-[#a855f7] hover:text-[#2563eb] transition-colors duration-300"
                              aria-label={`Perfil de LinkedIn de ${member.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i
                                className="fa-brands fa-linkedin text-2xl hover:scale-110 transition-transform duration-300"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </div>
                        </div>
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
