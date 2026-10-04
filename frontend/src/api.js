import {
  DESTINATIONS,
  ALL_ATTRACTIONS,
  ALL_RESTAURANTS,
  ALL_HOTELS,
  ALL_GUIDES,
  ALL_EXPERIENCES
} from './data/mockData';

const BASE_URL = '/api';

export const api = {
  // Fetch Destinations
  async getDestinations() {
    try {
      const res = await fetch(`${BASE_URL}/destinations`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Backend unavailable, using client fallback", e);
    }
    return DESTINATIONS;
  },

  // Fetch Single Destination
  async getDestination(id) {
    try {
      const res = await fetch(`${BASE_URL}/destinations/${id}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Backend unavailable, using client fallback", e);
    }
    const dest = DESTINATIONS.find(d => d.id === id) || DESTINATIONS[0];
    return {
      ...dest,
      attractions: ALL_ATTRACTIONS.filter(a => a.destination_id === id),
      restaurants: ALL_RESTAURANTS.filter(r => r.destination_id === id),
      hotels: ALL_HOTELS.filter(h => h.destination_id === id),
      guides: ALL_GUIDES.filter(g => g.destination_id === id),
      experiences: ALL_EXPERIENCES.filter(e => e.destination_id === id)
    };
  },

  // Universal Search
  async search(query) {
    try {
      const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Search API failed, fallback to client filter", e);
    }
    const q = query.toLowerCase();
    const dests = DESTINATIONS.filter(d => d.name.toLowerCase().includes(q) || d.district.toLowerCase().includes(q));
    const attrs = ALL_ATTRACTIONS.filter(a => a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));
    const rests = ALL_RESTAURANTS.filter(r => r.name.toLowerCase().includes(q) || r.cuisine.toLowerCase().includes(q));
    const hotels = ALL_HOTELS.filter(h => h.name.toLowerCase().includes(q));
    return {
      query,
      total_results: dests.length + attrs.length + rests.length + hotels.length,
      destinations: dests,
      attractions: attrs,
      restaurants: rests,
      hotels: hotels,
      guides: ALL_GUIDES.filter(g => g.name.toLowerCase().includes(q)),
      experiences: ALL_EXPERIENCES.filter(e => e.name.toLowerCase().includes(q))
    };
  },

  // Nearby Ecosystem Radar
  async getNearby(lat, lng, radius = 5) {
    try {
      const res = await fetch(`${BASE_URL}/nearby?lat=${lat}&lng=${lng}&radius=${radius}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Nearby API failed, fallback to client calculation", e);
    }
    // Simple client fallback
    return {
      center: { latitude: lat, longitude: lng },
      radius_km: radius,
      attractions: ALL_ATTRACTIONS.slice(0, 3),
      restaurants: ALL_RESTAURANTS.slice(0, 3),
      hotels: ALL_HOTELS.slice(0, 2),
      guides: ALL_GUIDES.slice(0, 2),
      experiences: ALL_EXPERIENCES.slice(0, 2),
      total_nearby: 10
    };
  },

  // AI Trip Planner
  async planWithAI(payload) {
    try {
      const res = await fetch(`${BASE_URL}/ai/plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("AI Plan API failed, using client grounded generator", e);
    }
    const dest = payload.destination_id || 'madurai';
    const cityAttr = ALL_ATTRACTIONS.filter(a => a.destination_id === dest);
    const cityRest = ALL_RESTAURANTS.filter(r => r.destination_id === dest);
    return {
      title: `${payload.days}-Day Curated Journey in ${dest.toUpperCase()} for ${payload.companions}`,
      destination: dest.toUpperCase(),
      days_count: payload.days,
      budget: payload.budget,
      companions: payload.companions,
      ai_summary: `Custom crafted for ${payload.companions} focusing on ${payload.interests?.join(', ') || 'Culture & Food'}. Grounded in verified South TN destinations.`,
      hotel_recommendation: ALL_HOTELS.find(h => h.destination_id === dest) || ALL_HOTELS[0],
      guide_recommendation: ALL_GUIDES.find(g => g.destination_id === dest) || ALL_GUIDES[0],
      itinerary: [
        {
          day: 1,
          title: `Day 1: Essence of ${dest.toUpperCase()}`,
          items: [
            {
              time: "08:30 AM",
              title: cityAttr[0]?.name || "Meenakshi Amman Temple",
              type: "Attraction",
              category: cityAttr[0]?.category || "Heritage",
              description: cityAttr[0]?.description || "Heritage exploration",
              est_cost: "Free",
              is_indoor: true,
              image: cityAttr[0]?.image
            },
            {
              time: "01:00 PM",
              title: `Lunch at ${cityRest[0]?.name || "Murugan Idli Shop"}`,
              type: "Restaurant",
              category: cityRest[0]?.cuisine || "Traditional Veg",
              description: cityRest[0]?.speciality || "Special meal",
              est_cost: cityRest[0]?.price_range || "₹250",
              is_indoor: true,
              image: cityRest[0]?.image
            },
            {
              time: "04:00 PM",
              title: cityAttr[1]?.name || "Thirumalai Palace",
              type: "Attraction",
              category: cityAttr[1]?.category || "Heritage",
              description: cityAttr[1]?.description || "Palace architecture",
              est_cost: "₹50",
              is_indoor: true,
              image: cityAttr[1]?.image
            }
          ]
        }
      ]
    };
  },

  // Dynamic Weather Replanning
  async replanWeather(payload) {
    try {
      const res = await fetch(`${BASE_URL}/ai/replan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Weather Replan API failed, fallback to client replanner", e);
    }
    return {
      condition_simulated: "Monsoon Downpour & Strong Gusts",
      ai_rationale: "🌧️ Adverse Weather Alert: Outdoor waterfalls and open beaches replaced with sheltered heritage halls and indoor culinary experiences.",
      substitutions_count: 1,
      substitutions: [
        {
          original: "Outdoor Beach / Falls",
          replacement: "Gandhi Memorial Museum / Covered Palace",
          reason: "Safe, dry, cultural exploration during sudden heavy rain."
        }
      ],
      updated_itinerary: payload.itinerary
    };
  },

  // Natural Language Search Intent
  async searchWithNL(query) {
    try {
      const res = await fetch(`${BASE_URL}/ai/nl-search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("NL Search API failed, using client keyword fallback", e);
    }
    return {
      extracted_intent: { query, destination: "madurai", category: "all" },
      matched_results: await api.search(query)
    };
  },

  // Smart Recommendations
  async getRecommendations(interests) {
    try {
      const res = await fetch(`${BASE_URL}/ai/recommend?interests=${encodeURIComponent(interests)}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn("Recommendations API failed, fallback to client", e);
    }
    return {
      persona_query: interests,
      curated_theme: "✨ South TN Highlights",
      recommended_attractions: ALL_ATTRACTIONS.slice(0, 4),
      recommended_experiences: ALL_EXPERIENCES.slice(0, 2),
      local_tip: "Best to visit temples in early morning cool hours."
    };
  }
};
