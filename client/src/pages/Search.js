import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search as SearchIcon, User, BookOpen, Star, GitFork } from 'lucide-react';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({ users: [], repositories: [] });
  const [activeTab, setActiveTab] = useState('all');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      const res = await axios.get(`http://localhost:5000/api/search?q=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-muted dark:text-dark-muted" />
          <input
            type="text"
            placeholder="Search users and repositories..."
            className="w-full pl-12 pr-4 py-3 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:border-accent-green text-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </form>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b border-light-border dark:border-dark-border">
        <button
          onClick={() => setActiveTab('all')}
          className={`pb-2 px-4 ${
            activeTab === 'all'
              ? 'border-b-2 border-accent-green text-accent-green'
              : 'text-light-muted dark:text-dark-muted'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`pb-2 px-4 ${
            activeTab === 'users'
              ? 'border-b-2 border-accent-green text-accent-green'
              : 'text-light-muted dark:text-dark-muted'
          }`}
        >
          Users ({results.users?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('repositories')}
          className={`pb-2 px-4 ${
            activeTab === 'repositories'
              ? 'border-b-2 border-accent-green text-accent-green'
              : 'text-light-muted dark:text-dark-muted'
          }`}
        >
          Repositories ({results.repositories?.length || 0})
        </button>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {/* Users */}
        {(activeTab === 'all' || activeTab === 'users') && results.users && results.users.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Users</span>
            </h2>
            <div className="space-y-4">
              {results.users.map((user) => (
                <Link
                  key={user._id}
                  to={`/${user.username}`}
                  className="flex items-center space-x-4 p-4 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg hover:border-accent-green transition"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{user.name}</h3>
                    <p className="text-light-muted dark:text-dark-muted">@{user.username}</p>
                    {user.bio && <p className="text-sm mt-1">{user.bio}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Repositories */}
        {(activeTab === 'all' || activeTab === 'repositories') && results.repositories && results.repositories.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <span>Repositories</span>
            </h2>
            <div className="space-y-4">
              {results.repositories.map((repo) => (
                <Link
                  key={repo._id}
                  to={`/${repo.owner.username}/${repo.name}`}
                  className="block p-4 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg hover:border-accent-green transition"
                >
                  <h3 className="text-lg font-semibold text-accent-blue mb-2">
                    {repo.owner.username} / {repo.name}
                  </h3>
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
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {query && results.users?.length === 0 && results.repositories?.length === 0 && (
          <div className="text-center py-12 text-light-muted dark:text-dark-muted">
            <SearchIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No results found for "{query}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;