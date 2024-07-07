import { Controller, Get, Post, Body, Param, Put, Delete, UsePipes, ValidationPipe, BadRequestException, NotFoundException } from '@nestjs/common';
import { MascotasService } from './mascotas.service';
import { CrearMascotaDto } from './dto/crear-mascota.dto';
import { ActMascotaDto } from './dto/act-mascota.dto';
import { Mascota } from './mascota.entity';

@Controller('mascotas')
export class MascotasController {
    constructor(private readonly mascotasService: MascotasService) { }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    crear(@Body() crearMascotaDto: CrearMascotaDto): Mascota {
        try {
            return this.mascotasService.crear(crearMascotaDto);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException('Error al crear la mascota.');
        }
    }

    @Get()
    buscar(): Mascota[] {
        try {
            return this.mascotasService.buscar();
        } catch (error) {
            throw new NotFoundException('No se encontraron mascotas.');
        }
    }

    @Get(':id')
    buscarId(@Param('id') id: string): Mascota {
        try {
            return this.mascotasService.buscarId(id);
        } catch (error) {
            throw new NotFoundException(`Mascota con id ${id} no encontrada.`);
        }
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    act(@Param('id') id: string, @Body() actMascotaDto: ActMascotaDto): Mascota {
        try {
            return this.mascotasService.act(id, actMascotaDto);
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException(`Error al actualizar la mascota con id ${id}.`);
        }
    }

    @Delete(':id')
    eliminar(@Param('id') id: string): void {
        try {
            this.mascotasService.eliminar(id);
        } catch (error) {
            throw new NotFoundException(`Error al eliminar la mascota con id ${id}.`);
        }
    }
}
