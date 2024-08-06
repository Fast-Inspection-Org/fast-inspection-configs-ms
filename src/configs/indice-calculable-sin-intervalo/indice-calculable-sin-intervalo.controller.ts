import { Controller } from '@nestjs/common';
import { IndiceCalculableSinIntervaloService } from './indice-calculable-sin-intervalo.service';
import { IndiceCalculableDTO } from '../indice-calculable/indice-calculable.dto';
import { UpdateIndiceCalculableSinIntervaloDTO } from './update-indice-calculable-sin-intervalo.dto';
import { MessagePattern } from '@nestjs/microservices';
import { FiltersIndiceCalculableSinIntervaloDTO } from './filters-indice-calculable-sin-intervalo.dto';

@Controller('indice-calculable-sin-intervalo')
export class IndiceCalculableSinIntervaloController {
    constructor(private indiceCalculableSinIntervaloService: IndiceCalculableSinIntervaloService) { }


    @MessagePattern('getAllIndicesCalculablesSinIntervalos')
    public async getAllIndicesCalculablesSinIntervalos(filtersIndiceCalculableSinIntervaloDTO: FiltersIndiceCalculableSinIntervaloDTO) {
        return await this.indiceCalculableSinIntervaloService.getAllIndicesCalculablesSinIntervalos(filtersIndiceCalculableSinIntervaloDTO.nombre,
            filtersIndiceCalculableSinIntervaloDTO.calculo, filtersIndiceCalculableSinIntervaloDTO.versionConfig
            ? parseInt(filtersIndiceCalculableSinIntervaloDTO.versionConfig.toString()) : undefined)
    }

    @MessagePattern('getIndiceCalculableSinIntervalo')
    public async getIndiceCalculableSinIntervalo(idIndiceCalculable: number) {
        return await this.indiceCalculableSinIntervaloService.getIndiceCalculableSinIntervaloWithRelations(idIndiceCalculable)
    }

    @MessagePattern('createIndiceCalculableSinIntervalo')
    public async createIndiceCalculableSinIntervalo(indiceCalculableSinIntervaloDTO: IndiceCalculableDTO) {
        return await this.indiceCalculableSinIntervaloService.createIndiceCalculableSinIntervalo(indiceCalculableSinIntervaloDTO)
    }

    @MessagePattern('updateIndiceCalculableSinIntervalo')
    public async updateIndiceCalculableSinIntervalo(payload: { idIndiceCalculable, updateIndiceCalculableSinIntervaloDTO: UpdateIndiceCalculableSinIntervaloDTO }) {
        return await this.indiceCalculableSinIntervaloService.updateIndiceCalculableSinIntervalos(payload.idIndiceCalculable,
            payload.updateIndiceCalculableSinIntervaloDTO)
    }
}
