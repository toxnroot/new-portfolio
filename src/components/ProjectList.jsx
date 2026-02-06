'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Trash2,
    Edit3,
    ExternalLink,
    Github,
    Search,
    AlertCircle,
    Loader2,
    X
} from 'lucide-react';
import DashboardForm from './DashboardForm';

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingProject, setEditingProject] = useState(null);

    useEffect(() => {
        const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const projectsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProjects(projectsData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching projects:", error);
            toast.error("Failed to load projects");
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteDoc(doc(db, 'projects', id));
                toast.success('Project deleted');
            } catch (error) {
                console.error("Error deleting project:", error);
                toast.error("Failed to delete project");
            }
        }
    };

    const filteredProjects = projects.filter(project =>
        project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full space-y-6">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-2.5 md:py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500/50 outline-none transition-all text-sm md:text-base"
                />
            </div>

            {/* Project Grid */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
                    <p className="text-gray-400">Loading your masterpieces...</p>
                </div>
            ) : filteredProjects.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
                    <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No projects found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="group relative bg-white/5 backdrop-blur-md p-4 md:p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl"
                            >
                                <div className="flex flex-col sm:flex-row gap-4">
                                    {/* Thumbnail */}
                                    <div className="w-full sm:w-24 h-48 sm:h-24 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0 border border-white/10">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-white truncate mb-1">{project.title}</h3>
                                        <p className="text-gray-400 text-sm line-clamp-2 mb-3">{project.description}</p>

                                        <div className="flex items-center gap-2 flex-wrap">
                                            <button
                                                onClick={() => setEditingProject(project)}
                                                className="p-2 md:p-2.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Edit3 size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                className="p-2 md:p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                            <div className="hidden sm:block h-4 w-px bg-white/10 mx-1" />
                                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-cyan-400 transition-colors">
                                                <ExternalLink size={16} />
                                            </a>
                                            <a href={project.code} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-500 hover:text-purple-400 transition-colors">
                                                <Github size={16} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Edit Modal */}
            <AnimatePresence>
                {editingProject && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setEditingProject(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-[#0a0f1d] rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setEditingProject(null)}
                                className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all z-10"
                            >
                                <X size={20} />
                            </button>

                            <div className="max-h-[90vh] overflow-y-auto p-2">
                                <DashboardForm
                                    initialData={editingProject}
                                    onSuccess={() => setEditingProject(null)}
                                />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectList;
