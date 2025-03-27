import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <motion.footer 
      className="bg-gray-900/95 backdrop-blur-md text-white py-12 mt-auto w-full border-t border-gray-800/50"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={fadeIn}
      itemScope
      itemType="https://schema.org/Organization"
      aria-label="Footer da WebRush Brasil"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1 - Logo y descripción */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-white hover:text-neon-green transition-colors">
              WebRush Brasil
            </Link>
            <p className="text-gray-400">
              Transformando presença digital com soluções inovadoras e resultados excepcionais.
            </p>
          </div>

          {/* Columna 2 - Enlaces rápidos */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/sites" className="text-gray-400 hover:text-neon-green transition-colors">
                  Sites
                </Link>
              </li>
              <li>
                <Link to="/marketing" className="text-gray-400 hover:text-neon-green transition-colors">
                  Marketing
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-400 hover:text-neon-green transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-neon-green transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3 - Contacto */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="text-neon-green">Email:</span> contato@webrushbrasil.com.br
              </li>
              <li className="text-gray-400">
                <span className="text-neon-green">Tel:</span> +55 (48) 99225-9119
              </li>
              <li className="text-gray-400">
                <span className="text-neon-green">Endereço:</span> Palhoça, SC
              </li>
            </ul>
          </div>

          {/* Columna 4 - Redes sociales */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neon-green transition-colors">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-800/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} WebRush Brasil. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacidade" className="text-gray-400 hover:text-neon-green transition-colors text-sm">
                Política de Privacidade
              </Link>
              <Link to="/termos" className="text-gray-400 hover:text-neon-green transition-colors text-sm">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
