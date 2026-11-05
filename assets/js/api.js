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
