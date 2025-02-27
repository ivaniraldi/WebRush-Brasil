import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <nav className="navbar bg-white sticky top-0 z-50 flex justify-between items-center px-6">
      {/* Links a la izquierda */}
      <div className="hidden lg:flex space-x-6">
        <NavLink to="/" className={({ isActive }) => `text-lg ${isActive ? 'text-black': "text-gray-500"} hover:text-black`}>Início</NavLink>
        <NavLink to="/blog" className={({ isActive }) => `text-lg ${isActive ? 'text-black': "text-gray-500"} hover:text-black`}>Blog</NavLink>
      </div>

      {/* Logo centrado */}
      <div className="flex-1 flex justify-center">
        <Link to="/" className="text-3xl font-bold text-black hover:text-black">
          <motion.span initial={{ scale: 1 }} whileHover={{ scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}>
            WebRush
          </motion.span>
        </Link>
      </div>

      {/* Links a la derecha */}
      <div className="hidden lg:flex space-x-6">
        <NavLink to="/portfolio" className={({ isActive }) => `text-lg ${isActive ? 'text-black': "text-gray-500"} hover:text-black`}>Portfólio</NavLink>
        <NavLink to="/contato" className={({ isActive }) => `text-lg ${isActive ? 'text-black': "text-gray-500"} hover:text-black`}>Contato</NavLink>
      </div>

      {/* Botón de menú móvil */}
      <div className="lg:hidden">
        <button className="btn btn-ghost text-black hover:text-black" onClick={() => setIsOpen(!isOpen)}>
          <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
          </motion.svg>
        </button>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <motion.div className="absolute top-full left-0 w-full border-b border-base lg:hidden" initial="hidden" animate="visible" variants={menuVariants}>
          <ul className="menu menu-vertical px-4 py-2">
            <NavLink to="/" className={({ isActive }) => `text-lg py-2 ${isActive ? 'text-black': "text-gray-500"} hover:text-black`} onClick={() => setIsOpen(false)}>Início</NavLink>
            <NavLink to="/blog" className={({ isActive }) => `text-lg py-2 ${isActive ? 'text-black': "text-gray-500"} hover:text-black`} onClick={() => setIsOpen(false)}>Blog</NavLink>
            <NavLink to="/portfolio" className={({ isActive }) => `text-lg py-2 ${isActive ? 'text-black': "text-gray-500"} hover:text-black`} onClick={() => setIsOpen(false)}>Portfólio</NavLink>
            <NavLink to="/contacto" className={({ isActive }) => `text-lg py-2 ${isActive ? 'text-black': "text-gray-500"} hover:text-black`} onClick={() => setIsOpen(false)}>Contato</NavLink>
          </ul>
        </motion.div>
      )}
    </nav>
  );
}

export default Navbar;
