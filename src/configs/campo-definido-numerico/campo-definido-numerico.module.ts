import { Module } from '@nestjs/common';
import { CampoDefinidoNumericoService } from './campo-definido-numerico.service';
import { CampoDefinidoNumericoController } from './campo-definido-numerico.controller';

@Module({
  controllers: [CampoDefinidoNumericoController],
  providers: [CampoDefinidoNumericoService],
})
export class CampoDefinidoNumericoModule {}
