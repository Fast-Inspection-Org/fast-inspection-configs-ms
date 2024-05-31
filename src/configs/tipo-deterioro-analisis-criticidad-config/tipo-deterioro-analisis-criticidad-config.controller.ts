import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { TipoDeterioroAnalisisCriticidadConfigService } from './tipo-deterioro-analisis-criticidad-config.service';
import { TipoDeterioroAnalisisCriticidadConfigDTO } from './tipo-deterioro-analisis-criticidad-config.dto';
import { TipoDeterioroConfigDTO } from '../tipo-deterioros-config/tipo-deterioro-config.dto';

@Controller('tipo-deterioro-analisis-criticidad-config')
export class TipoDeterioroAnalisisCriticidadConfigController {

    constructor(private tipoDeterioroAnalisisCriticidadConfigService: TipoDeterioroAnalisisCriticidadConfigService) { }

    @Get("getAllTiposDeteriorosAnalisisCriticidadConfig/:idMaterialConfig")
    public async getAllTiposDeteriorosConfig(@Param("idMaterialConfig", ParseIntPipe) idMaterialConfig: number, @Query("nombre") nombre: String) {

        return await this.tipoDeterioroAnalisisCriticidadConfigService.getAllTiposDeteriorosAnalisisCriticidadConfig(idMaterialConfig, nombre)
    }

    @Post("createTipoDeterioroAnalisisCriticidadConfig")
    public async createTipoDeterioroAnalisisCriticidadConfig(@Body() tipoDeterioroConfigDTO: TipoDeterioroConfigDTO) {
        await this.tipoDeterioroAnalisisCriticidadConfigService.createTipoDeterioroAnalisisCriticidadConfig(tipoDeterioroConfigDTO)
    }

}
