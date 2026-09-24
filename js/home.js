// js/home.js — Hero slider de la page d'accueil
(function () {
  const hero = document.getElementById("homeHero");
  if (!hero) return;

  const slides = Array.from(hero.querySelectorAll(".home-hero-slide"));
  const dots = Array.from(hero.querySelectorAll(".home-hero-dot"));
  const prevBtn = hero.querySelector(".home-hero-prev");
  const nextBtn = hero.querySelector(".home-hero-next");

  if (!slides.length) return;

  const DELAY = 5000; // défilement automatique toutes les 5s
  let current = slides.findIndex((s) => s.classList.contains("is-active"));
  if (current < 0) current = 0;
  let timer = null;

  function goTo(index) {
    slides[current].classList.remove("is-active");
    if (dots[current]) dots[current].classList.remove("is-active");

    current = (index + slides.length) % slides.length;

    slides[current].classList.add("is-active");
    if (dots[current]) dots[current].classList.add("is-active");
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function start() {
    stop();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = setInterval(next, DELAY);
  }
  function stop() {
    if (timer) clearInterval(timer);
  }

  if (prevBtn) prevBtn.addEventListener("click", () => { prev(); start(); });
  if (nextBtn) nextBtn.addEventListener("click", () => { next(); start(); });
  dots.forEach((dot, i) => dot.addEventListener("click", () => { goTo(i); start(); }));

  // Pause au survol et au focus clavier, reprise à la sortie
  hero.addEventListener("mouseenter", stop);
  hero.addEventListener("mouseleave", start);
  hero.addEventListener("focusin", stop);
  hero.addEventListener("focusout", start);

  // Navigation au clavier (flèches gauche/droite)
  hero.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { prev(); start(); }
    if (e.key === "ArrowRight") { next(); start(); }
  });

  start();
})();