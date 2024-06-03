import { Module } from '@nestjs/common';
import { CampoDefinidoImagenService } from './campo-definido-imagen.service';
import { CampoDefinidoImagenController } from './campo-definido-imagen.controller';

@Module({
  controllers: [CampoDefinidoImagenController],
  providers: [CampoDefinidoImagenService],
})
export class CampoDefinidoImagenModule {}
