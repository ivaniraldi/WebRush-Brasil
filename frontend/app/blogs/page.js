"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import Head from "next/head";
import { ChevronLeft, ChevronRight, Calendar, User } from "lucide-react";
import { blogAPI } from "../config/api";
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/translations";

export default function BlogsListPage() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
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

  const seoTitle = `${t.blog?.title || "Blogs"} - WebRush Brasil`;
  const seoDescription = t.blog?.subtitle || "Descubre nuestra colección de blogs sobre desarrollo web, tecnología, marketing digital y más en WebRush Brasil.";

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
            {t.blog?.title || "Nuestros Blogs"}
          </h1>
          <p className="text-lg md:text-xl font-body text-gray-200 max-w-2xl mx-auto">
            {t.blog?.subtitle || "Explora historias y conocimientos sobre tecnología, desarrollo web y marketing digital"}
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
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">{t.blog?.loading || "Cargando blogs..."}</p>
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
                  {t.blog?.tryAgain || "Intentar de nuevo"}
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
                  className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 shadow-xl hover:shadow-purple-500/10 transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]"
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative overflow-hidden">
                    <img
                      src={blog.cover_image || blog.image || "/images/placeholder.avif"}
                      alt={blog.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
                    
                    {/* Reading time badge */}
                                         <div className="absolute top-4 right-4 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-gray-700">
                       {blog.content ? Math.ceil(blog.content.split(' ').length / 200) : 5} {t.blog?.readingTime || "min"}
                     </div>
                  </div>
                  
                  <div className="relative p-6 space-y-4">
                    <h2 className="text-xl font-bold text-white font-heading line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                      {blog.title}
                    </h2>
                    
                    <p className="text-gray-300 font-body line-clamp-3 leading-relaxed text-sm">
                      {blog.summary || blog.description || blog.excerpt}
                    </p>
                    
                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tag}
                            className={`text-xs px-3 py-1 rounded-full font-medium border transition-colors duration-300 ${
                              tagIndex === 0 
                                ? 'bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30' 
                                : tagIndex === 1 
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30'
                                : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/30'
                            }`}
                          >
                            #{tag}
                          </span>
                        ))}
                        {blog.tags.length > 3 && (
                          <span className="text-xs text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
                            +{blog.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Metadata */}
                    <div className="flex items-center justify-between text-sm text-gray-400 pt-2 border-t border-gray-700/50">
                      <div className="flex items-center gap-4">
                        {blog.author && (
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4 text-purple-400" />
                            <span>{typeof blog.author === 'object' ? blog.author.name || blog.author.email : blog.author}</span>
                          </div>
                        )}
                        {blog.createdAt && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4 text-blue-400" />
                            <span>{new Date(blog.createdAt).toLocaleDateString(
                             language === 'pt' ? 'pt-BR' : language === 'en' ? 'en-US' : 'es-ES'
                           )}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Read more button */}
                    <div className="pt-4">
                      <Link
                        href={`/blogs/${blog.slug}`}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:from-purple-500 hover:to-blue-500 hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 group/btn"
                      >
                                                 {t.blog?.readMore || "Leer Artículo"}
                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute -bottom-1 -left-1 w-16 h-16 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
                  aria-label={t.blog?.previousPage || "Página anterior"}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="flex items-center gap-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">
                    {t.blog?.page || "Página"} {currentPage} {t.blog?.of || "de"} {totalPages}
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
                  aria-label={t.blog?.nextPage || "Página siguiente"}
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
                                        <p className="text-gray-500 dark:text-gray-400 text-lg">{t.blog?.noBlogs || "No hay blogs disponibles"}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {t.blog?.refresh || "Actualizar"}
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}