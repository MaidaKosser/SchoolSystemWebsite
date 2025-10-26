export const loadData = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (err) {
    console.error("Error loading from localStorage:", err);
    return [];
  }
};

export const saveData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error("Error saving to localStorage:", err);
  }
};
