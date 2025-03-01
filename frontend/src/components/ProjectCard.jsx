/* eslint-disable react/prop-types */
"use client"

import { motion } from "framer-motion"
import { ExternalLink, Github, ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      className="rounded-br-lg rounded-bl-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative w-full overflow-hidden">
        <img
          src={project.image_url || "/placeholder.svg"}
          alt={project.title}
          className="w-full h-[310px] object-contain"
        />

        {/* Overlay con gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
          <div className="flex gap-3">
            {project.project_url && (
              <Link
                to={project.project_url}
                className="text-white bg-yellow-500 hover:bg-yellow-400 font-bold text-sm py-2 px-4 rounded-lg transition duration-200 flex items-center gap-1.5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Demo <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            )}
            {project.github_url && (
              <Link
                to={project.github_url}
                className="text-gray-900 bg-white hover:bg-gray-100 font-bold text-sm py-2 px-4 rounded-lg transition duration-200 flex items-center gap-1.5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Código <Github className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>

        {project.featured && (
          <div className="absolute top-4 left-4 bg-yellow-500 text-gray-900 text-xs font-bold px-2.5 py-1 rounded-md">
            Destacado
          </div>
        )}
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-black text-gray-900 mb-2">{project.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{project.description}</p>
        <p className="text-sm text-gray-500 mt-auto">Projeto personalizável segundo requerimentos específicos.</p>
      </div>

      <div className="px-6 pb-5 pt-1 flex justify-between items-center">
        {project.project_url && (
          <Link
            to={project.project_url}
            className="text-green-600 hover:text-green-500 font-bold text-sm flex items-center group"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver projeto completo
            <ArrowUpRight className="ml-1.5 w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        )}
        {project.github_url && !project.project_url && (
          <Link
            to={project.github_url}
            className="text-green-600 hover:text-green-500 font-bold text-sm flex items-center group"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver repositório
            <Github className="ml-1.5 w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </motion.div>
  )
}

export default ProjectCard

