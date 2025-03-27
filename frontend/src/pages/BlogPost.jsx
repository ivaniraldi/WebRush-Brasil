import { motion } from "framer-motion"
import { useParams, Link } from "react-router-dom"
import { useContext } from "react"
import GlobalContext from "../../contexts/GlobalContext"
import { FiClock, FiCalendar, FiUser, FiTag, FiArrowLeft } from "react-icons/fi"

const BlogPost = () => {
  const { slug } = useParams()
  const { posts } = useContext(GlobalContext)
  const post = posts.find((post) => post.slug === slug)

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-center p-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Postagem não encontrada</h2>
          <p className="text-gray-400 mb-4">Desculpe, não conseguimos encontrar a postagem que você está procurando.</p>
          <Link to="/blog" className="text-neon-green hover:text-neon-blue font-medium transition-colors duration-300">
            Voltar para o Blog
          </Link>
        </div>
      </div>
    )
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return (
    <motion.article
      className="min-h-screen bg-gray-900 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
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
              src={post.image_url || "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"}
              alt={post.title}
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
            <Link
              to="/blog"
              className="inline-flex items-center text-neon-green hover:text-neon-blue transition-colors duration-300 mb-6"
            >
              <FiArrowLeft className="mr-2" />
              Voltar para o Blog
            </Link>
 
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-green to-neon-blue">
              {post.title}
            </h1>
            <div className="flex flex-wrap justify-center gap-4 text-gray-300 text-sm mb-6">
              <span className="flex items-center">
                <FiCalendar className="mr-2" />
                {new Date(post.created_at).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                <FiClock className="mr-2" />
                {Math.ceil(post.content.split(" ").length / 200)} min de leitura
              </span>
              <span className="flex items-center">
                <FiUser className="mr-2" />
                {post.author || "Autor Desconhecido"}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          className="relative rounded-xl overflow-hidden mb-8"
          {...fadeIn}
        >
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </motion.div>

        <motion.div
          className="prose prose-lg max-w-none prose-invert prose-headings:text-white prose-p:text-gray-300 prose-a:text-neon-green prose-a:no-underline hover:prose-a:text-neon-blue prose-strong:text-white prose-code:text-neon-green"
          {...fadeIn}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <motion.div
          className="mt-12 pt-8 border-t border-gray-800"
          {...fadeIn}
        >
          <h3 className="text-2xl font-bold text-white mb-4">Compartilhe este artigo</h3>
          <div className="flex space-x-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gray-800/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center overflow-hidden border border-gray-700/50 hover:border-neon-green/50"
            >
              <span className="relative z-10">Twitter</span>
              <motion.div
                className="absolute inset-0 bg-neon-green opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gray-800/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center overflow-hidden border border-gray-700/50 hover:border-neon-green/50"
            >
              <span className="relative z-10">Facebook</span>
              <motion.div
                className="absolute inset-0 bg-neon-green opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gray-800/50 backdrop-blur-sm text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center overflow-hidden border border-gray-700/50 hover:border-neon-green/50"
            >
              <span className="relative z-10">LinkedIn</span>
              <motion.div
                className="absolute inset-0 bg-neon-green opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
              />
            </a>
          </div>
        </motion.div>
      </section>
    </motion.article>
  )
}

export default BlogPost

