import React from 'react';
import { Compass, MapPin, Calendar, Heart, Sparkles, Navigation, Layers } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, tripItemCount, savedCount, onOpenAIPlanner }) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 via-amber-500 to-emerald-600 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <span className="text-xl">🌴</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 group-hover:text-orange-600 transition-colors">
                  South TN <span className="text-orange-600">TravelMate</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-orange-100 text-orange-700">
                  Pilot
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Discover • Explore • Plan • Experience
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'home'
                  ? 'bg-orange-50 text-orange-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4" />
              Destinations
            </button>

            <button
              onClick={() => setActiveTab('nearby')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'nearby'
                  ? 'bg-orange-50 text-orange-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Navigation className="w-4 h-4 text-emerald-600" />
              Around Me
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'services'
                  ? 'bg-orange-50 text-orange-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              Services & Guides
            </button>

            <button
              onClick={() => setActiveTab('trip')}
              className={`relative px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'trip'
                  ? 'bg-orange-50 text-orange-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-4 h-4 text-orange-600" />
              My Trip
              {tripItemCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[11px] font-bold rounded-full bg-orange-600 text-white">
                  {tripItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`relative px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === 'saved'
                  ? 'bg-orange-50 text-orange-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Heart className="w-4 h-4 text-rose-500" />
              Saved
              {savedCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[11px] font-bold rounded-full bg-rose-500 text-white">
                  {savedCount}
                </span>
              )}
            </button>
          </nav>

          {/* AI Plan CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAIPlanner}
              className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white px-3.5 sm:px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:shadow-orange-500/20 flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
              <span>Plan with AI</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-100 bg-white text-xs">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center py-1 ${activeTab === 'home' ? 'text-orange-600 font-bold' : 'text-slate-600'}`}
        >
          <Compass className="w-4 h-4 mb-0.5" />
          Explore
        </button>
        <button
          onClick={() => setActiveTab('nearby')}
          className={`flex flex-col items-center py-1 ${activeTab === 'nearby' ? 'text-emerald-600 font-bold' : 'text-slate-600'}`}
        >
          <Navigation className="w-4 h-4 mb-0.5" />
          Around Me
        </button>
        <button
          onClick={() => setActiveTab('trip')}
          className={`flex flex-col items-center py-1 ${activeTab === 'trip' ? 'text-orange-600 font-bold' : 'text-slate-600'}`}
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          My Trip ({tripItemCount})
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`flex flex-col items-center py-1 ${activeTab === 'services' ? 'text-orange-600 font-bold' : 'text-slate-600'}`}
        >
          <Layers className="w-4 h-4 mb-0.5" />
          Services
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex flex-col items-center py-1 ${activeTab === 'saved' ? 'text-rose-600 font-bold' : 'text-slate-600'}`}
        >
          <Heart className="w-4 h-4 mb-0.5" />
          Saved ({savedCount})
        </button>
      </div>
    </header>
  );
}
