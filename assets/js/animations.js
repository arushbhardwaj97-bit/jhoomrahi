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
 * Attaches smooth, restrained mousemove parallax to hero floating cards and background blobs.
 * Automatically halts on devices preferring reduced motion or touch screens.
 */
function initParallax() {
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  if (isReducedMotion || isTouch) return;

  const heroSection = document.getElementById("hero-section") || document.body;
  const parallaxTargets = document.querySelectorAll("[data-parallax]");
  if (!parallaxTargets.length) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = null;

  heroSection.addEventListener("mousemove", (e) => {
    const rect = heroSection.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    mouseX = relX;
    mouseY = relY;

    if (!rafId) {
      rafId = requestAnimationFrame(updateParallax);
    }
  });

  function updateParallax() {
    currentX += (mouseX - currentX) * 0.06;
    currentY += (mouseY - currentY) * 0.06;

    parallaxTargets.forEach((el) => {
      const depth = parseFloat(el.getAttribute("data-parallax")) || 0.02;
      const moveX = currentX * depth;
      const moveY = currentY * depth;
      const baseTransform = el.getAttribute("data-base-transform") || "";
      el.style.transform = `${baseTransform} translate3d(${moveX}px, ${moveY}px, 0)`;
    });

    if (Math.abs(mouseX - currentX) > 0.1 || Math.abs(mouseY - currentY) > 0.1) {
      rafId = requestAnimationFrame(updateParallax);
    } else {
      rafId = null;
    }
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

// Initialize animations on DOM readiness
document.addEventListener("DOMContentLoaded", () => {
  initAOS();
  initParallax();
  initRevealObserver();
});
