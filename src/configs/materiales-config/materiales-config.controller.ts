import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { MaterialesConfigService } from './materiales-config.service';
import { MaterialConfigDTO } from './material-config.dto';
import { UpdateMaterialConfigDTO } from './update-material-config.dto';

@Controller('materiales-config')
export class MaterialesConfigController {
    constructor(private materialesConfigService: MaterialesConfigService) { }
    @Get("getAllMaterialesConfig/:idSubsistemaConfig")
    public async getAllMaterialesConfig(@Param("idSubsistemaConfig", ParseIntPipe) idSubsistemaConfig, @Query("nombre") nombre: String) {
        return await this.materialesConfigService.getAllMaterialesConfig(idSubsistemaConfig, nombre)
    }

    @Post("createMaterialConfig")
    public async createMaterialConfig(@Body() materialConfig: MaterialConfigDTO) {
        return await this.materialesConfigService.createMaterialConfig(materialConfig)
    }

    @Patch("updateMaterialConfig/:id/:idSubsistemaConfig")
    public async updateMaterialConfig(@Param("id", ParseIntPipe) idMaterialConfig: number, @Param("idSubsistemaConfig", ParseIntPipe) idSubsistemaConfig: number,
        @Body() updateMaterialConfigDTO: UpdateMaterialConfigDTO) {
        return await this.materialesConfigService.updateMaterialConfig(idMaterialConfig, idSubsistemaConfig, updateMaterialConfigDTO)
    }

    @Delete("deleteMaterialConfig/:id")
    public async deleteMaterialConfig(@Param("id", ParseIntPipe) idMaterialConfig: number) {
        return await this.materialesConfigService.deleteMaterialConfig(idMaterialConfig)
    }
}
