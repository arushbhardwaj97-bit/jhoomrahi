/**
 * JhoomRahi — Stay & Roommate Controller (Phase 2)
 * 
 * Manages:
 * 1. Roommate matching: 12-question quiz, dynamic 50/35/15 scoring, gender tabs, filters
 * 2. PG/Flat browsing: filter sidebar, search, map/list view toggle, skeleton loading
 * 3. PG details: dynamic rendering, photo gallery, rent breakdown calculator, inquiries
 * 4. Post listing: multi-step form with live preview, localStorage persistence, confetti
 */

// Global State for Stay Vertical
const StayState = {
  activeGenderTab: "all",
  roommates: [],
  pgs: [],
  savedPGs: JSON.parse(localStorage.getItem("jhoomrahi_saved_pgs") || "[]"),
  quizAnswers: JSON.parse(localStorage.getItem("jhoomrahi_quiz_answers") || "null"),
  connections: JSON.parse(localStorage.getItem("jhoomrahi_connection_requests") || "[]"),
  currentQuizIndex: 0,
  activeDetailPG: null
};

/**
 * Compatibility Quiz 12-Question Bank
 */
const QUIZ_QUESTIONS = [
  {
    id: "sleep",
    category: "Sleep & Routine",
    weightCategory: "core", // 50%
    question: "What is your typical weekday sleep schedule?",
    desc: "Matching sleep rhythms prevents late-night friction.",
    options: [
      { value: "early_bird", label: "Early Bird", sub: "Asleep by 10-11 PM, early riser (6-7 AM)", icon: "sun" },
      { value: "flexible", label: "Moderate / Flexible", sub: "Sleep around 12 AM – 1 AM", icon: "clock" },
      { value: "night_owl", label: "Night Owl", sub: "Up till 2-4 AM coding, studying, or unwinding", icon: "moon" }
    ]
  },
  {
    id: "food",
    category: "Food & Kitchen",
    weightCategory: "core",
    question: "What is your food and kitchen preference?",
    desc: "Kitchen harmony is sacred in shared Indian apartments.",
    options: [
      { value: "pure_veg", label: "100% Pure Vegetarian", sub: "Prefer strictly veg cookware & fridge", icon: "leaf" },
      { value: "eggetarian", label: "Eggetarian / Flexible Veg", sub: "Eggs are fine, respectful of veg boundaries", icon: "egg" },
      { value: "non_veg", label: "Non-Veg Friendly", sub: "Comfortable cooking or ordering chicken/mutton/fish", icon: "utensils" }
    ]
  },
  {
    id: "clean",
    category: "Cleanliness & Chores",
    weightCategory: "core",
    question: "How do you handle household tidiness & dishes?",
    desc: "How clean do you expect shared counters and living spaces to be?",
    options: [
      { value: "daily_tidy", label: "Spick & Span Daily", sub: "Dishes washed right away, clean counters daily", icon: "sparkles" },
      { value: "weekly_reset", label: "Weekly Maid Reset", sub: "Maid does basics, deep reset together on weekends", icon: "calendar" },
      { value: "chill_messy", label: "Chill & Relaxed", sub: "Low stress, clean when needed without fuss", icon: "coffee" }
    ]
  },
  {
    id: "work",
    category: "Work & College Routine",
    weightCategory: "lifestyle", // 35%
    question: "What does your typical day look like?",
    desc: "Helps determine house occupancy and Wi-Fi demand during the day.",
    options: [
      { value: "remote_wfh", label: "100% WFH / Remote", sub: "Desk bound at home 9 to 6 with video calls", icon: "laptop" },
      { value: "office_daily", label: "Office / College Daily", sub: "Out of the house from morning till evening", icon: "briefcase" },
      { value: "wfh_hybrid", label: "Hybrid / Flexible", sub: "A mix of campus/office and work from home", icon: "shuffle" }
    ]
  },
  {
    id: "guests",
    category: "Guests & Visitors",
    weightCategory: "lifestyle",
    question: "How do you feel about visitors and friends coming over?",
    desc: "Establishes mutual comfort around home privacy.",
    options: [
      { value: "sanctuary_quiet", label: "Quiet Sanctuary", sub: "Prefer home to be a peaceful, guest-free retreat", icon: "shield" },
      { value: "weekend_notice", label: "Notice & Weekends", sub: "Friends welcome with advance notice in group chat", icon: "message-square" },
      { value: "open_house", label: "Open & Social", sub: "Friends dropping by for chai, dinners or jam sessions", icon: "users" }
    ]
  },
  {
    id: "smoking",
    category: "Smoking Habits",
    weightCategory: "lifestyle",
    question: "What is your comfort level with smoking?",
    desc: "Non-negotiable health and comfort preference.",
    options: [
      { value: "non_smoker", label: "Strictly Non-Smoking", sub: "100% smoke-free home and balconies", icon: "ban" },
      { value: "balcony_only", label: "Balcony / Terrace Only", sub: "Outdoor smoking only, never inside bedrooms", icon: "wind" },
      { value: "smoker", label: "Smoker Friendly", sub: "Open minded, zero judgment", icon: "flame" }
    ]
  },
  {
    id: "drinking",
    category: "Weekend Relaxation",
    weightCategory: "lifestyle",
    question: "What is your stance on alcohol at home?",
    desc: "Helps match weekend expectations.",
    options: [
      { value: "teetotaler", label: "Teetotaler / Alcohol-free", sub: "Prefer an alcohol-free apartment", icon: "heart-handshake" },
      { value: "occasional", label: "Occasional / Social", sub: "A casual beer/wine on weekends with dinner", icon: "glass-water" },
      { value: "social", label: "Weekend Party Friendly", sub: "Enjoy weekend drinks and hosting small dinners", icon: "party-popper" }
    ]
  },
  {
    id: "ac",
    category: "AC & Electricity Bills",
    weightCategory: "lifestyle",
    question: "How do you like running the Air Conditioner?",
    desc: "Prevents heated arguments during summer bill splits.",
    options: [
      { value: "chilled_24h", label: "Chilled 24/7 (20°C)", sub: "Need AC running day & night to focus and sleep", icon: "snowflake" },
      { value: "night_only", label: "Night Time Only", sub: "AC for sound sleep, fan during daylight hours", icon: "moon" },
      { value: "fan_preferred", label: "Fan Preferred / Eco", sub: "Conscious of electricity bills, AC only on peak hot days", icon: "zap" }
    ]
  },
  {
    id: "noise",
    category: "Noise & Sound",
    weightCategory: "lifestyle",
    question: "How do you listen to music or take work calls?",
    desc: "Respecting personal acoustic focus.",
    options: [
      { value: "headphones_always", label: "Headphones Always", sub: "Near silent flat, headphones for meetings and music", icon: "headphones" },
      { value: "daytime_speakers", label: "Daytime Speakers OK", sub: "Low volume music during day, silent after 10 PM", icon: "volume-2" },
      { value: "speakers_welcome", label: "Music Vibe Welcome", sub: "Love background music, guitar jams, and podcasts", icon: "music" }
    ]
  },
  {
    id: "pets",
    category: "Pets & Animals",
    weightCategory: "vibe", // 15%
    question: "What is your stance on pets living in the apartment?",
    desc: "Allergies and pet love compatibility.",
    options: [
      { value: "pet_lover", label: "Love Pets / Have One", sub: "Cats and dogs bring joy to the flat", icon: "heart" },
      { value: "neutral", label: "Pet Neutral", sub: "Fine with pets as long as they are trained & tidy", icon: "smile" },
      { value: "no_pets", label: "No Pets Please", sub: "Allergies or prefer an animal-free flat", icon: "slash" }
    ]
  },
  {
    id: "bathroom",
    category: "Bathroom Arrangement",
    weightCategory: "vibe",
    question: "What is your bathroom setup preference?",
    desc: "Privacy comfort vs monthly rental budget.",
    options: [
      { value: "attached_only", label: "Attached Private Only", sub: "Must have my own private bathroom inside the bedroom", icon: "lock" },
      { value: "shared_ok", label: "Sharing with 1 is fine", sub: "Happy to share with one hygienic flatmate to save rent", icon: "check-circle" },
      { value: "budget_first", label: "Budget First", sub: "Common washroom is totally fine if rent is affordable", icon: "tag" }
    ]
  },
  {
    id: "conflict",
    category: "Communication Style",
    weightCategory: "vibe",
    question: "How do you prefer solving house chores and bill splits?",
    desc: "Clean communication makes great lifelong friendships.",
    options: [
      { value: "direct_whatsapp", label: "Direct & Prompt", sub: "Quick chat ping, settled immediately", icon: "send" },
      { value: "weekly_chai", label: "Weekly Chai Chat", sub: "Discuss groceries & plans informally over Sunday chai", icon: "coffee" },
      { value: "easygoing", label: "Easygoing / Flow", sub: "Relaxed attitude, rough rotation without micro-managing", icon: "smile" }
    ]
  }
];

/**
 * Toast notification fallback
 */
function notify(msg, type = "info") {
  if (typeof showToast === "function") {
    showToast(msg, type);
  } else {
    alert(msg);
  }
}

/**
 * Currency Formatter for Indian Rupee
 */
function formatINR(val) {
  if (!val && val !== 0) return "₹0";
  return `₹${Number(val).toLocaleString("en-IN")}`;
}

// =========================================================================
// 1. ROOMMATE MATCHING SYSTEM
// =========================================================================

/**
 * Calculates a match score between a user's quiz answers and a candidate
 * Core traits: 50%
 * Lifestyle traits: 35%
 * Vibe & Pets: 15%
 */
function calculateCompatibility(userAnswers, candidateTraits) {
  if (!userAnswers || Object.keys(userAnswers).length === 0) {
    return null;
  }

  let coreScore = 0;
  let coreCount = 0;
  let lifestyleScore = 0;
  let lifestyleCount = 0;
  let vibeScore = 0;
  let vibeCount = 0;

  QUIZ_QUESTIONS.forEach(q => {
    const userVal = userAnswers[q.id];
    const candidateVal = candidateTraits[q.id];
    if (!userVal || !candidateVal) return;

    let points = 0;
    if (userVal === candidateVal) {
      points = 100;
    } else {
      // Partial compatibility logic for nuanced pairings
      if (q.id === "sleep" && (userVal === "flexible" || candidateVal === "flexible")) points = 75;
      else if (q.id === "food" && (userVal === "eggetarian" || candidateVal === "eggetarian")) points = 80;
      else if (q.id === "smoking" && (userVal === "balcony_only" || candidateVal === "balcony_only")) points = 70;
      else if (q.id === "drinking" && (userVal === "occasional" || candidateVal === "occasional")) points = 80;
      else if (q.id === "clean" && (userVal === "weekly_reset" || candidateVal === "weekly_reset")) points = 75;
      else if (q.id === "pets" && (userVal === "neutral" || candidateVal === "neutral")) points = 85;
      else points = 40;
    }

    if (q.weightCategory === "core") {
      coreScore += points;
      coreCount++;
    } else if (q.weightCategory === "lifestyle") {
      lifestyleScore += points;
      lifestyleCount++;
    } else {
      vibeScore += points;
      vibeCount++;
    }
  });

  const avgCore = coreCount ? (coreScore / coreCount) : 85;
  const avgLifestyle = lifestyleCount ? (lifestyleScore / lifestyleCount) : 85;
  const avgVibe = vibeCount ? (vibeScore / vibeCount) : 85;

  const finalScore = Math.round((avgCore * 0.50) + (avgLifestyle * 0.35) + (avgVibe * 0.15));

  return {
    finalScore: Math.min(99, Math.max(60, finalScore)),
    corePct: Math.round(avgCore),
    lifestylePct: Math.round(avgLifestyle),
    vibePct: Math.round(avgVibe)
  };
}

/**
 * Initializes Roommate Matching Page
 */
async function initRoommateMatchPage() {
  const container = document.getElementById("roommates-grid");
  if (!container) return;

  // Render initial skeletons
  renderRoommateSkeletons(container, 6);

  // Fetch initial roommates
  try {
    StayState.roommates = await getRoommates("all");
    updateRoommateScores();
    renderRoommatesList();
    setupRoommateFilterListeners();
    renderQuizBannerState();
  } catch (err) {
    console.error("Failed to load roommates", err);
    container.innerHTML = `<div class="col-span-full py-12 text-center text-slate-500">Unable to load roommates right now.</div>`;
  }
}

/**
 * Updates roommate match scores if user has completed the quiz
 */
function updateRoommateScores() {
  if (!StayState.quizAnswers) return;

  StayState.roommates.forEach(r => {
    const match = calculateCompatibility(StayState.quizAnswers, r.traits);
    if (match) {
      r.matchScore = match.finalScore;
      r.calculatedBreakdown = match;
    }
  });

  // Sort by highest match score
  StayState.roommates.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
}

/**
 * Skeletons for smooth loading state
 */
function renderRoommateSkeletons(container, count = 6) {
  let html = "";
  for (let i = 0; i < count; i++) {
    html += `
      <div class="card p-6 flex flex-col gap-4 animate-pulse">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 rounded-2xl bg-slate-200 dark:bg-slate-800"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3"></div>
            <div class="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
          </div>
        </div>
        <div class="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full"></div>
        <div class="h-3 bg-slate-200 dark:bg-slate-800 rounded w-4/5"></div>
        <div class="flex gap-2 pt-2">
          <div class="h-7 bg-slate-200 dark:bg-slate-800 rounded-full w-20"></div>
          <div class="h-7 bg-slate-200 dark:bg-slate-800 rounded-full w-24"></div>
        </div>
      </div>
    `;
  }
  container.innerHTML = html;
}

/**
 * Renders the Roommate Cards into the grid container
 */
function renderRoommatesList() {
  const container = document.getElementById("roommates-grid");
  const countEl = document.getElementById("roommates-count");
  if (!container) return;

  const currentTab = StayState.activeGenderTab;
  const searchVal = (document.getElementById("roommate-search")?.value || "").toLowerCase().trim();
  const cityVal = document.getElementById("roommate-city-filter")?.value || "all";
  const budgetVal = document.getElementById("roommate-budget-filter")?.value || "all";

  let filtered = StayState.roommates.filter(r => {
    // Gender Tab filter
    if (currentTab !== "all") {
      if (currentTab === "co-ed") {
        if (r.gender !== "co-ed" && r.seeking !== "co-ed") return false;
      } else if (r.gender !== currentTab) {
        return false;
      }
    }

    // City filter
    if (cityVal !== "all" && r.city.toLowerCase() !== cityVal.toLowerCase()) {
      return false;
    }

    // Budget filter
    if (budgetVal !== "all") {
      const budgetNum = Number(budgetVal);
      if (r.budget > budgetNum) return false;
    }

    // Search filter
    if (searchVal) {
      const hay = `${r.name} ${r.role} ${r.city} ${(r.targetAreas || []).join(" ")} ${r.bio}`.toLowerCase();
      if (!hay.includes(searchVal)) return false;
    }

    return true;
  });

  if (countEl) {
    countEl.textContent = `${filtered.length} potential roommate${filtered.length === 1 ? '' : 's'} available`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center card p-8">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
          <i data-lucide="users" class="w-7 h-7"></i>
        </div>
        <h3 class="font-heading font-semibold text-lg text-slate-900 dark:text-white">No roommates match this criteria</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 mb-5">Try widening your budget filter, selecting 'All' gender tabs, or clearing your search keywords.</p>
        <button type="button" onclick="resetRoommateFilters()" class="btn btn-primary text-sm py-2 px-4">
          Reset All Filters
        </button>
      </div>
    `;
    if (typeof lucide !== "undefined") lucide.createIcons();
    return;
  }

  let html = "";
  filtered.forEach(r => {
    const isRequested = StayState.connections.includes(r.id);
    const score = r.matchScore || 90;
    
    // Trait chips formatting
    const sleepIcon = r.traits.sleep === "night_owl" ? "🌙 Night Owl" : r.traits.sleep === "early_bird" ? "☀️ Early Bird" : "⏰ Flexible Sleeper";
    const foodIcon = r.traits.food === "pure_veg" ? "🥗 Pure Veg" : r.traits.food === "eggetarian" ? "🍳 Eggetarian" : "🍗 Non-Veg OK";
    const cleanIcon = r.traits.clean === "daily_tidy" ? "🧹 Daily Tidy" : r.traits.clean === "weekly_reset" ? "🧼 Weekly Reset" : "☕ Chill Messy";
    const workIcon = r.traits.work === "remote_wfh" ? "💻 Remote WFH" : r.traits.work === "office_daily" ? "🏢 Office Daily" : "🔀 Hybrid Work";

    const areasList = (r.targetAreas || []).map(a => `<span class="inline-block bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] px-2 py-0.5 rounded-md font-medium mr-1 mb-1">${a}</span>`).join("");

    html += `
      <div class="card p-5 sm:p-6 flex flex-col justify-between hover:shadow-lg transition-all duration-300 relative group border border-slate-200 dark:border-slate-800">
        
        <div>
          <!-- Top Row: Match Pill & Verification -->
          <div class="flex items-center justify-between gap-2 mb-4">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-tight bg-lime-500/15 text-lime-700 dark:text-lime-300 border border-lime-500/25">
              <i data-lucide="sparkles" class="w-3.5 h-3.5 text-lime-600 dark:text-lime-400"></i>
              ${score}% Vibe Match
            </span>
            <span class="badge verified flex items-center gap-1">
              <i data-lucide="check" class="w-3 h-3"></i>
              ${r.verificationBadge || 'Verified'}
            </span>
          </div>

          <!-- Profile Head -->
          <div class="flex items-start gap-4 mb-4">
            <div class="relative flex-shrink-0">
              <img src="${r.avatar}" alt="${r.name}" class="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover ring-2 ring-indigo-500/20">
              <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" title="Active today"></span>
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="font-heading font-bold text-lg text-slate-900 dark:text-white truncate">${r.name}, ${r.age}</h3>
              <p class="text-xs font-medium text-indigo-600 dark:text-indigo-400 truncate">${r.role}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                <i data-lucide="map-pin" class="w-3.5 h-3.5 flex-shrink-0"></i>
                <span>${r.city}</span>
                <span class="text-slate-300 dark:text-slate-700">•</span>
                <span class="font-semibold text-slate-700 dark:text-slate-300">${r.budgetDisplay || formatINR(r.budget)}</span>
              </p>
            </div>
          </div>

          <!-- Target Localities -->
          <div class="mb-3">
            <p class="text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400 font-semibold mb-1">Target Areas</p>
            <div>${areasList}</div>
          </div>

          <!-- Lifestyle Badges -->
          <div class="grid grid-cols-2 gap-1.5 mb-4 text-xs font-medium text-slate-700 dark:text-slate-300">
            <div class="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-1.5 truncate">
              <span class="text-xs">${sleepIcon}</span>
            </div>
            <div class="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-1.5 truncate">
              <span class="text-xs">${foodIcon}</span>
            </div>
            <div class="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-1.5 truncate">
              <span class="text-xs">${cleanIcon}</span>
            </div>
            <div class="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-1.5 truncate">
              <span class="text-xs">${workIcon}</span>
            </div>
          </div>

          <!-- Authentic Bio -->
          <p class="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4 italic">
            "${r.bio}"
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
          <button 
            type="button" 
            onclick="openBreakdownModal('${r.id}')" 
            class="flex-1 btn btn-ghost text-xs py-2 px-2.5 rounded-xl text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1">
            <i data-lucide="pie-chart" class="w-3.5 h-3.5 text-indigo-500"></i>
            <span>Breakdown</span>
          </button>
          
          <button 
            type="button" 
            id="connect-btn-${r.id}"
            onclick="openConnectModal('${r.id}')" 
            class="flex-1 btn ${isRequested ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-default' : 'btn-primary'} text-xs py-2 px-2.5 rounded-xl flex items-center justify-center gap-1">
            <i data-lucide="${isRequested ? 'check' : 'message-circle'}" class="w-3.5 h-3.5"></i>
            <span>${isRequested ? 'Requested ✓' : 'Connect'}</span>
          </button>
        </div>

      </div>
    `;
  });

  container.innerHTML = html;
  if (typeof lucide !== "undefined") lucide.createIcons();
}

/**
 * Filter event listeners setup
 */
function setupRoommateFilterListeners() {
  // Tab buttons
  document.querySelectorAll("[data-gender-tab]").forEach(tabBtn => {
    tabBtn.addEventListener("click", () => {
      document.querySelectorAll("[data-gender-tab]").forEach(b => {
        b.classList.remove("bg-indigo-600", "text-white", "shadow-sm");
        b.classList.add("text-slate-600", "dark:text-slate-400", "hover:text-indigo-600");
      });
      tabBtn.classList.remove("text-slate-600", "dark:text-slate-400", "hover:text-indigo-600");
      tabBtn.classList.add("bg-indigo-600", "text-white", "shadow-sm");

      StayState.activeGenderTab = tabBtn.getAttribute("data-gender-tab");
      renderRoommatesList();
    });
  });

  // Search input
  const searchInput = document.getElementById("roommate-search");
  if (searchInput) {
    searchInput.addEventListener("input", debounce(() => {
      renderRoommatesList();
    }, 250));
  }

  // City and budget dropdowns
  const cityFilter = document.getElementById("roommate-city-filter");
  if (cityFilter) {
    cityFilter.addEventListener("change", () => renderRoommatesList());
  }

  const budgetFilter = document.getElementById("roommate-budget-filter");
  if (budgetFilter) {
    budgetFilter.addEventListener("change", () => renderRoommatesList());
  }
}

function resetRoommateFilters() {
  const searchInput = document.getElementById("roommate-search");
  if (searchInput) searchInput.value = "";

  const cityFilter = document.getElementById("roommate-city-filter");
  if (cityFilter) cityFilter.value = "all";

  const budgetFilter = document.getElementById("roommate-budget-filter");
  if (budgetFilter) budgetFilter.value = "all";

  StayState.activeGenderTab = "all";
  document.querySelectorAll("[data-gender-tab]").forEach(b => {
    if (b.getAttribute("data-gender-tab") === "all") {
      b.classList.add("bg-indigo-600", "text-white", "shadow-sm");
      b.classList.remove("text-slate-600", "dark:text-slate-400");
    } else {
      b.classList.remove("bg-indigo-600", "text-white", "shadow-sm");
      b.classList.add("text-slate-600", "dark:text-slate-400");
    }
  });

  renderRoommatesList();
  notify("Filters reset to default view.", "info");
}

/**
 * Updates the hero banner reflecting quiz completion status
 */
function renderQuizBannerState() {
  const banner = document.getElementById("quiz-status-banner");
  if (!banner) return;

  if (StayState.quizAnswers) {
    banner.innerHTML = `
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-lime-400/20 text-lime-700 dark:text-lime-400 flex items-center justify-center flex-shrink-0 font-bold">
            <i data-lucide="check-check" class="w-5 h-5"></i>
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-900 dark:text-white">Compatibility Quiz Active</p>
            <p class="text-xs text-slate-500 dark:text-slate-400">Match scores calculated according to your personal routine and habits.</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button type="button" onclick="openQuizModal(true)" class="btn btn-ghost text-xs py-2 px-3.5 rounded-xl border border-indigo-300 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50">
            Retake Quiz (12 Qs)
          </button>
        </div>
      </div>
    `;
  } else {
    banner.innerHTML = `
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-lime-500/10 to-indigo-500/10 border border-indigo-200/80 dark:border-indigo-800/60">
        <div class="flex items-center gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
            <i data-lucide="sparkles" class="w-5 h-5"></i>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <p class="text-sm font-bold text-slate-900 dark:text-white">Take the 2-Minute Vibe Quiz</p>
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-lime-400 text-slate-900 uppercase">Recommended</span>
            </div>
            <p class="text-xs text-slate-600 dark:text-slate-300 mt-0.5">Answer 12 rapid questions to personalize compatibility % for every roommate candidate.</p>
          </div>
        </div>
        <button type="button" onclick="openQuizModal()" class="btn btn-primary text-xs py-2.5 px-4 rounded-xl flex-shrink-0 shadow-md flex items-center gap-1.5">
          <span>Start Quiz Now</span>
          <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </button>
      </div>
    `;
  }
  if (typeof lucide !== "undefined") lucide.createIcons();
}

// =========================================================================
// 2. 12-QUESTION COMPATIBILITY QUIZ MODAL
// =========================================================================

let tempAnswers = {};

function openQuizModal(isRetake = false) {
  const modal = document.getElementById("quiz-modal");
  if (!modal) return;

  tempAnswers = StayState.quizAnswers ? { ...StayState.quizAnswers } : {};
  StayState.currentQuizIndex = 0;

  renderQuizStep();
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeQuizModal() {
  const modal = document.getElementById("quiz-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
}

function renderQuizStep() {
  const questionContainer = document.getElementById("quiz-question-container");
  const progressFill = document.getElementById("quiz-progress-fill");
  const stepLabel = document.getElementById("quiz-step-label");
  const prevBtn = document.getElementById("quiz-prev-btn");
  const nextBtn = document.getElementById("quiz-next-btn");

  if (!questionContainer) return;

  const currentQ = QUIZ_QUESTIONS[StayState.currentQuizIndex];
  const total = QUIZ_QUESTIONS.length;
  const currentNum = StayState.currentQuizIndex + 1;
  const progressPct = Math.round((currentNum / total) * 100);

  if (progressFill) progressFill.style.width = `${progressPct}%`;
  if (stepLabel) stepLabel.textContent = `Question ${currentNum} of ${total} (${currentQ.category})`;

  if (prevBtn) {
    if (StayState.currentQuizIndex === 0) {
      prevBtn.classList.add("invisible");
    } else {
      prevBtn.classList.remove("invisible");
    }
  }

  const selectedValue = tempAnswers[currentQ.id];

  if (nextBtn) {
    nextBtn.textContent = currentNum === total ? "Calculate My Vibe Score ✨" : "Next Question →";
    nextBtn.disabled = !selectedValue;
    if (!selectedValue) {
      nextBtn.classList.add("opacity-50", "cursor-not-allowed");
    } else {
      nextBtn.classList.remove("opacity-50", "cursor-not-allowed");
    }
  }

  let optionsHtml = "";
  currentQ.options.forEach(opt => {
    const isSelected = selectedValue === opt.value;
    optionsHtml += `
      <div 
        onclick="selectQuizOption('${currentQ.id}', '${opt.value}')"
        class="cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 ${
          isSelected 
            ? 'bg-indigo-50/80 dark:bg-indigo-950/60 border-indigo-600 ring-2 ring-indigo-500/30' 
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
        }">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isSelected 
            ? 'bg-indigo-600 text-white' 
            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
        }">
          <i data-lucide="${opt.icon || 'circle'}" class="w-5 h-5"></i>
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-bold text-slate-900 dark:text-white">${opt.label}</h4>
            <div class="w-5 h-5 rounded-full border flex items-center justify-center ${
              isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 dark:border-slate-700'
            }">
              ${isSelected ? '<i data-lucide="check" class="w-3 h-3 stroke-[3]"></i>' : ''}
            </div>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${opt.sub}</p>
        </div>
      </div>
    `;
  });

  questionContainer.innerHTML = `
    <div class="mb-4">
      <span class="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">${currentQ.category}</span>
      <h3 class="font-heading font-bold text-lg sm:text-xl text-slate-900 dark:text-white mt-1">${currentQ.question}</h3>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${currentQ.desc}</p>
    </div>
    <div class="space-y-3">
      ${optionsHtml}
    </div>
  `;

  if (typeof lucide !== "undefined") lucide.createIcons();
}

function selectQuizOption(qId, val) {
  tempAnswers[qId] = val;
  renderQuizStep();

  // Subtle auto-advance after 300ms if not on the last question
  if (StayState.currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
    setTimeout(() => {
      StayState.currentQuizIndex++;
      renderQuizStep();
    }, 280);
  }
}

function handleQuizNext() {
  if (StayState.currentQuizIndex < QUIZ_QUESTIONS.length - 1) {
    StayState.currentQuizIndex++;
    renderQuizStep();
  } else {
    finishQuiz();
  }
}

function handleQuizPrev() {
  if (StayState.currentQuizIndex > 0) {
    StayState.currentQuizIndex--;
    renderQuizStep();
  }
}

function finishQuiz() {
  StayState.quizAnswers = { ...tempAnswers };
  localStorage.setItem("jhoomrahi_quiz_answers", JSON.stringify(StayState.quizAnswers));

  closeQuizModal();

  // Confetti celebration
  if (typeof confetti === "function") {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#6366f1", "#a3e635", "#fb7185", "#f59e0b"]
    });
  }

  updateRoommateScores();
  renderRoommatesList();
  renderQuizBannerState();

  notify("Vibe match calculations updated! Highest matches sorted to top.", "success");
}

// =========================================================================
// 3. MATCH BREAKDOWN MODAL
// =========================================================================

function openBreakdownModal(roommateId) {
  const modal = document.getElementById("breakdown-modal");
  const content = document.getElementById("breakdown-modal-content");
  if (!modal || !content) return;

  const r = StayState.roommates.find(item => item.id === roommateId);
  if (!r) return;

  const score = r.matchScore || 90;
  const breakdown = r.calculatedBreakdown || {
    corePct: 94,
    lifestylePct: 92,
    vibePct: 90
  };

  content.innerHTML = `
    <div class="flex items-center gap-4 mb-6">
      <img src="${r.avatar}" alt="${r.name}" class="w-16 h-16 rounded-2xl object-cover ring-2 ring-indigo-500/20">
      <div>
        <h3 class="font-heading font-bold text-lg text-slate-900 dark:text-white">${r.name}</h3>
        <p class="text-xs text-indigo-600 dark:text-indigo-400 font-medium">${r.role} · ${r.city}</p>
        <p class="text-xs text-slate-500 mt-0.5">Budget: ${r.budgetDisplay || formatINR(r.budget)}</p>
      </div>
      <div class="ml-auto text-right">
        <span class="inline-block text-2xl font-heading font-bold text-lime-600 dark:text-lime-400">${score}%</span>
        <span class="block text-[10px] text-slate-500 font-semibold uppercase">Overall Vibe</span>
      </div>
    </div>

    <!-- Category Progress Bars -->
    <div class="space-y-4 mb-6">
      <div>
        <div class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          <span>Core Habits (Sleep, Food, Cleanliness) — 50%</span>
          <span class="text-indigo-600 dark:text-indigo-400">${breakdown.corePct}%</span>
        </div>
        <div class="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div class="bg-indigo-600 h-full rounded-full transition-all duration-500" style="width: ${breakdown.corePct}%"></div>
        </div>
      </div>

      <div>
        <div class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          <span>Daily Lifestyle (Work, Guests, Smoking, AC) — 35%</span>
          <span class="text-lime-600 dark:text-lime-400">${breakdown.lifestylePct}%</span>
        </div>
        <div class="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div class="bg-lime-500 h-full rounded-full transition-all duration-500" style="width: ${breakdown.lifestylePct}%"></div>
        </div>
      </div>

      <div>
        <div class="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
          <span>Vibe & Pets (Pets, Washroom, Conflict Style) — 15%</span>
          <span class="text-amber-600 dark:text-amber-400">${breakdown.vibePct}%</span>
        </div>
        <div class="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
          <div class="bg-amber-500 h-full rounded-full transition-all duration-500" style="width: ${breakdown.vibePct}%"></div>
        </div>
      </div>
    </div>

    <!-- Trait Comparison Pill Matrix -->
    <div class="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 mb-6 text-xs space-y-2">
      <p class="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[10px]">Lifestyle Harmony Checklist</p>
      
      <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
        <span>🌙 Sleep Rhythm</span>
        <span class="font-semibold text-slate-900 dark:text-white capitalize">${(r.traits.sleep || '').replace('_', ' ')}</span>
      </div>

      <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
        <span>🥗 Kitchen Comfort</span>
        <span class="font-semibold text-slate-900 dark:text-white capitalize">${(r.traits.food || '').replace('_', ' ')}</span>
      </div>

      <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
        <span>🧹 Cleanliness Approach</span>
        <span class="font-semibold text-slate-900 dark:text-white capitalize">${(r.traits.clean || '').replace('_', ' ')}</span>
      </div>

      <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
        <span>🚭 Smoking Tolerance</span>
        <span class="font-semibold text-slate-900 dark:text-white capitalize">${(r.traits.smoking || '').replace('_', ' ')}</span>
      </div>

      <div class="flex items-center justify-between text-slate-600 dark:text-slate-300">
        <span>🐾 Pet Friendliness</span>
        <span class="font-semibold text-slate-900 dark:text-white capitalize">${(r.traits.pets || '').replace('_', ' ')}</span>
      </div>
    </div>

    <!-- Quick Footer Actions -->
    <div class="flex items-center justify-end gap-3">
      <button type="button" onclick="closeBreakdownModal()" class="btn btn-ghost text-xs py-2 px-4 rounded-xl">
        Close
      </button>
      <button type="button" onclick="closeBreakdownModal(); openConnectModal('${r.id}')" class="btn btn-primary text-xs py-2 px-4 rounded-xl flex items-center gap-1.5">
        <i data-lucide="message-circle" class="w-4 h-4"></i>
        <span>Connect with ${r.name.split(' ')[0]}</span>
      </button>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
  if (typeof lucide !== "undefined") lucide.createIcons();
}

function closeBreakdownModal() {
  const modal = document.getElementById("breakdown-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
}

// =========================================================================
// 4. CONNECT / ICEBREAKER MODAL
// =========================================================================

function openConnectModal(roommateId) {
  const modal = document.getElementById("connect-modal");
  const content = document.getElementById("connect-modal-content");
  if (!modal || !content) return;

  const r = StayState.roommates.find(item => item.id === roommateId);
  if (!r) return;

  const score = r.matchScore || 90;
  const targetArea = (r.targetAreas && r.targetAreas[0]) || r.city;
  const defaultIcebreaker = `Hey ${r.name.split(' ')[0]}! Saw your profile on JhoomRahi — our vibe match is ${score}%. I'm looking for a place in ${targetArea} around the same budget. Are you open to teaming up for a flat?`;

  content.innerHTML = `
    <div class="flex items-center gap-3.5 mb-4">
      <img src="${r.avatar}" alt="${r.name}" class="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/20">
      <div>
        <h4 class="font-heading font-bold text-base text-slate-900 dark:text-white">Connect with ${r.name}</h4>
        <p class="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">${score}% Compatibility · ${r.city}</p>
      </div>
    </div>

    <div class="mb-4">
      <label class="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
        Custom Icebreaker Message
      </label>
      <textarea 
        id="connect-message-input" 
        rows="4" 
        class="input text-xs leading-relaxed" 
        placeholder="Introduce yourself briefly...">${defaultIcebreaker}</textarea>
      <p class="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1.5">
        <i data-lucide="shield-check" class="w-3.5 h-3.5 text-emerald-500 flex-shrink-0"></i>
        <span>Direct contact details are exchanged only via JhoomRahi secure chat/call after both accept.</span>
      </p>
    </div>

    <div class="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
      <button type="button" onclick="closeConnectModal()" class="btn btn-ghost text-xs py-2 px-3.5 rounded-xl">
        Cancel
      </button>
      <button type="button" onclick="sendConnectionRequest('${r.id}')" class="btn btn-primary text-xs py-2 px-5 rounded-xl flex items-center gap-1.5 font-bold shadow-md">
        <i data-lucide="send" class="w-3.5 h-3.5"></i>
        <span>Send Request</span>
      </button>
    </div>
  `;

  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
  if (typeof lucide !== "undefined") lucide.createIcons();
}

function closeConnectModal() {
  const modal = document.getElementById("connect-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
}

function sendConnectionRequest(roommateId) {
  const msgInput = document.getElementById("connect-message-input");
  const msg = msgInput ? msgInput.value : "";

  if (!StayState.connections.includes(roommateId)) {
    StayState.connections.push(roommateId);
    localStorage.setItem("jhoomrahi_connection_requests", JSON.stringify(StayState.connections));
  }

  closeConnectModal();

  // Update button state on card
  const btn = document.getElementById(`connect-btn-${roommateId}`);
  if (btn) {
    btn.className = "flex-1 btn bg-slate-100 dark:bg-slate-800 text-slate-500 cursor-default text-xs py-2 px-2.5 rounded-xl flex items-center justify-center gap-1";
    btn.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5"></i><span>Requested ✓</span>`;
    if (typeof lucide !== "undefined") lucide.createIcons();
  }

  notify("In-app flatmate request sent! You'll be notified when they accept.", "success");
}

// =========================================================================
// 5. BROWSE PGS & FLATS
// =========================================================================

let browseViewMode = "list"; // "list" | "map"

async function initBrowsePage() {
  const container = document.getElementById("browse-listings-grid");
  if (!container) return;

  renderPGSkeletons(container, 6);

  try {
    StayState.pgs = await getPGs();
    renderPGListings();
    setupBrowseFilterListeners();
  } catch (err) {
    console.error("Failed to load PG listings", err);
    container.innerHTML = `<div class="col-span-full py-12 text-center text-slate-500">Failed to load stays. Please refresh.</div>`;
  }
}

function renderPGSkeletons(container, count = 6) {
  let html = "";
  for (let i = 0; i < count; i++) {
    html += `
      <div class="card overflow-hidden animate-pulse flex flex-col">
        <div class="h-48 bg-slate-200 dark:bg-slate-800 w-full"></div>
        <div class="p-5 flex-1 flex flex-col gap-3">
          <div class="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
          <div class="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
          <div class="h-8 bg-slate-200 dark:bg-slate-800 rounded mt-auto"></div>
        </div>
      </div>
    `;
  }
  container.innerHTML = html;
}

function renderPGListings() {
  const container = document.getElementById("browse-listings-grid");
  const countEl = document.getElementById("browse-count-label");
  const mapContainer = document.getElementById("browse-map-view");
  if (!container) return;

  const cityVal = document.getElementById("filter-city")?.value || "all";
  const genderVal = document.querySelector("input[name='filter-gender']:checked")?.value || "all";
  const maxRentVal = document.getElementById("filter-rent-slider")?.value || 35000;
  const typeVal = document.getElementById("filter-type")?.value || "all";
  const searchVal = (document.getElementById("browse-search")?.value || "").toLowerCase().trim();

  // Checked amenities
  const checkedAmenities = Array.from(document.querySelectorAll("input[name='filter-amenity']:checked")).map(el => el.value.toLowerCase());

  let filtered = StayState.pgs.filter(item => {
    if (cityVal !== "all" && item.city.toLowerCase() !== cityVal.toLowerCase()) return false;
    if (genderVal !== "all" && item.gender !== genderVal && item.gender !== "unisex") return false;
    if (item.rent > Number(maxRentVal)) return false;
    if (typeVal !== "all" && !item.type.toLowerCase().includes(typeVal.toLowerCase())) return false;

    if (checkedAmenities.length > 0) {
      const itemAmens = (item.amenities || []).map(a => a.toLowerCase());
      const hasAll = checkedAmenities.every(needed => itemAmens.some(a => a.includes(needed)));
      if (!hasAll) return false;
    }

    if (searchVal) {
      const text = `${item.title} ${item.area} ${item.city} ${item.type} ${(item.amenities || []).join(' ')}`.toLowerCase();
      if (!text.includes(searchVal)) return false;
    }

    return true;
  });

  if (countEl) {
    countEl.textContent = `${filtered.length} stay${filtered.length === 1 ? '' : 's'} available with zero brokerage`;
  }

  // Toggle view rendering
  if (browseViewMode === "map") {
    container.classList.add("hidden");
    if (mapContainer) {
      mapContainer.classList.remove("hidden");
      renderMockMapView(mapContainer, filtered);
    }
    return;
  } else {
    container.classList.remove("hidden");
    if (mapContainer) mapContainer.classList.add("hidden");
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center card p-8">
        <div class="w-14 h-14 mx-auto rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
          <i data-lucide="home" class="w-7 h-7"></i>
        </div>
        <h3 class="font-heading font-semibold text-lg text-slate-900 dark:text-white">No Stays Found</h3>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 mb-5">Try relaxing your budget slider or clearing amenity filters.</p>
        <button type="button" onclick="resetBrowseFilters()" class="btn btn-primary text-sm py-2 px-4">
          Reset Filters
        </button>
      </div>
    `;
    if (typeof lucide !== "undefined") lucide.createIcons();
    return;
  }

  let html = "";
  filtered.forEach(item => {
    const isSaved = StayState.savedPGs.includes(item.id);
    const coverImg = (item.images && item.images[0]) || "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800";
    const amenitiesSnippet = (item.amenities || []).slice(0, 3).map(a => `<span class="inline-block text-[11px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md">${a}</span>`).join("");

    html += `
      <div class="card overflow-hidden flex flex-col group border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300">
        <!-- Image & Tags -->
        <div class="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img src="${coverImg}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          
          <div class="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span class="badge verified text-[11px]">
              <i data-lucide="shield-check" class="w-3 h-3 mr-1"></i>
              Verified
            </span>
            <span class="badge bg-slate-900/80 text-white backdrop-blur-sm text-[11px]">
              ${item.roomType || item.type}
            </span>
          </div>

          <!-- Save Button -->
          <button 
            type="button" 
            onclick="toggleSavePG('${item.id}', event)" 
            class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 backdrop-blur-sm flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm">
            <i data-lucide="heart" class="w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}"></i>
          </button>

          <!-- Rent Overlay -->
          <div class="absolute bottom-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-slate-200/50 dark:border-slate-800/50">
            <span class="font-heading font-bold text-base text-slate-900 dark:text-white">${item.displayRent || formatINR(item.rent)}</span>
            <span class="text-[10px] text-slate-500 font-medium">· Zero Brokerage</span>
          </div>
        </div>

        <!-- Body Details -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-start justify-between gap-2 mb-1">
              <h3 class="font-heading font-bold text-base text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 transition-colors">
                ${item.title}
              </h3>
              <div class="flex items-center gap-1 text-xs font-bold text-amber-500 flex-shrink-0">
                <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-400 text-amber-400"></i>
                <span>${item.rating || 4.8}</span>
              </div>
            </div>

            <p class="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mb-3">
              <i data-lucide="map-pin" class="w-3.5 h-3.5 flex-shrink-0 text-slate-400"></i>
              <span class="truncate">${item.area}, ${item.city}</span>
            </p>

            <div class="flex flex-wrap gap-1.5 mb-4">
              ${amenitiesSnippet}
            </div>
          </div>

          <div class="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div class="text-[11px] text-slate-500">
              <span>Deposit: </span>
              <span class="font-semibold text-slate-700 dark:text-slate-300">${item.displayDeposit || '1 Month'}</span>
            </div>

            <a href="detail.html?id=${item.id}" class="btn btn-primary text-xs py-1.5 px-3 rounded-xl flex items-center gap-1">
              <span>View Details</span>
              <i data-lucide="chevron-right" class="w-3.5 h-3.5"></i>
            </a>
          </div>

        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  if (typeof lucide !== "undefined") lucide.createIcons();
}

function setupBrowseFilterListeners() {
  const citySelect = document.getElementById("filter-city");
  if (citySelect) citySelect.addEventListener("change", renderPGListings);

  document.querySelectorAll("input[name='filter-gender']").forEach(radio => {
    radio.addEventListener("change", renderPGListings);
  });

  const rentSlider = document.getElementById("filter-rent-slider");
  const rentValDisplay = document.getElementById("filter-rent-display");
  if (rentSlider) {
    rentSlider.addEventListener("input", (e) => {
      if (rentValDisplay) rentValDisplay.textContent = formatINR(e.target.value);
      renderPGListings();
    });
  }

  const typeSelect = document.getElementById("filter-type");
  if (typeSelect) typeSelect.addEventListener("change", renderPGListings);

  document.querySelectorAll("input[name='filter-amenity']").forEach(cb => {
    cb.addEventListener("change", renderPGListings);
  });

  const searchInput = document.getElementById("browse-search");
  if (searchInput) {
    searchInput.addEventListener("input", debounce(renderPGListings, 250));
  }
}

function resetBrowseFilters() {
  const city = document.getElementById("filter-city");
  if (city) city.value = "all";

  const allGender = document.getElementById("gender-all");
  if (allGender) allGender.checked = true;

  const rentSlider = document.getElementById("filter-rent-slider");
  const rentValDisplay = document.getElementById("filter-rent-display");
  if (rentSlider) {
    rentSlider.value = 35000;
    if (rentValDisplay) rentValDisplay.textContent = "₹35,000";
  }

  const type = document.getElementById("filter-type");
  if (type) type.value = "all";

  document.querySelectorAll("input[name='filter-amenity']").forEach(cb => cb.checked = false);

  const searchInput = document.getElementById("browse-search");
  if (searchInput) searchInput.value = "";

  renderPGListings();
  notify("All browse filters reset.", "info");
}

function toggleViewMode(mode) {
  browseViewMode = mode;
  const listBtn = document.getElementById("view-mode-list-btn");
  const mapBtn = document.getElementById("view-mode-map-btn");

  if (mode === "list") {
    if (listBtn) {
      listBtn.classList.add("bg-white", "dark:bg-slate-800", "shadow-sm", "text-indigo-600");
      listBtn.classList.remove("text-slate-500");
    }
    if (mapBtn) {
      mapBtn.classList.remove("bg-white", "dark:bg-slate-800", "shadow-sm", "text-indigo-600");
      mapBtn.classList.add("text-slate-500");
    }
  } else {
    if (mapBtn) {
      mapBtn.classList.add("bg-white", "dark:bg-slate-800", "shadow-sm", "text-indigo-600");
      mapBtn.classList.remove("text-slate-500");
    }
    if (listBtn) {
      listBtn.classList.remove("bg-white", "dark:bg-slate-800", "shadow-sm", "text-indigo-600");
      listBtn.classList.add("text-slate-500");
    }
  }

  renderPGListings();
}

function renderMockMapView(container, items) {
  let pins = items.map((p, idx) => {
    return `
      <div 
        onclick="highlightMapPin('${p.id}')"
        class="cursor-pointer group flex items-center gap-2 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-500 hover:shadow-md transition-all">
        <div class="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
          ${idx + 1}
        </div>
        <div class="min-w-0 flex-1">
          <h4 class="text-xs font-bold text-slate-900 dark:text-white truncate">${p.title}</h4>
          <p class="text-[11px] text-slate-500 truncate">${p.area}</p>
        </div>
        <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 whitespace-nowrap">${p.displayRent}</span>
      </div>
    `;
  }).join("");

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
      
      <!-- Interactive SVG Style Map Graphic -->
      <div class="lg:col-span-7 card relative overflow-hidden bg-slate-100 dark:bg-slate-900/60 min-h-[400px] flex items-center justify-center p-6 border border-slate-200 dark:border-slate-800">
        
        <!-- Mock Map Grid Graphic -->
        <svg class="absolute inset-0 w-full h-full opacity-30 dark:opacity-15" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" stroke-width="1" class="text-slate-400 dark:text-slate-700"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>

        <!-- Simulated Road Arteries -->
        <div class="absolute w-full h-1 bg-indigo-500/20 rotate-12"></div>
        <div class="absolute w-full h-2 bg-slate-300 dark:bg-slate-700 -rotate-45"></div>
        <div class="absolute w-2 h-full bg-slate-300 dark:bg-slate-700 left-1/3"></div>

        <!-- Simulated Interactive Location Pins -->
        <div class="relative z-10 w-full h-full flex flex-wrap items-center justify-around p-8">
          ${items.map((p, idx) => `
            <a 
              href="detail.html?id=${p.id}" 
              class="m-3 p-2 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-indigo-600 shadow-xl flex items-center gap-1.5 hover:scale-110 transition-transform">
              <div class="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">${idx + 1}</div>
              <span class="text-xs font-bold">${p.displayRent}</span>
            </a>
          `).join('')}
        </div>

        <div class="absolute bottom-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500">
          Showing ${items.length} mapped locations
        </div>
      </div>

      <!-- Side listings on map -->
      <div class="lg:col-span-5 space-y-2.5 max-h-[550px] overflow-y-auto pr-1">
        ${pins}
      </div>

    </div>
  `;
}

function highlightMapPin(id) {
  window.location.href = `detail.html?id=${id}`;
}

function toggleSavePG(pgId, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }

  const index = StayState.savedPGs.indexOf(pgId);
  if (index > -1) {
    StayState.savedPGs.splice(index, 1);
    notify("Removed from saved stays.", "info");
  } else {
    StayState.savedPGs.push(pgId);
    notify("Saved to your shortlist!", "success");
  }

  localStorage.setItem("jhoomrahi_saved_pgs", JSON.stringify(StayState.savedPGs));
  renderPGListings();
}

// =========================================================================
// 6. SINGLE PG DETAIL PAGE
// =========================================================================

async function initDetailPage() {
  const container = document.getElementById("pg-detail-container");
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const pgId = urlParams.get("id") || "pg-blr-hsr-01";

  try {
    const item = await getPGById(pgId);
    if (!item) {
      container.innerHTML = `
        <div class="py-20 text-center card p-10 max-w-xl mx-auto my-12">
          <h2 class="font-heading font-bold text-xl text-slate-900 dark:text-white">Listing Not Found</h2>
          <p class="text-sm text-slate-500 mt-2 mb-6">This property listing may have expired or been filled.</p>
          <a href="browse.html" class="btn btn-primary text-sm py-2 px-5">Browse All Stays</a>
        </div>
      `;
      return;
    }

    StayState.activeDetailPG = item;
    renderDetailView(item);
  } catch (err) {
    console.error("Failed to render detail page", err);
    container.innerHTML = `<div class="py-16 text-center text-slate-500">Could not load listing details.</div>`;
  }
}

function renderDetailView(item) {
  const container = document.getElementById("pg-detail-container");
  if (!container) return;

  const isSaved = StayState.savedPGs.includes(item.id);
  const images = item.images || [
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800"
  ];

  const breakdown = item.rentBreakdown || {
    baseRent: item.rent || 12000,
    maintenance: 1500,
    electricity: "Sub-meter as per usage",
    securityDeposit: item.deposit || 12000,
    brokerage: 0
  };

  const totalFirstMonth = (Number(breakdown.baseRent) || 0) + (Number(breakdown.maintenance) || 0) + (Number(breakdown.securityDeposit) || 0);

  const amenitiesHtml = (item.amenities || []).map(amen => `
    <div class="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
      <div class="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
        <i data-lucide="check" class="w-4 h-4"></i>
      </div>
      <span class="text-xs font-semibold text-slate-800 dark:text-slate-200">${amen}</span>
    </div>
  `).join("");

  container.innerHTML = `
    <!-- Top Breadcrumbs -->
    <div class="flex items-center gap-2 text-xs text-slate-500 mb-6">
      <a href="../index.html" class="hover:text-indigo-600">Home</a>
      <span>/</span>
      <a href="browse.html" class="hover:text-indigo-600">Stay</a>
      <span>/</span>
      <span class="text-slate-800 dark:text-slate-200 font-semibold truncate">${item.title}</span>
    </div>

    <!-- Title & Action Bar -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <div class="flex flex-wrap items-center gap-2 mb-2">
          <span class="badge verified text-xs">
            <i data-lucide="shield-check" class="w-3.5 h-3.5 mr-1"></i>
            Physical Visit Verified
          </span>
          <span class="badge bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 text-xs">
            ${item.roomType || item.type}
          </span>
          <span class="badge bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs capitalize">
            ${item.gender}
          </span>
        </div>
        <h1 class="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white leading-tight">
          ${item.title}
        </h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1">
          <i data-lucide="map-pin" class="w-4 h-4 text-slate-400 flex-shrink-0"></i>
          <span>${item.fullAddress || `${item.area}, ${item.city}`}</span>
          ${item.metroDistance ? `<span class="text-slate-300 dark:text-slate-700">•</span><span class="text-indigo-600 dark:text-indigo-400 font-medium">${item.metroDistance}</span>` : ''}
        </p>
      </div>

      <div class="flex items-center gap-2 flex-shrink-0">
        <button 
          type="button" 
          onclick="toggleSavePG('${item.id}')"
          class="btn btn-ghost text-xs py-2.5 px-4 rounded-xl flex items-center gap-2">
          <i data-lucide="heart" class="w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}"></i>
          <span>${isSaved ? 'Saved' : 'Shortlist'}</span>
        </button>
        <button 
          type="button" 
          onclick="shareListing('${item.title}')"
          class="btn btn-ghost text-xs py-2.5 px-3 rounded-xl flex items-center justify-center">
          <i data-lucide="share-2" class="w-4 h-4"></i>
        </button>
      </div>
    </div>

    <!-- Photo Gallery Grid -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-3 rounded-3xl overflow-hidden mb-10 shadow-sm border border-slate-200 dark:border-slate-800">
      <div class="md:col-span-2 md:row-span-2 h-72 sm:h-96 relative group cursor-pointer" onclick="openPhotoViewer(0)">
        <img id="detail-active-img" src="${images[0]}" alt="${item.title}" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
      </div>
      ${images.slice(1, 4).map((img, idx) => `
        <div class="h-36 sm:h-48 relative group cursor-pointer" onclick="openPhotoViewer(${idx + 1})">
          <img src="${img}" alt="${item.title}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors"></div>
        </div>
      `).join('')}
    </div>

    <!-- Main Content & Sticky Rent Card Split -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
      
      <!-- Left 7 Cols: Overview, Amenities, Rules, Host -->
      <div class="lg:col-span-7 space-y-8">
        
        <!-- About Property -->
        <div class="card p-6 sm:p-7">
          <h2 class="font-heading font-bold text-lg text-slate-900 dark:text-white mb-3">About this Stay</h2>
          <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            ${item.description || item.tagline}
          </p>
          <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-6 text-xs text-slate-500">
            <div>
              <span class="block text-slate-400">Rating</span>
              <span class="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1 mt-0.5">
                <i data-lucide="star" class="w-4 h-4 fill-amber-400 text-amber-400"></i>
                ${item.rating || 4.8} (${item.reviewsCount || 24} student reviews)
              </span>
            </div>
            <div>
              <span class="block text-slate-400">Brokerage</span>
              <span class="font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5">₹0 Guarantee</span>
            </div>
          </div>
        </div>

        <!-- Amenities -->
        <div class="card p-6 sm:p-7">
          <h2 class="font-heading font-bold text-lg text-slate-900 dark:text-white mb-4">What this stay offers</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            ${amenitiesHtml}
          </div>
        </div>

        <!-- House Rules -->
        <div class="card p-6 sm:p-7">
          <h2 class="font-heading font-bold text-lg text-slate-900 dark:text-white mb-4">House Rules & Policies</h2>
          <div class="space-y-3 text-xs">
            <div class="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <i data-lucide="clock" class="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5"></i>
              <div>
                <p class="font-bold text-slate-900 dark:text-white">Curfew / Entry Timings</p>
                <p class="text-slate-500 mt-0.5">${item.rules?.curfew || 'No curfew'}</p>
              </div>
            </div>

            <div class="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <i data-lucide="users" class="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5"></i>
              <div>
                <p class="font-bold text-slate-900 dark:text-white">Visitors Policy</p>
                <p class="text-slate-500 mt-0.5">${item.rules?.visitors || 'Visitors allowed in common areas'}</p>
              </div>
            </div>

            <div class="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <i data-lucide="utensils" class="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5"></i>
              <div>
                <p class="font-bold text-slate-900 dark:text-white">Food & Mess Rules</p>
                <p class="text-slate-500 mt-0.5">${item.rules?.foodPolicy || 'Homestyle hygienic meals'}</p>
              </div>
            </div>

            <div class="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60">
              <i data-lucide="wind" class="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5"></i>
              <div>
                <p class="font-bold text-slate-900 dark:text-white">Smoking & Pet Policy</p>
                <p class="text-slate-500 mt-0.5">${item.rules?.smoking || 'Designated outdoor zone only'} · ${item.rules?.pets || 'Pets policy as per host'}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Host Card -->
        <div class="card p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 rounded-2xl bg-indigo-600 text-white font-heading font-bold text-xl flex items-center justify-center flex-shrink-0">
              ${(item.host?.name || 'H').charAt(0)}
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="font-heading font-bold text-base text-slate-900 dark:text-white">${item.host?.name || 'Property Warden'}</h3>
                <span class="badge verified text-[10px]">${item.host?.badge || 'Verified'}</span>
              </div>
              <p class="text-xs text-slate-500 mt-0.5">${item.host?.role || 'Host & Caretaker'} · Responds ${item.host?.responseRate || 'within an hour'}</p>
            </div>
          </div>
          <button type="button" onclick="openScheduleVisitModal()" class="btn btn-secondary text-xs py-2 px-4 rounded-xl flex items-center gap-1.5 flex-shrink-0">
            <i data-lucide="calendar" class="w-4 h-4"></i>
            <span>Schedule Free Visit</span>
          </button>
        </div>

      </div>

      <!-- Right 5 Cols: Sticky Rent Breakdown & Direct Connect -->
      <div class="lg:col-span-5 sticky top-24 space-y-6">
        
        <!-- Rent Breakdown Card -->
        <div class="card p-6 sm:p-7 shadow-xl border-2 border-indigo-500/20">
          <div class="flex items-baseline justify-between mb-4">
            <div>
              <span class="font-heading font-bold text-3xl text-slate-900 dark:text-white">${item.displayRent || formatINR(item.rent)}</span>
              <span class="text-xs text-slate-500 font-medium">/ month</span>
            </div>
            <span class="badge verified">No Brokerage</span>
          </div>

          <!-- Breakdown Line Items -->
          <div class="space-y-2.5 py-4 border-y border-slate-100 dark:border-slate-800 text-xs">
            <div class="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Base Room Rent</span>
              <span class="font-semibold text-slate-900 dark:text-white">${formatINR(breakdown.baseRent)}</span>
            </div>
            <div class="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Maintenance & Wi-Fi</span>
              <span class="font-semibold text-slate-900 dark:text-white">${formatINR(breakdown.maintenance)}</span>
            </div>
            <div class="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Electricity Policy</span>
              <span class="font-semibold text-slate-900 dark:text-white">${breakdown.electricity}</span>
            </div>
            <div class="flex justify-between text-slate-600 dark:text-slate-300">
              <span>Refundable Security Deposit</span>
              <span class="font-semibold text-slate-900 dark:text-white">${formatINR(breakdown.securityDeposit)}</span>
            </div>
            <div class="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
              <span>Brokerage Fee</span>
              <span>₹0 FREE</span>
            </div>
          </div>

          <!-- Total Move-in calculation -->
          <div class="flex items-center justify-between pt-4 mb-6">
            <div>
              <p class="text-xs font-semibold text-slate-900 dark:text-white">Estimated Move-In Total</p>
              <p class="text-[11px] text-slate-400">Rent + 1st Mo Deposit</p>
            </div>
            <p class="font-heading font-bold text-xl text-indigo-600 dark:text-indigo-400">${formatINR(totalFirstMonth)}</p>
          </div>

          <!-- Action CTAs -->
          <div class="space-y-2.5">
            <button 
              type="button" 
              onclick="openScheduleVisitModal()" 
              class="w-full btn btn-primary text-sm py-3 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg">
              <i data-lucide="calendar" class="w-4 h-4"></i>
              <span>Book a Free Visit</span>
            </button>
            <button 
              type="button" 
              onclick="openHostChatModal()" 
              class="w-full btn btn-ghost text-xs py-2.5 rounded-2xl flex items-center justify-center gap-2">
              <i data-lucide="message-square" class="w-4 h-4"></i>
              <span>Direct Chat with Host</span>
            </button>
          </div>

          <p class="text-center text-[11px] text-slate-400 mt-3">
            🔒 100% Deposit Refund Guarantee through JhoomRahi Escrow
          </p>
        </div>

        <!-- Compatibility Check Widget -->
        <div class="card p-5 bg-gradient-to-br from-lime-500/10 via-transparent to-indigo-500/10 border border-lime-500/20">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-lime-500 text-slate-950 flex items-center justify-center font-bold">
              <i data-lucide="sparkles" class="w-5 h-5"></i>
            </div>
            <div class="flex-1">
              <h4 class="font-heading font-bold text-xs text-slate-900 dark:text-white">Lifestyle Compatibility Score</h4>
              <p class="text-[11px] text-slate-500">Based on students in ${item.area}</p>
            </div>
            <span class="font-heading font-bold text-lg text-lime-600 dark:text-lime-400">${item.matchScore || 94}%</span>
          </div>
        </div>

      </div>

    </div>
  `;

  if (typeof lucide !== "undefined") lucide.createIcons();
}

function openPhotoViewer(idx) {
  const item = StayState.activeDetailPG;
  if (!item || !item.images) return;
  const mainImg = document.getElementById("detail-active-img");
  if (mainImg && item.images[idx]) {
    mainImg.src = item.images[idx];
    notify(`Viewing photo ${idx + 1} of ${item.images.length}`, "info");
  }
}

function shareListing(title) {
  if (navigator.share) {
    navigator.share({
      title: `${title} on JhoomRahi`,
      url: window.location.href
    }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(window.location.href);
    notify("Listing URL copied to clipboard!", "success");
  }
}

// =========================================================================
// 7. VISIT & INQUIRY MODALS
// =========================================================================

function openScheduleVisitModal() {
  const modal = document.getElementById("schedule-modal");
  if (!modal) return;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeScheduleVisitModal() {
  const modal = document.getElementById("schedule-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
}

function submitScheduleVisit(e) {
  if (e) e.preventDefault();
  const dateVal = document.getElementById("visit-date")?.value;
  const timeVal = document.getElementById("visit-time")?.value;
  const nameVal = document.getElementById("visit-name")?.value;
  const phoneVal = document.getElementById("visit-phone")?.value;

  if (!dateVal || !nameVal || !phoneVal) {
    notify("Please fill in date, name, and phone number.", "warning");
    return;
  }

  const inquiries = JSON.parse(localStorage.getItem("jhoomrahi_pg_inquiries") || "[]");
  inquiries.push({
    id: `inq-${Date.now()}`,
    pgId: StayState.activeDetailPG?.id || "pg",
    pgTitle: StayState.activeDetailPG?.title || "PG Stay",
    date: dateVal,
    time: timeVal || "11:00 AM",
    name: nameVal,
    phone: phoneVal,
    createdAt: new Date().toISOString()
  });
  localStorage.setItem("jhoomrahi_pg_inquiries", JSON.stringify(inquiries));

  closeScheduleVisitModal();

  if (typeof confetti === "function") {
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
  }

  notify("Free visit booked! The property manager will call you to confirm.", "success");
}

function openHostChatModal() {
  const modal = document.getElementById("chat-modal");
  if (!modal) return;
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  document.body.style.overflow = "hidden";
}

function closeHostChatModal() {
  const modal = document.getElementById("chat-modal");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "";
}

function sendHostMessage(e) {
  if (e) e.preventDefault();
  const msgInput = document.getElementById("host-chat-input");
  const msg = msgInput ? msgInput.value.trim() : "";
  if (!msg) {
    notify("Please enter a question for the host.", "warning");
    return;
  }

  closeHostChatModal();
  notify("Message sent directly to host! Response time is under 15 mins.", "success");
}

// =========================================================================
// 8. MULTI-STEP FORM: POST A LISTING (POST.HTML)
// =========================================================================

let postStep = 1;

function initPostPage() {
  const form = document.getElementById("post-listing-form");
  if (!form) return;

  renderPostStep(1);
  setupPostLivePreview();
}

function renderPostStep(step) {
  postStep = step;
  for (let s = 1; s <= 4; s++) {
    const el = document.getElementById(`post-step-${s}`);
    const indicator = document.getElementById(`step-indicator-${s}`);
    if (el) {
      if (s === step) el.classList.remove("hidden");
      else el.classList.add("hidden");
    }
    if (indicator) {
      if (s < step) {
        indicator.className = "w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold";
        indicator.innerHTML = "✓";
      } else if (s === step) {
        indicator.className = "w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold ring-4 ring-indigo-500/20";
        indicator.innerHTML = s;
      } else {
        indicator.className = "w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 flex items-center justify-center text-xs font-bold";
        indicator.innerHTML = s;
      }
    }
  }

  const prevBtn = document.getElementById("post-prev-btn");
  const nextBtn = document.getElementById("post-next-btn");
  if (prevBtn) {
    if (step === 1) prevBtn.classList.add("invisible");
    else prevBtn.classList.remove("invisible");
  }
  if (nextBtn) {
    nextBtn.textContent = step === 4 ? "Publish Listing 🚀" : "Next Step →";
  }

  updateLivePreview();
}

function handlePostNext() {
  // Validate current step
  if (postStep === 1) {
    const title = document.getElementById("post-title")?.value.trim();
    const city = document.getElementById("post-city")?.value;
    const area = document.getElementById("post-area")?.value.trim();
    if (!title || !city || !area) {
      notify("Please fill in Title, City, and Locality.", "warning");
      return;
    }
  } else if (postStep === 2) {
    const rent = document.getElementById("post-rent")?.value;
    if (!rent || isNaN(rent) || Number(rent) < 1000) {
      notify("Please enter a valid monthly rent amount.", "warning");
      return;
    }
  }

  if (postStep < 4) {
    renderPostStep(postStep + 1);
  } else {
    publishListing();
  }
}

function handlePostPrev() {
  if (postStep > 1) {
    renderPostStep(postStep - 1);
  }
}

function setupPostLivePreview() {
  const inputs = [
    "post-title", "post-city", "post-area", "post-rent", "post-type", "post-gender", "post-desc"
  ];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", updateLivePreview);
  });
}

function updateLivePreview() {
  const previewTitle = document.getElementById("preview-title");
  const previewLocation = document.getElementById("preview-location");
  const previewRent = document.getElementById("preview-rent");
  const previewType = document.getElementById("preview-type");

  const title = document.getElementById("post-title")?.value.trim() || "Modern Co-Living Suite";
  const city = document.getElementById("post-city")?.value || "Bengaluru";
  const area = document.getElementById("post-area")?.value.trim() || "HSR Layout";
  const rent = document.getElementById("post-rent")?.value || 12000;
  const type = document.getElementById("post-type")?.value || "PG / Co-Living";

  if (previewTitle) previewTitle.textContent = title;
  if (previewLocation) previewLocation.textContent = `${area}, ${city}`;
  if (previewRent) previewRent.textContent = formatINR(rent) + "/mo";
  if (previewType) previewType.textContent = type;
}

function publishListing() {
  const title = document.getElementById("post-title")?.value.trim();
  const city = document.getElementById("post-city")?.value;
  const area = document.getElementById("post-area")?.value.trim();
  const rent = Number(document.getElementById("post-rent")?.value);
  const deposit = Number(document.getElementById("post-deposit")?.value) || rent;
  const type = document.getElementById("post-type")?.value || "PG / Co-Living";
  const gender = document.getElementById("post-gender")?.value || "unisex";
  const hostName = document.getElementById("post-host-name")?.value.trim() || "Verified Member";
  const hostPhone = document.getElementById("post-host-phone")?.value.trim() || "+91 98765 00000";
  const desc = document.getElementById("post-desc")?.value.trim() || "Spacious, quiet, and friendly environment with verified zero brokerage guarantee.";

  const checkedAmens = Array.from(document.querySelectorAll("input[name='post-amenities']:checked")).map(el => el.value);

  const newListing = {
    id: `custom-pg-${Date.now()}`,
    title,
    tagline: `Newly listed verified stay in ${area}`,
    type,
    roomType: type,
    gender,
    city,
    area,
    fullAddress: `${area}, ${city}`,
    rent,
    displayRent: `${formatINR(rent)}/mo`,
    deposit,
    displayDeposit: `${formatINR(deposit)} deposit`,
    rentBreakdown: {
      baseRent: rent,
      maintenance: 1200,
      electricity: "As per sub-meter",
      securityDeposit: deposit,
      brokerage: 0
    },
    verified: true,
    rating: 5.0,
    reviewsCount: 1,
    matchScore: 95,
    amenities: checkedAmens.length ? checkedAmens : ["High-Speed Wi-Fi", "RO Water", "24/7 Geyser", "Power Backup"],
    rules: {
      curfew: "No curfew",
      visitors: "Guests welcome with prior notice",
      foodPolicy: "Flexible kitchen policies",
      smoking: "Designated open area only"
    },
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800"
    ],
    host: {
      name: hostName,
      role: "Verified Lister",
      phone: hostPhone,
      responseRate: "Under 15 mins",
      badge: "Verified Member"
    },
    description: desc
  };

  const storedListings = JSON.parse(localStorage.getItem("jhoomrahi_user_listings") || "[]");
  storedListings.unshift(newListing);
  localStorage.setItem("jhoomrahi_user_listings", JSON.stringify(storedListings));

  if (typeof confetti === "function") {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
  }

  const successModal = document.getElementById("post-success-modal");
  if (successModal) {
    successModal.classList.remove("hidden");
    successModal.classList.add("flex");
    const viewBtn = document.getElementById("view-published-btn");
    if (viewBtn) viewBtn.href = `detail.html?id=${newListing.id}`;
  } else {
    notify("Listing published successfully!", "success");
    setTimeout(() => {
      window.location.href = `detail.html?id=${newListing.id}`;
    }, 1200);
  }
}

// Utility debounce
function debounce(fn, wait = 200) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), wait);
  };
}

// =========================================================================
// 9. AUTOMATIC DOM READY ROUTING
// =========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Identify page by unique container
  if (document.getElementById("roommates-grid")) {
    initRoommateMatchPage();
  } else if (document.getElementById("browse-listings-grid")) {
    initBrowsePage();
  } else if (document.getElementById("pg-detail-container")) {
    initDetailPage();
  } else if (document.getElementById("post-listing-form")) {
    initPostPage();
  }
});
