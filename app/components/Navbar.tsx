"use client";
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, PlusCircle, Trophy, Search, X, GitMerge, Twitter } from 'lucide-react';
import { useStore } from '@/store/store';
import { TokenStats } from './TokenStats';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ twinId: string; twinHandle: string; personality: string }>>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const allTwins = useStore((state) => state.allTwins);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    setIsLoggedIn(!!userId);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = allTwins.filter((twin: { twinHandle: string; personality: string }) => 
      twin.twinHandle.toLowerCase().includes(query.toLowerCase()) ||
      twin.personality.toLowerCase().includes(query.toLowerCase())
    ).map(({ twinId, twinHandle, personality }: { twinId: string; twinHandle: string; personality: string }) => ({
      twinId,
      twinHandle,
      personality
    }));

    setSearchResults(filtered);
  };

  const handleSelectResult = (twinId: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    router.push(`/analytics/${twinId}`);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      localStorage.removeItem('userId');
      setIsLoggedIn(false);
      window.location.href = '/login'; 
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="bg-white/10 backdrop-blur-lg border-b border-white/10 relative z-50 transition-colors duration-200 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Twitter className="h-6 w-6 text-purple-400" />
              <span className="ml-2 text-lg font-semibold text-white">Twin.fun</span>
            </Link>
            <div className="ml-6">
              <TokenStats />
            </div>
          </div>    
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div ref={searchRef} className="relative">
              <div className="flex items-center">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-purple-300 hover:text-purple-200 rounded-full hover:bg-white/5 transition-colors"
                >
                  <Search className="h-5 w-5" />
                </button>
                {isSearchOpen && (
                  <div className="absolute right-0 top-0 mt-1">
                    <div className="flex items-center bg-white/10 backdrop-blur-lg rounded-full shadow-lg">
                      <input
                        ref={inputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search Twins..."
                        className="w-64 px-4 py-2 bg-transparent text-white placeholder-purple-300 focus:outline-none rounded-l-full"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setSearchResults([]);
                          }}
                          className="p-2 text-purple-300 hover:text-purple-200"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    {searchResults.length > 0 && (
                      <div className="absolute mt-2 w-full bg-white/10 backdrop-blur-lg rounded-lg shadow-lg py-1 max-h-96 overflow-y-auto">
                        {searchResults.map((result) => (
                          <button
                            key={result.twinId}
                            onClick={() => handleSelectResult(result.twinId)}
                            className="w-full px-4 py-2 text-left hover:bg-white/5 transition-colors flex items-center justify-between"
                          >
                            <span className="text-white">@{result.twinHandle}</span>
                            <span className="text-sm text-purple-300">{result.personality}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/marketplace" className="flex items-center px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap text-purple-200 hover:text-white hover:bg-white/5 transition-colors">
                <ShoppingBag className="h-5 w-5 mr-1.5" />
                <span>Marketplace</span>
              </Link>
              <Link href="/clone" className="flex items-center px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap text-purple-200 hover:text-white hover:bg-white/5 transition-colors">
                <GitMerge className="h-5 w-5 mr-1.5" />
                <span>Clone Lab</span>
              </Link>
              <Link href="/leaderboard" className="flex items-center px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap text-purple-200 hover:text-white hover:bg-white/5 transition-colors">
                <Trophy className="h-5 w-5 mr-1.5" />
                <span>Leaderboard</span>
              </Link>             
              {/* Gold Create Twin Button */}
              <Link href="/createtwin" className="flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ml-4 text-amber-900 bg-gradient-to-r from-amber-200 to-amber-400 hover:from-amber-300 hover:to-amber-500 transition-colors shadow-lg hover:shadow-amber-500/20 border border-amber-300">
                <PlusCircle className="h-5 w-5 mr-1.5" />
                <span className="font-semibold">Create Twin</span>
              </Link>
            </div>
            {/* Login/Logout Button */}
            <div className="flex items-center">
              {isLoggedIn ? (
                <button onClick={handleLogout} className="text-purple-400 hover:text-purple-200">
                  Logout
                </button>
              ) : (
                <button onClick={handleLogin} className="text-purple-400 hover:text-purple-200">
                  Login
                </button>
              )}
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center ml-2">
              <button className="p-2 text-purple-300 hover:text-purple-200 rounded-full hover:bg-white/5">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}