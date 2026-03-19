"use strict";
// Lightweight smoothScrollTo used by HeaderMenu.tsx
window.smoothScrollTo = function(targetSelector) {
  var el = document.querySelector(targetSelector);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
