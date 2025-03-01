import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { FiClock, FiCalendar, FiArrowRight, FiSearch, FiTag } from "react-icons/fi"
import GlobalContext from "../../contexts/GlobalContext"
import { useContext, useState } from "react"

const Blog = () => {
  const { posts, isLoading } = useContext(GlobalContext)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState("")

  // Animación para los elementos que aparecen
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  // Filtrar posts basado en búsqueda y tag seleccionado
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTag === "" || post.tags.includes(selectedTag)),
  )

  // Obtener todas las tags únicas
  const allTags = [...new Set(posts.flatMap((post) => post.tags))]
  
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section con diseño mejorado */}
      <motion.section
        className="relative py-24 overflow-hidden bg-gradient-to-br from-green-600 to-blue-700"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Explorando Ideias & Inovação
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white opacity-90 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Descubra insights, tendências e histórias inspiradoras no mundo do desenvolvimento web, design e tecnologia.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="relative flex-grow">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar artigos..."
                className="w-full pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-3 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="">Todas as tags</option>
              {allTags.map((tag, index) => (
                <option key={index} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </motion.div>
        </div>
        {/* Elementos decorativos SVG */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillOpacity="0.1"
            fill="#fff"
            d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,213.3C840,224,960,224,1080,213.3C1200,203,1320,181,1380,170.7L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </motion.section>

      {/* Blog Posts Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 className="text-4xl font-bold text-center text-gray-800 mb-12" {...fadeInUp}>
            Últimas Publicações
          </motion.h2>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-xl mb-4">Nenhum post encontrado.</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedTag("")
                }}
                className="text-green-600 hover:text-green-800 font-medium"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl"
                  {...fadeInUp}
                >
                  <img
                    src={post.image_url || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 hover:text-green-600 transition-colors duration-300">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt || post.content.substring(0, 150) + "..."}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs flex items-center"
                        >
                          <FiTag className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span className="flex items-center">
                        <FiCalendar className="mr-2" />
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <FiClock className="mr-2" />
                        {Math.ceil(post.content.split(" ").length / 200)} min de leitura
                      </span>
                    </div>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="mt-4 inline-flex items-center text-green-600 hover:text-green-800 transition-colors duration-300"
                    >
                      Ler mais
                      <FiArrowRight className="ml-2" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <motion.section
        className="py-20 bg-gray-900 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Fique por dentro das novidades</h2>
          <p className="mb-8 text-gray-300">
            Inscreva-se em nossa newsletter para receber as últimas atualizações e dicas.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-grow px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
            >
              Inscrever-se
            </button>
          </form>
        </div>
      </motion.section>
    </div>
  )
}

export default Blog

