const Loading = ({ variant = 'page' }) => {
  if (variant === 'card') {
    return (
      <div className="aspect-[2/3] rounded-xl shimmer"></div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="aspect-[2/3] rounded-xl shimmer"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-cinema-gray rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-cinema-accent rounded-full animate-spin"></div>
        </div>
        <p className="text-white/60 font-body animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
