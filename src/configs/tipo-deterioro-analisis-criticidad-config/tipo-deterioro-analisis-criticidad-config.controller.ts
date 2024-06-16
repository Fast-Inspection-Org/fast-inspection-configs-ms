import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { TipoDeterioroAnalisisCriticidadConfigService } from './tipo-deterioro-analisis-criticidad-config.service';
import { TipoDeterioroAnalisisCriticidadConfigDTO } from './tipo-deterioro-analisis-criticidad-config.dto';
import { TipoDeterioroConfigDTO } from '../tipo-deterioros-config/tipo-deterioro-config.dto';
import { UpdateTipoDeterioroAnalisisCriticidadConfigDTO } from './update-tipo-deterioro-analisis-criticidad-config.dt';

@Controller('tipo-deterioro-analisis-criticidad-config')
export class TipoDeterioroAnalisisCriticidadConfigController {

    constructor(private tipoDeterioroAnalisisCriticidadConfigService: TipoDeterioroAnalisisCriticidadConfigService) { }

    @Get("getAllTiposDeteriorosAnalisisCriticidadConfig/:idMaterialConfig")
    public async getAllTiposDeteriorosConfig(@Param("idMaterialConfig", ParseIntPipe) idMaterialConfig: number, @Query("nombre") nombre: String) {

        return await this.tipoDeterioroAnalisisCriticidadConfigService.getAllTiposDeteriorosAnalisisCriticidadConfig(idMaterialConfig, nombre)
    }

    @Get("getTipoDeterioroAnalisisCriticidad/:id")
    public async getTipoDeterioroAnalisisCriticidad(@Param("id", ParseIntPipe) idTipoDeterioro: number) {

        return await this.tipoDeterioroAnalisisCriticidadConfigService.getTipoDeterioroAnalisisCriticidadConfigSerializable(idTipoDeterioro)
    }

    @Post("createTipoDeterioroAnalisisCriticidadConfig")
    public async createTipoDeterioroAnalisisCriticidadConfig(@Body() tipoDeterioroConfigDTO: TipoDeterioroConfigDTO) {
        await this.tipoDeterioroAnalisisCriticidadConfigService.createTipoDeterioroAnalisisCriticidadConfig(tipoDeterioroConfigDTO)
    }

    @Patch("updateTipoDeterioroAnalisisCriticidad/:id")
    public async updateTipoDeterioroAnalisisCriticidad(@Param("id", ParseIntPipe) idTipoDeterioro: number,
        @Body() updateTipoDeterioroAnalisisCriticidadDTO: UpdateTipoDeterioroAnalisisCriticidadConfigDTO) {
        return await this.tipoDeterioroAnalisisCriticidadConfigService.updateTipoDeterioroConfigAnalisisCriticidadConfig(idTipoDeterioro, updateTipoDeterioroAnalisisCriticidadDTO)
    }

}
