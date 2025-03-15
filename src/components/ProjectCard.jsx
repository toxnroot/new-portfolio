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
        {/* Image Project */}
        <div className="relative h-56 overflow-hidden">
          <Image src={project.image} alt={project.title} layout="fill" objectFit="cover" />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-300"></div>
        </div>
  
        {/* Content Project */}
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-cyan-300">{project.title}</h3>
            <p className="text-gray-300 text-sm mb-6">{project.description}</p>
          </div>
  
          {/* Buttons */}
          <div className="flex justify-between mt-auto">
            <a
              href={project.demo !== '#' ? project.demo : undefined}
              target={project.demo !== '#' ? "_blank" : undefined}
              rel={project.demo !== '#' ? "noopener noreferrer" : undefined}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition ${
                project.demo === '#'
                  ? "bg-gray-500 text-gray-300 cursor-not-allowed opacity-50"
                  : "bg-cyan-400 text-black hover:bg-cyan-300"
              }`}
              onClick={(e) => project.demo === '#' && e.preventDefault()}
            >
              Live Demo <ExternalLink size={16} />
            </a>
            <a
              href={project.code !== '#' ? project.code : undefined}
              target={project.code !== '#' ? "_blank" : undefined}
              rel={project.code !== '#' ? "noopener noreferrer" : undefined}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-full transition ${
                project.code === '#'
                  ? "border-gray-500 text-gray-300 cursor-not-allowed opacity-50"
                  : "border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
              }`}
              onClick={(e) => project.code === '#' && e.preventDefault()}
            >
              Code <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </motion.div>
    )
  }

export default ProjectCard;
