"use client";
import dynamic from 'next/dynamic';
import Loader from '@/components/Loader';
import { useEffect } from 'react';
import { trackVisitors } from '@/utils/trackVisitors';

const Hero = dynamic(() => import('@/components/Hero'), {
  ssr: false,
  loading: () => <Loader />,
});

const Skills = dynamic(() => import('@/components/Skills'), {
  ssr: false,
  loading: () => <></>,
});

const Projects = dynamic(() => import('@/components/Projects'), {
  ssr: false,
  loading: () => <></>,
});

const About = dynamic(() => import('@/components/About'), {
  ssr: false,
  loading: () => <></>,
});

const Contact = dynamic(() => import('@/components/Contact'), {
  ssr: false,
  loading: () => <></>,
});

export default function Home() {
  useEffect(() => {
   trackVisitors();
  }, []);
  
  return (
    <main className="h-screen overflow-scroll">
      <Hero />
      
      <Skills />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}
