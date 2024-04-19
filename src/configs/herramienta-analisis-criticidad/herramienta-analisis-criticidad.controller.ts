import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { HerramientaAnalisisCriticidadService } from './herramienta-analisis-criticidad.service';
import { HerramientaDTO } from '../herramientas/herramienta.dto';


@Controller('herramienta-analisis-criticidad')
export class HerramientaAnalisisCriticidadController {

    constructor(private herramientaAnalisisCriticidadService: HerramientaAnalisisCriticidadService) { }

    @Post("createHerramientaAnalisisCriticidad")
    public async createHerramientaAnalisisCriticidad(@Body() herramientaDTO: HerramientaDTO) {
        
            await this.herramientaAnalisisCriticidadService.createHerramientaAnalisisCriticidad(herramientaDTO)
       

    }

    @Get("getAllHerramientasAnalisisCritcidad")
    public async getAll() {
        return await this.herramientaAnalisisCriticidadService.getAllHerrramientasAnalisisCriticidad()
    }

    @Delete("deleteHerramientaAnalisisCritcidad/:id")
    public async deleteHerramientaAnalisisCritcidad (@Param() idHerramienta: number) {

    }

}
