// Common layout behavior for all pages
export function initCommon() {
  // Responsive navigation (hamburger)
  const menuBtn = document.querySelector('#menu-btn');
  const nav = document.querySelector('#main-nav');

  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Footer year and last modified
  const yearSpan = document.querySelector('#year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const lastModifiedSpan = document.querySelector('#lastModified');
  if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
  }
}
