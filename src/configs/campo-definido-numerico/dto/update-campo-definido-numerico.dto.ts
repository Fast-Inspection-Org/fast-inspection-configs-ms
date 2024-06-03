import { PartialType } from '@nestjs/swagger';
import { CreateCampoDefinidoNumericoDto } from './create-campo-definido-numerico.dto';

export class UpdateCampoDefinidoNumericoDto extends PartialType(CreateCampoDefinidoNumericoDto) {}
