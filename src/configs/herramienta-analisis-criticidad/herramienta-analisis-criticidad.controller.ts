import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { HerramientaAnalisisCriticidadService } from './herramienta-analisis-criticidad.service';
import { HerramientaDTO } from '../herramientas/herramienta.dto';
import { UpdateHerramientaAnalisisCriticidadDTO } from './update-herramienta-analisis-criticidad.dto';
import { MessagePattern } from '@nestjs/microservices';
import { FiltersHerramientaAnalisisCriticidadDTO } from './filters-herramienta-analisis-criticidad.dto';




@Controller('herramienta-analisis-criticidad')
export class HerramientaAnalisisCriticidadController {

    constructor(private herramientaAnalisisCriticidadService: HerramientaAnalisisCriticidadService) { }

    @MessagePattern('createHerramientaAnalisisCriticidad')
    public async createHerramientaAnalisisCriticidad(herramientaDTO: HerramientaDTO) {
        return await this.herramientaAnalisisCriticidadService.createHerramientaAnalisisCriticidad(herramientaDTO)
    }

    @MessagePattern('updateHerramientaAnalisisCriticidad')
    public async updateHerramientaAnalisisCriticidad(payload: {
        idHerramienta: number,
        updateHerramientaAnalisisCriticidadDTO: UpdateHerramientaAnalisisCriticidadDTO
    }) {
        return await this.herramientaAnalisisCriticidadService.updateHerramientaAnalisisCriticidad(payload.idHerramienta,
            payload.updateHerramientaAnalisisCriticidadDTO)
    }

    @MessagePattern('getAllHerramientasAnalisisCritcidad')
    public async getAll(filtersHerramientaAnalisisCriticidadDTO: FiltersHerramientaAnalisisCriticidadDTO) {
        return await this.herramientaAnalisisCriticidadService.getAllHerrramientasAnalisisCriticidad(filtersHerramientaAnalisisCriticidadDTO.versionConfig
            ? parseInt(filtersHerramientaAnalisisCriticidadDTO.versionConfig.toString()) : undefined, filtersHerramientaAnalisisCriticidadDTO.nombre)
    }


    @MessagePattern('getHerramientaAnalisisCriticidad')
    public async getHerramientaAnalisisCriticidad(idHerramienta: number) {
        return await this.herramientaAnalisisCriticidadService.getHerramientaAnalisisCriticdad(idHerramienta)
    }

    @MessagePattern('getCamposHerramienta')
    public async getCamposHerramienta(idHerramienta: number) {
        return await this.herramientaAnalisisCriticidadService.getCamposAfectados(idHerramienta)
    }
}
