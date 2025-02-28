"use client"

/* eslint-disable react/prop-types */
import { motion } from "framer-motion"
import { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import GlobalContext from "../../contexts/GlobalContext"
import { Helmet } from "react-helmet"
import Steps from "../components/Steps"

// Componente SEO para definir metadatos importantes
const getColorByPrice = (price) => {
  if (price < 501) {
    return 'bg-green-500 bg-gradient-to-r from-green-400 to-green-600 shadow-lg shadow-green-500/50 border-4 border-green-700';
  } else if (price < 1000) {
    return 'bg-blue-500 bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg shadow-blue-500/50 border-4 border-blue-700';
  } else {
    return 'bg-yellow-500 bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg shadow-yellow-500/50 border-4 border-yellow-700';
  }
};


const SEO = () => (
  <Helmet>
    <title>WebRush Brasil - Sites que Transformam Seu Negócio</title>
    <meta
      name="description"
      content="Desenvolvimento de sites profissionais para impulsionar seu negócio com designs exclusivos e preços acessíveis. Transforme sua presença online com WebRush Brasil."
    />
    <meta
      name="keywords"
      content="desenvolvimento web Brasil, sites profissionais, design responsivo, presença online, WebRush Brasil"
    />
    <meta name="robots" content="index,follow" />
    <link rel="canonical" href="https://www.webrushbrasil.com" />
  </Helmet>
)

// Sección Hero con animaciones mejoradas
const HeroSection = () => (
  <motion.section
    className="relative min-h-screen flex items-center justify-center overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    aria-label="Hero Section"
  >
    {/* Fondo con overlay mejorado para mejor contraste */}
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-600/80 z-10"></div>
      <img
        src="https://blog.ebaconline.com.br/blog/wp-content/uploads/2022/12/ydkqgjmgimm9ccvzcx6qe-e1671162777987.png"
        alt="Equipe de desenvolvimento web trabalhando"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Contenido del Hero con mejor espaciado y jerarquía */}
    <div className="container mx-auto px-4 sm:px-6 relative z-20 text-white">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
          SITES QUE <br className="hidden sm:block" />
          <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-yellow-400">TRANSFORMAM</span>{" "}
          <br className="hidden sm:block" />
          SEU NEGÓCIO
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-light mb-10 max-w-2xl">
          Seu site dos sonhos por um preço acessível. Designs exclusivos que capturam a essência da sua marca e
          convertem visitantes em clientes.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-14">
          <Link
            to="/contato"
            className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            aria-label="Fale comigo agora"
          >
            FALE COMIGO AGORA
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
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

    {/* Indicador de scroll con animación más suave */}
    <motion.div
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.8, ease: "easeInOut" }}
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-yellow-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </motion.div>
  </motion.section>
)

// Sección "Onde Paixão Encontra Propósito" con mejor contraste y espaciado
const PassionPurposeSection = () => (
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
              <span className="text-green-600">ENCONTRA PROPÓSITO</span>
            </h2>
            <p className="text-xl text-gray-700 mb-10 max-w-xl leading-relaxed">
              Criamos sites que não apenas parecem incríveis, mas também impulsionam resultados reais para o seu
              negócio. Nossa abordagem combina design inovador com estratégias eficazes para maximizar seu retorno.
            </p>
            <div className="flex items-center">
              <Link
                to="/portfolio"
                className="bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                aria-label="Conheça nossos trabalhos"
              >
                CONHEÇA NOSSOS TRABALHOS
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
            <img
              src="https://www.moneytimes.com.br/uploads/2022/01/img-2-techracism.jpg"
              alt="Equipe trabalhando em projetos web"
              className="w-full h-auto relative z-10 shadow-xl rounded-lg"
            />
            <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-green-700 rounded-lg"></div>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.section>
)

// Sección "Por que você precisa de um site" con cards mejorados
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
        <h2 className="text-4xl md:text-5xl font-black">POR QUE VOCÊ PRECISA DE UM SITE?</h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-10"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {/* Card 1 - Diseño mejorado */}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">Visibilidade Global</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Estar online significa que você pode ser encontrado por qualquer pessoa, em qualquer lugar do mundo, a
            qualquer momento. Amplie seu alcance além das fronteiras físicas.
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Maior exposição da marca</span>
            </li>
          </ul>
        </motion.div>

        {/* Card 2 - Diseño mejorado */}
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
          <h3 className="text-2xl font-bold mb-4 text-white">Credibilidade Profissional</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Um site bem-feito transmite confiança e profissionalismo, gerando mais clientes. Na era digital, não ter um
            site pode fazer você perder oportunidades valiosas.
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Diferenciação da concorrência</span>
            </li>
          </ul>
        </motion.div>

        {/* Card 3 - Diseño mejorado */}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">Expansão de Mercado</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Com um site, você pode atingir novos mercados e clientes fora do seu alcance físico. Expanda seu negócio
            para novas regiões sem precisar de um espaço físico.
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
)

// Sección "Soluções para cada necessidade" con mejor presentación de servicios
const ServicesSeasonSection = () => {
  const { services } = useContext(GlobalContext)

  return (
    <motion.section
      className="py-28 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      aria-label="Soluções para cada necessidade"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-5 py-2 bg-gray-900 text-white text-sm font-bold mb-6 rounded-full">
            COLEÇÃO EXCLUSIVA
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">SOLUÇÕES PARA CADA NECESSIDADE</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
           <motion.div
           key={service.id}
           className={`group relative overflow-hidden ${getColorByPrice(Number(service.price))}`}
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5, delay: index * 0.1 }}
         >
           <div className="aspect-square relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
             <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
               <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
               <p className="text-white/80 mb-4 line-clamp-5">{service.description}</p>
               <span className="text-xs text-gray-400">Desde</span>
               <div className="flex justify-between items-center">
                 <span className={`${service.price > 999 ? "text-md" : "text-xl"} font-bold `}>R$ {service.price}</span>
                 <Link to="/contato" className="btn bg-yellow-500 border-none hover:bg-yellow-600 btn-sm" aria-label={`Explorar mais sobre ${service.name}`}>
                   PEDIR
                 </Link>
               </div>
               <p className="text-xs text-center text-gray-400 mt-2">(variação de preço por conteúdo)</p>
             </div>
           </div>
         </motion.div>
         
          ))}
        </div>
      </div>
    </motion.section>
  )
}

// Sección "Ofertas Especiais" con mejor contraste y diseño
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
        {/* Oferta Especial - Diseño mejorado */}
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
              Aproveite nossas ofertas especiais por tempo limitado. Garanta seu site com desconto exclusivo.
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

        {/* Todo Mês - Diseño mejorado */}
        <motion.div
          className="bg-gradient-to-br from-gray-900 to-gray-800 p-12 text-white relative overflow-hidden rounded-xl shadow-xl"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-2">TODO MÊS</h3>
            <h4 className="text-6xl font-black mb-8 text-green-400">NOVIDADES</h4>
            <p className="text-white/90 mb-10 max-w-md text-lg leading-relaxed">
              Lançamos novos templates e funcionalidades todos os meses. Fique por dentro das últimas tendências.
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
)

// Sección de Call to Action Final con mejor contraste y diseño
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
          PRONTO PARA <span className="text-yellow-400">TRANSFORMAR</span> SEU NEGÓCIO?
        </h2>
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Vamos criar juntos um site que não apenas impressiona visualmente, mas também converte visitantes em clientes
          fiéis.
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
)

const Home = () => {
  // Variantes de animación para framer-motion
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  // Efecto para scroll suave
  useEffect(() => {
    // Función para manejar scroll suave
    const handleSmoothScroll = (e) => {
      if (e.target.tagName === "A" && e.target.getAttribute("href").startsWith("#")) {
        e.preventDefault()
        const targetId = e.target.getAttribute("href")
        const targetElement = document.querySelector(targetId)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth",
          })
        }
      }
    }

    // Agregar event listener
    document.addEventListener("click", handleSmoothScroll)

    // Limpiar event listener
    return () => {
      document.removeEventListener("click", handleSmoothScroll)
    }
  }, [])

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <SEO />
      <HeroSection />
      <PassionPurposeSection />
      <WhySiteSection staggerContainer={staggerContainer} fadeIn={fadeIn} />
      <ServicesSeasonSection />
      <SpecialOffersSection />
      <CTASection />
      <Steps />
    </main>
  )
}

export default Home

