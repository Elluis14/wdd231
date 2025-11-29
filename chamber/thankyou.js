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

// Read query params from the GET request
const params = new URLSearchParams(window.location.search);

function setField(id, name) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = params.get(name) || "(not provided)";
  }
}

setField("out-firstName", "firstName");
setField("out-lastName", "lastName");
setField("out-email", "email");
setField("out-phone", "phone");
setField("out-organization", "organization");
setField("out-timestamp", "timestamp");
