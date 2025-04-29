"use client"

import { motion, useInView, useAnimation } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { Code, Server, Database, Cloud, Box, Cpu, Atom, LayoutGrid, Smartphone, GitBranch, CloudCog, ChevronDown, ChevronUp } from 'lucide-react'
import { useLanguage } from "@/context/LanguageContext"



export default function TechnologiesSection() {
  const [expandedTech, setExpandedTech] = useState(null)
  const {language} = useLanguage()
  const toggleTech = (techName) => {
    setExpandedTech(expandedTech === techName ? null : techName)
  }

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  }

  const techVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    hover: { scale: 1.03, transition: { duration: 0.2 } },
  }

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })
  const controls = useAnimation()

  useEffect(() => {
    controls.start(isInView ? "visible" : "hidden")
  }, [isInView, controls])

  const translations = {
    es: {
      title: "Tecnologías",
      description:
        "Utilizamos las tecnologías más modernas y eficientes para desarrollar soluciones robustas y escalables.",
      viewMore: "Ver más",
      viewLess: "Ver menos",
    },
    en: {
      title: "Technologies",
      description:
        "We use the most modern and efficient technologies to develop robust and scalable solutions.",
      viewMore: "View more",
      viewLess: "View less",
    },
    pt: {
      title: "Tecnologias",
      description:
        "Utilizamos as tecnologias mais modernas e eficientes para desenvolver soluções robustas e escaláveis.",
      viewMore: "Ver mais",
      viewLess: "Ver menos",
    },
  }

  const techData = {
    React: {
      icon: <Atom className="text-purple-400" />,
      description: {
        es: "Biblioteca de JavaScript para construir interfaces de usuario interactivas. React permite crear componentes reutilizables que actualizan eficientemente cuando cambian los datos.",
        en: "JavaScript library for building interactive user interfaces. React allows you to create reusable components that efficiently update when data changes.",
        pt: "Biblioteca JavaScript para construir interfaces de usuário interativas. React permite criar componentes reutilizáveis que atualizam eficientemente quando os dados mudam.",
      },
    },
    "Node.js": {
      icon: <Server className="text-purple-400" />,
      description: {
        es: "Entorno de ejecución de JavaScript del lado del servidor que permite construir aplicaciones de red escalables. Node.js utiliza un modelo de E/S sin bloqueo y orientado a eventos.",
        en: "Server-side JavaScript runtime environment that allows building scalable network applications. Node.js uses a non-blocking, event-driven I/O model.",
        pt: "Ambiente de execução JavaScript do lado do servidor que permite construir aplicações de rede escaláveis. Node.js usa um modelo de E/S não bloqueante e orientado a eventos.",
      },
    },
    Python: {
      icon: <Cpu className="text-purple-400" />,
      description: {
        es: "Lenguaje de programación interpretado, de alto nivel y propósito general. Python enfatiza la legibilidad del código con su notable uso de espacios en blanco significativos.",
        en: "Interpreted, high-level, general-purpose programming language. Python emphasizes code readability with its notable use of significant whitespace.",
        pt: "Linguagem de programação interpretada, de alto nível e de propósito geral. Python enfatiza a legibilidade do código com seu notável uso de espaço em branco significativo.",
      },
    },
    PHP: {
      icon: <Code className="text-purple-400" />,
      description: {
        es: "Lenguaje de programación de propósito general especialmente adecuado para el desarrollo web. PHP puede incrustarse en HTML y funciona en la mayoría de los servidores web.",
        en: "General-purpose scripting language especially suited for web development. PHP can be embedded into HTML and works on most web servers.",
        pt: "Linguagem de programação de propósito geral especialmente adequada para desenvolvimento web. PHP pode ser incorporado em HTML e funciona na maioria dos servidores web.",
      },
    },
    Laravel: {
      icon: <GitBranch className="text-purple-400" />,
      description: {
        es: "Framework de PHP para el desarrollo de aplicaciones web con una sintaxis elegante y expresiva. Laravel facilita tareas comunes utilizadas en la mayoría de los proyectos web.",
        en: "PHP framework for web application development with elegant and expressive syntax. Laravel simplifies common tasks used in most web projects.",
        pt: "Framework PHP para desenvolvimento de aplicações web com sintaxe elegante e expressiva. Laravel facilita tarefas comuns usadas na maioria dos projetos web.",
      },
    },
    "Vue.js": {
      icon: <LayoutGrid className="text-purple-400" />,
      description: {
        es: "Framework progresivo para construir interfaces de usuario. Vue.js está diseñado para ser adoptado incrementalmente y se integra fácilmente con otros proyectos y bibliotecas.",
        en: "Progressive framework for building user interfaces. Vue.js is designed to be incrementally adoptable and easily integrates with other projects and libraries.",
        pt: "Framework progressivo para construir interfaces de usuário. Vue.js é projetado para ser adotado incrementalmente e se integra facilmente com outros projetos e bibliotecas.",
      },
    },
    Angular: {
      icon: <Box className="text-purple-400" />,
      description: {
        es: "Plataforma y framework para construir aplicaciones cliente en HTML y TypeScript. Angular implementa funcionalidades básicas y opcionales como un conjunto de bibliotecas TypeScript.",
        en: "Platform and framework for building client applications in HTML and TypeScript. Angular implements core and optional functionality as a set of TypeScript libraries.",
        pt: "Plataforma e framework para construir aplicações cliente em HTML e TypeScript. Angular implementa funcionalidades básicas e opcionais como um conjunto de bibliotecas TypeScript.",
      },
    },
    "React Native": {
      icon: <Smartphone className="text-purple-400" />,
      description: {
        es: "Framework para construir aplicaciones nativas para Android e iOS utilizando React. Permite desarrollar aplicaciones móviles utilizando solo JavaScript.",
        en: "Framework for building native Android and iOS applications using React. It allows you to develop mobile applications using only JavaScript.",
        pt: "Framework para construir aplicações nativas para Android e iOS usando React. Permite desenvolver aplicações móveis usando apenas JavaScript.",
      },
    },
    Flutter: {
      icon: <Smartphone className="text-purple-400" />,
      description: {
        es: "Kit de desarrollo de interfaz de usuario de Google para crear aplicaciones nativas compiladas para móvil, web y escritorio desde una única base de código.",
        en: "Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.",
        pt: "Kit de desenvolvimento de interface de usuário do Google para criar aplicações compiladas nativamente para dispositivos móveis, web e desktop a partir de uma única base de código.",
      },
    },
    AWS: {
      icon: <Cloud className="text-purple-400" />,
      description: {
        es: "Plataforma de servicios de nube que ofrece potencia computacional, almacenamiento de bases de datos, entrega de contenido y otras funcionalidades.",
        en: "Cloud services platform offering compute power, database storage, content delivery, and other functionality.",
        pt: "Plataforma de serviços em nuvem que oferece poder computacional, armazenamento de banco de dados, entrega de conteúdo e outras funcionalidades.",
      },
    },
    Docker: {
      icon: <CloudCog className="text-purple-400" />,
      description: {
        es: "Plataforma de contenedores que permite a los desarrolladores empaquetar aplicaciones en contenedores, unidades estandarizadas para el desarrollo de software.",
        en: "Container platform that allows developers to package applications into containers, standardized units for software development.",
        pt: "Plataforma de contêineres que permite aos desenvolvedores empacotar aplicações em contêineres, unidades padronizadas para desenvolvimento de software.",
      },
    },
    MongoDB: {
      icon: <Database className="text-purple-400" />,
      description: {
        es: "Base de datos NoSQL orientada a documentos que almacena datos en documentos similares a JSON con esquemas dinámicos, haciendo que la integración de datos sea más fácil y rápida.",
        en: "NoSQL document-oriented database that stores data in JSON-like documents with dynamic schemas, making the integration of data easier and faster.",
        pt: "Banco de dados NoSQL orientado a documentos que armazena dados em documentos semelhantes a JSON com esquemas dinâmicos, tornando a integração de dados mais fácil e rápida.",
      },
    },
    PostgreSQL: {
      icon: <Database className="text-purple-400" />,
      description: {
        es: "Sistema de gestión de bases de datos relacional orientado a objetos, de código abierto y con énfasis en la extensibilidad y el cumplimiento de estándares.",
        en: "Object-relational database management system with an emphasis on extensibility and standards compliance.",
        pt: "Sistema de gerenciamento de banco de dados relacional orientado a objetos, de código aberto e com ênfase na extensibilidade e conformidade com padrões.",
      },
    },
    MySQL: {
      icon: <Database className="text-purple-400" />,
      description: {
        es: "Sistema de gestión de bases de datos relacional de código abierto. MySQL es una parte central de la pila LAMP para aplicaciones web.",
        en: "Open-source relational database management system. MySQL is a central component of the LAMP web application stack.",
        pt: "Sistema de gerenciamento de banco de dados relacional de código aberto. MySQL é um componente central da pilha LAMP para aplicações web.",
      },
    },
    "Next.js": {
      icon: <Code className="text-purple-400" />,
      description: {
        es: "Plataforma de desarrollo web para React que permite construir aplicaciones web de alto rendimiento y escalabilidad.",
        en: "Next.js is a React framework for building server-rendered and statically-exported React apps.",
        pt: "Plataforma de desenvolvimento web para React que permite construir aplicações web de alto desempenho e escalabilidade.",
      },
    },
    
  }

  return (
    <section ref={sectionRef} className="py-12 px-4 ">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-teal-600 mb-6"
        >
          {translations[language].title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
          }}
          className="text-center text-gray-300 max-w-2xl mx-auto mb-10 text-sm md:text-base"
        >
          {translations[language].description}
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {Object.entries(techData).map(([techName, techInfo], i) => (
            <motion.div
              key={i}
              custom={i}
              variants={techVariants}
              whileHover="hover"
              className="bg-gray-800 rounded-lg border border-gray-700 hover:border-purple-500 transition-all overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 flex items-center justify-center">{techInfo.icon}</div>
                    <h3 className="font-medium text-white">{techName}</h3>
                  </div>
                  <button
                    onClick={() => toggleTech(techName)}
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                    aria-label={expandedTech === techName ? translations[language].viewLess : translations[language].viewMore}
                  >
                    {expandedTech === techName ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                </div>
                
                {expandedTech === techName && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-sm text-gray-300"
                  >
                    <p>{techInfo.description[language]}</p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
