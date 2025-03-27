/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../../contexts/GlobalContext";
import { Helmet } from "react-helmet";
import Steps from "../components/Steps";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import EnterpriseSolutionsSection from "../components/EnterpriseSolutionsSection";
import { FaChartLine, FaUsers, FaRocket, FaHandshake, FaSearch, FaAd, FaBullhorn, FaCode, FaMobileAlt, FaGlobe } from "react-icons/fa";

// Componente SEO mejorado para definir metadatos importantes
const SEO = () => (
  <Helmet>
    <title>
      WebRush Brasil - Agencia de Desenvolvimento Web e Marketing Digital
    </title>
    <meta
      name="description"
      content="Agencia especializada em desenvolvimento web e marketing digital. Soluções completas para impulsionar seu negócio online com sites modernos e estratégias digitais eficazes."
    />
    <meta
      name="keywords"
      content="desenvolvimento web, marketing digital, sites responsivos, SEO, publicidade digital, gestão de marketing, WebRush Brasil"
    />
    <meta name="robots" content="index,follow" />
    <link rel="canonical" href="https://www.webrushbrasil.com" />
    <meta
      property="og:title"
      content="WebRush Brasil - Agencia de Desenvolvimento Web e Marketing Digital"
    />
    <meta
      property="og:description"
      content="Agencia especializada em desenvolvimento web e marketing digital. Soluções completas para impulsionar seu negócio online."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.webrushbrasil.com" />
    <meta
      property="og:image"
      content="https://www.webrushbrasil.com/og-image.jpg"
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="WebRush Brasil - Agencia de Desenvolvimento Web e Marketing Digital" />
    <meta
      name="twitter:description"
      content="Agencia especializada em desenvolvimento web e marketing digital. Soluções completas para impulsionar seu negócio online."
    />
    <meta
      name="twitter:image"
      content="https://www.webrushbrasil.com/twitter-image.jpg"
    />
    <script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "WebRush Brasil",
          "url": "https://www.webrushbrasil.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.webrushbrasil.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      `}
    </script>
    <script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "WebRush Brasil",
          "url": "https://www.webrushbrasil.com",
          "logo": "https://www.webrushbrasil.com/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+55-11-99999-9999",
            "contactType": "customer service"
          },
          "sameAs": [
            "https://www.facebook.com/webrushbrasil",
            "https://www.instagram.com/webrushbrasil",
            "https://www.linkedin.com/company/webrushbrasil"
          ]
        }
      `}
    </script>
  </Helmet>
);

// Componente de botón principal
const PrimaryButton = ({ children, to, className = "" }) => (
  <Link
    to={to}
    className={`group relative bg-neon-green text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 overflow-hidden ${className}`}
  >
    <span className="relative z-10">{children}</span>
    <motion.div
      className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
      initial={{ scale: 0 }}
      whileHover={{ scale: 1 }}
    />
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      initial={{ x: "-100%" }}
      whileHover={{ x: 0 }}
    />
  </Link>
);

// Componente de botón secundario
const SecondaryButton = ({ children, to, className = "" }) => (
  <Link
    to={to}
    className={`group relative border-2 border-white hover:border-neon-green text-white hover:text-neon-green font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center text-lg overflow-hidden ${className}`}
  >
    <span className="relative z-10">{children}</span>
    <motion.div
      className="absolute inset-0 bg-neon-green opacity-0 group-hover:opacity-10 transition-opacity duration-300"
      initial={{ scale: 0 }}
      whileHover={{ scale: 1 }}
    />
  </Link>
);

// Sección Hero con animaciones mejoradas
const HeroSection = () => {
  const handleImageError = (e) => {
    e.target.src = "/fallback-hero.jpg";
  };

  return (
    <motion.section
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      aria-label="Hero Section"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/80 z-10"></div>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        >
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
            alt="Equipe de desenvolvimento web e marketing digital"
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        </motion.div>
      </div>
      <div className="container mx-auto px-4 sm:px-6 relative z-20 text-white">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
            TRANSFORMANDO <br className="hidden sm:block" />
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-neon-green relative inline-block">
              IDEIAS
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-neon-green"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1 }}
              />
            </span>{" "}
            <br className="hidden sm:block" />
            EM REALIDADE DIGITAL
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light mb-10 max-w-2xl">
            Desenvolvimento web e marketing digital que impulsionam seu negócio para o próximo nível.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/sites"
              className="group relative bg-neon-green text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 overflow-hidden"
              aria-label="Conheça nossos serviços de desenvolvimento web"
            >
              <span className="relative z-10">DESENVOLVIMENTO WEB</span>
              <motion.div
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
              />
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-2 relative z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                initial={{ x: 0 }}
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </motion.svg>
            </Link>
            <Link
              to="/marketing"
              className="group relative border-2 border-white hover:border-neon-green text-white hover:text-neon-green font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center text-lg overflow-hidden"
              aria-label="Conheça nossos serviços de marketing digital"
            >
              <span className="relative z-10">MARKETING DIGITAL</span>
              <motion.div
                className="absolute inset-0 bg-neon-green opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Sección de Serviços
const ServicesSection = () => {
  const services = [
    {
      icon: <FaCode className="w-12 h-12" />,
      title: "Desenvolvimento Web",
      description: "Sites modernos e responsivos que destacam sua marca e geram resultados.",
      link: "/sites"
    },
    {
      icon: <FaSearch className="w-12 h-12" />,
      title: "SEO e Tráfego Orgânico",
      description: "Aumente sua visibilidade nos mecanismos de busca e atraia visitantes qualificados.",
      link: "/marketing"
    },
    {
      icon: <FaAd className="w-12 h-12" />,
      title: "Publicidade Digital",
      description: "Campanhas estratégicas no Google Ads, Facebook Ads e Instagram Ads.",
      link: "/marketing"
    },
    {
      icon: <FaMobileAlt className="w-12 h-12" />,
      title: "Marketing Mobile",
      description: "Estratégias otimizadas para dispositivos móveis e redes sociais.",
      link: "/marketing"
    },
    {
      icon: <FaGlobe className="w-12 h-12" />,
      title: "Presença Digital",
      description: "Gestão completa da sua presença online e redes sociais.",
      link: "/marketing"
    },
    {
      icon: <FaChartLine className="w-12 h-12" />,
      title: "Analytics e Métricas",
      description: "Análise de dados e métricas para otimizar seus resultados.",
      link: "/marketing"
    }
  ];

  return (
    <motion.section
      className="py-28 bg-gray-800 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')] bg-cover bg-center opacity-5"></div>
      <div className="container mx-auto px-6 relative">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-5 py-2 bg-neon-green text-gray-900 text-sm font-bold mb-6 rounded-full">
            NOSSOS SERVIÇOS
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            SOLUÇÕES DIGITAIS COMPLETAS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-gray-800 hover:border-neon-green transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="text-neon-green mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
              <p className="text-gray-300 mb-6">{service.description}</p>
              <Link
                to={service.link}
                className="inline-flex items-center text-neon-green hover:text-neon-blue transition-colors duration-300"
              >
                Saiba mais
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

// Sección de Diferenciais
const DifferentialsSection = () => {
  const differentials = [
    {
      title: "Resultados Comprovados",
      description: "Nossa metodologia já ajudou centenas de empresas a alcançarem seus objetivos.",
      icon: <FaChartLine className="w-8 h-8" />
    },
    {
      title: "Equipo Especializado",
      description: "Profissionais certificados em desenvolvimento web e marketing digital.",
      icon: <FaUsers className="w-8 h-8" />
    },
    {
      title: "Soporte Dedicado",
      description: "Atendimento personalizado e suporte contínuo para seu sucesso.",
      icon: <FaRocket className="w-8 h-8" />
    }
  ];

  return (
    <motion.section
      className="py-28 bg-gray-900 relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')] bg-cover bg-center opacity-5"></div>
      <div className="container mx-auto px-6 relative">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-5 py-2 bg-neon-green text-gray-900 text-sm font-bold mb-6 rounded-full">
            DIFERENCIAIS
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            POR QUE ESCOLHER-NOS?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {differentials.map((differential, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center bg-gray-800/80 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-gray-700 hover:border-neon-green transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="text-neon-green mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                {differential.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{differential.title}</h3>
              <p className="text-gray-300">{differential.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <PrimaryButton to="/contato">
            AGENDE SUA CONSULTORIA GRATUITA
          </PrimaryButton>
        </motion.div>
      </div>
    </motion.section>
  );
};

// Componente principal Home
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <SEO />
      <HeroSection />
      <ServicesSection />
      <DifferentialsSection />
    </div>
  );
};

export default Home;