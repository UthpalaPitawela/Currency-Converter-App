

export const setToCache = (type, data) => {
    localStorage.setItem(type, JSON.stringify(data))
}

export const getFromCache = (type) => {
    return JSON.parse(localStorage.getItem(type))
}

export const clearCache = (type) => {
    localStorage.removeItem(type);
}