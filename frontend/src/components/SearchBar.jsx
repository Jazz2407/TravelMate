import React, { useState } from 'react';
import { Search, Sparkles, X, ArrowRight, Filter } from 'lucide-react';

export default function SearchBar({ onSearch, isSearching, onSelectDestination }) {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState('normal'); // 'normal' | 'ai'
  const [extractedIntent, setExtractedIntent] = useState(null);

  const sampleQueries = [
    { text: "Madurai", type: "normal" },
    { text: "Meenakshi Temple", type: "normal" },
    { text: "restaurants in Madurai", type: "normal" },
    { text: "hotels near Courtallam", type: "normal" },
    { text: "Find family hotel near Meenakshi under ₹2500", type: "ai" },
    { text: "Budget peaceful nature near Courtallam", type: "ai" }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!query.trim()) return;
    onSearch(query, mode);
  };

  const handleQuickClick = (item) => {
    setQuery(item.text);
    setMode(item.type);
    onSearch(item.text, item.type);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMode('normal')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              mode === 'normal'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-200/70 text-slate-700 hover:bg-slate-300'
            }`}
          >
            🔍 Normal Search (Core DB)
          </button>
          <button
            type="button"
            onClick={() => setMode('ai')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
              mode === 'ai'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-xs'
                : 'bg-orange-100/70 text-orange-800 hover:bg-orange-200'
            }`}
          >
            <Sparkles className="w-3 h-3 text-amber-300" />
            AI Natural Language Search
          </button>
        </div>

        <span className="text-[11px] text-slate-500 hidden sm:inline">
          {mode === 'normal' ? 'Fast direct relational query' : 'Intent parser + DB candidate lookup'}
        </span>
      </div>

      {/* Main Search Input Form */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className={`relative flex items-center rounded-2xl bg-white shadow-lg border transition-all overflow-hidden ${
          mode === 'ai' ? 'border-orange-400 ring-2 ring-orange-200' : 'border-slate-300 focus-within:border-slate-500 focus-within:ring-2 focus-within:ring-slate-200'
        }`}>
          <div className="pl-4 pr-2 text-slate-400">
            {mode === 'ai' ? (
              <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />
            ) : (
              <Search className="w-5 h-5 text-slate-500" />
            )}
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              mode === 'ai'
                ? "Try: 'Find a family-friendly hotel near Meenakshi Temple under ₹2000'..."
                : "Search destinations, temples, restaurants, hotels, guides..."
            }
            className="w-full py-4 text-sm sm:text-base text-slate-900 placeholder-slate-400 bg-transparent outline-none focus:ring-0"
          />

          {query && (
            <button
              type="button"
              onClick={() => { setQuery(''); setExtractedIntent(null); }}
              className="p-1.5 text-slate-400 hover:text-slate-600 mr-2 rounded-full hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            disabled={isSearching}
            className={`mr-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white flex items-center gap-1.5 shadow-md transition-all active:scale-95 ${
              mode === 'ai'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700'
                : 'bg-slate-900 hover:bg-slate-800'
            }`}
          >
            {isSearching ? (
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Searching
              </span>
            ) : (
              <>
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* Suggested Quick Searches */}
      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
        <span className="font-semibold text-slate-500">Quick Search:</span>
        {sampleQueries.map((item, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleQuickClick(item)}
            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-orange-300 hover:bg-orange-50/50 hover:text-orange-700 transition-colors flex items-center gap-1 shadow-2xs"
          >
            {item.type === 'ai' && <Sparkles className="w-2.5 h-2.5 text-orange-500" />}
            {item.text}
          </button>
        ))}
      </div>
    </div>
  );
}
