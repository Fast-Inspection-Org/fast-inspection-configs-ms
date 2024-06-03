import { Module } from '@nestjs/common';
import { CampoDefinidoSeleccionService } from './campo-definido-seleccion.service';
import { CampoDefinidoSeleccionController } from './campo-definido-seleccion.controller';

@Module({
  controllers: [CampoDefinidoSeleccionController],
  providers: [CampoDefinidoSeleccionService],
})
export class CampoDefinidoSeleccionModule {}
