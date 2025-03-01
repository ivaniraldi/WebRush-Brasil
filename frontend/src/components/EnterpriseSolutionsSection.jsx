/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import 'react-lazy-load-image-component/src/effects/blur.css';

// Animações para o componente
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Componente reutilizável
const EnterpriseSolutionsSection = ({ className = "" }) => {
  return (
    <motion.section
      className={`py-28 bg-gradient-to-b from-gray-50 to-white ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      aria-label="Soluções Empresariais Integradas"
    >
      <div className="container mx-auto px-6">
        {/* Cabeçalho */}
        <motion.div
          className="text-center mb-6"
          variants={itemVariants}
        >
          <span className="inline-block px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-bold rounded-full mb-6 shadow-lg">
            SOLUÇÕES EMPRESARIAIS
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Gestão Integral para sua Empresa
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Oferecemos soluções robustas e personalizadas para otimizar cada aspecto do seu negócio, 
            com foco inabalável em segurança e eficiência.
          </p>
        </motion.div>

        {/* Grid de serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Serviço 1: Controle de Estoque */}
          <motion.div
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-400 via-green-500 to-green-600 p-6 shadow-lg shadow-green-500/50 border-b-4 border-green-700 hover:from-green-500 hover:to-green-400 transition-all duration-300"
            variants={itemVariants}
          >
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0l-8 4-8-4"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Controle de Estoque</h3>
            <p className="text-white/90">
              Gerencie seu inventário em tempo real com ferramentas precisas e adaptadas ao seu negócio.
            </p>
          </motion.div>

          {/* Serviço 2: Faturamento */}
          <motion.div
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 p-6 shadow-lg shadow-yellow-500/50 border-b-4 border-yellow-700 hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300"
            variants={itemVariants}
          >
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Faturamento</h3>
            <p className="text-white/90">
              Automatize e personalize seu processo de faturamento para economizar tempo e cumprir normas.
            </p>
          </motion.div>

          {/* Serviço 3: Gestão de Funcionários */}
          <motion.div
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-400 via-green-500 to-green-600 p-6 shadow-lg shadow-green-500/50 border-b-4 border-green-700 hover:from-green-500 hover:to-green-400 transition-all duration-300"
            variants={itemVariants}
          >
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 1.857a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Gestão de Funcionários</h3>
            <p className="text-white/90">
              Administre horários, folha de pagamento e desempenho com sistemas integrados e fáceis de usar.
            </p>
          </motion.div>

          {/* Serviço 4: Contabilidade */}
          <motion.div
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 p-6 shadow-lg shadow-yellow-500/50 border-b-4 border-yellow-700 hover:from-yellow-500 hover:to-yellow-400 transition-all duration-300"
            variants={itemVariants}
          >
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Contabilidade</h3>
            <p className="text-white/90">
              Mantenha um controle financeiro preciso com relatórios detalhados e ferramentas avançadas.
            </p>
          </motion.div>
        </div>

        {/* Seção de Segurança e Robustez */}
        <motion.div
          className="mt-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-10 shadow-xl text-white"
          variants={itemVariants}
        >
          <h3 className="text-3xl font-bold mb-10 text-center">
            Robustez e Segurança <span className="text-green-400">Garantidas</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-400 mr-3 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Segurança de Dados</h4>
                  <p className="text-gray-300">
                    Implementamos criptografia avançada e backups regulares para proteger suas informações.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-400 mr-3 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Proteção DDoS</h4>
                  <p className="text-gray-300">
                    Defendemos seus sistemas contra ataques com monitoramento contínuo e firewalls robustos.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300">
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-400 mr-3 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">Sistemas Escaláveis</h4>
                  <p className="text-gray-300">
                    Designs modulares que crescem com sua empresa, adaptando-se a qualquer necessidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="flex justify-center mt-12"
          variants={itemVariants}
        >
          <Link
            to="/contato"
            className="group bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-500 text-white font-bold py-4 px-10 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
            aria-label="Solicitar mais informações"
          >
            SOLICITAR MAIS INFORMAÇÕES
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default EnterpriseSolutionsSection;