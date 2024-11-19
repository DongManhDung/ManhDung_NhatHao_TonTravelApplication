// services/ApiService.js
// NOTE (important): change the BASE_URL to your local IP address WIFI

const BASE_URL = 'http://192.168.0.114:3000';

const apiRequest = async (endpoint, method = 'GET', body = null) => {
  try {
    console.log(`Request: ${method} ${BASE_URL}${endpoint}`);
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method, // Sử dụng method được truyền
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

export default apiRequest;
