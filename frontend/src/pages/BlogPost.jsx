
import { motion } from "framer-motion"
import { useParams } from "react-router-dom"
import { useContext } from "react"
import GlobalContext from "../../contexts/GlobalContext"
import { FiClock, FiCalendar, FiUser, FiTag } from "react-icons/fi"

const BlogPost = () => {
  const { slug } = useParams()
  const { posts } = useContext(GlobalContext)
  const post = posts.find((post) => post.slug === slug)

  if (!post) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Postagem não encontrada</h2>
          <p className="text-gray-600 mb-4">Desculpe, não conseguimos encontrar a postagem que você está procurando.</p>
          <a href="/blog" className="text-green-600 hover:text-green-800 font-medium">
            Voltar para o Blog
          </a>
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
      className="min-h-screen bg-white overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <section className="relative py-20 bg-gradient-to-br from-green-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {post.title}
          </motion.h1>
          <motion.div
            className="flex flex-wrap justify-center gap-4 text-gray-200 text-sm mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
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
          </motion.div>
          <motion.div
            className="flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {post.tags &&
              post.tags.map((tag, index) => (
                <span key={index} className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                  <FiTag className="inline mr-1" />
                  {tag}
                </span>
              ))}
          </motion.div>
        </div>
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
      </section>
      <section className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.img src={post.image_url} alt={post.title} className="w-full rounded-lg shadow-lg mb-8" {...fadeIn} />
        <motion.div
          className="prose prose-lg max-w-none"
          {...fadeIn}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <motion.div className="mt-12 pt-8 border-t border-gray-200" {...fadeIn}>
          <h3 className="text-2xl font-bold mb-4">Compartilhe este artigo</h3>
          <div className="flex space-x-4">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-full transition duration-300"
            >
              Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition duration-300"
            >
              Facebook
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-full transition duration-300"
            >
              LinkedIn
            </a>
          </div>
        </motion.div>
      </section>
    </motion.article>
  )
}

export default BlogPost

