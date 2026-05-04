import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import { Movie, Category } from '../types';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, categoriesRes] = await Promise.all([
          axios.get('/api/movies'),
          axios.get('/api/categories')
        ]);
        setMovies(moviesRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || movies.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-black">
        <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Group movies by category
  const featuredMovie = movies.find(m => m.category === 'trending') || movies[0];

  return (
    <div className="min-h-screen bg-bg-deep text-white pb-20">
      <Navbar />
      
      <main className="max-w-[1440px] mx-auto">
        <Hero movie={featuredMovie} />
        
        {/* Bento Grid Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 md:px-12 mt-8">
           {/* Trending Now Card */}
           <div className="md:col-span-4 rounded-3xl bg-bg-card border border-white/5 p-6 flex flex-col justify-between group hover:border-brand/40 transition-colors">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Trending Now</h3>
                <div className="text-brand">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"></path></svg>
                </div>
              </div>
              <div className="mt-8">
                <h2 className="text-2xl font-bold">{movies[5]?.title || 'Rise of the Dynasty'}</h2>
                <p className="text-xs text-gray-500 mt-1">Trending in #Bollywood • 12k Active Views</p>
              </div>
              <div className="mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-brand w-[75%] transition-all duration-1000 group-hover:w-[90%]"></div>
              </div>
           </div>

           {/* Continue Watching Section */}
           <div className="md:col-span-5 rounded-3xl bg-bg-card border border-white/5 p-6 flex flex-col hover:border-white/20 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Continue Watching</h3>
                <span className="text-[10px] text-gray-500">2/4 Episodes</span>
              </div>
              <div className="flex items-center gap-4 flex-1">
                <div className="w-24 h-full bg-bg-surface rounded-xl overflow-hidden min-h-[80px]">
                  <img src={movies[0]?.thumbnail} alt="continue" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm">Pathaan</h4>
                  <p className="text-[10px] text-gray-500">2h 26m • Action, Spy</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex-1 h-1 bg-white/10 rounded-full">
                      <div className="w-[45%] h-full bg-brand"></div>
                    </div>
                    <span className="text-[10px] font-mono">1:05:22 / 2:26:00</span>
                  </div>
                </div>
              </div>
           </div>

           {/* Quick Stats / Recommendation */}
           <div className="md:col-span-3 rounded-3xl bg-gradient-to-br from-brand to-red-900/40 p-6 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(229,9,20,0.3)] transition-all">
              <div className="text-xs font-bold uppercase tracking-widest opacity-80">For You</div>
              <div className="mt-4">
                <div className="text-4xl font-black">98%</div>
                <div className="text-[10px] leading-tight font-medium opacity-80 mt-1">Match rating based on your watch history</div>
              </div>
              <button className="mt-6 w-full bg-black/20 backdrop-blur-md border border-white/20 rounded-xl py-2.5 text-xs font-bold hover:bg-black/40 transition-colors">
                View Recommendations
              </button>
           </div>
        </div>

        {/* Categories Quick Nav */}
        <div className="px-4 md:px-12 mt-8">
           <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {categories.map(cat => (
                <button key={cat.id} className="bg-bg-card border border-white/5 rounded-2xl py-6 flex items-center justify-center text-[10px] font-bold uppercase tracking-tighter hover:bg-brand transition-all hover:scale-105 active:scale-95 shadow-lg">
                  {cat.name.replace(' Blockbusters', '').replace(' Hits', '')}
                </button>
              ))}
           </div>
        </div>

        {/* Traditional Rows */}
        <div className="relative z-10 mt-8">
          {categories.map((category) => {
            const categoryMovies = movies.filter(m => 
              category.id === 'trending' ? true : m.category === category.id
            );
            
            if (categoryMovies.length === 0) return null;

            return (
              <MovieRow 
                key={category.id} 
                title={category.name} 
                movies={categoryMovies} 
              />
            );
          })}
        </div>
      </main>

      <footer className="mt-12 flex flex-col md:flex-row items-center justify-between px-4 md:px-12 py-8 border-t border-white/5 bg-bg-card">
        <div className="flex flex-wrap gap-4 md:gap-8 text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
          <span>© 2026 CINESTREAM MEDIA</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> 
            Server: Asia-South (AWS-EC2)
          </span>
          <span>PostgreSQL Ready</span>
          <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
        </div>
        <div className="mt-4 md:mt-0 flex gap-4">
          <span className="text-[10px] bg-white/5 px-3 py-1 rounded-full text-gray-400 border border-white/10">v4.2.0-STABLE</span>
        </div>
      </footer>
    </div>
  );
}
