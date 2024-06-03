import { Module } from '@nestjs/common';
import { CampoDefinidoTextoService } from './campo-definido-texto.service';
import { CampoDefinidoTextoController } from './campo-definido-texto.controller';

@Module({
  controllers: [CampoDefinidoTextoController],
  providers: [CampoDefinidoTextoService],
})
export class CampoDefinidoTextoModule {}
