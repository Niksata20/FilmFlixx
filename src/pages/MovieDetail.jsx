import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useMovie, useMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

const MovieDetail = () => {
  const { id } = useParams();
  const { data: movie, isLoading, error } = useMovie(id);
  const { data: allMovies } = useMovies();
  const [isFavorite, setIsFavorite] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('filmflix_favorites') || '[]');
    const watchlist = JSON.parse(localStorage.getItem('filmflix_watchlist') || '[]');
    setIsFavorite(favorites.includes(parseInt(id)));
    setInWatchlist(watchlist.includes(parseInt(id)));
  }, [id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('filmflix_favorites') || '[]');
    const newFavorites = isFavorite
      ? favorites.filter((fid) => fid !== parseInt(id))
      : [...favorites, parseInt(id)];
    localStorage.setItem('filmflix_favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const toggleWatchlist = () => {
    const watchlist = JSON.parse(localStorage.getItem('filmflix_watchlist') || '[]');
    const newWatchlist = inWatchlist
      ? watchlist.filter((wid) => wid !== parseInt(id))
      : [...watchlist, parseInt(id)];
    localStorage.setItem('filmflix_watchlist', JSON.stringify(newWatchlist));
    setInWatchlist(!inWatchlist);
  };

  const getSimilarMovies = () => {
    if (!allMovies || !movie) return [];
    return allMovies
      .filter((m) => m.genre === movie.genre && m.id !== movie.id)
      .slice(0, 5);
  };

  if (isLoading) return <Loading />;

  if (error || !movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="font-display text-3xl text-white mb-2">Movie Not Found</h2>
          <p className="text-white/60 mb-6">The movie you're looking for doesn't exist.</p>
          <Link
            to="/movies"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-cinema-accent rounded-lg font-semibold text-white hover:bg-red-700 transition-colors"
          >
            <span>Browse Movies</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-black via-cinema-black/90 to-cinema-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12">
          <div className="flex flex-col md:flex-row gap-8 items-end animate-fade-in">
            {/* Poster */}
            <div className="hidden md:block w-64 flex-shrink-0">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full rounded-xl shadow-2xl shadow-cinema-black/50"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <span className="px-3 py-1 bg-cinema-accent rounded-full text-sm font-medium text-white">
                  {movie.genre}
                </span>
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">
                  {movie.year}
                </span>
              </div>

              <h1 className="font-display text-4xl md:text-6xl text-white mb-4">
                {movie.title}
              </h1>

              <div className="flex items-center space-x-6 text-white/80 mb-6">
                <div className="flex items-center space-x-2">
                  <svg className="w-6 h-6 text-cinema-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold text-lg">{movie.rating}</span>
                  <span className="text-white/50">/10</span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                <span>{movie.duration}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                <span>{movie.year}</span>
              </div>

              <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-2xl">
                {movie.description}
              </p>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4">
                <button className="group relative inline-flex items-center space-x-2 px-8 py-4 bg-cinema-accent rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cinema-accent/50">
                  <div className="absolute inset-0 bg-gradient-to-r from-cinema-accent to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg className="relative w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  <span className="relative">Play Now</span>
                </button>

                <button
                  onClick={toggleFavorite}
                  className={`inline-flex items-center space-x-2 px-6 py-4 rounded-lg font-semibold transition-all duration-300 ${
                    isFavorite
                      ? 'bg-pink-500/20 text-pink-500 border border-pink-500/50'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  <svg className="w-6 h-6" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
                </button>

                <button
                  onClick={toggleWatchlist}
                  className={`inline-flex items-center space-x-2 px-6 py-4 rounded-lg font-semibold transition-all duration-300 ${
                    inWatchlist
                      ? 'bg-blue-500/20 text-blue-500 border border-blue-500/50'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                  }`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{inWatchlist ? 'In List' : 'Watch Later'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Reviews Section */}
        {movie.reviews && movie.reviews.length > 0 && (
          <section>
            <h2 className="font-display text-3xl text-white mb-6 flex items-center space-x-3">
              <span className="w-1 h-8 bg-cinema-accent rounded-full"></span>
              <span>Reviews</span>
              <span className="text-lg text-white/50">({movie.reviews.length})</span>
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              {movie.reviews.slice(0, 4).map((review, index) => (
                <div
                  key={review.id}
                  className="glass rounded-xl p-6 animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cinema-accent to-cinema-gold flex items-center justify-center">
                        <span className="text-sm font-semibold text-white">
                          {review.author.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-white">{review.author}</p>
                        <p className="text-sm text-white/50">{review.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 px-2 py-1 bg-cinema-gold/20 rounded-md">
                      <svg className="w-4 h-4 text-cinema-gold" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-semibold text-cinema-gold">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-white/70 leading-relaxed line-clamp-3">
                    {review.content}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Similar Movies */}
        {getSimilarMovies().length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-3xl text-white flex items-center space-x-3">
                <span className="w-1 h-8 bg-cinema-gold rounded-full"></span>
                <span>Similar Movies</span>
              </h2>
              <Link
                to="/movies"
                className="text-sm text-white/60 hover:text-cinema-accent transition-colors flex items-center space-x-1"
              >
                <span>View All</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {getSimilarMovies().map((movie, index) => (
                <div
                  key={movie.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
