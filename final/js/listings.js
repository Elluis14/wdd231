import { initCommon } from './common.js';

initCommon();

const grid = document.querySelector('#propertiesGrid');
const resultsCount = document.querySelector('#resultsCount');
const neighborhoodFilter = document.querySelector('#neighborhoodFilter');
const minPriceInput = document.querySelector('#minPrice');
const maxPriceInput = document.querySelector('#maxPrice');
const sortBySelect = document.querySelector('#sortBy');
const applyBtn = document.querySelector('#applyFilters');
const resetBtn = document.querySelector('#resetFilters');

const dialog = document.querySelector('#propertyDialog');
const dialogTitle = document.querySelector('#dialogTitle');
const dialogBody = document.querySelector('#dialogBody');
const closeDialogBtn = document.querySelector('#closeDialog');

let allProperties = [];
let currentList = [];

if (dialog && closeDialogBtn) {
  closeDialogBtn.addEventListener('click', () => {
    dialog.close();
  });
}

if (applyBtn && resetBtn) {
  applyBtn.addEventListener('click', applyFilters);
  resetBtn.addEventListener('click', resetFilters);
}

loadProperties().catch((err) => {
  console.error(err);
  if (grid) grid.textContent = 'Error loading property data.';
  if (resultsCount) resultsCount.textContent = '';
});

async function loadProperties() {
  const response = await fetch('data/properties.json');
  if (!response.ok) {
    throw new Error('Network error loading properties.json');
  }

  const data = await response.json();
  allProperties = data.properties || [];
  currentList = [...allProperties];

  populateNeighborhoodOptions(allProperties);
  renderProperties(currentList);
}

function populateNeighborhoodOptions(properties) {
  if (!neighborhoodFilter) return;

  const neighborhoods = Array.from(
    new Set(properties.map((p) => p.neighborhood))
  ).sort();

  neighborhoods.forEach((n) => {
    const opt = document.createElement('option');
    opt.value = n;
    opt.textContent = n;
    neighborhoodFilter.appendChild(opt);
  });
}

function applyFilters() {
  let list = [...allProperties];

  const nValue = neighborhoodFilter?.value || 'all';
  const minPrice = Number(minPriceInput?.value || 0);
  const maxPrice = Number(maxPriceInput?.value || 0);
  const sortBy = sortBySelect?.value || 'price-asc';

  // Filter by neighborhood
  if (nValue !== 'all') {
    list = list.filter((p) => p.neighborhood === nValue);
  }

  // Filter by price range
  if (minPrice > 0) {
    list = list.filter((p) => p.price >= minPrice);
  }

  if (maxPrice > 0) {
    list = list.filter((p) => p.price <= maxPrice);
  }

  // Sort
  list.sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'sqm-asc':
        return a.pricePerM2 - b.pricePerM2;
      case 'sqm-desc':
        return b.pricePerM2 - a.pricePerM2;
      default:
        return 0;
    }
  });

  currentList = list;
  renderProperties(currentList);
}

function resetFilters() {
  if (neighborhoodFilter) neighborhoodFilter.value = 'all';
  if (minPriceInput) minPriceInput.value = '';
  if (maxPriceInput) maxPriceInput.value = '';
  if (sortBySelect) sortBySelect.value = 'price-asc';

  currentList = [...allProperties];
  renderProperties(currentList);
}

function renderProperties(list) {
  if (!grid) return;

  grid.innerHTML = '';

  if (resultsCount) {
    resultsCount.textContent = `${list.length} properties found`;
  }

  list.forEach((prop) => {
    const card = document.createElement('article');
    card.className = 'property-card';

    card.innerHTML = `
      <img src="${prop.image}" alt="${prop.title}" loading="lazy">
      <div class="property-card-body">
        <h3>${prop.title}</h3>
        <p class="muted">${prop.neighborhood} · ${prop.type}</p>
        <p><strong>Price:</strong> ${prop.price.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
        <p><strong>Price per m²:</strong> ${prop.pricePerM2.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
        <div class="property-meta">
          <span>Size: ${prop.sizeM2} m²</span>
          <span>Beds: ${prop.beds}</span>
          <span>Baths: ${prop.baths}</span>
          <span>Yield: ${prop.rentalYield}%</span>
        </div>
        <button type="button" class="btn details-btn" data-id="${prop.id}">
          View Details
        </button>
      </div>
    `;

    grid.appendChild(card);
  });

  // Attach modal events
  const detailButtons = grid.querySelectorAll('.details-btn');
  detailButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = Number(btn.getAttribute('data-id'));
      openDetails(id);
    });
  });
}

function openDetails(id) {
  if (!dialog || !dialogTitle || !dialogBody) return;
  const prop = currentList.find((p) => p.id === id);
  if (!prop) return;

  dialogTitle.textContent = prop.title;
  dialogBody.innerHTML = `
    <p><strong>Neighborhood:</strong> ${prop.neighborhood}</p>
    <p><strong>Type:</strong> ${prop.type}</p>
    <p><strong>Price:</strong> ${prop.price.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
    <p><strong>Price per m²:</strong> ${prop.pricePerM2.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
    <p><strong>Size:</strong> ${prop.sizeM2} m²</p>
    <p><strong>Bedrooms:</strong> ${prop.beds} · <strong>Bathrooms:</strong> ${prop.baths}</p>
    <p><strong>Estimated rental yield:</strong> ${prop.rentalYield}%</p>
    <p>${prop.description}</p>
  `;

  dialog.showModal();
}
