'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Languages } from 'lucide-react';
import Image from 'next/image';

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
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-16 py-4 transition-all duration-500 ${scrolled
          ? 'bg-black/40 backdrop-blur-xl py-3 border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)]'
          : 'bg-transparent py-6'
          } ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
      >
        {/* Logo */}
        <Link href="/" className="group relative">
          <span className="text-2xl md:text-3xl font-black text-cyan-400 press-start-2p-regular text-[0.9rem] flex items-center gap-2 hover:text-white transition-all duration-300">
            {t.hero.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
          </span>
        </Link>

        {/* Desktop Menu & Toggle */}
        <div className={`hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-white/70 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
          <NavLink href="#skills">{t.nav.skills}</NavLink>
          <NavLink href="#projects">{t.nav.projects}</NavLink>
          <NavLink href="#about">{t.nav.about}</NavLink>
          <NavLink href="#contact">{t.nav.contact}</NavLink>

          <div className="h-6 w-px bg-white/10 mx-2" />

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(6, 182, 212, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:text-cyan-400 transition-all text-xs font-black uppercase tracking-tighter"
          >
            <Languages size={14} className="text-cyan-400" />
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
            className="relative z-[60] p-2 text-white bg-white/5 rounded-xl border border-white/10 transition-all active:scale-95"
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
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 z-[50] bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 right-0 w-[80%] max-w-xs h-full z-[55] bg-[#020617] border-l border-white/10 shadow-2xl md:hidden flex flex-col p-8 pt-24 ${lang === 'ar' ? 'right-auto left-0 border-l-0 border-r' : ''}`}
            >
              <div className="flex flex-col gap-6">
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
              </div>

              <div className="mt-auto pt-10 border-t border-white/5">
                <p className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">{t.hero.name}</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-cyan-500/20 bg-cyan-500/10">
                    <Image
                      src="/myiamge.webp"
                      alt="Profile"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;


const NavLink = ({ href, children }) => (
  <Link href={href} className="group relative py-2">
    <span className="relative z-10 hover:text-cyan-400 transition-colors duration-300">
      {children}
    </span>
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full opacity-50" />
  </Link>
);

const MobileNavLink = ({ href, onClick, children }) => (
  <Link href={href} onClick={onClick} className="group flex items-center justify-between py-4 border-b border-white/5">
    <span className="text-2xl text-white font-bold group-hover:text-cyan-400 transition-all duration-300 uppercase tracking-tighter">
      {children}
    </span>
    <div className="w-2 h-2 rounded-full bg-white/10 group-hover:bg-cyan-500 group-hover:shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all" />
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