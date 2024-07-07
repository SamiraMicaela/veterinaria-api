import { Module } from '@nestjs/common';
import { MascotasModule } from './mascotas/mascotas.module';


@Module({
  imports: [MascotasModule],
  controllers: [],
  providers: [],
})
export class AppModule {}