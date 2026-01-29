import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

const Favorites = () => {
  const { data: movies, isLoading } = useMovies();
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [activeTab, setActiveTab] = useState('favorites');

  // Load from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('filmflix_favorites');
    const savedWatchlist = localStorage.getItem('filmflix_watchlist');
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    } else if (movies) {
      // Initialize with some movies for demo
      const initialFavorites = movies.slice(0, 3).map((m) => m.id);
      setFavorites(initialFavorites);
      localStorage.setItem('filmflix_favorites', JSON.stringify(initialFavorites));
    }
    
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    } else if (movies) {
      // Initialize with some movies for demo
      const initialWatchlist = movies.slice(5, 10).map((m) => m.id);
      setWatchlist(initialWatchlist);
      localStorage.setItem('filmflix_watchlist', JSON.stringify(initialWatchlist));
    }
  }, [movies]);

  const toggleFavorite = (movieId) => {
    const newFavorites = favorites.includes(movieId)
      ? favorites.filter((id) => id !== movieId)
      : [...favorites, movieId];
    setFavorites(newFavorites);
    localStorage.setItem('filmflix_favorites', JSON.stringify(newFavorites));
  };

  const toggleWatchlist = (movieId) => {
    const newWatchlist = watchlist.includes(movieId)
      ? watchlist.filter((id) => id !== movieId)
      : [...watchlist, movieId];
    setWatchlist(newWatchlist);
    localStorage.setItem('filmflix_watchlist', JSON.stringify(newWatchlist));
  };

  const getFavoriteMovies = () => {
    if (!movies) return [];
    return movies.filter((movie) => favorites.includes(movie.id));
  };

  const getWatchlistMovies = () => {
    if (!movies) return [];
    return movies.filter((movie) => watchlist.includes(movie.id));
  };

  if (isLoading) return <Loading />;

  const tabs = [
    { id: 'favorites', label: 'My Favorites', icon: '❤️', count: favorites.length },
    { id: 'watchlist', label: 'Watch Later', icon: '🕐', count: watchlist.length },
  ];

  const currentMovies = activeTab === 'favorites' ? getFavoriteMovies() : getWatchlistMovies();
  const currentList = activeTab === 'favorites' ? favorites : watchlist;
  const toggleFunction = activeTab === 'favorites' ? toggleFavorite : toggleWatchlist;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl text-white mb-2">
            My List
          </h1>
          <p className="text-white/60">
            Your personal collection of saved movies
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-cinema-accent text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-sm ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-white/10'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Stats Bar */}
        <div className="glass rounded-xl p-4 md:p-6 mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="font-display text-3xl text-cinema-accent">{favorites.length}</p>
            <p className="text-sm text-white/60">Favorites</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl text-cinema-gold">{watchlist.length}</p>
            <p className="text-sm text-white/60">Watch Later</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl text-green-500">
              {currentMovies.reduce((acc, m) => acc + parseFloat(m.rating), 0).toFixed(1)}
            </p>
            <p className="text-sm text-white/60">Total Rating</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl text-purple-500">
              {currentMovies.reduce((acc, m) => acc + parseInt(m.duration), 0)}min
            </p>
            <p className="text-sm text-white/60">Watch Time</p>
          </div>
        </div>

        {/* Movies Grid */}
        {currentMovies.length === 0 ? (
          <div className="text-center py-20 glass rounded-xl">
            <div className="text-6xl mb-4">
              {activeTab === 'favorites' ? '💔' : '📭'}
            </div>
            <h3 className="font-display text-2xl text-white mb-2">
              {activeTab === 'favorites' ? 'No Favorites Yet' : 'Watchlist Empty'}
            </h3>
            <p className="text-white/60 mb-6">
              {activeTab === 'favorites'
                ? "Start adding movies you love to your favorites!"
                : "Add movies you want to watch later!"}
            </p>
            <Link
              to="/movies"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-cinema-accent rounded-lg font-semibold text-white hover:bg-red-700 transition-colors"
            >
              <span>Browse Movies</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {currentMovies.map((movie, index) => (
              <div
                key={movie.id}
                className="relative animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <MovieCard movie={movie} />
                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFunction(movie.id);
                  }}
                  className="absolute top-2 left-2 z-20 w-8 h-8 bg-cinema-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white/60 hover:text-cinema-accent hover:bg-cinema-black transition-all"
                  title={`Remove from ${activeTab === 'favorites' ? 'favorites' : 'watchlist'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Quick Add Section */}
        {movies && movies.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl text-white mb-6 flex items-center space-x-3">
              <span className="w-1 h-8 bg-cinema-accent rounded-full"></span>
              <span>Suggested for You</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {movies
                .filter((m) => !currentList.includes(m.id))
                .slice(0, 5)
                .map((movie) => (
                  <div key={movie.id} className="relative">
                    <MovieCard movie={movie} />
                    {/* Add Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFunction(movie.id);
                      }}
                      className="absolute top-2 left-2 z-20 w-8 h-8 bg-cinema-accent/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-cinema-accent transition-all"
                      title={`Add to ${activeTab === 'favorites' ? 'favorites' : 'watchlist'}`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Favorites;
