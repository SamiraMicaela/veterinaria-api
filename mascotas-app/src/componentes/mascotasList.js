import React, {useEffect, useState} from `React`;
import { getMascotas, crearMascota, actMascota, eliminarMascota} from "../services/mascotasService";

const MascotasList = ({onEdit})=>{
    const [mascotas, setMascotas]= useState([]);

    useEffect(()=>{
        fetchMascotas();
    }, []);

    const fetchMascotas = async () => {
        const response = await getMascotas();
        setMascotas(response.data);
    }

    const handleDelete = async (id) => {
        await eliminarMascota(id);
        fetchMascotas();
    }

    retunr (
        <div>
            <h1>Lista de Mascotas</h1>
            <ul>
                {mascotas.map((mascota)=>(
                    <li>
                        {mascotas.nombre}- {mascota.tipo}- {mascota.edad}años- Dueño  {mascota.dueño}
                        <button onClick={()=> onEdit(mascota)}>Editar</button>
                        <button onClick={()=>handleDelete(mascota.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    )
    
}
export default MascotasList;