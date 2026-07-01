// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("btn-menu");
  const mobileMenu = document.getElementById("mobile-menu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", open);
    });
  }

  // Search overlay
  const searchBtn = document.getElementById("btn-search");
  const searchOverlay = document.getElementById("search-overlay");
  const searchClose = document.getElementById("search-close");

  if (searchBtn && searchOverlay) {
    searchBtn.addEventListener("click", () => {
      searchOverlay.classList.add("is-open");
      searchOverlay.querySelector("input")?.focus();
    });

    searchClose?.addEventListener("click", () => {
      searchOverlay.classList.remove("is-open");
    });

    searchOverlay.addEventListener("click", (e) => {
      if (e.target === searchOverlay) searchOverlay.classList.remove("is-open");
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") searchOverlay.classList.remove("is-open");
    });
  }

  // Font size adjustment on article page
  const articleBody = document.getElementById("article-body");
  const fontDecrease = document.getElementById("font-decrease");
  const fontIncrease = document.getElementById("font-increase");

  if (articleBody && fontDecrease && fontIncrease) {
    const sizes = ["font-sm", "", "font-lg"];
    let idx = 1;

    fontDecrease.addEventListener("click", () => {
      if (idx > 0) {
        articleBody.classList.remove(sizes[idx]);
        idx--;
        if (sizes[idx]) articleBody.classList.add(sizes[idx]);
      }
    });

    fontIncrease.addEventListener("click", () => {
      if (idx < sizes.length - 1) {
        if (sizes[idx]) articleBody.classList.remove(sizes[idx]);
        idx++;
        articleBody.classList.add(sizes[idx]);
      }
    });
  }

  // Hero carousel
  (function () {
    const carousel = document.getElementById("hero-carousel");
    if (!carousel) return;

    const track = document.getElementById("hero-carousel-track");
    const slides = carousel.querySelectorAll(".hero-carousel__slide");
    const dots = carousel.querySelectorAll(".hero-carousel__dot");
    const btnPrev = carousel.querySelector(".hero-carousel__btn--prev");
    const btnNext = carousel.querySelector(".hero-carousel__btn--next");
    const total = slides.length;
    if (total <= 1) return;

    let current = 0;
    let timer = null;
    const INTERVAL = 4000;

    function goTo(idx) {
      slides[current].setAttribute("aria-hidden", "true");
      slides[current].querySelector("a").setAttribute("tabindex", "-1");
      dots[current].classList.remove("is-active");
      dots[current].setAttribute("aria-selected", "false");

      current = (idx + total) % total;
      track.style.transform = `translateX(-${current * 100}%)`;

      slides[current].removeAttribute("aria-hidden");
      slides[current].querySelector("a").setAttribute("tabindex", "0");
      dots[current].classList.add("is-active");
      dots[current].setAttribute("aria-selected", "true");
    }

    function startTimer() {
      clearInterval(timer); // sempre limpa antes de criar novo
      timer = setInterval(() => goTo(current + 1), INTERVAL);
    }

    btnNext?.addEventListener("click", () => { goTo(current + 1); startTimer(); });
    btnPrev?.addEventListener("click", () => { goTo(current - 1); startTimer(); });

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => { goTo(i); startTimer(); });
    });

    // Pausa ao hover — retoma com intervalo limpo
    carousel.addEventListener("mouseenter", () => clearInterval(timer));
    carousel.addEventListener("mouseleave", () => startTimer());

    // Swipe support
    let touchStartX = 0;
    carousel.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener("touchend", (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); resetTimer(); }
    }, { passive: true });

    // Keyboard
    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { goTo(current + 1); resetTimer(); }
      if (e.key === "ArrowLeft")  { goTo(current - 1); resetTimer(); }
    });

    startTimer();
  })();

  // Copy link share button
  document.querySelectorAll(".share-btn[data-copy], .piaui-share__btn[data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const original = btn.getAttribute("aria-label");
        btn.setAttribute("aria-label", "Copiado!");
        setTimeout(() => btn.setAttribute("aria-label", original), 2000);
      });
    });
  });
});
