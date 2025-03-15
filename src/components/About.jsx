'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <motion.section
      id="about"
      className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 bg-black snap-start relative text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Title About Me */}
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        About Me
      </motion.h2>

      {/* Content */}
      <motion.div
        className="flex flex-col md:flex-row items-center gap-10 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 md:p-16 border border-white/20 w-full max-w-6xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* profile picture */}
        <motion.div
          className="w-40 h-40 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-cyan-400 shadow-lg"
          whileHover={{ scale: 1.05, rotate: 2 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Image src="/myiamge.webp" alt="Profile" width={200} height={200} className="w-full h-full object-cover" />
        </motion.div>

        {/* description */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-cyan-300 mb-4">Frontend Developer & UI/UX Enthusiast</h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            I’m a passionate developer with a strong eye for design, specializing in creating interactive experiences and functional interfaces using React, Three.js, and Framer Motion.
            <br /><br />
            I love bringing ideas to life with smooth animations and modern design principles. Let's build something amazing together!
          </p>

          <a
            href="#projects"
            className="inline-block px-8 py-4 bg-cyan-400 text-black font-semibold rounded-full hover:bg-cyan-300 transition-all shadow-lg hover:shadow-cyan-500/50"
          >
            View Projects
          </a>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default About
