import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFeaturedMovies, useMovies } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';

const Home = () => {
  const { data: featuredMovies, isLoading: featuredLoading } = useFeaturedMovies();
  const { data: allMovies, isLoading: moviesLoading } = useMovies();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!featuredMovies?.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredMovies]);

  if (featuredLoading || moviesLoading) return <Loading />;

  const currentMovie = featuredMovies?.[currentSlide];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={currentMovie?.backdrop}
            alt={currentMovie?.title}
            className="w-full h-full object-cover transition-opacity duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-black via-cinema-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-transparent to-cinema-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl animate-fade-in">
            <span className="inline-block px-3 py-1 bg-cinema-accent/20 border border-cinema-accent/50 rounded-full text-sm text-cinema-accent font-medium mb-4">
              Featured Movie
            </span>
            <h1 className="font-display text-5xl md:text-7xl text-white mb-4 leading-tight">
              {currentMovie?.title}
            </h1>
            <div className="flex items-center space-x-4 text-white/80 mb-6">
              <div className="flex items-center space-x-1">
                <svg className="w-5 h-5 text-cinema-gold" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold">{currentMovie?.rating}</span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
              <span>{currentMovie?.year}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
              <span>{currentMovie?.duration}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
              <span className="text-cinema-accent">{currentMovie?.genre}</span>
            </div>
            <p className="text-white/70 text-lg leading-relaxed mb-8 line-clamp-3">
              {currentMovie?.description}
            </p>
            <div className="flex items-center space-x-4">
              <Link
                to={`/movie/${currentMovie?.id}`}
                className="group relative inline-flex items-center space-x-2 px-8 py-4 bg-cinema-accent rounded-lg font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cinema-accent/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cinema-accent to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <svg className="relative w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                <span className="relative">Watch Now</span>
              </Link>
              <Link
                to={`/movie/${currentMovie?.id}`}
                className="inline-flex items-center space-x-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg font-semibold text-white hover:bg-white/20 transition-all duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>More Info</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-2">
          {featuredMovies?.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-cinema-accent'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Trending Now */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-3xl text-white flex items-center space-x-3">
              <span className="w-1 h-8 bg-cinema-accent rounded-full"></span>
              <span>Trending Now</span>
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
            {allMovies?.slice(0, 5).map((movie, index) => (
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

        {/* New Releases */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-3xl text-white flex items-center space-x-3">
              <span className="w-1 h-8 bg-cinema-gold rounded-full"></span>
              <span>New Releases</span>
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
            {allMovies?.slice(5, 10).map((movie, index) => (
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

        {/* Top Rated */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-3xl text-white flex items-center space-x-3">
              <span className="w-1 h-8 bg-green-500 rounded-full"></span>
              <span>Top Rated</span>
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
            {allMovies?.slice(10, 15).map((movie, index) => (
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

        {/* CTA Section */}
        <section className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 hero-gradient"></div>
          <div className="relative px-8 py-16 text-center">
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">
              Ready to Watch?
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
              Explore thousands of movies and TV shows. Start your streaming journey today.
            </p>
            <Link
              to="/movies"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-cinema-accent rounded-lg font-semibold text-white hover:bg-red-700 transition-colors"
            >
              <span>Browse All Movies</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
