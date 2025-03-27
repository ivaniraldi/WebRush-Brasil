import { useContext, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FaCode } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GlobalContext from '../../contexts/GlobalContext';
import ProjectCard from '../components/ProjectCard';

// Función para determinar el color según el precio
const getColorByPrice = (price) => {
  if (price <= 500) return 'bg-gray-800/50';
  if (price <= 999) return 'bg-gray-800/50';
  return 'bg-gray-800/50';
};

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

// Componente de badge de características
const FeatureBadge = ({ children }) => (
  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neon-green/10 text-neon-green border border-neon-green/20">
    {children}
  </span>
);

// Componente de modal de servicio
const ServiceModal = ({ service, onClose, modalRef }) => {
  const getServiceFeatures = (price) => {
    switch (price) {
      case "R$1.500":
        return [
          "Site responsivo",
          "Até 5 páginas",
          "Formulário de contato",
          "Otimização SEO básica",
          "Integração com redes sociais",
          "Suporte por 30 dias"
        ];
      case "R$3.000":
        return [
          "Site responsivo",
          "Até 10 páginas",
          "Formulário de contato",
          "Otimização SEO avançada",
          "Integração com redes sociais",
          "Painel administrativo",
          "Suporte por 60 dias",
          "Backup semanal"
        ];
      case "R$5.000":
        return [
          "Site responsivo",
          "Páginas ilimitadas",
          "Formulário de contato",
          "Otimização SEO avançada",
          "Integração com redes sociais",
          "Painel administrativo",
          "Suporte por 90 dias",
          "Backup diário",
          "E-commerce integrado",
          "Sistema de pagamentos"
        ];
      default:
        return [];
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-neon-green/20"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-bold text-white">{service.name}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-neon-green mb-3">Descrição</h4>
            <p className="text-gray-300">{service.description}</p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-neon-green mb-3">Incluído</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {getServiceFeatures(service.price).map((feature, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <span className="text-neon-green mr-2">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-neon-green mb-3">Processo de Desenvolvimento</h4>
            <ol className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="text-neon-green mr-2">1.</span>
                Planejamento e definição de requisitos
              </li>
              <li className="flex items-start">
                <span className="text-neon-green mr-2">2.</span>
                Design e aprovação do layout
              </li>
              <li className="flex items-start">
                <span className="text-neon-green mr-2">3.</span>
                Desenvolvimento e implementação
              </li>
              <li className="flex items-start">
                <span className="text-neon-green mr-2">4.</span>
                Testes e ajustes
              </li>
              <li className="flex items-start">
                <span className="text-neon-green mr-2">5.</span>
                Lançamento e suporte
              </li>
            </ol>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <Link
            to="/contato"
            className="bg-neon-green text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-neon-green/90 transition-colors"
          >
            Solicitar Orçamento
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Componente principal
const WebServices = () => {
  const { portfolioProjects, services } = useContext(GlobalContext);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);
  const [filterPrice, setFilterPrice] = useState("all");
  const modalRef = useRef(null);

  // Proyectos manuales
  const manualProjects = [
    {
      id: 1,
      title: "Blog Urbano",
      description: "Blog moderno y responsivo con diseño minimalista y optimizado para SEO",
      image: "https://i.imgur.com/2VYp3iA.png",
      project_url: "https://urbanblog.onrender.com/",
      technologies: ["React", "TailwindCSS", "Node.js"]
    },
    {
      id: 2,
      title: "Landing Page",
      description: "Landing page moderna con animaciones y diseño atractivo",
      image: "https://i.imgur.com/wQpr0ve.png",
      project_url: "https://landingpage-portfolio.onrender.com/",
      technologies: ["React", "TailwindCSS", "Framer Motion"]
    },
    {
      id: 3,
      title: "E-commerce",
      description: "Tienda online completa con carrito de compras y sistema de pagos",
      image: "https://i.imgur.com/vWJ3EfK.png",
      project_url: "https://ecommerce-portfolio-8cbo.onrender.com/",
      technologies: ["React", "Node.js", "MongoDB"]
    },
    {
      id: 4,
      title: "Portfolio",
      description: "Portfolio personal con diseño moderno y animaciones suaves",
      image: "https://i.imgur.com/U0z8kZq.png",
      project_url: "https://portfolio-portfolio-cfrk.onrender.com/",
      technologies: ["React", "TailwindCSS", "Framer Motion"]
    }
  ];

  // Usar los proyectos manuales en lugar de los de la API
  const projects = manualProjects;

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

  // Características dinámicas según el rango de precio
  const getServiceFeatures = (price) => {
    const parsedPrice = Number(price);

    if (parsedPrice <= 500) {
      return [
        "Design Responsivo",
        "SEO Básico",
        "Formulário de Contato",
        "Hospedagem 6 meses",
      ];
    } else if (parsedPrice >= 501 && parsedPrice <= 999) {
      return [
        "Design Responsivo",
        "SEO Avançado",
        "Formulário de Contato",
        "E-commerce Básico",
        "Hospedagem 1 ano",
        "Suporte 3 meses",
      ];
    } else {
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
    <div className="min-h-screen bg-gray-900 text-white">
      <Helmet>
        <title>Serviços Web - WebRush Brasil</title>
        <meta name="description" content="Desenvolvimento web, aplicativos móveis e e-commerce para impulsionar seu negócio online." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
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
              alt="Desenvolvimento web e tecnologia"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-green to-neon-blue">
              Desenvolvimento Web Profissional
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Transforme sua presença digital com sites modernos, responsivos e otimizados para resultados.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <motion.section
        className="py-28"
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
            <span className="inline-block px-5 py-2 bg-neon-green/10 text-neon-green text-sm font-bold mb-6 rounded-full border border-neon-green/20">
              COLEÇÃO EXCLUSIVA
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              SOLUÇÕES PARA CADA NECESSIDADE
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Escolha o serviço ideal para o seu negócio e transforme sua presença
              online com designs exclusivos e alta performance.
            </p>
          </motion.div>

          {/* Grid de servicios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesLowToHigh.map((service, index) => (
              <motion.div
                key={service.id}
                className={`group relative overflow-hidden rounded-xl ${getColorByPrice(
                  Number(service.price)
                )} transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-gray-700/50 hover:border-neon-green/50`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div className="aspect-square relative overflow-hidden">
                  {/* Overlay con gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/50 to-transparent z-10"></div>

                  {/* Imagen de fondo */}
                  <LazyLoadImage
                    src={
                      service.image ||
                      `https://cdn.vectorstock.com/i/500p/16/87/dark-grunge-background-black-banner-or-backdrop-vector-54661687.jpg`
                    }
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    effect="blur"
                  />

                  {/* Contenido */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
                    {/* Badges de características */}
                    <div className="mb-3 flex flex-wrap gap-2">
                      {getServiceFeatures(service.price).map((feature, i) => (
                        <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neon-green/10 text-neon-green border border-neon-green/20 backdrop-blur-sm">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                      {service.name}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-3 text-sm">
                      {service.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs text-gray-400 block">
                          A partir de
                        </span>
                        <span className="text-2xl font-bold text-neon-green">
                          R$ {service.price}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => openServiceDetails(service)}
                          className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 rounded-full transition-all border border-white/20 hover:border-neon-green/50"
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
                          className="bg-neon-green hover:bg-neon-green/90 text-gray-900 font-bold py-2 px-4 rounded-lg transition-all border border-neon-green/50 hover:border-neon-green"
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

                {/* Indicador de servicio mais vendido */}
                {[1, 3].includes(service.id) && (
                  <div className="absolute top-4 right-4 bg-neon-green text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20 animate-pulse border border-neon-green/50">
                    MAIS VENDIDO
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Botão de ver todos os serviços */}
          <div className="flex justify-center mt-16">
            <Link
              to="/portfolio"
              className="group bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-10 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center border border-gray-700/50 hover:border-neon-green/50"
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
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                className="bg-gray-900 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-700/50"
                ref={modalRef}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-64 overflow-hidden rounded-t-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent z-10"></div>
                  <img
                    src={
                      selectedService.image ||
                      `https://images.unsplash.com/photo-1481487196290-c152efe083f5?q=80&w=1562&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
                    }
                    alt={selectedService.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white p-2 rounded-full transition-all border border-white/20 hover:border-neon-green/50 z-20"
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
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold mr-2 bg-neon-green text-gray-900 border border-neon-green/50">
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
                    <h4 className="text-xl font-bold mb-3 text-white">
                      Descrição
                    </h4>
                    <p className="text-gray-300 leading-relaxed">
                      {selectedService.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xl font-bold mb-3 text-white">
                      O que está incluído
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {getServiceFeatures(selectedService.price).map(
                        (feature, i) => (
                          <li key={i} className="flex items-start">
                            <svg
                              className="h-5 w-5 text-neon-green mr-2 mt-0.5 flex-shrink-0"
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
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xl font-bold mb-3 text-white">
                      Processo de Desenvolvimento
                    </h4>
                    <ol className="space-y-4">
                      <li className="flex items-start">
                        <div className="bg-neon-green text-gray-900 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 border border-neon-green/50">
                          1
                        </div>
                        <div>
                          <h5 className="font-bold text-white">
                            Briefing e Planejamento
                          </h5>
                          <p className="text-gray-300">
                            Entendemos suas necessidades e definimos os objetivos
                            do projeto.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-neon-green text-gray-900 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 border border-neon-green/50">
                          2
                        </div>
                        <div>
                          <h5 className="font-bold text-white">
                            Design e Protótipo
                          </h5>
                          <p className="text-gray-300">
                            Criamos o design visual e a estrutura do seu site.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-neon-green text-gray-900 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 border border-neon-green/50">
                          3
                        </div>
                        <div>
                          <h5 className="font-bold text-white">
                            Desenvolvimento
                          </h5>
                          <p className="text-gray-300">
                            Transformamos o design em um site funcional e
                            responsivo.
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-neon-green text-gray-900 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0 border border-neon-green/50">
                          4
                        </div>
                        <div>
                          <h5 className="font-bold text-white">
                            Testes e Lançamento
                          </h5>
                          <p className="text-gray-300">
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
                      className="bg-neon-green hover:bg-neon-green/90 text-gray-900 font-bold py-4 px-8 rounded-lg transition-all flex-1 text-center border border-neon-green/50 hover:border-neon-green"
                    >
                      CONTRATAR AGORA
                    </Link>
                    <Link
                      to="/portfolio"
                      className="border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-4 px-8 rounded-lg transition-all flex-1 text-center"
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

      {/* Featured Projects Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-5 py-2 bg-neon-green/10 text-neon-green text-sm font-bold mb-6 rounded-full border border-neon-green/20">
              PORTFÓLIO SELECIONADO
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              PROJETOS EM DESTAQUE
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Conheça alguns dos nossos trabalhos mais recentes e bem-sucedidos.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-neon-green/50 transition-all duration-300 transform hover:scale-105"
              >
                <div className="aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent z-10"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-white/10 text-white border border-white/20">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex justify-end">
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative bg-neon-green text-gray-900 font-bold py-1.5 px-3 rounded-lg transition-all duration-300 flex items-center gap-1.5 overflow-hidden text-sm"
                    >
                      <span className="relative z-10">Ver Projeto</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1"
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
                      <motion.div
                        className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-neon-green to-neon-blue opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: 0 }}
                      />
                    </a>
                  </div>
                </div>

                {/* Efecto de brillo al hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 transform -translate-x-full group-hover:translate-x-full z-5`}
                  style={{ transitionDuration: "1.5s" }}
                ></div>
              </motion.div>
            ))}
          </div>

          {/* Botón de ver todos los projetos */}
          <div className="flex justify-center mt-16">
            <Link
              to="/portfolio"
              className="group relative bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-10 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center border border-gray-700/50 hover:border-neon-green/50"
            >
              <span className="relative z-10">VER TODOS OS PROJETOS</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
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
              <motion.div
                className="absolute inset-0 bg-neon-green opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-800/30 relative overflow-hidden">
        {/* Efecto de fondo */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50"></div>
        <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/1920x1080/?technology')] bg-cover bg-center opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-block px-5 py-2 bg-neon-green/10 text-neon-green text-sm font-bold mb-6 rounded-full border border-neon-green/20">
              PRONTO PARA COMEÇAR?
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-green via-neon-blue to-neon-green">
              Transforme sua Presença Digital Hoje
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Entre em contato conosco e descubra como podemos ajudar seu negócio a crescer online com soluções personalizadas e resultados excepcionais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contato"
                className="group relative bg-neon-green text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 overflow-hidden"
              >
                <span className="relative z-10">Solicitar Orçamento</span>
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
              <Link
                to="/portfolio"
                className="group relative border-2 border-white hover:border-neon-green text-white hover:text-neon-green font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center text-lg overflow-hidden"
              >
                <span className="relative z-10">Ver Projetos</span>
                <motion.div
                  className="absolute inset-0 bg-neon-green opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// PropTypes
PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string
};

SecondaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string
};

FeatureBadge.propTypes = {
  children: PropTypes.node.isRequired
};

ServiceModal.propTypes = {
  service: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  modalRef: PropTypes.object.isRequired
};

export default WebServices; 