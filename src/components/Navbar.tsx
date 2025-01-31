import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, PlusCircle, Trophy, Search, X, GitMerge, Twitter } from 'lucide-react';
import { useMarketplaceStore } from '../store/marketplace';
import { ThemeToggle } from './ThemeToggle';
import { TokenStats } from './TokenStats';

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{ id: string; twinHandle: string; personality: string }>>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const agents = useMarketplaceStore((state) => state.agents);

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = agents.filter(agent => 
      agent.twinHandle.toLowerCase().includes(query.toLowerCase()) ||
      agent.personality.toLowerCase().includes(query.toLowerCase())
    ).map(({ id, twinHandle, personality }) => ({
      id,
      twinHandle,
      personality
    }));

    setSearchResults(filtered);
  };

  const handleSelectResult = (agentId: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    navigate(`/analytics/${agentId}`);
  };

  return (
    <nav className="bg-white/10 backdrop-blur-lg border-b border-white/10 relative z-50 transition-colors duration-200 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="flex items-center"
            >
              <Twitter className="h-6 w-6 text-purple-400" />
              <span className="ml-2 text-lg font-semibold text-white">Twin.fun</span>
            </NavLink>

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
                            key={result.id}
                            onClick={() => handleSelectResult(result.id)}
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

            <ThemeToggle />

            <div className="hidden md:flex items-center space-x-2">
              <NavLink
                to="/marketplace"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    isActive
                      ? 'text-white bg-purple-500/50'
                      : 'text-purple-200 hover:text-white hover:bg-white/5'
                  } transition-colors`
                }
              >
                <ShoppingBag className="h-5 w-5 mr-1.5" />
                <span>Marketplace</span>
              </NavLink>
              <NavLink
                to="/clone"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    isActive
                      ? 'text-white bg-purple-500/50'
                      : 'text-purple-200 hover:text-white hover:bg-white/5'
                  } transition-colors`
                }
              >
                <GitMerge className="h-5 w-5 mr-1.5" />
                <span>Clone Lab</span>
              </NavLink>
              <NavLink
                to="/leaderboard"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    isActive
                      ? 'text-white bg-purple-500/50'
                      : 'text-purple-200 hover:text-white hover:bg-white/5'
                  } transition-colors`
                }
              >
                <Trophy className="h-5 w-5 mr-1.5" />
                <span>Leaderboard</span>
              </NavLink>
              
              {/* Gold Create Twin Button */}
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ml-4 ${
                    isActive
                      ? 'text-amber-900 bg-gradient-to-r from-amber-200 to-amber-400'
                      : 'text-amber-900 bg-gradient-to-r from-amber-200 to-amber-400 hover:from-amber-300 hover:to-amber-500'
                  } transition-colors shadow-lg hover:shadow-amber-500/20 border border-amber-300`
                }
              >
                <PlusCircle className="h-5 w-5 mr-1.5" />
                <span className="font-semibold">Create Twin</span>
              </NavLink>
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