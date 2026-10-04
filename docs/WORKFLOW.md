# South TN TravelMate — Complete 15-Day Engineering Workflow

This document details the complete 15-day technical roadmap, operational schedule, and execution plan implemented for the **South TN TravelMate** pilot platform.

---

## High-Level Architecture Overview

```
                        ┌────────────────────────────────────────┐
                        │      React + Vite + Tailwind CSS       │
                        │   (Leaflet Maps + Proximity Radar)     │
                        └───────────────────┬────────────────────┘
                                            │ REST API
                                            ▼
                        ┌────────────────────────────────────────┐
                        │             FastAPI Backend            │
                        │           (Python 3.10 Async)          │
                        └───────┬────────────────────────┬───────┘
                                │                        │
                ┌───────────────┴────────┐       ┌───────┴───────────────┐
                ▼                        ▼       ▼                       ▼
    ┌───────────────────────┐ ┌──────────────────────────────────────────────┐
    │  SQLite / PostgreSQL  │ │             AI Personalization Layer         │
    │  - 5 Gateways         │ │ 1. Intent Extraction (NLP Search)            │
    │  - 25 Attractions     │ │ 2. Grounded AI Trip Planner                  │
    │  - 25 Restaurants     │ │ 3. Dynamic Weather Replanner ("Simulate Rain")│
    │  - 15 Hotels          │ │ 4. Persona Recommendation Engine             │
    │  - 10 Guides          │ │    (Grounded on Real DB to Stop Hallucination)│
    │  - 10 Experiences     │ └──────────────────────────────────────────────┘
    └───────────────────────┘
```

---

## 15-Day Development Execution Breakdown

### Phase 1: Planning & Foundation (Days 1 – 3)
* **Day 1 — Planning & Product Definition**
  * Target region selection: Focused on **South Tamil Nadu** as a high-density, manageable pilot region (Madurai, Tirunelveli, Courtallam, Kanyakumari, Rameswaram).
  * Established the bedrock philosophy: **"Tourism platform first → AI intelligence second."**
  * Wireframed 10–12 essential tourist views.
* **Day 2 — Project Setup & Environment**
  * Created `backend/` (FastAPI, SQLite, Pydantic) and `frontend/` (React, Vite, Tailwind CSS, Leaflet).
  * Configured local proxying and CORS policies.
* **Day 3 — Relational Tourism Database & Seeding**
  * Implemented SQLite database schema with foreign-key relations across:
    * `destinations`
    * `attractions`
    * `restaurants`
    * `hotels`
    * `guides`
    * `experiences`
    * `transports`
    * `trips`
    * `saved_places`
  * Curated 100+ realistic records across the 5 pilot cities with real GPS coordinates, hours, fees, and cultural notes.

---

### Phase 2: Core Platform & Search (Days 4 – 7)
* **Day 4 — Discover Homepage**
  * Built the hero portal, category filter chips (*Heritage, Spiritual, Nature, Beaches, Food, Culture*), and gateway destination cards.
* **Day 5 — Universal & Natural Language Search Engine**
  * Implemented normal relational keyword search across all catalog entities (`GET /api/search?q=`).
  * Built optional AI Natural Language search query intent extractor (`POST /api/ai/nl-search`) that maps phrases like *"Find family hotel near Meenakshi under ₹2500"* to structured queries.
* **Day 6 — Destination Detail Pages**
  * Complete cultural city portals with overview, opening hours, dress codes, ticket prices, and photo carousels.
* **Day 7 — The "Around Me" Proximity Radar (Signature Feature)**
  * Developed the Haversine geospatial proximity engine (`GET /api/nearby?lat=&lng=&radius=`).
  * Integrated interactive radius selector (**1 km | 3 km | 5 km | 10 km**) with dynamic circle overlays on OpenStreetMap (Leaflet).
  * Proves the ecosystem connection: *Hotel ↔ Restaurant ↔ Current Monument ↔ Guide ↔ Shop*.

---

### Phase 3: Itinerary & Provider Ecosystem (Days 8 – 9)
* **Day 8 — "My Trip" Interactive Itinerary Builder**
  * Implemented CRUD and day-by-day scheduling with customizable time blocks (09:00 AM, 11:30 AM, 01:00 PM lunch, etc.).
  * Added re-ordering (Move Up / Move Down), budget calculation, and JSON export.
* **Day 9 — Local Service Provider Directory**
  * Created direct access tabs for licensed government guides (languages, experience, phone numbers), iconic traditional eateries (Murugan Idli, Iruttukadai Halwa, Border Rahmath), and authentic craft workshops (Sungudi saree weaving, conch carving).

---

### Phase 4: Grounded AI Layer (Days 10 – 12)
* **Day 10 — AI Feature 1: Grounded Trip Planner**
  * Ingests destination, days, budget tier, and companions.
  * Filters candidate spots from the verified database to compose non-hallucinated itineraries.
* **Day 11 — AI Feature 2: Smart Persona Recommender**
  * Matches tourist styles (*"nature and photography"*, *"pilgrimage & devotional architecture"*, *"authentic spicy street food"*) to specific attractions and regional tips.
* **Day 12 — AI Feature 3: Dynamic Weather Replanning (Hackathon Showstopper)**
  * Implemented the **"Simulate Rain"** trigger.
  * When outdoor activities (waterfalls, beaches, open temple tanks) are affected by weather alerts, AI replaces them with sheltered heritage museums, covered palace corridors, and traditional indoor eateries.

---

### Phase 5: Polish, Testing & Pitch Preparation (Days 13 – 15)
* **Day 13 — UI Polish & Responsiveness**
  * Tailored responsive layouts for mobile and desktop screens.
  * Integrated smooth transitions, loading skeletons, and interactive map popups.
* **Day 14 — End-to-End User Journey Testing**
  * Verified the full loop: *Home → Search → Destination → Nearby Radar → Add to Trip → AI Plan → Weather Replan*.
* **Day 15 — Presentation & Hackathon Delivery**
  * Prepared the 5-minute tourist-centric pitch script and live demonstration workflow.
