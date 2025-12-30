'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  Type,
  FileText,
  Link as LinkIcon,
  Code as CodeIcon,
  ImageIcon,
  PlusCircle,
  Loader2,
  Sparkles,
  Save
} from 'lucide-react';

const DashboardForm = ({ initialData = null, onSuccess = null }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [demo, setDemo] = useState(initialData?.demo || '');
  const [code, setCode] = useState(initialData?.code || '');
  const [imageUrl, setImageUrl] = useState(initialData?.image || '');
  const [loading, setLoading] = useState(false);

  // Sync state if initialData changes (for Edit mode)
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setDemo(initialData.demo || '');
      setCode(initialData.code || '');
      setImageUrl(initialData.image || '');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !demo || !code || !imageUrl) {
      toast.error('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const projectData = {
        title,
        description,
        demo,
        code,
        image: imageUrl,
        updatedAt: serverTimestamp(),
      };

      if (initialData?.id) {
        // Update existing project
        const projectRef = doc(db, 'projects', initialData.id);
        await updateDoc(projectRef, projectData);
        toast.success('Project updated successfully!');
      } else {
        // Add new project
        await addDoc(collection(db, 'projects'), {
          ...projectData,
          createdAt: serverTimestamp(),
        });
        toast.success('Project added successfully!');
        // Clear form only on "Add" mode
        setTitle('');
        setDescription('');
        setDemo('');
        setCode('');
        setImageUrl('');
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error saving document: ', error);
      toast.error(initialData ? 'Failed to update project.' : 'Failed to add project.');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none transition-all duration-300 backdrop-blur-sm";
  const labelClasses = "flex items-center gap-2 text-sm font-medium text-gray-400 mb-2 ml-1";

  return (
    <div className="relative w-full">
      <div className="relative bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {initialData ? 'Edit Project' : 'Add New Project'}
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <label className={labelClasses}><Type size={16} /> Project Title</label>
              <div className="relative">
                <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={inputClasses}
                  placeholder="Amazing Web App"
                />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <label className={labelClasses}><FileText size={16} /> Description</label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 text-gray-500" size={18} />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={`${inputClasses} resize-none`}
                  placeholder="What makes this project special?"
                  rows={3}
                />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <label className={labelClasses}><LinkIcon size={16} /> Demo Link</label>
                <div className="relative">
                  <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="url"
                    value={demo}
                    onChange={(e) => setDemo(e.target.value)}
                    className={inputClasses}
                    placeholder="https://demo.com"
                  />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                <label className={labelClasses}><CodeIcon size={16} /> Code Link</label>
                <div className="relative">
                  <CodeIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                  <input
                    type="url"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={inputClasses}
                    placeholder="https://github.com/..."
                  />
                </div>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <label className={labelClasses}><ImageIcon size={16} /> Image URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className={inputClasses}
                  placeholder="https://image-source.com/img.png"
                />
              </div>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-lg font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${loading
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : initialData
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-500/20'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-cyan-500/25'
              }`}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : initialData ? (
              <>
                <Save size={20} />
                Update Project
              </>
            ) : (
              <>
                <PlusCircle size={20} />
                Add Project
              </>
            )}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default DashboardForm;
