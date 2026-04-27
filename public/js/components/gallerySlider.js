export function initGallerySlider() {
  var slider =
    document.querySelector(".gallery-slider") ||
    document.querySelector(".gallery_layout");
  if (!slider) return;

  var track =
    slider.querySelector(".gallery-slider__list") ||
    document.querySelector(".gallery_track");
  var items = slider.querySelectorAll(".gallery-slider__item, .gallery_item");
  var dotsWrap =
    document.querySelector(".gallery-slider__dots") ||
    document.querySelector(".gallery_slider_dots");
  var prevBtn =
    slider.querySelector(".gallery-slider__arrow--prev") ||
    document.querySelector(".gallery_arrow-prev");
  var nextBtn =
    slider.querySelector(".gallery-slider__arrow--next") ||
    document.querySelector(".gallery_arrow-next");

  if (!track || items.length === 0 || !dotsWrap) return;

  var currentPage = 0;

  function getItemsPerView() {
    if (window.innerWidth <= 580) return 1;
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
    var trackCs = window.getComputedStyle(track);
    var gap =
      parseFloat(trackCs.columnGap) ||
      parseFloat(trackCs.gap) ||
      parseFloat(trackCs.rowGap) ||
      0;
    var itemW =
      item.offsetWidth +
      gap +
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
      dot.className = "slider-dots__dot";
      dot.setAttribute("aria-label", "Page " + (i + 1));
      dot.setAttribute("aria-selected", i === currentPage ? "true" : "false");
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
    dotsWrap.querySelectorAll(".slider-dots__dot").forEach(function (dot, i) {
      dot.setAttribute("aria-selected", i === currentPage ? "true" : "false");
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
