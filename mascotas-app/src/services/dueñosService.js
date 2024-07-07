import axios from 'axios';

const API_URL = 'http://localhost:3000/mascotas';

export const getMascotas = () => axios.get(API_URL);
export const getMascotaById = (id) => axios.get(`${API_URL}/${id}`);
export const createMascota = (data) => axios.post(API_URL, data);
export const updateMascota = (id, data) => axios.patch(`${API_URL}/${id}`, data);
export const deleteMascota = (id) => axios.delete(`${API_URL}/${id}`);
