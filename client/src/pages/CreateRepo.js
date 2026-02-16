import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function CreateRepo() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isPrivate: false,
    readme: '# Project Title\n\nDescription of your project.',
    language: '',
    topics: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      
      const data = {
        ...formData,
        topics: formData.topics.split(',').map(t => t.trim()).filter(t => t)
      };

      await axios.post('http://localhost:5000/api/repositories', data, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success('Repository created successfully!');
      navigate(`/${user.username}/${formData.name}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create repository');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Create a new repository</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Repository name *</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:border-accent-green"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="my-awesome-project"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:border-accent-green"
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="A brief description of your project"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Primary Language</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:border-accent-green"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                placeholder="JavaScript, Python, etc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Topics (comma-separated)</label>
              <input
                type="text"
                className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:border-accent-green"
                value={formData.topics}
                onChange={(e) => setFormData({ ...formData, topics: e.target.value })}
                placeholder="react, nodejs, api"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">README</label>
              <textarea
                className="w-full px-4 py-2 bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:border-accent-green font-mono text-sm"
                rows="10"
                value={formData.readme}
                onChange={(e) => setFormData({ ...formData, readme: e.target.value })}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="private"
                className="w-4 h-4 text-accent-green"
                checked={formData.isPrivate}
                onChange={(e) => setFormData({ ...formData, isPrivate: e.target.checked })}
              />
              <label htmlFor="private" className="ml-2 text-sm">
                Make this repository private
              </label>
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="px-6 py-3 bg-accent-green text-white rounded-lg hover:bg-green-600 transition font-semibold"
          >
            Create repository
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-light-border dark:border-dark-border rounded-lg hover:border-accent-green transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateRepo;