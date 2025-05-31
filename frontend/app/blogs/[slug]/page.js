"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { format } from "date-fns";

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
          const response = await axios.get(`https://webrushapi.onrender.com/api/blogs/slug/${slug}`);
          setBlog(response.data.data);
        } catch (err) {
          setError("No se pudo cargar el blog");
          console.error("API Error:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block h-8 w-8 border-4 border-t-blue-500 border-gray-200 dark:border-gray-700 rounded-full"
          />
          <p className="text-gray-500 dark:text-gray-400 mt-4 font-medium">Cargando...</p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
Enviar archivo adjunto
      <p className="text-center text-red-500 text-lg font-medium">{error}</p>
    </div>
    );
  }
  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-center text-gray-400 text-lg font-medium">Blog no encontrado</p>
      </div>
    );
  }

  const seoTitle = blog.seo_title || `${blog.title} | Blog | WebRush Brasil`;
  const seoDescription = blog.seo_description || blog.summary;
  const publishedDate = blog.createdAt ? format(new Date(blog.createdAt), "PPP") : "Fecha no disponible";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={blog.seo_keywords?.join(", ") || blog.tags?.join(", ") || "blog, artículo, WebRush Brasil"} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content={blog.author || "WebRush Brasil"} />
        <link rel="canonical" href={`https://webrushbrasil.com.br/blogs/${slug}`} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={`https://webrushbrasil.com.br/blogs/${slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="WebRush Brasil" />
        <meta property="og:image" content={blog.cover_image || "https://webrushbrasil.com.br/images/og-image.jpg"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={blog.cover_image || "https://webrushbrasil.com.br/images/og-image.jpg"} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": blog.title,
            "description": seoDescription,
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
            "datePublished": blog.createdAt || null,
            "image": blog.cover_image || null,
            "url": `https://webrushbrasil.com.br/blogs/${slug}`
          })}
        </script>
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 md:px-8 py-24"
      >
        {/* Hero Section */}
        <div className="relative mb-12">
          <motion.img
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            src={blog.cover_image || "/images/placeholder.avif"}
            alt={blog.title}
            className="w-full h-64 md:h-[400px] object-cover rounded-xl shadow-lg"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl" />
        </div>

        {/* Blog Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400"
          >
            {blog.title}
          </motion.h1>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center gap-6 mb-8 text-gray-600 dark:text-gray-300 text-sm md:text-base"
          >
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" aria-hidden="true" />
              <span>{blog.author || "WebRush Brasil"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" aria-hidden="true" />
              <span>{publishedDate}</span>
            </div>
          </motion.div>

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
                whileHover={{ scale: 1.05, backgroundColor: theme === "dark" ? "#1e3a8a" : "#93c5fd" }}
                transition={{ duration: 0.2 }}
                className="text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full cursor-default"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <motion.article
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className={`prose prose-lg ${theme === "dark" ? "prose-invert" : ""} max-w-none text-gray-900 dark:text-gray-100`}
          >
            <ReactMarkdown
              components={{
                h2: ({ children }) => (
                  <h2 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-gray-800 dark:text-gray-200">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl md:text-2xl font-medium mt-6 mb-3 text-gray-800 dark:text-gray-200">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="leading-relaxed mb-4 text-gray-700 dark:text-gray-300">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300">{children}</ol>
                ),
                code: ({ inline, children }) =>
                  inline ? (
                    <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm text-gray-800 dark:text-gray-200">
                      {children}
                    </code>
                  ) : (
                    <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 my-4 text-sm overflow-x-auto">
                      <code>{children}</code>
                    </pre>
                  ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 py-2 my-4 italic text-gray-600 dark:text-gray-400">
                    {children}
                  </blockquote>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {blog.content}
            </ReactMarkdown>
          </motion.article>

          {/* Back Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/blogs")}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg shadow-md hover:from-purple-700 hover:to-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Volver al Blog
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}