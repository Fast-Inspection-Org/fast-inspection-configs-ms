import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EdificacionService } from './edificacion/edificacion.service';
import { EdificacionDTO } from './edificacion/edificacion.dto';

@Controller('controlador-edificaciones')
export class ControladorEdificacionesController {
    constructor(private edificacionService: EdificacionService) { }

    @Get("getAllEdificaciones")
    public async getAllEdificaciones(@Query("nombre") nombre: String) {
        return this.edificacionService.getAllEdificaciones(nombre)
    }

    @Post("createEdificacion")
    public async createEdificacion(@Body() edificacionDTO: EdificacionDTO) {
        await this.edificacionService.createEdificacion(edificacionDTO)
    }
}
