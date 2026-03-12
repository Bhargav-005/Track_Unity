import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust to your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const opportunityApi = {
  getDashboard: async () => {
    const response = await api.get('/dashboard');
    return response.data;
  },

  getOpportunities: async (category = 'all') => {
    const response = await api.get(`/opportunities?category=${category}`);
    return response.data;
  },

  extractOpportunity: async (message) => {
    const response = await api.post('/ingest/text', { message });
    return response.data;
  },

  uploadImage: async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await api.post('/ingest/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
