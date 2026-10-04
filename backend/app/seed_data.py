"""
South TN TravelMate - Curated Tourism Dataset
Covers 5 Core Pilot Destinations:
1. Madurai
2. Tirunelveli
3. Courtallam
4. Kanyakumari
5. Rameswaram
Each destination includes Attractions, Restaurants, Hotels, Guides, Experiences & Transport.
"""

DESTINATIONS = [
    {
        "id": "madurai",
        "name": "Madurai",
        "district": "Madurai",
        "tagline": "The Soul of Tamil Culture & City of Temples",
        "description": "Known as 'Thoonga Nagaram' (the city that never sleeps), Madurai is one of the world's oldest continuously inhabited cities. Famous for the magnificent Meenakshi Amman Temple, delectable street food, sungudi sarees, and jasmine flowers (Madurai Malli).",
        "latitude": 9.9195,
        "longitude": 78.1193,
        "category": "Heritage",
        "image": "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=1200&q=80",
        "best_time": "October to March",
        "estimated_visit_duration": "2 - 3 Days"
    },
    {
        "id": "tirunelveli",
        "name": "Tirunelveli",
        "district": "Tirunelveli",
        "tagline": "The Land of Golden Halwa & Tamirabarani Heritage",
        "description": "Nestled on the banks of the perennial Tamirabarani River, Tirunelveli is celebrated for the monumental Nellaiappar Temple with its musical pillars, lush paddy fields, and the world-renowned melt-in-mouth Iruttukadai Halwa.",
        "latitude": 8.7139,
        "longitude": 77.7567,
        "category": "Spiritual",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
        "best_time": "September to March",
        "estimated_visit_duration": "2 Days"
    },
    {
        "id": "courtallam",
        "name": "Courtallam",
        "district": "Tenkasi",
        "tagline": "The Spa of South India & Cascading Herbal Falls",
        "description": "Situated in the Western Ghats, Courtallam is renowned for its therapeutic waterfalls that flow through medicinal herb forests. Tourists flock here during the 'Saaral' monsoon season for rejuvenating natural hydrotherapy baths.",
        "latitude": 8.9298,
        "longitude": 77.2691,
        "category": "Nature",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
        "best_time": "June to September (Monsoon Saaral)",
        "estimated_visit_duration": "1 - 2 Days"
    },
    {
        "id": "kanyakumari",
        "name": "Kanyakumari",
        "district": "Kanyakumari",
        "tagline": "Triveni Sangamam & The Land's End",
        "description": "The southernmost tip of the Indian peninsula where the Bay of Bengal, Arabian Sea, and Indian Ocean meet. Famous for breathtaking simultaneous sunrise and sunset, the Vivekananda Rock Memorial, and the 133-ft Thiruvalluvar Statue.",
        "latitude": 8.0883,
        "longitude": 77.5385,
        "category": "Beaches",
        "image": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1200&q=80",
        "best_time": "October to March",
        "estimated_visit_duration": "2 Days"
    },
    {
        "id": "rameswaram",
        "name": "Rameswaram",
        "district": "Ramanathapuram",
        "tagline": "Island of Sacred Corridors & Oceanic Legends",
        "description": "A tranquil island town connected to the mainland by the iconic Pamban Bridge. Home to the Ramanathaswamy Temple featuring the longest pillared corridor in India, 22 sacred theerthams, and the ethereal ghost town of Dhanushkodi.",
        "latitude": 9.2876,
        "longitude": 79.3129,
        "category": "Spiritual",
        "image": "https://images.unsplash.com/photo-1609137144822-263a8a97c413?auto=format&fit=crop&w=1200&q=80",
        "best_time": "October to April",
        "estimated_visit_duration": "2 - 3 Days"
    }
]

ATTRACTIONS = [
    # Madurai (5)
    {
        "id": "attr-mdu-1",
        "destination_id": "madurai",
        "name": "Meenakshi Amman Temple",
        "description": "Historic Dravidian masterpiece with 14 awe-inspiring sculpted gopurams and the Thousand Pillar Hall.",
        "category": "Spiritual",
        "latitude": 9.9195,
        "longitude": 78.1193,
        "opening_time": "05:00 AM",
        "closing_time": "10:00 PM",
        "entry_fee": 0,
        "estimated_duration": "3 hours",
        "image": "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=800&q=80",
        "is_indoor": True
    },
    {
        "id": "attr-mdu-2",
        "destination_id": "madurai",
        "name": "Thirumalai Nayakkar Mahal",
        "description": "17th-century Indo-Saracenic palace built by King Tirumala Nayaka with gigantic ornamental stucco pillars and sound-and-light show.",
        "category": "Heritage",
        "latitude": 9.9154,
        "longitude": 78.1238,
        "opening_time": "09:00 AM",
        "closing_time": "05:00 PM",
        "entry_fee": 50,
        "estimated_duration": "2 hours",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "is_indoor": True
    },
    {
        "id": "attr-mdu-3",
        "destination_id": "madurai",
        "name": "Gandhi Memorial Museum",
        "description": "Housed in the historic Rani Mangammal Palace, preserving original artifacts including Gandhi's blood-stained garment from 1948.",
        "category": "Culture",
        "latitude": 9.9317,
        "longitude": 78.1408,
        "opening_time": "10:00 AM",
        "closing_time": "05:30 PM",
        "entry_fee": 0,
        "estimated_duration": "1.5 hours",
        "image": "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80",
        "is_indoor": True
    },
    {
        "id": "attr-mdu-4",
        "destination_id": "madurai",
        "name": "Vandiyur Mariamman Teppakulam",
        "description": "Massive 16-acre temple tank with an island pavilion (Maiya Mandapam) connected to the Vaigai river channels.",
        "category": "Heritage",
        "latitude": 9.9079,
        "longitude": 78.1485,
        "opening_time": "06:00 AM",
        "closing_time": "08:00 PM",
        "entry_fee": 0,
        "estimated_duration": "1 hour",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
        "is_indoor": False
    },
    {
        "id": "attr-mdu-5",
        "destination_id": "madurai",
        "name": "Alagar Kovil (Kallazhagar Temple)",
        "description": "Picturesque hill shrine dedicated to Lord Vishnu situated amidst dense forested slopes of Alagar Hills.",
        "category": "Spiritual",
        "latitude": 10.0768,
        "longitude": 78.2140,
        "opening_time": "06:00 AM",
        "closing_time": "08:30 PM",
        "entry_fee": 20,
        "estimated_duration": "2.5 hours",
        "image": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
        "is_indoor": False
    },

    # Tirunelveli (5)
    {
        "id": "attr-tnv-1",
        "destination_id": "tirunelveli",
        "name": "Nellaiappar Temple & Musical Pillars",
        "description": "7th-century Shiva temple complex covering 14 acres with the famous Mani Mandapam musical stone pillars.",
        "category": "Spiritual",
        "latitude": 8.7275,
        "longitude": 77.6896,
        "opening_time": "05:30 AM",
        "closing_time": "09:00 PM",
        "entry_fee": 0,
        "estimated_duration": "2.5 hours",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "is_indoor": True
    },
    {
        "id": "attr-tnv-2",
        "destination_id": "tirunelveli",
        "name": "District Science Centre & Planetarium",
        "description": "Engaging science discovery park with interactive digital galleries, digital planetarium and dinosaur enclosure.",
        "category": "Culture",
        "latitude": 8.7188,
        "longitude": 77.7408,
        "opening_time": "10:00 AM",
        "closing_time": "05:45 PM",
        "entry_fee": 40,
        "estimated_duration": "2 hours",
        "image": "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80",
        "is_indoor": True
    },
    {
        "id": "attr-tnv-3",
        "destination_id": "tirunelveli",
        "name": "Manimuthar Waterfalls & Dam",
        "description": "Scenic Western Ghats dam and cascade falling into an 80-ft natural pool surrounded by dense teak woods.",
        "category": "Nature",
        "latitude": 8.5772,
        "longitude": 77.4116,
        "opening_time": "08:00 AM",
        "closing_time": "05:00 PM",
        "entry_fee": 30,
        "estimated_duration": "3 hours",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
        "is_indoor": False
    },
    {
        "id": "attr-tnv-4",
        "destination_id": "tirunelveli",
        "name": "Krishnapuram Venkatachalapathy Temple",
        "description": "Celebrated for life-like 16th-century Nayak dynasty monolithic stone sculptures carved with micro-anatomical precision.",
        "category": "Heritage",
        "latitude": 8.7003,
        "longitude": 77.8015,
        "opening_time": "07:00 AM",
        "closing_time": "07:30 PM",
        "entry_fee": 10,
        "estimated_duration": "1.5 hours",
        "image": "https://images.unsplash.com/photo-1609137144822-263a8a97c413?auto=format&fit=crop&w=800&q=80",
        "is_indoor": True
    },
    {
        "id": "attr-tnv-5",
        "destination_id": "tirunelveli",
        "name": "Agasthiyar Falls (Papanasam)",
        "description": "Perennial pristine cascade on Tamirabarani river associated with sage Agastya, ideal for a scenic forest walk.",
        "category": "Nature",
        "latitude": 8.6833,
        "longitude": 77.3667,
        "opening_time": "06:30 AM",
        "closing_time": "05:30 PM",
        "entry_fee": 25,
        "estimated_duration": "3 hours",
        "image": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
        "is_indoor": False
    },

    # Courtallam (5)
    {
        "id": "attr-crt-1",
        "destination_id": "courtallam",
        "name": "Main Falls (Peraruvi)",
        "description": "The 60m signature waterfall of Courtallam known for its therapeutic waters infused with Western Ghats medicinal herbs.",
        "category": "Nature",
        "latitude": 8.9298,
        "longitude": 77.2691,
        "opening_time": "06:00 AM",
        "closing_time": "07:00 PM",
        "entry_fee": 0,
        "estimated_duration": "2.5 hours",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
        "is_indoor": False
    },
    {
        "id": "attr-crt-2",
        "destination_id": "courtallam",
        "name": "Five Falls (Aintharuvi)",
        "description": "A split cascade dividing into 5 distinct gentle streams resembling the five heads of Adisesha serpent.",
        "category": "Nature",
        "latitude": 8.9192,
        "longitude": 77.2478,
        "opening_time": "06:00 AM",
        "closing_time": "06:30 PM",
        "entry_fee": 0,
        "estimated_duration": "2 hours",
        "image": "https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=800&q=80",
        "is_indoor": False
    },
    {
        "id": "attr-crt-3",
        "destination_id": "courtallam",
        "name": "Old Courtallam Falls (Pazhaya Aruvi)",
        "description": "Tranquil step waterfall flowing between huge rock fissures, ideal for family baths away from crowded center.",
        "category": "Nature",
        "latitude": 8.9515,
        "longitude": 77.2912,
        "opening_time": "06:00 AM",
        "closing_time": "06:00 PM",
        "entry_fee": 0,
        "estimated_duration": "2 hours",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "is_indoor": False
    },
    {
        "id": "attr-crt-4",
        "destination_id": "courtallam",
        "name": "Courtallanathar Temple & Chithira Sabha",
        "description": "Ancient Shiva shrine with copper-roofed Chithira Sabha adorned with intricate 14th-century murals.",
        "category": "Spiritual",
        "latitude": 8.9302,
        "longitude": 77.2699,
        "opening_time": "06:00 AM",
        "closing_time": "08:30 PM",
        "entry_fee": 0,
        "estimated_duration": "1.5 hours",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "is_indoor": True
    },
    {
        "id": "attr-crt-5",
        "destination_id": "courtallam",
        "name": "Courtallam Eco Park & Herbal Nursery",
        "description": "Sprawling botanical sanctuary showcasing over 300 endemic medicinal plants and indoor herbal exhibition.",
        "category": "Nature",
        "latitude": 8.9240,
        "longitude": 77.2750,
        "opening_time": "09:30 AM",
        "closing_time": "06:00 PM",
        "entry_fee": 20,
        "estimated_duration": "1.5 hours",
        "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
        "is_indoor": True
    },

    # Kanyakumari (5)
    {
        "id": "attr-kny-1",
        "destination_id": "kanyakumari",
        "name": "Vivekananda Rock Memorial",
        "description": "Magnificent rock monument in the sea where Swami Vivekananda meditated in 1892, reached by scenic ferry.",
        "category": "Heritage",
        "latitude": 8.0781,
        "longitude": 77.5552,
        "opening_time": "08:00 AM",
        "closing_time": "04:30 PM",
        "entry_fee": 50,
        "estimated_duration": "2.5 hours",
        "image": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80",
        "is_indoor": True
    },
    {
        "id": "attr-kny-2",
        "destination_id": "kanyakumari",
        "name": "Thiruvalluvar Statue",
        "description": "Colossal 133-foot stone statue dedicated to Tamil philosopher poet Thiruvalluvar symbolizing 133 chapters of Tirukkural.",
        "category": "Heritage",
        "latitude": 8.0772,
        "longitude": 77.5559,
        "opening_time": "08:00 AM",
        "closing_time": "04:30 PM",
        "entry_fee": 20,
        "estimated_duration": "1 hour",
        "image": "https://images.unsplash.com/photo-1609137144822-263a8a97c413?auto=format&fit=crop&w=800&q=80",
        "is_indoor": False
    },
    {
        "id": "attr-kny-3",
        "destination_id": "kanyakumari",
        "name": "Sunset View Point & Triveni Sangamam",
        "description": "The southern peninsula edge where the waters of the Arabian Sea, Bay of Bengal and Indian Ocean swirl together.",
        "category": "Beaches",
        "latitude": 8.0805,
        "longitude": 77.5450,
        "opening_time": "05:00 AM",
        "closing_time": "07:30 PM",
        "entry_fee": 0,
        "estimated_duration": "2 hours",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "is_indoor": False
    },
    {
        "id": "attr-kny-4",
        "destination_id": "kanyakumari",
        "name": "Padmanabhapuram Palace",
        "description": "Splendid 16th-century wooden palace masterpiece of Kerala architecture featuring Belgian mirrors and carved rosewood ceilings.",
        "category": "Heritage",
        "latitude": 8.2508,
        "longitude": 77.3275,
        "opening_time": "09:00 AM",
        "closing_time": "04:30 PM",
        "entry_fee": 60,
        "estimated_duration": "2.5 hours",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "is_indoor": True
    },
    {
        "id": "attr-kny-5",
        "destination_id": "kanyakumari",
        "name": "Mathur Hanging Aqueduct",
        "description": "Longest and highest aqueduct bridge in South Asia, carrying irrigation canal waters 115 feet above lush tropical valleys.",
        "category": "Nature",
        "latitude": 8.3340,
        "longitude": 77.2940,
        "opening_time": "07:00 AM",
        "closing_time": "06:30 PM",
        "entry_fee": 15,
        "estimated_duration": "1.5 hours",
        "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
        "is_indoor": False
    },

    # Rameswaram (5)
    {
        "id": "attr-rsm-1",
        "destination_id": "rameswaram",
        "name": "Ramanathaswamy Temple & 22 Theerthams",
        "description": "Sacred Jyotirlinga temple boasting the world's longest pillared sandstone corridor (1220 meters) and 22 purificatory wells.",
        "category": "Spiritual",
        "latitude": 9.2881,
        "longitude": 79.3174,
        "opening_time": "05:00 AM",
        "closing_time": "09:00 PM",
        "entry_fee": 0,
        "estimated_duration": "3 hours",
        "image": "https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?auto=format&fit=crop&w=800&q=80",
        "is_indoor": True
    },
    {
        "id": "attr-rsm-2",
        "destination_id": "rameswaram",
        "name": "Dhanushkodi Ghost Town & Beach",
        "description": "Hauntingly picturesque ruined township submerged by the 1964 cyclone, situated where the Bay of Bengal meets the Indian Ocean.",
        "category": "Beaches",
        "latitude": 9.1764,
        "longitude": 79.4183,
        "opening_time": "06:00 AM",
        "closing_time": "05:30 PM",
        "entry_fee": 0,
        "estimated_duration": "3 hours",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "is_indoor": False
    },
    {
        "id": "attr-rsm-3",
        "destination_id": "rameswaram",
        "name": "Pamban Sea Bridge",
        "description": "India's first sea bridge opened in 1914 with a double-leaf bascule cantilever opening for cargo ships.",
        "category": "Heritage",
        "latitude": 9.2783,
        "longitude": 79.2008,
        "opening_time": "24 Hours",
        "closing_time": "24 Hours",
        "entry_fee": 0,
        "estimated_duration": "1 hour",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80",
        "is_indoor": False
    },
    {
        "id": "attr-rsm-4",
        "destination_id": "rameswaram",
        "name": "Dr. A.P.J. Abdul Kalam National Memorial",
        "description": "Architectural tribute to the 'Peoples President' displaying his replica missiles, scientific models, and childhood memorabilia.",
        "category": "Culture",
        "latitude": 9.2895,
        "longitude": 79.2858,
        "opening_time": "09:00 AM",
        "closing_time": "06:00 PM",
        "entry_fee": 10,
        "estimated_duration": "1.5 hours",
        "image": "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
        "is_indoor": True
    },
    {
        "id": "attr-rsm-5",
        "destination_id": "rameswaram",
        "name": "Ariyaman Beach (Kushi Beach)",
        "description": "Quiet emerald shore with calm waters, casuarina groves, windsurfing, and water scooter sports.",
        "category": "Beaches",
        "latitude": 9.3090,
        "longitude": 79.0350,
        "opening_time": "06:00 AM",
        "closing_time": "06:30 PM",
        "entry_fee": 20,
        "estimated_duration": "2.5 hours",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
        "is_indoor": False
    }
]

RESTAURANTS = [
    # Madurai (5)
    {
        "id": "rest-mdu-1",
        "destination_id": "madurai",
        "name": "Murugan Idli Shop",
        "cuisine": "Traditional South Indian Veg",
        "price_range": "₹150 - ₹300 per person",
        "latitude": 9.9181,
        "longitude": 78.1170,
        "rating": 4.8,
        "vegetarian": True,
        "speciality": "Steaming mallipoo idlis with 4 signature chutneys and gunpowder podi",
        "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "rest-mdu-2",
        "destination_id": "madurai",
        "name": "Kumar Mess",
        "cuisine": "Madurai Non-Veg Heritage",
        "price_range": "₹350 - ₹600 per person",
        "latitude": 9.9245,
        "longitude": 78.1250,
        "rating": 4.7,
        "vegetarian": False,
        "speciality": "Mutton Kari Dosa, Kola Urundai, and country chicken sukka",
        "image": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "rest-mdu-3",
        "destination_id": "madurai",
        "name": "Famous Jigarthanda (East Marret St)",
        "cuisine": "Desserts & Coolers",
        "price_range": "₹60 - ₹120 per person",
        "latitude": 9.9170,
        "longitude": 78.1230,
        "rating": 4.9,
        "vegetarian": True,
        "speciality": "Authentic Madurai Special Jigarthanda with badam pisin and nannari ice cream",
        "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "rest-mdu-4",
        "destination_id": "madurai",
        "name": "Sree Sabarees Restaurant",
        "cuisine": "Pure Vegetarian Thali",
        "price_range": "₹200 - ₹400 per person",
        "latitude": 9.9198,
        "longitude": 78.1155,
        "rating": 4.6,
        "vegetarian": True,
        "speciality": "Grand South Indian plantain leaf meals with payasam",
        "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "rest-mdu-5",
        "destination_id": "madurai",
        "name": "Amma Mess",
        "cuisine": "Authentic Chettinad & Tamil",
        "price_range": "₹300 - ₹550 per person",
        "latitude": 9.9320,
        "longitude": 78.1310,
        "rating": 4.6,
        "vegetarian": False,
        "speciality": "Meen Kuzhambu, Prawn Pepper Roast & Crab Omelette",
        "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
    },

    # Tirunelveli (5)
    {
        "id": "rest-tnv-1",
        "destination_id": "tirunelveli",
        "name": "Iruttukadai Halwa",
        "cuisine": "Traditional Sweetmeat Shop",
        "price_range": "₹100 - ₹250",
        "latitude": 8.7278,
        "longitude": 77.6890,
        "rating": 4.9,
        "vegetarian": True,
        "speciality": "Legendary warm wheat halwa made with clarified ghee and Tamirabarani river water",
        "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "rest-tnv-2",
        "destination_id": "tirunelveli",
        "name": "Nellai Saravana Bhavan",
        "cuisine": "Pure Veg South Indian",
        "price_range": "₹150 - ₹300 per person",
        "latitude": 8.7150,
        "longitude": 77.7500,
        "rating": 4.5,
        "vegetarian": True,
        "speciality": "Ghee Roast Dosa, Poori Masala and Filter Coffee",
        "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "rest-tnv-3",
        "destination_id": "tirunelveli",
        "name": "Hotel Bell Pins Restaurant",
        "cuisine": "Multi-Cuisine & Tamil Nadu Flavors",
        "price_range": "₹300 - ₹600 per person",
        "latitude": 8.7300,
        "longitude": 77.7200,
        "rating": 4.4,
        "vegetarian": False,
        "speciality": "Nellai Mutton Biryani, Nattukozhi soup & Parotta Salna",
        "image": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "rest-tnv-4",
        "destination_id": "tirunelveli",
        "name": "Janakiram Veg Restaurant",
        "cuisine": "South Indian Vegetarian",
        "price_range": "₹180 - ₹350 per person",
        "latitude": 8.7180,
        "longitude": 77.7380,
        "rating": 4.5,
        "vegetarian": True,
        "speciality": "Full executive plantain leaf lunch and variety dosas",
        "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "rest-tnv-5",
        "destination_id": "tirunelveli",
        "name": "Arasan Sweets & Bakery",
        "cuisine": "Sweets, Snacks & Savories",
        "price_range": "₹80 - ₹200",
        "latitude": 8.7210,
        "longitude": 77.7420,
        "rating": 4.4,
        "vegetarian": True,
        "speciality": "Cashew Halwa, Mixture, and crunchy seedai snacks",
        "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"
    },

    # Courtallam (5)
    {
        "id": "rest-crt-1",
        "destination_id": "courtallam",
        "name": "Border Rahmath Kadai (Shenkottai)",
        "cuisine": "Famous Border Parotta & Country Chicken",
        "price_range": "₹200 - ₹450 per person",
        "latitude": 8.9830,
        "longitude": 77.2480,
        "rating": 4.8,
        "vegetarian": False,
        "speciality": "Crispy coin parottas soaked in pepper salna with spicy Pepper Chicken roast",
        "image": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "rest-crt-2",
        "destination_id": "courtallam",
        "name": "Mount Courtallam Multi Cuisine",
        "cuisine": "Indian & Chinese",
        "price_range": "₹250 - ₹500 per person",
        "latitude": 8.9315,
        "longitude": 77.2710,
        "rating": 4.3,
        "vegetarian": False,
        "speciality": "Tandoori Platters, herbal mutton chukka, and fresh juices",
        "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "rest-crt-3",
        "destination_id": "courtallam",
        "name": "Five Falls Aruvi Veg Restaurant",
        "cuisine": "Pure Veg Snacks & Meals",
        "price_range": "₹120 - ₹250 per person",
        "latitude": 8.9200,
        "longitude": 77.2490,
        "rating": 4.2,
        "vegetarian": True,
        "speciality": "Piping hot banana bhajji, pepper tea, and curd rice after waterfall baths",
        "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "rest-crt-4",
        "destination_id": "courtallam",
        "name": "Tenkasi Sri Krishna Bhavan",
        "cuisine": "Traditional Veg",
        "price_range": "₹150 - ₹280 per person",
        "latitude": 8.9590,
        "longitude": 77.3150,
        "rating": 4.4,
        "vegetarian": True,
        "speciality": "Steaming Pongal, Vadai with coconut sambar",
        "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "rest-crt-5",
        "destination_id": "courtallam",
        "name": "Saaral Garden Mess",
        "cuisine": "Village Style Country Meals",
        "price_range": "₹200 - ₹380 per person",
        "latitude": 8.9330,
        "longitude": 77.2650,
        "rating": 4.4,
        "vegetarian": False,
        "speciality": "River fish fry, country chicken gravy, and rasam rice",
        "image": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80"
    },

    # Kanyakumari (5)
    {
        "id": "rest-kny-1",
        "destination_id": "kanyakumari",
        "name": "Sea View Restaurant",
        "cuisine": "Fresh Coastal Seafood & South Indian",
        "price_range": "₹350 - ₹700 per person",
        "latitude": 8.0820,
        "longitude": 77.5510,
        "rating": 4.6,
        "vegetarian": False,
        "speciality": "Fresh Kingfish Tawa Fry, Crab Masala & Malabar Parotta with ocean panoramic view",
        "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "rest-kny-2",
        "destination_id": "kanyakumari",
        "name": "Saravana Veg Restaurant (Beach Road)",
        "cuisine": "Pure Veg South Indian",
        "price_range": "₹150 - ₹300 per person",
        "latitude": 8.0810,
        "longitude": 77.5480,
        "rating": 4.5,
        "vegetarian": True,
        "speciality": "Crispy Rava Masala Dosa, Idli platter, and Filter Kaapi",
        "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "rest-kny-3",
        "destination_id": "kanyakumari",
        "name": "The Ocean Restaurant",
        "cuisine": "Coastal Indian & Continental",
        "price_range": "₹400 - ₹800 per person",
        "latitude": 8.0840,
        "longitude": 77.5460,
        "rating": 4.4,
        "vegetarian": False,
        "speciality": "Nadan Prawn Curry, Appam with stew, and grilled lobster",
        "image": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "rest-kny-4",
        "destination_id": "kanyakumari",
        "name": "Triveni Sangamam Tea & Refreshments",
        "cuisine": "Tea, Local Juices & Fried Snacks",
        "price_range": "₹40 - ₹120",
        "latitude": 8.0800,
        "longitude": 77.5490,
        "rating": 4.3,
        "vegetarian": True,
        "speciality": "Cardamom tea, Nendran banana crisps, and fresh tender coconut",
        "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "rest-kny-5",
        "destination_id": "kanyakumari",
        "name": "Archana Veg Restaurant",
        "cuisine": "North & South Indian Veg",
        "price_range": "₹200 - ₹400 per person",
        "latitude": 8.0835,
        "longitude": 77.5495,
        "rating": 4.4,
        "vegetarian": True,
        "speciality": "Paneer Butter Masala with Butter Naan & Curd Rice",
        "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
    },

    # Rameswaram (5)
    {
        "id": "rest-rsm-1",
        "destination_id": "rameswaram",
        "name": "Sri Saravana Pure Veg",
        "cuisine": "Traditional Brahmin & Tamil Veg",
        "price_range": "₹150 - ₹300 per person",
        "latitude": 9.2875,
        "longitude": 79.3160,
        "rating": 4.7,
        "vegetarian": True,
        "speciality": "Pure ghee masala dosa, rasam vadai, and authentic temple town tiffin",
        "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "rest-rsm-2",
        "destination_id": "rameswaram",
        "name": "Ashok Bhavan Restaurant",
        "cuisine": "South & North Indian Thali",
        "price_range": "₹180 - ₹350 per person",
        "latitude": 9.2890,
        "longitude": 79.3140,
        "rating": 4.5,
        "vegetarian": True,
        "speciality": "Unlimited vegetarian south meal with sweet pongal and appalam",
        "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "rest-rsm-3",
        "destination_id": "rameswaram",
        "name": "Daiwik Ahaan Restaurant",
        "cuisine": "Pilgrimage Friendly Gourmet Cuisine",
        "price_range": "₹400 - ₹800 per person",
        "latitude": 9.2940,
        "longitude": 79.2980,
        "rating": 4.6,
        "vegetarian": True,
        "speciality": "Satvik thali prepared without onion/garlic on request, Chettinad veg curry",
        "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "rest-rsm-4",
        "destination_id": "rameswaram",
        "name": "Sea Breeze Coastal Kitchen",
        "cuisine": "Fresh Island Seafood Catch",
        "price_range": "₹300 - ₹650 per person",
        "latitude": 9.2810,
        "longitude": 79.3190,
        "rating": 4.5,
        "vegetarian": False,
        "speciality": "Rameswaram Seer fish fry, Squid pepper roast, and crab masala",
        "image": "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
    },
    {
        "id": "rest-rsm-5",
        "destination_id": "rameswaram",
        "name": "Ram Nivas Coffee Bar",
        "cuisine": "Snacks & Filter Coffee",
        "price_range": "₹50 - ₹120",
        "latitude": 9.2885,
        "longitude": 79.3150,
        "rating": 4.6,
        "vegetarian": True,
        "speciality": "Frothy Kumbakonam style degree coffee with crispy medu vada",
        "image": "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"
    }
]

HOTELS = [
    # Madurai (3)
    {
        "id": "htl-mdu-1",
        "destination_id": "madurai",
        "name": "Heritage Madurai",
        "price_range": "₹6,000 - ₹11,000 / night",
        "latitude": 9.9325,
        "longitude": 78.0950,
        "rating": 4.8,
        "amenities": ["Geoffrey Bawa architecture", "Temple-replica swimming pool", "Spa", "Ayurvedic wellness", "Wi-Fi"],
        "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": "htl-mdu-2",
        "destination_id": "madurai",
        "name": "Courtyard by Marriott Madurai",
        "price_range": "₹4,500 - ₹7,500 / night",
        "latitude": 9.9350,
        "longitude": 78.1380,
        "rating": 4.6,
        "amenities": ["Fitness Centre", "All-day dining", "Business Lounge", "Airport Shuttle", "Free parking"],
        "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": "htl-mdu-3",
        "destination_id": "madurai",
        "name": "Hotel Supreme (Near Meenakshi Temple)",
        "price_range": "₹1,800 - ₹3,200 / night",
        "latitude": 9.9175,
        "longitude": 78.1150,
        "rating": 4.2,
        "amenities": ["Rooftop Temple View Restaurant", "24hr Room Service", "Family Suites", "Travel Desk"],
        "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=700&q=80"
    },

    # Tirunelveli (3)
    {
        "id": "htl-tnv-1",
        "destination_id": "tirunelveli",
        "name": "Hotel Apple Ttree",
        "price_range": "₹2,800 - ₹5,000 / night",
        "latitude": 8.7180,
        "longitude": 77.7490,
        "rating": 4.6,
        "amenities": ["Fine-dining banquet", "Wi-Fi", "Conference hall", "Valet parking", "Buffet breakfast"],
        "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": "htl-tnv-2",
        "destination_id": "tirunelveli",
        "name": "Hotel Sree Bharani",
        "price_range": "₹1,900 - ₹3,400 / night",
        "latitude": 8.7160,
        "longitude": 77.7440,
        "rating": 4.3,
        "amenities": ["Opposite Railway Station", "Pure veg restaurant", "Car rental", "AC Deluxe rooms"],
        "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": "htl-tnv-3",
        "destination_id": "tirunelveli",
        "name": "Regency Tirunelveli by GRT",
        "price_range": "₹3,500 - ₹6,000 / night",
        "latitude": 8.7290,
        "longitude": 77.7180,
        "rating": 4.7,
        "amenities": ["Luxury bar", "Multi-cuisine buffet", "Gym", "Concierge", "High speed Wi-Fi"],
        "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=700&q=80"
    },

    # Courtallam (3)
    {
        "id": "htl-crt-1",
        "destination_id": "courtallam",
        "name": "Courtallam Heritage Resort",
        "price_range": "₹3,200 - ₹5,500 / night",
        "latitude": 8.9280,
        "longitude": 77.2650,
        "rating": 4.5,
        "amenities": ["Surrounded by mango orchards", "Ayurvedic massage center", "Mountain view cottages", "Campfire"],
        "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": "htl-crt-2",
        "destination_id": "courtallam",
        "name": "Saaral Resort by Poppys",
        "price_range": "₹3,000 - ₹5,200 / night",
        "latitude": 8.9340,
        "longitude": 77.2730,
        "rating": 4.4,
        "amenities": ["Swimming pool", "Lawn games", "Spa facility", "Waterfall tour assistance", "Free Wi-Fi"],
        "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": "htl-crt-3",
        "destination_id": "courtallam",
        "name": "Green Valley Holiday Home",
        "price_range": "₹1,400 - ₹2,500 / night",
        "latitude": 8.9210,
        "longitude": 77.2510,
        "rating": 4.1,
        "amenities": ["Walkable to Five Falls", "Budget family dorms", "Hot water supply", "Local cook on demand"],
        "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=700&q=80"
    },

    # Kanyakumari (3)
    {
        "id": "htl-kny-1",
        "destination_id": "kanyakumari",
        "name": "Sparsa Resort Kanyakumari",
        "price_range": "₹5,500 - ₹9,500 / night",
        "latitude": 8.0860,
        "longitude": 77.5410,
        "rating": 4.7,
        "amenities": ["Eco-friendly luxury", "Ocean facing balconies", "Infinity pool", "Seafood kitchen", "Yoga deck"],
        "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": "htl-kny-2",
        "destination_id": "kanyakumari",
        "name": "Hotel Seaface Kanyakumari",
        "price_range": "₹2,600 - ₹4,800 / night",
        "latitude": 8.0815,
        "longitude": 77.5505,
        "rating": 4.5,
        "amenities": ["Direct sunrise view rooms", "Rooftop terrace", "Ferry pier adjacent", "Free Wi-Fi"],
        "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": "htl-kny-3",
        "destination_id": "kanyakumari",
        "name": "Hotel Tri Sea",
        "price_range": "₹1,800 - ₹3,200 / night",
        "latitude": 8.0830,
        "longitude": 77.5485,
        "rating": 4.2,
        "amenities": ["Rooftop swimming pool", "Triveni sea view", "Family friendly", "Lift facility"],
        "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=700&q=80"
    },

    # Rameswaram (3)
    {
        "id": "htl-rsm-1",
        "destination_id": "rameswaram",
        "name": "Daiwik Hotels Rameswaram",
        "price_range": "₹3,800 - ₹6,800 / night",
        "latitude": 9.2935,
        "longitude": 79.2975,
        "rating": 4.7,
        "amenities": ["Pilgrim concierge desk", "Theertham shower rituals", "Pure satvik dining", "Meditation room", "Spa"],
        "image": "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": "htl-rsm-2",
        "destination_id": "rameswaram",
        "name": "Hotel Rameswaram Grand",
        "price_range": "₹2,400 - ₹4,200 / night",
        "latitude": 9.2890,
        "longitude": 79.3080,
        "rating": 4.4,
        "amenities": ["Near railway station", "Multi-cuisine restaurant", "24-hour check-in", "Travel guidance"],
        "image": "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": "htl-rsm-3",
        "destination_id": "rameswaram",
        "name": "Jigisha Stay (Opposite Temple Gate)",
        "price_range": "₹1,300 - ₹2,400 / night",
        "latitude": 9.2870,
        "longitude": 79.3180,
        "rating": 4.1,
        "amenities": ["50 meters from East Gopuram", "Clean pilgrimage rooms", "Hot water geyser", "Luggage locker"],
        "image": "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=700&q=80"
    }
]

GUIDES = [
    # Madurai (2)
    {
        "id": "gd-mdu-1",
        "destination_id": "madurai",
        "name": "K. Pandian (Government Certified)",
        "location": "Meenakshi Temple East Gate, Madurai",
        "languages": ["Tamil", "English", "Hindi"],
        "speciality": "Pandya Architecture, Temple Iconography & Secret Corridors",
        "experience": "16 years",
        "price": "₹1,200 / half day",
        "rating": 4.9,
        "phone": "+91 94431 28941"
    },
    {
        "id": "gd-mdu-2",
        "destination_id": "madurai",
        "name": "Selvi Meenakshi",
        "location": "Thirumalai Palace Road, Madurai",
        "languages": ["Tamil", "English", "French"],
        "speciality": "Nayak Dynastic Heritage, Street Food Crawls & Sungudi Textiles",
        "experience": "9 years",
        "price": "₹1,500 / half day",
        "rating": 4.8,
        "phone": "+91 98942 51092"
    },

    # Tirunelveli (2)
    {
        "id": "gd-tnv-1",
        "destination_id": "tirunelveli",
        "name": "M. Arumugam",
        "location": "Nellaiappar Car Street, Tirunelveli",
        "languages": ["Tamil", "English"],
        "speciality": "Mani Mandapam Musical Acoustics & Tamirabarani Ecology",
        "experience": "12 years",
        "price": "₹1,000 / half day",
        "rating": 4.7,
        "phone": "+91 94862 33104"
    },
    {
        "id": "gd-tnv-2",
        "destination_id": "tirunelveli",
        "name": "R. Vignesh",
        "location": "Science Centre Road, Kokkirakulam",
        "languages": ["Tamil", "English", "Hindi"],
        "speciality": "Western Ghats Waterfall Treks & Krishnapuram Sculptures",
        "experience": "7 years",
        "price": "₹1,100 / half day",
        "rating": 4.8,
        "phone": "+91 97905 84219"
    },

    # Courtallam (2)
    {
        "id": "gd-crt-1",
        "destination_id": "courtallam",
        "name": "Subbiah Thevar",
        "location": "Main Falls Approach, Courtallam",
        "languages": ["Tamil", "Malayalam"],
        "speciality": "Western Ghats Herbal Forest Trails & Safe Hydrotherapy Spots",
        "experience": "20 years",
        "price": "₹800 / session",
        "rating": 4.9,
        "phone": "+91 94420 71830"
    },
    {
        "id": "gd-crt-2",
        "destination_id": "courtallam",
        "name": "Karthik Rajan",
        "location": "Five Falls Road, Courtallam",
        "languages": ["Tamil", "English"],
        "speciality": "Eco-park Flora, Bird Watching & Spice Plantation Tours",
        "experience": "6 years",
        "price": "₹1,000 / half day",
        "rating": 4.6,
        "phone": "+91 96291 40592"
    },

    # Kanyakumari (2)
    {
        "id": "gd-kny-1",
        "destination_id": "kanyakumari",
        "name": "Anthony Fernandez",
        "location": "Ferry Jetty Counter, Kanyakumari",
        "languages": ["Tamil", "English", "Malayalam", "Hindi"],
        "speciality": "Swami Vivekananda History, Ocean Confluence & Triveni Legends",
        "experience": "14 years",
        "price": "₹1,200 / half day",
        "rating": 4.8,
        "phone": "+91 98433 11847"
    },
    {
        "id": "gd-kny-2",
        "destination_id": "kanyakumari",
        "name": "Geetha Kumari",
        "location": "Padmanabhapuram Fort, Thuckalay",
        "languages": ["Tamil", "English", "Malayalam"],
        "speciality": "Travancore Royal Architecture, Woodcraft & Heritage Murals",
        "experience": "11 years",
        "price": "₹1,300 / half day",
        "rating": 4.9,
        "phone": "+91 94438 60233"
    },

    # Rameswaram (2)
    {
        "id": "gd-rsm-1",
        "destination_id": "rameswaram",
        "name": "R. Swaminathan Sastrigal",
        "location": "Agni Theertham, Rameswaram",
        "languages": ["Tamil", "English", "Hindi", "Telugu", "Sanskrit"],
        "speciality": "22 Theertham Sacred Snana Rituals, Corridor History & Ramayana Epic",
        "experience": "18 years",
        "price": "₹1,500 / tour",
        "rating": 4.9,
        "phone": "+91 94432 99014"
    },
    {
        "id": "gd-rsm-2",
        "destination_id": "rameswaram",
        "name": "Captain Murugesan",
        "location": "Dhanushkodi Checkpost, Rameswaram",
        "languages": ["Tamil", "English"],
        "speciality": "1964 Cyclone Ruins, Ghost Town Expedition & Ram Setu Geological Points",
        "experience": "15 years",
        "price": "₹1,400 / expedition",
        "rating": 4.9,
        "phone": "+91 97871 42095"
    }
]

EXPERIENCES = [
    # Madurai (2)
    {
        "id": "exp-mdu-1",
        "destination_id": "madurai",
        "name": "Night Food Safari & Jigarthanda Workshop",
        "location": "East Masi Street & Simmakkal, Madurai",
        "category": "Food",
        "description": "Guided nocturnal culinary walk sampling fluffy bun parotta, kari dosa, and learning the secrets of authentic Jigarthanda churning.",
        "duration": "2.5 hours",
        "price": "₹650 per person",
        "provider": "Madurai Culinary Walkers Guild",
        "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": "exp-mdu-2",
        "destination_id": "madurai",
        "name": "Saurashtrian Sungudi Saree Block-Printing",
        "location": "Kaikatti Thoppu, Madurai",
        "category": "Culture",
        "description": "Hands-on tie-and-dye weaving demonstration by 4th-generation traditional craftsmen, taking home your self-dyed cotton scarf.",
        "duration": "2 hours",
        "price": "₹500 per person",
        "provider": "Heritage Sungudi Artisans Trust",
        "image": "https://images.unsplash.com/photo-1609137144822-263a8a97c413?auto=format&fit=crop&w=700&q=80"
    },

    # Tirunelveli (2)
    {
        "id": "exp-tnv-1",
        "destination_id": "tirunelveli",
        "name": "Iruttukadai Copper Cauldron Halwa Making",
        "location": "Nellaiappar Car Street, Tirunelveli",
        "category": "Food",
        "description": "Exclusive morning glimpse into the age-old wheat fermenting, milk extraction, and continuous wood-fired copper stirring.",
        "duration": "1.5 hours",
        "price": "₹400 per person",
        "provider": "Nellai Heritage Treats",
        "image": "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": "exp-tnv-2",
        "destination_id": "tirunelveli",
        "name": "Tamirabarani Riverboat & Temple Ghat Sunrise",
        "location": "Sulochana Mudaliar Bridge, Tirunelveli",
        "category": "Nature",
        "description": "Serene dawn boat row along the holy Tamirabarani river spotting kingfishers and watching traditional morning temple chants.",
        "duration": "2 hours",
        "price": "₹550 per person",
        "provider": "Tamirabarani Eco Explorers",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=700&q=80"
    },

    # Courtallam (2)
    {
        "id": "exp-crt-1",
        "destination_id": "courtallam",
        "name": "Herbal Bath & Forest Aromatherapy Trek",
        "location": "Shenbaga Devi Trail, Courtallam",
        "category": "Nature",
        "description": "Guided rainforest walk identifying Western Ghats medicinal trees followed by an invigorating natural hydrotherapy splash.",
        "duration": "3 hours",
        "price": "₹750 per person",
        "provider": "Western Ghats Bio-Tourism Circle",
        "image": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": "exp-crt-2",
        "destination_id": "courtallam",
        "name": "Border Salna Masterclass & Dinner",
        "location": "Shenkottai Border, Courtallam",
        "category": "Food",
        "description": "Interactive open-air cooking class on creating the legendary spiced Border Parotta salna and tasting fresh pepper chicken.",
        "duration": "2 hours",
        "price": "₹600 per person",
        "provider": "Shenkottai Parotta Guild",
        "image": "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=700&q=80"
    },

    # Kanyakumari (2)
    {
        "id": "exp-kny-1",
        "destination_id": "kanyakumari",
        "name": "Triveni Sangamam Sunset Catamaran Cruise",
        "location": "Kovalam Beach Pier, Kanyakumari",
        "category": "Beaches",
        "description": "Sail where the three oceans meet as the orange sun dips behind the horizon and the full moon rises over Vivekananda Rock.",
        "duration": "2 hours",
        "price": "₹900 per person",
        "provider": "Land's End Fishermen Cooperative",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": "exp-kny-2",
        "destination_id": "kanyakumari",
        "name": "Seashell Craft Carving Workshop",
        "location": "Sannathi Street, Kanyakumari",
        "category": "Culture",
        "description": "Carve your personal name or monogram onto an iridescent conch shell using traditional lapidary wheel engraving.",
        "duration": "1.5 hours",
        "price": "₹350 per person",
        "provider": "Triveni Artisan Guild",
        "image": "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=700&q=80"
    },

    # Rameswaram (2)
    {
        "id": "exp-rsm-1",
        "destination_id": "rameswaram",
        "name": "4x4 Dhanushkodi Sand Dune & Ghost Town Safari",
        "location": "Mukundarayar Chathiram, Rameswaram",
        "category": "Heritage",
        "description": "Off-road ride across shifting beach sands exploring the submerged church ruins, railway station, and Arichal Munai tip.",
        "duration": "3 hours",
        "price": "₹850 per person",
        "provider": "Dhanushkodi Desert Safari Group",
        "image": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80"
    },
    {
        "id": "exp-rsm-2",
        "destination_id": "rameswaram",
        "name": "Pamban Sea Bridge Catamaran & Glass-Bottom Reef Tour",
        "location": "Mandapam Marine Park, Rameswaram",
        "category": "Nature",
        "description": "Glide under the engineering marvel of Pamban bridge and gaze through glass hulls at corals and sea cows in the Gulf of Mannar.",
        "duration": "2.5 hours",
        "price": "₹950 per person",
        "provider": "Gulf of Mannar Biosphere Tours",
        "image": "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=700&q=80"
    }
]

TRANSPORTS = [
    {
        "id": "tr-1",
        "name": "TNSTC Air Conditioned Inter-City Express",
        "type": "Bus",
        "coverage": "Madurai - Tirunelveli - Kanyakumari Highway Corridor",
        "fare_estimate": "₹150 - ₹350",
        "contact": "1800-419-4287"
    },
    {
        "id": "tr-2",
        "name": "South TN Prepaid Tourist Taxi Association",
        "type": "Cab / Innova",
        "coverage": "Full South Tamil Nadu Circuit (Madurai / Courtallam / Rameswaram)",
        "fare_estimate": "₹14 / km",
        "contact": "+91 94422 18700"
    },
    {
        "id": "tr-3",
        "name": "Madurai Auto-Rickshaw Union (Meter Guided)",
        "type": "Auto Rickshaw",
        "coverage": "Madurai Temple Area & Heritage Monuments",
        "fare_estimate": "₹50 - ₹200 within city",
        "contact": "+91 98940 33211"
    },
    {
        "id": "tr-4",
        "name": "Pamban Island Electric Shuttle Service",
        "type": "Electric Bus",
        "coverage": "Rameswaram Temple to Dhanushkodi / Agni Theertham",
        "fare_estimate": "₹30 per trip",
        "contact": "+91 94431 82000"
    }
]
