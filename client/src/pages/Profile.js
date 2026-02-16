import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Link as LinkIcon, Building, Star, GitFork } from 'lucide-react';

function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${username}`);
        setUser(res.data.user);
        setStats(res.data.stats);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [username]);

  if (!user) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg p-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full rounded-full mb-4"
            />
            <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
            <p className="text-light-muted dark:text-dark-muted mb-4">@{username}</p>
            
            {user.bio && <p className="mb-4">{user.bio}</p>}
            
            <div className="space-y-2 text-sm mb-4">
              {user.location && (
                <div className="flex items-center space-x-2 text-light-muted dark:text-dark-muted">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.company && (
                <div className="flex items-center space-x-2 text-light-muted dark:text-dark-muted">
                  <Building className="w-4 h-4" />
                  <span>{user.company}</span>
                </div>
              )}
              {user.website && (
                <div className="flex items-center space-x-2 text-light-muted dark:text-dark-muted">
                  <LinkIcon className="w-4 h-4" />
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="hover:text-accent-green">
                    {user.website}
                  </a>
                </div>
              )}
            </div>

            <div className="flex space-x-4 text-sm mb-4">
              <div>
                <span className="font-semibold">{stats?.followers || 0}</span>
                <span className="text-light-muted dark:text-dark-muted ml-1">followers</span>
              </div>
              <div>
                <span className="font-semibold">{stats?.following || 0}</span>
                <span className="text-light-muted dark:text-dark-muted ml-1">following</span>
              </div>
            </div>

            {user.skills && user.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent-green/10 text-accent-green rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Repositories ({stats?.totalRepos || 0})</h2>
          <div className="space-y-4">
            {user.repositories && user.repositories.length > 0 ? (
              user.repositories.map((repo) => (
                <Link
                  key={repo._id}
                  to={`/${username}/${repo.name}`}
                  className="block bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg p-6 hover:border-accent-green transition"
                >
                  <h3 className="text-xl font-semibold text-accent-blue mb-2">{repo.name}</h3>
                  {repo.description && (
                    <p className="text-light-muted dark:text-dark-muted mb-4">{repo.description}</p>
                  )}
                  <div className="flex items-center space-x-4 text-sm text-light-muted dark:text-dark-muted">
                    {repo.language && (
                      <span className="flex items-center space-x-1">
                        <span className="w-3 h-3 bg-accent-green rounded-full"></span>
                        <span>{repo.language}</span>
                      </span>
                    )}
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
            ) : (
              <p className="text-center text-light-muted dark:text-dark-muted py-8">
                No repositories yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;