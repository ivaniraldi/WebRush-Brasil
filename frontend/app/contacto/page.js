"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import ContactForm from "@/components/ContactForm";
import PageTransition from "@/components/PageTransition";
import ParallaxHero from "@/components/ParallaxHero";
import translations from "@/translations";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

// Iconos de redes sociales
const SOCIALS = [
  {
    href: "https://www.facebook.com/people/WebRush-Brasil/61574912904790/",
    icon: "fa-square-facebook",
    labelKey: "facebook",
  },
  {
    href: "https://www.instagram.com/webrush_br/",
    icon: "fa-instagram",
    labelKey: "instagram",
  },
  {
    href: "https://www.linkedin.com/company/webrush-brasil/",
    icon: "fa-linkedin",
    labelKey: "linkedin",
  },
  {
    href: "https://x.com/WebRushBrasil",
    icon: "fa-square-x-twitter",
    labelKey: "twitter",
  },
];

// Traducciones manuales para la tarjeta de información
const CONTACT_INFO_TRANSLATIONS = {
  pt: {
    infoTitle: "Entre em Contato",
    addressTitle: "Endereço",
    emailTitle: "E-mail",
    phoneTitle: "Telefone",
    hoursTitle: "Horário",
    hours: "Seg-Sex, 9h às 18h",
    followUs: "Siga-nos",
  },
  es: {
    infoTitle: "Contáctanos",
    addressTitle: "Dirección",
    emailTitle: "Correo",
    phoneTitle: "Teléfono",
    hoursTitle: "Horario",
    hours: "Lun-Vie, 9h a 18h",
    followUs: "Síguenos",
  },
  en: {
    infoTitle: "Get in Touch",
    addressTitle: "Address",
    emailTitle: "Email",
    phoneTitle: "Phone",
    hoursTitle: "Hours",
    hours: "Mon-Fri, 9 AM to 6 PM",
    followUs: "Follow Us",
  },
};

export default function ContactPage() {
  const { language } = useLanguage();
  const t = translations[language]?.contact || {};
  const contactInfo = CONTACT_INFO_TRANSLATIONS[language] || CONTACT_INFO_TRANSLATIONS.pt;

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen bg-gray-950">
        <ParallaxHero
          title={t.title}
          subtitle={t.description}
          backgroundImage="/images/contacto_1.webp"
          height="70vh" // Responsive height
          overlayOpacity={0.5}
        />

        <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-gray-950 to-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-full sm:max-w-3xl lg:max-w-5xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
                {/* Card de Información */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="relative overflow-hidden bg-gray-900/80 backdrop-blur-lg p-6 sm:p-8 md:p-12 lg:p-16 rounded-3xl shadow-2xl border border-gray-700/50"
                >
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-white font-heading tracking-tight text-center bg-gradient-to-r from-[#a855f7] to-[#2563eb] bg-clip-text text-transparent">
                    {contactInfo.infoTitle}
                  </h2>

                  <div className="space-y-4 sm:space-y-6 relative z-10">
                    <ContactItem
                      icon={MapPin}
                      title={contactInfo.addressTitle}
                      value="Santa Catarina, Brasil"
                      ariaLabel="Endereço da WebRush Brasil"
                    />
                    <Divider />
                    <ContactItem
                      icon={Mail}
                      title={contactInfo.emailTitle}
                      value="contato@webrushbrasil.com.br"
                      ariaLabel="E-mail de contato da WebRush Brasil"
                    />
                    <Divider />
                    <ContactItem
                      icon={Phone}
                      title={contactInfo.phoneTitle}
                      value="+55 (48) 9205-8069"
                      ariaLabel="Telefone de contato da WebRush Brasil"
                    />
                    <Divider />
                    <ContactItem
                      icon={Clock}
                      title={contactInfo.hoursTitle}
                      value={contactInfo.hours}
                      ariaLabel="Horário de atendimento da WebRush Brasil"
                    />
                  </div>

                  {/* Redes Sociales */}
                  <div className="mt-8 sm:mt-12 bg-gray-950/20 py-4 sm:py-5 border border-gray-700 rounded-xl relative z-10">
                    <h3 className="text-lg sm:text-xl text-center font-bold mb-4 text-white font-heading">
                      {contactInfo.followUs}
                    </h3>
                    <div className="flex justify-center gap-4 sm:gap-6">
                      {SOCIALS.map(({ href, icon, labelKey }) => (
                        <SocialIcon
                          key={href}
                          href={href}
                          icon={icon}
                          label={t[labelKey]}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Formulario de Contacto */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-700/50"
                >
                  <ContactForm />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

/* Componentes Auxiliares */

function ContactItem({ icon: Icon, title, value, ariaLabel }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 group" aria-label={ariaLabel}>
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 group-hover:text-purple-500 transition-colors" />
      <div>
        <p className="text-white font-semibold text-xs sm:text-sm">{title}</p>
        <p className="text-gray-300 text-xs sm:text-sm">{value}</p>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-gray-600/20" />;
}

function SocialIcon({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="text-white hover:text-purple-400 transition-colors text-xl sm:text-2xl"
    >
      <i className={`fa-brands ${icon}`} aria-hidden="true"></i>
    </a>
  );
}