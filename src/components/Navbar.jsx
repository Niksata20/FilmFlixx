import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
 
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
 
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
 
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
 
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/movies', label: 'Movies' },
    { path: '/categories', label: 'Categories' },
    { path: '/favorites', label: 'My List' },
  ];
 
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-cinema-black/95 backdrop-blur-md shadow-lg shadow-cinema-accent/10'
          : 'bg-gradient-to-b from-cinema-black to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="absolute -inset-2 bg-cinema-accent/20 rounded-lg blur-lg group-hover:bg-cinema-accent/40 transition-all duration-300"></div>
              <span className="relative font-display text-4xl text-cinema-accent tracking-wider">
                FILMFLIX
              </span>
            </div>
          </Link>
 
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 font-body text-sm font-medium uppercase tracking-wide transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-cinema-accent'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cinema-accent rounded-full"></span>
                )}
              </Link>
            ))}
          </div>
 
          {/* Search & Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/movies"
              className="p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cinema-accent to-cinema-gold flex items-center justify-center">
              <span className="text-sm font-semibold text-white">U</span>
            </div>
          </div>
 
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
 
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 font-body text-sm uppercase tracking-wide ${
                  location.pathname === link.path
                    ? 'text-cinema-accent bg-white/5'
                    : 'text-white/70'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
 
export default Navbar;
