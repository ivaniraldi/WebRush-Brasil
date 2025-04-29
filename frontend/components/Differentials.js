"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import translations from "@/translations";
import { LucideCheck, LucideUsers, LucideHeadphones } from "lucide-react";

export default function Differentials() {
  const { language } = useLanguage();
  const t = translations[language];

  // Mapeo de iconos de material a Lucide
  const getIcon = (iconName) => {
    switch (iconName) {
      case "verified":
        return <LucideCheck className="w-6 h-6" />;
      case "groups":
        return <LucideUsers className="w-6 h-6" />;
      case "support_agent":
        return <LucideHeadphones className="w-6 h-6" />;
      default:
        return <LucideCheck className="w-6 h-6" />;
    }
  };

  const differentials = [
    {
      title: t.differentials.items[0].title,
      description: t.differentials.items[0].description,
      icon: "verified",
      color: "from-purple-500/80 to-blue-600/80",
      hoverColor: "group-hover:from-purple-500/90 group-hover:to-blue-600/90",
    },
    {
      title: t.differentials.items[1].title,
      description: t.differentials.items[1].description,
      icon: "groups",
      color: "from-blue-600/80 to-purple-700/80",
      hoverColor: "group-hover:from-blue-600/90 group-hover:to-purple-700/90",
    },
    {
      title: t.differentials.items[2].title,
      description: t.differentials.items[2].description,
      icon: "support_agent",
      color: "from-purple-700/80 to-purple-500/80",
      hoverColor: "group-hover:from-purple-700/90 group-hover:to-purple-500/90",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Fondo con gradiente y efecto de desenfoque */}
      <div className="absolute inset-0 bg-slate-900/10 z-0">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_40%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.3),transparent_40%)]"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl py-1 md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
            {t.differentials.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t.differentials.description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-3 gap-8 md:gap-10"
        >
          {differentials.map((item, index) => (
            <motion.div key={index} variants={itemVariants} className="group relative">
              <div className="relative h-full p-8 md:p-10 rounded-2xl overflow-hidden transition-all duration-300 transform group-hover:translate-y-[-5px]">
                {/* Fondo glassmorphism */}
                <div className="absolute inset-0 bg-gray-800/30 backdrop-blur-xl rounded-2xl border border-gray-700/20 shadow-lg z-0"></div>

                {/* Gradiente de fondo */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} ${item.hoverColor} opacity-20 transition-opacity duration-300 rounded-2xl z-0`}
                ></div>

                {/* Contenido */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${item.color} ${item.hoverColor} flex items-center justify-center mb-6 shadow-lg transition-all duration-300 group-hover:shadow-xl`}
                  >
                    <div className="text-white">{getIcon(item.icon)}</div>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-white transition-colors duration-300">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
