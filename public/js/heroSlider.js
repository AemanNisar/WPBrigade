// Hero slides
export function initHeroSlider() {
  var slider =
    document.querySelector(".hero-slider") ||
    document.querySelector(".hero_slider");
  if (!slider) return;

  var track =
    slider.querySelector(".hero-slider__track") ||
    slider.querySelector(".hero_track");
  var slides = slider.querySelectorAll(".hero-slider__slide, .hero_slide");
  var dots = slider.querySelectorAll(".slider-dots__dot, .slider_dot");
  var prevBtn =
    slider.querySelector(".hero-slider__arrow--prev") ||
    slider.querySelector(".hero_arrow-prev");
  var nextBtn =
    slider.querySelector(".hero-slider__arrow--next") ||
    slider.querySelector(".hero_arrow-next");

  if (!track || slides.length === 0) return;

  var TOTAL = slides.length;
  var AUTO_DELAY = 4000;
  var current = 0;
  var timer = null;

  function goTo(index) {
    current = (index + TOTAL) % TOTAL;
    var slideWidth = slider.getBoundingClientRect().width;
    track.style.transform = "translateX(-" + current * slideWidth + "px)";

    dots.forEach(function (dot, i) {
      dot.setAttribute("aria-selected", i === current ? "true" : "false");
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
