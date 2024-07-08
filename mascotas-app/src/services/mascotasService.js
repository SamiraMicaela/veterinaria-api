import axios from 'axios';

const API_URL = 'http://localhost:3000/mascotas';

export const getMascotas = () => {
    return axios.get(`${API_URL}/mascotas`);
};

export const crearMascota = (mascota) => {
    return axios.post(`${API_URL}/mascotas`, mascota);
};

export const actMascota = (id, mascota) => {
    return axios.put(`${API_URL}/mascota/${id}`, mascota);
};
export const eliminarMascota = (id) => {
    return axios.delete(`${API_URL}/mascotas/${id}`);
}