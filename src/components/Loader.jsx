'use client';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden">
      <div className="relative">
        {/* Outer Glowing Circle */}
        <motion.div
          className="w-32 h-32 rounded-full border-2 border-cyan-500/20"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Second Glowing Circle (Reverse rotation) */}
        <motion.div
          className="absolute inset-0 w-32 h-32 rounded-full border-t-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
          animate={{
            rotate: [0, -360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Central Glowing Orb */}
        <motion.div
          className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_30px_rgba(34,211,238,0.6)]"
          animate={{
            scale: [0.8, 1, 0.8],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Loading Text */}
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-max">
          <motion.div
            className="flex items-center gap-1 text-cyan-400 font-bold tracking-[0.3em] uppercase text-xs press-start-2p-regular"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <span>Loading</span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
            >.</motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, times: [0.2, 0.7, 1] }}
            >.</motion.span>
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, times: [0.4, 0.9, 1] }}
            >.</motion.span>
          </motion.div>
        </div>
      </div>

      {/* Background scanner line effect */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
        animate={{
          top: ["0%", "100%", "0%"]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}

export default Loader;
