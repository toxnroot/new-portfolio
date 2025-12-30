import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const ProjectCard = ({ project }) => {
  const { t, lang } = useLanguage();

  return (
    <motion.div
      layout
      whileHover={{ y: -10 }}
      className="group relative bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 overflow-hidden hover:border-cyan-400/50 transition-all duration-500 shadow-2xl"
    >
      {/* Premium Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

        {/* Category/Badge */}
        <div className={`absolute top-6 left-6 px-4 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-cyan-400 ${lang === 'ar' ? 'left-auto right-6' : ''}`}>
          {t.projects.card.badge}
        </div>
      </div>

      {/* Content */}
      <div className={`p-8 relative ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3">
          {project.description}
        </p>

        {/* Action Buttons */}
        <div className={`flex items-center gap-4 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={project.demo !== '#' ? project.demo : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold transition-all ${project.demo === '#'
              ? "bg-white/5 text-gray-500 cursor-not-allowed border border-white/5"
              : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
              }`}
          >
            {t.projects.card.live} <ExternalLink size={16} />
          </motion.a>

          <motion.a
            whileHover={project.code !== '#' ? { scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(34, 211, 238, 0.5)' } : {}}
            whileTap={project.code !== '#' ? { scale: 0.9 } : {}}
            href={project.code !== '#' ? project.code : undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-3.5 rounded-2xl border transition-all duration-300 ${project.code === '#'
              ? "border-white/5 bg-white/5 text-gray-600 cursor-not-allowed"
              : "border-white/10 bg-white/5 text-white"
              }`}
          >
            <Github size={20} className={project.code !== '#' ? "group-hover:text-cyan-400 transition-colors" : ""} />
          </motion.a>
        </div>
      </div>

      {/* Decorative Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default ProjectCard;
