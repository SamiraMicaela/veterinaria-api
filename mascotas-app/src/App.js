import React, { useState, useEffect } from 'react';
import MascotasLista from './componentes/mascotasLista';
import MascotaForm from './componentes/MascotaForm';
import './App.css';

const App = () => {
  const [mascotaToEdit, setMascotaToEdit] = useState(null);

  const MascotasForm = ({ onSubmit }) => {
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('');
    const [edad, setEdad] = useState('');
    const [dueño, setDueño] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const newMascota = {
        nombre,
        tipo,
        edad: parseInt(edad),
        dueño,
      };
    } 
    try {
      const response = await fetch('http://localhost:3000/mascotas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMascota),
      });

      if (response.ok) {
        onSubmit();
        setNombre('');
        setTipo('');
        setEdad('');
        setDueño('');
      } else {
        console.error('Error adding mascota:', response.statusText);
      }
    } catch (error){
      console.error('Error adding student:', error);
    }
  }

  const handleEdit = (mascota) => {
    setMascotaToEdit(mascota);
  };

  const handleSave = () => {
    setMascotaToEdit(null);
  };

  return (
    <div>
      <MascotaForm mascotaToEdit={mascotaToEdit} onSave={handleSave} />
      <MascotasLista onEdit={handleEdit} />
    </div>
  );
};

export default App;
