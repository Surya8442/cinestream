import React from 'react';
import { Play, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../types';

interface HeroProps {
  movie: Movie;
}

export default function Hero({ movie }: HeroProps) {
  const navigate = useNavigate();

  return (
    <div className="relative h-[80vh] md:h-[90vh] w-full p-4 md:p-12 pt-24 md:pt-32">
      <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-white/5 bg-bg-card shadow-2xl group">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[7s] group-hover:scale-105"
          style={{ backgroundImage: `url(${movie.thumbnail})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        </div>

        <div className="relative z-20 h-full flex flex-col justify-end p-8 md:p-16 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex gap-2 mb-4">
              <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/10">Action</span>
              <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/10">Sci-Fi</span>
              <span className="bg-brand/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border border-brand/20 text-brand">Featured</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black mb-6 leading-none tracking-tighter">
              {movie.title}
            </h1>
            
            <p className="text-base md:text-lg text-gray-300 mb-8 max-w-xl line-clamp-2">
              {movie.description}
            </p>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate(`/watch/${movie.id}`)}
                className="flex items-center gap-2 px-8 py-3.5 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all scale-100 hover:scale-105 active:scale-95 shadow-xl"
              >
                <Play className="w-5 h-5 fill-black" />
                Watch Now
              </button>
              <button 
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="flex items-center gap-2 px-8 py-3.5 bg-white/10 text-white font-bold rounded-xl border border-white/10 backdrop-blur-md hover:bg-white/20 transition-all scale-100 hover:scale-105 active:scale-95"
              >
                + My List
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
