/**
 * API Configuration - clean version for Vercel deployment
 */

const getApiBaseUrl = (): string => {
  // Always rely on ONE variable
  const url = import.meta.env.VITE_API_URL;

  if (!url) {
    console.warn("⚠️ VITE_API_URL not set. Falling back to localhost.");
    return "http://localhost:3000";
  }

  return url;
};

export const API_CONFIG = {
  baseURL: getApiBaseUrl(),
  timeout: 60000*2,
  headers: {
    "Content-Type": "application/json",
  },
};

export const getCurrentEnvironment = () => ({
  mode: import.meta.env.MODE,
  isProduction: import.meta.env.PROD,
  isDevelopment: import.meta.env.DEV,
  baseURL: API_CONFIG.baseURL,
});
