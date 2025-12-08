// discover.js
// Usar como módulo ES

// ---------- UTILIDADES BÁSICAS ----------
const yearSpan = document.querySelector("#year");
const lastModifiedSpan = document.querySelector("#lastModified");

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
if (lastModifiedSpan) {
  lastModifiedSpan.textContent = document.lastModified;
}

// ---------- MENÚ RESPONSIVO ----------
const menuBtn = document.querySelector("#menu-btn");
const mainNav = document.querySelector("#main-nav");

if (menuBtn && mainNav) {
  menuBtn.addEventListener("click", () => {
    const expanded = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!expanded));
    mainNav.classList.toggle("open");
  });
}

// ---------- LOCALSTORAGE: ÚLTIMA VISITA ----------
const visitMessage = document.querySelector("#visit-message");
const VISIT_KEY = "discoverLastVisit";

if (visitMessage) {
  const now = Date.now();
  const lastVisit = localStorage.getItem(VISIT_KEY);

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! This is your first time visiting the Discover page.";
  } else {
    const daysDiff = Math.round((now - Number(lastVisit)) / (1000 * 60 * 60 * 24));
    if (daysDiff === 0) {
      visitMessage.textContent = "Welcome back! You last visited this page earlier today.";
    } else if (daysDiff === 1) {
      visitMessage.textContent = "Welcome back! It has been 1 day since your last visit.";
    } else {
      visitMessage.textContent = `Welcome back! It has been ${daysDiff} days since your last visit.`;
    }
  }

  localStorage.setItem(VISIT_KEY, String(now));
}

// ---------- CARGAR JSON Y CONSTRUIR TARJETAS ----------
const gridContainer = document.querySelector("#discover-grid");

async function loadPlaces() {
  if (!gridContainer) return;

  try {
    const response = await fetch("data/discover.json");
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    const places = data.places || [];

    gridContainer.innerHTML = "";

    places.forEach((place, index) => {
      const card = document.createElement("article");
      card.classList.add("discover-card", `card${index + 1}`);

      const img = document.createElement("img");
      img.src = place.image;
      img.alt = place.alt || place.title;
      img.loading = "lazy";

      const title = document.createElement("h3");
      title.textContent = place.title;

      const addr = document.createElement("p");
      addr.classList.add("place-address");
      addr.textContent = place.address;

      const desc = document.createElement("p");
      desc.classList.add("place-description");
      desc.textContent = place.description;

      const button = document.createElement("button");
      button.classList.add("learn-more-btn");
      button.type = "button";
      button.textContent = "Learn More";
      button.addEventListener("click", () => {
        alert(`More about: ${place.title}\n\n${place.description}`);
      });

      card.appendChild(img);
      card.appendChild(title);
      card.appendChild(addr);
      card.appendChild(desc);
      card.appendChild(button);

      gridContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading discover places:", error);
    gridContainer.innerHTML = `<p class="error">Unable to load the places at this time. Please try again later.</p>`;
  }
}

loadPlaces();
