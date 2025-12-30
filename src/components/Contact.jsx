'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, User, MessageSquare, Github, Linkedin, Facebook } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import emailjs from '@emailjs/browser'
import { toast } from 'react-hot-toast'

const Contact = () => {
  const { t, lang } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      toast.error(lang === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields')
      return
    }

    setLoading(true)

    try {
      // Debug: Let's check if variables are loaded
      if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || !process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || !process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY) {
        throw new Error('EmailJS variables are missing in .env.local')
      }

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Mohammed Kamal',
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )

      toast.success(t.contact.success)
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('EmailJS Detailed Error:', error)
      if (error?.text) console.error('EmailJS Error Text:', error.text)
      toast.error(t.contact.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.section
      id="contact"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-20 py-32 bg-black snap-start text-white"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Title */}
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center mb-20 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent py-6"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {t.contact.title}
      </motion.h2>

      <motion.p
        className="text-gray-400 text-center max-w-2xl mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {t.contact.subtitle}
      </motion.p>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-6xl">

        {/* Left: Info & Socials */}
        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-cyan-400/20 rounded-2xl">
                <Mail className="text-cyan-400 w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{t.contact.emailMe}</h3>
                <p className="text-gray-400 text-sm mt-3">mohammed.job.dev@gmail.com</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {t.contact.emailDesc}
            </p>
          </div>

          <div className="flex justify-start gap-4">
            <SocialButton Icon={Github} link="https://github.com/toxnroot" label="GitHub" />
            <SocialButton Icon={Linkedin} link="https://www.linkedin.com/in/mohammed-kamal-901041322/" label="LinkedIn" />
            <SocialButton Icon={Facebook} link="https://www.facebook.com/profile.php?id=100016503150230" label="Facebook" />
          </div>
        </motion.div>

        {/* Right: Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          <div className="relative">
            <User className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none`} />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t.contact.nameLabel}
              className={`w-full bg-black/50 border border-white/10 rounded-2xl py-4 ${lang === 'ar' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} focus:border-cyan-400 outline-none transition-all placeholder:text-gray-600`}
            />
          </div>

          <div className="relative">
            <Mail className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none`} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t.contact.emailLabel}
              className={`w-full bg-black/50 border border-white/10 rounded-2xl py-4 ${lang === 'ar' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} focus:border-cyan-400 outline-none transition-all placeholder:text-gray-600`}
            />
          </div>

          <div className="relative">
            <MessageSquare className={`absolute ${lang === 'ar' ? 'right-4' : 'left-4'} top-6 text-gray-500 w-5 h-5 pointer-events-none`} />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t.contact.messageLabel}
              rows="5"
              className={`w-full bg-black/50 border border-white/10 rounded-2xl py-4 ${lang === 'ar' ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} focus:border-cyan-400 outline-none transition-all placeholder:text-gray-600 resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden fill-current"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
            {loading ? t.contact.sending : t.contact.sendButton}
            {!loading && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
          </button>
        </motion.form>
      </div>
    </motion.section>
  )
}

export default Contact

const SocialButton = ({ Icon, link, label }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="group relative bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-cyan-400 transition-all hover:scale-110 shadow-lg"
  >
    <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-10 transition-all duration-300 blur-xl rounded-2xl" />
    <Icon className="w-6 h-6 text-gray-400 group-hover:text-black transition-all relative z-10" />
  </a>
)
