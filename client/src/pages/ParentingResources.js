import React, { useState } from 'react';

const PARENTING_RESOURCES = {
  videos: [
    {
      id: 1,
      title: "Positive Parenting Techniques",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Learn effective positive parenting strategies",
      duration: "15:30",
      category: "Parenting Skills"
    },
    {
      id: 2,
      title: "Understanding Child Development",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Key milestones in child development",
      duration: "12:45",
      category: "Child Development"
    },
    {
      id: 3,
      title: "Managing Difficult Behaviors",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Strategies for handling challenging behaviors",
      duration: "18:20",
      category: "Behavior Management"
    }
  ],
  articles: [
    {
      id: 1,
      title: "The Importance of Play in Child Development",
      author: "Dr. Sarah Johnson",
      readTime: "5 min read",
      content: "Play is fundamental to children's healthy development. Through play, children learn essential life skills...",
      tags: ["child development", "play", "learning"],
      category: "Child Development"
    },
    {
      id: 2,
      title: "Building Emotional Intelligence in Children",
      author: "Dr. Michael Chen",
      readTime: "7 min read",
      content: "Emotional intelligence is crucial for children's success. Here's how parents can help develop it...",
      tags: ["emotional intelligence", "parenting", "child psychology"],
      category: "Emotional Development"
    },
    {
      id: 3,
      title: "Effective Communication with Your Child",
      author: "Lisa Thompson",
      readTime: "6 min read",
      content: "Good communication is key to building a strong relationship with your child. Learn effective strategies...",
      tags: ["communication", "parenting skills", "relationships"],
      category: "Communication"
    }
  ]
};

const ParentingResources = () => {
  const [activeTab, setActiveTab] = useState('videos');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getCategories = (type) => {
    const items = PARENTING_RESOURCES[type];
    const categories = [...new Set(items.map(item => item.category))];
    return ['all', ...categories];
  };

  const filterByCategory = (items) => {
    if (selectedCategory === 'all') return items;
    return items.filter(item => item.category === selectedCategory);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 -mx-4 px-4 py-12 mb-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Parenting Resources
          </h1>
          <p className="text-primary-100 text-lg">
            Discover valuable insights and practical advice for your parenting journey
          </p>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200
              ${activeTab === 'videos'
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            Videos
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200
              ${activeTab === 'articles'
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            Articles
          </button>
        </div>

        {/* Category Filter */}
        <div className="w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
          >
            {getCategories(activeTab).map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Videos Section */}
      {activeTab === 'videos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filterByCategory(PARENTING_RESOURCES.videos).map(video => (
            <div key={video.id} className="card group hover:shadow-xl transition-all duration-300">
              <div className="aspect-video mb-4 bg-gray-100 rounded-lg overflow-hidden">
                <iframe
                  title={video.title}
                  src={video.url}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
              <div className="space-y-2">
                <span className="text-sm font-medium text-primary-600">
                  {video.category}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                  {video.title}
                </h3>
                <p className="text-gray-600">{video.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {video.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Articles Section */}
      {activeTab === 'articles' && (
        <div className="space-y-8">
          {filterByCategory(PARENTING_RESOURCES.articles).map(article => (
            <div 
              key={article.id} 
              className="card hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500">{article.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{article.content}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm text-gray-600">{article.author}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParentingResources;
