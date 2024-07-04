import { Injectable, NotFoundException } from '@nestjs/common';
import { Mascota } from './mascota.entity';
import { CrearMascotaDto } from './dto/crear-mascota.dto';
import { ActMascotaDto } from './dto/act-mascota.dto';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MascotasService {
  private readonly rutaArchivo = path.resolve(__dirname, 'data.json');
  private mascotas: Mascota[] = [];

  constructor() {
    this.cargarDesdeArchivo();
  }

  private cargarDesdeArchivo(): void {
    if (fs.existsSync(this.rutaArchivo)) {
      const contenidoArchivo = fs.readFileSync(this.rutaArchivo, 'utf-8');
      this.mascotas = JSON.parse(contenidoArchivo).mascotas;
    }
  }

  private guardarEnArchivo(): void {
    const datosAGuardar = { mascotas: this.mascotas };
    fs.writeFileSync(this.rutaArchivo, JSON.stringify(datosAGuardar, null, 2));
  }

  crear(crearMascotaDto: CrearMascotaDto): Mascota {
    const nuevaMascota: Mascota = {
      id: uuidv4(),
      ...crearMascotaDto,
    };
    this.mascotas.push(nuevaMascota);
    this.guardarEnArchivo();
    return nuevaMascota;
  }

  buscar(): Mascota[] {
    return this.mascotas;
  }

  buscarId(id: string): Mascota {
    const mascota = this.mascotas.find(m => m.id === id);
    if (!mascota) {
      throw new NotFoundException(`Mascota con ID ${id} no encontrada`);
    }
    return mascota;
  }

  act(id: string, actMascotaDto: ActMascotaDto): Mascota {
    const mascotaIndex = this.mascotas.findIndex(m => m.id === id);
    if (mascotaIndex === -1) {
      throw new NotFoundException(`Mascota con ID ${id} no encontrada`);
    }
    const mascotaActualizada = { ...this.mascotas[mascotaIndex], ...actMascotaDto };
    this.mascotas[mascotaIndex] = mascotaActualizada;
    this.guardarEnArchivo();
    return mascotaActualizada;
  }

  eliminar(id: string): void {
    const mascotaIndex = this.mascotas.findIndex(m => m.id === id);
    if (mascotaIndex === -1) {
      throw new NotFoundException(`Mascota con ID ${id} no encontrada`);
    }
    this.mascotas.splice(mascotaIndex, 1);
    this.guardarEnArchivo();
  }
}
