import React, { useState } from 'react';
import { CloudRain, Sparkles, X, ArrowRight, ShieldCheck, SunMedium, AlertTriangle } from 'lucide-react';
import { api } from '../api';

export default function DynamicWeatherModal({ isOpen, onClose, currentItinerary, destinationId, onConfirmReplan }) {
  if (!isOpen) return null;

  const [simulating, setSimulating] = useState(false);
  const [replanResult, setReplanResult] = useState(null);

  const handleSimulateRain = async () => {
    setSimulating(true);
    try {
      const res = await api.replanWeather({
        destination_id: destinationId || 'madurai',
        itinerary: currentItinerary,
        condition: 'heavy_monsoon_rain'
      });
      setReplanResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setSimulating(false);
    }
  };

  const handleApplyReplan = () => {
    if (replanResult?.updated_itinerary) {
      onConfirmReplan(replanResult.updated_itinerary);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl">
              🌧️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-extrabold tracking-tight">Dynamic Weather Replanning</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-900">
                  Hackathon Showstopper
                </span>
              </div>
              <p className="text-xs text-blue-200">Grounded real-time itinerary adaptation when conditions shift</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {!replanResult ? (
            <div className="space-y-6 text-center py-4">
              <div className="w-20 h-20 rounded-full bg-blue-50 mx-auto flex items-center justify-center text-blue-600 shadow-inner">
                <CloudRain className="w-10 h-10 animate-bounce" />
              </div>

              <div className="max-w-md mx-auto">
                <h4 className="text-lg font-bold text-slate-900">Simulate Adverse Weather Alert</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Demonstrate how South TN TravelMate intelligently rescues a tourist's day when sudden monsoon showers or water surges hit outdoor spots.
                </p>
              </div>

              {/* Status Box */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-700">
                  <span className="flex items-center gap-1.5"><SunMedium className="w-4 h-4 text-amber-500" /> Current Condition:</span>
                  <span className="text-emerald-700 font-semibold">Sunny & Clear</span>
                </div>
                <div className="flex items-center justify-between font-bold text-slate-700">
                  <span className="flex items-center gap-1.5"><AlertTriangle className="w-4 h-4 text-rose-500" /> Simulated Trigger:</span>
                  <span className="text-rose-600 font-bold">Heavy Monsoon Rain Alert</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSimulateRain}
                disabled={simulating}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
              >
                {simulating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>AI Scanning Sheltered Heritage Destinations...</span>
                  </>
                ) : (
                  <>
                    <CloudRain className="w-4 h-4" />
                    <span>Trigger "Simulate Rain" & Replan Trip</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Comparison View */
            <div className="space-y-5">
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  Dynamic Itinerary Re-routed
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  {replanResult.ai_rationale}
                </p>
              </div>

              {/* Substitutions Diff */}
              <div>
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Smart Substitutions Made ({replanResult.substitutions_count}):
                </h5>
                <div className="space-y-2">
                  {replanResult.substitutions?.map((sub, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                      <div className="flex items-center justify-between font-bold mb-1">
                        <span className="text-rose-600 line-through">❌ {sub.original}</span>
                        <span className="text-emerald-700">✅ {sub.replacement}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">{sub.reason}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReplanResult(null)}
                  className="flex-1 py-3 rounded-2xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-100 transition-colors"
                >
                  Reset
                </button>
                <button
                  type="button"
                  onClick={handleApplyReplan}
                  className="flex-1 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Apply Weather-Safe Itinerary</span>
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
