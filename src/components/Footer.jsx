import { Link } from 'react-router-dom';
 
const Footer = () => {
  const footerLinks = [
    {
      title: 'Navigation',
      links: [
        { label: 'Home', path: '/' },
        { label: 'Movies', path: '/movies' },
        { label: 'Categories', path: '/categories' },
        { label: 'My List', path: '/favorites' },
      ],
    },
    {
      title: 'Categories',
      links: [
        { label: 'Action', path: '/categories' },
        { label: 'Comedy', path: '/categories' },
        { label: 'Drama', path: '/categories' },
        { label: 'Sci-Fi', path: '/categories' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', path: '#' },
        { label: 'Contact Us', path: '#' },
        { label: 'Privacy Policy', path: '#' },
        { label: 'Terms of Service', path: '#' },
      ],
    },
  ];
 
  return (
    <footer className="bg-cinema-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <span className="font-display text-3xl text-cinema-accent">FILMFLIX</span>
            </Link>
            <p className="mt-4 text-sm text-white/60 leading-relaxed">
              Your ultimate destination for streaming the best movies. Experience cinema like never before.
            </p>
            <div className="flex space-x-4 mt-6">
              {/* Social Icons */}
              {['facebook', 'twitter', 'instagram', 'youtube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-cinema-accent hover:text-white transition-all duration-300"
                >
                  <span className="sr-only">{social}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
 
          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-display text-lg text-white mb-4 tracking-wide">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-white/60 hover:text-cinema-accent transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
 
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-white/40">
            © 2024 FilmFlix. All rights reserved.
          </p>
          <p className="text-sm text-white/40 mt-2 md:mt-0">
            Made with <span className="text-cinema-accent">♥</span> for Web Design Course
          </p>
        </div>
      </div>
    </footer>
  );
};
 
export default Footer;
