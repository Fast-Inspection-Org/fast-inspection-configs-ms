import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { IndiceCalculableIntervaloService } from './indice-calculable-intervalo.service';
import { Calculos } from '../indice-calculable/indice-calculable.entity';
import { IndiceCalculableDTO } from '../indice-calculable/indice-calculable.dto';
import { UpdateIndiceCalculableIntervaloDTO } from './update-indice-calculable-intervalo.dto';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { FiltersIndiceCalculableIntervaloDTO } from './filters-indice-calculable-intervalo.dto';

@Controller('indice-calculable-intervalo')
export class IndiceCalculableIntervaloController {
    constructor(private indiceCalculableIntervalosService: IndiceCalculableIntervaloService) { }

    @MessagePattern('getAllIndicesCalculablesIntervalos')
    public async getAllIndicesCalculablesIntervalos(filtersIndiceCalculableIntervalo: FiltersIndiceCalculableIntervaloDTO) {
        try {
            return await this.indiceCalculableIntervalosService.getAllIndicesCalculablesIntervalos(filtersIndiceCalculableIntervalo.nombre,
                filtersIndiceCalculableIntervalo.calculo,
                filtersIndiceCalculableIntervalo.versionConfig ? parseInt(filtersIndiceCalculableIntervalo.versionConfig.toString()) : undefined)
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }

    @MessagePattern('getIndiceCalculableIntervalo')
    public async getIndiceCalculableIntervalo(idIndiceCalculable: number) {
        try {
            return await this.indiceCalculableIntervalosService.getIndiceCalculableIntervaloWithRelations(idIndiceCalculable)
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }

    @MessagePattern('createIndiceCalculableIntervalo')
    public async createIndiceCalculableIntervalo(indiceCalculableIntervaloDTO: IndiceCalculableDTO) {
        try {
            await this.indiceCalculableIntervalosService.createIndiceCalculableIntervalo(indiceCalculableIntervaloDTO)
            return { success: true }
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }

    @MessagePattern('updateIndiceCalculableIntervalo')
    public async updateIndiceCalculableIntervalo(payload: { idIndiceCalculable, updateIndiceCalculableIntervaloDTO: UpdateIndiceCalculableIntervaloDTO }) {
        try {
            await this.indiceCalculableIntervalosService.updateIndiceCalculableIntervalos(payload.idIndiceCalculable,
                payload.updateIndiceCalculableIntervaloDTO)
            return { success: true }
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }
}
