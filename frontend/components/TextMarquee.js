    "use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { BadgeCheck, Sparkles, Rocket, ShieldCheck, Cog, Users, Zap, Heart, Globe } from "lucide-react";

export default function TextMarquee() {
  const { language } = useLanguage();

  const [width, setWidth] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [marqueeSpeed, setMarqueeSpeed] = useState(30);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();

    const handleResize = () => updateWidth();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Traducciones manuales
  const translations = {
    es: {
      title: "Nuestro ADN",
      description: "Cada elemento nos impulsa hacia adelante.",
      features: [
        { icon: BadgeCheck, label: "Calidad Asegurada" },
        { icon: Sparkles, label: "Innovación Constante" },
        { icon: Rocket, label: "Despegue Rápido" },
        { icon: ShieldCheck, label: "Seguridad Robusta" },
        { icon: Cog, label: "Automatización Eficiente" },
        { icon: Users, label: "Trabajo en Equipo" },
        { icon: Zap, label: "Alto Rendimiento" },
        { icon: Heart, label: "Pasión por Detalles" },
        { icon: Globe, label: "Alcance Global" },
      ],
    },
    en: {
      title: "Our DNA",
      description: "Each element drives us forward.",
      features: [
        { icon: BadgeCheck, label: "Quality Assured" },
        { icon: Sparkles, label: "Constant Innovation" },
        { icon: Rocket, label: "Rapid Launch" },
        { icon: ShieldCheck, label: "Robust Security" },
        { icon: Cog, label: "Efficient Automation" },
        { icon: Users, label: "Teamwork" },
        { icon: Zap, label: "High Performance" },
        { icon: Heart, label: "Passion for Details" },
        { icon: Globe, label: "Global Reach" },
      ],
    },
    pt: {
      title: "Nosso DNA",
      description: "Cada elemento nos impulsiona para frente.",
      features: [
        { icon: BadgeCheck, label: "Qualidade Garantida" },
        { icon: Sparkles, label: "Inovação Constante" },
        { icon: Rocket, label: "Lançamento Rápido" },
        { icon: ShieldCheck, label: "Segurança Robusta" },
        { icon: Cog, label: "Automatização Eficiente" },
        { icon: Users, label: "Trabalho em Equipe" },
        { icon: Zap, label: "Alto Desempenho" },
        { icon: Heart, label: "Paixão pelos Detalhes" },
        { icon: Globe, label: "Alcance Global" },
      ],
    },
  };

  const { title, description, features } = translations[language] || translations["en"];

  const featuresWithColors = features.map((feature) => ({
    ...feature,
    color: getFeatureColor(feature.label),
  }));

  const allFeatures = [...featuresWithColors, ...featuresWithColors];

  function getFeatureColor(label) {
    switch (label) {
      case "Calidad Asegurada":
      case "Quality Assured":
      case "Qualidade Garantida":
        return "bg-gradient-to-br from-emerald-500 to-teal-500";
      case "Innovación Constante":
      case "Constant Innovation":
      case "Inovação Constante":
        return "bg-gradient-to-br from-violet-500 to-purple-500";
      case "Despegue Rápido":
      case "Rapid Launch":
      case "Lançamento Rápido":
        return "bg-gradient-to-br from-orange-500 to-amber-500";
      case "Seguridad Robusta":
      case "Robust Security":
      case "Segurança Robusta":
        return "bg-gradient-to-br from-blue-500 to-sky-500";
      case "Automatización Eficiente":
      case "Efficient Automation":
      case "Automatização Eficiente":
        return "bg-gradient-to-br from-slate-500 to-gray-500";
      case "Trabajo en Equipo":
      case "Teamwork":
      case "Trabalho em Equipe":
        return "bg-gradient-to-br from-pink-500 to-rose-500";
      case "Alto Rendimiento":
      case "High Performance":
      case "Alto Desempenho":
        return "bg-gradient-to-br from-yellow-500 to-amber-500";
      case "Pasión por Detalles":
      case "Passion for Details":
      case "Paixão pelos Detalhes":
        return "bg-gradient-to-br from-red-500 to-rose-500";
      case "Alcance Global":
      case "Global Reach":
      case "Alcance Global":
        return "bg-gradient-to-br from-cyan-500 to-blue-500";
      default:
        return "bg-gradient-to-br from-gray-400 to-gray-500";
    }
  }

  const handleMouseEnter = () => setMarqueeSpeed(80);
  const handleMouseLeave = () => setMarqueeSpeed(30);

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br  from-gray-900 to-gray-800">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-purple-500/20 rounded-full blur-3xl -translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-blue-500/20 rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div className="container mx-auto px-4 mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-5 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>
      </div>

      <div
        ref={containerRef}
        className="relative w-full overflow-hidden py-8"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 bg-gray-800/20 backdrop-blur-xl border-y border-gray-700/30 shadow-lg"></div>

        <motion.div
          className="relative flex items-center whitespace-nowrap"
          animate={{
            x: [0, -width],
          }}
          transition={{
            x: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: marqueeSpeed,
              ease: "linear",
            },
          }}
        >
          {allFeatures.map((feature, index) => (
            <motion.div
              key={`${feature.label}-${index}`}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { type: "spring", stiffness: 300, damping: 10 },
              }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className={`relative mx-4 md:mx-6 flex items-center gap-3 px-5 py-3.5 
                bg-white/5 backdrop-blur-md rounded-full 
                border border-gray-600/30 
                shadow-lg hover:shadow-xl
                text-white 
                font-medium text-sm md:text-base flex-shrink-0 
                transition-all duration-300
                ${hoveredIndex === index ? "bg-white/10 z-10" : "z-0"}
              `}
            >
              <div className={`p-1.5 rounded-full ${feature.color} flex items-center justify-center`}>
                <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </div>
              <span>{feature.label}</span>

              {hoveredIndex === index && (
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-[200%]"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, repeatType: "loop" }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
