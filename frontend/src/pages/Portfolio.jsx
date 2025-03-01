"use client"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import GlobalContext from "../../contexts/GlobalContext"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import ProjectCard from "../components/ProjectCard"

const Portfolio = () => {
  const { portfolioProjects, isLoading } = useContext(GlobalContext)

  const [currentSlide, setCurrentSlide] = useState(0)

  const recentWorks = [
    { id: 1, name: "ADVA (Tech Startup)", image: "https://toflowdesign.com.br/images/portfolio/15-portfolio.jpg" },
    { id: 2, name: "Fashion Blog", image: "https://toflowdesign.com.br/images/portfolio/05-portfolio.jpg" },
    {
      id: 3,
      name: "Restaurant Ordering System",
      image: "https://toflowdesign.com.br/images/portfolio/09-portfolio.jpg",
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
      </div>
    )
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === recentWorks.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? recentWorks.length - 1 : prev - 1))
  }

  // Función para determinar el número de columnas basado en la cantidad de proyectos
  const getGridColumns = (projectCount) => {
    if (projectCount % 3 === 0) return "lg:grid-cols-3"
    if (projectCount % 2 === 0) return "lg:grid-cols-2"
    return "lg:grid-cols-3"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-800/90 to-green-500/80 z-10"></div>
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            className="w-full h-full"
          >
            <img
              src="https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBvcnRmb2xpbyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"
              alt="Portfolio background"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-20 text-white text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            MEU PORTFÓLIO
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Transformando ideias em experiências digitais incríveis e inovadoras
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Link
              to="#projects"
              className="bg-white text-green-700 font-bold py-3 px-8 rounded-full hover:bg-green-50 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Ver Projetos
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* About Me Section */}
      <motion.section
        className="py-24 bg-gray-50"
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
                Sou um desenvolvedor web full-stack apaixonado por criar soluções digitais inovadoras e eficientes. Com
                mais de 5 anos de experiência em diversas tecnologias, estou sempre buscando novos desafios e
                aprendizados para entregar projetos excepcionais.
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Especialista em React, Node.js e Next.js
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Experiência em design responsivo e UI/UX
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Foco em performance, SEO e acessibilidade
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  Integração de APIs e desenvolvimento de backends robustos
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
                className="rounded-full w-64 h-64 mx-auto shadow-xl border-4 border-green-500"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="py-24 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black mb-12 text-center text-gray-800">Projetos em Destaque</h2>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 ${getGridColumns(portfolioProjects.length)} gap-8 justify-items-center`}
          >
            {portfolioProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Recent Works Section - Carousel */}
      <motion.section
        className="py-24 bg-gray-50 hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black mb-12 text-center text-gray-800">Trabalhos Recentes</h2>
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {recentWorks.map((work, index) => (
                  <div key={work.id || index} className="w-full flex-shrink-0">
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl mx-4">
                      <img
                        src={work.image || "/placeholder.svg"}
                        alt={work.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">{work.name}</h3>
                        <p className="text-gray-600 mb-4">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at velit maximus, molestie est
                          a, tempor magna.
                        </p>
                        <Link
                          to={`/work/${work.id}`}
                          className="btn bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                        >
                          Ver Projeto
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
            >
              <FiChevronRight size={24} />
            </button>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-24 bg-gradient-to-r from-green-600 to-green-800 text-white"
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
            className="btn bg-white text-green-700 hover:bg-green-50 font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Entre em Contato
          </Link>
        </div>
      </motion.section>
    </div>
  )
}

export default Portfolio

