import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { TipoDeterioroAnalisisCriticidadConfigService } from './tipo-deterioro-analisis-criticidad-config.service';
import { TipoDeterioroAnalisisCriticidadConfigDTO } from './tipo-deterioro-analisis-criticidad-config.dto';
import { TipoDeterioroConfigDTO } from '../tipo-deterioros-config/tipo-deterioro-config.dto';
import { UpdateTipoDeterioroAnalisisCriticidadConfigDTO } from './update-tipo-deterioro-analisis-criticidad-config.dt';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { FiltersTipoDeterioroAnalisisCriticidadDTO } from './filters-tipo-deterioro-analisis-criticidad.dto';

@Controller('tipo-deterioro-analisis-criticidad-config')
export class TipoDeterioroAnalisisCriticidadConfigController {

    constructor(private tipoDeterioroAnalisisCriticidadConfigService: TipoDeterioroAnalisisCriticidadConfigService) { }

    @MessagePattern('getAllTiposDeteriorosAnalisisCriticidadConfig')
    public async getAllTiposDeteriorosConfig(filtersTipoDeterioroAnalisisCriticidad: FiltersTipoDeterioroAnalisisCriticidadDTO) {
        try {
            return await this.tipoDeterioroAnalisisCriticidadConfigService.getAllTiposDeteriorosAnalisisCriticidadConfig(filtersTipoDeterioroAnalisisCriticidad.idMaterialConfig,
                filtersTipoDeterioroAnalisisCriticidad.nombre, filtersTipoDeterioroAnalisisCriticidad.withCamposAfectados ? filtersTipoDeterioroAnalisisCriticidad.withCamposAfectados : false)
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }

    @MessagePattern('getTipoDeterioroAnalisisCriticidad')
    public async getTipoDeterioroAnalisisCriticidad(idTipoDeterioro: number) {
        try {
            return await this.tipoDeterioroAnalisisCriticidadConfigService.getTipoDeterioroAnalisisCriticidadConfigSerializable(idTipoDeterioro)
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }

    @MessagePattern('createTipoDeterioroAnalisisCriticidadConfig')
    public async createTipoDeterioroAnalisisCriticidadConfig(tipoDeterioroConfigDTO: TipoDeterioroConfigDTO) {
        try {
            await this.tipoDeterioroAnalisisCriticidadConfigService.createTipoDeterioroAnalisisCriticidadConfig(tipoDeterioroConfigDTO)
            return { success: true }
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }

    @MessagePattern('updateTipoDeterioroAnalisisCriticidad')
    public async updateTipoDeterioroAnalisisCriticidad(payload: {
        idTipoDeterioro: number,
        updateTipoDeterioroAnalisisCriticidadDTO: UpdateTipoDeterioroAnalisisCriticidadConfigDTO
    }) {
        try {
            await this.tipoDeterioroAnalisisCriticidadConfigService.updateTipoDeterioroConfigAnalisisCriticidadConfig(payload.idTipoDeterioro,
                payload.updateTipoDeterioroAnalisisCriticidadDTO)
            return { success: true }
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }

    @MessagePattern('getCamposTipoDeterioroAnalisisCriticidad')
    public async getCampos(tipoDeterioroAnalisiCriticidadId: string) {
        try {
            return await this.tipoDeterioroAnalisisCriticidadConfigService.getCampos(+tipoDeterioroAnalisiCriticidadId)
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }
}
