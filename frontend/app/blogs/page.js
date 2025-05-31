"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import Head from "next/head";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
        const response = await axios.get(`https://webrushapi.onrender.com/api/blogs?page=${currentPage}`);
        console.log("API Response:", response.data);
        setBlogs(Array.isArray(response.data.data) ? response.data.data : []);
        setTotalPages(response.data.pagination?.pages || 1);
      } catch (err) {
        setError("No se pudieron cargar los blogs");
        setBlogs([]);
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      setLoading(true);
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
        className="relative h-[60vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/placeholder.avif')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative text-center text-white"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 font-heading bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
            Nuestros Blogs
          </h1>
          <p className="text-lg md:text-xl font-body text-gray-200">
            Explora historias y conocimientos sobre tecnología y marketing
          </p>
        </motion.div>
      </motion.section>

      {/* Blogs List */}
      <section className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Cargando...</p>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : blogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`rounded-lg shadow-lg overflow-hidden ${
                    theme === "dark" ? "bg-gray-700 hover:bg-gray-700" : "bg-gray-800 hover:bg-gray-700"
                  } hover:shadow-xl transition-all duration-300`}
                >
                  <img
                    src={blog.cover_image || "/images/placeholder.avif"}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white font-heading">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 font-body line-clamp-3">
                      {blog.summary}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="text-blue-500 hover:underline font-medium font-body"
                    >
                      Leer Más
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-full ${
                  currentPage === 1
                    ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white disabled:text-gray-500`}
                aria-label="Página anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <span className="text-gray-700 dark:text-gray-300">
                Página {currentPage} de {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full ${
                  currentPage === totalPages
                    ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                } text-white disabled:text-gray-500`}
                aria-label="Página siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-400">No hay blogs disponibles</p>
        )}
      </section>
    </div>
  );
}