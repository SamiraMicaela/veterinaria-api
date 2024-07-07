import { Controller, Get, Post, Body, Param, Put, Delete,UsePipes, ValidationPipe } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { CrearMascotaDto } from './dto/crear-mascota.dto';
import { ActMascotaDto } from './dto/act-mascota.dto';
import { Mascota } from './mascota.entity';

@Controller('mascotas')
export class MascotasController {
  constructor(private readonly mascotasService: MascotasService) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true }))
  crear(@Body() crearMascotaDto: CrearMascotaDto): Mascota {
    return this.mascotasService.crear(crearMascotaDto);
  }

  @Get()
  buscar(): Mascota[] {
    return this.mascotasService.buscar();
  }

  @Get(':id')
  buscarId(@Param('id') id: string): Mascota {
    return this.mascotasService.buscarId(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  act(@Param('id') id: string, @Body() actMascotaDto: ActMascotaDto): Mascota {
    return this.mascotasService.act(id, actMascotaDto);
  }

  @Delete(':id')
  eliminar(@Param('id') id: string): void {
    return this.mascotasService.eliminar(id);
  }
}
