import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
const ProjectCard = ({ project }) => {
    return (
      <motion.div
        className="bg-white/10 rounded-2xl shadow-lg overflow-hidden flex flex-col hover:scale-[1.02] transition-all duration-300 group"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* صورة المشروع */}
        <div className="relative h-56 overflow-hidden">
          <Image src={project.image} alt={project.title} layout="fill" objectFit="cover" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-300"></div>
        </div>
  
        {/* محتوى المشروع */}
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-cyan-300">{project.title}</h3>
            <p className="text-gray-300 text-sm mb-6">{project.description}</p>
          </div>
  
          {/* الأزرار */}
          <div className="flex justify-between mt-auto">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-black bg-cyan-400 rounded-full hover:bg-cyan-300 transition"
            >
              Live Demo <ExternalLink size={16} />
            </a>
            <a
              href={project.code}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-400 border border-cyan-400 rounded-full hover:bg-cyan-400 hover:text-black transition"
            >
              Code <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </motion.div>
    )
  }

export default ProjectCard