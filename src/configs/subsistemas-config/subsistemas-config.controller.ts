import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { SubsistemasConfigService } from './subsistemas-config.service';
import { SubsistemaConfigDTO } from './subsistema-config.dto';
import { UpdateSubsistemaConfigDTO } from './update-subsistema-config.dto';
import { MessagePattern } from '@nestjs/microservices';
import { FiltersSubsistemaConfigDTO } from './filters-subsistema-config.dto';

@Controller('subsistemas-config')
export class SubsistemasConfigController {
    constructor(private subsistemasConfigService: SubsistemasConfigService) { }

    @MessagePattern('getAllSubsistemasConfig')
    public async getAllSubsistemasConfig(filtersSubsistemaConfigDTO: FiltersSubsistemaConfigDTO) {
        return await this.subsistemasConfigService.getAllSubsistemasConfig(filtersSubsistemaConfigDTO.idSistemaConfig, filtersSubsistemaConfigDTO.nombre)
    }

    @MessagePattern('createSubsistemaConfig')
    public async createSubsistemaConfig(subistemaConfigDTO: SubsistemaConfigDTO) {
        return await this.subsistemasConfigService.createSubSistemaConfig(subistemaConfigDTO)
    }

    @MessagePattern('updateSubsistemaConfig')
    public async updateSubsistemaConfig(payload: {
        idSubsistemaConfig: number, idSistemaConfig: number,
        updateSubsistemaConfigDTO: UpdateSubsistemaConfigDTO
    }) {
        return await this.subsistemasConfigService.updateSubsistemaConfig(payload.idSubsistemaConfig, payload.idSistemaConfig,
            payload.updateSubsistemaConfigDTO)
    }

    @MessagePattern('deleteSubsistemaConfig')
    public async deleteSubsistemaConfig(idSubsistemaConfig: number) {
        return await this.subsistemasConfigService.deleteSubsistemaConfig(idSubsistemaConfig)
    }
}
