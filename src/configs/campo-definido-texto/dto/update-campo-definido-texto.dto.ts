import { PartialType } from '@nestjs/swagger';
import { CreateCampoDefinidoTextoDto } from './create-campo-definido-texto.dto';

export class UpdateCampoDefinidoTextoDto extends PartialType(CreateCampoDefinidoTextoDto) {}
