import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Services
export const getServices = () => api.get('/api/services');
export const getService = (id) => api.get(`/api/services/${id}`);
export const createService = (data) => api.post('/api/services', data);
export const updateService = (id, data) => api.put(`/api/services/${id}`, data);
export const deleteService = (id) => api.delete(`/api/services/${id}`);

// Gallery
export const getGallery = (category = null) => {
  const params = category ? { category } : {};
  return api.get('/api/gallery', { params });
};
export const getGalleryItem = (id) => api.get(`/api/gallery/${id}`);
export const getFeaturedGallery = () => api.get('/api/gallery/featured');
export const createGalleryItem = (data) => api.post('/api/gallery', data);
export const deleteGalleryItem = (id) => api.delete(`/api/gallery/${id}`);

// Contact
export const sendContact = (data) => api.post('/api/contact', data);
export const getContacts = (status = null) => {
  const params = status ? { status } : {};
  return api.get('/api/contacts', { params });
};
export const updateContactStatus = (id, status) => api.put(`/api/contacts/${id}`, { status });

export default api;
