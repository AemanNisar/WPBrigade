import { initCountryState } from "./countryState.js";
import { initSiteSearch } from "./search.js";
import { initContactForm } from "./contact.js";
import { initVideoModal } from "./modal.js";
import { initHeroSlider } from "./heroSlider.js";
import { initGallerySlider } from "./gallerySlider.js";
import { initNav } from "./nav.js";
import { initAnnouncementBar } from "./announcement.js";

window.addEventListener("load", () => {
  initSiteSearch();
  initHeroSlider();
  initGallerySlider();
  initVideoModal();
  initContactForm();
  initCountryState();
  initNav();
  initAnnouncementBar();
});
