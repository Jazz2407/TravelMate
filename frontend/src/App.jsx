import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import DestinationDetail from './pages/DestinationDetail';
import MyTripPage from './pages/MyTripPage';
import ServicesPage from './pages/ServicesPage';
import SavedPage from './pages/SavedPage';
import AroundMeRadar from './components/AroundMeRadar';
import AIPlannerModal from './components/AIPlannerModal';
import { api } from './api';
import { DESTINATIONS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDestinationId, setSelectedDestinationId] = useState('madurai');
  const [destinations, setDestinations] = useState(DESTINATIONS);
  const [isAIPlannerOpen, setIsAIPlannerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // My Trip State (Day-by-day Itinerary)
  const [tripDays, setTripDays] = useState([
    {
      day: 1,
      title: "Day 1: Cultural Capital of Madurai",
      items: [
        {
          id: "mdu-1",
          time: "09:00 AM",
          title: "Meenakshi Amman Temple",
          type: "Attraction",
          category: "Spiritual",
          est_cost: "Free",
          is_indoor: true,
          image: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=600&q=80"
        },
        {
          id: "mdu-2",
          time: "11:30 AM",
          title: "Thirumalai Nayakkar Mahal",
          type: "Attraction",
          category: "Heritage",
          est_cost: "₹50",
          is_indoor: true,
          image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80"
        },
        {
          id: "mdu-3",
          time: "01:00 PM",
          title: "Lunch at Murugan Idli Shop",
          type: "Restaurant",
          category: "Traditional Veg",
          est_cost: "₹250",
          is_indoor: true,
          image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
        },
        {
          id: "mdu-4",
          time: "03:30 PM",
          title: "Gandhi Memorial Museum",
          type: "Attraction",
          category: "Culture",
          est_cost: "Free",
          is_indoor: true,
          image: "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80"
        },
        {
          id: "mdu-5",
          time: "05:30 PM",
          title: "Vandiyur Mariamman Teppakulam Walk",
          type: "Attraction",
          category: "Heritage (Outdoor)",
          est_cost: "Free",
          is_indoor: false,
          image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80"
        }
      ]
    }
  ]);

  // Saved / Bookmarks State
  const [savedPlaces, setSavedPlaces] = useState([
    {
      item_id: "madurai",
      type: "destination",
      title: "Madurai",
      subtitle: "The Soul of Tamil Culture",
      image: "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=600&q=80"
    }
  ]);

  // Load destinations from API on startup
  useEffect(() => {
    async function loadData() {
      try {
        const data = await api.getDestinations();
        if (data && data.length > 0) {
          setDestinations(data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    loadData();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSelectDestination = (destId) => {
    setSelectedDestinationId(destId);
    setActiveTab('destination-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToTrip = (item) => {
    const updated = JSON.parse(JSON.stringify(tripDays));
    if (!updated[0]) {
      updated.push({ day: 1, title: "Day 1", items: [] });
    }
    const newItem = {
      id: `item-${Date.now()}`,
      time: item.time || "11:00 AM",
      title: item.title || item.name,
      type: item.type || item.category || 'Spot',
      category: item.category || item.cuisine || 'Tourism',
      est_cost: item.est_cost || item.price_range || (item.entry_fee ? `₹${item.entry_fee}` : 'Free'),
      is_indoor: item.is_indoor ?? true,
      image: item.image
    };
    updated[0].items.push(newItem);
    setTripDays(updated);
    showToast(`Added "${newItem.title}" to My Trip!`);
  };

  const handleToggleSave = (item) => {
    const exists = savedPlaces.some(s => s.item_id === item.item_id);
    if (exists) {
      setSavedPlaces(savedPlaces.filter(s => s.item_id !== item.item_id));
      showToast(`Removed "${item.title}" from saved places`);
    } else {
      setSavedPlaces([...savedPlaces, item]);
      showToast(`Saved "${item.title}" to bookmarks!`);
    }
  };

  const handleApplyAIItinerary = (aiResult) => {
    if (aiResult.itinerary && aiResult.itinerary.length > 0) {
      setTripDays(aiResult.itinerary);
      setSelectedDestinationId(aiResult.destination.toLowerCase());
      setActiveTab('trip');
      showToast("Personalized AI itinerary applied to My Trip!");
    }
  };

  // Flattened items for badge count
  const allTripItems = tripDays.flatMap(d => d.items || []);
  const savedIds = savedPlaces.map(s => s.item_id);

  // Active destination coords for standalone "Around Me" tab
  const currentDest = destinations.find(d => d.id === selectedDestinationId) || destinations[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tripItemCount={allTripItems.length}
        savedCount={savedPlaces.length}
        onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
      />

      {/* Main Page Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'home' && (
          <HomePage
            destinations={destinations}
            onSelectDestination={handleSelectDestination}
            onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
            onToggleSave={handleToggleSave}
            savedIds={savedIds}
          />
        )}

        {activeTab === 'destination-detail' && (
          <DestinationDetail
            destinationId={selectedDestinationId}
            onBack={() => setActiveTab('home')}
            onAddToTrip={handleAddToTrip}
            tripItems={allTripItems}
            onToggleSave={handleToggleSave}
            savedIds={savedIds}
          />
        )}

        {activeTab === 'nearby' && (
          <div className="space-y-6 pb-16">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-black text-slate-900">Regional Proximity Radar</h1>
              <select
                value={selectedDestinationId}
                onChange={(e) => setSelectedDestinationId(e.target.value)}
                className="py-2 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white shadow-2xs"
              >
                {destinations.map(d => (
                  <option key={d.id} value={d.id}>{d.name} Center</option>
                ))}
              </select>
            </div>
            <AroundMeRadar
              initialCenter={[currentDest.latitude, currentDest.longitude]}
              initialTitle={`${currentDest.name} Center`}
              onAddToTrip={handleAddToTrip}
              tripItems={allTripItems}
            />
          </div>
        )}

        {activeTab === 'trip' && (
          <MyTripPage
            tripDays={tripDays}
            destinationId={selectedDestinationId}
            onUpdateTrip={(updated) => setTripDays(updated)}
            onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
          />
        )}

        {activeTab === 'services' && (
          <ServicesPage
            onAddToTrip={handleAddToTrip}
            tripItems={allTripItems}
          />
        )}

        {activeTab === 'saved' && (
          <SavedPage
            savedItems={savedPlaces}
            onRemoveSaved={(id) => setSavedPlaces(savedPlaces.filter(s => s.item_id !== id))}
            onSelectDestination={handleSelectDestination}
            onExploreMore={() => setActiveTab('home')}
          />
        )}
      </main>

      {/* AI Planner Modal */}
      <AIPlannerModal
        isOpen={isAIPlannerOpen}
        onClose={() => setIsAIPlannerOpen(false)}
        onApplyItinerary={handleApplyAIItinerary}
      />

      {/* Floating Notification Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold animate-in fade-in slide-in-from-bottom-4 duration-200 border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-white font-extrabold text-base">
              <span>🌴</span> South TN TravelMate
            </div>
            <p className="text-slate-400 leading-relaxed">
              A unified digital tourism platform connecting travellers with authentic heritage,
              local service providers, and personalized itineraries across South Tamil Nadu.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Pilot Gateways</h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => handleSelectDestination('madurai')} className="hover:text-white">Madurai</button></li>
              <li><button onClick={() => handleSelectDestination('tirunelveli')} className="hover:text-white">Tirunelveli</button></li>
              <li><button onClick={() => handleSelectDestination('courtallam')} className="hover:text-white">Courtallam</button></li>
              <li><button onClick={() => handleSelectDestination('kanyakumari')} className="hover:text-white">Kanyakumari</button></li>
              <li><button onClick={() => handleSelectDestination('rameswaram')} className="hover:text-white">Rameswaram</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Core Features</h4>
            <ul className="space-y-1.5">
              <li>Normal & Natural Language Search</li>
              <li>"Around Me" Ecosystem Radar (1-10km)</li>
              <li>Interactive "My Trip" Timeline</li>
              <li>Dynamic Weather Replanning</li>
              <li>Licensed Guides & Local Vendors</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-3 uppercase tracking-wider text-[11px]">Prototype Pitch</h4>
            <p className="text-slate-400 leading-relaxed mb-3">
              "Tourism platform first → AI intelligence second." Designed to scale statewide for Tamil Nadu Tourism.
            </p>
            <div className="text-[11px] text-orange-400 font-bold">
              StartupTN & Hackathon Ready 🚀
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
