import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CampoDefinidoSeleccionService } from './campo-definido-seleccion.service';
import { CreateCampoDefinidoSeleccionDto } from './dto/create-campo-definido-seleccion.dto';
import { UpdateCampoDefinidoSeleccionDto } from './dto/update-campo-definido-seleccion.dto';

@Controller('campo-definido-seleccion')
export class CampoDefinidoSeleccionController {
  constructor(private readonly campoDefinidoSeleccionService: CampoDefinidoSeleccionService) {}

 
}
