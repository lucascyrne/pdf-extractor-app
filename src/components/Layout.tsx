import React, { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

type LayoutProps = {
  children: ReactNode | ReactNode[];
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl">PDF Extractor</h1>
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/biblioteca-de-faturas" className="hover:underline">Biblioteca de Faturas</Link>
          </nav>
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} aria-label="Menu">
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-blue-600 text-white z-50 flex flex-col items-center justify-center"
          >
            <button onClick={toggleMobileMenu} aria-label="Close menu" className="absolute top-4 right-4">
              <FiX size={24} />
            </button>
            <nav className="flex flex-col space-y-4 text-lg">
              <Link to="/" onClick={toggleMobileMenu} className="hover:underline">Home</Link>
              <Link to="/dashboard" onClick={toggleMobileMenu} className="hover:underline">Dashboard</Link>
              <Link to="/biblioteca-de-faturas" onClick={toggleMobileMenu} className="hover:underline">Biblioteca de Faturas</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <main className="flex-1 container mx-auto py-4">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          Lucas Cyrne &copy; 2024 PDF Extractor.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
