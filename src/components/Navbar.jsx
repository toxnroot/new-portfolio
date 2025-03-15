'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-4 bg-transparent">
        {/* Logo */}
        <Link href="#home" className="text-2xl md:text-3xl font-bold text-cyan-400 press-start-2p-regular text-[1rem]">
          Mohammed Kamal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 text-lg font-medium text-white">
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle Menu"
            aria-expanded={isOpen} 
            role="button" 
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center space-y-10 z-40 bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MobileNavLink href="#skills" onClick={toggleMenu}>
              Skills
            </MobileNavLink>
            <MobileNavLink href="#projects" onClick={toggleMenu}>
              Projects
            </MobileNavLink>
            <MobileNavLink href="#about" onClick={toggleMenu}>
              About
            </MobileNavLink>
            <MobileNavLink href="#contact" onClick={toggleMenu}>
              Contact
            </MobileNavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;


const NavLink = ({ href, children }) => (
  <Link href={href} passHref>
    <motion.span
      whileHover={{ scale: 1.1 }}
      className="relative text-gray-200 hover:text-cyan-400 transition duration-300"
    >
      {children}
    </motion.span>
  </Link>
);

const MobileNavLink = ({ href, onClick, children }) => (
  <Link href={href} passHref>
    <motion.span
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className="text-3xl text-white font-semibold hover:text-cyan-400 transition-all duration-300"
    >
      {children}
    </motion.span>
  </Link>
);

const MenuIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);