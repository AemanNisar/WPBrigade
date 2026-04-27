export function initVideoModal() {
  const modal = document.querySelector(".video-modal");
  if (!modal) return;

  const iframe = modal.querySelector("iframe");
  const dialog = modal.querySelector(".video-modal__dialog");
  const closeBtn = modal.querySelector(".video-modal__close");
  const closeEls = modal.querySelectorAll("[data-video-close]");
  const openBtns = document.querySelectorAll(".hero-slider__play-btn");

  const embedUrl =
    "https://www.youtube.com/embed/gkIKphi2_P4?autoplay=1&mute=1&playsinline=1";

  function open() {
    modal.hidden = false;
    document.body.classList.add("is-video-open");
    if (iframe) iframe.src = embedUrl;
    if (closeBtn) closeBtn.focus();
  }

  function close() {
    modal.hidden = true;
    document.body.classList.remove("is-video-open");
    if (iframe) iframe.src = "";
  }

  // Ensure it never shows/plays on load (author CSS can override `[hidden]`).
  close();

  openBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      open();
    });
  });

  closeEls.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      close();
    });
  });

  if (dialog) {
    dialog.addEventListener("click", (e) => e.stopPropagation());
  }

  modal.addEventListener("click", () => close());

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) close();
  });
}