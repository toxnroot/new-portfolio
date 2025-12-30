"use client";
import { useState } from 'react';
import DashboardForm from '@/components/DashboardForm';
import ProjectList from '@/components/ProjectList';
import LogoutButton from '@/components/LogoutButton';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ListFilter, MessageSquare } from 'lucide-react';
import TestimonialManager from '@/components/TestimonialManager';


const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('add');

  return (
    <div className="min-h-screen bg-[#020617] text-white py-20 px-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Manage your professional portfolio and showcase your latest work to the world.
          </p>
        </motion.div>

        <LogoutButton />

        {/* Tab Switcher */}
        <div className="flex justify-center mb-10">
          <div className="bg-white/5 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 flex gap-2">
            <button
              onClick={() => setActiveTab('add')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all font-semibold ${activeTab === 'add'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <Plus size={18} />
              Add Project
            </button>
            <button
              onClick={() => setActiveTab('manage')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all font-semibold ${activeTab === 'manage'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <ListFilter size={18} />
              Manage Projects
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all font-semibold ${activeTab === 'testimonials'
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              <MessageSquare size={18} />
              Testimonials
            </button>
          </div>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === 'add' ? (
              <motion.div
                key="add-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto"
              >
                <DashboardForm onSuccess={() => setActiveTab('manage')} />
              </motion.div>
            ) : activeTab === 'manage' ? (
              <motion.div
                key="manage-list"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectList />
              </motion.div>
            ) : (
              <motion.div
                key="testimonials-manager"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TestimonialManager />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
