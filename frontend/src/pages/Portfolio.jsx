"use client"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const Portfolio = () => {
  const templates = [
    { id: 1, name: "E-commerce", image: "https://toflowdesign.com.br/images/portfolio/01-portfolio.jpg", url: "https://promo.toflowdesign.com.br/biogas/" },
    { id: 2, name: "Blog", image: "https://toflowdesign.com.br/images/portfolio/02-portfolio.jpg", url: "https://promo.toflowdesign.com.br/unirio/" },
    { id: 3, name: "Portfolio", image: "https://toflowdesign.com.br/images/portfolio/03-portfolio.jpg", url: "https://promo.toflowdesign.com.br/rio-care/" },
    { id: 4, name: "Landing Page", image: "https://toflowdesign.com.br/images/portfolio/04-portfolio.jpg", url: "https://promo.toflowdesign.com.br/bonne-chere/" },
  ]

  const recentWorks = [
    { id: 1, name: "ADVA (Tech Startup)", image: "https://toflowdesign.com.br/images/portfolio/15-portfolio.jpg"},
      { id: 2, name: "Fashion Blog", image: "https://toflowdesign.com.br/images/portfolio/05-portfolio.jpg" },
    { id: 3, name: "Restaurant Ordering System", image: "https://toflowdesign.com.br/images/portfolio/09-portfolio.jpg" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-800/90 to-green-500/80 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBvcnRmb2xpbyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"
            alt="Portfolio background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-20 text-white text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            MEU PORTFÓLIO
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Transformando ideias em experiências digitais incríveis
          </motion.p>
        </div>
      </motion.section>

      {/* About Me Section */}
      <motion.section
        className="py-24 bg-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-black mb-6 text-green-600">Sobre Mim</h2>
              <p className="text-xl text-gray-600 mb-6">
                Sou um desenvolvedor web apaixonado por criar soluções digitais inovadoras e eficientes. Com anos de
                experiência em diversas tecnologias, estou sempre buscando novos desafios e aprendizados.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Especialista em React e Node.js
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Experiência em design responsivo
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Foco em performance e SEO
                </li>
              </ul>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://media.licdn.com/dms/image/v2/D4D03AQHIjASCp0HT9g/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1685108338341?e=1746057600&v=beta&t=IyetpjMUko0mTWNUwfJ1M9nN-Cz9nP5rmX0t2M3sbSI"
                alt="Developer profile"
                className="rounded-full w-64 h-64 mx-auto shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Templates Section */}
      <motion.section
        className="py-24 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black mb-12 text-center text-gray-800">Templates Disponíveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                className="bg-gray-100 rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{template.name}</h3>
                  <Link to={`${template.url}`} className="text-green-600 hover:text-green-800 font-semibold">
                    Ver Site
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Recent Works Section */}
      <motion.section
        className="py-24 bg-gray-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black mb-12 text-center text-gray-800">Trabalhos Recentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentWorks.map((work, index) => (
              <motion.div
                key={work.id}
                className="bg-white rounded-lg overflow-hidden shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img src={work.image || "/placeholder.svg"} alt={work.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{work.name}</h3>
                  <p className="text-gray-600 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at velit maximus, molestie est a,
                    tempor magna.
                  </p>
                  <Link
                    to={`/work/${work.id}`}
                    className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Ver Projeto
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-24 bg-gray-900 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">Pronto para Começar Seu Projeto?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Vamos trabalhar juntos para criar uma experiência digital única que impulsione o sucesso do seu negócio.
          </p>
          <Link
            to="/contato"
            className="btn bg-yellow-500 border-none hover:bg-yellow-600 text-white font-bold py-3 px-8 rounded-lg text-lg"
          >
            Entre em Contato
          </Link>
        </div>
      </motion.section>
    </div>
  )
}

export default Portfolio

