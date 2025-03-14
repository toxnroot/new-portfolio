'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';

const DashboardForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [demo, setDemo] = useState('');
  const [code, setCode] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // Submit project data to Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !demo || !code || !imageUrl) {
      toast.error('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'projects'), {
        title,
        description,
        demo,
        code,
        image: imageUrl,
        createdAt: serverTimestamp(),
      });

      // Reset input fields after adding
      setTitle('');
      setDescription('');
      setDemo('');
      setCode('');
      setImageUrl('');

      toast.success('Project added successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Failed to add project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-xl mx-auto overflow-y-auto max-h-[80vh]">
      <h1 className="text-3xl font-bold mb-6 text-center text-cyan-400">Add New Project</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1">Project Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-cyan-500"
            placeholder="Enter project title"
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-cyan-500"
            placeholder="Enter project description..."
            rows={3}
          />
        </div>

        <div>
          <label className="block mb-1">Demo Link</label>
          <input
            type="text"
            value={demo}
            onChange={(e) => setDemo(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-cyan-500"
            placeholder="https://"
          />
        </div>

        <div>
          <label className="block mb-1">Code Link</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-cyan-500"
            placeholder="https://"
          />
        </div>

        <div>
          <label className="block mb-1">Image URL</label>
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-4 py-2 rounded bg-gray-700 text-white focus:ring-2 focus:ring-cyan-500"
            placeholder="https://"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded text-lg font-semibold transition-all ${
            loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-cyan-500 hover:bg-cyan-600'
          }`}
        >
          {loading ? 'Adding...' : 'Add Project'}
        </button>
      </form>
    </div>
  );
};

export default DashboardForm;
