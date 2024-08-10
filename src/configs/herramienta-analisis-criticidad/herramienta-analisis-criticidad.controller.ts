import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseInterceptors } from '@nestjs/common';
import { HerramientaAnalisisCriticidadService } from './herramienta-analisis-criticidad.service';
import { HerramientaDTO } from '../herramientas/herramienta.dto';
import { UpdateHerramientaAnalisisCriticidadDTO } from './update-herramienta-analisis-criticidad.dto';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { FiltersHerramientaAnalisisCriticidadDTO } from './filters-herramienta-analisis-criticidad.dto';




@Controller('herramienta-analisis-criticidad')
export class HerramientaAnalisisCriticidadController {

    constructor(private herramientaAnalisisCriticidadService: HerramientaAnalisisCriticidadService) { }

    @MessagePattern('createHerramientaAnalisisCriticidad')
    public async createHerramientaAnalisisCriticidad(herramientaDTO: HerramientaDTO) {
        try {
            await this.herramientaAnalisisCriticidadService.createHerramientaAnalisisCriticidad(herramientaDTO)
            return { success: true }
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }

    @MessagePattern('updateHerramientaAnalisisCriticidad')
    public async updateHerramientaAnalisisCriticidad(payload: {
        idHerramienta: number,
        updateHerramientaAnalisisCriticidadDTO: UpdateHerramientaAnalisisCriticidadDTO
    }) {
        try {
            await this.herramientaAnalisisCriticidadService.updateHerramientaAnalisisCriticidad(payload.idHerramienta,
                payload.updateHerramientaAnalisisCriticidadDTO)
            return { success: true }
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }

    @MessagePattern('getAllHerramientasAnalisisCritcidad')
    public async getAll(filtersHerramientaAnalisisCriticidadDTO: FiltersHerramientaAnalisisCriticidadDTO) {
        try {
            return await this.herramientaAnalisisCriticidadService.getAllHerrramientasAnalisisCriticidad(filtersHerramientaAnalisisCriticidadDTO.versionConfig
                ? parseInt(filtersHerramientaAnalisisCriticidadDTO.versionConfig.toString()) : undefined, filtersHerramientaAnalisisCriticidadDTO.nombre)
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }

    @MessagePattern('getHerramientaAnalisisCriticidad')
    public async getHerramientaAnalisisCriticidad(idHerramienta: number) {
        try {
            return await this.herramientaAnalisisCriticidadService.getHerramientaAnalisisCriticdad(idHerramienta)
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }

    @MessagePattern('getCamposHerramienta')
    public async getCamposHerramienta(idHerramienta: number) {
        try {
            return await this.herramientaAnalisisCriticidadService.getCamposAfectados(idHerramienta)
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }   
    }
}
