import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { HerramientaAnalisisCriticidadService } from './herramienta-analisis-criticidad.service';
import { HerramientaDTO } from '../herramientas/herramienta.dto';
import { UpdateHerramientaAnalisisCriticidadDTO } from './update-herramienta-analisis-criticidad.dto';




@Controller('herramienta-analisis-criticidad')
export class HerramientaAnalisisCriticidadController {

    constructor(private herramientaAnalisisCriticidadService: HerramientaAnalisisCriticidadService) { }

    @Post("createHerramientaAnalisisCriticidad")
    public async createHerramientaAnalisisCriticidad(@Body() herramientaDTO: HerramientaDTO) {

        return await this.herramientaAnalisisCriticidadService.createHerramientaAnalisisCriticidad(herramientaDTO)


    }

    @Patch("updateHerramientaAnalisisCriticidad/:id")
    public async updateHerramientaAnalisisCriticidad(@Param("id") idHerramienta: number, @Body() updateHerramientaAnalisisCriticidadDTO: UpdateHerramientaAnalisisCriticidadDTO) {
        return await this.herramientaAnalisisCriticidadService.updateHerramientaAnalisisCriticidad(idHerramienta, updateHerramientaAnalisisCriticidadDTO)
    }


    @Get("getAllHerramientasAnalisisCritcidad")
    public async getAll(@Query("versionConfig") versionConfig: string, @Query("nombre") nombre: string) {
        return await this.herramientaAnalisisCriticidadService.getAllHerrramientasAnalisisCriticidad(versionConfig ? parseInt(versionConfig) : undefined, nombre)
    }

    @Delete("deleteHerramientaAnalisisCritcidad/:id")
    public async deleteHerramientaAnalisisCritcidad(@Param() idHerramienta: number) {

    }

}
