"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import Services from "@/components/Services";
import ContactCTA from "@/components/ContactCTA";
import PageTransition from "@/components/PageTransition";
import ParallaxHero from "@/components/ParallaxHero";

// Traducciones en español, inglés y portugués
const translations = {
  es: {
    services: {
      title: "Nuestros Servicios",
      description: "Soluciones integrales en desarrollo, marketing y control de calidad para llevar tu negocio al siguiente nivel.",
    },
    nav: {
      serviceSections: {
        development: "Desarrollo",
        marketing: "Marketing",
        qa: "Control de Calidad",
      },
    },
    development: {
      description: "Aplicaciones web y móviles personalizadas, escalables y optimizadas para un rendimiento excepcional.",
    },
    marketing: {
      heroDescription: "Estrategias de marketing digital que maximizan tu alcance y conectan con tu audiencia.",
    },
    qa: {
      description: "Pruebas rigurosas y procesos de calidad para garantizar productos sin errores y confiables.",
    },
    projects: {
      viewAll: "Explorar más",
    },
    contact: {
      ctaTitle: "¡Transforma tu visión en realidad!",
      ctaButton: "Contáctanos",
    },
  },
  en: {
    services: {
      title: "Our Services",
      description: "Comprehensive solutions in development, marketing, and quality assurance to elevate your business.",
    },
    nav: {
      serviceSections: {
        development: "Development",
        marketing: "Marketing",
        qa: "Quality Assurance",
      },
    },
    development: {
      description: "Custom, scalable, and high-performance web and mobile applications tailored to your needs.",
    },
    marketing: {
      heroDescription: "Digital marketing strategies that amplify your reach and engage your audience.",
    },
    qa: {
      description: "Rigorous testing and quality processes to ensure flawless and reliable products.",
    },
    projects: {
      viewAll: "Explore More",
    },
    contact: {
      ctaTitle: "Turn your vision into reality!",
      ctaButton: "Contact Us",
    },
  },
  pt: {
    services: {
      title: "Nossos Serviços",
      description: "Soluções completas em desenvolvimento, marketing e controle de qualidade para elevar seu negócio.",
    },
    nav: {
      serviceSections: {
        development: "Desenvolvimento",
        marketing: "Marketing",
        qa: "Controle de Qualidade",
      },
    },
    development: {
      description: "Aplicativos web e móveis personalizados, escaláveis e otimizados para alto desempenho.",
    },
    marketing: {
      heroDescription: "Estratégias de marketing digital que amplificam seu alcance e engajam seu público.",
    },
    qa: {
      description: "Testes rigorosos e processos de qualidade para garantir produtos confiáveis e sem erros.",
    },
    projects: {
      viewAll: "Explorar Mais",
    },
    contact: {
      ctaTitle: "Transforme sua visão em realidade!",
      ctaButton: "Entre em Contato",
    },
  },
};

export default function ServicesPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const serviceCategories = [
    {
      title: t.nav.serviceSections.development,
      description: t.development.description,
      icon: "code",
      link: `/servicios/desarrollo`,
      color: "from-[var(--primary)] to-[var(--secondary)]",
    },
    {
      title: t.nav.serviceSections.marketing,
      description: t.marketing.heroDescription,
      icon: "trending_up",
      link: `/servicios/marketing`,
      color: "from-[var(--secondary)] to-[var(--accent)]",
    },
    {
      title: t.nav.serviceSections.qa,
      description: t.qa.description,
      icon: "verified",
      link: `/servicios/quality-assurance`,
      color: "from-[var(--accent)] to-[var(--primary)]",
    },
  ];

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen">
        {/* Hero Section con Parallax */}
        <ParallaxHero
          title={t.services.title}
          subtitle={t.services.description}
          backgroundImage="./images/services_1.webp"
          height="70vh"
          className="text-center"
        >
        </ParallaxHero>

        {/* Sección de Servicios */}
        <section className="py-20 section-bg">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              {serviceCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="card-bg rounded-lg p-6 gradient-border shadow-lg card-hover"
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mb-6 shadow-md`}
                  >
                    <span className="material-icons text-white text-3xl">{category.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-heading text-white">{category.title}</h3>
                  <p className="text-gray-300 mb-6 font-body">{category.description}</p>
                  <Link
                    href={category.link}
                    className="nav-link inline-flex items-center text-[var(--primary)] hover:text-[var(--secondary)] font-body text-lg"
                  >
                    {t.projects.viewAll}
                    <span className="material-icons ml-2 text-sm">arrow_forward</span>
                  </Link>
                </motion.div>
              ))}
            </div>
            {/* <Services /> */}
          </div>
        </section>

        {/* CTA Section */}
        <ContactCTA
          title={t.contact.ctaTitle}
          buttonText={t.contact.ctaButton}
          buttonLink={`/${language}/contact`}
          className="py-16 gradient-bg text-center"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-heading text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.contact.ctaTitle}
          </motion.h2>

        </ContactCTA>
      </div>
    </PageTransition>
  );
}