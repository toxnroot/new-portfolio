'use client'

import { motion } from 'framer-motion'
import { Mail, Send } from 'lucide-react'

const Contact = () => {
  return (
    <motion.section
      id="contact"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-20 py-20 bg-black snap-start text-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* العنوان */}
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center mb-6 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Get In Touch
      </motion.h2>

      <motion.p
        className="text-gray-400 text-center max-w-2xl mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        I'm always open to new collaborations or just a friendly chat. Let's connect and create something amazing together!
      </motion.p>

      {/* بطاقة التواصل */}
      <motion.div
        className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-xl flex flex-col gap-6 border border-white/20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* معلومات التواصل */}
        <div className="flex flex-col items-center text-center gap-4">
          <Mail className="w-12 h-12 text-cyan-400" />
          <h3 className="text-2xl font-semibold text-cyan-300">Email Me</h3>
          <p className="text-gray-400">Send me an email and I'll get back to you as soon as possible.</p>
          <a
            href="mailto:mohammed.job.dev@gmail.com"
            className="flex items-center gap-3 px-6 py-3 bg-cyan-400 text-black font-semibold rounded-full hover:bg-cyan-300 transition-all shadow-lg hover:shadow-cyan-500/50"
          >
            Say Hello <Send size={18} />
          </a>
        </div>

        {/* أو أزرار تواصل اجتماعي (اختياري) */}
        <div className="flex justify-center gap-6 mt-8">
          <SocialButton icon="/icons/github-original.svg" link="https://github.com/toxnroot" />
          <SocialButton icon="/icons/linkedin-original.svg" link="https://www.linkedin.com/in/mohammed-kamal-901041322/" />
          <SocialButton icon="/icons/facebook-original.svg" link="https://www.facebook.com/profile.php?id=100016503150230" />
        </div>
      </motion.div>
    </motion.section>
  )
}

export default Contact

// ✅ زر تواصل اجتماعي
const SocialButton = ({ icon, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-white/10 border border-white/20 p-3 rounded-full hover:bg-cyan-400 transition-all hover:scale-110 shadow-md hover:shadow-cyan-500/50"
  >
    <img src={icon} alt="icon" className="w-6 h-6" />
  </a>
)
