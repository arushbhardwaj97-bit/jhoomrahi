/**
 * JhoomRahi — Mock API Layer
 * Phase 1 Foundation
 * 
 * Provides an asynchronous abstraction layer over static mock data.
 * Ready for future seamless migration to REST/GraphQL endpoints without UI refactoring.
 */

const USE_MOCK = true;
const MOCK_LATENCY_MS = 60; // Simulates snappy local response

/**
 * Helper utility to simulate network latency with resolution
 * @template T
 * @param {T} data - Data to resolve
 * @param {number} [latency=MOCK_LATENCY_MS] - Milliseconds to delay
 * @returns {Promise<T>}
 */
function mockFetch(data, latency = MOCK_LATENCY_MS) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, latency);
  });
}

/**
 * Fetches platform macro statistics for landing counter section
 * @returns {Promise<Array<{target: number, prefix: string, suffix: string, label: string, subtext: string}>>}
 */
async function getStats() {
  if (USE_MOCK) {
    return mockFetch(STATS);
  }
  // Production fallback placeholder
  const res = await fetch("/api/v1/stats");
  return res.json();
}

/**
 * Fetches community testimonials across students and young professionals
 * @returns {Promise<Array<{quote: string, name: string, role: string, city: string, avatar: string}>>}
 */
async function getTestimonials() {
  if (USE_MOCK) {
    return mockFetch(TESTIMONIALS);
  }
  const res = await fetch("/api/v1/testimonials");
  return res.json();
}

/**
 * Fetches featured PG and Flat listings for the Stay vertical
 * @returns {Promise<Array<{id: string, title: string, area: string, city: string, rent: string, deposit: string, verified: boolean, match: number, rating: number, amenities: string[], note: string, img: string}>>}
 */
async function getFeaturedPGs() {
  if (USE_MOCK) {
    return mockFetch(FEATURED_PGS);
  }
  const res = await fetch("/api/v1/stay/featured");
  return res.json();
}

/**
 * Fetches upcoming travel partner groups and weekend roadtrips
 * @returns {Promise<Array<{id: string, dest: string, from: string, to: string, dates: string, daysLeft: string, going: number, maxSlots: number, budget: string, host: string, hostRole: string, tags: string[], img: string}>>}
 */
async function getUpcomingTrips() {
  if (USE_MOCK) {
    return mockFetch(UPCOMING_TRIPS);
  }
  const res = await fetch("/api/v1/travel/upcoming");
  return res.json();
}

/**
 * Fetches top rated and curated food, work, and community spots
 * @returns {Promise<Array<{id: string, name: string, category: string, city: string, area: string, ratingPct: number, priceRange: string, highlight: string, badge: string, img: string}>>}
 */
async function getTrendingPlaces() {
  if (USE_MOCK) {
    return mockFetch(TRENDING_PLACES);
  }
  const res = await fetch("/api/v1/discover/trending");
  return res.json();
}


/* === 8. STAY & ROOMMATE API CALLS (PHASE 2 - APPENDED) === */

/**
 * Fetches PG and Flat listings with filter criteria
 * Automatically merges user-created listings from localStorage
 * @param {Object} [filters={}] - Optional query filters
 * @param {string} [filters.city] - Target city ("All" or specific city)
 * @param {string} [filters.gender] - "all" | "male" | "female" | "unisex"
 * @param {number} [filters.maxRent] - Maximum budget in INR
 * @param {string} [filters.type] - "all" | "PG / Co-Living" | "Shared Flat" | "1BHK Studio" | "Student PG"
 * @param {string} [filters.search] - Substring search across title, area, amenities
 * @returns {Promise<Array>} List of matching PG listings
 */
async function getPGs(filters = {}) {
  if (USE_MOCK) {
    // Check for user-generated listings in localStorage
    let customListings = [];
    try {
      const stored = localStorage.getItem("jhoomrahi_user_listings");
      if (stored) {
        customListings = JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Could not parse jhoomrahi_user_listings from localStorage", e);
    }

    let allListings = [...customListings, ...PGS];

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
        item => item.rent <= Number(filters.maxRent)
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

  // Fallback to REST endpoint
  const queryParams = new URLSearchParams(filters).toString();
  const res = await fetch(`/api/v1/stay/listings?${queryParams}`);
  return res.json();
}

/**
 * Fetches roommate profiles filtered by gender tab, city, and lifestyle criteria
 * @param {string} [gender="all"] - "all" | "male" | "female" | "co-ed"
 * @param {Object} [filters={}] - Additional filters (city, maxBudget, search)
 * @returns {Promise<Array>} List of roommate candidates
 */
async function getRoommates(gender = "all", filters = {}) {
  if (USE_MOCK) {
    let allRoommates = [...ROOMMATES];

    // Check for user-generated roommate requests in localStorage
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
        r => r.budget <= Number(filters.maxBudget)
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
  return res.json();
}

/**
 * Fetches a single PG listing by unique ID
 * @param {string} id - e.g. "pg-blr-hsr-01"
 * @returns {Promise<Object|null>} PG Listing object or null
 */
async function getPGById(id) {
  if (!id) return mockFetch(null);

  if (USE_MOCK) {
    // Check in user-created listings first
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

    const listing = PGS.find(p => p.id === id) || null;
    return mockFetch(listing);
  }

  const res = await fetch(`/api/v1/stay/listings/${id}`);
  return res.json();
}


/* === 9. TRAVEL VERTICAL API CALLS (PHASE 3 - APPENDED) === */

/**
 * Fetches upcoming travel squads with city, vibe, and date filtering
 * Automatically merges user-created trip plans from localStorage
 * @param {Object} [filters={}] - Query filters
 * @param {string} [filters.originCity] - e.g. "Bengaluru", "New Delhi", "Pune", "all"
 * @param {string} [filters.vibe] - "all" | "roadtrip" | "trek" | "beach" | "culture"
 * @param {number} [filters.maxBudget] - Max budget in INR
 * @param {string} [filters.month] - "YYYY-MM" (e.g. "2026-11", "2026-12")
 * @param {string} [filters.search] - Search keyword
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

    let allTrips = [...customTrips, ...TRIPS];

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
      allTrips = allTrips.filter(t => t.budget <= Number(filters.maxBudget));
    }

    if (filters.month) {
      allTrips = allTrips.filter(t => t.startDate && t.startDate.startsWith(filters.month));
    }

    if (filters.date) {
      // Check if a given date string "YYYY-MM-DD" falls within trip's start & end dates
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
  return res.json();
}

/**
 * Fetches single trip by unique ID
 * @param {string} id - e.g. "trip-spiti-01"
 * @returns {Promise<Object|null>} Trip object or null
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

    const trip = TRIPS.find(t => t.id === id) || null;
    return mockFetch(trip);
  }

  const res = await fetch(`/api/v1/travel/trips/${id}`);
  return res.json();
}
