import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { IndiceCalculableIntervaloService } from './indice-calculable-intervalo.service';
import { Calculos } from '../indice-calculable/indice-calculable.entity';
import { IndiceCalculableDTO } from '../indice-calculable/indice-calculable.dto';
import { UpdateIndiceCalculableIntervaloDTO } from './update-indice-calculable-intervalo.dto';

@Controller('indice-calculable-intervalo')
export class IndiceCalculableIntervaloController {
    constructor(private indiceCalculableIntervalosService: IndiceCalculableIntervaloService) { }

    @Get("getAllIndicesCalculablesIntervalos")
    public async getAllIndicesCalculablesIntervalos(@Query("nombre") nombre: String, @Query("calculo") calculo: Calculos, @Query("versionConfig") versionConfig: String) {
        return await this.indiceCalculableIntervalosService.getAllIndicesCalculablesIntervalos(nombre, calculo,
            versionConfig ? parseInt(versionConfig.toString()) : undefined)
    }

    @Get("getIndiceCalculableIntervalo/:id")
    public async getIndiceCalculableIntervalo(@Param("id", ParseIntPipe) idIndiceCalculable: number) {
        return await this.indiceCalculableIntervalosService.getIndiceCalculableIntervaloWithRelations(idIndiceCalculable)
    }


    @Post("createIndiceCalculableIntervalo")
    public async createIndiceCalculableIntervalo(@Body() indiceCalculableIntervaloDTO: IndiceCalculableDTO) {
        return await this.indiceCalculableIntervalosService.createIndiceCalculableIntervalo(indiceCalculableIntervaloDTO)
    }

    @Patch("updateIndiceCalculableIntervalo/:id")
    public async updateIndiceCalculableIntervalo(@Param("id", ParseIntPipe) idIndiceCalculable, @Body()updateIndiceCalculableIntervaloDTO: UpdateIndiceCalculableIntervaloDTO) {
        
        return await this.indiceCalculableIntervalosService.updateIndiceCalculableIntervalos(idIndiceCalculable, updateIndiceCalculableIntervaloDTO)
    }
}
