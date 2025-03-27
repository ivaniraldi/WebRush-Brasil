import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-9xl font-bold text-neon-green mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-4">Página não encontrada</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-neon-green text-gray-900 font-bold rounded-lg hover:bg-neon-green/90 transition-colors duration-300"
        >
          Voltar para a página inicial
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound; 