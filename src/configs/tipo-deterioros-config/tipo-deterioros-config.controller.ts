import { Controller, Delete, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { TipoDeterioroConfig } from './tipo-deterioro-config.entity';
import { TipoDeteriorosConfigService } from './tipo-deterioros-config.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('tipo-deterioros-config')
export class TipoDeteriorosConfigController {
    constructor(private tipoDeterioroConfigService: TipoDeteriorosConfigService) { }

    @MessagePattern('deleteTipoDeterioroConfig')
    public async deleteTipoDeterioro(idTipoDeterioro: number) {
       await this.tipoDeterioroConfigService.deleteTipoDeterioroConfig(idTipoDeterioro)
    }
}
