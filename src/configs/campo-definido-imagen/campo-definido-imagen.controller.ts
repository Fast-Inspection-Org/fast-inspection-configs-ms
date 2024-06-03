import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CampoDefinidoImagenService } from './campo-definido-imagen.service';
import { CreateCampoDefinidoImagenDto } from './dto/create-campo-definido-imagen.dto';
import { UpdateCampoDefinidoImagenDto } from './dto/update-campo-definido-imagen.dto';

@Controller('campo-definido-imagen')
export class CampoDefinidoImagenController {
  constructor(private readonly campoDefinidoImagenService: CampoDefinidoImagenService) {}


}
