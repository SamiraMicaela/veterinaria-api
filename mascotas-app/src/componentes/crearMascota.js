import React, { useState, useEffect } from 'react';
import { createMascota } from '../services/mascotasService';
import { getDueños } from '../services/dueñosService';

const CrearMascota = () => {
  const [nombre, setNombre] = useState('');
  const [tipo, setTipo] = useState('');
  const [edad, setEdad] = useState(0);
  const [dueñoId, setDueñoId] = useState('');
  const [dueños, setDueños] = useState([]);

  useEffect(() => {
    getDueños().then((response) => setDueños(response.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    createMascota({ nombre, tipo, edad, dueñoId }).then(() => {
      // Manejar el éxito, como redirigir o mostrar un mensaje
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre" />
      <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} placeholder="Tipo" />
      <input type="number" value={edad} onChange={(e) => setEdad(parseInt(e.target.value))} placeholder="Edad" />
      <select value={dueñoId} onChange={(e) => setDueñoId(e.target.value)}>
        <option value="">Seleccionar Dueño</option>
        {dueños.map((dueño) => (
          <option key={dueño.id} value={dueño.id}>
            {dueño.nombre}
          </option>
        ))}
      </select>
      <button type="submit">Crear Mascota</button>
    </form>
  );
};

export default CrearMascota;
