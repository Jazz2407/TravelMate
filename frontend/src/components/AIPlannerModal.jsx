import React, { useState } from 'react';
import { Sparkles, X, Calendar, DollarSign, Users, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { api } from '../api';

export default function AIPlannerModal({ isOpen, onClose, onApplyItinerary }) {
  if (!isOpen) return null;

  const [destination, setDestination] = useState('madurai');
  const [days, setDays] = useState(2);
  const [budget, setBudget] = useState('₹5,000');
  const [companions, setCompanions] = useState('Family');
  const [selectedInterests, setSelectedInterests] = useState(['Heritage', 'Food']);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(null);

  const interestOptions = [
    { id: 'Heritage', emoji: '🏛️' },
    { id: 'Spiritual', emoji: '🛕' },
    { id: 'Nature', emoji: '🌿' },
    { id: 'Food', emoji: '🍛' },
    { id: 'Beaches', emoji: '🌊' },
    { id: 'Culture', emoji: '🎭' }
  ];

  const toggleInterest = (id) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(i => i !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const res = await api.planWithAI({
        destination_id: destination,
        days: parseInt(days),
        budget,
        companions,
        interests: selectedInterests
      });
      setGeneratedResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApply = () => {
    if (generatedResult) {
      onApplyItinerary(generatedResult);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl">
              ✨
            </div>
            <div>
              <h3 className="text-xl font-extrabold tracking-tight">AI Trip Planner</h3>
              <p className="text-xs text-orange-100">Grounded in verified South Tamil Nadu tourism database</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {!generatedResult ? (
            <div className="space-y-5">
              {/* Destination */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Choose Gateway Destination
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'madurai', name: 'Madurai' },
                    { id: 'tirunelveli', name: 'Tirunelveli' },
                    { id: 'courtallam', name: 'Courtallam' },
                    { id: 'kanyakumari', name: 'Kanyakumari' },
                    { id: 'rameswaram', name: 'Rameswaram' }
                  ].map(dest => (
                    <button
                      key={dest.id}
                      type="button"
                      onClick={() => setDestination(dest.id)}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-left ${
                        destination === dest.id
                          ? 'border-orange-600 bg-orange-50 text-orange-700 ring-2 ring-orange-200'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      {dest.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Days & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    2. Trip Duration
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3].map(d => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDays(d)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                          days === d
                            ? 'border-orange-600 bg-orange-600 text-white'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {d} {d === 1 ? 'Day' : 'Days'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    3. Estimated Budget
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full py-2 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-orange-200"
                  >
                    <option value="₹2,500 (Budget)">₹2,500 (Budget Backpacker)</option>
                    <option value="₹5,000 (Comfort)">₹5,000 (Comfort Family)</option>
                    <option value="₹10,000+ (Premium)">₹10,000+ (Heritage Luxury)</option>
                  </select>
                </div>
              </div>

              {/* Companions */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  4. Who is Traveling?
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['Solo', 'Couple', 'Family', 'Friends'].map(c => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setCompanions(c)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        companions === c
                          ? 'border-orange-600 bg-orange-50 text-orange-700 ring-2 ring-orange-200'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  5. Core Travel Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map(opt => {
                    const active = selectedInterests.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleInterest(opt.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all ${
                          active
                            ? 'border-orange-600 bg-orange-600 text-white'
                            : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span>{opt.emoji}</span>
                        <span>{opt.id}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Generate CTA Button */}
              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-extrabold text-sm shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                {isGenerating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Consulting South TN Tourism Database...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-200" />
                    <span>Generate Personalized Itinerary</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Result View */
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200">
                <div className="flex items-center gap-2 text-xs font-bold text-orange-700 uppercase tracking-wider mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Grounded AI Plan Ready
                </div>
                <h4 className="text-base font-extrabold text-slate-900">{generatedResult.title}</h4>
                <p className="text-xs text-slate-600 mt-1">{generatedResult.ai_summary}</p>
              </div>

              {/* Day Schedules */}
              <div className="space-y-4">
                {generatedResult.itinerary?.map((dayObj, dIdx) => (
                  <div key={dIdx} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-orange-700 mb-3">
                      {dayObj.title}
                    </h5>
                    <div className="space-y-2.5">
                      {dayObj.items?.map((item, iIdx) => (
                        <div key={iIdx} className="flex items-center gap-3 p-2 bg-white rounded-xl border border-slate-200/70">
                          <span className="text-xs font-bold text-slate-500 w-16 shrink-0">{item.time}</span>
                          <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-slate-100">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-slate-900 truncate">{item.title}</div>
                            <div className="text-[11px] text-slate-500 truncate">{item.description}</div>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 shrink-0">
                            {item.est_cost}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setGeneratedResult(null)}
                  className="flex-1 py-3 rounded-2xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
                >
                  Adjust Preferences
                </button>
                <button
                  type="button"
                  onClick={handleApply}
                  className="flex-1 py-3 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-md shadow-orange-600/20 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Apply to My Trip</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
