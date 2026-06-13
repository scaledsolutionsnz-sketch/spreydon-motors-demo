/* Spreydon Motors — interactions */
(function () {
  "use strict";

  // Intro overlay
  var intro = document.getElementById("intro");
  if (intro) {
    window.addEventListener("load", function () {
      setTimeout(function () { intro.classList.add("done"); }, 1300);
    });
    // safety: never trap the page
    setTimeout(function () { intro.classList.add("done"); }, 2600);
  }

  // Sticky nav state
  var nav = document.querySelector(".nav");
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 40) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Mobile menu
  var burger = document.querySelector(".nav__burger");
  var links = document.querySelector(".nav__links");
  if (burger && links) {
    burger.addEventListener("click", function () { links.classList.toggle("open"); });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { links.classList.remove("open"); });
    });
  }

  // Reveal on scroll
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  // Rolling hero
  var slides = document.querySelectorAll(".hero__slide");
  if (slides.length > 1 && !reduce) {
    var i = 0;
    setInterval(function () {
      slides[i].classList.remove("active");
      i = (i + 1) % slides.length;
      slides[i].classList.add("active");
    }, 6000);
  }
})();
