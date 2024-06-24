import { Controller, Get, Query } from '@nestjs/common';
import { IndiceCalculableSinIntervaloService } from './indice-calculable-sin-intervalo.service';
import { Calculos } from '../indice-calculable/indice-calculable.entity';

@Controller('indice-calculable-sin-intervalo')
export class IndiceCalculableSinIntervaloController {
    constructor(private indiceCalculableSinIntervaloService: IndiceCalculableSinIntervaloService) { }

    @Get("getAllIndicesCalculablesSinIntervalos")
    public async getAllIndicesCalculablesSinIntervalos(@Query("nombre") nombre: String, @Query("calculo") calculo: Calculos, @Query("versionConfig") versionConfig: String) {
        return await this.indiceCalculableSinIntervaloService.getAllIndicesCalculablesSinIntervalos(nombre, calculo, versionConfig ? parseInt(versionConfig.toString()) : undefined)
    }
}
