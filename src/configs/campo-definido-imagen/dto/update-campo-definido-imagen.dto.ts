import { PartialType } from '@nestjs/swagger';
import { CreateCampoDefinidoImagenDto } from './create-campo-definido-imagen.dto';

export class UpdateCampoDefinidoImagenDto extends PartialType(CreateCampoDefinidoImagenDto) {}
