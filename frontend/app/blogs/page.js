"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import Head from "next/head";
import { ChevronLeft, ChevronRight, Calendar, User } from "lucide-react";
import { blogAPI } from "../config/api";

export default function BlogsListPage() {
  const { theme } = useTheme();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await blogAPI.getBlogs(currentPage);
        setBlogs(Array.isArray(data.data) ? data.data : []);
        setTotalPages(data.pagination?.totalPages || data.pagination?.pages || 1);
      } catch (err) {
        setError("No se pudieron cargar los blogs");
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const seoTitle = "Blogs - Explora Nuestros Artículos | WebRush Brasil";
  const seoDescription = "Descubre nuestra colección de blogs sobre desarrollo web, tecnología, marketing digital y más en WebRush Brasil.";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="blogs, desarrollo web, tecnología, marketing digital, WebRush Brasil" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`https://webrushbrasil.com.br/blogs?page=${currentPage}`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={`https://webrushbrasil.com.br/blogs?page=${currentPage}`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="WebRush Brasil" />
        <meta property="og:image" content="https://webrushbrasil.com.br/images/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content="https://webrushbrasil.com.br/images/og-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "WebRush Brasil Blogs",
            "url": `https://webrushbrasil.com.br/blogs?page=${currentPage}`,
            "description": seoDescription,
            "publisher": {
              "@type": "Organization",
              "name": "WebRush Brasil",
              "logo": {
                "@type": "ImageObject",
                "url": "https://webrushbrasil.com.br/images/logo.png"
              }
            }
          })}
        </script>
      </Head>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[50vh] flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800"
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative text-center text-white z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-heading">
            Nuestros Blogs
          </h1>
          <p className="text-lg md:text-xl font-body text-gray-200 max-w-2xl mx-auto">
            Explora historias y conocimientos sobre tecnología, desarrollo web y marketing digital
          </p>
        </motion.div>
      </motion.section>

      {/* Blogs List */}
      <section className="container mx-auto px-4 py-16">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-block h-12 w-12 border-4 border-t-blue-500 border-gray-200 dark:border-gray-700 rounded-full mb-4"
              />
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Cargando blogs...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <p className="text-red-600 dark:text-red-400 text-lg font-medium">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Intentar de nuevo
                </button>
              </div>
            </div>
          </div>
        ) : blogs.length > 0 ? (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {blogs.map((blog, index) => (
                <motion.article
                  key={blog.slug || blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group rounded-xl shadow-lg overflow-hidden ${
                    theme === "dark" 
                      ? "bg-gray-800 hover:bg-gray-700 border border-gray-700" 
                      : "bg-white hover:bg-gray-50 border border-gray-200"
                  } hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={blog.cover_image || blog.image || "/images/placeholder.avif"}
                      alt={blog.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white font-heading line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {blog.title}
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4 font-body line-clamp-3 leading-relaxed">
                      {blog.summary || blog.description || blog.excerpt}
                    </p>
                    
                    {/* Metadata */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
                      {blog.author && (
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{blog.author}</span>
                        </div>
                      )}
                      {blog.createdAt && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(blog.createdAt).toLocaleDateString('es-ES')}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            +{blog.tags.length - 3} más
                          </span>
                        )}
                      </div>
                    )}
                    
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium font-body transition-colors group"
                    >
                      Leer Más
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex justify-center items-center gap-4 mt-12"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-3 rounded-full transition-all ${
                    currentPage === 1
                      ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed text-gray-400"
                      : "bg-blue-500 hover:bg-blue-600 text-white hover:scale-105"
                  } disabled:text-gray-500`}
                  aria-label="Página anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    Página {currentPage} de {totalPages}
                  </span>
                </div>
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-3 rounded-full transition-all ${
                    currentPage === totalPages
                      ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed text-gray-400"
                      : "bg-blue-500 hover:bg-blue-600 text-white hover:scale-105"
                  } disabled:text-gray-500`}
                  aria-label="Página siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8">
                <p className="text-gray-500 dark:text-gray-400 text-lg">No hay blogs disponibles</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}