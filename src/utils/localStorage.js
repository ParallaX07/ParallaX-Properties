const addToStorage = (key, item) => {
    // Add to local storage
    localStorage.setItem(key, JSON.stringify(item));
};

const getFromStorage = (key) => {
    // Get from local storage
    if (!localStorage.getItem(key)) {
        return [];
    }
    return JSON.parse(localStorage.getItem(key));
};

export { addToStorage, getFromStorage };
