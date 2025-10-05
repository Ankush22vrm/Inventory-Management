
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api`;

const api = {
  async request(url, options = {}) {
    const token = localStorage.getItem('token');

    const headers = {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    // Only add Content-Type if not FormData
    if (!(options.body instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const config = {
      ...options,
      headers,
      body:
        options.body instanceof FormData
          ? options.body
          : options.body
          ? JSON.stringify(options.body)
          : undefined,
    };

    console.log('API Request:', {
      url: `${API_URL}${url}`,
      method: options.method,
      isFormData: options.body instanceof FormData,
      headers: config.headers,
    });

    try {
      const response = await fetch(`${API_URL}${url}`, config);
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        console.error('API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          data,
        });
        
        // Better error message handling
        const errorMessage = 
          data.message || 
          (data.errors && Array.isArray(data.errors) ? data.errors.map(e => e.msg).join(', ') : '') ||
          'Something went wrong';
        
        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      console.error('API Request Failed:', error);
      throw error;
    }
  },

  get(url) {
    return this.request(url, { method: 'GET' });
  },
  post(url, body) {
    return this.request(url, { method: 'POST', body });
  },
  put(url, body) {
    return this.request(url, { method: 'PUT', body });
  },
  delete(url) {
    return this.request(url, { method: 'DELETE' });
  },
};

export const getImageURL = (path) => `${API_BASE_URL}${path}`;
export default api;