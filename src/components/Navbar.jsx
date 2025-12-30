'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Languages } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-4 transition-all duration-300 ${scrolled
          ? 'bg-black/60 backdrop-blur-xl py-3'
          : 'bg-transparent py-5'
          } ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
      >
        {/* Logo */}
        <Link href="#home" className="text-2xl md:text-3xl font-bold text-cyan-400 press-start-2p-regular text-[0.9rem] flex items-center gap-2">
          {t.hero.name}
        </Link>

        {/* Desktop Menu & Toggle */}
        <div className={`hidden md:flex items-center gap-10 text-lg font-medium text-white ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
          <NavLink href="#skills">{t.nav.skills}</NavLink>
          <NavLink href="#projects">{t.nav.projects}</NavLink>
          <NavLink href="#about">{t.nav.about}</NavLink>
          <NavLink href="#contact">{t.nav.contact}</NavLink>

          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 transition-all text-sm font-bold text-cyan-400"
          >
            <Languages size={18} />
            {lang === 'en' ? 'Arabic' : 'English'}
          </motion.button>
        </div>

        {/* Mobile Menu & Language Icon */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="p-2 text-cyan-400 hover:bg-white/5 rounded-full transition-all"
            aria-label="Toggle Language"
          >
            <Languages size={22} />
          </button>
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
            className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center space-y-10 z-40 bg-black/95 backdrop-blur-xl"
            initial={{ opacity: 0, y: -1000 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -1000 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <MobileNavLink href="#skills" onClick={toggleMenu}>
              {t.nav.skills}
            </MobileNavLink>
            <MobileNavLink href="#projects" onClick={toggleMenu}>
              {t.nav.projects}
            </MobileNavLink>
            <MobileNavLink href="#about" onClick={toggleMenu}>
              {t.nav.about}
            </MobileNavLink>
            <MobileNavLink href="#contact" onClick={toggleMenu}>
              {t.nav.contact}
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