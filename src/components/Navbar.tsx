import React, { useState, useEffect, useRef } from 'react';
import { Search, Bell, User, ChevronDown, LogOut, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (showSearch) {
      searchInputRef.current?.focus();
    }
  }, [showSearch]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'TV Shows', path: '/tv-shows' },
    { name: 'Movies', path: '/movies' },
    { name: 'New & Popular', path: '/popular' },
    { name: 'My List', path: '/my-list' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-500 flex items-center justify-between px-4 md:px-12 py-6",
      isScrolled ? "bg-bg-deep/90 backdrop-blur-xl border-b border-white/5" : "bg-gradient-to-b from-black/80 to-transparent"
    )}>
      <div className="flex items-center gap-10">
        <h1 
          onClick={() => navigate('/')}
          className="text-brand text-3xl font-black cursor-pointer tracking-tighter uppercase"
        >
          CINESTREAM
        </h1>
        
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-white",
                location.pathname === link.path ? "text-white" : "text-gray-400"
              )}
            >
              {link.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-white">
          <div className={cn(
            "flex items-center transition-all duration-300 overflow-hidden",
            showSearch ? "w-48 md:w-72 bg-bg-surface px-4 py-2 rounded-full border border-white/10" : "w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5"
          )}>
            <Search 
              className={cn("w-4 h-4 cursor-pointer shrink-0 transition-colors", showSearch ? "text-gray-400" : "text-white")} 
              onClick={() => setShowSearch(!showSearch)} 
            />
            {showSearch && (
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search titles, cast, genres"
                className="bg-transparent border-none outline-none text-xs ml-2 w-full text-white placeholder:text-gray-600"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => !searchQuery && setShowSearch(false)}
              />
            )}
          </div>
          <Bell className="w-5 h-5 cursor-pointer text-gray-400 hover:text-white transition-colors" />
          
          <div className="relative">
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-brand to-orange-500 overflow-hidden flex items-center justify-center border border-white/20">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" alt="user" className="w-8 h-8 opacity-90" />
              </div>
            </div>

            {showProfileMenu && (
              <div className="absolute right-0 mt-4 w-48 bg-black/90 border border-white/10 rounded overflow-hidden shadow-2xl backdrop-blur-xl">
                <div className="p-3 border-bottom border-white/10">
                  <p className="text-xs text-gray-400">Signed in as</p>
                  <p className="text-sm font-medium">Streamer One</p>
                </div>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 flex items-center gap-2">
                  <User className="w-4 h-4" /> Account
                </button>
                <button className="w-full text-left px-4 py-2 text-sm hover:bg-white/10 flex items-center gap-2 text-red-500">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
