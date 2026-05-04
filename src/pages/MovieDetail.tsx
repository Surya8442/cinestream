import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';

// @ts-ignore
const Player = ReactPlayer as any;
import { Play, Download, Plus, ThumbsUp, X, ChevronLeft, Star, Clock, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Movie } from '../types';
import Navbar from '../components/Navbar';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPlayer, setShowPlayer] = useState(false);
  const [quality, setQuality] = useState('1080p');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`/api/movies/${id}`);
        setMovie(res.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return null;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="min-h-screen bg-bg-deep text-white">
      <Navbar />
      
      {/* Immersive Detail View */}
      <div className="relative w-full pt-20">
        <div 
          className="absolute inset-0 h-[60vh] md:h-[70vh] bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.thumbnail})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/60 to-transparent" />
        </div>

        <div className="relative z-10 px-4 md:px-12 pt-16 md:pt-24 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
          {/* Movie Poster/Thumbnail */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-1/3 aspect-[2/3] rounded-3xl shadow-2xl overflow-hidden border border-white/5"
          >
            <img src={movie.thumbnail} alt={movie.title} className="w-full h-full object-cover" />
          </motion.div>

          {/* Details Content */}
          <div className="flex-1 space-y-8 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="text-brand font-black tracking-tighter text-sm">{(movie.rating * 20).toFixed(0)}% MATCH</span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/5 tracking-wider"><Calendar className="w-3.5 h-3.5" /> {movie.year}</span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/5 tracking-wider"><Clock className="w-3.5 h-3.5" /> {movie.duration}</span>
                <span className="bg-brand/10 text-brand px-2 py-1 text-[10px] font-black border border-brand/20 rounded">U/A 16+</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none">{movie.title.toUpperCase()}</h1>
              
              <div className="flex flex-wrap gap-3 mb-10">
                <button 
                  onClick={() => setShowPlayer(true)}
                  className="flex items-center gap-2 px-10 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all shadow-xl active:scale-95"
                >
                  <Play className="w-5 h-5 fill-black" /> WATCH NOW
                </button>
                <div className="flex items-center gap-3">
                  <button className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                    <Plus className="w-6 h-6" />
                  </button>
                  <button className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                    <ThumbsUp className="w-6 h-6" />
                  </button>
                  <div className="relative group">
                    <button className="flex items-center gap-3 px-8 py-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                      <Download className="w-5 h-5" /> DOWNLOAD
                    </button>
                    {/* Quality Selector */}
                    <div className="absolute bottom-full mb-2 left-0 hidden group-hover:block bg-bg-card border border-white/10 rounded-2xl overflow-hidden z-20 w-48 shadow-2xl backdrop-blur-xl p-2">
                       <p className="text-[10px] font-bold text-gray-500 p-2 uppercase tracking-widest">Select Quality</p>
                      {['360p', '480p', '720p', '1080p'].map(q => (
                        <button 
                          key={q}
                          onClick={() => alert(`Simulating ${q} download...`)}
                          className="w-full text-left px-3 py-2.5 hover:bg-white/5 text-sm transition-colors rounded-xl font-medium"
                        >
                          {q} (High Definition)
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-4xl font-medium">
                {movie.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 mt-12 border-t border-white/5">
                <div className="space-y-4">
                   <div>
                     <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Director</h4>
                     <p className="text-sm font-bold text-white">Christopher Nolan</p>
                   </div>
                   <div>
                     <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Cast</h4>
                     <p className="text-sm font-medium text-white/80 leading-relaxed">{movie.cast.join(', ')}</p>
                   </div>
                </div>
                <div className="space-y-4">
                   <div>
                     <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Production</h4>
                     <p className="text-sm font-bold text-white">CineStream Originals</p>
                   </div>
                   <div>
                     <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-2">Genres</h4>
                     <p className="text-sm font-medium text-white/80">{movie.category === 'bollywood' ? 'Drama, Musical, Action' : 'Blockbuster, Thriller, Sci-Fi'}</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      <AnimatePresence>
        {showPlayer && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          >
             <button 
               onClick={() => setShowPlayer(false)}
               className="absolute top-8 right-8 text-white hover:text-gray-400 z-[110]"
             >
               <X className="w-10 h-10" />
             </button>

             <div className="w-full h-full md:w-[90vw] md:h-[80vh] relative">
                <Player
                  url={movie.videoUrl}
                  width="100%"
                  height="100%"
                  playing
                  controls
                  onEnded={() => setShowPlayer(false)}
                />
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
