(function () {
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    /* ==============================
       1) TITRE HERO — révélation lettre par lettre
    ================================= */
    function splitTitle(selector) {
        var el = document.querySelector(selector);
        if (!el) return;

        var text = el.textContent;
        el.textContent = "";
        el.setAttribute("aria-label", text);

        text.split("").forEach(function (char, i) {
            var span = document.createElement("span");
            span.textContent = char === " " ? "\u00A0" : char;
            span.style.display = "inline-block";
            span.style.opacity = "0";
            span.style.transform = "translateY(30px) rotate(6deg)";
            span.style.transition = "opacity 0.5s ease, transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
            span.style.transitionDelay = (i * 0.025) + "s";
            el.appendChild(span);
        });

        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                el.querySelectorAll("span").forEach(function (span) {
                    span.style.opacity = "1";
                    span.style.transform = "translateY(0) rotate(0deg)";
                });
            });
        });
    }

splitTitle(".sect-hero h1, .hero h1, .about-hero h1");

    /* ==============================
       2) BLOBS ANIMÉS EN FOND DU HERO
    ================================= */
    function injectBlobs() {

        var hero = document.querySelector(".sect-hero, .hero, .about-hero");
        if (!hero) return;


        var wrap = document.createElement("div");
        wrap.className = "hero-blobs";
        wrap.innerHTML =
            '<span class="blob blob-1"></span>' +
            '<span class="blob blob-2"></span>' +
            '<span class="blob blob-3"></span>';
        hero.insertBefore(wrap, hero.firstChild);
    }

    injectBlobs();


    /* ==============================
       3) BOUTONS MAGNÉTIQUES
    ================================= */
    function magneticButtons(selector) {
        document.querySelectorAll(selector).forEach(function (btn) {
            btn.addEventListener("mousemove", function (e) {
                var rect = btn.getBoundingClientRect();
                var x = e.clientX - rect.left - rect.width / 2;
                var y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = "translate(" + x * 0.2 + "px," + y * 0.3 + "px)";
            });

            btn.addEventListener("mouseleave", function () {
                btn.style.transform = "translate(0, 0)";
            });
        });
    }

    magneticButtons(".sect-hero-links a, .sect-cta-btn, .pillar-cta, .cta-btn, .card .btn");


    /* ==============================
       4) EFFET RIPPLE AU CLIC
    ================================= */
    function addRipple(selector) {
        document.querySelectorAll(selector).forEach(function (btn) {
            btn.style.position = btn.style.position || "relative";
            btn.style.overflow = "hidden";

            btn.addEventListener("click", function (e) {
                var rect = btn.getBoundingClientRect();
                var ripple = document.createElement("span");
                var size = Math.max(rect.width, rect.height) * 2;

                ripple.className = "ripple-effect";
                ripple.style.width = ripple.style.height = size + "px";
                ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
                ripple.style.top = (e.clientY - rect.top - size / 2) + "px";

                btn.appendChild(ripple);
                ripple.addEventListener("animationend", function () {
                    ripple.remove();
                });
            });
        });
    }

    addRipple(".sect-hero-links a, .sect-cta-btn, .cta-btn, .card .btn");


    /* ==============================
       5) TILT 3D SUR LES CARTES
    ================================= */
    function tiltCards(selector) {
        document.querySelectorAll(selector).forEach(function (card) {
            card.style.transformStyle = "preserve-3d";
            card.style.willChange = "transform";

            card.addEventListener("mousemove", function (e) {
                var rect = card.getBoundingClientRect();
                var x = (e.clientX - rect.left) / rect.width - 0.5;
                var y = (e.clientY - rect.top) / rect.height - 0.5;

                card.style.transform =
                    "perspective(700px) rotateY(" + (x * 10) + "deg) rotateX(" + (y * -10) + "deg) translateY(-6px)";
            });

            card.addEventListener("mouseleave", function () {
                card.style.transform = "perspective(700px) rotateY(0deg) rotateX(0deg) translateY(0)";
            });
        });
    }

    tiltCards(".pillar-figure, .card");


    /* ==============================
       6) SCROLL REVEAL "DRAMATIQUE"
    ================================= */
    var dramaticItems = document.querySelectorAll(
        ".mark, .sect-cta, .pillar, .card, .cta-card"
    );

    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        dramaticItems.forEach(function (el) { observer.observe(el); });
    } else {
        dramaticItems.forEach(function (el) { el.classList.add("is-visible"); });
    }


    /* ==============================
       7) PARALLAXE SUR L'IMAGE HERO AU SCROLL
    ================================= */
var heroImg = document.querySelector(".sect-hero .hero-img, .hero .hero-img, .about-hero .about-hero-img");    if (heroImg) {
        window.addEventListener("scroll", function () {
            var scrolled = window.scrollY;
            heroImg.style.transform =
                "translate(-50%, calc(-50% + " + (scrolled * 0.15) + "px)) scale(1.05)";
        }, { passive: true });
    }

})();