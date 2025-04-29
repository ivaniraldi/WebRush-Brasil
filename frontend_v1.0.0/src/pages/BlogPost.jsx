import { motion } from "framer-motion"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import GlobalContext from "../../contexts/GlobalContext"
import { FiClock, FiCalendar, FiUser, FiTag, FiArrowLeft } from "react-icons/fi"

const BlogPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { posts, isLoading } = useContext(GlobalContext)
  const post = posts.find((post) => post.slug === slug)

  useEffect(() => {
    if (!isLoading && !post) {
      navigate('/404')
    }
  }, [post, isLoading, navigate])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-neon-green"></div>
      </div>
    )
  }

  if (!post) {
    return null
  }

  const handleImageError = (e) => {
    e.target.src = "https://cdn.vectorstock.com/i/500p/16/87/dark-grunge-background-black-banner-or-backdrop-vector-54661687.jpg"
  }

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  return post?  (
    <div className="min-h-screen bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center text-neon-green hover:text-neon-blue mb-8 transition-colors duration-300"
          >
            <FiArrowLeft className="mr-2" />
            Voltar para o Blog
          </Link>

          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            {...fadeIn}
          >
            {post.title}
          </motion.h1>

          <motion.div
            className="flex flex-wrap items-center gap-4 text-gray-400 mb-8"
            {...fadeIn}
          >
            <div className="flex items-center">
              <FiUser className="mr-2" />
              {post.author}
            </div>
            <div className="flex items-center">
              <FiCalendar className="mr-2" />
              {new Date(post.created_at).toLocaleDateString('pt-BR')}
            </div>
            <div className="flex items-center">
              <FiClock className="mr-2" />
              {post.read_time} min de leitura
            </div>
            <div className="flex items-center">
              <FiTag className="mr-2" />
              {post.tags?.join(", ") || "Sem tags"}
            </div>
          </motion.div>

          <section className="container mx-auto px-4 py-12 max-w-4xl">
            <motion.div
              className="relative rounded-xl overflow-hidden mb-8"
              {...fadeIn}
            >
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full h-[400px] object-cover"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>

            <motion.div
              className="prose prose-lg max-w-none prose-invert prose-headings:text-white prose-p:text-gray-300 prose-a:text-neon-green prose-a:no-underline hover:prose-a:text-neon-blue prose-strong:text-white prose-code:text-neon-green"
              {...fadeIn}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </section>
        </motion.div>
      </div>
    </div>
  ) : null
}

export default BlogPost
