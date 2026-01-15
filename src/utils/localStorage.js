/**
 * Safe localStorage utility functions
 * Prevents "undefined is not valid JSON" errors
 */

/**
 * Safely parse JSON from localStorage
 * @param {string} key - The localStorage key
 * @param {any} defaultValue - Default value to return if parsing fails
 * @returns {any} Parsed value or default value
 */
export const safeJsonParse = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    
    // Check for null, undefined, or invalid string values
    if (!item || item === "undefined" || item === "null") {
      return defaultValue;
    }
    
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error parsing ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Safely stringify and save to localStorage
 * @param {string} key - The localStorage key
 * @param {any} value - Value to save
 * @returns {boolean} Success status
 */
export const safeJsonStringify = (key, value) => {
  try {
    if (value === undefined) {
      console.warn(`Attempting to save undefined value for key: ${key}`);
      return false;
    }
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    return false;
  }
};

/**
 * Safely remove item from localStorage
 * @param {string} key - The localStorage key
 */
export const safeRemoveItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
  }
};

/**
 * Get user from localStorage safely
 * @returns {object|null} User object or null
 */
export const getUser = () => {
  return safeJsonParse("user");
};

/**
 * Get user ID from localStorage safely
 * @returns {string|null} User ID or null
 */
export const getUserId = () => {
  const user = getUser();
  return user?._id || null;
};

/**
 * Get token from localStorage safely
 * @returns {string|null} Token or null
 */
export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token || token === "undefined" || token === "null") {
    return null;
  }
  return token;
};

/**
 * Get reading list from localStorage safely
 * @returns {array} Reading list array (empty if not found)
 */
export const getReadingList = () => {
  return safeJsonParse("reading list", []);
};

/**
 * Clear all auth data from localStorage
 */
export const clearAuthData = () => {
  safeRemoveItem("user");
  safeRemoveItem("token");
  safeRemoveItem("reading list");
  safeRemoveItem("isGoogle");
};