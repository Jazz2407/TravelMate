from fastapi import FastAPI, Query, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional, List, Dict, Any
from pydantic import BaseModel
import uvicorn
import os

from backend.app.database import init_db
from backend.app.crud import (
    get_destinations,
    get_destination,
    search_catalog,
    get_nearby_ecosystem,
    get_all_attractions,
    get_all_restaurants,
    get_all_hotels,
    get_all_guides,
    get_all_experiences,
    get_all_transports,
    save_trip,
    get_trips,
    delete_trip,
    toggle_save_place,
    get_saved_places
)
from backend.app.ai_service import (
    extract_search_intent,
    generate_ai_itinerary,
    replan_for_weather,
    get_smart_recommendations
)

# Initialize database tables & seed data on startup
init_db()

app = FastAPI(
    title="South TN TravelMate API",
    description="Unified tourism platform backend for South Tamil Nadu with grounded AI personalization",
    version="1.0.0"
)

# Enable CORS for local Vite dev and preview
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Models
class PlanRequest(BaseModel):
    destination_id: str = "madurai"
    days: int = 2
    budget: str = "₹5,000"
    companions: str = "Family"
    interests: List[str] = ["Heritage", "Food"]

class ReplanRequest(BaseModel):
    destination_id: str = "madurai"
    itinerary: List[Dict[str, Any]]
    condition: str = "heavy_rain"

class NLSearchRequest(BaseModel):
    query: str

class TripModel(BaseModel):
    id: str
    title: str
    destination_id: str = "madurai"
    days: int = 1
    total_budget: str = "₹0"
    items: List[Dict[str, Any]] = []

class SavePlaceModel(BaseModel):
    id: Optional[str] = None
    item_id: str
    type: str
    title: str
    subtitle: Optional[str] = ""
    image: Optional[str] = ""

# Endpoints
@app.get("/")
def root():
    return {
        "project": "South TN TravelMate",
        "status": "online",
        "pilot_region": "South Tamil Nadu (Madurai, Tirunelveli, Courtallam, Kanyakumari, Rameswaram)",
        "docs_url": "/docs"
    }

# 1. Destinations
@app.get("/api/destinations")
def list_destinations():
    return get_destinations()

@app.get("/api/destinations/{dest_id}")
def get_single_destination(dest_id: str):
    res = get_destination(dest_id)
    if not res:
        raise HTTPException(status_code=404, detail="Destination not found")
    return res

# 2. Universal Search
@app.get("/api/search")
def search(q: str = Query(..., min_length=1)):
    return search_catalog(q)

# 3. Nearby Ecosystem Radar (1km, 3km, 5km, 10km)
@app.get("/api/nearby")
def nearby_ecosystem(
    lat: float = Query(...),
    lng: float = Query(...),
    radius: float = Query(5.0, description="Radius in km (1, 3, 5, 10)")
):
    return get_nearby_ecosystem(lat=lat, lng=lng, radius_km=radius)

# 4. Filtered Entities
@app.get("/api/attractions")
def list_attractions(destination_id: Optional[str] = None, category: Optional[str] = None):
    return get_all_attractions(destination_id=destination_id, category=category)

@app.get("/api/restaurants")
def list_restaurants(destination_id: Optional[str] = None):
    return get_all_restaurants(destination_id=destination_id)

@app.get("/api/hotels")
def list_hotels(destination_id: Optional[str] = None):
    return get_all_hotels(destination_id=destination_id)

@app.get("/api/guides")
def list_guides(destination_id: Optional[str] = None):
    return get_all_guides(destination_id=destination_id)

@app.get("/api/experiences")
def list_experiences(destination_id: Optional[str] = None):
    return get_all_experiences(destination_id=destination_id)

@app.get("/api/transports")
def list_transports():
    return get_all_transports()

# 5. Trips Management ("My Trip")
@app.get("/api/trips")
def fetch_trips():
    return get_trips()

@app.post("/api/trips")
def create_or_update_trip(trip: TripModel):
    return save_trip(trip.model_dump())

@app.delete("/api/trips/{trip_id}")
def remove_trip(trip_id: str):
    return {"deleted": delete_trip(trip_id)}

# 6. Saved Places (Bookmarks)
@app.get("/api/saved")
def fetch_saved():
    return get_saved_places()

@app.post("/api/saved")
def bookmark_place(place: SavePlaceModel):
    return toggle_save_place(place.model_dump())

# 7. AI Personalization Layer
@app.post("/api/ai/plan")
def ai_plan(req: PlanRequest):
    return generate_ai_itinerary(
        destination_id=req.destination_id,
        days=req.days,
        budget=req.budget,
        companions=req.companions,
        interests=req.interests
    )

@app.post("/api/ai/replan")
def ai_replan(req: ReplanRequest):
    return replan_for_weather(
        current_itinerary=req.itinerary,
        condition=req.condition,
        destination_id=req.destination_id
    )

@app.get("/api/ai/recommend")
def ai_recommend(interests: str = Query("nature and photography")):
    return get_smart_recommendations(interests)

@app.post("/api/ai/nl-search")
def ai_natural_language_search(req: NLSearchRequest):
    intent = extract_search_intent(req.query)
    # Search database based on intent
    target_q = intent["destination"] or intent["category"] or req.query
    raw_results = search_catalog(target_q)
    return {
        "extracted_intent": intent,
        "matched_results": raw_results
    }

if __name__ == "__main__":
    uvicorn.run("backend.app.main:app", host="127.0.0.1", port=8000, reload=True)
