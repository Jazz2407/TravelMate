import React, { useState } from 'react';
import { Compass, Sparkles, MapPin, ArrowRight, Shield, Award, Calendar, Heart, Coffee, Droplets } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import { api } from '../api';

export default function HomePage({
  destinations = [],
  onSelectDestination,
  onOpenAIPlanner,
  onToggleSave,
  savedIds = [],
  onSelectCategory
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [smartRecs, setSmartRecs] = useState(null);
  const [loadingRecs, setLoadingRecs] = useState(false);

  const categories = [
    { id: 'All', label: 'All South TN', emoji: '🌴' },
    { id: 'Heritage', label: 'Heritage', emoji: '🏛️' },
    { id: 'Spiritual', label: 'Spiritual', emoji: '🛕' },
    { id: 'Nature', label: 'Nature', emoji: '🌿' },
    { id: 'Beaches', label: 'Beaches', emoji: '🌊' },
    { id: 'Food', label: 'Food & Sweets', emoji: '🍛' },
    { id: 'Culture', label: 'Culture & Arts', emoji: '🎭' }
  ];

  const handleSearch = async (query, mode) => {
    setIsSearching(true);
    try {
      if (mode === 'ai') {
        const res = await api.searchWithNL(query);
        setSearchResults(res.matched_results);
      } else {
        const res = await api.search(query);
        setSearchResults(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSmartRec = async (persona) => {
    setLoadingRecs(true);
    try {
      const res = await api.getRecommendations(persona);
      setSmartRecs(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRecs(false);
    }
  };

  const filteredDestinations = selectedCategory === 'All'
    ? destinations
    : destinations.filter(d => d.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-stone-900 to-orange-950 text-white p-8 sm:p-12 lg:p-16 shadow-xl">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-orange-300 text-xs font-bold border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            Pilot Ecosystem • 5 Regional Gateways
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
            South Tamil Nadu <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400">
              TravelMate
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            A unified tourism platform connecting travellers with historic monuments, local guides,
            coastal delicacies, and herbal waterfalls across Madurai, Tirunelveli, Courtallam, Kanyakumari, and Rameswaram.
          </p>

          <div className="pt-2 text-xs text-orange-200/90 font-medium">
            <span className="font-bold text-white">Core Principle:</span> Tourism platform first → Grounded AI intelligence second.
          </div>
        </div>

        {/* Search Bar Mounted in Hero */}
        <div className="relative z-10 mt-8">
          <SearchBar
            onSearch={handleSearch}
            isSearching={isSearching}
            onSelectDestination={onSelectDestination}
          />
        </div>
      </section>

      {/* Search Results Display (if active) */}
      {searchResults && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm animate-in fade-in duration-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Search Results for "{searchResults.query}"
              </h3>
              <p className="text-xs text-slate-500">
                Found {searchResults.total_results} matching items across the South TN tourism catalog
              </p>
            </div>
            <button
              onClick={() => setSearchResults(null)}
              className="text-xs font-bold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-lg border border-slate-200"
            >
              Clear Results
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Matching Destinations */}
            {searchResults.destinations?.map(d => (
              <div
                key={d.id}
                onClick={() => onSelectDestination(d.id)}
                className="p-4 rounded-2xl border border-orange-200 bg-orange-50/40 hover:border-orange-400 hover:shadow-md cursor-pointer transition-all flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-orange-700">Destination</span>
                  <h4 className="text-sm font-extrabold text-slate-900">{d.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{d.district} District</p>
                </div>
              </div>
            ))}

            {/* Matching Attractions */}
            {searchResults.attractions?.map(a => (
              <div
                key={a.id}
                onClick={() => onSelectDestination(a.destination_id)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-orange-300 hover:shadow-md cursor-pointer transition-all flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <img src={a.image} alt={a.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-amber-700">Attraction</span>
                  <h4 className="text-sm font-extrabold text-slate-900">{a.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{a.category} • {a.estimated_duration}</p>
                </div>
              </div>
            ))}

            {/* Matching Restaurants */}
            {searchResults.restaurants?.map(r => (
              <div
                key={r.id}
                onClick={() => onSelectDestination(r.destination_id)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-md cursor-pointer transition-all flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-700">Food / Restaurant</span>
                  <h4 className="text-sm font-extrabold text-slate-900">{r.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{r.cuisine} • {r.price_range}</p>
                </div>
              </div>
            ))}

            {/* Matching Hotels */}
            {searchResults.hotels?.map(h => (
              <div
                key={h.id}
                onClick={() => onSelectDestination(h.destination_id)}
                className="p-4 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md cursor-pointer transition-all flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-blue-700">Hotel</span>
                  <h4 className="text-sm font-extrabold text-slate-900">{h.name}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{h.price_range}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Explore by Category Chips */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">Explore by Interest</h2>
            <p className="text-xs sm:text-sm text-slate-500">Filter regional gateways by your travel style</p>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold shrink-0 flex items-center gap-2 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-md scale-105'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <span className="text-base">{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* 5 Pilot Regional Destinations Cards */}
      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Pilot Gateways: South Tamil Nadu
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Curated pilot region ready for statewide scale
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map(dest => {
            const isSaved = savedIds.includes(dest.id);
            return (
              <div
                key={dest.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-orange-300 hover:shadow-xl transition-all flex flex-col justify-between"
              >
                {/* Image & Badges */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                    {dest.category}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave({
                        item_id: dest.id,
                        type: 'destination',
                        title: dest.name,
                        subtitle: `${dest.district} District`,
                        image: dest.image
                      });
                    }}
                    className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
                      isSaved ? 'bg-rose-500 text-white' : 'bg-black/30 hover:bg-black/50 text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-2xl font-extrabold">{dest.name}</h3>
                    <p className="text-xs text-orange-200 font-medium">{dest.tagline}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {dest.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                    <div className="flex items-center gap-1 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-orange-600" />
                      <span>{dest.best_time}</span>
                    </div>
                    <span className="font-bold text-slate-700">{dest.estimated_visit_duration}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectDestination(dest.id)}
                    className="w-full py-3 rounded-2xl bg-orange-50 hover:bg-orange-600 text-orange-700 hover:text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-2 group/btn"
                  >
                    <span>Explore Destination Ecosystem</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI Feature 2: Smart Persona Recommendations */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-emerald-50 rounded-3xl p-6 sm:p-8 border border-orange-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-600 text-white text-[11px] font-bold mb-2">
              <Sparkles className="w-3 h-3 text-amber-200" />
              AI Feature 2 — Smart Recommendations
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Personalized Discovery by Interest
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Grounds LLM reasoning against the catalog to avoid hallucinations.
            </p>
          </div>

          {/* Persona Prompt Shortcuts */}
          <div className="flex flex-wrap gap-2">
            {[
              "nature and photography",
              "pilgrimage & devotional architecture",
              "legendary street food & halwa",
              "coastal serenity & ocean sunset"
            ].map((persona, idx) => (
              <button
                key={idx}
                onClick={() => handleSmartRec(persona)}
                className="px-3 py-1.5 rounded-xl bg-white border border-orange-200 hover:border-orange-400 text-xs font-bold text-slate-700 hover:text-orange-700 transition-all shadow-2xs"
              >
                "{persona}"
              </button>
            ))}
          </div>
        </div>

        {/* Smart Recommendations Output Box */}
        {loadingRecs ? (
          <div className="p-8 text-center bg-white/80 rounded-2xl border border-orange-200">
            <span className="w-6 h-6 border-2 border-orange-600 border-t-transparent rounded-full animate-spin inline-block mb-2"></span>
            <p className="text-xs font-bold text-slate-600">Synthesizing personalized attractions from database...</p>
          </div>
        ) : smartRecs ? (
          <div className="bg-white rounded-2xl p-5 border border-orange-200 space-y-4 shadow-sm animate-in fade-in">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <span className="text-xs font-extrabold text-orange-700">{smartRecs.curated_theme}</span>
                <p className="text-xs text-slate-500 mt-0.5">Matched for: "{smartRecs.persona_query}"</p>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                💡 {smartRecs.local_tip}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {smartRecs.recommended_attractions?.map(a => (
                <div key={a.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                    <img src={a.image} alt={a.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{a.name}</h5>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{a.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 px-4 bg-white/60 rounded-2xl border border-dashed border-orange-200 text-xs text-slate-600">
            Click any interest persona pill above to see how AI matches verified attractions from the database.
          </div>
        )}
      </section>

      {/* Differentiation & Mission Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-lg">
            1
          </div>
          <h4 className="font-extrabold text-slate-900 text-base">Destination Ecosystem</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Not just tourist monuments. We integrate the entire orbit: local eateries, certified temple guides, handicrafts, and stay facilities.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
            2
          </div>
          <h4 className="font-extrabold text-slate-900 text-base">Local Economy Empowerment</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Directly channels tourist footfall to authentic traditional artisans, sungudi weavers, halwa makers, and licensed local storytellers.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
            3
          </div>
          <h4 className="font-extrabold text-slate-900 text-base">Dynamic Weather Adaptation</h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            The platform reroutes itineraries on adverse weather alerts (such as monsoon rain), replacing outdoor waterfalls with sheltered heritage halls.
          </p>
        </div>
      </section>
    </div>
  );
}
