import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.agrotech.com', // Cambia esto por tu URL de API
});

export const getProblems = async () => {
  const response = await api.get('/problems');
  return response.data;
};

export const getSolutions = async () => {
  const response = await api.get('/solutions');
  return response.data;
};
