import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CampoDefinidoTextoService } from './campo-definido-texto.service';
import { CreateCampoDefinidoTextoDto } from './dto/create-campo-definido-texto.dto';
import { UpdateCampoDefinidoTextoDto } from './dto/update-campo-definido-texto.dto';

@Controller('campo-definido-texto')
export class CampoDefinidoTextoController {
  constructor(private readonly campoDefinidoTextoService: CampoDefinidoTextoService) {}

}
