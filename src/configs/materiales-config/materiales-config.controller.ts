import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { MaterialesConfigService } from './materiales-config.service';
import { MaterialConfigDTO } from './material-config.dto';
import { UpdateMaterialConfigDTO } from './update-material-config.dto';
import { MessagePattern } from '@nestjs/microservices';
import { FiltersMaterialConfigDTO } from './filters-material-config.dto';

@Controller('materiales-config')
export class MaterialesConfigController {
    constructor(private materialesConfigService: MaterialesConfigService) { }

    @MessagePattern('getAllMaterialesConfig')
    public async getAllMaterialesConfig(filtersMaterialConfigDTO: FiltersMaterialConfigDTO) {
        return await this.materialesConfigService.getAllMaterialesConfig(filtersMaterialConfigDTO.idSubsistemaConfig, filtersMaterialConfigDTO.nombre)
    }

    @MessagePattern('createMaterialConfig')
    public async createMaterialConfig(materialConfig: MaterialConfigDTO) {
        return await this.materialesConfigService.createMaterialConfig(materialConfig)
    }

    @MessagePattern('updateMaterialConfig')
    public async updateMaterialConfig(payload: {
        idMaterialConfig: number, idSubsistemaConfig: number,
        updateMaterialConfigDTO: UpdateMaterialConfigDTO
    }) {
        return await this.materialesConfigService.updateMaterialConfig(payload.idMaterialConfig, payload.idSubsistemaConfig, payload.updateMaterialConfigDTO)
    }

    @MessagePattern('deleteMaterialConfig')
    public async deleteMaterialConfig(idMaterialConfig: number) {
        return await this.materialesConfigService.deleteMaterialConfig(idMaterialConfig)
    }
}
