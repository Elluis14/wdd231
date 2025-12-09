import { initCommon } from './common.js';

initCommon();

// Set timestamp in hidden field
const timestampField = document.querySelector('#timestamp');
if (timestampField) {
  timestampField.value = new Date().toISOString();
}
