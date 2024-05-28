import { Module } from '@nestjs/common';
import { ControladorEdificacionesController } from './controlador-edificaciones.controller';
import { ControladorEdificacionesService } from './controlador-edificaciones.service';
import { EdificacionController } from './edificacion/edificacion.controller';
import { EdificacionService } from './edificacion/edificacion.service';
import { LevantamientoController } from './levantamiento/levantamiento.controller';
import { LevantamientoService } from './levantamiento/levantamiento.service';
import { DeterioroController } from './deterioro/deterioro.controller';
import { DeterioroService } from './deterioro/deterioro.service';
import { Deterioro } from './deterioro/deterioro.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Edificacion } from './edificacion/edificacion.entity';
import { Levantamiento } from './levantamiento/levantamiento.entity';
import { ValorCampoDefinidoController } from './valor-campo-definido/valor-campo-definido.controller';
import { ValorCampoDefinidoService } from './valor-campo-definido/valor-campo-definido.service';
import { ValorCampoDefinido } from './valor-campo-definido/valor-campo-definido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Deterioro, Edificacion, Levantamiento, ValorCampoDefinido])],
  controllers: [ControladorEdificacionesController, EdificacionController, LevantamientoController, DeterioroController, ValorCampoDefinidoController],
  providers: [ControladorEdificacionesService, EdificacionService, LevantamientoService, DeterioroService, ValorCampoDefinidoService]
})
export class ControladorEdificacionesModule {}
