'use client'

import { motion } from 'framer-motion'

// ✅ Skills data
const skills = [
  { name: 'HTML5', icon: '/icons/html5-original.svg' },
  { name: 'CSS3', icon: '/icons/css3-original.svg' },
  { name: 'JavaScript', icon: '/icons/javascript-original.svg' },
  { name: 'React', icon: '/icons/react-original.svg' },
  { name: 'Next.js', icon: '/icons/nextjs-original.svg' },
  { name: 'Tailwind CSS', icon: '/icons/tailwindcss-original.svg' },
  { name: 'Framer Motion', icon: '/icons/framermotion-original.svg' },
  { name: 'Git', icon: '/icons/git-original.svg' },
  { name: 'Firebase', icon: '/icons/firebase-original.svg' },
  { name: 'Material Ui', icon: '/icons/materialui-original.svg' },
  { name: 'Node.js', icon: '/icons/nodejs-original.svg' },
  { name: 'Vite', icon: '/icons/vitejs-original.svg' },
  { name: 'Sass', icon: '/icons/sass-original.svg' },
  { name: 'GraphQL', icon: '/icons/graphql-plain.svg' },
  { name: 'Postman', icon: '/icons/postman-original.svg' },
  { name: 'jQuery', icon: '/icons/jquery-original.svg' },
]

const Skills = () => {
  return (
    <section id="skills" className="relative py-20 bg-gradient-to-br from-black via-[#0f0f0f] to-black text-white">
      <div className="container mx-auto px-6 md:px-20">
        {/* Section Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          My Skills
        </motion.h2>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
        >
          {skills.map((skill, index) => (
            <SkillCard key={index} skill={skill} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills

// ✅ Skill Card Component
const SkillCard = ({ skill }) => {
  return (
    <motion.div
      className="relative group rounded-2xl overflow-hidden p-6 cursor-pointer transition-all duration-300 ease-in-out bg-white/5 backdrop-blur-md shadow-lg shadow-black/50 hover:shadow-cyan-500/40 hover:scale-[1.07] border border-white/10 hover:border-cyan-400/50"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.07 }}
    >
      {/* Light effect */}
      <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-10 transition-all duration-300 blur-2xl rounded-2xl" />

      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="w-20 h-20 mb-4 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full shadow-inner shadow-black/20 group-hover:shadow-cyan-500/20 transition-all duration-300">
          <img
            src={skill.icon}
            alt={skill.name}
            className="object-contain w-12 h-12 grayscale group-hover:grayscale-0 transition-all duration-300"
          />
        </div>
        <p className="text-center text-lg font-semibold text-gray-300 group-hover:text-white transition-all duration-300">
          {skill.name}
        </p>
      </div>

      {/* Animated glowing border */}
      <div className="absolute -inset-1 rounded-2xl border-2 border-transparent group-hover:border-cyan-400/50 animate-pulse" />
    </motion.div>
  )
}
