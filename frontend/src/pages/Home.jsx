"use client";

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

// Componente SEO mejorado para definir metadatos importantes
const SEO = () => (
  <Helmet>
    <title>
      WebRush Brasil - Sites Profissionais que Transformam Seu Negócio
    </title>
    <meta
      name="description"
      content="Desenvolvimento de sites profissionais e responsivos para impulsionar seu negócio com designs exclusivos e preços acessíveis. Transforme sua presença online com WebRush Brasil."
    />
    <meta
      name="keywords"
      content="desenvolvimento web Brasil, sites profissionais, design responsivo, presença online, WebRush Brasil, landing page, e-commerce, site institucional"
    />
    <meta name="robots" content="index,follow" />
    <link rel="canonical" href="https://www.webrushbrasil.com" />
    <meta
      property="og:title"
      content="WebRush Brasil - Sites Profissionais que Transformam Seu Negócio"
    />
    <meta
      property="og:description"
      content="Desenvolvimento de sites profissionais para impulsionar seu negócio com designs exclusivos e preços acessíveis."
    />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.webrushbrasil.com" />
    <meta
      property="og:image"
      content="https://www.webrushbrasil.com/og-image.jpg"
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="WebRush Brasil - Sites Profissionais" />
    <meta
      name="twitter:description"
      content="Desenvolvimento de sites profissionais para impulsionar seu negócio."
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

// Función para obtener color basado en el precio con efectos mejorados
const getColorByPrice = (price) => {
  if (price < 501) {
    // Rango bajo: Diseño limpio y minimalista
    return "bg-gray-100 border border-gray-300 rounded-lg shadow-md bg-[url('https://cdn.prod.website-files.com/6009ec8cda7f305645c9d91b/66b15d55d210567b7585bd04_649a197d1b4c732138e85bcc_adrienn-white-branding.png')] hover:shadow-lg bg-cover transition-all duration-300 hover:bg-gray-50";
  } else if (price < 1000) {
    // Rango medio: Diseño moderno con algo de sofisticación
    return "bg-white border border-blue-200 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-blue-50 bg-[url('https://designs.raleighswebsitedesign.com/wp-content/uploads/2023/02/25100515/JBR_Hero-1024x576.jpg')] bg-repeat";
  } else {
    // Rango alto: Diseño premium y elegante
    return "bg-gray-800 text-white border border-gray-700 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-gray-900 bg-[url('https://www.bigcommerce.com/_next/image/?url=https%3A%2F%2Fs3.amazonaws.com%2Fintegrated-apps%2Fsfeqymbn%2Flqvyisao.png&w=3840&q=75')] bg-cover";
  }
};

// Componente de Badge para características de servicios
const FeatureBadge = ({ text }) => (
  <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full mr-2 mb-2">
    {text}
  </span>
);

// Sección Hero con animaciones mejoradas
const HeroSection = () => {
  const handleImageError = (e) => {
    e.target.src = "/fallback-hero.jpg"; // Imagen local como respaldo
  };

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      aria-label="Hero Section"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-600/80 z-10"></div>
        <img
          src="https://blog.ebaconline.com.br/blog/wp-content/uploads/2022/12/ydkqgjmgimm9ccvzcx6qe-e1671162777987.png"
          alt="Equipe de desenvolvimento web trabalhando"
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 relative z-20 text-white">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
            SITES QUE <br className="hidden sm:block" />
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-yellow-400 relative inline-block">
              TRANSFORMAM
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-yellow-400"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1 }}
              />
            </span>{" "}
            <br className="hidden sm:block" />
            SEU NEGÓCIO
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light mb-10 max-w-2xl">
            Seu site dos sonhos por um preço acessível. Designs exclusivos que
            capturam a essência da sua marca e convertem visitantes em clientes.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center mb-14">
            <Link
              to="/contato"
              className="group bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              aria-label="Fale comigo agora"
            >
              FALE COMIGO AGORA
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-2"
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
              to="/portfolio"
              className="border-2 border-white hover:border-yellow-400 text-white hover:text-yellow-400 font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center text-lg"
              aria-label="Ver portfólio"
            >
              VER PORTFOLIO
            </Link>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{
          repeat: Number.POSITIVE_INFINITY,
          duration: 1.8,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-yellow-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </motion.section>
  );
};

// Sección "Onde Paixão Encontra Propósito"
const PassionPurposeSection = () => {
  const handleImageError = (e) => {
    e.target.src = "/fallback-team.jpg"; // Imagen local como respaldo
  };

  return (
    <motion.section
      className="py-28 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      aria-label="Onde Paixão Encontra Propósito"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight text-gray-900">
                ONDE PAIXÃO <br />
                <span className="text-green-600 relative inline-block">
                  ENCONTRA PROPÓSITO
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-green-600"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                </span>
              </h2>
              <p className="text-xl text-gray-700 mb-10 max-w-xl leading-relaxed">
                Criamos sites que não apenas parecem incríveis, mas também
                impulsionam resultados reais para o seu negócio. Nossa abordagem
                combina design inovador com estratégias eficazes para maximizar
                seu retorno.
              </p>
              <div className="flex items-center">
                <Link
                  to="/portfolio"
                  className="group bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1 flex items-center"
                  aria-label="Conheça nossos trabalhos"
                >
                  CONHEÇA NOSSOS TRABALHOS
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
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
              </div>
            </motion.div>
          </div>
          <div className="md:w-1/2">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute -top-6 -left-6 w-28 h-28 bg-yellow-500 rounded-lg"></div>
              <LazyLoadImage
                src="https://www.moneytimes.com.br/uploads/2022/01/img-2-techracism.jpg"
                alt="Equipe trabalhando em projetos web"
                className="w-full h-auto relative z-10 shadow-xl rounded-lg"
                effect="blur"
                onError={handleImageError}
              />
              <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-green-700 rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

// Sección "Por que você precisa de um site"
const WhySiteSection = ({ staggerContainer, fadeIn }) => (
  <motion.section
    className="py-28 bg-gray-900 text-white"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    aria-label="Por que você precisa de um site"
  >
    <div className="container mx-auto px-6">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-5 py-2 bg-yellow-500 text-gray-900 text-sm font-bold mb-6 rounded-full">
          DIFERENCIAIS
        </span>
        <h2 className="text-4xl md:text-5xl font-black">
          POR QUE VOCÊ PRECISA DE UM SITE?
        </h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.div
          className="bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-xl shadow-xl border-b-4 border-green-500 group hover:translate-y-[-10px] transition-all duration-300 h-full"
          variants={fadeIn}
        >
          <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">
            Visibilidade Global
          </h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Estar online significa que você pode ser encontrado por qualquer
            pessoa, em qualquer lugar do mundo, a qualquer momento. Amplie seu
            alcance além das fronteiras físicas.
          </p>
          <ul className="space-y-3 text-gray-200">
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-400 mr-3 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Presença 24/7 na internet</span>
            </li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-400 mr-3 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Alcance global de clientes</span>
            </li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-400 mr-3 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Maior exposição da marca</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-xl shadow-xl border-b-4 border-green-500 group hover:translate-y-[-10px] transition-all duration-300 h-full"
          variants={fadeIn}
        >
          <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">
            Credibilidade Profissional
          </h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Um site bem-feito transmite confiança e profissionalismo, gerando
            mais clientes. Na era digital, não ter um site pode fazer você
            perder oportunidades valiosas.
          </p>
          <ul className="space-y-3 text-gray-200">
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-400 mr-3 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Imagem profissional da marca</span>
            </li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-400 mr-3 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Aumento da confiança do cliente</span>
            </li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-400 mr-3 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Diferenciação da concorrência</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-xl shadow-xl border-b-4 border-green-500 group hover:translate-y-[-10px] transition-all duration-300 h-full"
          variants={fadeIn}
        >
          <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">
            Expansão de Mercado
          </h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Com um site, você pode atingir novos mercados e clientes fora do seu
            alcance físico. Expanda seu negócio para novas regiões sem precisar
            de um espaço físico.
          </p>
          <ul className="space-y-3 text-gray-200">
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-400 mr-3 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Acesso a novos mercados</span>
            </li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-400 mr-3 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Crescimento escalável</span>
            </li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-400 mr-3 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Oportunidades internacionais</span>
            </li>
          </ul>
        </motion.div>
      </motion.div>
      <div className="flex justify-center mt-12">
        <Link
          to="/blog"
          className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-4 px-10 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          aria-label="Mais vantagens"
        >
          MAIS VANTAGENS
        </Link>
      </div>
    </div>
  </motion.section>
);

// SECCIÓN DE SERVICIOS MEJORADA SIGNIFICATIVAMENTE
const ServicesSeasonSection = () => {
  const { services } = useContext(GlobalContext);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [hoveredService, setHoveredService] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [filterPrice, setFilterPrice] = useState("all");
  const modalRef = useRef(null);

  // Filtrar servicios por precio
  const filteredServices = services.filter((service) => {
    const price = Number(service.price);
    if (filterPrice === "all") return true;
    if (filterPrice === "low") return price < 501;
    if (filterPrice === "medium") return price >= 501 && price < 1000;
    if (filterPrice === "high") return price >= 1000;
    return true;
  });

  const servicesLowToHigh = filteredServices.sort((a, b) => a.price - b.price);

  // Cerrar modal al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Abrir modal con detalles del servicio
  const openServiceDetails = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  // Características de ejemplo para cada servicio
  // Características dinámicas según el rango de precio
  const getServiceFeatures = (price) => {
    const parsedPrice = Number(price);

    if (parsedPrice <= 500) {
      // Rango bajo: hasta R$500
      return [
        "Design Responsivo",
        "SEO Básico",
        "Formulário de Contato",
        "Hospedagem 6 meses",
      ];
    } else if (parsedPrice >= 501 && parsedPrice <= 999) {
      // Rango medio: R$501 - R$999
      return [
        "Design Responsivo",
        "SEO Avançado",
        "Formulário de Contato",
        "E-commerce Básico",
        "Hospedagem 1 ano",
        "Suporte 3 meses",
      ];
    } else {
      // Rango alto: R$1000+
      return [
        "Design Personalizado",
        "SEO Premium",
        "E-commerce Avançado",
        "Integração Completa",
        "Hospedagem 1 ano",
        "Suporte VIP 6 meses",
        "Análise de Dados",
      ];
    }
  };

  return (
    <motion.section
      className="py-28 bg-white "
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      aria-label="Soluções para cada necessidade"
      id="servicos"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-5 py-2 bg-gray-900 text-white text-sm font-bold mb-6 rounded-full">
            COLEÇÃO EXCLUSIVA
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            SOLUÇÕES PARA CADA NECESSIDADE
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha o serviço ideal para o seu negócio e transforme sua presença
            online com designs exclusivos e alta performance.
          </p>
        </motion.div>


        {/* Grid de servicios mejorado */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesLowToHigh.map((service, index) => (
            <motion.div
              key={service.id}
              className={`group relative overflow-hidden rounded-xl ${getColorByPrice(
                Number(service.price)
              )} transition-all duration-300 transform hover:scale-105`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              <div className="aspect-square relative overflow-hidden">
                {/* Overlay con gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>

                {/* Imagen de fondo */}
                <LazyLoadImage
                  src={
                    service.image ||
                    `https://source.unsplash.com/random/600x600/?website,${service.name}`
                  }
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  effect="blur"
                />

                {/* Contenido */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                  {/* Badges de características */}
                  <div className="mb-3">
                    {getServiceFeatures(service.price).map((feature, i) => (
                      <FeatureBadge key={i} text={feature} />
                    ))}
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                  <p className="text-white/90 mb-4 line-clamp-3 text-sm">
                    {service.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-xs text-gray-400 block">
                        A partir de
                      </span>
                      <span className="text-2xl font-bold text-white">
                        R$ {service.price}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => openServiceDetails(service)}
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all"
                        aria-label={`Ver detalhes de ${service.name}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                      <Link
                        to={`/contato`}
                        className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-lg transition-all"
                        aria-label={`Contratar ${service.name}`}
                      >
                        CONTRATAR
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Efecto de brillo al hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full z-5`}
                  style={{ transitionDuration: "1.5s" }}
                ></div>
              </div>

              {/* Indicador de servicio más vendido para algunos servicios */}
              {[1, 3].includes(service.id) && (
                <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20 animate-pulse">
                  MAIS VENDIDO
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Botón de ver todos los servicios */}
        <div className="flex justify-center mt-16">
          <Link
            to="/portfolio"
            className="group bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-10 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
            aria-label="Ver todos os serviços"
          >
            VER EXEMPLOS
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Modal de detalles del servicio */}
      <AnimatePresence>
        {isModalOpen && selectedService && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64 overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                <img
                  src={
                    selectedService.image ||
                    `https://images.unsplash.com/photo-1481487196290-c152efe083f5?q=80&w=1562&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
                  }
                  alt={selectedService.name}
                  className="w-full h-full object-cover"
                />
                <button
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 rounded-full transition-all z-20"
                  onClick={() => setIsModalOpen(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div className="absolute bottom-6 left-6 z-20">
                  <h3 className="text-3xl font-bold text-white">
                    {selectedService.name}
                  </h3>
                  <div className="flex items-center mt-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mr-2 ${
                        Number(selectedService.price) < 501
                          ? "bg-green-500 text-white"
                          : Number(selectedService.price) < 1000
                          ? "bg-blue-500 text-white"
                          : "bg-yellow-500 text-gray-900"
                      }`}
                    >
                      R$ {selectedService.price}
                    </span>
                    <span className="text-white/80 text-sm">
                      Entrega em até 15 dias
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-xl font-bold mb-3 text-gray-900">
                    Descrição
                  </h4>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedService.description}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="text-xl font-bold mb-3 text-gray-900">
                    O que está incluído
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {getServiceFeatures(selectedService.price).map(
                      (feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg
                            className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div className="mb-6">
                  <h4 className="text-xl font-bold mb-3 text-gray-900">
                    Processo de Desenvolvimento
                  </h4>
                  <ol className="space-y-4">
                    <li className="flex items-start">
                      <div className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900">
                          Briefing e Planejamento
                        </h5>
                        <p className="text-gray-700">
                          Entendemos suas necessidades e definimos os objetivos
                          do projeto.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900">
                          Design e Protótipo
                        </h5>
                        <p className="text-gray-700">
                          Criamos o design visual e a estrutura do seu site.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900">
                          Desenvolvimento
                        </h5>
                        <p className="text-gray-700">
                          Transformamos o design em um site funcional e
                          responsivo.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-gray-900 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h5 className="font-bold text-gray-900">
                          Testes e Lançamento
                        </h5>
                        <p className="text-gray-700">
                          Realizamos testes rigorosos e lançamos seu site ao
                          mundo.
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Link
                    to={`/contato?servico=${selectedService.id}`}
                    className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-4 px-8 rounded-lg transition-all flex-1 text-center"
                  >
                    CONTRATAR AGORA
                  </Link>
                  <Link
                    to="/portfolio"
                    className="border-2 border-gray-900 hover:bg-gray-900 hover:text-white text-gray-900 font-bold py-4 px-8 rounded-lg transition-all flex-1 text-center"
                  >
                    VER EXEMPLOS
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

// Sección "Ofertas Especiais"
const SpecialOffersSection = () => (
  <motion.section
    className="py-28 bg-gray-100"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    aria-label="Ofertas especiales e novidades"
  >
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div
          className="bg-gradient-to-br from-amber-500 to-amber-600 p-12 text-white relative overflow-hidden rounded-xl shadow-xl"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-2">OFERTAS ESPECIAIS</h3>
            <h4 className="text-6xl font-black mb-8 text-white">30% OFF</h4>
            <p className="text-white/90 mb-10 max-w-md text-lg leading-relaxed">
              Aproveite nossas ofertas especiais por tempo limitado. Garanta seu
              site com desconto exclusivo.
            </p>
            <Link
              to="/ofertas"
              className="bg-white hover:bg-gray-100 text-amber-600 font-bold py-3 px-8 rounded-lg transition-all duration-300 inline-block shadow-md hover:shadow-lg transform hover:-translate-y-1"
              aria-label="Ver ofertas especiales"
            >
              VER OFERTAS
            </Link>
          </div>
          <div
            className="absolute -right-16 -bottom-16 w-64 h-64 bg-amber-400 rounded-full opacity-30"
            aria-hidden="true"
          ></div>
          <div
            className="absolute right-20 bottom-20 w-32 h-32 bg-amber-300 rounded-full opacity-20"
            aria-hidden="true"
          ></div>
        </motion.div>

        <motion.div
          className="bg-gradient-to-br from-gray-900 to-gray-800 p-12 text-white relative overflow-hidden rounded-xl shadow-xl"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-2">TODO MÊS</h3>
            <h4 className="text-6xl font-black mb-8 text-green-400">
              NOVIDADES
            </h4>
            <p className="text-white/90 mb-10 max-w-md text-lg leading-relaxed">
              Lançamos novos templates e funcionalidades todos os meses. Fique
              por dentro das últimas tendências.
            </p>
            <Link
              to="/novidades"
              className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 inline-block shadow-md hover:shadow-lg transform hover:-translate-y-1"
              aria-label="Inscreva-se para novidades"
            >
              INSCREVA-SE
            </Link>
          </div>
          <div
            className="absolute -right-16 -bottom-16 w-64 h-64 bg-gray-800 rounded-full opacity-50"
            aria-hidden="true"
          ></div>
          <div
            className="absolute right-20 bottom-20 w-32 h-32 bg-gray-700 rounded-full opacity-70"
            aria-hidden="true"
          ></div>
        </motion.div>
      </div>
    </div>
  </motion.section>
);

// Sección de Call to Action Final
// eslint-disable-next-line no-unused-vars
const CTASection = () => (
  <motion.section
    className="py-28 bg-gradient-to-br from-gray-900 to-gray-800 text-white border-b-8 border-t-8 border-green-600"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    aria-label="Call to Action Final"
  >
    <div className="container mx-auto px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
          PRONTO PARA <span className="text-yellow-400">TRANSFORMAR</span> SEU
          NEGÓCIO?
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Vamos criar juntos um site que não apenas impressiona visualmente, mas
          também converte visitantes em clientes fiéis.
        </p>
        <Link
          to="/contato"
          className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-5 px-12 rounded-lg transition-all duration-300 text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-block"
          aria-label="Comece agora"
        >
          COMECE AGORA
        </Link>
      </motion.div>
    </div>
  </motion.section>
);

const Home = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  useEffect(() => {
    // Smooth scroll para enlaces internos
    const handleSmoothScroll = (e) => {
      if (
        e.target.tagName === "A" &&
        e.target.getAttribute("href") &&
        e.target.getAttribute("href").startsWith("#")
      ) {
        e.preventDefault();
        const targetId = e.target.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth",
          });
        }
      }
    };

    // Animación al cargar la página
    const animateOnLoad = () => {
      const elements = document.querySelectorAll(".animate-on-load");
      elements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("animate-loaded");
        }, index * 200);
      });
    };

    document.addEventListener("click", handleSmoothScroll);
    window.addEventListener("load", animateOnLoad);

    return () => {
      document.removeEventListener("click", handleSmoothScroll);
      window.removeEventListener("load", animateOnLoad);
    };
  }, []);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <SEO />
      <HeroSection />
      <PassionPurposeSection />
      <WhySiteSection staggerContainer={staggerContainer} fadeIn={fadeIn} />
      <ServicesSeasonSection />
      <EnterpriseSolutionsSection className="pt-10 bg-gray-100" />
      <Steps />
      <SpecialOffersSection />
    </main>
  );
};

export default Home;
