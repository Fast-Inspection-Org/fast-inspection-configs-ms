import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, UseInterceptors } from '@nestjs/common';
import { EdificacionService } from './edificacion.service';
import { EdificacionDTO } from './edificacion.dto';

@Controller('edificacion')
export class EdificacionController {
    constructor(private edificacionService: EdificacionService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get("getAllEdificaciones")
    public async getAllEdificaciones() {
        return await this.edificacionService.getAllEdificaciones()
    }
    @UseInterceptors(ClassSerializerInterceptor)
    @Get("getEdificacion/:id")
    public async getEdificacion(@Param("id", ParseIntPipe) idEdificacion: number) {
        return await this.edificacionService.getEdificacion(idEdificacion)
    }

    @Post("createEdificacion")
    public async createEdificacion(@Body() edificacionDTO: EdificacionDTO) {
        await this.edificacionService.createEdificacion(edificacionDTO)
    }

    @Delete("deleteAllEdificaciones")
    public async deleteAllEdificaciones() {
        await this.edificacionService.deleteAllEdificaciones()
    }

    @Delete("deleteEdificacion/:id")
    public async deleteEdificacion(@Param("id", ParseIntPipe) idEdificacion: number) {
        await this.edificacionService.deleteEdificacion(idEdificacion)
    }

}
