/**
 * JhoomRahi — Travel Vertical Controller (Phase 3)
 * 
 * Manages:
 * 1. Interactive Month Calendar with departure star (★) & ongoing dot (•) highlights
 * 2. Origin city and vibe filtering
 * 3. Live second-by-second countdown timer on detail.html
 * 4. Squad roster & "Join Trip" modal with localStorage persistence & confetti
 * 5. Trip browsing (Card/Swipe view) & Post Trip plan wizard
 */

// Global State for Travel Vertical
const TravelState = {
  currentYear: 2026,
  currentMonth: 10, // 0-indexed: 10 = November 2026
  selectedDate: null, // "YYYY-MM-DD"
  selectedCity: "all",
  selectedVibe: "all",
  trips: [],
  joinedTrips: JSON.parse(localStorage.getItem("jhoomrahi_joined_trips") || "[]"),
  countdownInterval: null,
  activeDetailTrip: null
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

/**
 * Toast notification wrapper
 */
function travelNotify(msg, type = "info") {
  if (typeof showToast === "function") {
    showToast(msg, type);
  } else {
    alert(msg);
  }
}

/**
 * Currency Formatter
 */
function formatRupee(amount) {
  if (!amount && amount !== 0) return "₹0";
  return `₹${Number(amount).toLocaleString("en-IN")}`;
}

// =========================================================================
// 1. CALENDAR SYSTEM (travel/calendar.html)
// =========================================================================

/**
 * Initializes the travel calendar view on travel/calendar.html.
 * Loads upcoming trips, renders month grid and sidebar feed, and binds filter listeners.
 * @async
 * @function initTravelCalendar
 * @returns {Promise<void>}
 */
async function initTravelCalendar() {
  const container = document.getElementById("calendar-days-grid");
  if (!container) return;

  try {
    TravelState.trips = await getTrips();
    setupCalendarFilterListeners();
    renderCalendar();
    renderFeedTrips();
  } catch (err) {
    console.error("Failed to load trips for calendar", err);
  }
}

/**
 * Sets up city pills and vibe filters for calendar
 */
function setupCalendarFilterListeners() {
  // Origin city chips
  document.querySelectorAll("[data-travel-city]").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("[data-travel-city]").forEach(c => {
        c.classList.remove("bg-indigo-600", "text-white", "shadow-sm");
        c.classList.add("text-slate-600", "dark:text-slate-400", "hover:text-indigo-600");
      });
      chip.classList.remove("text-slate-600", "dark:text-slate-400", "hover:text-indigo-600");
      chip.classList.add("bg-indigo-600", "text-white", "shadow-sm");

      TravelState.selectedCity = chip.getAttribute("data-travel-city");
      renderCalendar();
      renderFeedTrips();
    });
  });

  // Vibe chips
  document.querySelectorAll("[data-travel-vibe]").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("[data-travel-vibe]").forEach(c => {
        c.classList.remove("bg-lime-400", "text-slate-950", "font-bold");
        c.classList.add("text-slate-600", "dark:text-slate-400");
      });
      chip.classList.remove("text-slate-600", "dark:text-slate-400");
      chip.classList.add("bg-lime-400", "text-slate-950", "font-bold");

      TravelState.selectedVibe = chip.getAttribute("data-travel-vibe");
      renderCalendar();
      renderFeedTrips();
    });
  });
}

/**
 * Filtered trips list based on active city and vibe
 */
function getActiveFilteredTrips() {
  return TravelState.trips.filter(t => {
    if (TravelState.selectedCity !== "all") {
      if (t.originCity.toLowerCase() !== TravelState.selectedCity.toLowerCase()) {
        return false;
      }
    }
    if (TravelState.selectedVibe !== "all") {
      if (t.vibeCategory !== TravelState.selectedVibe && !t.vibe.toLowerCase().includes(TravelState.selectedVibe.toLowerCase())) {
        return false;
      }
    }
    return true;
  });
}

/**
 * Renders the Month Calendar Grid
 */
function renderCalendar() {
  const grid = document.getElementById("calendar-days-grid");
  const monthTitle = document.getElementById("calendar-month-title");
  if (!grid) return;

  const year = TravelState.currentYear;
  const month = TravelState.currentMonth;

  if (monthTitle) {
    monthTitle.textContent = `${MONTH_NAMES[month]} ${year}`;
  }

  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon ...
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const activeTrips = getActiveFilteredTrips();

  // Create date lookup tables:
  // departures: Set of "YYYY-MM-DD"
  // ongoing: Set of "YYYY-MM-DD"
  const departures = new Map(); // dateStr -> array of trips
  const ongoingDays = new Map();

  activeTrips.forEach(t => {
    if (!t.startDate) return;
    const startStr = t.startDate.split("T")[0];
    const endStr = t.endDate ? t.endDate.split("T")[0] : startStr;

    if (!departures.has(startStr)) departures.set(startStr, []);
    departures.get(startStr).push(t);

    // Populate ongoing days (from day after start up to end date)
    let cur = new Date(t.startDate);
    const end = new Date(t.endDate || t.startDate);
    cur.setDate(cur.getDate() + 1);

    while (cur <= end) {
      const dStr = cur.toISOString().split("T")[0];
      if (!ongoingDays.has(dStr)) ongoingDays.set(dStr, []);
      ongoingDays.get(dStr).push(t);
      cur.setDate(cur.getDate() + 1);
    }
  });

  let html = "";

  // 1. Previous month filler days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const prevDay = prevMonthDays - i;
    html += `
      <div class="h-14 sm:h-16 p-1 text-slate-300 dark:text-slate-700 flex flex-col justify-start items-center rounded-xl pointer-events-none opacity-40">
        <span class="text-xs">${prevDay}</span>
      </div>
    `;
  }

  // 2. Current Month Days
  for (let day = 1; day <= daysInMonth; day++) {
    const monthStr = String(month + 1).padStart(2, "0");
    const dayStr = String(day).padStart(2, "0");
    const dateStr = `${year}-${monthStr}-${dayStr}`;

    const isDeparture = departures.has(dateStr);
    const isOngoing = ongoingDays.has(dateStr);
    const isSelected = TravelState.selectedDate === dateStr;

    const tripsOnThisDay = departures.get(dateStr) || ongoingDays.get(dateStr) || [];
    const tripCount = tripsOnThisDay.length;

    let dayClasses = "cursor-pointer rounded-2xl flex flex-col items-center justify-between p-1.5 transition-all duration-200 min-h-[3.75rem] border ";
    
    if (isSelected) {
      dayClasses += "border-indigo-600 bg-indigo-50/90 dark:bg-indigo-950/70 ring-2 ring-indigo-500/30 ";
    } else if (isDeparture) {
      dayClasses += "border-indigo-400/60 dark:border-indigo-500/50 bg-indigo-50/50 dark:bg-indigo-950/30 hover:border-indigo-500 ";
    } else if (isOngoing) {
      dayClasses += "border-lime-400/40 dark:border-lime-500/30 bg-lime-50/40 dark:bg-lime-950/20 hover:border-lime-500 ";
    } else {
      dayClasses += "border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/60 ";
    }

    // Departure Star Badge vs Ongoing Dot Indicator
    let indicatorHtml = "";
    if (isDeparture) {
      indicatorHtml = `
        <span class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-indigo-600 text-white shadow-xs">
          <span>★</span>
          <span class="hidden sm:inline">${tripCount} start</span>
        </span>
      `;
    } else if (isOngoing) {
      indicatorHtml = `
        <span class="flex items-center gap-1 text-[9px] font-semibold text-lime-700 dark:text-lime-400">
          <span class="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></span>
          <span class="hidden sm:inline">${tripCount} squad</span>
        </span>
      `;
    }

    html += `
      <div 
        onclick="selectCalendarDate('${dateStr}')" 
        class="${dayClasses}">
        <div class="flex items-center justify-between w-full px-1">
          <span class="text-xs font-bold ${isDeparture ? 'text-indigo-600 dark:text-indigo-400 font-heading text-sm' : 'text-slate-800 dark:text-slate-200'}">${day}</span>
          ${isDeparture ? `<span class="w-1.5 h-1.5 rounded-full bg-indigo-600 sm:hidden"></span>` : ''}
        </div>
        <div class="mt-auto w-full flex items-center justify-center">
          ${indicatorHtml}
        </div>
      </div>
    `;
  }

  grid.innerHTML = html;
}

/**
 * Selects a calendar day and filters sidebar squads scheduled on that day.
 * @function selectCalendarDate
 * @param {string} dateStr - Date formatted as YYYY-MM-DD
 * @returns {void}
 */
function selectCalendarDate(dateStr) {
  if (TravelState.selectedDate === dateStr) {
    TravelState.selectedDate = null; // Toggle unselect
  } else {
    TravelState.selectedDate = dateStr;
  }
  renderCalendar();
  renderFeedTrips();
}

/**
 * Advances calendar view to the previous month.
 * @function prevMonth
 * @returns {void}
 */
function prevMonth() {
  if (TravelState.currentMonth === 0) {
    TravelState.currentMonth = 11;
    TravelState.currentYear--;
  } else {
    TravelState.currentMonth--;
  }
  TravelState.selectedDate = null;
  renderCalendar();
  renderFeedTrips();
}

/**
 * Advances calendar view to the next month.
 * @function nextMonth
 * @returns {void}
 */
function nextMonth() {
  if (TravelState.currentMonth === 11) {
    TravelState.currentMonth = 0;
    TravelState.currentYear++;
  } else {
    TravelState.currentMonth++;
  }
  TravelState.selectedDate = null;
  renderCalendar();
  renderFeedTrips();
}

/**
 * Resets calendar view to the current month and today's date.
 * @function jumpToToday
 * @returns {void}
 */
function jumpToToday() {
  TravelState.currentYear = 2026;
  TravelState.currentMonth = 10; // November
  TravelState.selectedDate = "2026-11-20";
  renderCalendar();
  renderFeedTrips();
}

/**
 * Renders the Trip Cards on the right-hand feed (or below calendar on mobile)
 */
function renderFeedTrips() {
  const container = document.getElementById("calendar-trips-feed");
  const feedHeader = document.getElementById("feed-date-header");
  const feedCount = document.getElementById("feed-trips-count");
  if (!container) return;

  const activeTrips = getActiveFilteredTrips();

  let displayed = activeTrips;

  if (TravelState.selectedDate) {
    const sel = TravelState.selectedDate;
    displayed = activeTrips.filter(t => {
      const start = t.startDate.split("T")[0];
      const end = t.endDate ? t.endDate.split("T")[0] : start;
      return sel >= start && sel <= end;
    });

    if (feedHeader) {
      const dateObj = new Date(sel);
      feedHeader.textContent = `Trips active on ${dateObj.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}`;
    }
  } else {
    // Show all trips for current month
    const curMonthPrefix = `${TravelState.currentYear}-${String(TravelState.currentMonth + 1).padStart(2, "0")}`;
    displayed = activeTrips.filter(t => t.startDate && t.startDate.startsWith(curMonthPrefix));
    
    if (displayed.length === 0) {
      displayed = activeTrips; // Fallback to all upcoming
    }

    if (feedHeader) {
      feedHeader.textContent = `Squads for ${MONTH_NAMES[TravelState.currentMonth]} ${TravelState.currentYear}`;
    }
  }

  if (feedCount) {
    feedCount.textContent = `${displayed.length} squad${displayed.length === 1 ? '' : 's'} available`;
  }

  if (displayed.length === 0) {
    container.innerHTML = `
      <div class="card p-8 text-center text-slate-500 border border-slate-200 dark:border-slate-800">
        <i data-lucide="compass" class="w-10 h-10 mx-auto text-slate-400 mb-3"></i>
        <p class="font-heading font-semibold text-sm text-slate-900 dark:text-white">No squads on this exact date</p>
        <p class="text-xs text-slate-500 mt-1 mb-4">Check adjacent weekends or reset your city filter.</p>
        <button type="button" onclick="TravelState.selectedDate = null; renderCalendar(); renderFeedTrips();" class="btn btn-ghost text-xs py-2 px-4 rounded-xl">
          Show All ${MONTH_NAMES[TravelState.currentMonth]} Trips
        </button>
      </div>
    `;
    if (typeof lucide !== "undefined") lucide.createIcons();
    return;
  }

  let html = "";
  displayed.forEach(t => {
    const isJoined = TravelState.joinedTrips.includes(t.id);
    const slotsLeft = t.slots ? t.slots.remaining : 2;
    const squadAvatars = (t.squad || []).slice(0, 4).map(m => `
      <img src="${m.avatar}" alt="${m.name}" title="${m.name} (${m.role})" loading="lazy" class="w-7 h-7 rounded-full object-cover ring-2 ring-white dark:ring-slate-900 -ml-2 first:ml-0" onerror="this.onerror=null;this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(m.name || 'Traveler')}&background=6366f1&color=fff';">
    `).join("");

    const extraSquadCount = (t.squad && t.squad.length > 4) ? `+${t.squad.length - 4}` : "";

    html += `
      <div class="card p-5 border border-slate-200 dark:border-slate-800 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
        <div>
          <!-- Top Row: Vibe badge & slots left -->
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-900/60">
              <i data-lucide="map-pin" class="w-3 h-3 text-indigo-500"></i>
              <span>From ${t.originCity}</span>
            </span>

            <span class="inline-flex items-center gap-1 text-[11px] font-bold ${slotsLeft <= 2 ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md' : 'text-slate-500'}">
              <i data-lucide="zap" class="w-3 h-3 text-amber-500"></i>
              <span>${slotsLeft} slot${slotsLeft === 1 ? '' : 's'} left</span>
            </span>
          </div>

          <!-- Trip Title -->
          <h3 class="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 transition-colors line-clamp-1 mb-1">
            ${t.title}
          </h3>

          <!-- Date & Duration -->
          <p class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mb-3">
            <i data-lucide="calendar" class="w-3.5 h-3.5 text-slate-400 flex-shrink-0"></i>
            <span>${t.dateDisplay}</span>
            <span class="text-slate-300 dark:text-slate-700">•</span>
            <span>${t.duration}</span>
          </p>

          <!-- Squad Roster Avatars & Budget -->
          <div class="flex items-center justify-between gap-2 py-3 border-y border-slate-100 dark:border-slate-800/80 mb-3">
            <div class="flex items-center">
              <div class="flex items-center mr-2">
                ${squadAvatars}
              </div>
              ${extraSquadCount ? `<span class="text-[10px] font-bold text-slate-500">${extraSquadCount}</span>` : ''}
              <span class="text-[11px] text-slate-500 font-medium ml-1">joined</span>
            </div>

            <div class="text-right">
              <span class="font-heading font-bold text-sm text-slate-900 dark:text-white">${t.budgetDisplay || formatRupee(t.budget)}</span>
            </div>
          </div>
        </div>

        <!-- Action Links -->
        <div class="flex items-center justify-between pt-1">
          <div class="text-[11px] text-slate-500 flex items-center gap-1.5">
            <img src="${t.host.avatar}" alt="${t.host.name}" loading="lazy" class="w-5 h-5 rounded-full object-cover" onerror="this.onerror=null;this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(t.host.name || 'Host')}&background=6366f1&color=fff';">
            <span class="truncate max-w-[110px]">${t.host.name}</span>
          </div>

          <a href="detail.html?id=${t.id}" class="btn ${isJoined ? 'bg-emerald-500 text-white' : 'btn-primary'} text-xs py-1.5 px-3 rounded-xl flex items-center gap-1 shadow-xs">
            <span>${isJoined ? 'In Squad ✓' : 'View Squad'}</span>
            <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
          </a>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  if (typeof lucide !== "undefined") lucide.createIcons();
}

// =========================================================================
// 2. BROWSE TRIPS (travel/browse.html)
// =========================================================================

/**
 * Initializes the travel browse catalog on travel/browse.html.
 * Fetches trips, renders skeletons, displays cards, and binds filter listeners.
 * @async
 * @function initTravelBrowse
 * @returns {Promise<void>}
 */
async function initTravelBrowse() {
  const container = document.getElementById("travel-browse-grid");
  if (!container) return;

  renderTripSkeletons(container, 6);

  try {
    TravelState.trips = await getTrips();
    renderBrowseTripCards();
    setupBrowseTripFilterListeners();
  } catch (err) {
    console.error("Failed to load trips for browsing", err);
    container.innerHTML = `<div class="col-span-full py-12 text-center text-slate-500">Could not load trips. Please refresh.</div>`;
  }
}

/**
 * Renders animated skeleton placeholder cards while travel squads are loading.
 * @function renderTripSkeletons
 * @param {HTMLElement} container - DOM container element
 * @param {number} [count=6] - Number of skeleton cards
 * @returns {void}
 */
function renderTripSkeletons(container, count = 6) {
  let html = "";
  for (let i = 0; i < count; i++) {
    html += `
      <div class="card overflow-hidden animate-pulse flex flex-col">
        <div class="h-48 bg-slate-200 dark:bg-slate-800 w-full"></div>
        <div class="p-5 flex-1 flex flex-col gap-3">
          <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
          <div class="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
          <div class="h-10 bg-slate-200 dark:bg-slate-800 rounded mt-auto"></div>
        </div>
      </div>
    `;
  }
  container.innerHTML = html;
}

/**
 * Renders filtered travel squad cards onto travel/browse.html.
 * @function renderBrowseTripCards
 * @returns {void}
 */
function renderBrowseTripCards() {
  const container = document.getElementById("travel-browse-grid");
  const countEl = document.getElementById("travel-browse-count");
  if (!container) return;

  const cityVal = document.getElementById("travel-filter-city")?.value || "all";
  const vibeVal = document.querySelector("input[name='travel-vibe']:checked")?.value || "all";
  const maxBudgetVal = document.getElementById("travel-budget-slider")?.value || 25000;
  const searchVal = (document.getElementById("travel-search-input")?.value || "").toLowerCase().trim();

  let filtered = TravelState.trips.filter(t => {
    if (cityVal !== "all" && t.originCity.toLowerCase() !== cityVal.toLowerCase()) return false;
    if (vibeVal !== "all" && t.vibeCategory !== vibeVal && !t.vibe.toLowerCase().includes(vibeVal.toLowerCase())) return false;
    if (t.budget > Number(maxBudgetVal)) return false;

    if (searchVal) {
      const hay = `${t.title} ${t.destination} ${t.originCity} ${t.vibe} ${t.description} ${t.host.name}`.toLowerCase();
      if (!hay.includes(searchVal)) return false;
    }
    return true;
  });

  if (countEl) {
    countEl.textContent = `${filtered.length} upcoming squad trip${filtered.length === 1 ? '' : 's'}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center card p-8">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center mb-3">
          <i data-lucide="compass" class="w-7 h-7"></i>
        </div>
        <h3 class="font-heading font-bold text-lg text-slate-900 dark:text-white">No Upcoming Squads Found</h3>
        <p class="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">Try relaxing your budget slider or clearing search keywords.</p>
        <button type="button" onclick="resetTravelFilters()" class="btn btn-primary text-xs py-2 px-4 rounded-xl">
          Reset Filters
        </button>
      </div>
    `;
    if (typeof lucide !== "undefined") lucide.createIcons();
    return;
  }

  let html = "";
  filtered.forEach(t => {
    const isJoined = TravelState.joinedTrips.includes(t.id);
    const slotsLeft = t.slots ? t.slots.remaining : 2;
    const squadAvatars = (t.squad || []).slice(0, 4).map(m => `
      <img src="${m.avatar}" alt="${m.name}" title="${m.name}" loading="lazy" class="w-6 h-6 rounded-full object-cover ring-2 ring-white dark:ring-slate-900 -ml-1.5 first:ml-0" onerror="this.onerror=null;this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(m.name || 'Traveler')}&background=6366f1&color=fff';">
    `).join("");

    html += `
      <div class="card overflow-hidden flex flex-col group border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300">
        <!-- Cover Photo with Badges -->
        <div class="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img src="${t.coverImage}" alt="${t.title}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600';">
          
          <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span class="badge verified text-[11px] shadow-sm">
              <i data-lucide="shield-check" class="w-3 h-3 mr-1"></i>
              Verified Host
            </span>
            <span class="badge bg-slate-900/80 text-white backdrop-blur-sm text-[11px]">
              ${t.vibe}
            </span>
          </div>

          <!-- Price Overlay -->
          <div class="absolute bottom-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-200/50">
            <span class="font-heading font-bold text-base text-slate-900 dark:text-white">${t.budgetDisplay || formatRupee(t.budget)}</span>
            <span class="text-[10px] text-slate-500 font-medium">· All Inclusive</span>
          </div>
        </div>

        <!-- Body Details -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between gap-2 mb-1.5 text-xs text-slate-500">
              <span class="font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                <i data-lucide="map-pin" class="w-3 h-3"></i>
                From ${t.originCity}
              </span>
              <span class="text-rose-600 dark:text-rose-400 font-bold">${slotsLeft} slots left</span>
            </div>

            <h3 class="font-heading font-bold text-base text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 transition-colors mb-1">
              ${t.title}
            </h3>

            <p class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-3">
              <i data-lucide="calendar" class="w-3.5 h-3.5 text-slate-400 flex-shrink-0"></i>
              <span>${t.dateDisplay}</span>
              <span>•</span>
              <span>${t.duration}</span>
            </p>

            <p class="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
              ${t.description}
            </p>
          </div>

          <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div class="flex items-center">
              <div class="flex items-center mr-1.5">${squadAvatars}</div>
              <span class="text-[11px] text-slate-500">squad</span>
            </div>

            <a href="detail.html?id=${t.id}" class="btn ${isJoined ? 'bg-emerald-500 text-white' : 'btn-primary'} text-xs py-2 px-4 rounded-xl flex items-center gap-1">
              <span>${isJoined ? 'You’re In ✓' : 'Join Squad'}</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  if (typeof lucide !== "undefined") lucide.createIcons();
}

/**
 * Binds change and input listeners to travel search, vibe, and budget filters.
 * @function setupBrowseTripFilterListeners
 * @returns {void}
 */
function setupBrowseTripFilterListeners() {
  const citySelect = document.getElementById("travel-filter-city");
  if (citySelect) citySelect.addEventListener("change", renderBrowseTripCards);

  document.querySelectorAll("input[name='travel-vibe']").forEach(radio => {
    radio.addEventListener("change", renderBrowseTripCards);
  });

  const budgetSlider = document.getElementById("travel-budget-slider");
  const budgetDisplay = document.getElementById("travel-budget-display");
  if (budgetSlider) {
    budgetSlider.addEventListener("input", (e) => {
      if (budgetDisplay) budgetDisplay.textContent = formatRupee(e.target.value);
      renderBrowseTripCards();
    });
  }

  const searchInput = document.getElementById("travel-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", debounce(renderBrowseTripCards, 250));
  }
}

/**
 * Resets all travel filters to their default values and refreshes listings.
 * @function resetTravelFilters
 * @returns {void}
 */
function resetTravelFilters() {
  const citySelect = document.getElementById("travel-filter-city");
  if (citySelect) citySelect.value = "all";

  const allVibe = document.getElementById("vibe-all");
  if (allVibe) allVibe.checked = true;

  const slider = document.getElementById("travel-budget-slider");
  const display = document.getElementById("travel-budget-display");
  if (slider) {
    slider.value = 25000;
    if (display) display.textContent = "₹25,000";
  }

  const search = document.getElementById("travel-search-input");
  if (search) search.value = "";

  renderBrowseTripCards();
  travelNotify("Travel filters reset.", "info");
}

// =========================================================================
// 3. TRIP DETAIL & LIVE COUNTDOWN TIMER (travel/detail.html)
// =========================================================================

/**
 * Initializes travel trip detail view on travel/detail.html.
 * Reads ID from URL query parameters, fetches trip details, and starts countdown timer.
 * @async
 * @function initTripDetail
 * @returns {Promise<void>}
 */
async function initTripDetail() {
  const container = document.getElementById("trip-detail-container");
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const tripId = urlParams.get("id") || "trip-spiti-01";

  try {
    const trip = await getTripById(tripId);
    if (!trip) {
      container.innerHTML = `
        <div class="py-20 text-center card p-10 max-w-xl mx-auto my-12">
          <h2 class="font-heading font-bold text-xl text-slate-900 dark:text-white">Trip Not Found</h2>
          <p class="text-sm text-slate-500 mt-2 mb-6">This squad trip may have completed or been rescheduled.</p>
          <a href="browse.html" class="btn btn-primary text-sm py-2 px-5">Browse All Trips</a>
        </div>
      `;
      return;
    }

    TravelState.activeDetailTrip = trip;
    renderTripDetailView(trip);
    startLiveCountdown(trip.startDate);
  } catch (err) {
    console.error("Failed to load trip details", err);
    container.innerHTML = `<div class="py-16 text-center text-slate-500">Failed to load trip. Please refresh.</div>`;
  }
}

/**
 * Starts a precise second-by-second countdown timer
 */
function startLiveCountdown(targetIsoDate) {
  if (TravelState.countdownInterval) {
    clearInterval(TravelState.countdownInterval);
  }

  const targetTime = new Date(targetIsoDate).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetTime - now;

    const daysEl = document.getElementById("countdown-days");
    const hoursEl = document.getElementById("countdown-hours");
    const minsEl = document.getElementById("countdown-mins");
    const secsEl = document.getElementById("countdown-secs");

    if (!daysEl || !hoursEl || !minsEl || !secsEl) return;

    if (diff <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      const banner = document.getElementById("countdown-label");
      if (banner) banner.textContent = "Expedition in Progress / Departed";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    daysEl.textContent = String(d).padStart(2, "0");
    hoursEl.textContent = String(h).padStart(2, "0");
    minsEl.textContent = String(m).padStart(2, "0");
    secsEl.textContent = String(s).padStart(2, "0");
  }

  update();
  TravelState.countdownInterval = setInterval(update, 1000);
}

/**
 * Renders full trip details including host bio, itinerary timeline, squad roster, and cost split.
 * @function renderTripDetailView
 * @param {Object} t - Trip details object
 * @returns {void}
 */
function renderTripDetailView(t) {
  const container = document.getElementById("trip-detail-container");
  if (!container) return;

  const isJoined = TravelState.joinedTrips.includes(t.id);
  const slotsRemaining = t.slots ? t.slots.remaining : 2;
  const totalSlots = t.slots ? t.slots.total : 6;
  const bookedSlots = t.slots ? t.slots.booked : 4;

  const breakdown = t.budgetBreakdown || {
    transport: Math.round(t.budget * 0.45),
    stay: Math.round(t.budget * 0.35),
    food: Math.round(t.budget * 0.20)
  };

  // Itinerary timeline HTML
  const itineraryHtml = (t.itinerary || []).map((step, idx) => `
    <div class="relative pl-8 pb-6 last:pb-0 border-l-2 border-indigo-200 dark:border-indigo-900/60 ml-3">
      <div class="absolute -left-3 top-0 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-slate-900">
        ${step.day || idx + 1}
      </div>
      <h4 class="font-heading font-bold text-sm text-slate-900 dark:text-white">${step.title}</h4>
      <p class="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">${step.desc}</p>
    </div>
  `).join("");

  // Squad Members HTML
  const squadMembersHtml = (t.squad || []).map(m => `
    <div class="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
      <img src="${m.avatar}" alt="${m.name}" loading="lazy" class="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/20" onerror="this.onerror=null;this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(m.name || 'Traveler')}&background=6366f1&color=fff';">
      <div class="min-w-0 flex-1">
        <h4 class="text-xs font-bold text-slate-900 dark:text-white truncate">${m.name}</h4>
        <p class="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium truncate">${m.role}</p>
        <p class="text-[10px] text-slate-400">${m.city}</p>
      </div>
    </div>
  `).join("");

  // Inclusions and Exclusions
  const inclusionsHtml = (t.inclusions || []).map(inc => `
    <li class="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
      <i data-lucide="check" class="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5"></i>
      <span>${inc}</span>
    </li>
  `).join("");

  const exclusionsHtml = (t.exclusions || []).map(exc => `
    <li class="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400">
      <i data-lucide="x" class="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5"></i>
      <span>${exc}</span>
    </li>
  `).join("");

  container.innerHTML = `
    <!-- Top Breadcrumbs -->
    <div class="flex items-center gap-2 text-xs text-slate-500 mb-6">
      <a href="../index.html" class="hover:text-indigo-600">Home</a>
      <span>/</span>
      <a href="browse.html" class="hover:text-indigo-600">Travel</a>
      <span>/</span>
      <span class="text-slate-800 dark:text-slate-200 font-semibold truncate">${t.title}</span>
    </div>

    <!-- Title & Action Bar -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <span class="badge verified text-xs">
            <i data-lucide="shield-check" class="w-3.5 h-3.5 mr-1"></i>
            Verified Squad Host
          </span>
          <span class="badge bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs">
            ${t.vibe}
          </span>
          <span class="badge bg-lime-400/20 text-lime-700 dark:text-lime-300 text-xs">
            ${t.difficulty}
          </span>
        </div>

        <h1 class="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white leading-tight">
          ${t.title}
        </h1>

        <p class="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
          <i data-lucide="map-pin" class="w-4 h-4 text-indigo-500 flex-shrink-0"></i>
          <span>Pickup: ${t.pickupPoint || t.originCity}</span>
          <span class="text-slate-300 dark:text-slate-700">•</span>
          <span>${t.dateDisplay}</span>
        </p>
      </div>

      <div class="flex items-center gap-2 flex-shrink-0">
        <button 
          type="button" 
          onclick="shareTrip('${t.title}')" 
          class="btn btn-ghost text-xs py-2 px-3.5 rounded-xl flex items-center gap-1.5">
          <i data-lucide="share-2" class="w-4 h-4"></i>
          <span>Share</span>
        </button>
      </div>
    </div>

    <!-- LIVE COUNTDOWN TIMER BANNER -->
    <div class="card p-5 sm:p-6 mb-8 bg-slate-900 text-white rounded-3xl relative overflow-hidden shadow-xl cta-banner" data-cta-banner>
      <div class="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-lime-400 text-xs font-semibold mb-2">
            <span class="w-2 h-2 rounded-full bg-lime-400 animate-ping"></span>
            <span id="countdown-label">Time Remaining Until Departure</span>
          </div>
          <h3 class="font-heading font-bold text-lg sm:text-xl text-white !text-white">
            Trip Leaves from ${t.originCity}
          </h3>
          <p class="text-xs text-slate-300 mt-0.5">Live real-time synchronization with squad leader</p>
        </div>

        <!-- 4 Digit Blocks -->
        <div class="grid grid-cols-4 gap-2 sm:gap-3 text-center">
          <div class="bg-white/10 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl min-w-[60px] sm:min-w-[72px] border border-white/10">
            <span id="countdown-days" class="font-heading font-bold text-2xl sm:text-3xl text-white block">00</span>
            <span class="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Days</span>
          </div>
          <div class="bg-white/10 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl min-w-[60px] sm:min-w-[72px] border border-white/10">
            <span id="countdown-hours" class="font-heading font-bold text-2xl sm:text-3xl text-white block">00</span>
            <span class="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Hours</span>
          </div>
          <div class="bg-white/10 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl min-w-[60px] sm:min-w-[72px] border border-white/10">
            <span id="countdown-mins" class="font-heading font-bold text-2xl sm:text-3xl text-white block">00</span>
            <span class="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Mins</span>
          </div>
          <div class="bg-white/10 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl min-w-[60px] sm:min-w-[72px] border border-white/10 ring-1 ring-lime-400/40">
            <span id="countdown-secs" class="font-heading font-bold text-2xl sm:text-3xl text-lime-400 block">00</span>
            <span class="text-[10px] text-slate-300 uppercase tracking-wider font-semibold">Secs</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content & Sticky Booking Card Split -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
      
      <!-- Left 7 Cols: Overview, Itinerary, Squad, Inclusions -->
      <div class="lg:col-span-7 space-y-8">
        
        <!-- Cover & Gallery -->
        <div class="card overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
          <div class="h-72 sm:h-96 w-full overflow-hidden">
            <img src="${t.coverImage}" alt="${t.title}" loading="lazy" class="w-full h-full object-cover" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600';">
          </div>
        </div>

        <!-- Trip Overview -->
        <div class="card p-6 sm:p-7">
          <h2 class="font-heading font-bold text-lg text-slate-900 dark:text-white mb-3">About this Squad Trip</h2>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            ${t.description}
          </p>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 text-xs">
            <div>
              <span class="text-slate-400 block">Transport Mode</span>
              <span class="font-bold text-slate-900 dark:text-white text-xs mt-0.5">${t.transportMode}</span>
            </div>
            <div>
              <span class="text-slate-400 block">Duration</span>
              <span class="font-bold text-slate-900 dark:text-white text-xs mt-0.5">${t.duration}</span>
            </div>
            <div>
              <span class="text-slate-400 block">Difficulty</span>
              <span class="font-bold text-slate-900 dark:text-white text-xs mt-0.5">${t.difficulty}</span>
            </div>
          </div>
        </div>

        <!-- Day-by-Day Itinerary -->
        <div class="card p-6 sm:p-7">
          <h2 class="font-heading font-bold text-lg text-slate-900 dark:text-white mb-6 flex items-center justify-between">
            <span>Day-by-Day Itinerary</span>
            <span class="text-xs font-semibold text-indigo-600 dark:text-indigo-400">${t.duration}</span>
          </h2>
          <div class="space-y-1">
            ${itineraryHtml}
          </div>
        </div>

        <!-- Who's Going (The Squad) -->
        <div class="card p-6 sm:p-7">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h2 class="font-heading font-bold text-lg text-slate-900 dark:text-white">The Travel Squad</h2>
              <p class="text-xs text-slate-500 mt-0.5">${bookedSlots} of ${totalSlots} spots filled</p>
            </div>
            <span class="badge verified">${slotsRemaining} slots remaining</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6" id="detail-squad-grid">
            ${squadMembersHtml}
          </div>

          <!-- Host Spotlight -->
          <div class="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-center gap-4">
            <img src="${t.host.avatar}" alt="${t.host.name}" loading="lazy" class="w-12 h-12 rounded-xl object-cover ring-2 ring-indigo-500/20" onerror="this.onerror=null;this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(t.host.name || 'Host')}&background=6366f1&color=fff';">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-1.5">
                <h4 class="text-xs font-bold text-slate-900 dark:text-white">${t.host.name} (Squad Host)</h4>
                <span class="badge verified text-[9px]">Verified</span>
              </div>
              <p class="text-xs text-slate-500 mt-0.5 line-clamp-1">${t.host.bio}</p>
            </div>
          </div>
        </div>

        <!-- Inclusions & Exclusions -->
        <div class="card p-6 sm:p-7">
          <h2 class="font-heading font-bold text-lg text-slate-900 dark:text-white mb-4">What's Included & Excluded</h2>
          
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p class="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-3">Included in split:</p>
              <ul class="space-y-2.5">
                ${inclusionsHtml}
              </ul>
            </div>

            <div>
              <p class="text-xs font-bold uppercase tracking-wider text-rose-500 mb-3">Not Included:</p>
              <ul class="space-y-2.5">
                ${exclusionsHtml}
              </ul>
            </div>
          </div>
        </div>

      </div>

      <!-- Right 5 Cols: Sticky Booking & Split Card -->
      <div class="lg:col-span-5 sticky top-24 space-y-6">
        
        <div class="card p-6 sm:p-7 shadow-xl border-2 border-indigo-500/20">
          <div class="flex items-baseline justify-between mb-4">
            <div>
              <span class="font-heading font-bold text-3xl text-slate-900 dark:text-white">${t.budgetDisplay || formatRupee(t.budget)}</span>
              <span class="text-xs text-slate-500 font-medium">/ person</span>
            </div>
            <span class="badge verified">Transparent Split</span>
          </div>

          <!-- Slots Progress Bar -->
          <div class="space-y-1.5 mb-6">
            <div class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span>Squad Capacity</span>
              <span id="detail-slots-label" class="text-indigo-600 dark:text-indigo-400 font-bold">${slotsRemaining} slots remaining</span>
            </div>
            <div class="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div id="detail-slots-bar" class="bg-indigo-600 h-full rounded-full transition-all duration-500" style="width: ${Math.round((bookedSlots / totalSlots) * 100)}%"></div>
            </div>
          </div>

          <!-- Budget Breakdown Lines -->
          <div class="space-y-2.5 py-4 border-y border-slate-100 dark:border-slate-800 text-xs mb-6">
            <p class="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px] mb-2">Cost Breakdown per Person</p>
            
            <div class="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Shared Transport & Fuel</span>
              <span class="font-semibold text-slate-900 dark:text-white">${formatRupee(breakdown.transport)}</span>
            </div>
            <div class="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Homestays / Camps</span>
              <span class="font-semibold text-slate-900 dark:text-white">${formatRupee(breakdown.stay)}</span>
            </div>
            <div class="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Breakfast & Dinners</span>
              <span class="font-semibold text-slate-900 dark:text-white">${formatRupee(breakdown.food)}</span>
            </div>
            ${breakdown.permits ? `
              <div class="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Permits & Entry Passes</span>
                <span class="font-semibold text-slate-900 dark:text-white">${formatRupee(breakdown.permits)}</span>
              </div>
            ` : ''}
            <div class="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium pt-1">
              <span>Platform Organizer Fee</span>
              <span>₹0 FREE</span>
            </div>
          </div>

          <!-- Join Action Button -->
          <button 
            type="button" 
            id="join-trip-action-btn"
            onclick="if(requireLogin('join_trip')) { openJoinTripModal('${t.id}'); }"
            class="w-full btn ${isJoined ? 'bg-emerald-500 text-white cursor-default' : 'btn-primary'} text-sm py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg">
            <i data-lucide="${isJoined ? 'check-circle' : 'users'}" class="w-4 h-4"></i>
            <span id="join-btn-text">${isJoined ? 'You are in the Squad! ✓' : 'Join This Squad'}</span>
          </button>

          <p class="text-center text-[11px] text-slate-400 mt-3">
            🔒 In-App Verification · Direct split with co-travelers
          </p>
        </div>

      </div>

    </div>
  `;

  if (typeof lucide !== "undefined") lucide.createIcons();
}

/**
 * Triggers native Web Share API or copies trip URL to user clipboard.
 * @function shareTrip
 * @param {string} title - Trip title to share
 * @returns {void}
 */
function shareTrip(title) {
  if (navigator.share) {
    navigator.share({
      title: `${title} — JhoomRahi Squad`,
      url: window.location.href
    }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(window.location.href);
    travelNotify("Squad link copied to clipboard!", "success");
  }
}

// =========================================================================
// 4. JOIN TRIP MODAL & STATE UPDATE
// =========================================================================

/**
 * Opens modal dialog to join squad and reserve a slot.
 * @function openJoinTripModal
 * @param {string} tripId - Target trip ID
 * @returns {void}
 */
function openJoinTripModal(tripId) {
  if (typeof requireAuth === "function" && !requireAuth()) {
    return;
  }
  const t = TravelState.activeDetailTrip;
  if (!t) return;

  if (TravelState.joinedTrips.includes(t.id)) {
    travelNotify("You have already booked your slot in this squad!", "info");
    return;
  }

  const modal = document.getElementById("join-trip-modal");
  if (!modal) return;

  const titleEl = document.getElementById("join-modal-trip-title");
  const budgetEl = document.getElementById("join-modal-trip-budget");
  if (titleEl) titleEl.textContent = t.title;
  if (budgetEl) budgetEl.textContent = t.budgetDisplay || formatRupee(t.budget);

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

/**
 * Closes the join trip squad modal.
 * @function closeJoinTripModal
 * @returns {void}
 */
function closeJoinTripModal() {
  const modal = document.getElementById("join-trip-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
}

/**
 * Processes squad join form submission, saves to localStorage, and triggers celebration confetti.
 * @function submitJoinTrip
 * @param {Event} event - Submit event
 * @returns {void}
 */
function submitJoinTrip(event) {
  if (event) event.preventDefault();
  if (typeof requireAuth === "function" && !requireAuth()) {
    return;
  }

  const t = TravelState.activeDetailTrip;
  if (!t) return;

  const nameVal = document.getElementById("join-traveler-name")?.value || "Student Traveler";
  const cityVal = document.getElementById("join-traveler-city")?.value || "Delhi";

  // 1. Add to joined trips in state and localStorage
  if (!TravelState.joinedTrips.includes(t.id)) {
    TravelState.joinedTrips.push(t.id);
    localStorage.setItem("jhoomrahi_joined_trips", JSON.stringify(TravelState.joinedTrips));
  }

  // 2. Decrement remaining slots
  if (t.slots && t.slots.remaining > 0) {
    t.slots.remaining--;
    t.slots.booked++;
  }

  // 3. Add to squad roster
  if (!t.squad) t.squad = [];
  t.squad.push({
    id: `sq-user-${Date.now()}`,
    name: nameVal,
    role: "Verified Member",
    city: cityVal,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80"
  });

  closeJoinTripModal();

  // 4. Confetti burst
  if (typeof confetti === "function") {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#6366f1", "#a3e635", "#fb7185", "#f59e0b"]
    });
  }

  // 5. Update UI
  const btn = document.getElementById("join-trip-action-btn");
  const btnText = document.getElementById("join-btn-text");
  if (btn) {
    btn.className = "w-full btn bg-emerald-500 text-white cursor-default text-sm py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg";
  }
  if (btnText) {
    btnText.textContent = "You are in the Squad! ✓";
  }

  const slotsLabel = document.getElementById("detail-slots-label");
  const slotsBar = document.getElementById("detail-slots-bar");
  if (slotsLabel && t.slots) {
    slotsLabel.textContent = `${t.slots.remaining} slots remaining`;
  }
  if (slotsBar && t.slots) {
    slotsBar.style.width = `${Math.round((t.slots.booked / t.slots.total) * 100)}%`;
  }

  // Refresh squad grid in detail page
  const squadGrid = document.getElementById("detail-squad-grid");
  if (squadGrid) {
    squadGrid.innerHTML += `
      <div class="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 animate-fade-in">
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400" alt="Joined Member" loading="lazy" class="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/30" onerror="this.onerror=null;this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(nameVal || 'Member')}&background=10b981&color=fff';">
        <div class="min-w-0 flex-1">
          <h4 class="text-xs font-bold text-slate-900 dark:text-white truncate">${nameVal} (You)</h4>
          <p class="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">Joined Just Now</p>
          <p class="text-[10px] text-slate-400">${cityVal}</p>
        </div>
      </div>
    `;
  }

  travelNotify("You're officially on the squad! Host will add you to in-app coordination.", "success");
}

// =========================================================================
// 5. POST A TRIP (travel/post.html)
// =========================================================================

/**
 * Initializes trip creation wizard on travel/post.html.
 * Sets up live preview synchronization and form submission handlers.
 * @function initPostTripPage
 * @returns {void}
 */
function initPostTripPage() {
  const form = document.getElementById("post-trip-form");
  if (!form) return;

  setupPostTripLivePreview();
}

/**
 * Binds input listeners to trip planner form fields to mirror changes into the preview card.
 * @function setupPostTripLivePreview
 * @returns {void}
 */
function setupPostTripLivePreview() {
  const inputs = [
    "trip-post-title", "trip-post-dest", "trip-post-city", "trip-post-budget", "trip-post-vibe", "trip-post-dates"
  ];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", updatePostTripLivePreview);
  });
}

/**
 * Updates DOM elements of live preview card from active form input values.
 * @function updatePostTripLivePreview
 * @returns {void}
 */
function updatePostTripLivePreview() {
  const pTitle = document.getElementById("preview-trip-title");
  const pDest = document.getElementById("preview-trip-dest");
  const pBudget = document.getElementById("preview-trip-budget");
  const pCity = document.getElementById("preview-trip-city");

  const title = document.getElementById("trip-post-title")?.value.trim() || "Spiti Winter Roadtrip";
  const dest = document.getElementById("trip-post-dest")?.value.trim() || "Spiti Valley, Himachal";
  const city = document.getElementById("trip-post-city")?.value || "New Delhi";
  const budget = document.getElementById("trip-post-budget")?.value || 14500;

  if (pTitle) pTitle.textContent = title;
  if (pDest) pDest.textContent = dest;
  if (pBudget) pBudget.textContent = formatRupee(budget) + " / person";
  if (pCity) pCity.textContent = `From ${city}`;
}

/**
 * Validates trip planner form and saves new trip plan to localStorage.
 * @function publishTripPlan
 * @param {Event} e - Form submit event
 * @returns {void}
 */
function publishTripPlan(e) {
  if (e) e.preventDefault();

  const title = document.getElementById("trip-post-title")?.value.trim();
  const dest = document.getElementById("trip-post-dest")?.value.trim();
  const city = document.getElementById("trip-post-city")?.value;
  const startDate = document.getElementById("trip-post-start-date")?.value;
  const endDate = document.getElementById("trip-post-end-date")?.value;
  const budget = Number(document.getElementById("trip-post-budget")?.value) || 5000;
  const vibe = document.getElementById("trip-post-vibe")?.value || "Roadtrip & Mountains";
  const transport = document.getElementById("trip-post-transport")?.value || "Shared SUV Carpool";
  const hostName = document.getElementById("trip-post-host-name")?.value.trim() || "Student Host";
  const desc = document.getElementById("trip-post-desc")?.value.trim() || "Exciting weekend getaway planned with shared fuel, budget homestays, and good vibes.";

  if (!title || !dest || !startDate) {
    travelNotify("Please provide Trip Title, Destination, and Start Date.", "warning");
    return;
  }

  const newTrip = {
    id: `custom-trip-${Date.now()}`,
    title,
    destination: dest,
    originCity: city,
    pickupPoint: `${city} Central`,
    startDate: `${startDate}T07:00:00`,
    endDate: endDate ? `${endDate}T20:00:00` : `${startDate}T20:00:00`,
    dateDisplay: `${startDate} to ${endDate || startDate}`,
    duration: "Weekend Trip",
    vibe,
    vibeCategory: vibe.toLowerCase().includes("beach") ? "beach" : vibe.toLowerCase().includes("trek") ? "trek" : "roadtrip",
    difficulty: "Moderate",
    transportMode: transport,
    budget,
    budgetDisplay: `${formatRupee(budget)} / person`,
    budgetBreakdown: {
      transport: Math.round(budget * 0.45),
      stay: Math.round(budget * 0.35),
      food: Math.round(budget * 0.20)
    },
    slots: { total: 6, booked: 1, remaining: 5 },
    host: {
      id: `host-user`,
      name: hostName,
      role: "Squad Organizer",
      city,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400",
      tripsLed: 1,
      rating: 5.0,
      verified: true,
      bio: "Organizing an authentic shared-budget getaway on JhoomRahi."
    },
    squad: [
      {
        id: "sq-host",
        name: hostName,
        role: "Host",
        city,
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400"
      }
    ],
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    gallery: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"],
    itinerary: [
      { day: 1, title: "Day 1: Departure & Exploration", desc: desc, icon: "compass" }
    ],
    inclusions: ["Shared transport split", "Homestay / Tent stay"],
    exclusions: ["Personal food & cafe orders"],
    description: desc
  };

  const stored = JSON.parse(localStorage.getItem("jhoomrahi_user_trips") || "[]");
  stored.unshift(newTrip);
  localStorage.setItem("jhoomrahi_user_trips", JSON.stringify(stored));

  if (typeof confetti === "function") {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
  }

  const successModal = document.getElementById("trip-success-modal");
  if (successModal) {
    successModal.classList.remove("hidden");
    successModal.classList.add("flex");
    const viewBtn = document.getElementById("view-published-trip-btn");
    if (viewBtn) viewBtn.href = `detail.html?id=${newTrip.id}`;
  } else {
    travelNotify("Trip squad published successfully!", "success");
    setTimeout(() => {
      window.location.href = `detail.html?id=${newTrip.id}`;
    }, 1200);
  }
}

// Utility debounce
/**
 * Delays function execution until specified debounce threshold has elapsed.
 * @function debounce
 * @param {Function} fn - Function to debounce
 * @param {number} [wait=200] - Milliseconds to wait
 * @returns {Function}
 */
function debounce(fn, wait = 200) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}

// =========================================================================
// 6. DOM READY ROUTING
// =========================================================================

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("calendar-days-grid")) {
    initTravelCalendar();
  } else if (document.getElementById("travel-browse-grid")) {
    initTravelBrowse();
  } else if (document.getElementById("trip-detail-container")) {
    initTripDetail();
  } else if (document.getElementById("post-trip-form")) {
    initPostTripPage();
  }
});
