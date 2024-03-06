import { Body, Controller, Get, Post } from '@nestjs/common';
import { EdificacionService } from './edificacion/edificacion.service';
import { EdificacionDTO } from './edificacion/edificacion.dto';

@Controller('controlador-edificaciones')
export class ControladorEdificacionesController {
    constructor(private edificacionService: EdificacionService) { }

    @Get("getAllEdificaciones")
    public async getAllEdificaciones() {
        return this.edificacionService.getAllEdificaciones()
    }

    @Post("createEdificacion")
    public async createEdificacion(@Body() edificacionDTO: EdificacionDTO) {
        await this.edificacionService.createEdificacion(edificacionDTO)
    }
}
