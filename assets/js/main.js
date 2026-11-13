/**
 * JhoomRahi — Main Application Controller
 * Global Foundation, Navigation, Accessibility, Mock Auth, and Animations
 *
 * @file main.js
 * @description Manages global UI mechanics including dark/light mode toggle,
 * mobile drawer navigation, simulated authentication guards, toast notifications,
 * intersection-observer counters, smooth scrolling, and Lucide icon rendering.
 */

/* ========================================================================= */
/* 1. THEME & DARK MODE MANAGEMENT                                           */
/* ========================================================================= */

/**
 * Initializes dark mode based on localStorage key `jhoomrahi_theme` or system
 * `prefers-color-scheme`, synchronizes the `dark` class on `document.documentElement`,
 * and binds click listeners to all `[data-theme-toggle]` elements.
 *
 * @function initDarkMode
 * @returns {void}
 */
function initDarkMode() {
  const storedTheme = localStorage.getItem("jhoomrahi_theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  // Bind to all theme toggle buttons across desktop nav, mobile nav & drawer
  const toggleButtons = document.querySelectorAll("[data-theme-toggle]");
  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("jhoomrahi_theme", isDark ? "dark" : "light");
      initLucideIcons();
    });
  });
}

/* ========================================================================= */
/* 2. AUTHENTICATION STATE, ROUTE GUARDS & ACTION INTERCEPTORS               */
/* ========================================================================= */

/**
 * Checks whether the current user is authenticated.
 * Guest mode is active unless `jhoomrahi_isLoggedIn` is explicitly 'true'.
 *
 * @function isLoggedIn
 * @returns {boolean} True if logged in, false in guest mode
 */
function isLoggedIn() {
  return localStorage.getItem("jhoomrahi_isLoggedIn") === "true";
}
window.isLoggedIn = isLoggedIn;
window.isAuthenticated = isLoggedIn;

/**
 * Calculates relative path to login.html based on current URL path depth.
 *
 * @function getLoginUrl
 * @returns {string} Relative URL to login.html
 */
function getLoginUrl() {
  const path = window.location.pathname.toLowerCase().replace(/\\/g, "/");
  const isSubdir = path.includes("/stay/") || path.includes("/travel/") || path.includes("/discover/");
  return isSubdir ? "../login.html" : "login.html";
}
window.getLoginUrl = getLoginUrl;

/**
 * Calculates relative path to profile.html based on current URL path depth.
 *
 * @function getProfileUrl
 * @returns {string} Relative URL to profile.html
 */
function getProfileUrl() {
  const path = window.location.pathname.toLowerCase().replace(/\\/g, "/");
  const isSubdir = path.includes("/stay/") || path.includes("/travel/") || path.includes("/discover/");
  return isSubdir ? "../profile.html" : "profile.html";
}
window.getProfileUrl = getProfileUrl;

/**
 * Calculates relative path to dashboard.html based on current URL path depth.
 *
 * @function getDashboardUrl
 * @returns {string} Relative URL to dashboard.html
 */
function getDashboardUrl() {
  const path = window.location.pathname.toLowerCase().replace(/\\/g, "/");
  const isSubdir = path.includes("/stay/") || path.includes("/travel/") || path.includes("/discover/");
  return isSubdir ? "../dashboard.html" : "dashboard.html";
}
window.getDashboardUrl = getDashboardUrl;

/**
 * Guard function for restricted user actions.
 * If user is authenticated, executes callback (if provided) and returns true.
 * If user is a guest, shows toast notification: "Please log in to continue",
 * sets a pending toast message in sessionStorage, redirects to login.html, and returns false.
 *
 * @function requireLogin
 * @param {string|Function} [actionOrCallback] - Action name string or callback function
 * @returns {boolean} True if logged in, false if guest (triggers redirect)
 */
function requireLogin(actionOrCallback) {
  if (!isLoggedIn()) {
    if (typeof showToast === "function") {
      showToast("Please log in to continue", "warning");
    }
    try {
      sessionStorage.setItem("auth_redirect_toast", "Please log in to continue");
    } catch (e) {}
    const target = getLoginUrl();
    setTimeout(() => {
      window.location.href = target;
    }, 400);
    return false;
  }
  if (typeof actionOrCallback === "function") {
    return actionOrCallback();
  }
  return true;
}
window.requireLogin = requireLogin;
window.requireAuth = requireLogin;

/**
 * Enforces route protection on restricted views.
 * Guest users attempting to access `dashboard.html`, `chat.html`, or `profile.html`
 * (as well as `post.html` creator routes) are immediately redirected to `login.html`.
 * Public browsing routes (index.html, stay/browse.html, travel/calendar.html, discover/*, community.html)
 * are accessible without logging in.
 *
 * @function protectPage
 * @returns {boolean} True if route permitted, false if redirecting
 */
function protectPage() {
  const path = window.location.pathname.toLowerCase().replace(/\\/g, "/");
  const isProtectedPage = 
    path.includes("dashboard.html") || 
    path.includes("profile.html") || 
    path.includes("chat.html") ||
    path.includes("post.html") ||
    path.endsWith("/dashboard") ||
    path.endsWith("/profile") ||
    path.endsWith("/chat") ||
    path.endsWith("/post");

  if (isProtectedPage && !isLoggedIn()) {
    try {
      sessionStorage.setItem("auth_redirect_toast", "Please log in to continue");
    } catch (e) {}
    const target = getLoginUrl();
    window.location.replace(target);
    return false;
  }
  return true;
}
window.protectPage = protectPage;
window.initAuth = protectPage;

// Execute immediate route guard on script load to prevent flash of protected content
protectPage();

/**
 * Logs the current user out by clearing session/local auth state,
 * displaying a friendly toast alert, and using `window.location.replace('login.html')`
 * so the user cannot use the browser "Back" button to return to the protected page.
 *
 * @function logout
 * @returns {void}
 */
function logout() {
  localStorage.setItem("jhoomrahi_isLoggedIn", "false");
  localStorage.setItem("isLoggedIn", "false");
  sessionStorage.clear();
  showToast("Logged out successfully. Redirecting to login...", "info");
  setTimeout(() => {
    const target = getLoginUrl();
    window.location.replace(target);
  }, 500);
}
window.logout = logout;

/**
 * Synchronizes navbar and drawer UI elements with current auth state.
 * - If `localStorage.getItem('jhoomrahi_isLoggedIn') !== 'true'`:
 *   Shows a "Log In" button in the navbar instead of the Profile avatar.
 * - If logged in:
 *   Shows the Profile avatar (Rohan Deshmukh) in the navbar.
 *
 * @function initNavbarAuth
 * @returns {void}
 */
function initNavbarAuth() {
  const loggedIn = isLoggedIn();
  const loginUrl = getLoginUrl();
  const profileUrl = getProfileUrl();

  // Desktop Navbar Auth Container ([data-nav-auth-slot])
  const navAuthSlots = document.querySelectorAll("[data-nav-auth-slot]");
  navAuthSlots.forEach((slot) => {
    if (loggedIn) {
      slot.innerHTML = `
        <a href="${profileUrl}" class="flex items-center gap-2.5 p-1.5 pr-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors" data-nav-profile-pill aria-label="User Profile">
          <img src="https://ui-avatars.com/api/?name=Rohan+Deshmukh&background=6366f1&color=fff" alt="Rohan Deshmukh" class="w-8 h-8 rounded-xl object-cover shrink-0" onerror="this.onerror=null;this.src='https://ui-avatars.com/api/?name=Rohan+Deshmukh&background=6366f1&color=fff';" loading="lazy">
          <div class="text-left text-xs leading-tight hidden sm:block">
            <p class="font-bold text-slate-900 dark:text-white flex items-center gap-1">
              <span>Rohan D.</span>
              <svg class="w-3 h-3 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </p>
            <p class="text-[11px] text-slate-500 dark:text-slate-400">Bengaluru</p>
          </div>
        </a>
      `;
    } else {
      slot.innerHTML = `
        <a href="${loginUrl}" class="btn btn-primary text-xs sm:text-sm py-2 px-4 rounded-xl font-semibold shadow-sm flex items-center gap-1.5" data-nav-auth-btn aria-label="Log In">
          <span>Log In</span>
        </a>
      `;
    }
  });

  // Dynamic Fallback: Check all existing Profile Avatar elements in navbar
  const existingProfilePills = document.querySelectorAll(
    'header#navbar a[aria-label="User Profile"], header#navbar a[aria-label="Current User Profile"], header#navbar [data-nav-profile-pill]'
  );
  existingProfilePills.forEach((pill) => {
    if (pill.closest("[data-nav-auth-slot]")) return;
    if (!loggedIn) {
      const loginBtn = document.createElement("a");
      loginBtn.href = loginUrl;
      loginBtn.className = "btn btn-primary text-xs sm:text-sm py-2 px-4 rounded-xl font-semibold shadow-sm flex items-center gap-1.5";
      loginBtn.setAttribute("data-nav-auth-btn", "true");
      loginBtn.setAttribute("aria-label", "Log In");
      loginBtn.innerHTML = "<span>Log In</span>";
      pill.replaceWith(loginBtn);
    }
  });

  if (!loggedIn) {
    const publicDashboardBtns = document.querySelectorAll(
      'header#navbar nav + div a[href*="dashboard.html"].btn-primary, header#navbar .hidden.md\\:flex a[href*="dashboard.html"].btn-primary'
    );
    publicDashboardBtns.forEach((btn) => {
      if (btn.closest("[data-nav-auth-slot]")) return;
      btn.href = loginUrl;
      btn.innerHTML = "<span>Log In</span>";
      btn.setAttribute("data-nav-auth-btn", "true");
      btn.setAttribute("aria-label", "Log In");
    });
  } else {
    // If logged in, swap any standalone static login buttons to Profile Avatar
    const staticLoginBtns = document.querySelectorAll(
      'header#navbar nav + div a[href*="login.html"].btn-primary, header#navbar .hidden.md\\:flex a[href*="login.html"].btn-primary'
    );
    staticLoginBtns.forEach((btn) => {
      if (btn.closest("[data-nav-auth-slot]")) return;
      btn.outerHTML = `
        <a href="${profileUrl}" class="flex items-center gap-2.5 p-1.5 pr-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors" data-nav-profile-pill aria-label="User Profile">
          <img src="https://ui-avatars.com/api/?name=Rohan+Deshmukh&background=6366f1&color=fff" alt="Rohan Deshmukh" class="w-8 h-8 rounded-xl object-cover shrink-0" onerror="this.onerror=null;this.src='https://ui-avatars.com/api/?name=Rohan+Deshmukh&background=6366f1&color=fff';" loading="lazy">
          <div class="text-left text-xs leading-tight hidden sm:block">
            <p class="font-bold text-slate-900 dark:text-white flex items-center gap-1">
              <span>Rohan D.</span>
              <svg class="w-3 h-3 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </p>
            <p class="text-[11px] text-slate-500 dark:text-slate-400">Bengaluru</p>
          </div>
        </a>
      `;
    });
  }

  // Update slide-out mobile drawer (#mobile-drawer) if present
  const mobileDrawer = document.getElementById("mobile-drawer");
  if (mobileDrawer) {
    const drawerHeader = mobileDrawer.querySelector(".p-4.bg-slate-50, [data-drawer-user-header]");
    if (drawerHeader) {
      if (!loggedIn) {
        drawerHeader.innerHTML = `
          <div class="flex items-center justify-between w-full gap-3">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-sm shrink-0">
                <i data-lucide="user" class="w-5 h-5"></i>
              </div>
              <div class="min-w-0">
                <p class="text-xs font-bold text-slate-900 dark:text-white truncate">Guest User</p>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate">Welcome to JhoomRahi</p>
              </div>
            </div>
            <a href="${loginUrl}" class="btn btn-primary text-xs py-1.5 px-3 rounded-xl font-semibold shrink-0">Log In</a>
          </div>
        `;
      } else {
        drawerHeader.innerHTML = `
          <div class="flex items-center gap-3 w-full">
            <img src="https://ui-avatars.com/api/?name=Rohan+Deshmukh&background=6366f1&color=fff" alt="Rohan Deshmukh" class="w-10 h-10 rounded-xl object-cover shrink-0 shadow-xs" onerror="this.onerror=null;this.src='https://ui-avatars.com/api/?name=Rohan+Deshmukh&background=6366f1&color=fff';" loading="lazy">
            <div class="min-w-0 flex-1">
              <p class="text-xs font-bold text-slate-900 dark:text-white truncate flex items-center gap-1">
                <span>Rohan Deshmukh</span>
                <i data-lucide="check-circle" class="w-3.5 h-3.5 text-indigo-500 shrink-0"></i>
              </p>
              <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate">SDE-1 @ Swiggy • Bengaluru</p>
            </div>
          </div>
        `;
      }
    }

    const drawerLogoutBtn = mobileDrawer.querySelector('button[onclick*="logout"], [data-drawer-logout]');
    if (drawerLogoutBtn) {
      if (!loggedIn) {
        const drawerLoginLink = document.createElement("a");
        drawerLoginLink.href = loginUrl;
        drawerLoginLink.className = "w-full btn btn-primary flex items-center justify-center gap-2 p-2.5 rounded-xl text-sm font-semibold text-center";
        drawerLoginLink.innerHTML = `<i data-lucide="log-in" class="w-4 h-4 shrink-0"></i><span>Log In / Sign Up</span>`;
        drawerLogoutBtn.replaceWith(drawerLoginLink);
      }
    }
  }

  // Update Alpine drawers in stay/browse.html, travel/calendar.html, discover/city.html
  const alpineDrawerAuthSlots = document.querySelectorAll("[data-mobile-drawer-auth]");
  alpineDrawerAuthSlots.forEach((slot) => {
    if (loggedIn) {
      slot.innerHTML = `
        <button type="button" onclick="logout()" class="w-full btn bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-xs py-2.5 rounded-xl text-center block font-semibold cursor-pointer">
          Log Out
        </button>
      `;
    } else {
      slot.innerHTML = `
        <a href="${loginUrl}" class="w-full btn btn-primary text-xs py-2.5 rounded-xl text-center block">
          Log in / Sign up
        </a>
      `;
    }
  });

  initLucideIcons();
}
window.initNavbarAuth = initNavbarAuth;

/**
 * Initializes global click interceptors for guest mode.
 * Catches user interactions on restricted actions (Chat with Host, Send Request,
 * Join Trip, Save PG, Post a Listing, Join Community, Create Post, In-App Chat),
 * shows the alert toast, and redirects to login.html.
 *
 * @function initActionInterceptors
 * @returns {void}
 */
function initActionInterceptors() {
  document.addEventListener("click", (e) => {
    if (isAuthenticated()) return;

    const target = e.target;
    if (!target || !target.closest) return;

    // 1. Intercept links to protected routes: chat.html, dashboard.html, profile.html, post.html
    const link = target.closest("a");
    if (link) {
      const href = (link.getAttribute("href") || "").toLowerCase().trim();
      const isProtectedLink = 
        href.includes("chat.html") || 
        href.includes("dashboard.html") || 
        href.includes("profile.html") ||
        href.includes("post.html");

      // Exception: already a link to login.html
      if (isProtectedLink && !href.includes("login.html") && !href.includes("signup.html")) {
        e.preventDefault();
        e.stopPropagation();
        requireAuth();
        return;
      }
    }

    // 2. Intercept buttons or clickable elements invoking restricted actions
    const actionBtn = target.closest(
      'button, a, [role="button"], input[type="submit"], [data-require-auth]'
    );
    if (actionBtn) {
      // Check explicit data-require-auth attribute
      if (actionBtn.hasAttribute("data-require-auth")) {
        e.preventDefault();
        e.stopPropagation();
        requireAuth();
        return;
      }

      // Check inline onclick or Alpine @click attributes
      const onclickAttr = actionBtn.getAttribute("onclick") || "";
      const alpineClick = actionBtn.getAttribute("@click") || actionBtn.getAttribute("x-on:click") || "";
      const allHandlers = (onclickAttr + " " + alpineClick).toLowerCase();

      const isRestrictedHandler = 
        allHandlers.includes("togglesavepg") ||
        allHandlers.includes("openhostchatmodal") ||
        allHandlers.includes("openconnectmodal") ||
        allHandlers.includes("sendconnectionrequest") ||
        allHandlers.includes("openjointripmodal") ||
        allHandlers.includes("submitjointrip") ||
        allHandlers.includes("togglemembership") ||
        allHandlers.includes("submitpost");

      if (isRestrictedHandler) {
        e.preventDefault();
        e.stopPropagation();
        requireAuth();
        return;
      }

      // Check text content or aria-label for restricted actions
      const text = (actionBtn.textContent || "").trim().toLowerCase();
      const aria = (actionBtn.getAttribute("aria-label") || "").toLowerCase();
      const title = (actionBtn.getAttribute("title") || "").toLowerCase();
      const combinedText = `${text} ${aria} ${title}`;

      const isRestrictedText = 
        combinedText.includes("chat with host") ||
        combinedText.includes("send request") ||
        combinedText.includes("join trip") ||
        combinedText.includes("join this squad") ||
        combinedText.includes("join travel squad") ||
        combinedText.includes("save pg") ||
        combinedText.includes("post a listing") ||
        combinedText.includes("post listing") ||
        combinedText.includes("plan a trip") ||
        combinedText.includes("join community") ||
        combinedText.includes("joined tribe") ||
        combinedText.includes("create post") ||
        combinedText.includes("post to feed") ||
        combinedText.includes("chat messages") ||
        combinedText.includes("direct chat");

      if (isRestrictedText) {
        // Exclude system controls (theme toggle, drawer dismiss, modal close)
        const isSystemControl = 
          actionBtn.hasAttribute("data-theme-toggle") ||
          actionBtn.hasAttribute("data-mobile-drawer-close") ||
          actionBtn.hasAttribute("data-mobile-drawer-toggle");

        if (!isSystemControl) {
          e.preventDefault();
          e.stopPropagation();
          requireAuth();
          return;
        }
      }
    }

    // 3. Intercept direct focus/click on community post creator input
    const postInput = target.closest('#community-post-input, [x-model="newPostContent"]');
    if (postInput) {
      e.preventDefault();
      e.stopPropagation();
      postInput.blur();
      requireAuth();
      return;
    }
  }, true); // Capture phase ensures immediate interception
}

/**
 * Checks for pending auth toast saved during redirect in sessionStorage.
 *
 * @function checkPendingAuthToast
 * @returns {void}
 */
function checkPendingAuthToast() {
  const pendingToast = sessionStorage.getItem("auth_redirect_toast");
  if (pendingToast) {
    sessionStorage.removeItem("auth_redirect_toast");
    setTimeout(() => {
      showToast(pendingToast, "warning");
    }, 250);
  }
}

/* ========================================================================= */
/* 3. MOBILE SLIDE-OUT DRAWER NAVIGATION                                     */
/* ========================================================================= */

/**
 * Initializes the mobile slide-out navigation drawer.
 * Binds click events to open triggers (`[data-mobile-drawer-toggle]`),
 * close buttons (`[data-mobile-drawer-close]`), and dark backdrop overlay.
 * Also handles keyboard ESC dismiss for accessibility.
 *
 * @function initMobileDrawer
 * @returns {void}
 */
function initMobileDrawer() {
  const toggleBtns = document.querySelectorAll("[data-mobile-drawer-toggle]");
  const closeBtns = document.querySelectorAll("[data-mobile-drawer-close]");
  const backdrop = document.getElementById("mobile-drawer-backdrop");
  const drawer = document.getElementById("mobile-drawer");

  /**
   * Opens the slide-out navigation drawer and locks body scroll
   */
  function openDrawer() {
    if (drawer) drawer.classList.add("active");
    if (backdrop) backdrop.classList.add("active");
    document.body.classList.add("overflow-hidden");
    initLucideIcons();
  }

  /**
   * Closes the slide-out navigation drawer and restores body scroll
   */
  function closeDrawer() {
    if (drawer) drawer.classList.remove("active");
    if (backdrop) backdrop.classList.remove("active");
    document.body.classList.remove("overflow-hidden");
  }

  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openDrawer();
    });
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeDrawer();
    });
  });

  if (backdrop) {
    backdrop.addEventListener("click", closeDrawer);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDrawer();
    }
  });
}

/* ========================================================================= */
/* 4. TYPEWRITER ANIMATION                                                   */
/* ========================================================================= */

/**
 * Executes a looping typewriter animation across a list of phrases.
 *
 * @function startTypewriter
 * @param {string[]} [lines] - Array of strings to cycle through
 * @param {string} [elementId="typewriter-text"] - DOM container ID
 * @returns {void}
 */
function startTypewriter(lines, elementId = "typewriter-text") {
  const fallbackLines = [
    "PGs, Flatmates & Verified Co-Living",
    "Weekend Treks, Roadtrips & Spiti Drives",
    "Midnight Chai, Hidden Cafes & Study Spots",
    "College & City Tech Communities"
  ];
  const activeLines = (lines && lines.length > 0) ? lines : (typeof TYPEWRITER_LINES !== "undefined" ? TYPEWRITER_LINES : fallbackLines);
  const el = document.getElementById(elementId);
  if (!el || !activeLines || activeLines.length === 0) return;

  let lineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 50;

  function tick() {
    const currentLine = activeLines[lineIndex];

    if (isDeleting) {
      charIndex--;
      el.textContent = currentLine.substring(0, charIndex);
      typeSpeed = 25;
    } else {
      charIndex++;
      el.textContent = currentLine.substring(0, charIndex);
      typeSpeed = 50 + Math.random() * 30; // Natural human rhythm
    }

    if (!isDeleting && charIndex === currentLine.length) {
      // Pause at full sentence
      typeSpeed = 2400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      lineIndex = (lineIndex + 1) % activeLines.length;
      typeSpeed = 400;
    }

    setTimeout(tick, typeSpeed);
  }

  tick();
}

/* ========================================================================= */
/* 5. METRIC COUNT-UP STATISTICAL OBSERVER                                   */
/* ========================================================================= */

/**
 * Easing equation (easeOutCubic) for natural statistical count-up transitions.
 *
 * @function easeOutCubic
 * @param {number} t - Progress normalized between 0 and 1
 * @returns {number} Eased progress
 */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Observes elements with `[data-counter]` and executes an ease-out count-up
 * animation when they intersect the visible viewport.
 *
 * @function initCounters
 * @returns {void}
 */
function initCounters() {
  const counterElements = document.querySelectorAll("[data-counter]");
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.getAttribute("data-target")) || 0;
        const prefix = el.getAttribute("data-prefix") || "";
        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 1800; // ms
        const startTime = performance.now();

        function animate(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const currentVal = Math.floor(easeOutCubic(progress) * target);

          // Indian numbering formatting
          el.textContent = `${prefix}${currentVal.toLocaleString("en-IN")}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            el.textContent = `${prefix}${target.toLocaleString("en-IN")}${suffix}`;
          }
        }

        requestAnimationFrame(animate);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.35 });

  counterElements.forEach((el) => observer.observe(el));
}

/* ========================================================================= */
/* 6. TOAST NOTIFICATIONS                                                    */
/* ========================================================================= */

/**
 * Renders an accessible floating toast notification at bottom-right.
 *
 * @function showToast
 * @param {string} msg - Message copy to display
 * @param {"info" | "success" | "warning" | "error"} [type="info"] - Visual tone category
 * @returns {void}
 */
function showToast(msg, type = "info") {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "toast show pointer-events-auto flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 px-4 py-3 rounded-2xl shadow-xl text-sm font-medium transition-all duration-300";
  
  let iconHtml = `<svg class="w-5 h-5 text-indigo-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
  if (type === "success") {
    iconHtml = `<svg class="w-5 h-5 text-lime-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
  } else if (type === "warning") {
    iconHtml = `<svg class="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;
  } else if (type === "error") {
    iconHtml = `<svg class="w-5 h-5 text-rose-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>`;
  }

  const iconSpan = document.createElement("span");
  iconSpan.innerHTML = iconHtml;
  const msgSpan = document.createElement("span");
  msgSpan.textContent = String(msg || "");
  
  toast.appendChild(iconSpan);
  toast.appendChild(msgSpan);
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("opacity-0", "translate-y-4");
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

// Expose globally
window.showToast = showToast;

/* ========================================================================= */
/* 7. SCROLL & NAVIGATION UTILITIES                                          */
/* ========================================================================= */

/**
 * Configures smooth native anchor scrolling for in-page section links (`href="#..."`).
 *
 * @function initSmoothScroll
 * @returns {void}
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#" || targetId === "") return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
}

/**
 * Binds confetti celebration burst to interactive elements with `[data-confetti]`.
 *
 * @function initConfetti
 * @returns {void}
 */
function initConfetti() {
  const confettiTriggers = document.querySelectorAll("[data-confetti]");
  confettiTriggers.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (typeof confetti === "function") {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.65 },
          colors: ["#6366f1", "#a3e635", "#fb7185", "#f59e0b"]
        });
      }
    });
  });
}

/**
 * Updates primary navigation header glass elevation and border density on window scroll.
 *
 * @function initNavScroll
 * @returns {void}
 */
function initNavScroll() {
  const nav = document.getElementById("navbar");
  if (!nav) return;

  function checkScroll() {
    if (window.scrollY > 40) {
      nav.classList.add("shadow-sm", "border-b", "border-slate-200/80", "dark:border-slate-800/80");
    } else {
      nav.classList.remove("shadow-sm", "border-b", "border-slate-200/80", "dark:border-slate-800/80");
    }
  }

  window.addEventListener("scroll", checkScroll, { passive: true });
  checkScroll();
}

/**
 * Injects current year dynamically into copyright footers (`#current-year`).
 *
 * @function initFooterYear
 * @returns {void}
 */
function initFooterYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * Safely invokes Lucide icon SVG generation across the document DOM.
 *
 * @function initLucideIcons
 * @returns {void}
 */
function initLucideIcons() {
  if (typeof lucide !== "undefined" && typeof lucide.createIcons === "function") {
    lucide.createIcons();
  }
}

// Expose globally
window.initLucideIcons = initLucideIcons;

/* ========================================================================= */
/* 8. GLOBAL DOM INITIALIZATION                                              */
/* ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  initDarkMode();
  protectPage();
  initNavbarAuth();
  initActionInterceptors();
  checkPendingAuthToast();
  initMobileDrawer();
  startTypewriter();
  initCounters();
  initSmoothScroll();
  initConfetti();
  initNavScroll();
  initFooterYear();
  initLucideIcons();
});

// Guaranteed secondary rendering when CDN resources finish loading
window.addEventListener("load", () => {
  initLucideIcons();
});
