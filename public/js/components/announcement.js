import { getEl } from "../lib/utils.js";

export function initAnnouncementBar() {
  const announcementBar = getEl(".announcement-bar");
  const closeBtn = getEl(".announcement-bar__close") || getEl(".cross");

  if (announcementBar && closeBtn) {
    closeBtn.addEventListener("click", () => {
      announcementBar.setAttribute("hidden", "");
      announcementBar.style.display = "none";
    });
  }
}
