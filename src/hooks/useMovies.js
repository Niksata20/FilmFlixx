import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
});

const movieData = [
  { title: "The Dark Horizon", description: "A former spy must come out of retirement when a mysterious organization threatens global security. Racing against time, he uncovers a conspiracy that goes deeper than anyone imagined.", genre: "Action" },
  { title: "Laugh Out Loud", description: "When three college friends reunite for a wedding, their hilarious misadventures and old rivalries lead to unexpected chaos and heartwarming moments.", genre: "Comedy" },
  { title: "Broken Dreams", description: "A struggling musician faces the challenges of fame, love, and self-discovery in this emotional journey through the music industry.", genre: "Drama" },
  { title: "Galaxy Runners", description: "In the year 3025, a ragtag crew of space smugglers stumble upon an ancient alien artifact that could change the fate of the universe.", genre: "Sci-Fi" },
  { title: "The Haunting Hour", description: "A family moves into their dream home, only to discover that the previous owners never truly left. Some doors should never be opened.", genre: "Horror" },
  { title: "Love in Paris", description: "Two strangers meet by chance in the city of lights. As they explore Paris together, they discover that sometimes love finds you when you least expect it.", genre: "Romance" },
  { title: "Silent Witness", description: "A journalist investigating a cold case becomes the target of a powerful criminal organization. The truth could cost her everything.", genre: "Thriller" },
  { title: "Magic Kingdom", description: "A young girl discovers she has magical powers and must save her enchanted world from an ancient evil in this animated adventure.", genre: "Animation" },
  { title: "Steel Thunder", description: "Elite soldiers embark on a dangerous mission behind enemy lines. Loyalty and courage are tested in this explosive military action film.", genre: "Action" },
  { title: "Wedding Chaos", description: "A wedding planner's perfectly organized event spirals into hilarious disaster when the bride's and groom's eccentric families collide.", genre: "Comedy" },
  { title: "The Last Letter", description: "After finding old love letters in her grandmother's attic, a woman uncovers a secret that changes her understanding of family and sacrifice.", genre: "Drama" },
  { title: "Neon City 2099", description: "In a cyberpunk future, a hacker and an android team up to take down a corrupt mega-corporation controlling humanity's minds.", genre: "Sci-Fi" },
  { title: "Midnight Screams", description: "College students spending the weekend at a remote cabin discover an ancient book that unleashes unspeakable horrors.", genre: "Horror" },
  { title: "Summer Hearts", description: "A cynical travel writer and a free-spirited photographer find unexpected romance during a Mediterranean cruise.", genre: "Romance" },
  { title: "The Conspiracy", description: "A detective uncovers a web of lies and corruption reaching the highest levels of government. Trust no one.", genre: "Thriller" },
  { title: "Dragon Quest", description: "A brave young hero and his magical companions embark on an epic quest to save the kingdom from an evil sorcerer.", genre: "Animation" },
  { title: "Fury Road", description: "A fearless driver seeks revenge against the gang that destroyed his family in this high-octane chase across the desert.", genre: "Action" },
  { title: "Office Mayhem", description: "When a strict new boss takes over, the employees band together for hilarious schemes to make work bearable again.", genre: "Comedy" },
  { title: "Forgotten Voices", description: "A therapist working with trauma patients begins to question reality when their stories start coming true.", genre: "Drama" },
  { title: "Star Voyager", description: "Humanity's first interstellar mission discovers a planet with intelligent life, but first contact doesn't go as planned.", genre: "Sci-Fi" },
];

const reviewTemplates = [
  { author: "Michael Johnson", content: "Absolutely loved this movie! The storytelling was incredible and the performances were outstanding. A must-watch for everyone." },
  { author: "Sarah Williams", content: "Great cinematography and a compelling plot. The director really outdid themselves with this one. Highly recommended!" },
  { author: "David Chen", content: "One of the best films I've seen this year. The character development was superb and the ending left me speechless." },
  { author: "Emily Parker", content: "A thrilling ride from start to finish. The action sequences were breathtaking and the soundtrack was perfect." },
  { author: "James Wilson", content: "Beautiful storytelling with amazing visual effects. This movie sets a new standard for the genre." },
  { author: "Amanda Ross", content: "I was on the edge of my seat the entire time. The plot twists were unexpected and brilliantly executed." },
  { author: "Robert Taylor", content: "Fantastic performances by the entire cast. The emotional depth of this film really resonated with me." },
  { author: "Lisa Anderson", content: "A masterpiece of modern cinema. Every scene was crafted with care and attention to detail." },
  { author: "Chris Martinez", content: "Entertaining from beginning to end. Perfect blend of action, humor, and heart." },
  { author: "Jennifer Brown", content: "This movie exceeded all my expectations. The story was engaging and the visuals were stunning." },
];

const transformToMovies = (posts, photos) => {
  const years = [2020, 2021, 2022, 2023, 2024];
  const ratings = [6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 7.8, 8.2, 7.3, 8.7];
  
  return posts.slice(0, 20).map((post, index) => {
    const movieInfo = movieData[index % movieData.length];
    return {
      id: post.id,
      title: movieInfo.title,
      description: movieInfo.description,
      genre: movieInfo.genre,
      year: years[index % years.length],
      rating: ratings[index % ratings.length],
      duration: `${90 + (index * 7) % 60}min`,
      poster: `https://picsum.photos/seed/movie${post.id}/300/450`,
      thumbnail: `https://picsum.photos/seed/movie${post.id}/150/150`,
      backdrop: `https://picsum.photos/seed/backdrop${post.id}/1920/1080`,
      featured: index < 5,
    };
  });
};

export const useMovies = () => {
  return useQuery({
    queryKey: ['movies'],
    queryFn: async () => {
      const [postsResponse, photosResponse] = await Promise.all([
        api.get('/posts'),
        api.get('/photos?_limit=20'),
      ]);
      return transformToMovies(postsResponse.data, photosResponse.data);
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useMovie = (id) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: async () => {
      const [postResponse, photosResponse] = await Promise.all([
        api.get(`/posts/${id}`),
        api.get('/photos?_limit=20'),
      ]);
      
      const movies = transformToMovies([postResponse.data], photosResponse.data);
      const movie = movies[0];
      
      const movieIndex = (parseInt(id) - 1) % movieData.length;
      movie.title = movieData[movieIndex].title;
      movie.description = movieData[movieIndex].description;
      movie.genre = movieData[movieIndex].genre;
      
      movie.reviews = reviewTemplates.slice(0, 5).map((review, idx) => ({
        id: idx + 1,
        author: review.author,
        email: `${review.author.toLowerCase().replace(' ', '.')}@email.com`,
        content: review.content,
        rating: (7 + Math.random() * 2.5).toFixed(1),
      }));
      
      return movie;
    },
    enabled: !!id,
  });
};

export const useMoviesByGenre = (genre) => {
  return useQuery({
    queryKey: ['movies', 'genre', genre],
    queryFn: async () => {
      const [postsResponse, photosResponse] = await Promise.all([
        api.get('/posts'),
        api.get('/photos?_limit=20'),
      ]);
      const allMovies = transformToMovies(postsResponse.data, photosResponse.data);
      
      if (!genre || genre === 'All') return allMovies;
      return allMovies.filter(movie => movie.genre === genre);
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useFeaturedMovies = () => {
  return useQuery({
    queryKey: ['movies', 'featured'],
    queryFn: async () => {
      const [postsResponse, photosResponse] = await Promise.all([
        api.get('/posts?_limit=5'),
        api.get('/photos?_limit=5'),
      ]);
      return transformToMovies(postsResponse.data, photosResponse.data);
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useSearchMovies = (searchTerm) => {
  return useQuery({
    queryKey: ['movies', 'search', searchTerm],
    queryFn: async () => {
      const [postsResponse, photosResponse] = await Promise.all([
        api.get('/posts'),
        api.get('/photos?_limit=20'),
      ]);
      const allMovies = transformToMovies(postsResponse.data, photosResponse.data);
      
      if (!searchTerm) return allMovies;
      return allMovies.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    enabled: searchTerm?.length >= 0,
    staleTime: 5 * 60 * 1000,
  });
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get('/users');
      return response.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};
