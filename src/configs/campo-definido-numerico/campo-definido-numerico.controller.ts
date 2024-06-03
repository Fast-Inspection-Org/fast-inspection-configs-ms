import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CampoDefinidoNumericoService } from './campo-definido-numerico.service';
import { CreateCampoDefinidoNumericoDto } from './dto/create-campo-definido-numerico.dto';
import { UpdateCampoDefinidoNumericoDto } from './dto/update-campo-definido-numerico.dto';

@Controller('campo-definido-numerico')
export class CampoDefinidoNumericoController {
  constructor(private readonly campoDefinidoNumericoService: CampoDefinidoNumericoService) {}

 
}
