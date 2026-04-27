import { getEl } from "../lib/utils.js";

export function initNav() {
  const navToggle = getEl(".nav-toggle") || getEl(".nav_toggle");
  const nav = getEl(".primary-nav") || getEl(".nav");
  const MOBILE_BREAKPOINT = 900;

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");

      navToggle.setAttribute("aria-expanded", String(isOpen));
      nav.setAttribute("aria-expanded", String(isOpen));
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > MOBILE_BREAKPOINT) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        nav.setAttribute("aria-expanded", "false");
      }
    });
  }
}
