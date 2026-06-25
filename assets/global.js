/* ==========================================================================
   KLUNKER — unaufdringliche Interaktionen
   · Mobile-Navigation (Drawer)
   · Sticky-Header-Zustand beim Scrollen (is-scrolled)
   · Scroll-Reveal sanfter Einblendungen (IntersectionObserver)
   ========================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;

  /* ---- Mobile-Navigation --------------------------------------------- */

  function setNav(open) {
    root.classList.toggle("nav-open", open);
    document.body.style.overflow = open ? "hidden" : "";
    var toggle = document.querySelector("[data-menu-toggle]");
    if (toggle) toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  document.addEventListener("click", function (event) {
    if (event.target.closest("[data-menu-toggle]")) {
      event.preventDefault();
      setNav(!root.classList.contains("nav-open"));
      return;
    }
    if (
      event.target.closest("[data-menu-close]") ||
      event.target.matches("[data-nav-overlay]")
    ) {
      setNav(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && root.classList.contains("nav-open")) {
      setNav(false);
    }
  });

  /* ---- Sticky-Header-Zustand ----------------------------------------- */

  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      root.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Scroll-Reveal -------------------------------------------------- */

  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var io = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );

    els.forEach(function (el) {
      io.observe(el);
    });
  }

  if (document.readyState !== "loading") {
    initReveal();
  } else {
    document.addEventListener("DOMContentLoaded", initReveal);
  }
})();
