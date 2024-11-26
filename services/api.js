import axios from 'axios';

const api = axios.create({
  baseURL: 'https://eonet.gsfc.nasa.gov/api/v2.1', // Base URL de la API
});

// Función para obtener eventos
export const getEvents = async (params = {}) => {
  try {
    const response = await api.get('/events', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

// Función para obtener detalles de un evento por ID
export const getEventById = async (eventId) => {
  try {
    const response = await api.get(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching event by ID:', error);
    throw error;
  }
};

// Función para obtener categorías
export const getCategories = async (categoryId) => {
  try {
    const response = await api.get(`/categories/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw error;
  }
};

// Función para obtener todas las categorías
export const getAllCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching all categories:', error);
    throw error;
  }
};

// Función para obtener capas (layers) de una categoría
export const getLayers = async (categoryId) => {
  try {
    const response = await api.get(`/layers/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching layers:', error);
    throw error;
  }
};

// Función para obtener detalles de una capa por ID
export const getLayerById = async (layerId) => {
  try {
    const response = await api.get(`/layers/${layerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching layer by ID:', error);
    throw error;
  }
};

