import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Plus,
  Check,
  Navigation,
  Utensils,
  Hotel,
  UserCheck,
  Sparkles,
  Heart,
  Calendar,
  Compass
} from 'lucide-react';
import AroundMeRadar from '../components/AroundMeRadar';
import { api } from '../api';

export default function DestinationDetail({
  destinationId,
  onBack,
  onAddToTrip,
  tripItems = [],
  onToggleSave,
  savedIds = []
}) {
  const [destination, setDestination] = useState(null);
  const [activeTab, setActiveTab] = useState('attractions'); // attractions, restaurants, hotels, guides, experiences
  const [radarCenter, setRadarCenter] = useState(null);
  const [radarTitle, setRadarTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const data = await api.getDestination(destinationId);
        setDestination(data);
        if (data) {
          setRadarCenter([data.latitude, data.longitude]);
          setRadarTitle(data.name);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [destinationId]);

  if (loading || !destination) {
    return (
      <div className="py-24 text-center">
        <span className="w-8 h-8 border-3 border-orange-600 border-t-transparent rounded-full animate-spin inline-block mb-3"></span>
        <p className="text-sm font-bold text-slate-600">Loading {destinationId} ecosystem...</p>
      </div>
    );
  }

  const isSaved = savedIds.includes(destination.id);

  const isItemInTrip = (title) => {
    return tripItems.some(i => i.title?.toLowerCase() === title?.toLowerCase());
  };

  const handleExploreNearby = (item) => {
    setRadarCenter([item.latitude, item.longitude]);
    setRadarTitle(item.name);
    // Scroll down to radar
    const radarElem = document.getElementById('around-me-section');
    if (radarElem) {
      radarElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Destinations</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">
            South Tamil Nadu Pilot Region
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-lg">
            {destination.district} District
          </span>
        </div>
      </div>

      {/* Destination Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-xl">
        <div className="h-72 sm:h-96 w-full">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={() => onToggleSave({
              item_id: destination.id,
              type: 'destination',
              title: destination.name,
              subtitle: destination.tagline,
              image: destination.image
            })}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
              isSaved ? 'bg-rose-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'
            }`}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="absolute bottom-6 left-6 right-6 max-w-4xl space-y-2">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-600/90 text-white text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            {destination.category} Destination
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">{destination.name}</h1>
          <p className="text-sm sm:text-base text-orange-200 font-medium">
            {destination.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-orange-400" />
              <span>Best Time: {destination.best_time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-orange-400" />
              <span>Recommended Stay: {destination.estimated_visit_duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-orange-400" />
              <span>GPS: {destination.latitude.toFixed(4)}° N, {destination.longitude.toFixed(4)}° E</span>
            </div>
          </div>
        </div>
      </div>

      {/* Destination Overview Text */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <h2 className="text-lg font-bold text-slate-900 mb-2">About {destination.name}</h2>
        <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
          {destination.description}
        </p>
      </div>

      {/* Destination Ecosystem Navigation Tabs */}
      <div className="border-b border-slate-200 flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
        {[
          { id: 'attractions', label: `Attractions (${destination.attractions?.length || 0})`, icon: MapPin },
          { id: 'restaurants', label: `Food & Dining (${destination.restaurants?.length || 0})`, icon: Utensils },
          { id: 'hotels', label: `Hotels & Resorts (${destination.hotels?.length || 0})`, icon: Hotel },
          { id: 'guides', label: `Local Guides (${destination.guides?.length || 0})`, icon: UserCheck },
          { id: 'experiences', label: `Experiences (${destination.experiences?.length || 0})`, icon: Sparkles }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-orange-600 text-orange-700 bg-orange-50/50 rounded-t-xl'
                  : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-t-xl'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Attractions */}
      {activeTab === 'attractions' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destination.attractions?.map(attr => {
            const added = isItemInTrip(attr.name);
            return (
              <div
                key={attr.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-orange-300 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img src={attr.image} alt={attr.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[10px] font-bold">
                    {attr.category}
                  </span>
                  {attr.is_indoor ? (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold">
                      Sheltered / Indoor
                    </span>
                  ) : (
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-amber-500/90 text-white text-[10px] font-bold">
                      Outdoor
                    </span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">{attr.name}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{attr.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <span className="font-semibold block text-slate-400">Timings:</span>
                      {attr.opening_time} - {attr.closing_time}
                    </div>
                    <div>
                      <span className="font-semibold block text-slate-400">Entry / Duration:</span>
                      {attr.entry_fee === 0 ? 'Free' : `₹${attr.entry_fee}`} • {attr.estimated_duration}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleExploreNearby(attr)}
                      className="flex-1 py-2 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 text-xs font-bold transition-all flex items-center justify-center gap-1"
                    >
                      <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Explore Nearby</span>
                    </button>

                    <button
                      onClick={() => onAddToTrip({
                        ...attr,
                        title: attr.name,
                        type: 'Attraction',
                        time: '10:00 AM'
                      })}
                      disabled={added}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                        added
                          ? 'bg-emerald-50 text-emerald-700 cursor-default'
                          : 'bg-orange-600 hover:bg-orange-700 text-white shadow-sm'
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
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Restaurants */}
      {activeTab === 'restaurants' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destination.restaurants?.map(rest => {
            const added = isItemInTrip(rest.name);
            return (
              <div
                key={rest.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img src={rest.image} alt={rest.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-600/90 text-white text-[10px] font-bold">
                    {rest.cuisine}
                  </span>
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold">
                    ⭐ {rest.rating}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-base text-slate-900">{rest.name}</h3>
                      {rest.vegetarian && (
                        <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                          Veg
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-orange-700 font-semibold mt-1">Speciality: {rest.speciality}</p>
                    <p className="text-xs text-slate-500 mt-1">{rest.price_range}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleExploreNearby(rest)}
                      className="flex-1 py-2 rounded-xl border border-slate-200 hover:border-emerald-300 text-slate-700 text-xs font-bold transition-all flex items-center justify-center gap-1"
                    >
                      <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Nearby</span>
                    </button>

                    <button
                      onClick={() => onAddToTrip({
                        ...rest,
                        title: rest.name,
                        type: 'Restaurant',
                        time: '01:00 PM'
                      })}
                      disabled={added}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                        added
                          ? 'bg-emerald-50 text-emerald-700 cursor-default'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                      }`}
                    >
                      {added ? 'Added' : '+ Add Meal'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 3: Hotels */}
      {activeTab === 'hotels' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destination.hotels?.map(hotel => (
            <div
              key={hotel.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-blue-600/90 text-white text-[10px] font-bold">
                  ⭐ {hotel.rating}
                </span>
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold">
                  {hotel.price_range}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">{hotel.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {hotel.amenities?.map((amenity, idx) => (
                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleExploreNearby(hotel)}
                  className="w-full py-2 rounded-xl border border-blue-200 hover:bg-blue-50 text-blue-700 text-xs font-bold transition-all flex items-center justify-center gap-1"
                >
                  <Navigation className="w-3.5 h-3.5 text-blue-600" />
                  <span>Explore What's Around this Hotel</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Local Guides */}
      {activeTab === 'guides' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {destination.guides?.map(guide => (
            <div
              key={guide.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl font-bold">
                    👤
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">{guide.name}</h3>
                    <p className="text-xs text-purple-700 font-semibold">{guide.speciality}</p>
                    <p className="text-[11px] text-slate-400">Experience: {guide.experience}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">
                  ⭐ {guide.rating}
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs space-y-1">
                <div><span className="font-semibold text-slate-500">Languages:</span> {guide.languages?.join(', ')}</div>
                <div><span className="font-semibold text-slate-500">Base Location:</span> {guide.location}</div>
                <div><span className="font-semibold text-slate-500">Rate:</span> <span className="font-bold text-slate-900">{guide.price}</span></div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
                  📞 {guide.phone}
                </span>
                <button
                  onClick={() => onAddToTrip({
                    title: `Guided Tour with ${guide.name}`,
                    type: 'Guide',
                    time: '09:00 AM',
                    est_cost: guide.price
                  })}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors"
                >
                  Book for Trip
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 5: Local Experiences */}
      {activeTab === 'experiences' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {destination.experiences?.map(exp => (
            <div
              key={exp.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-amber-300 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img src={exp.image} alt={exp.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-600/90 text-white text-[10px] font-bold">
                  {exp.category} Experience
                </span>
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold">
                  {exp.duration}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">{exp.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{exp.description}</p>
                  <p className="text-xs text-orange-700 font-semibold mt-2">Provider: {exp.provider}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-xs font-extrabold text-slate-900">{exp.price}</span>
                  <button
                    onClick={() => onAddToTrip({
                      title: exp.name,
                      type: 'Experience',
                      time: '03:30 PM',
                      est_cost: exp.price
                    })}
                    className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition-colors"
                  >
                    + Add Experience
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Section 7: Embedded Around Me Radar */}
      <div id="around-me-section" className="pt-6">
        <AroundMeRadar
          initialCenter={radarCenter || [destination.latitude, destination.longitude]}
          initialTitle={radarTitle || destination.name}
          onAddToTrip={onAddToTrip}
          tripItems={tripItems}
        />
      </div>
    </div>
  );
}
