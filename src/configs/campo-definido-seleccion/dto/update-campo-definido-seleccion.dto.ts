import { PartialType } from '@nestjs/swagger';
import { CreateCampoDefinidoSeleccionDto } from './create-campo-definido-seleccion.dto';

export class UpdateCampoDefinidoSeleccionDto extends PartialType(CreateCampoDefinidoSeleccionDto) {}
