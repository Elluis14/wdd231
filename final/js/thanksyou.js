import { initCommon } from './common.js';

initCommon();

const params = new URLSearchParams(window.location.search);

function setText(id, value) {
  const el = document.querySelector(id);
  if (el) {
    el.textContent = value || '';
  }
}

setText('#summaryFirstName', params.get('firstName'));
setText('#summaryLastName', params.get('lastName'));
setText('#summaryEmail', params.get('email'));
setText('#summaryPhone', params.get('phone'));
setText('#summaryNeighborhood', params.get('neighborhood'));
setText('#summaryPropertyType', params.get('propertyType'));
setText('#summaryBudget', params.get('budget'));
setText('#summaryNotes', params.get('notes'));

const ts = params.get('timestamp');
if (ts) {
  const date = new Date(ts);
  setText('#summaryTimestamp', isNaN(date.getTime()) ? ts : date.toLocaleString());
}
