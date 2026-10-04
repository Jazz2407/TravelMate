import React, { useState } from 'react';
import {
  UserCheck,
  Utensils,
  Hotel,
  Sparkles,
  Phone,
  MapPin,
  Star,
  Bus,
  Plus,
  Check
} from 'lucide-react';
import {
  ALL_GUIDES,
  ALL_RESTAURANTS,
  ALL_HOTELS,
  ALL_EXPERIENCES
} from '../data/mockData';

export default function ServicesPage({ onAddToTrip, tripItems = [] }) {
  const [activeCategory, setActiveCategory] = useState('guides'); // guides, restaurants, hotels, experiences, transport
  const [selectedCity, setSelectedCity] = useState('all');

  const cities = [
    { id: 'all', label: 'All South TN' },
    { id: 'madurai', label: 'Madurai' },
    { id: 'tirunelveli', label: 'Tirunelveli' },
    { id: 'courtallam', label: 'Courtallam' },
    { id: 'kanyakumari', label: 'Kanyakumari' },
    { id: 'rameswaram', label: 'Rameswaram' }
  ];

  const filterByCity = (list) => {
    if (selectedCity === 'all') return list;
    return list.filter(item => item.destination_id === selectedCity);
  };

  const isItemInTrip = (name) => {
    return tripItems.some(i => i.title?.toLowerCase() === name?.toLowerCase());
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold mb-2">
          <UserCheck className="w-3.5 h-3.5" />
          Empowering Local Tourism Providers
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Local Services & Cultural Providers
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
          Connect directly with licensed heritage guides, iconic regional eateries, authentic local craftsmen, and comfortable stays.
        </p>

        {/* City Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 scrollbar-none">
          {cities.map(city => (
            <button
              key={city.id}
              onClick={() => setSelectedCity(city.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                selectedCity === city.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {city.label}
            </button>
          ))}
        </div>
      </div>

      {/* Service Type Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto scrollbar-none">
        {[
          { id: 'guides', label: 'Local Guides', icon: UserCheck },
          { id: 'restaurants', label: 'Authentic Eateries', icon: Utensils },
          { id: 'hotels', label: 'Hotels & Resorts', icon: Hotel },
          { id: 'experiences', label: 'Crafts & Workshops', icon: Sparkles },
          { id: 'transports', label: 'Transport Facilities', icon: Bus }
        ].map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shrink-0 ${
                activeCategory === cat.id
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Guides Grid */}
      {activeCategory === 'guides' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterByCity(ALL_GUIDES).map(guide => (
            <div
              key={guide.id}
              className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                      {guide.destination_id}
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900 mt-1">{guide.name}</h3>
                  </div>
                  <span className="text-xs font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">
                    ⭐ {guide.rating}
                  </span>
                </div>
                <p className="text-xs text-purple-700 font-semibold mt-1">{guide.speciality}</p>
                <p className="text-xs text-slate-500 mt-0.5">Experience: {guide.experience}</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs space-y-1">
                <div><span className="font-semibold text-slate-500">Languages:</span> {guide.languages?.join(', ')}</div>
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
                  className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-purple-700 text-white text-xs font-bold transition-colors"
                >
                  Book Guide
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Restaurants Grid */}
      {activeCategory === 'restaurants' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterByCity(ALL_RESTAURANTS).map(rest => {
            const added = isItemInTrip(rest.name);
            return (
              <div
                key={rest.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img src={rest.image} alt={rest.name} className="w-full h-full object-cover" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                    {rest.cuisine}
                  </span>
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold">
                    ⭐ {rest.rating}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">{rest.name}</h3>
                    <p className="text-xs text-orange-700 font-semibold mt-1">Speciality: {rest.speciality}</p>
                    <p className="text-xs text-slate-500 mt-1">{rest.price_range}</p>
                  </div>

                  <button
                    onClick={() => onAddToTrip({
                      ...rest,
                      title: rest.name,
                      type: 'Restaurant',
                      time: '01:00 PM'
                    })}
                    disabled={added}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                      added
                        ? 'bg-emerald-50 text-emerald-700 cursor-default'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                    }`}
                  >
                    {added ? 'Added to Trip' : '+ Add to Trip Itinerary'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Hotels Grid */}
      {activeCategory === 'hotels' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filterByCity(ALL_HOTELS).map(hotel => (
            <div
              key={hotel.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-bold">
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
                  onClick={() => onAddToTrip({
                    title: `Stay at ${hotel.name}`,
                    type: 'Hotel',
                    time: '08:00 PM',
                    est_cost: hotel.price_range
                  })}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm"
                >
                  Reserve Stay
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experiences Grid */}
      {activeCategory === 'experiences' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filterByCity(ALL_EXPERIENCES).map(exp => (
            <div
              key={exp.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-amber-300 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img src={exp.image} alt={exp.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-600 text-white text-[10px] font-bold">
                  {exp.category} Experience
                </span>
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold">
                  {exp.duration}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">{exp.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{exp.description}</p>
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

      {/* Transport Directory */}
      {activeCategory === 'transports' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: "TNSTC Air Conditioned Inter-City Express",
              type: "Express Bus",
              coverage: "Madurai - Tirunelveli - Kanyakumari Highway Corridor",
              fare: "₹150 - ₹350",
              contact: "1800-419-4287"
            },
            {
              name: "South TN Prepaid Tourist Taxi Association",
              type: "AC Tourist Cab / Innova",
              coverage: "Full Circuit (Madurai / Courtallam / Rameswaram)",
              fare: "₹14 / km",
              contact: "+91 94422 18700"
            },
            {
              name: "Madurai Heritage Auto-Rickshaw Union",
              type: "Auto Rickshaw",
              coverage: "Madurai Temple Area & Heritage Monuments",
              fare: "₹50 - ₹200 within city",
              contact: "+91 98940 33211"
            },
            {
              name: "Pamban Island Electric Shuttle Service",
              type: "Green Electric Shuttle",
              coverage: "Rameswaram Temple to Dhanushkodi / Agni Theertham",
              fare: "₹30 per trip",
              contact: "+91 94431 82000"
            }
          ].map((tr, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-700 bg-orange-50 px-2.5 py-1 rounded-lg">
                  {tr.type}
                </span>
                <span className="text-xs font-extrabold text-slate-900">{tr.fare}</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900">{tr.name}</h3>
              <p className="text-xs text-slate-500">Route: {tr.coverage}</p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Helpline / Booking:</span>
                <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  📞 {tr.contact}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
