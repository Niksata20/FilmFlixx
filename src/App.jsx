import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Categories from './pages/Categories';
import Favorites from './pages/Favorites';
import MovieDetail from './pages/MovieDetail';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-cinema-black">
          {/* Film Grain Overlay */}
          <div className="film-grain"></div>
          
          {/* Navigation */}
          <Navbar />
          
          {/* Main Content */}
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
