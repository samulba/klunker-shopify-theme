/* ==========================================================================
   KLUNKER — Motion-Ebene (Vanilla JS, kein Framework)
   · Mobile-Navigation (Drawer)
   · Sticky-Header-Zustand + Scroll-Fortschrittsbalken
   · Scroll-Reveal (IntersectionObserver)
   · Parallax auf großen Bildern (Hero, Editorial)
   · Zähler, die beim Reinscrollen hochzählen
   · Magnetische Buttons (nur bei Maus, nicht Touch)
   Respektiert prefers-reduced-motion durchgehend.
   ========================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canHover = window.matchMedia("(hover: hover)").matches;

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
    if (event.target.closest("[data-menu-close]") || event.target.matches("[data-nav-overlay]")) {
      setNav(false);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && root.classList.contains("nav-open")) setNav(false);
  });

  /* ---- Scroll: Header-Status, Fortschritt, Parallax ------------------ */

  var progressEl = document.querySelector("[data-progress]");
  var parallaxEls = [];
  var ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      var y = window.scrollY || window.pageYOffset;

      root.classList.toggle("is-scrolled", y > 8);

      if (progressEl) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        var p = h > 0 ? Math.min(Math.max(y / h, 0), 1) : 0;
        progressEl.style.transform = "scaleX(" + p.toFixed(4) + ")";
      }

      if (!reduce && parallaxEls.length) {
        var vh = window.innerHeight;
        for (var i = 0; i < parallaxEls.length; i++) {
          var el = parallaxEls[i];
          var r = el.getBoundingClientRect();
          if (r.bottom < -50 || r.top > vh + 50) continue;
          var center = r.top + r.height / 2;
          var off = (center - vh / 2) / vh; // -1 .. 1 ungefähr
          var max = r.height * 0.06;
          var ty = Math.max(-max, Math.min(max, -off * max * 2));
          el.style.transform = "translate3d(0," + ty.toFixed(1) + "px,0) scale(1.12)";
        }
      }

      ticking = false;
    });
  }

  function collectParallax() {
    if (reduce) return;
    parallaxEls = Array.prototype.slice.call(
      document.querySelectorAll(".hero__media img, .editorial__media img")
    );
    parallaxEls.forEach(function (el) {
      el.classList.add("is-parallax");
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  /* ---- Scroll-Reveal -------------------------------------------------- */

  function initReveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!els.length) return;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            obs.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    els.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ---- Zähler (count-up) --------------------------------------------- */

  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var dec = parseInt(el.getAttribute("data-decimals") || "0", 10);
    if (isNaN(target)) return;
    var dur = 1500;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * eased).toFixed(dec);
      if (p < 1) window.requestAnimationFrame(step);
      else el.textContent = target.toFixed(dec);
    }
    window.requestAnimationFrame(step);
  }

  function initCounters() {
    var els = Array.prototype.slice.call(document.querySelectorAll("[data-count]"));
    if (!els.length) return;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach(function (el) {
        var d = parseInt(el.getAttribute("data-decimals") || "0", 10);
        el.textContent = parseFloat(el.getAttribute("data-count")).toFixed(d);
      });
      return;
    }
    var io = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            animateCount(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    els.forEach(function (el) {
      var d = parseInt(el.getAttribute("data-decimals") || "0", 10);
      el.textContent = (0).toFixed(d); // Startwert, von dem hochgezählt wird
      io.observe(el);
    });
  }

  /* ---- Magnetische Buttons ------------------------------------------- */

  function initMagnetic() {
    if (!canHover || reduce) return;
    var mags = Array.prototype.slice.call(document.querySelectorAll(".btn--solid, .floating-cta"));
    mags.forEach(function (el) {
      el.classList.add("is-magnetic");
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        var mx = e.clientX - (r.left + r.width / 2);
        var my = e.clientY - (r.top + r.height / 2);
        el.style.transform = "translate(" + (mx * 0.25).toFixed(1) + "px," + (my * 0.4).toFixed(1) + "px)";
      });
      el.addEventListener("pointerleave", function () {
        el.style.transform = "";
      });
    });
  }

  /* ---- Init ----------------------------------------------------------- */

  function init() {
    collectParallax();
    onScroll();
    initReveal();
    initCounters();
    initMagnetic();
  }

  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
