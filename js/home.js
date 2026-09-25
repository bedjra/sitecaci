// js/home.js — Hero slider de la page d'accueil
(function () {
  const hero = document.getElementById("homeHero");
  if (!hero) return;

  const slides = Array.from(hero.querySelectorAll(".home-hero-slide"));
  const dots = Array.from(hero.querySelectorAll(".home-hero-dot"));
  const prevBtn = hero.querySelector(".home-hero-prev");
  const nextBtn = hero.querySelector(".home-hero-next");
  if (!slides.length) return;

  const DELAY = 5000;
  let current = Math.max(0, slides.findIndex((s) => s.classList.contains("is-active")));
  let timer = null;

  function goTo(index) {
    slides[current].classList.remove("is-active");
    dots[current]?.classList.remove("is-active");

    current = (index + slides.length) % slides.length;

    slides[current].classList.add("is-active");
    dots[current]?.classList.add("is-active");
  }

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  function start() {
    stop();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = setInterval(next, DELAY);
  }
  function stop() {
    if (timer) clearInterval(timer);
  }

  prevBtn?.addEventListener("click", () => { prev(); start(); });
  nextBtn?.addEventListener("click", () => { next(); start(); });
  dots.forEach((dot, i) => dot.addEventListener("click", () => { goTo(i); start(); }));

  hero.addEventListener("mouseenter", stop);
  hero.addEventListener("mouseleave", start);
  hero.addEventListener("focusin", stop);
  hero.addEventListener("focusout", start);

  hero.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { prev(); start(); }
    if (e.key === "ArrowRight") { next(); start(); }
  });

  start();
})();