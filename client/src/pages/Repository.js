import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Star, GitFork, Eye, Code } from 'lucide-react';
import toast from 'react-hot-toast';

function Repository() {
  const { username, reponame } = useParams();
  const [repo, setRepo] = useState(null);
  const [isStarred, setIsStarred] = useState(false);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/repositories/${username}/${reponame}`);
        setRepo(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRepo();
  }, [username, reponame]);

  const handleStar = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to star repositories');
        return;
      }

      if (isStarred) {
        await axios.delete(`http://localhost:5000/api/repositories/${repo._id}/star`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsStarred(false);
        toast.success('Unstarred repository');
      } else {
        await axios.post(`http://localhost:5000/api/repositories/${repo._id}/star`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsStarred(true);
        toast.success('Starred repository');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to star repository');
    }
  };

  const handleFork = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to fork repositories');
        return;
      }

      await axios.post(`http://localhost:5000/api/repositories/${repo._id}/fork`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Repository forked successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to fork repository');
    }
  };

  if (!repo) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-accent-blue">{username}</span> / {reponame}
            </h1>
            {repo.description && (
              <p className="text-light-muted dark:text-dark-muted">{repo.description}</p>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleStar}
              className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition ${
                isStarred
                  ? 'bg-accent-green text-white border-accent-green'
                  : 'border-light-border dark:border-dark-border hover:border-accent-green'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>{isStarred ? 'Starred' : 'Star'}</span>
              <span className="px-2 py-0.5 bg-light-bg dark:bg-dark-bg rounded-full text-sm">
                {repo.stars?.length || 0}
              </span>
            </button>
            <button
              onClick={handleFork}
              className="flex items-center space-x-2 px-4 py-2 border border-light-border dark:border-dark-border rounded-lg hover:border-accent-green transition"
            >
              <GitFork className="w-4 h-4" />
              <span>Fork</span>
              <span className="px-2 py-0.5 bg-light-bg dark:bg-dark-bg rounded-full text-sm">
                {repo.forks?.length || 0}
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-sm text-light-muted dark:text-dark-muted">
          {repo.language && (
            <span className="flex items-center space-x-1">
              <Code className="w-4 h-4" />
              <span>{repo.language}</span>
            </span>
          )}
          <span className="flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>{repo.watchers?.length || 0} watching</span>
          </span>
        </div>

        {repo.topics && repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {repo.topics.map((topic, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-accent-blue/10 text-accent-blue rounded-full text-sm"
              >
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* README */}
      {repo.readme && (
        <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg p-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown>{repo.readme}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Files */}
      {repo.files && repo.files.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Files</h2>
          <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg overflow-hidden">
            {repo.files.map((file, index) => (
              <div
                key={index}
                className="p-4 border-b border-light-border dark:border-dark-border last:border-b-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm text-accent-blue">{file.name}</span>
                  <span className="text-xs text-light-muted dark:text-dark-muted">
                    {file.language}
                  </span>
                </div>
                {file.content && (
                  <pre className="bg-light-bg dark:bg-dark-bg p-4 rounded overflow-x-auto">
                    <code className="text-sm">{file.content}</code>
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Repository;