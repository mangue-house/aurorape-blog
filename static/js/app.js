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

  // Copy link share button
  document.querySelectorAll(".share-btn[data-copy]").forEach((btn) => {
    btn.addEventListener("click", () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const label = btn.querySelector(".share-btn__label");
        if (label) {
          const original = label.textContent;
          label.textContent = "Copiado!";
          setTimeout(() => (label.textContent = original), 2000);
        }
      });
    });
  });
});
