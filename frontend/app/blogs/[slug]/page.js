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
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/translations";



export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;
  const { theme } = useTheme();
  const { language } = useLanguage();
  const t = translations[language];
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
          setError(t.blog?.error || "No se pudo cargar el blog");
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
      if (navigator.clipboard && navigator.clipboard.writeText) {
        try {
          await navigator.clipboard.writeText(window.location.href);
          alert('URL copiada al portapapeles');
        } catch (err) {
          console.log('Error copying to clipboard:', err);
          // Fallback alternativo para navegadores que no soportan clipboard
          const textArea = document.createElement('textarea');
          textArea.value = window.location.href;
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand('copy');
            alert('URL copiada al portapapeles');
          } catch (fallbackErr) {
            console.log('Fallback copy failed:', fallbackErr);
            alert('No se pudo copiar la URL. Por favor, cópiala manualmente: ' + window.location.href);
          }
          document.body.removeChild(textArea);
        }
      } else {
        // Fallback alternativo para navegadores que no soportan clipboard
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          alert('URL copiada al portapapeles');
        } catch (fallbackErr) {
          console.log('Fallback copy failed:', fallbackErr);
          alert('No se pudo copiar la URL. Por favor, cópiala manualmente: ' + window.location.href);
        }
        document.body.removeChild(textArea);
      }
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
                        <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">{t.blog?.loading || "Cargando blog..."}</p>
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
                {t.blog?.backToBlogs || "Volver a Blogs"}
              </button>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {t.blog?.tryAgain || "Intentar de nuevo"}
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
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-4">{t.blog?.articleNotFound || "Blog no encontrado"}</p>
            <button 
              onClick={() => router.push('/blogs')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t.blog?.backToBlogs || "Volver a Blogs"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const seoTitle = blog.seo_title || blog.title ? `${blog.title} | Blog | WebRush Brasil` : 'Blog | WebRush Brasil';
  const seoDescription = blog.seo_description || blog.summary || blog.description || 'Artículo del blog de WebRush Brasil';
  // Configuración de locale para date-fns
  const getDateLocale = () => {
    if (language === 'pt') return require('date-fns/locale/pt-BR');
    if (language === 'en') return require('date-fns/locale/en-US');
    return require('date-fns/locale/es');
  };

  const getDateFormat = () => {
    if (language === 'pt') return "dd 'de' MMMM, yyyy";
    if (language === 'en') return "MMMM dd, yyyy";
    return "dd 'de' MMMM, yyyy";
  };

  const publishedDate = blog.createdAt 
    ? format(new Date(blog.createdAt), getDateFormat(), { locale: getDateLocale() }) 
    : (t.blog?.dateUnavailable || "Fecha no disponible");
  const readingTime = blog.content ? Math.ceil(blog.content.split(' ').length / 200) : 5; // Estimate reading time

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={blog.seo_keywords?.join(", ") || blog.tags?.join(", ") || "blog, artículo, WebRush Brasil"} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={typeof blog.author === 'object' ? (blog.author.name || blog.author.email) : (blog.author || "WebRush Brasil")} />
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
        
        {/* Enhanced Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": blog.title,
            "description": seoDescription,
            "image": {
              "@type": "ImageObject",
              "url": blog.cover_image || blog.image || "https://webrushbrasil.com.br/images/og-image.jpg",
              "width": 1200,
              "height": 630
            },
            "author": {
              "@type": blog.author?.name ? "Person" : "Organization",
              "name": typeof blog.author === 'object' ? (blog.author.name || blog.author.email) : (blog.author || "WebRush Brasil"),
              ...(blog.author?.email && { "email": blog.author.email })
            },
            "publisher": {
              "@type": "Organization",
              "name": "WebRush Brasil",
              "url": "https://webrushbrasil.com.br",
              "logo": {
                "@type": "ImageObject",
                "url": "https://webrushbrasil.com.br/images/logo.png",
                "width": 200,
                "height": 60
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://webrushbrasil.com.br/blogs/${slug}`
            },
            "datePublished": blog.createdAt || new Date().toISOString(),
            "dateModified": blog.updatedAt || blog.createdAt || new Date().toISOString(),
            "url": `https://webrushbrasil.com.br/blogs/${slug}`,
            "wordCount": blog.content?.split(' ').length || 0,
            "timeRequired": `PT${readingTime}M`,
            "articleSection": "Technology",
            "articleBody": blog.content?.substring(0, 500) + "...",
            ...(blog.tags && { "keywords": blog.tags.join(", ") }),
            "inLanguage": language === 'pt' ? "pt-BR" : language === 'en' ? "en-US" : "es-ES",
            "isAccessibleForFree": true,
            "potentialAction": {
              "@type": "ReadAction",
              "target": `https://webrushbrasil.com.br/blogs/${slug}`
            }
          })}
        </script>
        
        {/* Breadcrumb Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://webrushbrasil.com.br"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": "https://webrushbrasil.com.br/blogs"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": blog.title,
                "item": `https://webrushbrasil.com.br/blogs/${slug}`
              }
            ]
          })}
        </script>
      </Head>

      {/* Enhanced Navigation Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ scale: 1.05, x: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/blogs")}
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300 bg-gray-800/50 px-4 py-2 rounded-lg hover:bg-gray-700/50 border border-gray-700/50 hover:border-purple-500/30"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">{t.blog?.backToBlog || "Volver al Blog"}</span>
            </motion.button>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-500 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <Share2 className="w-4 h-4" />
                <span className="font-medium">{t.blog?.share || "Compartir"}</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Breadcrumb Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gray-900 px-4 py-3 border-b border-gray-800"
      >
        <div className="container mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-400">
            <button onClick={() => router.push("/")} className="hover:text-purple-400 transition-colors">
              {t.blog?.home || "Inicio"}
            </button>
            <span>/</span>
            <button onClick={() => router.push("/blogs")} className="hover:text-purple-400 transition-colors">
              {t.footer?.blog || "Blog"}
            </button>
            <span>/</span>
            <span className="text-white font-medium truncate max-w-md">{blog.title}</span>
          </nav>
        </div>
      </motion.div>

      <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 min-h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 md:px-8 py-12"
        >
          {/* Enhanced Hero Section */}
          <div className="relative mb-16">
            <motion.div
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="relative overflow-hidden rounded-3xl"
            >
              <img
                src={blog.cover_image || blog.image || "/images/placeholder.avif"}
                alt={blog.title}
                className="w-full h-64 md:h-[500px] object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent" />
              
              {/* Floating elements */}
                               <div className="absolute top-6 right-6 bg-gray-900/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-gray-700/50">
                   {readingTime} {t.blog?.readingTime || "min"} {t.blog?.readingTimeLabel || "de lectura"}
                 </div>
              
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  {/* Tags floating above title */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={tag}
                          className={`text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm border ${
                            index === 0 
                              ? 'bg-purple-500/30 text-purple-200 border-purple-500/50' 
                              : index === 1 
                              ? 'bg-blue-500/30 text-blue-200 border-blue-500/50'
                              : 'bg-indigo-500/30 text-indigo-200 border-indigo-500/50'
                          }`}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>

        {/* Enhanced Blog Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-700/30"
        >
          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl md:text-5xl font-bold mb-8 text-transparent bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text leading-tight"
          >
            {blog.title}
          </motion.h1>

          {/* Enhanced Metadata */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-6 mb-8 p-4 bg-gray-800/50 rounded-2xl border border-gray-700/50"
          >
            {blog.author && (
              <div className="flex items-center gap-2 text-gray-300">
                <div className="p-2 bg-purple-500/20 rounded-full">
                  <User className="w-4 h-4 text-purple-400" aria-hidden="true" />
                </div>
                <div>
                                     <span className="text-xs text-gray-400 block">{t.blog?.author || "Autor"}</span>
                  <span className="font-medium text-white">
                    {typeof blog.author === 'object' ? blog.author.name || blog.author.email : blog.author}
                  </span>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 text-gray-300">
              <div className="p-2 bg-blue-500/20 rounded-full">
                <Calendar className="w-4 h-4 text-blue-400" aria-hidden="true" />
              </div>
              <div>
                                 <span className="text-xs text-gray-400 block">{t.blog?.date || "Fecha"}</span>
                <span className="font-medium text-white">{publishedDate}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <div className="p-2 bg-indigo-500/20 rounded-full">
                <Clock className="w-4 h-4 text-indigo-400" aria-hidden="true" />
              </div>
              <div>
                                 <span className="text-xs text-gray-400 block">{t.blog?.readingTimeLabel || "Lectura"}</span>
                                 <span className="font-medium text-white">{readingTime} {t.blog?.readingTime || "min"}</span>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Summary */}
          {(blog.summary || blog.description) && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-8 p-6 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-indigo-500/10 border border-purple-500/30 rounded-2xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
                                 <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">{t.blog?.summary || "Resumen"}</span>
              </div>
              <p className="text-lg leading-relaxed text-gray-300 italic">
                {blog.summary || blog.description}
              </p>
            </motion.div>
          )}

          {/* Enhanced Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {blog.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`text-sm font-medium px-4 py-2 rounded-full cursor-default border transition-all duration-300 ${
                    index % 3 === 0 
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 hover:bg-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20' 
                      : index % 3 === 1 
                      ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 hover:bg-blue-500/30 hover:shadow-lg hover:shadow-blue-500/20'
                      : 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 hover:bg-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/20'
                  }`}
                >
                  #{tag}
                </motion.span>
              ))}
            </motion.div>
          )}

          {/* Enhanced Content */}
          <motion.article
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="prose prose-lg prose-invert max-w-none"
          >
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text border-b-2 border-gradient-to-r from-purple-500 to-blue-500 pb-2">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl md:text-3xl font-semibold mt-10 mb-5 text-white">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl md:text-2xl font-medium mt-8 mb-4 text-gray-200">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="leading-relaxed mb-6 text-gray-300 text-lg">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-6 space-y-3 text-gray-300 text-lg">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-6 space-y-3 text-gray-300 text-lg">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="pl-2 hover:text-white transition-colors">{children}</li>
                ),
                code: ({ inline, children }) =>
                  inline ? (
                    <code className="bg-gray-800/80 border border-gray-700 rounded px-3 py-1 text-sm text-purple-300 font-mono">
                      {children}
                    </code>
                  ) : (
                    <pre className="bg-gray-800/80 border border-gray-700 rounded-xl p-6 my-8 text-sm overflow-x-auto">
                      <code className="font-mono text-gray-300">{children}</code>
                    </pre>
                  ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-gradient-to-b from-purple-500 to-blue-500 pl-6 py-4 my-6 italic text-gray-300 bg-gray-800/50 rounded-r-xl backdrop-blur-sm">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text hover:from-purple-300 hover:to-blue-300 underline decoration-2 underline-offset-2 hover:decoration-purple-400 transition-all duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                img: ({ src, alt }) => (
                  <div className="my-10">
                    <div className="relative overflow-hidden rounded-2xl border border-gray-700/50">
                      <img
                        src={src}
                        alt={alt}
                        className="w-full object-cover hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    {alt && (
                      <p className="text-center text-sm text-gray-400 mt-3 italic">
                        {alt}
                      </p>
                    )}
                  </div>
                ),
              }}
            >
              {blog.content || t.blog?.contentUnavailable || 'Contenido no disponible'}
            </ReactMarkdown>
          </motion.article>

          {/* Enhanced Call to Action */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-indigo-600/20 backdrop-blur-sm border border-purple-500/30 p-12 text-center"
          >
            {/* Background decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-tr from-blue-500/30 to-indigo-500/30 rounded-full blur-2xl" />
            
            <div className="relative z-10">
              <motion.h3 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
                className="text-3xl md:text-4xl font-bold mb-4 text-transparent bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text"
                             >
                 {t.blog?.likedArticle || "¿Te gustó este artículo?"}
               </motion.h3>
              
              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                                 className="text-lg mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed"
               >
                 {t.blog?.discoverMore || "Descubre más contenido sobre desarrollo web, tecnología y marketing digital. Únete a nuestra comunidad y mantente al día con las últimas tendencias."}
               </motion.p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.6 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/blogs")}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 transform"
                >
                                     {t.blog?.readMoreArticles || "Ver más artículos"}
                </motion.button>
                
                <motion.button
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.7 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push("/contacto")}
                  className="px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 hover:border-white/50 backdrop-blur-sm transition-all duration-300"
                >
                                     {t.blog?.contactUs || "Contáctanos"}
                </motion.button>
              </div>
              
              {/* Social sharing hint */}
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.8 }}
                className="mt-8 pt-6 border-t border-gray-700/50"
              >
                                 <p className="text-sm text-gray-400 mb-3">{t.blog?.shareWithNetwork || "Comparte este artículo con tu red"}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                                     <span className="text-sm font-medium">{t.blog?.shareArticle || "Compartir artículo"}</span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      </div>
    </div>
  );
}