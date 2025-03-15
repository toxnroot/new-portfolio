'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isClient = useMemo(() => typeof window !== 'undefined', []);

  useEffect(() => {
    if (!isClient) return;

    const user = Cookies.get('user');
    if (user) {
      router.replace('/dashboard');
    }
  }, [isClient, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!name || !password) {
      toast.error('Please enter both name and password');
      return;
    }

    setLoading(true);

    try {
      const userRef = doc(db, 'users', 'admin'); 
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();

        if (userData.name === name && userData.password === password) {
          Cookies.set('user', JSON.stringify({ name }), { expires: 1 }); 
          toast.success('Login successful');
          router.replace('/dashboard');
        } else {
          toast.error('Invalid credentials');
        }
      } else {
        toast.error('User not found');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-white text-center mb-4">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 rounded bg-gray-700 text-white"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 rounded font-semibold text-white transition ${
              loading ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
