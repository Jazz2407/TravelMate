import React, { useState, useEffect } from 'react';
import { Navigation, MapPin, Utensils, Hotel, UserCheck, Sparkles, Plus, Check } from 'lucide-react';
import InteractiveMap from './InteractiveMap';

export default function AroundMeRadar({
  initialCenter = [9.9195, 78.1193],
  initialTitle = "Meenakshi Amman Temple (Madurai)",
  onAddToTrip,
  tripItems = []
}) {
  const [radius, setRadius] = useState(3); // 1, 3, 5, 10 km
  const [activeCategory, setActiveCategory] = useState('all'); // all, restaurant, hotel, guide, experience
  const [nearbyData, setNearbyData] = useState({
    attractions: [],
    restaurants: [],
    hotels: [],
    guides: [],
    experiences: [],
    total_nearby: 0
  });
  const [loading, setLoading] = useState(false);
  const [selectedPin, setSelectedPin] = useState(null);

  // Fetch nearby items whenever center or radius changes
  useEffect(() => {
    async function loadNearby() {
      setLoading(true);
      try {
        const res = await fetch(`/api/nearby?lat=${initialCenter[0]}&lng=${initialCenter[1]}&radius=${radius}`);
        if (res.ok) {
          const data = await res.json();
          setNearbyData(data);
        }
      } catch (err) {
        console.error("Failed to load nearby:", err);
      } finally {
        setLoading(false);
      }
    }
    loadNearby();
  }, [initialCenter, radius]);

  // Combine items for map
  const allMapItems = [
    ...nearbyData.attractions.map(a => ({ ...a, type: 'attraction' })),
    ...nearbyData.restaurants.map(r => ({ ...r, type: 'restaurant' })),
    ...nearbyData.hotels.map(h => ({ ...h, type: 'hotel' })),
    ...nearbyData.experiences.map(e => ({ ...e, type: 'experience' })),
  ];

  const filteredMapItems = activeCategory === 'all'
    ? allMapItems
    : allMapItems.filter(item => item.type === activeCategory);

  const isItemInTrip = (name) => {
    return tripItems.some(i => i.title?.toLowerCase() === name?.toLowerCase());
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
      {/* Header & Concept Diagram */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 text-emerald-800 text-xs font-bold mb-2">
            <Navigation className="w-3.5 h-3.5" />
            Signature Feature: Local Ecosystem Hub
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            "Around Me" Proximity Radar
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Discover local businesses and services orbiting around <span className="font-semibold text-slate-900">{initialTitle}</span>.
          </p>
        </div>

        {/* Radius Toggle Pill Group (1 km | 3 km | 5 km | 10 km) */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl self-start md:self-auto">
          <span className="text-xs font-bold text-slate-600 px-2">Radius:</span>
          {[1, 3, 5, 10].map((r) => (
            <button
              key={r}
              onClick={() => setRadius(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                radius === r
                  ? 'bg-orange-600 text-white shadow-sm scale-105'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              {r} km
            </button>
          ))}
        </div>
      </div>

      {/* Visual Orbiting Ecosystem Diagram */}
      <div className="hidden lg:flex items-center justify-around py-3 px-4 mb-6 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-emerald-50 border border-orange-100/70 text-xs">
        <div className="flex items-center gap-2 font-bold text-blue-700 bg-white/80 px-3 py-1.5 rounded-xl shadow-2xs">
          <Hotel className="w-4 h-4" /> Hotel
        </div>
        <div className="h-0.5 w-8 bg-orange-300"></div>
        <div className="flex items-center gap-2 font-bold text-emerald-700 bg-white/80 px-3 py-1.5 rounded-xl shadow-2xs">
          <Utensils className="w-4 h-4" /> Restaurant
        </div>
        <div className="h-0.5 w-8 bg-orange-400"></div>
        <div className="flex items-center gap-2 font-extrabold text-white bg-orange-600 px-4 py-2 rounded-xl shadow-md">
          <MapPin className="w-4 h-4" /> CURRENT SPOT
        </div>
        <div className="h-0.5 w-8 bg-orange-400"></div>
        <div className="flex items-center gap-2 font-bold text-purple-700 bg-white/80 px-3 py-1.5 rounded-xl shadow-2xs">
          <UserCheck className="w-4 h-4" /> Local Guide
        </div>
        <div className="h-0.5 w-8 bg-orange-300"></div>
        <div className="flex items-center gap-2 font-bold text-amber-700 bg-white/80 px-3 py-1.5 rounded-xl shadow-2xs">
          <Sparkles className="w-4 h-4" /> Experience
        </div>
      </div>

      {/* Grid: Interactive Map + List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Leaflet Map */}
        <div className="lg:col-span-6 h-[400px] lg:h-[480px]">
          <InteractiveMap
            center={initialCenter}
            zoom={radius <= 2 ? 14 : radius <= 5 ? 13 : 12}
            radiusKm={radius}
            items={filteredMapItems}
            selectedItem={selectedPin}
          />
        </div>

        {/* Right Column: Classified Orbit Results */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: `All (${nearbyData.total_nearby || 0})` },
              { id: 'attraction', label: `Attractions (${nearbyData.attractions?.length || 0})` },
              { id: 'restaurant', label: `Restaurants (${nearbyData.restaurants?.length || 0})` },
              { id: 'hotel', label: `Hotels (${nearbyData.hotels?.length || 0})` },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === tab.id
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* List of Nearby Entities */}
          <div className="max-h-[420px] overflow-y-auto space-y-2.5 pr-1">
            {filteredMapItems.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <p className="text-sm font-semibold text-slate-600">No places found within {radius} km</p>
                <p className="text-xs text-slate-400 mt-1">Try expanding the radar to 5 km or 10 km.</p>
              </div>
            ) : (
              filteredMapItems.map((item) => {
                const added = isItemInTrip(item.name);
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setSelectedPin(item)}
                    className="p-3.5 rounded-2xl border border-slate-200/80 hover:border-orange-300 hover:shadow-md transition-all bg-white flex items-center justify-between gap-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{item.name}</h4>
                          {item.distance_km && (
                            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-100 text-orange-700">
                              {item.distance_km} km
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {item.speciality || item.cuisine || item.description || item.price_range}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onAddToTrip(item)}
                      disabled={added}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 flex items-center gap-1 transition-all ${
                        added
                          ? 'bg-emerald-50 text-emerald-700 cursor-default'
                          : 'bg-slate-100 hover:bg-orange-600 hover:text-white text-slate-700'
                      }`}
                    >
                      {added ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Trip</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
