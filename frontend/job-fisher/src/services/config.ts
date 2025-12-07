/**
 * API Configuration
 * Handles base URL configuration for different environments
 */

const getApiBaseUrl = (): string => {
  // Check if we're in production
  const isProduction = import.meta.env.PROD;

  // If VITE_API_URL is explicitly set, use it (highest priority)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Otherwise, use environment-specific defaults
  if (isProduction) {
    // Production base URL - update this to your production API URL
    return import.meta.env.VITE_API_URL_PROD || "https://api.yourdomain.com";
  } else {
    // Development base URL
    return import.meta.env.VITE_API_URL_DEV || "http://localhost:3000";
  }
};

export const API_CONFIG = {
  baseURL: getApiBaseUrl(),
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
};

// Export for debugging purposes
export const getCurrentEnvironment = () => {
  return {
    mode: import.meta.env.MODE,
    isProduction: import.meta.env.PROD,
    isDevelopment: import.meta.env.DEV,
    baseURL: API_CONFIG.baseURL,
  };
};
