'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ExternalLink, Github, ArrowLeft, Calendar, Layout, Code2, Rocket, Share2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';
import Link from 'next/link';

const ProjectDetails = ({ id }) => {
    const { t, lang } = useLanguage();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const docRef = doc(db, 'projects', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProject({ id: docSnap.id, ...docSnap.data() });
                }
            } catch (error) {
                console.error('Error fetching project:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full" />
                    <div className="absolute inset-0 border-4 border-t-cyan-500 rounded-full animate-spin" />
                </div>
                <p className="text-cyan-500 font-bold tracking-[0.2em] uppercase text-sm animate-pulse">
                    {lang === 'ar' ? 'جاري جلب التفاصيل...' : 'FETCHING BLUEPRINTS...'}
                </p>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 p-6">
                <h2 className="text-4xl font-black text-white">{lang === 'ar' ? 'المشروع غير موجود' : 'Project Not Found'}</h2>
                <Link href="/#projects" className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-cyan-400 hover:bg-cyan-400/10 transition-all">
                    {t.projects.details.back}
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-cyan-500/30">
            {/* Decorative background elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
                {/* Navigation */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-12"
                >
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group"
                    >
                        <div className="p-2 bg-white/5 rounded-xl border border-white/10 group-hover:border-cyan-400/50 transition-all">
                            <ArrowLeft size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
                        </div>
                        <span className="font-bold tracking-tight uppercase text-sm">{t.projects.details.back}</span>
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Visuals */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="lg:col-span-7"
                    >
                        <div className="relative group rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/5 shadow-2xl">
                            <div className="aspect-video relative">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            </div>

                            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                                <div className="flex gap-3">
                                    <div className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10">
                                        <span className="text-cyan-400 text-xs font-black tracking-widest uppercase">
                                            {project.category || 'Featured'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats/Tags */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                            <StatCard icon={<Calendar size={18} />} label="Date" value={new Date(project.createdAt?.seconds * 1000).getFullYear() || '2024'} />
                            <StatCard icon={<Layout size={18} />} label="Type" value="Web App" />
                            <StatCard icon={<Code2 size={18} />} label="Stack" value="Modern" />
                            <StatCard icon={<Rocket size={18} />} label="Status" value="Live" />
                        </div>
                    </motion.div>

                    {/* Right Column: Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-5 flex flex-col"
                    >
                        <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-white to-gray-500 bg-clip-text text-transparent leading-tight">
                            {project.title}
                        </h1>

                        <div className={`space-y-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                            <p className="text-gray-400 text-lg leading-relaxed font-medium">
                                {project.description}
                            </p>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold flex items-center gap-2 text-cyan-400">
                                    <div className="w-8 h-[2px] bg-cyan-400" />
                                    {t.projects.details.techUsed}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags?.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white/80 hover:border-cyan-400/50 hover:text-cyan-400 transition-all"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-10 mt-auto">
                                <motion.a
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    href={project.demo !== '#' ? project.demo : undefined}
                                    target="_blank"
                                    className={`flex-1 flex items-center justify-center gap-2 px-8 py-5 rounded-2xl font-black uppercase tracking-tighter text-sm transition-all shadow-xl ${project.demo === '#'
                                            ? 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'
                                            : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-cyan-500/20'
                                        }`}
                                >
                                    {t.projects.details.demo}
                                    <ExternalLink size={18} />
                                </motion.a>

                                <motion.a
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    href={project.code !== '#' ? project.code : undefined}
                                    target="_blank"
                                    className={`flex items-center justify-center gap-2 px-8 py-5 rounded-2xl font-black uppercase tracking-tighter text-sm transition-all border shadow-xl ${project.code === '#'
                                            ? 'border-white/5 bg-white/5 text-gray-500 cursor-not-allowed'
                                            : 'border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <Github size={18} />
                                    {t.projects.details.code}
                                </motion.a>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Features/Extended Description if available */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 p-10 md:p-16 bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/10"
                >
                    <div className="grid md:grid-cols-12 gap-12 items-center">
                        <div className="md:col-span-8">
                            <h2 className="text-3xl font-black mb-6 text-white uppercase tracking-tighter">Project Insight</h2>
                            <div className="space-y-6 text-gray-400 text-lg font-medium leading-[1.8]">
                                <p>
                                    I focused on providing a seamless user experience by combining clean design with powerful performance.
                                    The architecture was built to be scalable and responsive, ensuring that every interaction feels fluid and meaningful.
                                </p>
                                <p>
                                    From front-end animations to back-end stability, every detail was carefully considered to meet the highest standards of modern web development.
                                </p>
                            </div>
                        </div>
                        <div className="md:col-span-4 flex justify-center md:justify-end">
                            <div className="w-32 h-32 rounded-full border-2 border-dashed border-cyan-500/30 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                                <Share2 className="text-cyan-500 transform -rotate-12" size={32} />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};

const StatCard = ({ icon, label, value }) => (
    <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col items-center text-center">
        <div className="text-cyan-400 mb-2">{icon}</div>
        <span className="text-[10px] uppercase font-black text-gray-500 tracking-[0.2em] mb-1">{label}</span>
        <span className="text-sm font-bold text-white">{value}</span>
    </div>
);

export default ProjectDetails;
