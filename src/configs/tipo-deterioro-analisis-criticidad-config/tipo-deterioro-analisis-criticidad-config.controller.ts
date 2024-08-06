import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { TipoDeterioroAnalisisCriticidadConfigService } from './tipo-deterioro-analisis-criticidad-config.service';
import { TipoDeterioroAnalisisCriticidadConfigDTO } from './tipo-deterioro-analisis-criticidad-config.dto';
import { TipoDeterioroConfigDTO } from '../tipo-deterioros-config/tipo-deterioro-config.dto';
import { UpdateTipoDeterioroAnalisisCriticidadConfigDTO } from './update-tipo-deterioro-analisis-criticidad-config.dt';
import { MessagePattern } from '@nestjs/microservices';

@Controller('tipo-deterioro-analisis-criticidad-config')
export class TipoDeterioroAnalisisCriticidadConfigController {

    constructor(private tipoDeterioroAnalisisCriticidadConfigService: TipoDeterioroAnalisisCriticidadConfigService) { }

    @MessagePattern('getAllTiposDeteriorosAnalisisCriticidadConfig')
    public async getAllTiposDeteriorosConfig(idMaterialConfig: number, nombre: String) {
        return await this.tipoDeterioroAnalisisCriticidadConfigService.getAllTiposDeteriorosAnalisisCriticidadConfig(idMaterialConfig, nombre)
    }

    @MessagePattern('getTipoDeterioroAnalisisCriticidad')
    public async getTipoDeterioroAnalisisCriticidad(idTipoDeterioro: number) {
        return await this.tipoDeterioroAnalisisCriticidadConfigService.getTipoDeterioroAnalisisCriticidadConfigSerializable(idTipoDeterioro)
    }

    @MessagePattern('createTipoDeterioroAnalisisCriticidadConfig')
    public async createTipoDeterioroAnalisisCriticidadConfig(tipoDeterioroConfigDTO: TipoDeterioroConfigDTO) {
        await this.tipoDeterioroAnalisisCriticidadConfigService.createTipoDeterioroAnalisisCriticidadConfig(tipoDeterioroConfigDTO)
    }

    @MessagePattern('updateTipoDeterioroAnalisisCriticidad')
    public async updateTipoDeterioroAnalisisCriticidad(payload: {
        idTipoDeterioro: number,
        updateTipoDeterioroAnalisisCriticidadDTO: UpdateTipoDeterioroAnalisisCriticidadConfigDTO
    }) {
        return await this.tipoDeterioroAnalisisCriticidadConfigService.updateTipoDeterioroConfigAnalisisCriticidadConfig(payload.idTipoDeterioro,
            payload.updateTipoDeterioroAnalisisCriticidadDTO)
    }

}
