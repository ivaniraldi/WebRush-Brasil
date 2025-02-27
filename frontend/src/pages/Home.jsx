/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useContext } from "react";
import { Link } from "react-router-dom";
import GlobalContext from "../../contexts/GlobalContext";
import { Helmet } from "react-helmet"; // Asegúrate de tener instalado react-helmet
import Steps from "../components/Steps";

// Componente SEO para definir metadatos importantes
const SEO = () => (
  <Helmet>
    <title>WebRush Brasil - Sites que Transformam Seu Negócio</title>
    <meta
      name="description"
      content="Desenvolvimento de sites incríveis para impulsionar seu negócio com designs exclusivos e preços acessíveis. Transforme sua presença online com WebRush Brasil."
    />
    <meta
      name="keywords"
      content="freelancer web Brasil, sites baratos Brasil, desenvolvimento web, design exclusivo"
    />
    <meta name="robots" content="index,follow" />
    <link rel="canonical" href="https://www.webrushbrasil.com" />
  </Helmet>
);

// Sección Hero
const HeroSection = () => (
  <motion.section
    className="relative min-h-screen flex items-center justify-center overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
    aria-label="Hero Section"
  >
    {/* Fondo con overlay */}
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-r from-green-800/90 to-green-500/80 z-10"></div>
      <img
        src="https://blog.ebaconline.com.br/blog/wp-content/uploads/2022/12/ydkqgjmgimm9ccvzcx6qe-e1671162777987.png"
        alt="Imagem de fundo ilustrativa"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Contenido del Hero */}
    <div className="container mx-auto px-4 sm:px-6 relative z-20 text-white">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 leading-none">
          SITES QUE <br className="hidden sm:block" />
          <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">TRANSFORMAM</span>{" "}
          <br className="hidden sm:block" />
          SEU NEGÓCIO
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-light mb-8 max-w-2xl mx-auto">
          Seu site dos sonhos por um preço que não pesa! Designs exclusivos que capturam a essência da sua marca.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contato" className="btn btn-light btn-lg" aria-label="Fale comigo agora">
            FALE COMIGO AGORA
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-2 group-hover:translate-x-1 transition-transform inline-block"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
          <Link to="/portfolio" className="btn btn-outline-light btn-lg" aria-label="Ver portfólio">
            VER PORTFOLIO
          </Link>
        </div>
      </motion.div>
    </div>

    {/* Indicador de scroll */}
    <motion.div
      className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-10 w-10 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </motion.div>
  </motion.section>
);

// Sección "Onde Paixão Encontra Propósito"
const PassionPurposeSection = () => (
  <motion.section
    className="py-24 bg-gray-100"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    aria-label="Onde Paixão Encontra Propósito"
  >
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-black mb-6 leading-tight">
              ONDE PAIXÃO <br />
              ENCONTRA PROPÓSITO
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-xl">
              Criamos sites que não apenas parecem incríveis, mas também impulsionam resultados reais para o seu negócio.
              Nossa abordagem combina design inovador com estratégias eficazes.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/portfolio" className="btn bg-green-400 btn-lg" aria-label="Conheça nossa história">
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
            <div className="absolute -top-5 -left-5 w-24 h-24 bg-yellow-500"></div>
            <img
              src="https://www.moneytimes.com.br/uploads/2022/01/img-2-techracism.jpg"
              alt="Equipe trabalhando junta"
              className="w-full h-auto relative z-10 shadow-xl"
            />
            <div className="absolute -bottom-5 -right-5 w-24 h-24 bg-green-800"></div>
          </motion.div>
        </div>
      </div>
    </div>
  </motion.section>
);

// Sección "Por que você precisa de um site" – com cards animados
const WhySiteSection = ({ staggerContainer, fadeIn }) => (
  <motion.section
    className="py-24 bg-gray-400 text-white"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    aria-label="Por que você precisa de um site"
  >
    <div className="container mx-auto px-6">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block px-4 py-1 bg-yellow-600 text-white text-sm font-bold mb-4">
          DIFERENCIAIS
        </span>
        <h2 className="text-4xl md:text-5xl font-black">POR QUE VOCÊ PRECISA DE UM SITE?</h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {/* Card 1 */}
        <motion.div
          className="bg-gradient-to-br from-gray-600 to-gray-700 p-8 rounded-lg shadow-xl border-b-4 border-green-600 group hover:translate-y-[-10px] transition-all duration-300"
          variants={fadeIn}
        >
          <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
          <h3 className="text-2xl font-bold mb-4">Visibilidade Global</h3>
          <p className="text-gray-400 mb-6">
            Estar online significa que você pode ser encontrado por qualquer pessoa, em qualquer lugar do mundo, a
            qualquer momento. Amplie seu alcance além das fronteiras físicas.
          </p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Presença 24/7 na internet
            </li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Alcance global de clientes
            </li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Maior exposição da marca
            </li>
          </ul>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          className="bg-gradient-to-br from-gray-600 to-gray-700 p-8 rounded-lg shadow-xl border-b-4 border-green-600 group hover:translate-y-[-10px] transition-all duration-300"
          variants={fadeIn}
        >
          <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
          <h3 className="text-2xl font-bold mb-4">Credibilidade Profissional</h3>
          <p className="text-gray-400 mb-6">
            Um site bem-feito transmite confiança e profissionalismo, gerando mais clientes. Na era digital, não ter
            um site pode fazer você perder oportunidades valiosas.
          </p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Imagem profissional da marca
            </li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Aumento da confiança do cliente
            </li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Diferenciação da concorrência
            </li>
          </ul>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          className="bg-gradient-to-br from-gray-600 to-gray-700 p-8 rounded-lg shadow-xl border-b-4 border-green-600 group hover:translate-y-[-10px] transition-all duration-300"
          variants={fadeIn}
        >
          <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
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
          <h3 className="text-2xl font-bold mb-4">Expansão de Mercado</h3>
          <p className="text-gray-400 mb-6">
            Com um site, você pode atingir novos mercados e clientes fora do seu alcance físico. Expanda seu negócio
            para novas regiões sem precisar de um espaço físico.
          </p>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Acesso a novos mercados
            </li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Crescimento escalável
            </li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Oportunidades internacionais
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  </motion.section>
);

// Sección "Soluções para cada necessidade" – Exibição dos serviços
const ServicesSeasonSection = () => {
  const { services } = useContext(GlobalContext);
  return (
    <motion.section
      className="py-24 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      aria-label="Soluções para cada necessidade"
    >
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1 bg-gray-900 text-white text-sm font-bold mb-4">
            COLEÇÃO EXCLUSIVA
          </span>
          <h2 className="text-4xl md:text-5xl font-black">SOLUÇÕES PARA CADA NECESSIDADE</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={`https://www.simio.com/wp-content/uploads/2024/10/simio-background-png.png`}
                  alt={`Imagem do serviço ${service.name}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                  <p className="text-white/80 mb-4 line-clamp-5">{service.description}</p>
                    <span className="text-xs text-gray-400">Desde</span>
                  <div className="flex justify-between items-center">
                    <span className={`${service.price > 999? "text-md" : "text-xl"} font-bold `}>R$ {service.price}</span>
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
  );
};

// Sección "Ofertas Especiais"
const SpecialOffersSection = () => (
  <motion.section
    className="py-24 bg-gray-100"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    aria-label="Ofertas especiais e novidades"
  >
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Oferta Especial */}
        <motion.div
          className="bg-amber-500 p-10 text-white relative overflow-hidden"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-2">OFERTAS ESPECIAIS</h3>
            <h4 className="text-5xl font-black mb-6">30% OFF</h4>
            <p className="text-white/90 mb-8 max-w-md">
              Aproveite nossas ofertas especiais por tempo limitado. Garanta seu site com desconto exclusivo.
            </p>
            <Link to="/ofertas" className="btn btn-light btn-lg" aria-label="Ver ofertas especiais">
              VER OFERTAS
            </Link>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-amber-400 rounded-full opacity-50" aria-hidden="true"></div>
          <div className="absolute right-20 bottom-20 w-20 h-20 bg-amber-600 rounded-full opacity-70" aria-hidden="true"></div>
        </motion.div>

        {/* Todo Mês */}
        <motion.div
          className="bg-gray-900 p-10 text-white relative overflow-hidden"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-10">
            <h3 className="text-3xl font-black mb-2">TODO MÊS</h3>
            <h4 className="text-5xl font-black mb-6">NOVIDADES</h4>
            <p className="text-white/90 mb-8 max-w-md">
              Lançamos novos templates e funcionalidades todos os meses. Fique por dentro das últimas tendências.
            </p>
            <Link to="/novidades" className="btn bg-yellow-500 border-none hover:bg-yellow-600 btn-lg" aria-label="Inscreva-se para novidades">
              INSCREVA-SE
            </Link>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-gray-800 rounded-full opacity-50" aria-hidden="true"></div>
          <div className="absolute right-20 bottom-20 w-20 h-20 bg-gray-700 rounded-full opacity-70" aria-hidden="true"></div>
        </motion.div>
      </div>
    </div>
  </motion.section>
);

// Sección de Call to Action Final
const CTASection = () => (
  <motion.section
    className="py-24 bg-gray-900 text-white border-b-8 border-t-8 border-gray-600"
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
        <h2 className="text-4xl md:text-6xl font-black mb-6">PRONTO PARA TRANSFORMAR SEU NEGÓCIO?</h2>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Vamos criar juntos um site que não apenas impressiona visualmente, mas também converte visitantes em clientes.
        </p>
        <Link to="/contato" className="btn bg-yellow-500 border-none hover:bg-yellow-600 btn-xl" aria-label="Comece agora">
          COMECE AGORA
        </Link>
      </motion.div>
    </div>
  </motion.section>
);

const Home = () => {
  // Variantes de animación para framer-motion
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <SEO />
      <HeroSection />
      <PassionPurposeSection />
      <WhySiteSection staggerContainer={staggerContainer} fadeIn={fadeIn} />
      <ServicesSeasonSection fadeIn={fadeIn} />
      <SpecialOffersSection />
      <CTASection />
      <Steps  />
    </main>
  );
};

export default Home;
