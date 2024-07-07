import { IsString, IsInt } from 'class-validator';

export class CrearMascotaDto {
  @IsString()
  nombre: string;

  @IsString()
  tipo: string;

  @IsInt()
  edad: number;

  @IsString()
  dueño: string;
}