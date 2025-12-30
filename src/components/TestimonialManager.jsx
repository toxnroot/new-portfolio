'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, CheckCircle, Trash2, Clock, User, MessageSquare } from 'lucide-react'
import { db } from '@/lib/firebase'
import { collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-hot-toast'

const TestimonialManager = () => {
    const [testimonials, setTestimonials] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchTestimonials = async () => {
        try {
            const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'))
            const snapshot = await getDocs(q)
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
            setTestimonials(data)
        } catch (error) {
            console.error('Error fetching testimonials:', error)
            toast.error('Failed to load testimonials')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchTestimonials()
    }, [])

    const handleApprove = async (id) => {
        try {
            await updateDoc(doc(db, 'testimonials', id), { approved: true })
            toast.success('Testimonial approved!')
            fetchTestimonials()
        } catch (error) {
            toast.error('Failed to approve')
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this review?')) return
        try {
            await deleteDoc(doc(db, 'testimonials', id))
            toast.success('Testimonial deleted')
            fetchTestimonials()
        } catch (error) {
            toast.error('Failed to delete')
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <MessageSquare className="text-cyan-400" />
                    Testimonials Moderation
                </h2>
                <span className="px-4 py-1 bg-white/5 rounded-full text-sm text-gray-400 border border-white/10">
                    Total: {testimonials.length}
                </span>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-cyan-400"></div>
                </div>
            ) : testimonials.length > 0 ? (
                <div className="grid gap-4">
                    <AnimatePresence>
                        {testimonials.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className={`p-6 rounded-2xl border transition-all ${item.approved
                                    ? 'bg-cyan-500/5 border-cyan-500/20'
                                    : 'bg-white/5 border-white/10'
                                    }`}
                            >
                                <div className="flex flex-col md:flex-row justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                                <User size={20} className="text-gray-400" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">{item.name}</h4>
                                                <p className="text-xs text-gray-500">{item.position || 'Client'}</p>
                                            </div>
                                            {!item.approved && (
                                                <span className="px-2 py-0.5 bg-cyan-400 text-black text-[10px] font-bold rounded-full uppercase tracking-wider ml-2">
                                                    Pending
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex gap-1 mb-3">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    className={`${i < item.rating ? 'fill-cyan-400 text-cyan-400' : 'text-gray-600'
                                                        }`}
                                                />
                                            ))}
                                        </div>

                                        <p className="text-gray-300 text-sm italic">"{item.content}"</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {!item.approved && (
                                            <button
                                                onClick={() => handleApprove(item.id)}
                                                className="p-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-all shadow-lg shadow-cyan-500/20 group"
                                                title="Approve"
                                            >
                                                <CheckCircle size={20} className="group-hover:scale-110 transition-transform" />
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="p-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all border border-red-500/20 group"
                                            title="Delete"
                                        >
                                            <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                    <p className="text-gray-500">No testimonials to manage.</p>
                </div>
            )}
        </div>
    )
}

export default TestimonialManager
