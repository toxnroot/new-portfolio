"use client";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import { LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('user');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleLogout}
      className="flex items-center gap-2 px-3 md:px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-xl transition-all duration-300 backdrop-blur-md font-medium text-sm md:text-base"
    >
      <LogOut size={18} />
      Logout
    </motion.button>
  );
};

export default LogoutButton;
