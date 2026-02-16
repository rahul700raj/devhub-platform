import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Users, Star, GitFork } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Where developers
            <span className="text-accent-green"> build</span> and
            <span className="text-accent-green"> share</span>
          </h1>
          <p className="text-xl text-light-muted dark:text-dark-muted mb-8 max-w-2xl mx-auto">
            DevHub is a modern platform for developers to showcase their code, collaborate on projects, and connect with the community.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="px-8 py-3 bg-accent-green text-white rounded-lg hover:bg-green-600 transition text-lg font-semibold"
            >
              Get Started
            </Link>
            <Link
              to="/search"
              className="px-8 py-3 border-2 border-light-border dark:border-dark-border rounded-lg hover:border-accent-green transition text-lg font-semibold"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Code2 className="w-8 h-8 text-accent-green" />}
            title="Code Repositories"
            description="Create and manage unlimited public repositories"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8 text-accent-blue" />}
            title="Collaboration"
            description="Follow developers and collaborate on projects"
          />
          <FeatureCard
            icon={<Star className="w-8 h-8 text-accent-purple" />}
            title="Star Projects"
            description="Discover and star amazing projects"
          />
          <FeatureCard
            icon={<GitFork className="w-8 h-8 text-accent-green" />}
            title="Fork & Contribute"
            description="Fork repositories and contribute to open source"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg hover:border-accent-green transition">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-light-muted dark:text-dark-muted">{description}</p>
    </div>
  );
}

export default Home;