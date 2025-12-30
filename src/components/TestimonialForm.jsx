'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, X, Send, User, Briefcase, MessageSquare } from 'lucide-react'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { toast } from 'react-hot-toast'
import { useLanguage } from '@/context/LanguageContext'

const TestimonialForm = ({ isOpen, onClose }) => {
    const { t, lang } = useLanguage()
    const [loading, setLoading] = useState(false)
    const [rating, setRating] = useState(5)
    const [hover, setHover] = useState(0)
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        content: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.name || !formData.content) {
            toast.error(t.testimonials.form.fillError)
            return
        }

        setLoading(true)
        try {
            await addDoc(collection(db, 'testimonials'), {
                ...formData,
                rating,
                approved: false,
                createdAt: serverTimestamp(),
            })
            toast.success(t.testimonials.form.success)
            setFormData({ name: '', position: '', content: '' })
            setRating(5)
            onClose()
        } catch (error) {
            console.error('Error submitting testimonial:', error)
            toast.error('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-[#0a0a0a]/95 border border-white/10 w-full max-w-lg rounded-[2.5rem] overflow-hidden relative shadow-[0_0_80px_rgba(0,0,0,0.8)]"
                        dir={lang === 'ar' ? 'rtl' : 'ltr'}
                    >
                        {/* Premium Glow Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-500/5 pointer-events-none" />

                        <button
                            onClick={onClose}
                            className={`absolute top-8 ${lang === 'ar' ? 'left-8' : 'right-8'} p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400 hover:text-white z-20`}
                        >
                            <X size={24} />
                        </button>

                        <form onSubmit={handleSubmit} className="p-12 relative z-10">
                            <h3 className="text-3xl font-extrabold mb-10 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                                {t.testimonials.form.title}
                            </h3>

                            <div className="space-y-6">
                                {/* Name */}
                                <div className="relative group">
                                    <User className={`absolute ${lang === 'ar' ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors w-5 h-5`} />
                                    <input
                                        type="text"
                                        placeholder={t.testimonials.form.name}
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 ${lang === 'ar' ? 'pr-14 pl-5' : 'pl-14 pr-5'} focus:border-cyan-400/50 outline-none transition-all focus:bg-white/10`}
                                    />
                                </div>

                                {/* Position */}
                                <div className="relative group">
                                    <Briefcase className={`absolute ${lang === 'ar' ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors w-5 h-5`} />
                                    <input
                                        type="text"
                                        placeholder={t.testimonials.form.position}
                                        value={formData.position}
                                        onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                        className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 ${lang === 'ar' ? 'pr-14 pl-5' : 'pl-14 pr-5'} focus:border-cyan-400/50 outline-none transition-all focus:bg-white/10`}
                                    />
                                </div>

                                {/* Rating - Synced to Cyan Theme */}
                                <div className="flex flex-col gap-4 py-2">
                                    <label className={`text-sm font-bold tracking-widest uppercase text-gray-500 ${lang === 'ar' ? 'mr-1' : 'ml-1'}`}>{t.testimonials.form.rating}</label>
                                    <div className="flex gap-4">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                onMouseEnter={() => setHover(star)}
                                                onMouseLeave={() => setHover(0)}
                                                className="transition-transform hover:scale-125 focus:outline-none"
                                            >
                                                <Star
                                                    size={36}
                                                    className={`${(hover || rating) >= star
                                                        ? 'fill-cyan-400 text-cyan-400'
                                                        : 'text-white/10'
                                                        } transition-all duration-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.2)]`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative group">
                                    <MessageSquare className={`absolute ${lang === 'ar' ? 'right-5' : 'left-5'} top-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors w-5 h-5`} />
                                    <textarea
                                        placeholder={t.testimonials.form.content}
                                        rows="4"
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        className={`w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 ${lang === 'ar' ? 'pr-14 pl-5' : 'pl-14 pr-5'} focus:border-cyan-400/50 outline-none transition-all focus:bg-white/10 resize-none`}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full mt-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 text-xl shadow-2xl shadow-cyan-500/30"
                            >
                                {loading ? t.testimonials.form.submitting : (
                                    <>
                                        {t.testimonials.form.submit} <Send size={24} className={lang === 'ar' ? 'rotate-180' : ''} />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

export default TestimonialForm
