import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';
import { AnimatePresence } from 'framer-motion';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <nav className="bg-gray-900/80 backdrop-blur-xl sticky top-0 z-50 border-b border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Links a la izquierda */}
          <div className="hidden lg:flex space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-base font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'text-neon-green border-b-2 border-neon-green' 
                    : 'text-gray-300 hover:text-neon-green hover:border-b-2 hover:border-neon-green'
                }`
              }
            >
              Início
            </NavLink>
            <NavLink 
              to="/sites" 
              className={({ isActive }) => 
                `text-base font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'text-neon-green border-b-2 border-neon-green' 
                    : 'text-gray-300 hover:text-neon-green hover:border-b-2 hover:border-neon-green'
                }`
              }
            >
              Sites
            </NavLink>
            <NavLink 
              to="/marketing" 
              className={({ isActive }) => 
                `text-base font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'text-neon-green border-b-2 border-neon-green' 
                    : 'text-gray-300 hover:text-neon-green hover:border-b-2 hover:border-neon-green'
                }`
              }
            >
              Marketing
            </NavLink>
            <NavLink 
              to="/blog" 
              className={({ isActive }) => 
                `text-base font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'text-neon-green border-b-2 border-neon-green' 
                    : 'text-gray-300 hover:text-neon-green hover:border-b-2 hover:border-neon-green'
                }`
              }
            >
              Blog
            </NavLink>
          </div>

          {/* Logo centrado */}
          <div className="flex-1 flex justify-center">
            <Link to="/" className="relative group">
              <motion.div 
                initial={{ scale: 1 }} 
                whileHover={{ scale: 1.05 }} 
                transition={{ type: 'spring', stiffness: 300 }}
                className="relative"
              >
                <img 
                  src={logo} 
                  alt="Logo da WebRush Brasil" 
                  className="h-12 w-auto"
                  style={{ filter: "invert(1)" }}
                />
                <div className="absolute inset-0 bg-neon-green/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </Link>
          </div>

          {/* Links a la derecha */}
          <div className="hidden lg:flex space-x-8">
            <NavLink 
              to="/portfolio" 
              className={({ isActive }) => 
                `text-base font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'text-neon-green border-b-2 border-neon-green' 
                    : 'text-gray-300 hover:text-neon-green hover:border-b-2 hover:border-neon-green'
                }`
              }
            >
              Sobre Nós
            </NavLink>
            <NavLink 
              to="/contato" 
              className={({ isActive }) => 
                `text-base font-medium transition-colors duration-200 ${
                  isActive 
                    ? 'text-neon-green border-b-2 border-neon-green' 
                    : 'text-gray-300 hover:text-neon-green hover:border-b-2 hover:border-neon-green'
                }`
              }
            >
              Contato
            </NavLink>
          </div>

          {/* Botón de menú móvil */}
          <div className="lg:hidden">
            <button 
              className="relative w-16 h-10 flex items-center justify-center focus:outline-none group rounded-md"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <motion.span
                  className="absolute w-6 h-0.5 bg-gray-300 rounded-full transform origin-center transition-colors duration-300 group-hover:bg-neon-green"
                  animate={{
                    y: isOpen ? 10 : 0,
                    rotate: isOpen ? 45 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="absolute w-6 h-0.5 bg-gray-300 rounded-full top-2.5 transform origin-center transition-colors duration-300 group-hover:bg-neon-green"
                  animate={{
                    opacity: isOpen ? 0 : 1
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="absolute w-6 h-0.5 bg-gray-300 rounded-full top-5 transform origin-center transition-colors duration-300 group-hover:bg-neon-green"
                  animate={{
                    y: isOpen ? -8 : 0,
                    rotate: isOpen ? -45 : 0
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="absolute inset-0 bg-neon-green/0 rounded-full transition-colors duration-300 group-hover:bg-neon-green/10"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="lg:hidden bg-gray-900/95 backdrop-blur-md border-b border-gray-800/50"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={menuVariants}
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              <NavLink 
                to="/" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-neon-green bg-gray-800/50' 
                      : 'text-gray-300 hover:text-neon-green hover:bg-gray-800/50'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Início
              </NavLink>
              <NavLink 
                to="/sites" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-neon-green bg-gray-800/50' 
                      : 'text-gray-300 hover:text-neon-green hover:bg-gray-800/50'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Sites
              </NavLink>
              <NavLink 
                to="/marketing" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-neon-green bg-gray-800/50' 
                      : 'text-gray-300 hover:text-neon-green hover:bg-gray-800/50'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Marketing
              </NavLink>
              <NavLink 
                to="/blog" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-neon-green bg-gray-800/50' 
                      : 'text-gray-300 hover:text-neon-green hover:bg-gray-800/50'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Blog
              </NavLink>
              <NavLink 
                to="/portfolio" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-neon-green bg-gray-800/50' 
                      : 'text-gray-300 hover:text-neon-green hover:bg-gray-800/50'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Sobre Nós
              </NavLink>
              <NavLink 
                to="/contato" 
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'text-neon-green bg-gray-800/50' 
                      : 'text-gray-300 hover:text-neon-green hover:bg-gray-800/50'
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                Contato
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
