/**
 * JhoomRahi — Animation Controller & Visual Effects
 * Phase 1 Foundation
 * 
 * Integrates AOS scroll animations, subtle mousemove parallax for hero elements,
 * and lightweight IntersectionObserver reveal fallbacks.
 */

/**
 * Initializes Animate On Scroll (AOS) library with curated brand timing curves
 */
function initAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 700,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
      disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches
    });
  }
}

/**
 * Native IntersectionObserver reveal fallback for elements with the .reveal class
 */
function initRevealObserver() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-up");
        entry.target.classList.remove("opacity-0");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach((el) => observer.observe(el));
}

/**
 * Injects a subtle, GPU-accelerated moving ambient aurora mesh into the background
 */
function initAmbientAurora() {
  if (document.getElementById("aurora-ambient-mesh")) return;
  const mesh = document.createElement("div");
  mesh.id = "aurora-ambient-mesh";
  mesh.className = "ambient-mesh-canvas";
  mesh.setAttribute("aria-hidden", "true");
  mesh.innerHTML = `
    <div class="aurora-orb aurora-orb-1"></div>
    <div class="aurora-orb aurora-orb-2"></div>
    <div class="aurora-orb aurora-orb-3"></div>
  `;
  document.body.prepend(mesh);
}

/**
 * 2026 Smooth 3D Card Tilt (Only ON HOVER - Zero permanent background transformations)
 */
function initFluxCards() {
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (isTouch) return;
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isReducedMotion) return;

  const cards = document.querySelectorAll(".card, [data-card], .listing-card, .travel-card, .pg-card, .flux-card");
  cards.forEach((card) => {
    if (card._fluxInitialized) return;
    card._fluxInitialized = true;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;

      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(1)}deg) rotateY(${rotateY.toFixed(1)}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/**
 * 2026 Magnetic & Spring Transition Attraction on Primary Buttons (On Hover Only)
 */
function initMagneticButtons() {
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (isTouch) return;
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isReducedMotion) return;

  const buttons = document.querySelectorAll(".btn-primary, .btn-lime, button.bg-lime-400, a.bg-lime-400, .btn-lime-cta, .btn-cta");
  buttons.forEach((btn) => {
    if (btn._magneticInitialized) return;
    btn._magneticInitialized = true;

    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      const pullFactor = 0.18;

      btn.style.transform = `translateY(-2px) scale(1.04) translate(${(x * pullFactor).toFixed(1)}px, ${(y * pullFactor).toFixed(1)}px)`;
    });

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}

// Expose globally
window.initAmbientAurora = initAmbientAurora;
window.initFluxCards = initFluxCards;
window.initMagneticButtons = initMagneticButtons;

// Initialize animations on DOM readiness
document.addEventListener("DOMContentLoaded", () => {
  initAOS();
  initRevealObserver();
  initAmbientAurora();
  initFluxCards();
  initMagneticButtons();
});
