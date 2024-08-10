import { Controller } from '@nestjs/common';
import { IndiceCalculableSinIntervaloService } from './indice-calculable-sin-intervalo.service';
import { IndiceCalculableDTO } from '../indice-calculable/indice-calculable.dto';
import { UpdateIndiceCalculableSinIntervaloDTO } from './update-indice-calculable-sin-intervalo.dto';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { FiltersIndiceCalculableSinIntervaloDTO } from './filters-indice-calculable-sin-intervalo.dto';

@Controller('indice-calculable-sin-intervalo')
export class IndiceCalculableSinIntervaloController {
    constructor(private indiceCalculableSinIntervaloService: IndiceCalculableSinIntervaloService) { }


    @MessagePattern('getAllIndicesCalculablesSinIntervalos')
    public async getAllIndicesCalculablesSinIntervalos(filtersIndiceCalculableSinIntervaloDTO: FiltersIndiceCalculableSinIntervaloDTO) {
        try {
            return await this.indiceCalculableSinIntervaloService.getAllIndicesCalculablesSinIntervalos(filtersIndiceCalculableSinIntervaloDTO.nombre,
                filtersIndiceCalculableSinIntervaloDTO.calculo, filtersIndiceCalculableSinIntervaloDTO.versionConfig
                ? parseInt(filtersIndiceCalculableSinIntervaloDTO.versionConfig.toString()) : undefined)
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }

    @MessagePattern('getIndiceCalculableSinIntervalo')
    public async getIndiceCalculableSinIntervalo(idIndiceCalculable: number) {
        try {
            return await this.indiceCalculableSinIntervaloService.getIndiceCalculableSinIntervaloWithRelations(idIndiceCalculable)
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }

    @MessagePattern('createIndiceCalculableSinIntervalo')
    public async createIndiceCalculableSinIntervalo(indiceCalculableSinIntervaloDTO: IndiceCalculableDTO) {
        try {
            await this.indiceCalculableSinIntervaloService.createIndiceCalculableSinIntervalo(indiceCalculableSinIntervaloDTO)
            return { success: true }
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }

    @MessagePattern('updateIndiceCalculableSinIntervalo')
    public async updateIndiceCalculableSinIntervalo(payload: { idIndiceCalculable, updateIndiceCalculableSinIntervaloDTO: UpdateIndiceCalculableSinIntervaloDTO }) {
        try {
            await this.indiceCalculableSinIntervaloService.updateIndiceCalculableSinIntervalos(payload.idIndiceCalculable,
                payload.updateIndiceCalculableSinIntervaloDTO)
            return { success: true }
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }
}
