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
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      {/* Hero Section con diseño mejorado */}
      <motion.section
        className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Fondo con gradiente y efecto de movimiento */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/80 z-10"></div>
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          >
            <img
              src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Blog Background"
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
              Explorando Ideias & Inovação
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Descubra insights, tendências e histórias inspiradoras no mundo do desenvolvimento web, design e tecnologia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative flex-grow">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar artigos..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-green/50 focus:border-neon-green/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-3 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-neon-green/50 focus:border-neon-green/50"
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
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Blog Posts Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-5 py-2 bg-neon-green/10 text-neon-green text-sm font-bold mb-6 rounded-full border border-neon-green/20">
              ÚLTIMAS PUBLICAÇÕES
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              ARTIGOS EM DESTAQUE
            </h2>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-neon-green"></div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-xl mb-4">Nenhum post encontrado.</p>
              <button
                onClick={() => {
                  setSearchTerm("")
                  setSelectedTag("")
                }}
                className="text-neon-green hover:text-neon-blue font-medium transition-colors duration-300"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <motion.article
                  key={post.id}
                  className="group relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-neon-green/50 transition-all duration-300 transform hover:scale-105"
                  {...fadeInUp}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image_url || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-green transition-colors duration-300">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt || post.content.substring(0, 150) + "..."}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags?.map((tag, index) => (
                        <span
                          key={index}
                          className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded-full text-xs flex items-center border border-gray-600/50"
                        >
                          <FiTag className="mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-400">
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
                      className="mt-4 inline-flex items-center text-neon-green hover:text-neon-blue transition-colors duration-300"
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
        className="py-20 bg-gray-800/30 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
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
              NEWSLETTER
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-green via-neon-blue to-neon-green">
              Fique por dentro das novidades
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Inscreva-se em nossa newsletter para receber as últimas atualizações e dicas.
            </p>
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Seu melhor e-mail"
                className="flex-grow px-4 py-3 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neon-green/50 focus:border-neon-green/50"
              />
              <button
                type="submit"
                className="group relative bg-neon-green text-gray-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center overflow-hidden"
              >
                <span className="relative z-10">Inscrever-se</span>
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
              </button>
            </form>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}

export default Blog

