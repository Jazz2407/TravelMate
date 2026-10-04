import math
import json
from typing import List, Dict, Any, Optional
from backend.app.database import get_connection

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate the great circle distance in kilometers between two points."""
    R = 6371.0 # Earth's radius in kilometers
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (math.sin(dlat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dlon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return round(R * c, 2)

def get_destinations() -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM destinations")
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows

def get_destination(dest_id: str) -> Optional[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM destinations WHERE id = ?", (dest_id.lower(),))
    row = cursor.fetchone()
    if not row:
        conn.close()
        return None
    
    destination = dict(row)
    # Fetch connected ecosystem
    cursor.execute("SELECT * FROM attractions WHERE destination_id = ?", (dest_id,))
    destination["attractions"] = [dict(r) for r in cursor.fetchall()]

    cursor.execute("SELECT * FROM restaurants WHERE destination_id = ?", (dest_id,))
    destination["restaurants"] = [dict(r) for r in cursor.fetchall()]

    cursor.execute("SELECT * FROM hotels WHERE destination_id = ?", (dest_id,))
    hotels = []
    for r in cursor.fetchall():
        h = dict(r)
        h["amenities"] = json.loads(h["amenities"]) if h.get("amenities") else []
        hotels.append(h)
    destination["hotels"] = hotels

    cursor.execute("SELECT * FROM guides WHERE destination_id = ?", (dest_id,))
    guides = []
    for r in cursor.fetchall():
        g = dict(r)
        g["languages"] = json.loads(g["languages"]) if g.get("languages") else []
        guides.append(g)
    destination["guides"] = guides

    cursor.execute("SELECT * FROM experiences WHERE destination_id = ?", (dest_id,))
    destination["experiences"] = [dict(r) for r in cursor.fetchall()]

    conn.close()
    return destination

def search_catalog(query: str) -> Dict[str, Any]:
    """Universal search across all tourism entities in database."""
    conn = get_connection()
    cursor = conn.cursor()
    q = f"%{query.strip()}%"

    cursor.execute("SELECT * FROM destinations WHERE name LIKE ? OR district LIKE ? OR description LIKE ?", (q, q, q))
    destinations = [dict(r) for r in cursor.fetchall()]

    cursor.execute("SELECT * FROM attractions WHERE name LIKE ? OR description LIKE ? OR category LIKE ?", (q, q, q))
    attractions = [dict(r) for r in cursor.fetchall()]

    cursor.execute("SELECT * FROM restaurants WHERE name LIKE ? OR cuisine LIKE ? OR speciality LIKE ?", (q, q, q))
    restaurants = [dict(r) for r in cursor.fetchall()]

    cursor.execute("SELECT * FROM hotels WHERE name LIKE ? OR amenities LIKE ?", (q, q))
    hotels = []
    for r in cursor.fetchall():
        h = dict(r)
        h["amenities"] = json.loads(h["amenities"]) if h.get("amenities") else []
        hotels.append(h)

    cursor.execute("SELECT * FROM guides WHERE name LIKE ? OR speciality LIKE ? OR languages LIKE ?", (q, q, q))
    guides = []
    for r in cursor.fetchall():
        g = dict(r)
        g["languages"] = json.loads(g["languages"]) if g.get("languages") else []
        guides.append(g)

    cursor.execute("SELECT * FROM experiences WHERE name LIKE ? OR description LIKE ? OR category LIKE ?", (q, q, q))
    experiences = [dict(r) for r in cursor.fetchall()]

    conn.close()
    total = len(destinations) + len(attractions) + len(restaurants) + len(hotels) + len(guides) + len(experiences)
    return {
        "query": query,
        "total_results": total,
        "destinations": destinations,
        "attractions": attractions,
        "restaurants": restaurants,
        "hotels": hotels,
        "guides": guides,
        "experiences": experiences
    }

def get_nearby_ecosystem(lat: float, lng: float, radius_km: float = 5.0, category_filter: Optional[str] = None) -> Dict[str, Any]:
    """Finds all surrounding hotels, restaurants, attractions, guides within radius_km."""
    conn = get_connection()
    cursor = conn.cursor()

    results = {
        "center": {"latitude": lat, "longitude": lng},
        "radius_km": radius_km,
        "attractions": [],
        "restaurants": [],
        "hotels": [],
        "guides": [],
        "experiences": []
    }

    # Attractions
    cursor.execute("SELECT * FROM attractions")
    for r in cursor.fetchall():
        item = dict(r)
        dist = haversine_distance(lat, lng, item["latitude"], item["longitude"])
        if dist <= radius_km:
            item["distance_km"] = dist
            item["type"] = "attraction"
            results["attractions"].append(item)

    # Restaurants
    cursor.execute("SELECT * FROM restaurants")
    for r in cursor.fetchall():
        item = dict(r)
        dist = haversine_distance(lat, lng, item["latitude"], item["longitude"])
        if dist <= radius_km:
            item["distance_km"] = dist
            item["type"] = "restaurant"
            results["restaurants"].append(item)

    # Hotels
    cursor.execute("SELECT * FROM hotels")
    for r in cursor.fetchall():
        item = dict(r)
        dist = haversine_distance(lat, lng, item["latitude"], item["longitude"])
        if dist <= radius_km:
            item["distance_km"] = dist
            item["type"] = "hotel"
            item["amenities"] = json.loads(item["amenities"]) if item.get("amenities") else []
            results["hotels"].append(item)

    # Guides (match by location/destination proximity)
    cursor.execute("SELECT * FROM guides")
    for r in cursor.fetchall():
        item = dict(r)
        item["languages"] = json.loads(item["languages"]) if item.get("languages") else []
        item["type"] = "guide"
        results["guides"].append(item)

    # Experiences
    cursor.execute("SELECT * FROM experiences")
    for r in cursor.fetchall():
        item = dict(r)
        item["type"] = "experience"
        results["experiences"].append(item)

    conn.close()

    # Sort each list by distance
    results["attractions"].sort(key=lambda x: x.get("distance_km", 999))
    results["restaurants"].sort(key=lambda x: x.get("distance_km", 999))
    results["hotels"].sort(key=lambda x: x.get("distance_km", 999))

    results["total_nearby"] = (
        len(results["attractions"]) +
        len(results["restaurants"]) +
        len(results["hotels"])
    )
    return results

def get_all_attractions(destination_id: Optional[str] = None, category: Optional[str] = None) -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    query = "SELECT * FROM attractions WHERE 1=1"
    params = []
    if destination_id:
        query += " AND destination_id = ?"
        params.append(destination_id)
    if category:
        query += " AND category = ?"
        params.append(category)
    cursor.execute(query, tuple(params))
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows

def get_all_restaurants(destination_id: Optional[str] = None) -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    query = "SELECT * FROM restaurants WHERE 1=1"
    params = []
    if destination_id:
        query += " AND destination_id = ?"
        params.append(destination_id)
    cursor.execute(query, tuple(params))
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows

def get_all_hotels(destination_id: Optional[str] = None) -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    query = "SELECT * FROM hotels WHERE 1=1"
    params = []
    if destination_id:
        query += " AND destination_id = ?"
        params.append(destination_id)
    cursor.execute(query, tuple(params))
    hotels = []
    for r in cursor.fetchall():
        h = dict(r)
        h["amenities"] = json.loads(h["amenities"]) if h.get("amenities") else []
        hotels.append(h)
    conn.close()
    return hotels

def get_all_guides(destination_id: Optional[str] = None) -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    query = "SELECT * FROM guides WHERE 1=1"
    params = []
    if destination_id:
        query += " AND destination_id = ?"
        params.append(destination_id)
    cursor.execute(query, tuple(params))
    guides = []
    for r in cursor.fetchall():
        g = dict(r)
        g["languages"] = json.loads(g["languages"]) if g.get("languages") else []
        guides.append(g)
    conn.close()
    return guides

def get_all_experiences(destination_id: Optional[str] = None) -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    query = "SELECT * FROM experiences WHERE 1=1"
    params = []
    if destination_id:
        query += " AND destination_id = ?"
        params.append(destination_id)
    cursor.execute(query, tuple(params))
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows

def get_all_transports() -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM transports")
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows

# Trip Management
def save_trip(trip: Dict[str, Any]) -> Dict[str, Any]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
    INSERT OR REPLACE INTO trips (id, title, destination_id, days, total_budget, items)
    VALUES (?, ?, ?, ?, ?, ?)
    """, (trip["id"], trip["title"], trip.get("destination_id", "madurai"), trip.get("days", 1), trip.get("total_budget", "₹0"), json.dumps(trip.get("items", []))))
    conn.commit()
    conn.close()
    return trip

def get_trips() -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM trips ORDER BY created_at DESC")
    trips = []
    for r in cursor.fetchall():
        t = dict(r)
        t["items"] = json.loads(t["items"]) if t.get("items") else []
        trips.append(t)
    conn.close()
    return trips

def delete_trip(trip_id: str) -> bool:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM trips WHERE id = ?", (trip_id,))
    conn.commit()
    conn.close()
    return True

# Bookmarks / Saved Places
def toggle_save_place(place: Dict[str, Any]) -> Dict[str, Any]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM saved_places WHERE item_id = ?", (place["item_id"],))
    existing = cursor.fetchone()
    if existing:
        cursor.execute("DELETE FROM saved_places WHERE item_id = ?", (place["item_id"],))
        conn.commit()
        conn.close()
        return {"saved": False, "item_id": place["item_id"]}
    else:
        cursor.execute("""
        INSERT INTO saved_places (id, type, item_id, title, subtitle, image)
        VALUES (?, ?, ?, ?, ?, ?)
        """, (place.get("id", place["item_id"]), place["type"], place["item_id"], place["title"], place.get("subtitle", ""), place.get("image", "")))
        conn.commit()
        conn.close()
        return {"saved": True, "item_id": place["item_id"]}

def get_saved_places() -> List[Dict[str, Any]]:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM saved_places ORDER BY saved_at DESC")
    rows = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return rows
