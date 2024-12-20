// services/ApiService.js
// NOTE (important): change the BASE_URL below to your local IPV4 address WIFI

const BASE_URL = 'http://10.10.88.77:3000';

const apiRequest = async (endpoint, method = 'GET', body = null, queryParams = null) => {
  try {
    let url = `${BASE_URL}${endpoint}`;
    if (method === 'GET' && queryParams) {
      const queryString = new URLSearchParams(queryParams).toString();
      url += `?${queryString}`;
    }

    console.log(`Request: ${method} ${url}`);
    const response = await fetch(url, {
      method, // Sử dụng method được truyền
      headers: {
        'Content-Type': 'application/json',
      },
      body: method !== 'GET' && body ? JSON.stringify(body) : null,
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

