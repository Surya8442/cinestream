import React from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative group cursor-pointer"
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <div className="aspect-video w-full rounded-2xl overflow-hidden bg-bg-surface relative border border-white/5 shadow-2xl transition-all duration-300 group-hover:border-brand/50 group-hover:shadow-[0_0_20px_rgba(229,9,20,0.1)]">
        <img
          src={movie.thumbnail}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
          <div className="flex items-center gap-2 mb-3">
            <button className="w-9 h-9 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors shadow-lg">
              <Play className="w-4 h-4 fill-black text-black ml-0.5" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors">
              <ThumbsUp className="w-4 h-4" />
            </button>
          </div>
          
          <h3 className="text-sm font-black text-white mb-1 line-clamp-1 group-hover:translate-y-0 translate-y-2 transition-transform duration-300 tracking-tight">{movie.title.toUpperCase()}</h3>
          <div className="flex items-center gap-2 text-[10px] text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="text-brand font-black">{(movie.rating * 20).toFixed(0)}% MATCH</span>
            <span className="bg-white/10 px-1.5 rounded">{movie.year}</span>
            <span className="bg-white/10 px-1.5 rounded uppercase">{movie.language}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
