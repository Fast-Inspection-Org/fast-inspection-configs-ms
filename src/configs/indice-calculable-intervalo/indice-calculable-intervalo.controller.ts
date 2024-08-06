import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { IndiceCalculableIntervaloService } from './indice-calculable-intervalo.service';
import { Calculos } from '../indice-calculable/indice-calculable.entity';
import { IndiceCalculableDTO } from '../indice-calculable/indice-calculable.dto';
import { UpdateIndiceCalculableIntervaloDTO } from './update-indice-calculable-intervalo.dto';
import { MessagePattern } from '@nestjs/microservices';
import { FiltersIndiceCalculableIntervaloDTO } from './filters-indice-calculable-intervalo.dto';

@Controller('indice-calculable-intervalo')
export class IndiceCalculableIntervaloController {
    constructor(private indiceCalculableIntervalosService: IndiceCalculableIntervaloService) { }

    @MessagePattern('getAllIndicesCalculablesIntervalos')
    public async getAllIndicesCalculablesIntervalos(filtersIndiceCalculableIntervalo: FiltersIndiceCalculableIntervaloDTO) {
        return await this.indiceCalculableIntervalosService.getAllIndicesCalculablesIntervalos(filtersIndiceCalculableIntervalo.nombre,
            filtersIndiceCalculableIntervalo.calculo,
            filtersIndiceCalculableIntervalo.versionConfig ? parseInt(filtersIndiceCalculableIntervalo.versionConfig.toString()) : undefined)
    }

    @MessagePattern('getIndiceCalculableIntervalo')
    public async getIndiceCalculableIntervalo(idIndiceCalculable: number) {
        return await this.indiceCalculableIntervalosService.getIndiceCalculableIntervaloWithRelations(idIndiceCalculable)
    }

    @MessagePattern('createIndiceCalculableIntervalo')
    public async createIndiceCalculableIntervalo(indiceCalculableIntervaloDTO: IndiceCalculableDTO) {
        return await this.indiceCalculableIntervalosService.createIndiceCalculableIntervalo(indiceCalculableIntervaloDTO)
    }

    @MessagePattern('updateIndiceCalculableIntervalo')
    public async updateIndiceCalculableIntervalo(payload: { idIndiceCalculable, updateIndiceCalculableIntervaloDTO: UpdateIndiceCalculableIntervaloDTO }) {
        return await this.indiceCalculableIntervalosService.updateIndiceCalculableIntervalos(payload.idIndiceCalculable,
            payload.updateIndiceCalculableIntervaloDTO)
    }
}
