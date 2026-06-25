/* ==========================================================================
   KLUNKER — minimale, unaufdringliche Interaktionen
   Nur das Nötigste: Mobile-Navigation öffnen/schließen.
   ========================================================================== */

(function () {
  "use strict";

  var root = document.documentElement;

  function openNav() {
    root.classList.add("nav-open");
    document.body.style.overflow = "hidden";
    var toggle = document.querySelector("[data-menu-toggle]");
    if (toggle) toggle.setAttribute("aria-expanded", "true");
  }

  function closeNav() {
    root.classList.remove("nav-open");
    document.body.style.overflow = "";
    var toggle = document.querySelector("[data-menu-toggle]");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }

  document.addEventListener("click", function (event) {
    if (event.target.closest("[data-menu-toggle]")) {
      event.preventDefault();
      root.classList.contains("nav-open") ? closeNav() : openNav();
      return;
    }

    if (
      event.target.closest("[data-menu-close]") ||
      event.target.matches("[data-nav-overlay]")
    ) {
      closeNav();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && root.classList.contains("nav-open")) {
      closeNav();
    }
  });
})();
