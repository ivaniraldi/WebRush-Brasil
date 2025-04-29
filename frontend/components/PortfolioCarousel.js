"use client"

import { motion } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"

// Translations for es, en, pt
const translations = {
  es: {
    portfolio: {
      title: "Proyectos Innovadores",
      subtitle: "Soluciones digitales que transforman negocios y crean experiencias memorables",
      viewProject: "Explorar",
      utility: "Beneficio:",
      examples: "Ideal para:",
      swipeToView: "Desliza para ver más",
    },
  },
  en: {
    portfolio: {
      title: "Innovative Projects",
      subtitle: "Digital solutions that transform businesses and create memorable experiences",
      viewProject: "Explore",
      utility: "Benefit:",
      examples: "Perfect for:",
      swipeToView: "Swipe to view more",
    },
  },
  pt: {
    portfolio: {
      title: "Projetos Inovadores",
      subtitle: "Soluções digitais que transformam negócios e criam experiências memoráveis",
      viewProject: "Explorar",
      utility: "Benefício:",
      examples: "Ideal para:",
      swipeToView: "Deslize para ver mais",
    },
  },
}

// Project data with detailed descriptions and more realistic examples
const projects = [
  {
    title: "Blogs",
    description: {
      es: "Plataforma de contenido con diseño moderno y estrategias SEO avanzadas.",
      en: "Content platform with modern design and advanced SEO strategies.",
      pt: "Plataforma de conteúdo com design moderno e estratégias avançadas de SEO.",
    },
    utility: {
      es: "Aumenta visibilidad online y genera autoridad en tu nicho.",
      en: "Increases online visibility and builds authority in your niche.",
      pt: "Aumenta a visibilidade online e gera autoridade em seu nicho.",
    },
    examples: {
      es: "Revista gastronómica, blog de viajes, portal de noticias locales.",
      en: "Culinary magazine, travel blog, local news portal.",
      pt: "Revista gastronômica, blog de viagens, portal de notícias locais.",
    },
    image: "https://i.imgur.com/2VYp3iA.png",
    url: "https://urbanblog.onrender.com/",
  },
  {
    title: "Landing Page",
    description: {
      es: "Página de conversión con diseño persuasivo y llamados a la acción estratégicos.",
      en: "Conversion page with persuasive design and strategic calls to action.",
      pt: "Página de conversão com design persuasivo e chamadas para ação estratégicas.",
    },
    utility: {
      es: "Maximiza conversiones y captura leads de alta calidad.",
      en: "Maximizes conversions and captures high-quality leads.",
      pt: "Maximiza conversões e captura leads de alta qualidade.",
    },
    examples: {
      es: "Lanzamiento de app móvil, estudio de arquitectura, servicio de consultoría.",
      en: "Mobile app launch, architecture studio, consulting service.",
      pt: "Lançamento de app móvel, estúdio de arquitetura, serviço de consultoria.",
    },
    image: "https://i.imgur.com/wQpr0ve.png",
    url: "https://landingpage-portfolio.onrender.com/",
  },
  {
    title: "E-commerce",
    description: {
      es: "Tienda virtual completa con experiencia de compra fluida y segura.",
      en: "Complete virtual store with smooth and secure shopping experience.",
      pt: "Loja virtual completa com experiência de compra fluida e segura.",
    },
    utility: {
      es: "Expande tu alcance y vende 24/7 sin limitaciones geográficas.",
      en: "Expands your reach and sells 24/7 without geographical limitations.",
      pt: "Expande seu alcance e vende 24/7 sem limitações geográficas.",
    },
    examples: {
      es: "Tienda de productos artesanales, boutique de moda sostenible, tienda de productos gourmet.",
      en: "Artisanal product store, sustainable fashion boutique, gourmet product shop.",
      pt: "Loja de produtos artesanais, boutique de moda sustentável, loja de produtos gourmet.",
    },
    image: "https://i.imgur.com/vWJ3EfK.png",
    url: "https://ecommerce-portfolio-8cbo.onrender.com/",
  },
  {
    title: "Menu",
    description: {
      es: "Menu digital profesional para tu negocio, recibe pedidos y gestiona tu inventario.",
      en: "Professional digital  menu for your business, receive orders and manage your inventory.",
      pt: "Cardápio digital profissional para o seu negócio, receba pedidos e gerencie seu inventário.",	
    },
    utility: {
      es: "Administra tus ventas y gestiona tu negocio.",
      en: "Manages your sales and manages your business.",
      pt: "Administra seus vendas e gerencia seu negócio.",
    },
    examples: {
      es: "Restaurantes, cafeterías, bares, etc.",
      en: "Restaurants, cafes, bars, etc.",
      pt: "Restaurantes, cafetarias, bares, lanchonetes, etc.",
    },
    image: "https://i.imgur.com/4sA23tk.png",
    url: "https://cardapio-digital-wrbrasil.vercel.app/",
  },
  {
    title: "Portfólios",
    description: {
      es: "Escaparate digital profesional que destaca tu talento y trayectoria.",
      en: "Professional digital showcase that highlights your talent and trajectory.",
      pt: "Vitrine digital profissional que destaca seu talento e trajetória.",
    },
    utility: {
      es: "Atrae clientes potenciales y diferénciate de la competencia.",
      en: "Attracts potential clients and differentiates you from competitors.",
      pt: "Atrai clientes potenciais e diferencia você da concorrência.",
    },
    examples: {
      es: "Fotógrafo profesional, estudio de diseño, arquitecto independiente.",
      en: "Professional photographer, design studio, independent architect.",
      pt: "Fotógrafo profissional, estúdio de design, arquiteto independente.",
    },
    image: "https://i.imgur.com/U0z8kZq.png",
    url: "https://portfolio-portfolio-cfrk.onrender.com/",
  },
  {
    title: "E-Boutique",
    description: {
      es: "Tienda virtual completa con experiencia de compra fluida y segura.",
      en: "Complete virtual store with smooth and secure shopping experience.",
      pt: "Loja virtual completa com experiência de compra fluida e segura.",
    },
    utility: {
      es: "Expande tu alcance y vende 24/7 sin limitaciones geográficas.",
      en: "Expands your reach and sells 24/7 without geographical limitations.",
      pt: "Expande seu alcance e vende 24/7 sem limitações geográficas.",
    },
    examples: {
      es: "Tienda de productos artesanales, boutique de moda sostenible, tienda de productos gourmet.",
      en: "Artisanal product store, sustainable fashion boutique, gourmet product shop.",
      pt: "Loja de produtos artesanais, boutique de moda sustentável, loja de produtos gourmet.",
    },
    image: "https://i.imgur.com/Ordv9Kq.png",
    url: "https://lv-imports.vercel.app/",
  },
]

export default function PortfolioCarousel() {
  const { language } = useLanguage()
  const t = translations[language]
  const [width, setWidth] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const mobileCarouselRef = useRef(null)

  useEffect(() => {
    setWidth(window.innerWidth)
    const handleResize = () => setWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)

    // Update active index when scrolling in mobile carousel
    const handleScroll = () => {
      if (mobileCarouselRef.current) {
        const scrollPosition = mobileCarouselRef.current.scrollLeft
        const cardWidth = mobileCarouselRef.current.offsetWidth * 0.85 + 16 // 85% width + margin
        const newIndex = Math.round(scrollPosition / cardWidth)
        setActiveIndex(newIndex)
      }
    }

    const mobileCarousel = mobileCarouselRef.current
    if (mobileCarousel) {
      mobileCarousel.addEventListener("scroll", handleScroll)
    }

    return () => {
      window.removeEventListener("resize", handleResize)
      if (mobileCarousel) {
        mobileCarousel.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  const cardWidth = width < 640 ? 280 : width < 768 ? 320 : 380 // Responsive card widths
  const totalWidth = cardWidth * projects.length

  // Card component to avoid repetition
  const ProjectCard = ({ project, index, isMobile = false }) => (
    <div
      className={`h-full min-h-[380px] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl overflow-hidden ${
        isMobile ? "w-full" : ""
      }`}
    >
      {/* Project Image with gradient overlay - Fixed height for mobile */}
      <div className={`relative overflow-hidden ${isMobile ? "h-36" : "h-44"}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
        <img
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg"
          }}
          loading="lazy"
        />
        <h3
          className={`absolute bottom-3 left-3 z-20 ${isMobile ? "text-base" : "text-xl"} font-bold text-white font-heading`}
        >
          {project.title}
        </h3>
      </div>

      {/* Project Details - Ensuring text wraps properly and is smaller on mobile */}
      <div className={`${isMobile ? "p-3" : "p-5"} text-left`}>
        {/* Description with proper text wrapping */}
        <div
          className={`${isMobile ? "text-xs" : "text-sm"} text-gray-200 mb-2 font-body break-words whitespace-normal`}
        >
          {project.description[language]}
        </div>

        <div className={`space-y-1 ${isMobile ? "mb-2" : "mb-4"}`}>
          {/* Utility section with proper text wrapping */}
          <div className="flex items-start gap-1">
            <span
              className={`${isMobile ? "text-[10px]" : "text-xs"} text-purple-400 font-semibold mt-1 flex-shrink-0`}
            >
              •
            </span>
            <div className="min-w-0 flex-1">
              <span className={`${isMobile ? "text-[10px]" : "text-xs"} text-purple-400 font-semibold block`}>
                {t.portfolio.utility}
              </span>
              <p className={`${isMobile ? "text-[10px]" : "text-xs"} text-gray-300 break-words whitespace-normal`}>
                {project.utility[language]}
              </p>
            </div>
          </div>

          {/* Examples section with proper text wrapping */}
          <div className="flex items-start gap-1">
            <span className={`${isMobile ? "text-[10px]" : "text-xs"} text-blue-400 font-semibold mt-1 flex-shrink-0`}>
              •
            </span>
            <div className="min-w-0 flex-1">
              <span className={`${isMobile ? "text-[10px]" : "text-xs"} text-blue-400 font-semibold block`}>
                {t.portfolio.examples}
              </span>
              <p className={`${isMobile ? "text-[10px]" : "text-xs"} text-gray-300 break-words whitespace-normal`}>
                {project.examples[language]}
              </p>
            </div>
          </div>
        </div>

        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center ${
            isMobile ? "text-xs" : "text-sm"
          } font-medium text-purple-400 hover:text-blue-400 transition-colors duration-300`}
        >
          {t.portfolio.viewProject}
          <ArrowRight className={`ml-1 ${isMobile ? "h-3 w-3" : "h-4 w-4"}`} />
        </a>
      </div>
    </div>
  )

  return (
    <section className="py-4 md:py-6 relative overflow-hidden">
      {/* Glassmorphism background elements using only Tailwind */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header - Smaller text on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl py-1 md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent font-heading">
            {t.portfolio.title}
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto font-body">{t.portfolio.subtitle}</p>
        </motion.div>

        {/* Desktop Carousel - Hidden on mobile */}
        <div className="relative w-full py-4 overflow-hidden hidden md:block">
          <motion.div
            className="flex items-center"
            animate={{
              x: [0, -totalWidth],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 35,
                ease: "linear",
              },
            }}
          >
            {[...projects, ...projects].map((project, index) => (
              <motion.div
                key={`desktop-${project.title}-${index}`}
                className="mx-4 flex-shrink-0 rounded-2xl"
                style={{ width: `${cardWidth - 32}px` }}
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </motion.div>

          {/* Gradient Overlays for Desktop */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#0f0f13] to-transparent z-20" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#0f0f13] to-transparent z-20" />
        </div>

        {/* Mobile Carousel - Only visible on mobile */}
        <div className="md:hidden">
          {/* Swipe indicator - Smaller text */}
          <div className="text-center mb-3 text-gray-400 text-xs flex items-center justify-center">
            <ChevronLeft className="h-3 w-3 mr-1" />
            <span>{t.portfolio.swipeToView}</span>
            <ChevronRight className="h-3 w-3 ml-1" />
          </div>

          {/* Simple scrollable carousel for mobile */}
          <div
            className="flex overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            ref={mobileCarouselRef}
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {projects.map((project, index) => (
              <div
                key={`mobile-${project.title}`}
                className="flex-shrink-0 w-[85%] snap-center mx-2 first:ml-4 last:mr-4"
              >
                <ProjectCard project={project} index={index} isMobile={true} />
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-3 space-x-2">
            {projects.map((_, index) => (
              <button
                key={`dot-${index}`}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  activeIndex === index ? "bg-purple-400" : "bg-gray-600"
                }`}
                onClick={() => {
                  setActiveIndex(index)
                  if (mobileCarouselRef.current) {
                    mobileCarouselRef.current.scrollTo({
                      left: index * (mobileCarouselRef.current.offsetWidth * 0.85 + 16),
                      behavior: "smooth",
                    })
                  }
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
