import { IsString, IsInt, IsOptional } from 'class-validator';

export class ActMascotaDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  tipo?: string;

  @IsInt()
  @IsOptional()
  edad?: number;

  @IsString()
  @IsOptional()
  dueño?: string;
}