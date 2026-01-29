import { useState, useMemo } from 'react';
import { useSearchMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('title');

  const { data: movies, isLoading, error } = useSearchMovies(searchTerm);

  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 'Thriller', 'Animation'];

  const filteredMovies = useMemo(() => {
    if (!movies) return [];

    let result = [...movies];

    if (selectedGenre !== 'All') {
      result = result.filter((movie) => movie.genre === selectedGenre);
    }

    // Sort movies
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'year':
        result.sort((a, b) => b.year - a.year);
        break;
      case 'title':
      default:
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [movies, selectedGenre, sortBy]);

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl text-white mb-2">
            All Movies
          </h1>
          <p className="text-white/60">
            Discover our complete collection of films
          </p>
        </div>

        {/* Search and Filters */}
        <div className="glass rounded-xl p-4 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-cinema-accent focus:ring-1 focus:ring-cinema-accent transition-all"
              />
            </div>

            {/* Genre Filter */}
            <div className="relative">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="appearance-none w-full md:w-40 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cinema-accent cursor-pointer"
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre} className="bg-cinema-dark">
                    {genre}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Sort Options */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full md:w-40 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cinema-accent cursor-pointer"
              >
                <option value="title" className="bg-cinema-dark">Sort by Title</option>
                <option value="rating" className="bg-cinema-dark">Sort by Rating</option>
                <option value="year" className="bg-cinema-dark">Sort by Year</option>
              </select>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedGenre !== 'All') && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/10">
              <span className="text-sm text-white/60">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center px-3 py-1 bg-cinema-accent/20 border border-cinema-accent/30 rounded-full text-sm text-cinema-accent">
                  "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-2 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedGenre !== 'All' && (
                <span className="inline-flex items-center px-3 py-1 bg-cinema-gold/20 border border-cinema-gold/30 rounded-full text-sm text-cinema-gold">
                  {selectedGenre}
                  <button
                    onClick={() => setSelectedGenre('All')}
                    className="ml-2 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-white/60">
            {isLoading ? 'Loading...' : `${filteredMovies.length} movies found`}
          </p>
        </div>

        {/* Movies Grid */}
        {isLoading ? (
          <Loading variant="grid" />
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">😔</div>
            <h3 className="font-display text-2xl text-white mb-2">Error Loading Movies</h3>
            <p className="text-white/60">Please try again later</p>
          </div>
        ) : filteredMovies.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="font-display text-2xl text-white mb-2">No Movies Found</h3>
            <p className="text-white/60">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {filteredMovies.map((movie, index) => (
              <div
                key={movie.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
