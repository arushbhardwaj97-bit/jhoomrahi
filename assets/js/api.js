/**
 * JhoomRahi — Mock API Layer & Backend Architecture Specification
 * @file api.js
 * @description Provides an asynchronous client abstraction layer over local mock data
 * and client-side persistence, fully architected for drop-in migration to production
 * REST/GraphQL endpoints without requiring any changes to UI view layer code.
 *
 * ============================================================================
 * BACKEND HANDOFF: LOCALSTORAGE PERSISTENCE REGISTRY
 * ============================================================================
 * | Storage Key                     | Data Type   | Default Value       | Description & Architectural Payload Schema                                                                                             |
 * |---------------------------------|-------------|---------------------|----------------------------------------------------------------------------------------------------------------------------------------|
 * | `isLoggedIn`                    | string      | "true"              | Mock authentication status ("true" | "false"). Route guards redirect unauthenticated visits to login.html.                              |
 * | `jhoomrahi_theme`               | string      | "light"             | User active theme preference ("light" | "dark"). Synchronized with documentElement .dark class.                                               |
 * | `jhoomrahi_saved_pgs`           | string[]    | ["pg-blr-01"]       | JSON array of PG / Flat listing IDs bookmarked by the user for comparison.                                                            |
 * | `jhoomrahi_joined_trips`         | string[]    | ["trip-spiti-01"]   | JSON array of Travel Squad IDs user has joined. Controls "In Squad ✓" state and roster participation.                                  |
 * | `jhoomrahi_chats`                | object[]    | [...] (Seed CHATS)  | Complete conversational threads array: `{ id, name, avatar, lastMessage, time, unread, online, messages: [...] }`.                     |
 * | `jhoomrahi_communities`          | object[]    | [...] (Seed COMMS)  | Community hubs with membership state, member counts, and feed post array: `{ id, name, isJoined, members, posts: [...] }`.            |
 * | `jhoomrahi_user_listings`       | object[]    | []                  | User-posted PG listings created via stay/post.html multi-step form. Merged automatically into getPGs().                               |
 * | `jhoomrahi_user_roommates`      | object[]    | []                  | User roommate matching requests. Merged dynamically into getRoommates().                                                              |
 * | `jhoomrahi_user_trips`          | object[]    | []                  | User-created travel group plans posted via travel/post.html. Merged into getTrips().                                                   |
 * | `jhoomrahi_user_votes`          | object      | {}                  | Spot rating dictionary in Discover: `{ [placeId]: "up" | "down" }`. Overlays dynamic voting delta on discover cards.                  |
 * | `jhoomrahi_pg_inquiries`        | object[]    | []                  | User inquiries sent to landlords/hosts: `[{ listingId, listingTitle, name, phone, moveInDate, notes, timestamp }]`.                    |
 * | `jhoomrahi_quiz_answers`        | object      | null                | 12-question roommate compatibility quiz preferences: `{ sleep, clean, social, cooking, budget, city, targetAreas }`.                  |
 * | `jhoomrahi_connection_requests` | string[]    | []                  | Candidate IDs user has connected with via the roommate quiz matcher.                                                                  |
 * | `jhoomrahi_streak_days`         | number      | 3                   | Consecutive daily login counter. Increments daily and unlocks tiered JhoomCoin rewards.                                                |
 * | `jhoomrahi_coin_balance`        | number      | 120                 | Platform loyalty coins balance. Redeemable for zero-deposit fees and roadtrip gear discounts.                                           |
 * ============================================================================
 */

const USE_MOCK = true;
const MOCK_LATENCY_MS = 60; // Simulates snappy local response

/**
 * Simulates network request latency before resolving provided mock payload.
 *
 * @template T
 * @function mockFetch
 * @param {T} data - Data to resolve
 * @param {number} [latency=MOCK_LATENCY_MS] - Milliseconds delay
 * @returns {Promise<T>} Resolves with payload data
 */
function mockFetch(data, latency = MOCK_LATENCY_MS) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, latency);
  });
}

/* ========================================================================= */
/* 1. PLATFORM METRICS & TESTIMONIALS (LANDING PAGE)                         */
/* ========================================================================= */

/**
 * BACKEND REST ENDPOINT SPECIFICATION:
 * Method:  GET
 * Route:   /api/v1/stats
 * Headers: None required (Public endpoint)
 *
 * Success Response (200 OK):
 * [
 *   {
 *     "target": 48000,
 *     "prefix": "",
 *     "suffix": "+",
 *     "label": "Verified Members",
 *     "subtext": "Active flatmates & co-travelers"
 *   },
 *   ...
 * ]
 *
 * @async
 * @function getStats
 * @returns {Promise<Array<{target: number, prefix: string, suffix: string, label: string, subtext: string}>>} Platform macro statistics
 */
async function getStats() {
  if (USE_MOCK) {
    return mockFetch(STATS);
  }
  const res = await fetch("/api/v1/stats");
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

/**
 * BACKEND REST ENDPOINT SPECIFICATION:
 * Method:  GET
 * Route:   /api/v1/testimonials
 * Headers: None required (Public endpoint)
 *
 * Success Response (200 OK):
 * [
 *   {
 *     "quote": "Koramangala shift hone ke 3 din me flatmate mil gaya...",
 *     "name": "Rohan Deshmukh",
 *     "role": "SDE-1, Swiggy",
 *     "city": "Bengaluru",
 *     "avatar": "https://ui-avatars.com/api/?name=Rohan+Deshmukh&background=6366f1&color=fff"
 *   },
 *   ...
 * ]
 *
 * @async
 * @function getTestimonials
 * @returns {Promise<Array<{quote: string, name: string, role: string, city: string, avatar: string}>>} Community member reviews
 */
async function getTestimonials() {
  if (USE_MOCK) {
    return mockFetch(TESTIMONIALS);
  }
  const res = await fetch("/api/v1/testimonials");
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

/**
 * BACKEND REST ENDPOINT SPECIFICATION:
 * Method:  GET
 * Route:   /api/v1/stay/featured
 * Headers: None required
 *
 * Success Response (200 OK):
 * [
 *   {
 *     "id": "pg-blr-01",
 *     "title": "Greenwood Co-Living Single Suite",
 *     "area": "HSR Layout, Sector 2",
 *     "city": "Bengaluru",
 *     "rent": "₹14,500/mo",
 *     "deposit": "1 Month",
 *     "verified": true,
 *     "match": 96,
 *     "rating": 4.8,
 *     "amenities": ["Geyser 24h", "RO Water", "300Mbps Wi-Fi"],
 *     "img": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600"
 *   }
 * ]
 *
 * @async
 * @function getFeaturedPGs
 * @returns {Promise<Array>} List of featured PG accommodations
 */
async function getFeaturedPGs() {
  if (USE_MOCK) {
    return mockFetch(FEATURED_PGS);
  }
  const res = await fetch("/api/v1/stay/featured");
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

/**
 * BACKEND REST ENDPOINT SPECIFICATION:
 * Method:  GET
 * Route:   /api/v1/travel/upcoming
 * Headers: None required
 *
 * Success Response (200 OK):
 * [
 *   {
 *     "id": "trip-spiti-01",
 *     "dest": "Spiti Valley Winter Roadtrip",
 *     "from": "Delhi",
 *     "to": "Kaza & Tabo",
 *     "dates": "Nov 14 - Nov 20",
 *     "going": 4,
 *     "maxSlots": 6,
 *     "budget": "₹14,000",
 *     "host": "Arjun Mehta"
 *   }
 * ]
 *
 * @async
 * @function getUpcomingTrips
 * @returns {Promise<Array>} Upcoming weekend getaways and roadtrips
 */
async function getUpcomingTrips() {
  if (USE_MOCK) {
    return mockFetch(UPCOMING_TRIPS);
  }
  const res = await fetch("/api/v1/travel/upcoming");
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

/**
 * BACKEND REST ENDPOINT SPECIFICATION:
 * Method:  GET
 * Route:   /api/v1/discover/trending
 * Headers: None required
 *
 * @async
 * @function getTrendingPlaces
 * @returns {Promise<Array>} Trending spots across food, fun, and work hubs
 */
async function getTrendingPlaces() {
  if (USE_MOCK) {
    return mockFetch(TRENDING_PLACES);
  }
  const res = await fetch("/api/v1/discover/trending");
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

/* ========================================================================= */
/* 2. STAY & ROOMMATE APIS (PHASE 2)                                         */
/* ========================================================================= */

/**
 * BACKEND REST ENDPOINT SPECIFICATION:
 * Method:  GET
 * Route:   /api/v1/stay/listings
 * Query Parameters:
 *   - city: string (e.g. "Bengaluru" | "All")
 *   - gender: string ("all" | "male" | "female" | "unisex")
 *   - maxRent: number (e.g. 15000)
 *   - type: string ("PG / Co-Living" | "Shared Flat" | "1BHK Studio")
 *   - search: string (Free-text search)
 *   - page: number (Default: 1)
 *   - limit: number (Default: 20)
 *
 * Success Response (200 OK):
 * {
 *   "success": true,
 *   "total": 42,
 *   "page": 1,
 *   "data": [
 *     {
 *       "id": "pg-blr-hsr-01",
 *       "title": "Greenwood Co-Living Single Suite",
 *       "area": "HSR Layout, Sector 2",
 *       "city": "Bengaluru",
 *       "rent": 14500,
 *       "deposit": "1 Month",
 *       "gender": "male",
 *       "type": "PG / Co-Living",
 *       "verified": true,
 *       "amenities": ["Wi-Fi", "AC", "Power Backup", "Geyser"]
 *     }
 *   ]
 * }
 *
 * @async
 * @function getPGs
 * @param {Object} [filters={}] - Query filters
 * @param {string} [filters.city] - Target city
 * @param {string} [filters.gender] - "all" | "male" | "female" | "unisex"
 * @param {number} [filters.maxRent] - Maximum budget in INR
 * @param {string} [filters.type] - Listing accommodation category
 * @param {string} [filters.search] - Substring query
 * @returns {Promise<Array>} Matching PG and Flat listings
 */
async function getPGs(filters = {}) {
  if (USE_MOCK) {
    let customListings = [];
    try {
      const stored = localStorage.getItem("jhoomrahi_user_listings");
      if (stored) {
        customListings = JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Could not parse jhoomrahi_user_listings from localStorage", e);
    }

    let allListings = [...customListings, ...(typeof PGS !== "undefined" ? PGS : [])];

    if (filters.city && filters.city !== "All" && filters.city !== "all") {
      allListings = allListings.filter(
        item => item.city && item.city.toLowerCase() === filters.city.toLowerCase()
      );
    }

    if (filters.gender && filters.gender !== "all") {
      allListings = allListings.filter(
        item => item.gender === filters.gender || item.gender === "unisex"
      );
    }

    if (filters.maxRent && !isNaN(filters.maxRent)) {
      allListings = allListings.filter(
        item => (item.rent || 0) <= Number(filters.maxRent)
      );
    }

    if (filters.type && filters.type !== "all") {
      allListings = allListings.filter(
        item => item.type && item.type.toLowerCase().includes(filters.type.toLowerCase())
      );
    }

    if (filters.search && filters.search.trim()) {
      const query = filters.search.toLowerCase().trim();
      allListings = allListings.filter(item =>
        (item.title && item.title.toLowerCase().includes(query)) ||
        (item.area && item.area.toLowerCase().includes(query)) ||
        (item.city && item.city.toLowerCase().includes(query)) ||
        (item.amenities && item.amenities.some(a => a.toLowerCase().includes(query)))
      );
    }

    return mockFetch(allListings);
  }

  const queryParams = new URLSearchParams(filters).toString();
  const res = await fetch(`/api/v1/stay/listings?${queryParams}`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

/**
 * BACKEND REST ENDPOINT SPECIFICATION:
 * Method:  GET
 * Route:   /api/v1/stay/roommates
 * Query Parameters:
 *   - gender: string ("all" | "male" | "female" | "co-ed")
 *   - city: string ("all" | "Bengaluru" | "Delhi" | "Pune")
 *   - maxBudget: number
 *   - search: string
 *
 * Success Response (200 OK):
 * [
 *   {
 *     "id": "rm-01",
 *     "name": "Aarav Sharma",
 *     "age": 23,
 *     "gender": "male",
 *     "role": "Frontend Dev @ Razorpay",
 *     "city": "Bengaluru",
 *     "budget": 15000,
 *     "matchScore": 96,
 *     "verified": true,
 *     "lifestyle": { "sleep": "Night Owl", "cleanliness": "High", "cooking": "Yes" }
 *   }
 * ]
 *
 * @async
 * @function getRoommates
 * @param {string} [gender="all"] - Target gender tab
 * @param {Object} [filters={}] - Additional query options
 * @returns {Promise<Array>} List of roommate candidate profiles
 */
async function getRoommates(gender = "all", filters = {}) {
  if (USE_MOCK) {
    let allRoommates = [...(typeof ROOMMATES !== "undefined" ? ROOMMATES : [])];

    try {
      const customRoommates = localStorage.getItem("jhoomrahi_user_roommates");
      if (customRoommates) {
        allRoommates = [...JSON.parse(customRoommates), ...allRoommates];
      }
    } catch (e) {
      console.warn("Could not read jhoomrahi_user_roommates from localStorage", e);
    }

    if (gender && gender !== "all") {
      allRoommates = allRoommates.filter(r => {
        if (gender === "co-ed") {
          return r.gender === "co-ed" || r.seeking === "co-ed";
        }
        return r.gender === gender;
      });
    }

    if (filters.city && filters.city !== "All" && filters.city !== "all") {
      allRoommates = allRoommates.filter(
        r => r.city && r.city.toLowerCase() === filters.city.toLowerCase()
      );
    }

    if (filters.maxBudget && !isNaN(filters.maxBudget)) {
      allRoommates = allRoommates.filter(
        r => (r.budget || 0) <= Number(filters.maxBudget)
      );
    }

    if (filters.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      allRoommates = allRoommates.filter(r =>
        (r.name && r.name.toLowerCase().includes(q)) ||
        (r.role && r.role.toLowerCase().includes(q)) ||
        (r.city && r.city.toLowerCase().includes(q)) ||
        (r.targetAreas && r.targetAreas.some(area => area.toLowerCase().includes(q))) ||
        (r.bio && r.bio.toLowerCase().includes(q))
      );
    }

    return mockFetch(allRoommates);
  }

  const res = await fetch(`/api/v1/stay/roommates?gender=${gender}`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

/**
 * BACKEND REST ENDPOINT SPECIFICATION:
 * Method:  GET
 * Route:   /api/v1/stay/listings/:id
 *
 * @async
 * @function getPGById
 * @param {string} id - Unique listing ID (e.g. "pg-blr-hsr-01")
 * @returns {Promise<Object|null>} Listing details object or null
 */
async function getPGById(id) {
  if (!id) return mockFetch(null);

  if (USE_MOCK) {
    try {
      const stored = localStorage.getItem("jhoomrahi_user_listings");
      if (stored) {
        const custom = JSON.parse(stored);
        const match = custom.find(item => item.id === id);
        if (match) return mockFetch(match);
      }
    } catch (e) {
      console.warn("Error reading custom listings", e);
    }

    const listing = (typeof PGS !== "undefined" ? PGS : []).find(p => p.id === id) || null;
    return mockFetch(listing);
  }

  const res = await fetch(`/api/v1/stay/listings/${id}`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

/* ========================================================================= */
/* 3. TRAVEL SQUADS & CALENDAR APIS (PHASE 3)                                */
/* ========================================================================= */

/**
 * BACKEND REST ENDPOINT SPECIFICATION:
 * Method:  GET
 * Route:   /api/v1/travel/trips
 * Query Parameters:
 *   - originCity: string ("Bengaluru" | "New Delhi" | "Pune" | "all")
 *   - vibe: string ("roadtrip" | "trek" | "beach" | "culture" | "all")
 *   - maxBudget: number
 *   - month: string ("YYYY-MM")
 *   - date: string ("YYYY-MM-DD")
 *   - search: string
 *
 * Success Response (200 OK):
 * [
 *   {
 *     "id": "trip-spiti-01",
 *     "title": "Spiti Valley Winter Roadtrip",
 *     "originCity": "New Delhi",
 *     "destination": "Spiti Valley, HP",
 *     "startDate": "2026-11-14T06:00:00Z",
 *     "endDate": "2026-11-20T20:00:00Z",
 *     "budget": 14000,
 *     "slots": { "total": 6, "remaining": 2 },
 *     "squad": [
 *       { "name": "Arjun Mehta", "avatar": "...", "role": "Host" }
 *     ]
 *   }
 * ]
 *
 * @async
 * @function getTrips
 * @param {Object} [filters={}] - Trip filter options
 * @returns {Promise<Array>} List of travel squads
 */
async function getTrips(filters = {}) {
  if (USE_MOCK) {
    let customTrips = [];
    try {
      const stored = localStorage.getItem("jhoomrahi_user_trips");
      if (stored) {
        customTrips = JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Could not read jhoomrahi_user_trips from localStorage", e);
    }

    let allTrips = [...customTrips, ...(typeof TRIPS !== "undefined" ? TRIPS : [])];

    if (filters.originCity && filters.originCity !== "all" && filters.originCity !== "All") {
      allTrips = allTrips.filter(
        t => t.originCity && t.originCity.toLowerCase() === filters.originCity.toLowerCase()
      );
    }

    if (filters.vibe && filters.vibe !== "all") {
      allTrips = allTrips.filter(
        t => (t.vibeCategory && t.vibeCategory.toLowerCase() === filters.vibe.toLowerCase()) ||
             (t.vibe && t.vibe.toLowerCase().includes(filters.vibe.toLowerCase()))
      );
    }

    if (filters.maxBudget && !isNaN(filters.maxBudget)) {
      allTrips = allTrips.filter(t => (t.budget || 0) <= Number(filters.maxBudget));
    }

    if (filters.month) {
      allTrips = allTrips.filter(t => t.startDate && t.startDate.startsWith(filters.month));
    }

    if (filters.date) {
      allTrips = allTrips.filter(t => {
        const startDay = t.startDate.split("T")[0];
        const endDay = t.endDate.split("T")[0];
        return filters.date >= startDay && filters.date <= endDay;
      });
    }

    if (filters.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      allTrips = allTrips.filter(t =>
        (t.title && t.title.toLowerCase().includes(q)) ||
        (t.destination && t.destination.toLowerCase().includes(q)) ||
        (t.originCity && t.originCity.toLowerCase().includes(q)) ||
        (t.vibe && t.vibe.toLowerCase().includes(q)) ||
        (t.host && t.host.name && t.host.name.toLowerCase().includes(q))
      );
    }

    return mockFetch(allTrips);
  }

  const queryParams = new URLSearchParams(filters).toString();
  const res = await fetch(`/api/v1/travel/trips?${queryParams}`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

/**
 * BACKEND REST ENDPOINT SPECIFICATION:
 * Method:  GET
 * Route:   /api/v1/travel/trips/:id
 *
 * @async
 * @function getTripById
 * @param {string} id - Unique Trip ID (e.g. "trip-spiti-01")
 * @returns {Promise<Object|null>} Trip details object or null
 */
async function getTripById(id) {
  if (!id) return mockFetch(null);

  if (USE_MOCK) {
    try {
      const custom = JSON.parse(localStorage.getItem("jhoomrahi_user_trips") || "[]");
      const found = custom.find(t => t.id === id);
      if (found) return mockFetch(found);
    } catch (e) {
      console.warn("Error reading custom trips", e);
    }

    const trip = (typeof TRIPS !== "undefined" ? TRIPS : []).find(t => t.id === id) || null;
    return mockFetch(trip);
  }

  const res = await fetch(`/api/v1/travel/trips/${id}`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

/* ========================================================================= */
/* 4. DISCOVER VERTICAL APIS & USER VOTES (PHASE 4)                          */
/* ========================================================================= */

/**
 * Overlays client upvote/downvote delta from localStorage onto a spot model.
 *
 * @function applyStoredVotes
 * @param {Object} place - Spot entity
 * @returns {Object} Hydrated spot with current user vote state
 */
function applyStoredVotes(place) {
  if (!place) return null;
  const clone = { ...place };
  try {
    const storedVotes = JSON.parse(localStorage.getItem("jhoomrahi_user_votes") || "{}");
    const vote = storedVotes[clone.id];
    if (vote === "up") {
      clone.userVote = "up";
      clone.upvotes = (clone.upvotes || 0) + 1;
    } else if (vote === "down") {
      clone.userVote = "down";
      clone.downvotes = (clone.downvotes || 0) + 1;
    } else {
      clone.userVote = null;
    }
  } catch (err) {
    console.warn("Could not parse user votes from localStorage", err);
  }
  return clone;
}

/**
 * BACKEND REST ENDPOINT SPECIFICATION:
 * Method:  GET
 * Route:   /api/v1/discover/places
 * Query Parameters:
 *   - category: string ("all" | "food" | "places" | "fun")
 *   - city: string ("all" | "Bengaluru" | "Delhi" | "Pune" | "Jaipur")
 *   - priceLevel: number (1 | 2 | 3)
 *   - tag: string (e.g. "#LateNight", "#WiFiSpot")
 *   - search: string
 *
 * @async
 * @function getPlaces
 * @param {string} [category="all"] - Target category
 * @param {string} [city="all"] - Target city
 * @param {Object} [filters={}] - Filter criteria
 * @returns {Promise<Array>} Ranked places with community vote counts
 */
async function getPlaces(category = "all", city = "all", filters = {}) {
  if (USE_MOCK) {
    if (typeof PLACES === "undefined") {
      console.error("PLACES array not loaded in data.js");
      return mockFetch([]);
    }

    let results = PLACES.map(p => applyStoredVotes(p));

    if (category && category !== "all" && category !== "All") {
      results = results.filter(p => p.category && p.category.toLowerCase() === category.toLowerCase());
    }

    if (city && city !== "all" && city !== "All") {
      results = results.filter(p => p.city && p.city.toLowerCase() === city.toLowerCase());
    }

    if (filters.priceLevel && filters.priceLevel !== "all") {
      results = results.filter(p => p.priceLevel === Number(filters.priceLevel));
    }

    if (filters.tag && filters.tag !== "all") {
      results = results.filter(p => p.tags && p.tags.some(t => t.toLowerCase() === filters.tag.toLowerCase()));
    }

    if (filters.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      results = results.filter(p =>
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.area && p.area.toLowerCase().includes(q)) ||
        (p.city && p.city.toLowerCase().includes(q)) ||
        (p.tagline && p.tagline.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    return mockFetch(results);
  }

  const queryParams = new URLSearchParams({ category, city, ...filters }).toString();
  const res = await fetch(`/api/v1/discover/places?${queryParams}`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

/**
 * BACKEND REST ENDPOINT SPECIFICATION:
 * Method:  GET
 * Route:   /api/v1/discover/places/:id
 *
 * @async
 * @function getPlaceById
 * @param {string} id - Place ID (e.g. "place-food-blr-01")
 * @returns {Promise<Object|null>} Spot details or null
 */
async function getPlaceById(id) {
  if (!id) return mockFetch(null);

  if (USE_MOCK) {
    if (typeof PLACES === "undefined") return mockFetch(null);
    const found = PLACES.find(p => p.id === id);
    if (!found) return mockFetch(null);
    return mockFetch(applyStoredVotes(found));
  }

  const res = await fetch(`/api/v1/discover/places/${id}`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

/* ========================================================================= */
/* 5. MESSAGING, CHAT & COMMUNITIES (PHASE 5 & 6)                            */
/* ========================================================================= */

/**
 * Retrieves persisted chats or falls back to seed data.
 *
 * @function getStoredChats
 * @returns {Array} List of chat conversations
 */
function getStoredChats() {
  try {
    const raw = localStorage.getItem("jhoomrahi_chats");
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("Error reading jhoomrahi_chats from localStorage", err);
  }
  return typeof CHATS !== "undefined" ? JSON.parse(JSON.stringify(CHATS)) : [];
}

/**
 * Persists updated chats array to localStorage.
 *
 * @function setStoredChats
 * @param {Array} chatsList - Array of conversations
 * @returns {void}
 */
function setStoredChats(chatsList) {
  try {
    localStorage.setItem("jhoomrahi_chats", JSON.stringify(chatsList));
  } catch (err) {
    console.warn("Error saving jhoomrahi_chats to localStorage", err);
  }
}

/**
 * BACKEND REST ENDPOINT SPECIFICATION:
 * Method:  GET
 * Route:   /api/v1/chats
 * Headers: Authorization: Bearer <jwt>
 *
 * Success Response (200 OK):
 * [
 *   {
 *     "id": "chat-01",
 *     "name": "Aarav Sharma",
 *     "avatar": "...",
 *     "lastMessage": "Hey! When can you visit the HSR flat?",
 *     "time": "10:30 AM",
 *     "unread": 0,
 *     "online": true
 *   }
 * ]
 *
 * @async
 * @function getChats
 * @returns {Promise<Array>} List of chat conversation threads
 */
async function getChats() {
  if (USE_MOCK) {
    const chats = getStoredChats();
    return mockFetch(chats);
  }
  const res = await fetch("/api/v1/chats");
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

/**
 * BACKEND REST ENDPOINT SPECIFICATION:
 * Method:  GET
 * Route:   /api/v1/chats/:id
 * Headers: Authorization: Bearer <jwt>
 *
 * @async
 * @function getChatById
 * @param {string} id - Conversation ID (e.g. "chat-01")
 * @returns {Promise<Object|null>} Conversation entity or null
 */
async function getChatById(id) {
  if (!id) return mockFetch(null);

  if (USE_MOCK) {
    const chats = getStoredChats();
    const found = chats.find(c => c.id === id);
    return mockFetch(found || null);
  }
  const res = await fetch(`/api/v1/chats/${id}`);
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

/**
 * BACKEND REST ENDPOINT SPECIFICATION:
 * Method:  POST
 * Route:   /api/v1/chats/:chatId/messages
 * Headers:
 *   - Authorization: Bearer <jwt>
 *   - Content-Type: application/json
 *
 * Request Body Schema:
 * {
 *   "id": "msg-123",
 *   "sender": "me",
 *   "text": "Sounds good! I will be there at 5 PM.",
 *   "time": "4:15 PM",
 *   "gif": null,
 *   "isPiiBlocked": false
 * }
 *
 * Success Response (201 Created):
 * {
 *   "success": true,
 *   "messageId": "msg-123",
 *   "timestamp": "2026-11-13T16:45:00Z"
 * }
 *
 * @async
 * @function sendChatMessage
 * @param {string} chatId - Target chat thread ID
 * @param {Object} messageObj - Message model
 * @returns {Promise<Object>} Updated conversation object
 */
async function sendChatMessage(chatId, messageObj) {
  if (USE_MOCK) {
    const chats = getStoredChats();
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      if (!chat.messages) chat.messages = [];
      chat.messages.push(messageObj);
      if (!messageObj.isPiiBlocked) {
        chat.lastMessage = messageObj.text;
      }
      chat.time = messageObj.time || "Just now";
      setStoredChats(chats);
      return mockFetch(chat);
    }
    return mockFetch(null);
  }
  const res = await fetch(`/api/v1/chats/${chatId}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(messageObj)
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

/**
 * Retrieves persisted communities or falls back to seed data.
 *
 * @function getStoredCommunities
 * @returns {Array} List of communities
 */
function getStoredCommunities() {
  try {
    const raw = localStorage.getItem("jhoomrahi_communities");
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn("Error reading jhoomrahi_communities from localStorage", err);
  }
  return typeof COMMUNITIES !== "undefined" ? JSON.parse(JSON.stringify(COMMUNITIES)) : [];
}

/**
 * Persists updated communities array to localStorage.
 *
 * @function setStoredCommunities
 * @param {Array} commList - Array of communities
 * @returns {void}
 */
function setStoredCommunities(commList) {
  try {
    localStorage.setItem("jhoomrahi_communities", JSON.stringify(commList));
  } catch (err) {
    console.warn("Error saving jhoomrahi_communities to localStorage", err);
  }
}

/**
 * BACKEND REST ENDPOINT SPECIFICATION:
 * Method:  GET
 * Route:   /api/v1/communities
 * Headers: None required
 *
 * @async
 * @function getCommunities
 * @returns {Promise<Array>} List of communities with feeds
 */
async function getCommunities() {
  if (USE_MOCK) {
    const comms = getStoredCommunities();
    return mockFetch(comms);
  }
  const res = await fetch("/api/v1/communities");
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

/**
 * BACKEND REST ENDPOINT SPECIFICATION:
 * Method:  POST
 * Route:   /api/v1/communities/:communityId/toggle-join
 * Headers: Authorization: Bearer <jwt>
 *
 * @async
 * @function toggleCommunityJoin
 * @param {string} communityId - ID of community
 * @returns {Promise<Object>} Updated community object with new membership count
 */
async function toggleCommunityJoin(communityId) {
  if (USE_MOCK) {
    const comms = getStoredCommunities();
    const target = comms.find(c => c.id === communityId);
    if (target) {
      target.isJoined = !target.isJoined;
      target.members = target.isJoined ? target.members + 1 : Math.max(0, target.members - 1);
      target.membersDisplay = `${(target.members / 1000).toFixed(1)}k members`;
      setStoredCommunities(comms);
      return mockFetch(target);
    }
    return mockFetch(null);
  }
  const res = await fetch(`/api/v1/communities/${communityId}/toggle-join`, { method: "POST" });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}

/**
 * BACKEND REST ENDPOINT SPECIFICATION:
 * Method:  POST
 * Route:   /api/v1/communities/:communityId/posts
 * Headers:
 *   - Authorization: Bearer <jwt>
 *   - Content-Type: application/json
 *
 * Request Body Schema:
 * {
 *   "id": "post-xyz",
 *   "author": { "name": "Rohan Deshmukh", "role": "SDE-1 @ Swiggy", "avatar": "..." },
 *   "content": "Hosting open-source session this weekend!",
 *   "tags": ["#Meetup", "#Devs"]
 * }
 *
 * @async
 * @function createCommunityPost
 * @param {string} communityId - Community ID
 * @param {Object} postObj - Feed post entity
 * @returns {Promise<Object>} Created post
 */
async function createCommunityPost(communityId, postObj) {
  if (USE_MOCK) {
    const comms = getStoredCommunities();
    const target = comms.find(c => c.id === communityId);
    if (target) {
      if (!target.posts) target.posts = [];
      target.posts.unshift(postObj);
      setStoredCommunities(comms);
      return mockFetch(postObj);
    }
    return mockFetch(null);
  }
  const res = await fetch(`/api/v1/communities/${communityId}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postObj)
  });
  if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
  return res.json();
}
