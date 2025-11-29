// Footer dynamic data
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Responsive nav
const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("main-nav");

menuBtn?.addEventListener("click", () => {
  const open = nav.style.display === "block";
  nav.style.display = open ? "none" : "block";
  menuBtn.setAttribute("aria-expanded", String(!open));
});

// Hidden timestamp when form is loaded
const tsInput = document.getElementById("timestamp");
if (tsInput) {
  tsInput.value = new Date().toISOString();
}

// Modal logic for membership cards
const benefitButtons = document.querySelectorAll(".benefits-btn");
const closeButtons = document.querySelectorAll(".close-dialog");

benefitButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const dialogId = btn.getAttribute("data-dialog");
    const dialog = document.getElementById(dialogId);
    if (dialog && typeof dialog.showModal === "function") {
      dialog.showModal();
    }
  });
});

closeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const dialog = btn.closest("dialog");
    if (dialog) {
      dialog.close();
    }
  });
});
