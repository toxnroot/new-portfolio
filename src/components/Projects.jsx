'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Sparkles, ChevronDown, Rocket } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Projects = () => {
  const { t, lang } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="projects" className="relative min-h-screen py-40 px-6 bg-gradient-to-br from-black via-[#0f0f0f] to-black overflow-hidden">
      {/* Background Aesthetic Orbs */}
      <div className="absolute top-1/4 -right-20 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-cyan-500/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -left-20 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-purple-500/5 rounded-full blur-[100px] md:blur-[150px] pointer-events-none animate-pulse" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 text-sm font-bold mb-6 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
          >
            <Rocket size={16} />
            {t.projects.badge}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent py-6"
          >
            {t.projects.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto"
          >
            {t.projects.subtitle}
          </motion.p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
            <p className="text-cyan-500 font-medium tracking-widest text-sm uppercase">
              {lang === 'ar' ? 'جاري تحميل الروائع' : 'LOADING MASTERPIECES'}
            </p>
          </div>
        ) : (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
            >
              <AnimatePresence mode="popLayout">
                {projects.slice(0, visibleCount).map((project) => (
                  <motion.div key={project.id} variants={itemVariants} layout>
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {visibleCount < projects.length && (
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setVisibleCount(prev => prev + 3)}
                  className={`group relative flex items-center gap-3 px-10 py-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-white font-bold hover:bg-white/10 transition-all duration-300 shadow-xl overflow-hidden ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <ChevronDown className={`text-cyan-400 group-hover:translate-y-1 transition-transform ${lang === 'ar' ? 'rotate-0' : ''}`} />
                  {t.projects.loadMore}
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
