import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { SubsistemasConfigService } from './subsistemas-config.service';
import { SubsistemaConfigDTO } from './subsistema-config.dto';
import { UpdateSubsistemaConfigDTO } from './update-subsistema-config.dto';

@Controller('subsistemas-config')
export class SubsistemasConfigController {
    constructor(private subsistemasConfigService: SubsistemasConfigService) { }
    @Get("getAllSubsistemasConfig/:idSistemaConfig")
    public async getAllSubsistemasConfig(@Param("idSistemaConfig", ParseIntPipe) idSistemaConfig, @Query("nombre") nombre: String) {
        return await this.subsistemasConfigService.getAllSubsistemasConfig(idSistemaConfig, nombre)
    }

    @Post("createSubsistemaConfig")
    public async createSubsistemaConfig(@Body() subistemaConfigDTO: SubsistemaConfigDTO) {
        return await this.subsistemasConfigService.createSubSistemaConfig(subistemaConfigDTO)
    }

    @Patch("updateSubsistemaConfig/:id/:idSistemaConfig")
    public async updateSubsistemaConfig(@Param("id", ParseIntPipe) idSubsistemaConfig: number, @Param("idSistemaConfig", ParseIntPipe) idSistemaConfig,
        @Body() updateSubsistemaConfigDTO: UpdateSubsistemaConfigDTO) {
        return await this.subsistemasConfigService.updateSubsistemaConfig(idSubsistemaConfig, idSistemaConfig, updateSubsistemaConfigDTO)
    }

    @Delete("deleteSubsistemaConfig/:id")
    public async deleteSubsistemaConfig(@Param("id", ParseIntPipe) idSubsistemaConfig: number) {
        return await this.subsistemasConfigService.deleteSubsistemaConfig(idSubsistemaConfig)
    }
}
