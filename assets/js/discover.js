/**
 * JhoomRahi — Discover Vertical Controller (Phase 4)
 * 
 * Manages:
 * 1. Ranking formula calculation:
 *    score = (ratingPct * 0.4) + (recency * 0.2) + (popularity * 0.2) + (user_match * 0.2)
 * 2. Dynamic SVG Percentage Score Rings with animated counter
 * 3. Top 5 "🔥 Top Rated" badge attribution
 * 4. Interactive Upvote (👍) / Downvote (👎) tap interactions with pop animation & live score updates
 * 5. LocalStorage persistence for user votes
 * 6. Multi-criteria filtering (city pills, price brackets, tags, search queries)
 * 7. Single Place Detail view with interactive photo gallery & "Why it's #1" reasons
 */

// Global State for Discover Vertical
const DiscoverState = {
  activeCategory: "all", // "all" | "food" | "places" | "fun"
  activeCity: "all",
  activePrice: "all",
  activeTag: "all",
  searchQuery: "",
  sortBy: "rank", // "rank" | "rating" | "popular" | "recent"
  places: [],
  userVotes: {},
  activeDetailPlace: null
};

/**
 * Initializes and synchronizes user votes from localStorage
 */
function initStoredVotes() {
  try {
    const stored = localStorage.getItem("jhoomrahi_user_votes");
    if (stored) {
      DiscoverState.userVotes = JSON.parse(stored);
    } else {
      DiscoverState.userVotes = {};
    }
  } catch (e) {
    console.warn("Could not load user votes from localStorage", e);
    DiscoverState.userVotes = {};
  }
}

/**
 * Saves user votes to localStorage
 */
function saveStoredVotes() {
  try {
    localStorage.setItem("jhoomrahi_user_votes", JSON.stringify(DiscoverState.userVotes));
  } catch (e) {
    console.warn("Could not save user votes to localStorage", e);
  }
}

/**
 * Calculates ranking score using the exact formula:
 * score = (ratingPct * 0.4) + (recency * 0.2) + (popularity * 0.2) + (user_match * 0.2)
 * 
 * @param {Object} place
 * @returns {number} Score bounded between 1 and 100
 */
function calculatePlaceScore(place) {
  if (!place) return 0;

  // 1. Calculate live ratingPct considering baseline + community upvotes/downvotes
  const up = (place.upvotes || 0);
  const down = (place.downvotes || 0);
  const totalVotes = up + down;

  let calculatedRating = place.ratingPct || 90;
  if (totalVotes > 0) {
    const voteRatioPct = (up / totalVotes) * 100;
    // Blend base rating with community ratio for stable, realistic scoring
    calculatedRating = Math.round((place.ratingPct * 0.4) + (voteRatioPct * 0.6));
  }
  calculatedRating = Math.max(1, Math.min(100, calculatedRating));

  // 2. Normalized recency score (decay with days elapsed)
  const days = Math.max(0, place.recencyDays || 1);
  const recencyScore = Math.max(10, Math.min(100, 100 - (days * 3)));

  // 3. Normalized popularity score
  const popularityScore = Math.max(10, Math.min(100, place.popularity || 85));

  // 4. Personalized / Student match score
  const matchScore = Math.max(10, Math.min(100, place.userMatchPct || 90));

  // Formula application
  const compositeScore = (calculatedRating * 0.4) + 
                         (recencyScore * 0.2) + 
                         (popularityScore * 0.2) + 
                         (matchScore * 0.2);

  return Math.min(100, Math.max(1, Math.round(compositeScore)));
}

/**
 * Generates an SVG circular progress ring
 * @param {number} score - Percentage score (1 - 100)
 * @param {number} [size=64] - Outer dimension in pixels
 * @param {number} [stroke=5.5] - Border stroke width
 * @returns {string} SVG HTML string
 */
function renderScoreRing(score, size = 64, stroke = 5.5) {
  const radius = (size - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const validScore = Math.max(1, Math.min(100, score));
  const offset = circumference - (validScore / 100) * circumference;

  let strokeColor = "#6366f1"; // Indigo default
  let strokeBg = "rgba(99, 102, 241, 0.15)";
  let textColor = "text-indigo-600 dark:text-indigo-400";

  if (validScore >= 95) {
    strokeColor = "#10b981"; // Emerald
    strokeBg = "rgba(16, 185, 129, 0.18)";
    textColor = "text-emerald-600 dark:text-emerald-400";
  } else if (validScore >= 90) {
    strokeColor = "#6366f1"; // Primary indigo
    strokeBg = "rgba(99, 102, 241, 0.15)";
    textColor = "text-indigo-600 dark:text-indigo-400";
  } else {
    strokeColor = "#f59e0b"; // Amber
    strokeBg = "rgba(245, 158, 11, 0.18)";
    textColor = "text-amber-600 dark:text-amber-400";
  }

  return `
    <div class="relative flex items-center justify-center flex-shrink-0" style="width: ${size}px; height: ${size}px;">
      <svg class="transform -rotate-90" width="${size}" height="${size}">
        <circle
          cx="${size / 2}"
          cy="${size / 2}"
          r="${radius}"
          stroke="${strokeBg}"
          stroke-width="${stroke}"
          fill="transparent"
        />
        <circle
          class="transition-all duration-700 ease-out"
          cx="${size / 2}"
          cy="${size / 2}"
          r="${radius}"
          stroke="${strokeColor}"
          stroke-width="${stroke}"
          stroke-dasharray="${circumference}"
          stroke-dashoffset="${offset}"
          stroke-linecap="round"
          fill="transparent"
        />
      </svg>
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <span class="font-heading font-bold text-sm sm:text-base leading-none tracking-tight ${textColor}">${validScore}%</span>
        <span class="text-[9px] font-medium text-slate-400 leading-none mt-0.5">SCORE</span>
      </div>
    </div>
  `;
}

/**
 * Handles Live Upvote / Downvote tap interactions
 * @param {string} placeId - Target place ID
 * @param {"up" | "down"} voteType - "up" or "down"
 * @param {Event} [event] - Click event
 */
function handlePlaceVote(placeId, voteType, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  initStoredVotes();
  const currentVote = DiscoverState.userVotes[placeId] || null;

  // Find place in memory
  let place = DiscoverState.places.find(p => p.id === placeId);
  if (!place && DiscoverState.activeDetailPlace && DiscoverState.activeDetailPlace.id === placeId) {
    place = DiscoverState.activeDetailPlace;
  }
  if (!place) return;

  // Toggle or switch vote
  if (currentVote === voteType) {
    // Undo vote
    delete DiscoverState.userVotes[placeId];
    if (voteType === "up") place.upvotes = Math.max(0, (place.upvotes || 1) - 1);
    if (voteType === "down") place.downvotes = Math.max(0, (place.downvotes || 1) - 1);
    place.userVote = null;
    if (typeof showToast === "function") {
      showToast("Vote removed", "info");
    }
  } else {
    // Switch or cast new vote
    if (currentVote === "up") place.upvotes = Math.max(0, (place.upvotes || 1) - 1);
    if (currentVote === "down") place.downvotes = Math.max(0, (place.downvotes || 1) - 1);

    if (voteType === "up") {
      place.upvotes = (place.upvotes || 0) + 1;
      DiscoverState.userVotes[placeId] = "up";
      place.userVote = "up";
      if (typeof showToast === "function") {
        showToast("Upvoted! Score recalculated live 👍", "success");
      }
    } else {
      place.downvotes = (place.downvotes || 0) + 1;
      DiscoverState.userVotes[placeId] = "down";
      place.userVote = "down";
      if (typeof showToast === "function") {
        showToast("Downvoted! Score updated 👎", "warning");
      }
    }
  }

  saveStoredVotes();

  // Trigger bounce / pop animation on clicked button
  if (event && event.currentTarget) {
    const btn = event.currentTarget;
    btn.classList.add("animate-pop");
    setTimeout(() => {
      btn.classList.remove("animate-pop");
    }, 280);
  }

  // Recalculate score and refresh UI components
  place.score = calculatePlaceScore(place);

  // If on detail page, update detail components
  if (document.getElementById("discover-detail-container")) {
    updateDetailViewRatings(place);
  }

  // If on list page, update card ratings or re-render
  updateCardRatingDisplay(place, voteType);
}

/**
 * Updates DOM score ring and vote counters on a specific card without full redraw
 */
function updateCardRatingDisplay(place, voteType) {
  const listContainer = document.getElementById("discover-list-container");
  if (listContainer) {
    if (DiscoverState.sortBy === "rank") {
      DiscoverState.places.sort((a, b) => b.score - a.score);
    }
    renderRankedCards(DiscoverState.places);

    if (voteType) {
      const activeBtn = document.querySelector(`[data-vote-${voteType}="${place.id}"]`);
      if (activeBtn) {
        activeBtn.classList.add("animate-pop");
        setTimeout(() => activeBtn.classList.remove("animate-pop"), 280);
      }
    }
    return;
  }

  // Fallback for single card element
  const card = document.getElementById(`place-card-${place.id}`);
  if (!card) return;

  // Update Score Ring
  const ringContainer = card.querySelector(`[data-score-ring-container="${place.id}"]`);
  if (ringContainer) {
    ringContainer.innerHTML = renderScoreRing(place.score);
  }

  // Update Upvote button
  const upBtn = card.querySelector(`[data-vote-up="${place.id}"]`);
  if (upBtn) {
    const upCountEl = upBtn.querySelector(".vote-count");
    if (upCountEl) upCountEl.textContent = place.upvotes;
    if (place.userVote === "up") {
      upBtn.className = "vote-btn-active-up px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-700 transition-all";
    } else {
      upBtn.className = "vote-btn px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all";
    }
  }

  // Update Downvote button
  const downBtn = card.querySelector(`[data-vote-down="${place.id}"]`);
  if (downBtn) {
    const downCountEl = downBtn.querySelector(".vote-count");
    if (downCountEl) downCountEl.textContent = place.downvotes;
    if (place.userVote === "down") {
      downBtn.className = "vote-btn-active-down px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-300 dark:border-rose-700 transition-all";
    } else {
      downBtn.className = "vote-btn px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all";
    }
  }
}

/**
 * Updates DOM ratings specifically for the single Place Detail view
 */
function updateDetailViewRatings(place) {
  const detailRing = document.getElementById("detail-score-ring");
  if (detailRing) {
    detailRing.innerHTML = renderScoreRing(place.score, 88, 7.5);
  }

  const upBtn = document.getElementById("detail-vote-up");
  if (upBtn) {
    const countEl = upBtn.querySelector(".vote-count");
    if (countEl) countEl.textContent = place.upvotes;
    if (place.userVote === "up") {
      upBtn.className = "btn px-4 py-2.5 rounded-2xl font-bold flex items-center gap-2 bg-emerald-600 text-white shadow-md transition-all scale-105";
    } else {
      upBtn.className = "btn btn-ghost px-4 py-2.5 rounded-2xl font-medium flex items-center gap-2 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:text-emerald-600";
    }
  }

  const downBtn = document.getElementById("detail-vote-down");
  if (downBtn) {
    const countEl = downBtn.querySelector(".vote-count");
    if (countEl) countEl.textContent = place.downvotes;
    if (place.userVote === "down") {
      downBtn.className = "btn px-4 py-2.5 rounded-2xl font-bold flex items-center gap-2 bg-rose-600 text-white shadow-md transition-all scale-105";
    } else {
      downBtn.className = "btn btn-ghost px-4 py-2.5 rounded-2xl font-medium flex items-center gap-2 border border-slate-200 dark:border-slate-800 hover:border-rose-500 hover:text-rose-600";
    }
  }

  const votesCountEl = document.getElementById("detail-total-votes-count");
  if (votesCountEl) {
    votesCountEl.textContent = `${(place.upvotes + place.downvotes).toLocaleString("en-IN")} student votes recorded`;
  }
}

// =========================================================================
// 1. RANKED LIST CONTROLLER (food.html, places.html, fun.html)
// =========================================================================

/**
 * Main initialization for ranked vertical list pages
 * @param {"food" | "places" | "fun"} category 
 */
async function initDiscoverList(category) {
  DiscoverState.activeCategory = category;
  initStoredVotes();

  setupListFilterListeners();
  await loadAndRenderRankedPlaces();
}

/**
 * Fetches places, calculates scores, ranks them, and renders cards
 */
async function loadAndRenderRankedPlaces() {
  const container = document.getElementById("discover-list-container");
  if (!container) return;

  // Show shimmering skeleton loading state
  container.innerHTML = `
    <div class="col-span-full space-y-4">
      <div class="card p-6 skeleton h-44"></div>
      <div class="card p-6 skeleton h-44"></div>
      <div class="card p-6 skeleton h-44"></div>
    </div>
  `;

  try {
    let places = await getPlaces(DiscoverState.activeCategory, DiscoverState.activeCity, {
      priceLevel: DiscoverState.activePrice,
      tag: DiscoverState.activeTag,
      search: DiscoverState.searchQuery
    });

    // Compute composite ranking score for each place
    places.forEach(p => {
      p.score = calculatePlaceScore(p);
    });

    // Apply Sorting
    if (DiscoverState.sortBy === "rank") {
      places.sort((a, b) => b.score - a.score);
    } else if (DiscoverState.sortBy === "rating") {
      places.sort((a, b) => b.ratingPct - a.ratingPct);
    } else if (DiscoverState.sortBy === "popular") {
      places.sort((a, b) => b.popularity - a.popularity);
    } else if (DiscoverState.sortBy === "recent") {
      places.sort((a, b) => (a.recencyDays || 0) - (b.recencyDays || 0));
    }

    DiscoverState.places = places;
    renderRankedCards(places);
  } catch (err) {
    console.error("Failed to load ranked places", err);
    container.innerHTML = `
      <div class="col-span-full text-center py-12">
        <p class="text-rose-500 font-semibold">Unable to load places right now.</p>
        <button onclick="loadAndRenderRankedPlaces()" class="btn btn-primary mt-4 text-xs">Try Again</button>
      </div>
    `;
  }
}

/**
 * Renders ranked cards into container
 * @param {Array} places
 */
function renderRankedCards(places) {
  const container = document.getElementById("discover-list-container");
  const countEl = document.getElementById("discover-results-count");
  if (!container) return;

  if (countEl) {
    const catLabel = DiscoverState.activeCategory === "food" ? "food spots" :
                     DiscoverState.activeCategory === "places" ? "attractions & spots" : "fun activities";
    const cityLabel = DiscoverState.activeCity === "all" ? "across India" : `in ${DiscoverState.activeCity}`;
    countEl.textContent = `Showing ${places.length} ranked ${catLabel} ${cityLabel}`;
  }

  if (places.length === 0) {
    container.innerHTML = `
      <div class="col-span-full card p-12 text-center space-y-4">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center">
          <i data-lucide="map-pin-off" class="w-7 h-7"></i>
        </div>
        <h3 class="font-heading font-bold text-xl text-slate-900 dark:text-white">No matching places found</h3>
        <p class="text-slate-500 text-sm max-w-md mx-auto">
          Try switching to "All Cities", clearing filters, or searching for broader terms like "chai", "dosa", or "park".
        </p>
        <button onclick="resetDiscoverFilters()" class="btn btn-ghost text-xs py-2 px-4 rounded-xl">
          Reset All Filters
        </button>
      </div>
    `;
    if (typeof lucide !== "undefined" && lucide.createIcons) lucide.createIcons();
    return;
  }

  let html = "";
  places.forEach((place, index) => {
    const rank = index + 1;
    const isTopFive = rank <= 5;

    // Rank styling
    let rankBadgeClass = "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700";
    if (rank === 1) {
      rankBadgeClass = "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-md border-amber-300";
    } else if (rank === 2) {
      rankBadgeClass = "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white font-bold border-slate-300";
    } else if (rank === 3) {
      rankBadgeClass = "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold border-amber-200";
    }

    const upActiveClass = place.userVote === "up" 
      ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700 font-bold" 
      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium";

    const downActiveClass = place.userVote === "down" 
      ? "bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-700 font-bold" 
      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 font-medium";

    html += `
      <article id="place-card-${place.id}" class="card p-5 sm:p-6 transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-600 flex flex-col justify-between">
        
        <div>
          <!-- Top Row: Rank Badge, Top Rated Badge & Score Ring -->
          <div class="flex items-center justify-between gap-3 mb-4">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="inline-flex items-center justify-center w-8 h-8 rounded-xl text-xs ${rankBadgeClass} border">
                #${rank}
              </span>
              ${isTopFive ? `
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 animate-pulse">
                  <span>🔥 Top Rated</span>
                </span>
              ` : ""}
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900">
                ${place.city}
              </span>
            </div>

            <!-- Interactive Circular SVG Score Ring -->
            <div data-score-ring-container="${place.id}">
              ${renderScoreRing(place.score)}
            </div>
          </div>

          <!-- Main Content: Image & Information -->
          <div class="flex flex-col sm:flex-row gap-4 mb-4">
            <a href="detail.html?id=${place.id}" class="sm:w-36 h-28 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 relative group block">
              <img 
                src="${place.img}" 
                alt="${place.name}" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onerror="this.src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800'"
              />
              <span class="absolute bottom-2 left-2 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-950/80 text-white backdrop-blur-sm">
                ${place.priceRange}
              </span>
            </a>

            <div class="flex-1 min-w-0">
              <h3 class="font-heading font-bold text-lg text-slate-900 dark:text-white leading-snug hover:text-indigo-600 transition-colors">
                <a href="detail.html?id=${place.id}">
                  ${place.name}
                </a>
              </h3>
              
              <p class="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                <i data-lucide="map-pin" class="w-3.5 h-3.5 text-rose-500 flex-shrink-0"></i>
                <span class="truncate">${place.area}</span>
              </p>

              <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                ${place.tagline || place.description}
              </p>
            </div>
          </div>

          <!-- Tags Pills -->
          <div class="flex flex-wrap gap-1.5 mb-5">
            ${(place.tags || []).slice(0, 4).map(tag => `
              <span class="px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60">
                ${tag}
              </span>
            `).join("")}
          </div>
        </div>

        <!-- Footer / Tap Interactions Bar -->
        <div class="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
          
          <!-- Rating Tap System (👍 / 👎) with pop effect -->
          <div class="flex items-center gap-2">
            <button 
              type="button" 
              data-vote-up="${place.id}"
              onclick="handlePlaceVote('${place.id}', 'up', event)"
              class="px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 cursor-pointer active:scale-95 transition-all ${upActiveClass}"
              title="Upvote this spot">
              <span class="text-sm">👍</span>
              <span class="vote-count">${place.upvotes || 0}</span>
            </button>

            <button 
              type="button" 
              data-vote-down="${place.id}"
              onclick="handlePlaceVote('${place.id}', 'down', event)"
              class="px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 cursor-pointer active:scale-95 transition-all ${downActiveClass}"
              title="Downvote this spot">
              <span class="text-sm">👎</span>
              <span class="vote-count">${place.downvotes || 0}</span>
            </button>
          </div>

          <!-- View Details CTA -->
          <a 
            href="detail.html?id=${place.id}" 
            class="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline py-1">
            <span>View Details</span>
            <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
          </a>

        </div>

      </article>
    `;
  });

  container.innerHTML = html;
  if (typeof lucide !== "undefined" && lucide.createIcons) lucide.createIcons();
}

/**
 * Binds list filter controls (city pills, price, tags, search, sort)
 */
function setupListFilterListeners() {
  // 1. City Pills Filter
  document.querySelectorAll("[data-city-filter]").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("[data-city-filter]").forEach(c => {
        c.classList.remove("bg-indigo-600", "text-white", "shadow-sm");
        c.classList.add("bg-white", "dark:bg-slate-900", "text-slate-600", "dark:text-slate-300");
      });
      chip.classList.remove("bg-white", "dark:bg-slate-900", "text-slate-600", "dark:text-slate-300");
      chip.classList.add("bg-indigo-600", "text-white", "shadow-sm");

      DiscoverState.activeCity = chip.getAttribute("data-city-filter");
      loadAndRenderRankedPlaces();
    });
  });

  // 2. Price Brackets
  document.querySelectorAll("[data-price-filter]").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("[data-price-filter]").forEach(c => {
        c.classList.remove("bg-lime-400", "text-slate-950", "font-bold");
        c.classList.add("bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-400");
      });
      chip.classList.remove("bg-slate-100", "dark:bg-slate-800", "text-slate-600", "dark:text-slate-400");
      chip.classList.add("bg-lime-400", "text-slate-950", "font-bold");

      DiscoverState.activePrice = chip.getAttribute("data-price-filter");
      loadAndRenderRankedPlaces();
    });
  });

  // 3. Search Query Input (debounced)
  const searchInput = document.getElementById("discover-search-input");
  if (searchInput) {
    let timer = null;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        DiscoverState.searchQuery = e.target.value.trim();
        loadAndRenderRankedPlaces();
      }, 250);
    });
  }

  // 4. Sort Dropdown
  const sortSelect = document.getElementById("discover-sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      DiscoverState.sortBy = e.target.value;
      loadAndRenderRankedPlaces();
    });
  }
}

/**
 * Resets all Discover filters back to default
 */
function resetDiscoverFilters() {
  DiscoverState.activeCity = "all";
  DiscoverState.activePrice = "all";
  DiscoverState.activeTag = "all";
  DiscoverState.searchQuery = "";
  DiscoverState.sortBy = "rank";

  const searchInput = document.getElementById("discover-search-input");
  if (searchInput) searchInput.value = "";

  const sortSelect = document.getElementById("discover-sort-select");
  if (sortSelect) sortSelect.value = "rank";

  // Reset visual pill states
  document.querySelectorAll("[data-city-filter]").forEach(c => {
    if (c.getAttribute("data-city-filter") === "all") {
      c.classList.add("bg-indigo-600", "text-white");
    } else {
      c.classList.remove("bg-indigo-600", "text-white");
      c.classList.add("bg-white", "dark:bg-slate-900");
    }
  });

  document.querySelectorAll("[data-price-filter]").forEach(c => {
    if (c.getAttribute("data-price-filter") === "all") {
      c.classList.add("bg-lime-400", "text-slate-950", "font-bold");
    } else {
      c.classList.remove("bg-lime-400", "text-slate-950", "font-bold");
    }
  });

  loadAndRenderRankedPlaces();
}

// =========================================================================
// 2. CITY LANDING PAGE CONTROLLER (discover/city.html)
// =========================================================================

/**
 * Initializes discover/city.html
 */
async function initDiscoverCity() {
  initStoredVotes();
  setupCityLandingFilters();
  await loadAndRenderCityHighlights();
}

/**
 * Sets up city switcher pills on city.html
 */
function setupCityLandingFilters() {
  document.querySelectorAll("[data-landing-city]").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("[data-landing-city]").forEach(c => {
        c.classList.remove("bg-indigo-600", "text-white", "shadow-sm");
        c.classList.add("bg-white", "dark:bg-slate-900", "text-slate-600", "dark:text-slate-300");
      });
      chip.classList.remove("bg-white", "dark:bg-slate-900", "text-slate-600", "dark:text-slate-300");
      chip.classList.add("bg-indigo-600", "text-white", "shadow-sm");

      DiscoverState.activeCity = chip.getAttribute("data-landing-city");
      loadAndRenderCityHighlights();
    });
  });
}

/**
 * Loads category spot counts and top 3 featured spots for city.html
 */
async function loadAndRenderCityHighlights() {
  const container = document.getElementById("city-featured-spots-grid");
  const foodCountEl = document.getElementById("count-food");
  const placesCountEl = document.getElementById("count-places");
  const funCountEl = document.getElementById("count-fun");

  try {
    const allCityPlaces = await getPlaces("all", DiscoverState.activeCity);

    // Update Category Spot Counters
    const foodSpots = allCityPlaces.filter(p => p.category === "food");
    const spotsPlaces = allCityPlaces.filter(p => p.category === "places");
    const funSpots = allCityPlaces.filter(p => p.category === "fun");

    if (foodCountEl) foodCountEl.textContent = `${foodSpots.length} spots`;
    if (placesCountEl) placesCountEl.textContent = `${spotsPlaces.length} spots`;
    if (funCountEl) funCountEl.textContent = `${funSpots.length} spots`;

    if (!container) return;

    // Pick Top Ranked across all categories for Spotlight
    allCityPlaces.forEach(p => { p.score = calculatePlaceScore(p); });
    allCityPlaces.sort((a, b) => b.score - a.score);
    const topPicks = allCityPlaces.slice(0, 6);

    let html = "";
    topPicks.forEach((place, index) => {
      html += `
        <article class="card p-5 group flex flex-col justify-between">
          <div>
            <div class="relative h-44 rounded-2xl overflow-hidden mb-4">
              <img 
                src="${place.img}" 
                alt="${place.name}" 
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                onerror="this.src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800'"
              />
              <span class="absolute top-3 left-3 px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-950/80 text-white backdrop-blur-md">
                #${index + 1} in ${place.city}
              </span>
              <div class="absolute bottom-2 right-2 scale-90">
                ${renderScoreRing(place.score, 52, 4.5)}
              </div>
            </div>

            <div class="flex items-center gap-2 mb-1.5">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                ${place.category}
              </span>
              <span class="text-xs text-slate-400">•</span>
              <span class="text-xs text-slate-500">${place.priceRange}</span>
            </div>

            <h4 class="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors">
              <a href="detail.html?id=${place.id}">
                ${place.name}
              </a>
            </h4>

            <p class="text-xs text-slate-500 flex items-center gap-1 mt-1 truncate">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 text-rose-500"></i>
              <span>${place.area}</span>
            </p>

            <p class="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2">
              ${place.tagline || place.description}
            </p>
          </div>

          <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-4">
            <span class="text-xs text-slate-400">👍 ${place.upvotes} student votes</span>
            <a href="detail.html?id=${place.id}" class="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              Explore <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </a>
          </div>
        </article>
      `;
    });

    container.innerHTML = html;
    if (typeof lucide !== "undefined" && lucide.createIcons) lucide.createIcons();
  } catch (err) {
    console.error("Error loading city highlights", err);
  }
}

// =========================================================================
// 3. SINGLE PLACE DETAIL CONTROLLER (discover/detail.html)
// =========================================================================

/**
 * Initializes the single place detail view
 */
async function initDiscoverDetail() {
  initStoredVotes();
  const container = document.getElementById("discover-detail-container");
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  let placeId = urlParams.get("id");

  if (!placeId && typeof PLACES !== "undefined" && PLACES.length > 0) {
    placeId = PLACES[0].id;
  }

  if (!placeId) {
    container.innerHTML = `
      <div class="text-center py-20">
        <p class="text-slate-500 mb-4">No place selected. Redirecting to food guide...</p>
        <a href="food.html" class="btn btn-primary text-xs">Browse Food Guide</a>
      </div>
    `;
    return;
  }

  try {
    const place = await getPlaceById(placeId);
    if (!place) {
      container.innerHTML = `
        <div class="card p-12 text-center space-y-4 max-w-md mx-auto">
          <i data-lucide="help-circle" class="w-12 h-12 text-amber-500 mx-auto"></i>
          <h2 class="font-heading font-bold text-xl">Spot Not Found</h2>
          <p class="text-slate-500 text-sm">We couldn't find the spot you're looking for. It may have been relocated.</p>
          <a href="city.html" class="btn btn-primary text-xs">Back to City Guide</a>
        </div>
      `;
      if (typeof lucide !== "undefined" && lucide.createIcons) lucide.createIcons();
      return;
    }

    place.score = calculatePlaceScore(place);
    DiscoverState.activeDetailPlace = place;

    renderPlaceDetailView(place);
  } catch (err) {
    console.error("Failed to load place detail", err);
  }
}

/**
 * Renders complete detailed layout for discover/detail.html
 * @param {Object} place
 */
function renderPlaceDetailView(place) {
  const container = document.getElementById("discover-detail-container");
  if (!container) return;

  // Set document title dynamically
  document.title = `${place.name} — JhoomRahi Discover`;

  const totalVotes = (place.upvotes || 0) + (place.downvotes || 0);
  const upActiveClass = place.userVote === "up" 
    ? "btn px-4 py-2.5 rounded-2xl font-bold flex items-center gap-2 bg-emerald-600 text-white shadow-md scale-105" 
    : "btn btn-ghost px-4 py-2.5 rounded-2xl font-medium flex items-center gap-2 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:text-emerald-600";

  const downActiveClass = place.userVote === "down" 
    ? "btn px-4 py-2.5 rounded-2xl font-bold flex items-center gap-2 bg-rose-600 text-white shadow-md scale-105" 
    : "btn btn-ghost px-4 py-2.5 rounded-2xl font-medium flex items-center gap-2 border border-slate-200 dark:border-slate-800 hover:border-rose-500 hover:text-rose-600";

  const galleryImages = (place.gallery && place.gallery.length > 0) ? place.gallery : [place.img];

  container.innerHTML = `
    <!-- Top Breadcrumb -->
    <nav class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-6">
      <a href="city.html" class="hover:text-indigo-600">Discover</a>
      <span>/</span>
      <a href="${place.category}.html" class="capitalize hover:text-indigo-600">${place.category}</a>
      <span>/</span>
      <span class="text-slate-800 dark:text-slate-200 font-medium truncate">${place.name}</span>
    </nav>

    <!-- Header Grid: Title, Category & Score Ring -->
    <div class="card p-6 sm:p-8 mb-8 border-indigo-100 dark:border-slate-800">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div class="space-y-3">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
              ${place.category}
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              📍 ${place.city}
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-semibold bg-lime-50 dark:bg-lime-950/60 text-lime-700 dark:text-lime-400 border border-lime-200 dark:border-lime-800">
              ${place.priceRange}
            </span>
          </div>

          <h1 class="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
            ${place.name}
          </h1>

          <p class="text-slate-600 dark:text-slate-300 text-base max-w-2xl leading-relaxed">
            ${place.tagline || place.description}
          </p>

          <p class="flex items-center gap-2 text-xs text-slate-500">
            <i data-lucide="map-pin" class="w-4 h-4 text-rose-500 flex-shrink-0"></i>
            <span>${place.address || place.area}</span>
          </p>
        </div>

        <!-- Right Side: Big % Score Ring -->
        <div class="flex flex-col items-center sm:items-end justify-center gap-2 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-3xl border border-slate-100 dark:border-slate-800">
          <div id="detail-score-ring">
            ${renderScoreRing(place.score, 88, 7.5)}
          </div>
          <span class="text-xs font-semibold text-slate-600 dark:text-slate-300 text-center">
            Student Verified Rating
          </span>
          <span class="text-[11px] text-slate-400">
            ${place.reviewCount || 1000}+ local reviews
          </span>
        </div>

      </div>
    </div>

    <!-- Main 2-Column Detail Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- Left Column: Gallery & "Why it's #1" Reasons (8 cols) -->
      <div class="lg:col-span-8 space-y-8">
        
        <!-- Photo Gallery -->
        <div class="space-y-3">
          <h3 class="font-heading font-bold text-xl text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="image" class="w-5 h-5 text-indigo-600"></i>
            <span>Spot Photo Gallery</span>
          </h3>
          
          <div class="rounded-3xl overflow-hidden h-72 sm:h-96 w-full relative card">
            <img 
              id="detail-main-photo" 
              src="${galleryImages[0]}" 
              alt="${place.name}" 
              loading="lazy"
              class="w-full h-full object-cover transition-all duration-300"
              onerror="this.src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800'"
            />
          </div>

          <!-- Thumbnails Row -->
          ${galleryImages.length > 1 ? `
            <div class="flex items-center gap-3 overflow-x-auto pb-2">
              ${galleryImages.map((imgUrl, i) => `
                <button 
                  type="button" 
                  onclick="swapDetailPhoto('${imgUrl}')" 
                  class="w-24 h-16 rounded-xl overflow-hidden border-2 border-transparent hover:border-indigo-500 focus:border-indigo-500 transition-all flex-shrink-0">
                  <img src="${imgUrl}" alt="Photo ${i + 1}" loading="lazy" class="w-full h-full object-cover">
                </button>
              `).join("")}
            </div>
          ` : ""}
        </div>

        <!-- "Why it's #1" / Student Reasons Callout -->
        <div class="card p-6 sm:p-7 border-amber-200/70 dark:border-amber-900/40 bg-gradient-to-br from-amber-50/50 via-white to-amber-50/20 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/20">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-9 h-9 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-base shadow-sm">
              ★
            </span>
            <div>
              <h3 class="font-heading font-bold text-lg text-slate-900 dark:text-white">
                Why Students Rate This #1
              </h3>
              <p class="text-xs text-slate-500">Unfiltered, community-vetted breakdown</p>
            </div>
          </div>

          <ul class="space-y-3.5">
            ${(place.reasonsWhy || [
              "Consistently top-rated for affordability and portion sizes",
              "Welcoming atmosphere with plenty of student groups and zero snobbery",
              "Convenient access, late opening hours, and fast digital checkout"
            ]).map((reason, i) => `
              <li class="flex items-start gap-3">
                <div class="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <i data-lucide="check" class="w-3.5 h-3.5"></i>
                </div>
                <span class="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  ${reason}
                </span>
              </li>
            `).join("")}
          </ul>
        </div>

        <!-- Detailed Editorial Description -->
        <div class="card p-6 sm:p-7 space-y-4">
          <h3 class="font-heading font-bold text-lg text-slate-900 dark:text-white">
            The Local Scoop
          </h3>
          <p class="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            ${place.description}
          </p>
          
          <div class="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2">
            ${(place.tags || []).map(t => `
              <span class="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                #${t}
              </span>
            `).join("")}
          </div>
        </div>

      </div>

      <!-- Right Column: Live Rating Tap Box & Spot Info (4 cols) -->
      <div class="lg:col-span-4 space-y-6">
        
        <!-- Live Rating Tap Box -->
        <div class="card p-6 sm:p-7 bg-white dark:bg-slate-900 border-indigo-200/80 dark:border-indigo-900/60 shadow-xl space-y-5">
          <div>
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
              <i data-lucide="thumbs-up" class="w-3.5 h-3.5"></i> Community Voting
            </span>
            <h3 class="font-heading font-bold text-xl text-slate-900 dark:text-white mt-2">
              Have you been here?
            </h3>
            <p class="text-xs text-slate-500 mt-1">
              Tap thumbs up or down to update the city ranking in real-time.
            </p>
          </div>

          <!-- Vote Tap Buttons with pop effect -->
          <div class="grid grid-cols-2 gap-3">
            <button 
              id="detail-vote-up"
              type="button" 
              onclick="handlePlaceVote('${place.id}', 'up', event)"
              class="${upActiveClass}">
              <span class="text-lg">👍</span>
              <span>Upvote (<span class="vote-count">${place.upvotes || 0}</span>)</span>
            </button>

            <button 
              id="detail-vote-down"
              type="button" 
              onclick="handlePlaceVote('${place.id}', 'down', event)"
              class="${downActiveClass}">
              <span class="text-lg">👎</span>
              <span>Downvote (<span class="vote-count">${place.downvotes || 0}</span>)</span>
            </button>
          </div>

          <p id="detail-total-votes-count" class="text-center text-xs text-slate-400">
            ${totalVotes.toLocaleString("en-IN")} student votes recorded
          </p>
        </div>

        <!-- Practical Spot Details: Timings, Address, Perks -->
        <div class="card p-6 space-y-4">
          <h4 class="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <i data-lucide="clock" class="w-4 h-4 text-indigo-600"></i>
            <span>Hours & Timings</span>
          </h4>
          <p class="text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl">
            ${place.timings || "Open 7 Days a Week"}
          </p>

          <h4 class="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2 pt-2">
            <i data-lucide="sparkles" class="w-4 h-4 text-amber-500"></i>
            <span>Student Perks & Highlights</span>
          </h4>
          <div class="space-y-2">
            ${(place.perks || [
              "Accepts UPI and cash payments",
              "Student crowd friendly",
              "Safe night corridor"
            ]).map(perk => `
              <div class="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                <i data-lucide="check-circle" class="w-4 h-4 text-emerald-500 flex-shrink-0"></i>
                <span>${perk}</span>
              </div>
            `).join("")}
          </div>

          <div class="pt-4 border-t border-slate-100 dark:border-slate-800">
            <a 
              href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.city)}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="w-full btn btn-primary text-xs py-3 rounded-xl flex items-center justify-center gap-2">
              <i data-lucide="navigation" class="w-4 h-4"></i>
              <span>Get Directions on Maps</span>
            </a>
          </div>
        </div>

        <!-- Back to Guide Button -->
        <div>
          <a href="${place.category}.html" class="w-full btn btn-ghost text-xs py-2.5 rounded-xl flex items-center justify-center gap-2">
            <i data-lucide="arrow-left" class="w-4 h-4"></i>
            <span>Back to ${place.category} Rankings</span>
          </a>
        </div>

      </div>

    </div>
  `;

  if (typeof lucide !== "undefined" && lucide.createIcons) lucide.createIcons();
}

/**
 * Swaps hero image in detail view gallery
 */
function swapDetailPhoto(imgUrl) {
  const mainPhoto = document.getElementById("detail-main-photo");
  if (mainPhoto) {
    mainPhoto.style.opacity = "0.4";
    setTimeout(() => {
      mainPhoto.src = imgUrl;
      mainPhoto.style.opacity = "1";
    }, 150);
  }
}
