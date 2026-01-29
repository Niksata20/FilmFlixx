import { Link } from 'react-router-dom';
 
const MovieCard = ({ movie, variant = 'default' }) => {
  const isLarge = variant === 'large';
 
  return (
    <Link
      to={`/movie/${movie.id}`}
      className={`movie-card group relative block overflow-hidden rounded-xl ${
        isLarge ? 'aspect-[2/3]' : 'aspect-[2/3]'
      }`}
    >
      {/* Poster Image */}
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
 
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
 
      {/* Rating Badge */}
      <div className="absolute top-3 right-3 flex items-center space-x-1 bg-cinema-black/80 backdrop-blur-sm px-2 py-1 rounded-md">
        <svg className="w-4 h-4 text-cinema-gold" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span className="text-sm font-semibold text-white">{movie.rating}</span>
      </div>
 
      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="font-display text-xl text-white mb-1 line-clamp-2">
          {movie.title}
        </h3>
        <div className="flex items-center space-x-2 text-sm text-white/70">
          <span>{movie.year}</span>
          <span className="w-1 h-1 rounded-full bg-white/50"></span>
          <span>{movie.duration}</span>
          <span className="w-1 h-1 rounded-full bg-white/50"></span>
          <span className="text-cinema-accent">{movie.genre}</span>
        </div>
      </div>
 
      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-16 h-16 rounded-full bg-cinema-accent/90 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
        </div>
      </div>
 
      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-cinema-accent/50 transition-colors duration-300"></div>
    </Link>
  );
};
 
export default MovieCard;