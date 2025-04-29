"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/context/LanguageContext"
import translations from "@/translations"
import Link from "next/link"

export default function Projects() {
  const { language } = useLanguage()
  const t = translations[language]

  const projects = [
    {
      title: "Blog Urbano",
      description: t.projects.blogDescription,
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["TailwindCSS", "FramerMotion", "Next.Js"],
    },
    {
      title: "Landing Page",
      description: t.projects.landingDescription,
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Next.Js", "TailwindCSS", "Email JS"],
    },
    {
      title: "E-commerce",
      description: t.projects.ecommerceDescription,
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["MercadoPago", "React", "PostgreSQL", "Node.js"],
    },
    {
      title: "Portfólio",
      description: t.projects.portfolioDescription,
      image: "/placeholder.svg?height=300&width=500",
      technologies: ["Next.Js", "TailwindCSS", "FramerMotion"],
    },
  ]

  return (
    <section className="py-16 bg-[#0f172a] transition-colors duration-300">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">{t.projects.title}</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">{t.projects.description}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900 rounded-lg overflow-hidden card-hover shadow-md"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Link
                  href="#"
                  className="text-[#a855f7] hover:text-[#2563eb] transition-colors inline-flex items-center"
                >
                  {t.projects.viewProject}
                  <span className="material-icons ml-1 text-sm">arrow_forward</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/web-services"
            className="px-8 py-3 rounded-md bg-gradient-to-r from-[#a855f7] to-[#2563eb] text-white font-medium hover:opacity-90 transition-opacity inline-flex items-center"
          >
            {t.projects.viewAll}
            <span className="material-icons ml-1">arrow_forward</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
