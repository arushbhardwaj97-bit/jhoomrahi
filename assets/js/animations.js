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
 * Attaches smooth, restrained mousemove & scroll parallax to hero floating cards and background blobs.
 * Automatically halts on devices preferring reduced motion.
 */
function initParallax() {
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (isReducedMotion) return;

  const parallaxTargets = document.querySelectorAll("[data-parallax]");
  if (!parallaxTargets.length) return;

  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  const heroSection = document.getElementById("hero-section") || document.body;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;
  let scrollY = window.pageYOffset || 0;
  let currentScrollY = scrollY;
  let rafId = null;

  if (!isTouch) {
    heroSection.addEventListener("mousemove", (e) => {
      const rect = heroSection.getBoundingClientRect();
      mouseX = e.clientX - rect.left - rect.width / 2;
      mouseY = e.clientY - rect.top - rect.height / 2;

      if (!rafId) {
        rafId = requestAnimationFrame(updateParallax);
      }
    });
  }

  // Scroll parallax for floating elements on page scroll
  window.addEventListener("scroll", () => {
    scrollY = window.pageYOffset || 0;
    if (!rafId) {
      rafId = requestAnimationFrame(updateParallax);
    }
  }, { passive: true });

  function updateParallax() {
    currentX += (mouseX - currentX) * 0.08;
    currentY += (mouseY - currentY) * 0.08;
    currentScrollY += (scrollY - currentScrollY) * 0.1;

    parallaxTargets.forEach((el) => {
      const depth = parseFloat(el.getAttribute("data-parallax")) || 0.02;
      const moveX = !isTouch ? (currentX * depth).toFixed(2) : "0";
      const scrollShift = (currentScrollY * (depth * 0.5)).toFixed(2);
      const moveY = !isTouch ? (currentY * depth - parseFloat(scrollShift)).toFixed(2) : (-parseFloat(scrollShift)).toFixed(2);

      // Set CSS variables for cards using @keyframes float
      el.style.setProperty("--parallax-x", `${moveX}px`);
      el.style.setProperty("--parallax-y", `${moveY}px`);

      // For background blobs without CSS animation, apply translate3d directly
      if (!el.classList.contains("float") && !el.classList.contains("float-delayed") && !el.classList.contains("float-slow")) {
        const baseTransform = el.getAttribute("data-base-transform") || "";
        el.style.transform = `${baseTransform} translate3d(${moveX}px, ${moveY}px, 0)`;
      }
    });

    const isMovingMouse = Math.abs(mouseX - currentX) > 0.1 || Math.abs(mouseY - currentY) > 0.1;
    const isMovingScroll = Math.abs(scrollY - currentScrollY) > 0.5;

    if (isMovingMouse || isMovingScroll) {
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
