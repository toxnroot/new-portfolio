'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, MessageSquarePlus, Quote } from 'lucide-react'
import { db } from '@/lib/firebase'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import TestimonialForm from './TestimonialForm'
import { useLanguage } from '@/context/LanguageContext'

const Testimonials = () => {
    const { t, lang } = useLanguage()
    const [testimonials, setTestimonials] = useState([])
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const q = query(
                    collection(db, 'testimonials'),
                    where('approved', '==', true),
                    orderBy('createdAt', 'desc')
                )
                const querySnapshot = await getDocs(q)
                const data = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setTestimonials(data)
            } catch (error) {
                console.error('Error fetching testimonials:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchTestimonials()
    }, [])

    return (
        <motion.section
            id="testimonials"
            className="min-h-screen flex flex-col justify-center items-center px-6 md:px-20 py-32 bg-gradient-to-br from-black via-[#0f0f0f] to-black snap-start relative text-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
        >
            {/* Standard Title Style */}
            <motion.h2
                className="text-4xl md:text-5xl font-extrabold text-center mb-24 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent py-6"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                {t.testimonials.title}
            </motion.h2>

            <div className="container mx-auto relative z-10" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
                    </div>
                ) : testimonials.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                        {testimonials.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ y: -10 }}
                                className="group relative bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 p-10 transition-all duration-500 shadow-2xl overflow-hidden hover:border-cyan-400/50"
                            >
                                {/* Premium Glow Effect on Hover (Matched with ProjectCard) */}
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <Quote className={`absolute top-8 ${lang === 'ar' ? 'left-8' : 'right-8'} text-white/5 w-16 h-16 group-hover:text-cyan-400/10 transition-colors ${lang === 'ar' ? 'rotate-180' : ''}`} />

                                {/* Project-sync Stars (Cyan/White instead of Yellow) */}
                                <div className={`flex gap-1 mb-8 ${lang === 'ar' ? 'flex-row-reverse justify-end' : ''}`}>
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={20}
                                            className={`${i < item.rating ? 'fill-cyan-400 text-cyan-400' : 'text-white/10'
                                                } transition-all duration-300 group-hover:scale-110`}
                                        />
                                    ))}
                                </div>

                                <p className="text-gray-300 mb-10 italic text-lg leading-relaxed relative z-10 min-h-[120px]">
                                    "{item.content}"
                                </p>

                                <div className="flex items-center gap-5 relative z-10 pt-8 border-t border-white/5">
                                    <div className="w-14 h-14 rounded-full border-2 border-cyan-400/30 p-1 group-hover:border-cyan-400 transition-colors duration-500">
                                        <div className="w-full h-full rounded-full bg-cyan-400/10 flex items-center justify-center font-bold text-xl text-cyan-400">
                                            {item.name[0]}
                                        </div>
                                    </div>
                                    <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                                        <h4 className="font-bold text-white text-xl group-hover:text-cyan-400 transition-colors">{item.name}</h4>
                                        {/* Fira Code for technical feel */}
                                        <p className="text-sm text-gray-500 fira-code font-medium opacity-80">@{item.position || (lang === 'ar' ? 'عميل' : 'Client')}</p>
                                    </div>
                                </div>

                                {/* Decorative Bottom Accent (Matched with ProjectCard) */}
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 mb-20 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-dashed border-white/10">
                        <p className="text-gray-500 text-2xl italic">{t.testimonials.noReviews}</p>
                    </div>
                )}

                {/* Primary CTA Button Sync */}
                <div className="flex justify-center mt-16">
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(34, 211, 238, 0.4)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsFormOpen(true)}
                        className="flex items-center gap-3 px-12 py-5 bg-cyan-400 text-black font-bold rounded-full hover:bg-cyan-300 transition-all shadow-2xl text-xl group"
                    >
                        <MessageSquarePlus size={26} className="group-hover:rotate-12 transition-transform" />
                        {t.testimonials.leaveReview}
                    </motion.button>
                </div>
            </div>

            <TestimonialForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        </motion.section>
    )
}

export default Testimonials
