import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { FaRocket, FaCode, FaChartLine, FaUsers, FaLightbulb, FaHandshake } from "react-icons/fa"

const AboutUs = () => {
  const services = [
    {
      icon: <FaCode className="w-8 h-8" />,
      title: "Desenvolvimento Web",
      description: "Criamos sites modernos e funcionais que destacam sua marca e geram resultados.",
      link: "/sites"
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Marketing Digital",
      description: "Estratégias eficazes para aumentar sua presença online e alcançar seus objetivos.",
      link: "/marketing"
    },
    {
      icon: <FaRocket className="w-8 h-8" />,
      title: "Otimização SEO",
      description: "Melhoramos sua visibilidade nos mecanismos de busca para atrair mais clientes.",
      link: "/marketing"
    }
  ]

  const values = [
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Foco no Cliente",
      description: "Seu sucesso é nossa prioridade. Trabalhamos em estreita colaboração para entender suas necessidades."
    },
    {
      icon: <FaLightbulb className="w-8 h-8" />,
      title: "Inovação Constante",
      description: "Mantemos-nos atualizados com as últimas tendências e tecnologias para oferecer o melhor."
    },
    {
      icon: <FaHandshake className="w-8 h-8" />,
      title: "Compromisso Total",
      description: "Dedicamos-nos a entregar resultados excepcionais em cada projeto que empreendemos."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <motion.section
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/80 z-10"></div>
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            className="w-full h-full"
          >
            <img
              src="https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBvcnRmb2xpbyUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D"
              alt="Background da agência"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-20 text-white text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            NOSSA HISTÓRIA
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Transformando negócios através de soluções digitais inovadoras
          </motion.p>
        </div>
      </motion.section>

      {/* About Us Section */}
      <motion.section
        className="py-24 bg-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-black mb-6 text-neon-green">Sobre Nós</h2>
              <p className="text-xl text-gray-300 mb-6">
                Na WebRush Brasil, somos mais que uma agência digital. Somos uma equipe apaixonada de profissionais
                dedicados a transformar ideias em experiências digitais excepcionais. Com anos de experiência no
                mercado, já ajudamos centenas de empresas a alcançarem seus objetivos no mundo digital.
              </p>
              <p className="text-xl text-gray-300 mb-6">
                Nossa missão é simples mas poderosa: impulsionar o crescimento de nossos clientes através
                de soluções digitais inovadoras e eficazes. Acreditamos na combinação perfeita entre
                criatividade e tecnologia para criar resultados extraordinários.
              </p>
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Nossa equipe"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        className="py-24 bg-gray-900"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black mb-12 text-center text-white">Nossos Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-neon-green mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-300 mb-4">{service.description}</p>
                <Link
                  to={service.link}
                  className="text-neon-green hover:text-neon-blue transition-colors duration-300"
                >
                  Saiba mais →
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        className="py-24 bg-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-black mb-12 text-center text-white">Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-neon-green mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-8">Pronto para Transformar seu Negócio?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Vamos trabalhar juntos para criar uma presença digital que se destaque e gere resultados.
          </p>
          <Link
            to="/contato"
            className="inline-block bg-neon-green text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-neon-blue transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Entre em Contato
          </Link>
        </div>
      </motion.section>
    </div>
  )
}

export default AboutUs

