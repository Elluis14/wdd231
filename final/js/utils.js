// js/utils.js

export function formatPrice(value) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0
  }).format(value);
}

export function formatArea(m2) {
  return `${m2} m²`;
}

export function setYearAndLastModified() {
  const yearSpan = document.querySelector('#year');
  const modSpan = document.querySelector('#lastModified');

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (modSpan) {
    modSpan.textContent = document.lastModified;
  }
}

export function handleLastVisitMessage() {
  const el = document.querySelector('#last-visit');
  if (!el) return;

  const LAST_VISIT_KEY = 'radar_last_visit';
  const previous = localStorage.getItem(LAST_VISIT_KEY);
  const now = new Date().toISOString();
  localStorage.setItem(LAST_VISIT_KEY, now);

  if (!previous) {
    el.textContent = 'Es tu primera visita a Radar Inmobiliario Juárez desde este navegador.';
    return;
  }

  const prevDate = new Date(previous);
  const diffMs = Date.now() - prevDate.getTime();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    el.textContent = 'Volviste a visitar el sitio hoy. ¡Bienvenido de nuevo!';
  } else if (diffDays === 1) {
    el.textContent = 'Tu última visita fue hace 1 día.';
  } else {
    el.textContent = `Tu última visita fue hace ${diffDays} días.`;
  }
}
