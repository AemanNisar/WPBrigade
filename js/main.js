window.addEventListener("load", () => {
  function getEl(selector, context = document) {
    const el = context.querySelector(selector);
    if (!el) console.warn(`[UI] Element not found: "${selector}"`);
    return el;
  }

  // announcement bar
  const announcementBar = getEl(".announcement-bar");
  const closeBtn = getEl(".cross");

  if (announcementBar && closeBtn) {
    closeBtn.addEventListener("click", () => {
      announcementBar.setAttribute("hidden", ""); // semantic HTML
      announcementBar.style.display = "none";
    });
  }
// togglee button
  const navToggle = getEl(".nav_toggle");
  const nav = getEl(".nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");

      navToggle.setAttribute("aria-expanded", String(isOpen));

      nav.setAttribute("aria-expanded", String(isOpen));
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 767) {
        nav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        nav.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Hero slides
  function initHeroSlider() {
    var slider = document.querySelector(".hero_slider");
    var track = document.querySelector(".hero_track");
    var slides = document.querySelectorAll(".hero_slide");
    var dots = document.querySelectorAll(".slider_dot");
    var prevBtn = document.querySelector(".hero_arrow-prev");
    var nextBtn = document.querySelector(".hero_arrow-next");

    if (!slider || !track || slides.length === 0) return;

    var TOTAL = slides.length;
    var AUTO_DELAY = 4000;
    var current = 0;
    var timer = null;

    function goTo(index) {
      current = (index + TOTAL) % TOTAL;
      var slideWidth = slider.offsetWidth;
      track.style.transform = "translateX(-" + current * slideWidth + "px)";
      dots.forEach(function (dot, i) {
        dot.style.background = i === current ? "white" : "#a8a8a8";
      });
    }

    function startAutoPlay() {
      clearInterval(timer);
      timer = setInterval(function () {
        goTo(current + 1);
      }, AUTO_DELAY);
    }

    if (prevBtn)
      prevBtn.addEventListener("click", function () {
        goTo(current - 1);
        startAutoPlay();
      });
    if (nextBtn)
      nextBtn.addEventListener("click", function () {
        goTo(current + 1);
        startAutoPlay();
      });

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        goTo(i);
        startAutoPlay();
      });
    });

    window.addEventListener("resize", function () {
      goTo(current);
    });
    goTo(0);
    startAutoPlay();
  }

  //   Gallery slider
  function initGallerySlider() {
    var layout = document.querySelector(".gallery_layout");
    var track = document.querySelector(".gallery_track");
    var items = document.querySelectorAll(".gallery_item");
    var dotsWrap = document.querySelector(".gallery_slider_dots");
    var prevBtn = document.querySelector(".gallery_arrow-prev");
    var nextBtn = document.querySelector(".gallery_arrow-next");

    if (!track || !layout || items.length === 0) return;

    var currentPage = 0;

    function getItemsPerView() {
      if (window.innerWidth <= 767) return 1;
      if (window.innerWidth <= 1024) return 3;
      return 4;
    }

    function totalPages() {
      return Math.ceil(items.length / getItemsPerView());
    }

    function goTo(page) {
      var max = totalPages() - 1;
      currentPage = Math.max(0, Math.min(page, max));

      var item = items[0];
      var cs = window.getComputedStyle(item);
      var itemW =
        item.offsetWidth +
        parseFloat(cs.marginLeft) +
        parseFloat(cs.marginRight);

      track.style.transform =
        "translateX(-" + currentPage * getItemsPerView() * itemW + "px)";
      updateDots();
    }

    function buildDots() {
      dotsWrap.innerHTML = "";
      var pages = totalPages();
      for (var i = 0; i < pages; i++) {
        var dot = document.createElement("button");
        dot.className = "gallery_slider_dot";
        dot.setAttribute("aria-label", "Page " + (i + 1));
        (function (idx) {
          dot.addEventListener("click", function () {
            goTo(idx);
          });
        })(i);
        dotsWrap.appendChild(dot);
      }
      updateDots();
    }

    function updateDots() {
      dotsWrap
        .querySelectorAll(".gallery_slider_dot")
        .forEach(function (dot, i) {
          dot.style.background = i === currentPage ? "white" : "#a8a8a8";
        });
    }

    if (prevBtn)
      prevBtn.addEventListener("click", function () {
        goTo(currentPage - 1);
      });
    if (nextBtn)
      nextBtn.addEventListener("click", function () {
        goTo(currentPage + 1);
      });

    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        buildDots();
        goTo(0);
      }, 200);
    });

    buildDots();
    goTo(0);
  }

  initHeroSlider();
  initGallerySlider();
});
