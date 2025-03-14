'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // ✅ Firebase configuration

const Projects = () => {
  const [projects, setProjects] = useState([]); // Projects from Firebase
  const [visibleCount, setVisibleCount] = useState(3); // Initial number of displayed projects
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'projects'));
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen px-6 md:px-20 py-24 bg-black/90 text-white snap-start"
    >
      <motion.h2
        className="text-4xl md:text-5xl font-extrabold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        My Projects
      </motion.h2>

      {loading ? (
        <div className="text-center text-cyan-400">Loading projects...</div>
      ) : (
        <>
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, visibleCount).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {visibleCount < projects.length ? (
            <div className="flex justify-center mt-12">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full text-lg font-semibold transition-all duration-300"
              >
                Load More
              </button>
            </div>
          ) : projects.length > 0 ? (
            <></>
          ) : null}
        </>
      )}
    </section>
  );
};

export default Projects;
