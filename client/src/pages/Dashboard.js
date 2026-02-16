import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, Star, Users, GitFork, Calendar } from 'lucide-react';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        
        const res = await axios.get(`http://localhost:5000/api/users/${userData.username}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setUser(res.data.user);
        setStats(res.data.stats);
        setRepositories(res.data.user.repositories);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (!user) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<BookOpen className="w-6 h-6" />}
          label="Repositories"
          value={stats?.totalRepos || 0}
          color="green"
        />
        <StatCard
          icon={<Star className="w-6 h-6" />}
          label="Stars Received"
          value={stats?.totalStars || 0}
          color="yellow"
        />
        <StatCard
          icon={<Users className="w-6 h-6" />}
          label="Followers"
          value={stats?.followers || 0}
          color="blue"
        />
        <StatCard
          icon={<GitFork className="w-6 h-6" />}
          label="Following"
          value={stats?.following || 0}
          color="purple"
        />
      </div>

      {/* Profile Section */}
      <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg p-6 mb-8">
        <div className="flex items-start space-x-6">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-light-muted dark:text-dark-muted mb-2">@{user.username}</p>
            {user.bio && <p className="mb-4">{user.bio}</p>}
            <div className="flex flex-wrap gap-2">
              {user.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-accent-green/10 text-accent-green rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Repositories */}
      <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Repositories</h2>
          <Link
            to="/new"
            className="px-4 py-2 bg-accent-green text-white rounded-lg hover:bg-green-600 transition"
          >
            New Repository
          </Link>
        </div>
        <div className="space-y-4">
          {repositories.length === 0 ? (
            <p className="text-center text-light-muted dark:text-dark-muted py-8">
              No repositories yet. Create your first one!
            </p>
          ) : (
            repositories.map((repo) => (
              <Link
                key={repo._id}
                to={`/${user.username}/${repo.name}`}
                className="block p-4 border border-light-border dark:border-dark-border rounded-lg hover:border-accent-green transition"
              >
                <h3 className="text-lg font-semibold text-accent-blue mb-2">{repo.name}</h3>
                {repo.description && (
                  <p className="text-light-muted dark:text-dark-muted mb-2">{repo.description}</p>
                )}
                <div className="flex items-center space-x-4 text-sm text-light-muted dark:text-dark-muted">
                  {repo.language && <span>{repo.language}</span>}
                  <span className="flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>{repo.stars?.length || 0}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <GitFork className="w-4 h-4" />
                    <span>{repo.forks?.length || 0}</span>
                  </span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  const colors = {
    green: 'text-accent-green',
    yellow: 'text-yellow-500',
    blue: 'text-accent-blue',
    purple: 'text-accent-purple'
  };

  return (
    <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg p-6">
      <div className={`${colors[color]} mb-2`}>{icon}</div>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-light-muted dark:text-dark-muted text-sm">{label}</div>
    </div>
  );
}

export default Dashboard;