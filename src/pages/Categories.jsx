import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
 
const Categories = () => {
  const { data: movies, isLoading } = useMovies();
  const [selectedCategory, setSelectedCategory] = useState(null);
 
  const categories = [
    { id: 'Action', name: 'Action', icon: '💥', color: 'from-red-600 to-orange-500', description: 'High-octane thrills and excitement' },
    { id: 'Comedy', name: 'Comedy', icon: '😂', color: 'from-yellow-500 to-amber-400', description: 'Laugh-out-loud entertainment' },
    { id: 'Drama', name: 'Drama', icon: '🎭', color: 'from-purple-600 to-pink-500', description: 'Emotional storytelling at its finest' },
    { id: 'Sci-Fi', name: 'Sci-Fi', icon: '🚀', color: 'from-cyan-500 to-blue-600', description: 'Explore the universe and beyond' },
    { id: 'Horror', name: 'Horror', icon: '👻', color: 'from-gray-700 to-gray-900', description: 'Spine-chilling terror awaits' },
    { id: 'Romance', name: 'Romance', icon: '💕', color: 'from-pink-500 to-rose-400', description: 'Love stories that warm the heart' },
    { id: 'Thriller', name: 'Thriller', icon: '🔪', color: 'from-emerald-600 to-teal-500', description: 'Edge-of-your-seat suspense' },
    { id: 'Animation', name: 'Animation', icon: '✨', color: 'from-indigo-500 to-violet-500', description: 'Animated magic for all ages' },
  ];
 
  const getCategoryMovies = (categoryId) => {
    if (!movies) return [];
    return movies.filter((movie) => movie.genre === categoryId);
  };
 
  if (isLoading) return <Loading />;
 
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl text-white mb-2">
            Categories
          </h1>
          <p className="text-white/60">
            Browse movies by genre
          </p>
        </div>
 
        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {categories.map((category, index) => {
            const movieCount = getCategoryMovies(category.id).length;
            const isSelected = selectedCategory === category.id;
 
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(isSelected ? null : category.id)}
                className={`group relative overflow-hidden rounded-xl p-6 text-left transition-all duration-300 animate-slide-up ${
                  isSelected
                    ? 'ring-2 ring-cinema-accent shadow-lg shadow-cinema-accent/20'
                    : 'hover:scale-105'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
 
                {/* Content */}
                <div className="relative z-10">
                  <span className="text-4xl mb-3 block">{category.icon}</span>
                  <h3 className="font-display text-xl text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/70 mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  <span className="text-xs text-white/80 bg-white/20 px-2 py-1 rounded-full">
                    {movieCount} movies
                  </span>
                </div>
 
                {/* Selected indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-cinema-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
 
        {/* Selected Category Movies */}
        {selectedCategory && (
          <section className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-3xl text-white flex items-center space-x-3">
                <span className="text-3xl">
                  {categories.find((c) => c.id === selectedCategory)?.icon}
                </span>
                <span>{selectedCategory} Movies</span>
              </h2>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-sm text-white/60 hover:text-cinema-accent transition-colors flex items-center space-x-1"
              >
                <span>Clear Selection</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
 
            {getCategoryMovies(selectedCategory).length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {getCategoryMovies(selectedCategory).map((movie, index) => (
                  <div
                    key={movie.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <MovieCard movie={movie} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 glass rounded-xl">
                <div className="text-4xl mb-3">🎬</div>
                <p className="text-white/60">No movies in this category yet</p>
              </div>
            )}
          </section>
        )}
 
        {/* All Categories Preview (when no selection) */}
        {!selectedCategory && (
          <div className="space-y-12">
            {categories.slice(0, 4).map((category) => {
              const categoryMovies = getCategoryMovies(category.id);
              if (categoryMovies.length === 0) return null;
 
              return (
                <section key={category.id}>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-2xl text-white flex items-center space-x-2">
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </h2>
                    <button
                      onClick={() => setSelectedCategory(category.id)}
                      className="text-sm text-white/60 hover:text-cinema-accent transition-colors flex items-center space-x-1"
                    >
                      <span>View All</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {categoryMovies.slice(0, 5).map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
 
export default Categories;