import { Controller, Get, Query } from '@nestjs/common';
import { IndiceCalculableIntervaloService } from './indice-calculable-intervalo.service';
import { Calculos } from '../indice-calculable/indice-calculable.entity';

@Controller('indice-calculable-intervalo')
export class IndiceCalculableIntervaloController {
    constructor(private indiceCalculableIntervalosService: IndiceCalculableIntervaloService) { }

    @Get("getAllIndicesCalculablesIntervalos")
    public async getAllIndicesCalculablesIntervalos(@Query("nombre") nombre: String, @Query("calculo") calculo: Calculos, @Query("versionConfig") versionConfig: String) {
        return await this.indiceCalculableIntervalosService.getAllIndicesCalculablesIntervalos(nombre, calculo,
            versionConfig ? parseInt(versionConfig.toString()) : undefined)
    }
}
