// services/ApiService.js
// NOTE (important): change the BASE_URL to your local IP address WIFI
// Cmd - > ipconfig -> look for IPv4 Address

const BASE_URL = 'http://10.10.88.76:3000';

export const apiRequest = async (endpoint, method = 'GET', body = null) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Request Error at ${endpoint}:`, error.message);
    throw error;
  }
};
