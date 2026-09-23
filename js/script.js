// script.js — comportement partagé par toutes les pages (menu burger)

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("burgerBtn");
  const nav = document.getElementById("mainNav");

  if (!burger || !nav) return;

  burger.addEventListener("click", () => {
    burger.classList.toggle("open");
    nav.classList.toggle("open");
  });

  // Ferme le menu mobile quand on clique un lien
  document.querySelectorAll(".main-nav a").forEach((link) => {
    link.addEventListener("click", () => {
      burger.classList.remove("open");
      nav.classList.remove("open");
    });
  });
});