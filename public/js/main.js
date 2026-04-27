import { initCountryState } from "./features/countryState.js";
import { initSiteSearch } from "./features/search.js";
import { initContactForm } from "./features/contact.js";
import { initVideoModal } from "./components/modal.js";
import { initHeroSlider } from "./components/heroSlider.js";
import { initGallerySlider } from "./components/gallerySlider.js";
import { initNav } from "./components/nav.js";
import { initAnnouncementBar } from "./components/announcement.js";

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
