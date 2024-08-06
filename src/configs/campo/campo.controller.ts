import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CampoService } from './campo.service';
import { CampoDTO } from './campo.dto';
import { UpdateCampoDTO } from './update-campo.dto';
import { MessagePattern } from '@nestjs/microservices';
import { FiltersCampoDTO } from './filters-campo.dto';

@Controller('campo')
export class CampoController {
    constructor(private campoService: CampoService) { }

    @MessagePattern('getAllCampos')
    public async getAllCampos(filtersCampoDTO: FiltersCampoDTO) {
        return await this.campoService.getAllCampos(filtersCampoDTO.nombre, filtersCampoDTO.importancia ?
            parseInt(filtersCampoDTO.importancia.toString()) : undefined, filtersCampoDTO.idHerramienta ?
            parseInt(filtersCampoDTO.idHerramienta.toString()) : undefined)
    }

    @MessagePattern('createCampo')
    public async createCampo(campoDTO: CampoDTO) {
        return await this.campoService.createCampo(campoDTO)
    }

    @MessagePattern('updateCampo')
    public async updateCampo(payload: { idCampo: number, updateCampoDTO: UpdateCampoDTO }) {
        return await this.campoService.updateCampo(payload.idCampo, payload.updateCampoDTO)
    }

    @MessagePattern('deleteCampo')
    public async deleteCampo(idCampo: number) {
        return await this.campoService.deleteCampo(idCampo)
    }
}
