"use client";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove('user');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <button onClick={handleLogout} className="p-2 bg-red-500 text-white rounded absolute top-16 right-15">
      Logout
    </button>
  );
};

export default LogoutButton;
