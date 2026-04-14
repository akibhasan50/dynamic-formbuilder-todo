// ===== localStorage Helpers =====

const KEYS = {
  FORM_CONFIG: 'questionpro_form_config',
  FILTERS: 'questionpro_todo_filters',
};

// --- Form Config ---
export function saveFormConfig(config) {
  try {
    localStorage.setItem(KEYS.FORM_CONFIG, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save form config:', err);
  }
}

export function getFormConfig() {
  try {
    const data = localStorage.getItem(KEYS.FORM_CONFIG);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Failed to read form config:', err);
    return null;
  }
}

export function clearFormConfig() {
  localStorage.removeItem(KEYS.FORM_CONFIG);
}

// --- Todo Filters ---
export function saveFilters(filters) {
  try {
    localStorage.setItem(KEYS.FILTERS, JSON.stringify(filters));
  } catch (err) {
    console.error('Failed to save filters:', err);
  }
}

export function getFilters() {
  try {
    const data = localStorage.getItem(KEYS.FILTERS);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Failed to read filters:', err);
    return null;
  }
}

export function clearFilters() {
  localStorage.removeItem(KEYS.FILTERS);
}
