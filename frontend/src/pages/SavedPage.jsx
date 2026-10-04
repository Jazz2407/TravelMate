import React from 'react';
import { Heart, Trash2, ArrowRight, Compass } from 'lucide-react';

export default function SavedPage({ savedItems = [], onRemoveSaved, onSelectDestination, onExploreMore }) {
  return (
    <div className="space-y-8 pb-16">
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold mb-2">
          <Heart className="w-3.5 h-3.5 fill-current" />
          Bookmarked Places
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Saved Destinations & Favorites
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Places you've bookmarked while discovering South Tamil Nadu.
        </p>
      </div>

      {savedItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">No saved places yet</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Tap the heart icon on any destination or attraction to save it for quick reference later.
            </p>
          </div>
          <button
            onClick={onExploreMore}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors inline-flex items-center gap-1.5"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Destinations</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedItems.map(item => (
            <div
              key={item.item_id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-rose-300 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => onRemoveSaved(item.item_id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 hover:bg-rose-600 text-white flex items-center justify-center transition-colors"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-orange-700 bg-orange-50 px-2 py-0.5 rounded-md">
                    {item.type}
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900 mt-1.5">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
                </div>

                <button
                  onClick={() => onSelectDestination(item.item_id)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Open Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
