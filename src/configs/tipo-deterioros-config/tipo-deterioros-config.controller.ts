import { Controller, Delete, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { TipoDeterioroConfig } from './tipo-deterioro-config.entity';
import { TipoDeteriorosConfigService } from './tipo-deterioros-config.service';

@Controller('tipo-deterioros-config')
export class TipoDeteriorosConfigController {
    constructor(private tipoDeterioroConfigService: TipoDeteriorosConfigService) { }


    @Delete("deleteTipoDeterioroConfig/:id")
    public async deleteTipoDeterioro(@Param("id", ParseIntPipe) idTipoDeterioro: number) {
       await this.tipoDeterioroConfigService.deleteTipoDeterioroConfig(idTipoDeterioro)
    }

}
