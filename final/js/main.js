import { initCommon } from './common.js';

initCommon();

// Local Storage visit message + featured neighborhoods on home page

const visitMessage = document.querySelector('#visitMessage');
if (visitMessage) {
  const now = Date.now();
  const lastVisit = Number(localStorage.getItem('ri_lastVisit'));

  if (!lastVisit) {
    visitMessage.textContent = 'Welcome! This is your first visit to Radar Inmobiliario Juárez.';
  } else {
    const diffMs = now - lastVisit;
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays <= 0) {
      visitMessage.textContent = 'Welcome back! You last visited earlier today.';
    } else if (diffDays === 1) {
      visitMessage.textContent = 'Welcome back! You last visited 1 day ago.';
    } else {
      visitMessage.textContent = `Welcome back! You last visited ${diffDays} days ago.`;
    }
  }

  localStorage.setItem('ri_lastVisit', String(now));
}

// Featured neighborhoods from JSON
const featuredContainer = document.querySelector('#featured-neighborhoods');

if (featuredContainer) {
  loadFeatured().catch((err) => {
    console.error(err);
    featuredContainer.textContent = 'Error loading featured neighborhoods.';
  });
}

async function loadFeatured() {
  const response = await fetch('data/properties.json');
  if (!response.ok) {
    throw new Error('Network error loading properties.json');
  }

  const data = await response.json();
  const properties = data.properties || [];

  // Take first 3 items as "featured"
  const featured = properties.slice(0, 3);

  featuredContainer.innerHTML = '';

  featured.forEach((prop) => {
    const card = document.createElement('article');
    card.className = 'feature-card';

    card.innerHTML = `
      <img src="${prop.image}" alt="${prop.title}" loading="lazy">
      <div class="feature-card-body">
        <h3>${prop.title}</h3>
        <p class="muted">${prop.neighborhood} · ${prop.type}</p>
        <p><strong>Price:</strong> ${prop.price.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
        <p><strong>Price per m²:</strong> ${prop.pricePerM2.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
      </div>
    `;

    featuredContainer.appendChild(card);
  });
}
