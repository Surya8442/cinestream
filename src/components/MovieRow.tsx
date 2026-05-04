import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Movie } from '../types';
import MovieCard from './MovieCard';

interface MovieRowProps {
  title: string;
  movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="px-4 md:px-12 py-8 group/row">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-white/90">
        {title}
      </h2>

      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-10 w-12 bg-black/40 opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black/60 hidden md:flex items-center justify-center"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto movie-row-scroll scroll-smooth pb-4"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-none w-[200px] md:w-[280px]">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-10 w-12 bg-black/40 opacity-0 group-hover/row:opacity-100 transition-opacity hover:bg-black/60 hidden md:flex items-center justify-center"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}
