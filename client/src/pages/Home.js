import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Hero Section */}
      <div className="text-center py-12 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to GameHub
          {user && <span className="text-primary-600"> {user.name}</span>}!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Play games, earn points, and discover valuable parenting resources
        </p>
        {!user && (
          <div className="flex justify-center gap-4">
            <Link to="/register" className="btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn-secondary">
              Sign In
            </Link>
          </div>
        )}
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Games Section */}
        <div className="card group hover:shadow-xl transition-all duration-300">
          <div className="text-4xl mb-4">🎮</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
            Fun Games
          </h2>
          <p className="text-gray-600 mb-6">
            Challenge yourself with our collection of engaging games and earn points while having fun.
          </p>
          <Link
            to="/games"
            className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
          >
            Play Now
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Marketplace Section */}
        <div className="card group hover:shadow-xl transition-all duration-300">
          <div className="text-4xl mb-4">🎁</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
            Rewards Marketplace
          </h2>
          <p className="text-gray-600 mb-6">
            Redeem your hard-earned points for exciting rewards and special offers.
          </p>
          <Link
            to="/marketplace"
            className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
          >
            View Rewards
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Parenting Videos Section */}
        <div className="card group hover:shadow-xl transition-all duration-300">
          <div className="text-4xl mb-4">📹</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
            Parenting Videos
          </h2>
          <p className="text-gray-600 mb-6">
            Watch expert-curated videos on various parenting topics and child development.
          </p>
          <Link
            to="/parenting"
            className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
          >
            Watch Videos
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Parenting Articles Section */}
        <div className="card group hover:shadow-xl transition-all duration-300">
          <div className="text-4xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors">
            Parenting Articles
          </h2>
          <p className="text-gray-600 mb-6">
            Read insightful articles from parenting experts and professionals.
          </p>
          <Link
            to="/parenting"
            className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
          >
            Read Articles
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">
          Start Your Journey Today
        </h2>
        <p className="text-primary-100 text-lg mb-6">
          Join our community to access all features and start earning rewards
        </p>
        {!user && (
          <Link
            to="/register"
            className="inline-block px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Create Account
          </Link>
        )}
      </div>
    </div>
  );
};

export default Home;
