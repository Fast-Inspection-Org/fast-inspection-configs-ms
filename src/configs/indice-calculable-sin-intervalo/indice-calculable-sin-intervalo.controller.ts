import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { IndiceCalculableSinIntervaloService } from './indice-calculable-sin-intervalo.service';
import { Calculos } from '../indice-calculable/indice-calculable.entity';
import { IndiceCalculableDTO } from '../indice-calculable/indice-calculable.dto';
import { UpdateIndiceCalculableSinIntervaloDTO } from './update-indice-calculable-sin-intervalo.dto';

@Controller('indice-calculable-sin-intervalo')
export class IndiceCalculableSinIntervaloController {
    constructor(private indiceCalculableSinIntervaloService: IndiceCalculableSinIntervaloService) { }

    @Get("getAllIndicesCalculablesSinIntervalos")
    public async getAllIndicesCalculablesSinIntervalos(@Query("nombre") nombre: String, @Query("calculo") calculo: Calculos, @Query("versionConfig") versionConfig: String) {
        return await this.indiceCalculableSinIntervaloService.getAllIndicesCalculablesSinIntervalos(nombre, calculo, versionConfig ? parseInt(versionConfig.toString()) : undefined)
    }

    @Get("getIndiceCalculableSinIntervalo/:id")
    public async getIndiceCalculableSinIntervalo(@Param("id", ParseIntPipe) idIndiceCalculable: number) {
        return await this.indiceCalculableSinIntervaloService.getIndiceCalculableSinIntervaloWithRelations(idIndiceCalculable)
    }

    @Post("createIndiceCalculableSinIntervalo")
    public async createIndiceCalculableSinIntervalo(@Body() indiceCalculableSinIntervaloDTO: IndiceCalculableDTO) {
        return await this.indiceCalculableSinIntervaloService.createIndiceCalculableSinIntervalo(indiceCalculableSinIntervaloDTO)
    }

    @Patch("updateIndiceCalculableSinIntervalo/:id")
    public async updateIndiceCalculableSinIntervalo(@Param("id", ParseIntPipe) idIndiceCalculable, @Body() updateIndiceCalculableSinIntervaloDTO: UpdateIndiceCalculableSinIntervaloDTO) {
        return await this.indiceCalculableSinIntervaloService.updateIndiceCalculableSinIntervalos(idIndiceCalculable, updateIndiceCalculableSinIntervaloDTO)
    }
}
