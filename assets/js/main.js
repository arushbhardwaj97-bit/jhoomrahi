/**
 * JhoomRahi — Main Application Controller
 * Phase 1 Foundation
 * 
 * Manages theme persistence, typewriter animations, statistical counters,
 * notification toasts, confetti triggers, smooth navigation, and UI event binding.
 */

/**
 * Initializes dark mode based on localStorage or system preferences,
 * and sets up global toggle handlers.
 */
function initDarkMode() {
  const storedTheme = localStorage.getItem("jhoomrahi_theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  // Bind to any toggle triggers
  const toggleButtons = document.querySelectorAll("[data-theme-toggle]");
  toggleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("jhoomrahi_theme", isDark ? "dark" : "light");
      initLucideIcons();
    });
  });
}

/**
 * Executes dynamic typewriter cycle across rotating copy lines
 * @param {string[]} lines - Array of strings to cycle through
 * @param {string} [elementId="typewriter-text"] - Target container ID
 */
function startTypewriter(lines = TYPEWRITER_LINES, elementId = "typewriter-text") {
  const el = document.getElementById(elementId);
  if (!el || !lines || lines.length === 0) return;

  let lineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 50;

  function tick() {
    const currentLine = lines[lineIndex];

    if (isDeleting) {
      charIndex--;
      el.textContent = currentLine.substring(0, charIndex);
      typeSpeed = 25;
    } else {
      charIndex++;
      el.textContent = currentLine.substring(0, charIndex);
      typeSpeed = 50 + Math.random() * 30; // Natural rhythm variation
    }

    if (!isDeleting && charIndex === currentLine.length) {
      // Pause at full sentence
      typeSpeed = 2400;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
      typeSpeed = 400;
    }

    setTimeout(tick, typeSpeed);
  }

  tick();
}

/**
 * Easing equation (easeOutCubic) for natural statistical count-up transitions
 * @param {number} t - Progress normalized between 0 and 1
 * @returns {number}
 */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Observes statistical metric elements and executes ease-out count-up upon intersection
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

          // Format with Indian numbering system standard (e.g. 15,400)
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

/**
 * Renders an accessible floating toast notification at bottom-right
 * @param {string} msg - Informative message to display
 * @param {"info" | "success" | "warning"} [type="info"] - Toast visual category
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
  
  let iconHtml = `<svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
  if (type === "success") {
    iconHtml = `<svg class="w-5 h-5 text-lime-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;
  } else if (type === "warning") {
    iconHtml = `<svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;
  }

  toast.innerHTML = `
    <span>${iconHtml}</span>
    <span>${msg}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("opacity-0", "translate-y-4");
    setTimeout(() => toast.remove(), 350);
  }, 3200);
}

/**
 * Configures smooth native anchor scrolling for in-page section links
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
 * Binds confetti celebration burst to interactive elements with [data-confetti]
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
 * Updates primary navigation elevation and border density on window scroll
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

// Flag indicating whether auth pages (login.html, signup.html) have been generated
const AUTH_PAGES_AVAILABLE = true;

/**
 * Intercepts placeholder routes for upcoming phases and alerts user gracefully
 */
function initPlaceholderLinks() {
  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) return;

    // Handle auth links in Batch 2 before login.html & signup.html are generated
    if (!AUTH_PAGES_AVAILABLE && (href === "login.html" || href === "signup.html")) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        showToast("Auth coming in next batch (login.html & signup.html)", "info");
      });
      return;
    }

    if (
      href.startsWith("stay/") ||
      href.startsWith("travel/") ||
      href.startsWith("discover/") ||
      href.startsWith("community/") ||
      href.startsWith("chat/") ||
      href.endsWith("detail.html") ||
      href.endsWith("browse.html") ||
      href.endsWith("calendar.html") ||
      href.endsWith("city.html") ||
      href.endsWith("roommate-match.html") ||
      href.includes("community") ||
      href.includes("chat")
    ) {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        showToast("Feature arriving in upcoming phase!", "info");
      });
    }
  });
}

/**
 * Injects current year dynamically into copyright footers
 */
function initFooterYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * Renders all Lucide icons safely across the document DOM
 */
function initLucideIcons() {
  if (typeof lucide !== "undefined" && typeof lucide.createIcons === "function") {
    lucide.createIcons();
  }
}

// Master initialization on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initDarkMode();
  startTypewriter();
  initCounters();
  initSmoothScroll();
  initConfetti();
  initNavScroll();
  initPlaceholderLinks();
  initFooterYear();
  initLucideIcons();
});

// Fallback to guarantee icon rendering once external CDN resources load
window.addEventListener("load", () => {
  initLucideIcons();
});


/* === PHASE 2 EXTENSION: UNBLOCK STAY VERTICAL ROUTES === */
document.addEventListener("DOMContentLoaded", () => {
  // Allow stay vertical pages now that stay/browse.html, stay/roommate-match.html, stay/detail.html, and stay/post.html are active
  setTimeout(() => {
    document.querySelectorAll('a[href^="stay/"], a[href*="browse.html"], a[href*="roommate-match.html"], a[href*="detail.html"], a[href*="post.html"]').forEach((link) => {
      const clone = link.cloneNode(true);
      link.parentNode.replaceChild(clone, link);
    });
  }, 0);
});
