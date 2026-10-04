import sqlite3
import json
import os
from typing import List, Dict, Any
from backend.app.seed_data import DESTINATIONS, ATTRACTIONS, RESTAURANTS, HOTELS, GUIDES, EXPERIENCES, TRANSPORTS

DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "travelmate.db")

def get_connection():
    conn = sqlite3.connect(DB_FILE, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    # Create tables
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS destinations (
        id TEXT PRIMARY KEY,
        name TEXT,
        district TEXT,
        tagline TEXT,
        description TEXT,
        latitude REAL,
        longitude REAL,
        category TEXT,
        image TEXT,
        best_time TEXT,
        estimated_visit_duration TEXT
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS attractions (
        id TEXT PRIMARY KEY,
        destination_id TEXT,
        name TEXT,
        description TEXT,
        category TEXT,
        latitude REAL,
        longitude REAL,
        opening_time TEXT,
        closing_time TEXT,
        entry_fee REAL,
        estimated_duration TEXT,
        image TEXT,
        is_indoor INTEGER,
        FOREIGN KEY (destination_id) REFERENCES destinations (id)
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS restaurants (
        id TEXT PRIMARY KEY,
        destination_id TEXT,
        name TEXT,
        cuisine TEXT,
        price_range TEXT,
        latitude REAL,
        longitude REAL,
        rating REAL,
        vegetarian INTEGER,
        speciality TEXT,
        image TEXT,
        FOREIGN KEY (destination_id) REFERENCES destinations (id)
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS hotels (
        id TEXT PRIMARY KEY,
        destination_id TEXT,
        name TEXT,
        price_range TEXT,
        latitude REAL,
        longitude REAL,
        rating REAL,
        amenities TEXT,
        image TEXT,
        FOREIGN KEY (destination_id) REFERENCES destinations (id)
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS guides (
        id TEXT PRIMARY KEY,
        destination_id TEXT,
        name TEXT,
        location TEXT,
        languages TEXT,
        speciality TEXT,
        experience TEXT,
        price TEXT,
        rating REAL,
        phone TEXT,
        FOREIGN KEY (destination_id) REFERENCES destinations (id)
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS experiences (
        id TEXT PRIMARY KEY,
        destination_id TEXT,
        name TEXT,
        location TEXT,
        category TEXT,
        description TEXT,
        duration TEXT,
        price TEXT,
        provider TEXT,
        image TEXT,
        FOREIGN KEY (destination_id) REFERENCES destinations (id)
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS transports (
        id TEXT PRIMARY KEY,
        name TEXT,
        type TEXT,
        coverage TEXT,
        fare_estimate TEXT,
        contact TEXT
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS trips (
        id TEXT PRIMARY KEY,
        title TEXT,
        destination_id TEXT,
        days INTEGER,
        total_budget TEXT,
        items TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS saved_places (
        id TEXT PRIMARY KEY,
        type TEXT,
        item_id TEXT,
        title TEXT,
        subtitle TEXT,
        image TEXT,
        saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    # Seed if destinations table is empty
    cursor.execute("SELECT COUNT(*) as cnt FROM destinations")
    if cursor.fetchone()["cnt"] == 0:
        # Seed destinations
        for d in DESTINATIONS:
            cursor.execute("""
            INSERT INTO destinations VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (d["id"], d["name"], d["district"], d["tagline"], d["description"], d["latitude"], d["longitude"], d["category"], d["image"], d["best_time"], d["estimated_visit_duration"]))

        # Seed attractions
        for a in ATTRACTIONS:
            cursor.execute("""
            INSERT INTO attractions VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (a["id"], a["destination_id"], a["name"], a["description"], a["category"], a["latitude"], a["longitude"], a["opening_time"], a["closing_time"], a["entry_fee"], a["estimated_duration"], a["image"], 1 if a.get("is_indoor", False) else 0))

        # Seed restaurants
        for r in RESTAURANTS:
            cursor.execute("""
            INSERT INTO restaurants VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (r["id"], r["destination_id"], r["name"], r["cuisine"], r["price_range"], r["latitude"], r["longitude"], r["rating"], 1 if r["vegetarian"] else 0, r["speciality"], r["image"]))

        # Seed hotels
        for h in HOTELS:
            cursor.execute("""
            INSERT INTO hotels VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (h["id"], h["destination_id"], h["name"], h["price_range"], h["latitude"], h["longitude"], h["rating"], json.dumps(h["amenities"]), h["image"]))

        # Seed guides
        for g in GUIDES:
            cursor.execute("""
            INSERT INTO guides VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (g["id"], g["destination_id"], g["name"], g["location"], json.dumps(g["languages"]), g["speciality"], g["experience"], g["price"], g["rating"], g["phone"]))

        # Seed experiences
        for e in EXPERIENCES:
            cursor.execute("""
            INSERT INTO experiences VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (e["id"], e["destination_id"], e["name"], e["location"], e["category"], e["description"], e["duration"], e["price"], e["provider"], e["image"]))

        # Seed transports
        for t in TRANSPORTS:
            cursor.execute("""
            INSERT INTO transports VALUES (?, ?, ?, ?, ?, ?)
            """, (t["id"], t["name"], t["type"], t["coverage"], t["fare_estimate"], t["contact"]))

    conn.commit()
    conn.close()
