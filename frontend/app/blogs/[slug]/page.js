"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import { Calendar, User, ArrowLeft, Clock, Share2 } from "lucide-react";
import { format } from "date-fns";
import { blogAPI } from "../../config/api";

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;
  const { theme } = useTheme();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) {
      const fetchBlog = async () => {
        try {
          setLoading(true);
          const data = await blogAPI.getBlogBySlug(slug);
          setBlog(data.data || data);
        } catch (err) {
          setError("No se pudo cargar el blog");
          console.error("Blog fetch error:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [slug]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.summary || blog.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('URL copiada al portapapeles');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block h-12 w-12 border-4 border-t-blue-500 border-gray-200 dark:border-gray-700 rounded-full mb-4"
          />
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">Cargando blog...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8 max-w-md">
            <p className="text-red-600 dark:text-red-400 text-lg font-medium mb-4">{error}</p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => router.push('/blogs')}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Volver a Blogs
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 max-w-md">
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-4">Blog no encontrado</p>
            <button 
              onClick={() => router.push('/blogs')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Volver a Blogs
            </button>
          </div>
        </div>
      </div>
    );
  }

  const seoTitle = blog.seo_title || blog.title ? `${blog.title} | Blog | WebRush Brasil` : 'Blog | WebRush Brasil';
  const seoDescription = blog.seo_description || blog.summary || blog.description || 'Artículo del blog de WebRush Brasil';
  const publishedDate = blog.createdAt ? format(new Date(blog.createdAt), "dd 'de' MMMM, yyyy", { locale: require('date-fns/locale/es') }) : "Fecha no disponible";
  const readingTime = blog.content ? Math.ceil(blog.content.split(' ').length / 200) : 5; // Estimate reading time

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={blog.seo_keywords?.join(", ") || blog.tags?.join(", ") || "blog, artículo, WebRush Brasil"} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={blog.author || "WebRush Brasil"} />
        <link rel="canonical" href={`https://webrushbrasil.com.br/blogs/${slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={`https://webrushbrasil.com.br/blogs/${slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="WebRush Brasil" />
        <meta property="og:image" content={blog.cover_image || blog.image || "https://webrushbrasil.com.br/images/og-image.jpg"} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={blog.cover_image || blog.image || "https://webrushbrasil.com.br/images/og-image.jpg"} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": blog.title,
            "description": seoDescription,
            "image": blog.cover_image || blog.image || "https://webrushbrasil.com.br/images/og-image.jpg",
            "author": {
              "@type": "Organization",
              "name": blog.author || "WebRush Brasil"
            },
            "publisher": {
              "@type": "Organization",
              "name": "WebRush Brasil",
              "logo": {
                "@type": "ImageObject",
                "url": "https://webrushbrasil.com.br/images/logo.png"
              }
            },
            "datePublished": blog.createdAt || new Date().toISOString(),
            "dateModified": blog.updatedAt || blog.createdAt || new Date().toISOString(),
            "url": `https://webrushbrasil.com.br/blogs/${slug}`,
            "wordCount": blog.content?.split(' ').length || 0,
            "timeRequired": `PT${readingTime}M`
          })}
        </script>
      </Head>

      {/* Navigation Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/blogs")}
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Volver al Blog</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="font-medium">Compartir</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 md:px-8 py-12"
      >
        {/* Hero Section */}
        <div className="relative mb-12">
        <motion.img
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            src={blog.cover_image || blog.image || "/images/placeholder.avif"}
            alt={blog.title}
            className="w-full h-64 md:h-[400px] object-cover rounded-xl shadow-lg"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-xl" />
        </div>

        {/* Blog Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight"
        >
          {blog.title}
        </motion.h1>

          {/* Metadata */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-6 mb-8 text-gray-600 dark:text-gray-300 text-sm md:text-base"
        >
            {blog.author && (
          <div className="flex items-center gap-2">
                <User className="w-5 h-5" aria-hidden="true" />
                <span className="font-medium">{blog.author}</span>
          </div>
            )}
          <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" aria-hidden="true" />
            <span>{publishedDate}</span>
          </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" aria-hidden="true" />
              <span>{readingTime} min de lectura</span>
            </div>
        </motion.div>

          {/* Summary */}
          {(blog.summary || blog.description) && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 rounded-r-lg"
            >
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 italic">
                {blog.summary || blog.description}
              </p>
            </motion.div>
          )}

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-3 mb-10"
        >
          {blog.tags.map((tag) => (
                <motion.span
              key={tag}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: theme === "dark" ? "#1e3a8a" : "#93c5fd" 
                  }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-2 rounded-full cursor-default"
            >
                  #{tag}
                </motion.span>
          ))}
        </motion.div>
          )}

          {/* Content */}
          <motion.article
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className={`prose prose-lg ${theme === "dark" ? "prose-invert" : ""} max-w-none text-gray-900 dark:text-gray-100`}
          >
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-gray-900 dark:text-white border-b-2 border-blue-500 pb-2">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl md:text-3xl font-semibold mt-10 mb-5 text-gray-800 dark:text-gray-200">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl md:text-2xl font-medium mt-8 mb-4 text-gray-800 dark:text-gray-200">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="leading-relaxed mb-6 text-gray-700 dark:text-gray-300 text-lg">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-6 space-y-3 text-gray-700 dark:text-gray-300 text-lg">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-6 space-y-3 text-gray-700 dark:text-gray-300 text-lg">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="pl-2">{children}</li>
                ),
                code: ({ inline, children }) =>
                  inline ? (
                    <code className="bg-gray-100 dark:bg-gray-800 rounded px-2 py-1 text-sm text-gray-800 dark:text-gray-200 font-mono">
                      {children}
                    </code>
                  ) : (
                    <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 my-6 text-sm overflow-x-auto border border-gray-200 dark:border-gray-700">
                      <code className="font-mono">{children}</code>
                    </pre>
                  ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-6 py-4 my-6 italic text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-r-lg">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline decoration-2 underline-offset-2 hover:decoration-blue-600 dark:hover:decoration-blue-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                img: ({ src, alt }) => (
                  <div className="my-8">
                    <img
                      src={src}
                      alt={alt}
                      className="w-full rounded-lg shadow-md"
                      loading="lazy"
                    />
                    {alt && (
                      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
                        {alt}
                      </p>
                    )}
                  </div>
                ),
              }}
            >
              {blog.content || 'Contenido no disponible'}
            </ReactMarkdown>
          </motion.article>

          {/* Call to Action */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-16 p-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white text-center"
          >
            <h3 className="text-2xl font-bold mb-4">¿Te gustó este artículo?</h3>
            <p className="text-lg mb-6 opacity-90">
              Descubre más contenido sobre desarrollo web y tecnología en nuestro blog
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/blogs")}
                className="px-6 py-3 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Ver más artículos
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push("/contacto")}
                className="px-6 py-3 border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-purple-600 transition-colors"
              >
                Contactanos
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}