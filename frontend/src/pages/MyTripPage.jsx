import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Trash2,
  ArrowUp,
  ArrowDown,
  CloudRain,
  Sparkles,
  Download,
  Share2,
  CheckCircle,
  PlusCircle,
  AlertCircle
} from 'lucide-react';
import DynamicWeatherModal from '../components/DynamicWeatherModal';

export default function MyTripPage({
  tripDays = [],
  destinationId = 'madurai',
  onUpdateTrip,
  onOpenAIPlanner
}) {
  const [isWeatherModalOpen, setIsWeatherModalOpen] = useState(false);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  // Initialize sample trip if empty so user has something beautiful to play with
  const currentDays = tripDays.length > 0 ? tripDays : [
    {
      day: 1,
      title: "Day 1: Heart of Heritage & Cuisine",
      items: [
        {
          id: "item-1",
          time: "09:00 AM",
          title: "Meenakshi Amman Temple",
          type: "Attraction",
          category: "Spiritual",
          est_cost: "Free",
          is_indoor: true,
          image: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=600&q=80"
        },
        {
          id: "item-2",
          time: "11:30 AM",
          title: "Thirumalai Nayakkar Mahal",
          type: "Attraction",
          category: "Heritage",
          est_cost: "₹50",
          is_indoor: true,
          image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
        },
        {
          id: "item-3",
          time: "01:00 PM",
          title: "Lunch at Murugan Idli Shop",
          type: "Restaurant",
          category: "Traditional Veg",
          est_cost: "₹250",
          is_indoor: true,
          image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
        },
        {
          id: "item-4",
          time: "03:30 PM",
          title: "Gandhi Memorial Museum",
          type: "Attraction",
          category: "Culture",
          est_cost: "Free",
          is_indoor: true,
          image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80"
        },
        {
          id: "item-5",
          time: "05:30 PM",
          title: "Vandiyur Mariamman Teppakulam & Sunset Walk",
          type: "Attraction",
          category: "Heritage (Outdoor)",
          est_cost: "Free",
          is_indoor: false,
          image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
        },
        {
          id: "item-6",
          time: "07:30 PM",
          title: "Famous Jigarthanda & Evening Street Food",
          type: "Restaurant",
          category: "Dessert & Snacks",
          est_cost: "₹120",
          is_indoor: true,
          image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"
        }
      ]
    }
  ];

  const handleMove = (dayIdx, itemIdx, direction) => {
    const updated = JSON.parse(JSON.stringify(currentDays));
    const items = updated[dayIdx].items;
    const targetIdx = direction === 'up' ? itemIdx - 1 : itemIdx + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;
    const temp = items[itemIdx];
    items[itemIdx] = items[targetIdx];
    items[targetIdx] = temp;
    onUpdateTrip(updated);
  };

  const handleDeleteItem = (dayIdx, itemIdx) => {
    const updated = JSON.parse(JSON.stringify(currentDays));
    updated[dayIdx].items.splice(itemIdx, 1);
    onUpdateTrip(updated);
  };

  const handleApplyWeatherReplan = (replannedItinerary) => {
    onUpdateTrip(replannedItinerary);
  };

  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentDays, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `SouthTN_Trip_Itinerary.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const totalStops = currentDays.reduce((acc, d) => acc + (d.items?.length || 0), 0);

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            Interactive Trip Builder
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            My South TN Itinerary
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {currentDays.length} {currentDays.length === 1 ? 'Day' : 'Days'} • {totalStops} Planned Stops • Destination: <span className="font-bold text-slate-900 uppercase">{destinationId}</span>
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Weather Simulation Trigger */}
          <button
            onClick={() => setIsWeatherModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-extrabold flex items-center gap-2 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
          >
            <CloudRain className="w-4 h-4 animate-bounce" />
            <span>Simulate Rain (Replan)</span>
          </button>

          <button
            onClick={onOpenAIPlanner}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 text-white text-xs font-extrabold flex items-center gap-2 shadow-md shadow-orange-500/20 transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>AI Generate</span>
          </button>

          <button
            onClick={handleExport}
            className="px-3 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
            title="Export Itinerary JSON"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Days Tabs (if multiple days) */}
      {currentDays.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {currentDays.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDayIndex(idx)}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all ${
                activeDayIndex === idx
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              Day {day.day || idx + 1}
            </button>
          ))}
        </div>
      )}

      {/* Day Timeline Schedule */}
      {currentDays[activeDayIndex] && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">
                {currentDays[activeDayIndex].title || `Day ${activeDayIndex + 1}`}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Rearrange timeline with arrows, or delete stops as needed.
              </p>
            </div>
            <span className="text-xs font-bold text-orange-700 bg-orange-50 px-3 py-1 rounded-xl">
              {currentDays[activeDayIndex].items?.length || 0} Activities
            </span>
          </div>

          {/* Timeline Items */}
          <div className="space-y-4 relative before:absolute before:inset-0 before:left-7 before:w-0.5 before:bg-slate-200/80 before:z-0">
            {currentDays[activeDayIndex].items?.map((item, idx) => (
              <div
                key={item.id || idx}
                className={`relative z-10 p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  item.weather_replaced
                    ? 'border-blue-300 bg-blue-50/40 shadow-xs ring-2 ring-blue-100'
                    : 'border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-md'
                }`}
              >
                {/* Time & Content */}
                <div className="flex items-start sm:items-center gap-4">
                  {/* Time Badge Circle */}
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center shrink-0 shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-orange-400 mb-0.5" />
                    <span className="text-[10px] font-black">{item.time?.split(' ')[0]}</span>
                    <span className="text-[9px] text-slate-300 font-bold uppercase">{item.time?.split(' ')[1]}</span>
                  </div>

                  {/* Thumbnail */}
                  {item.image && (
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0 hidden sm:block">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                  )}

                  {/* Description & Status */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-sm text-slate-900">{item.title}</h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {item.type || item.category}
                      </span>
                      {item.weather_replaced && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-blue-600 text-white flex items-center gap-1">
                          🌧️ Weather-Replaced (Indoor)
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-xs text-slate-500 line-clamp-1 max-w-xl">
                        {item.description}
                      </p>
                    )}
                    {item.est_cost && (
                      <p className="text-[11px] font-bold text-orange-700">
                        Estimated Cost: {item.est_cost}
                      </p>
                    )}
                  </div>
                </div>

                {/* Control Actions (Move Up, Move Down, Delete) */}
                <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => handleMove(activeDayIndex, idx, 'up')}
                    disabled={idx === 0}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Move Earlier"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleMove(activeDayIndex, idx, 'down')}
                    disabled={idx === currentDays[activeDayIndex].items.length - 1}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
                    title="Move Later"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteItem(activeDayIndex, idx)}
                    className="p-2 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors ml-1"
                    title="Remove from Trip"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Dynamic Weather Modal */}
      <DynamicWeatherModal
        isOpen={isWeatherModalOpen}
        onClose={() => setIsWeatherModalOpen(false)}
        currentItinerary={currentDays}
        destinationId={destinationId}
        onConfirmReplan={handleApplyWeatherReplan}
      />
    </div>
  );
}
