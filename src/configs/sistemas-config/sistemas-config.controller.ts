import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SistemasConfigService } from './sistemas-config.service';
import { SistemaConfigDTO } from './sistema-config.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateSistemaConfigDTO } from './update-sistema-config.dto';

@Controller('sistemas-config')
export class SistemasConfigController {
    constructor(private sistemaConfigService: SistemasConfigService) { }

    @Post("createSistemaConfig")
    public async createSistemaConfig(@Body() sistemaConfigDTO: SistemaConfigDTO) {

        return await this.sistemaConfigService.createSistemaConfig(sistemaConfigDTO)
    }

    @Patch("updateSistemaConfig/:id")
    public async updateSistemaConfig(@Param("id", ParseIntPipe) idSistemaConfig: number, @Body() updateSistemaConfigDTO: UpdateSistemaConfigDTO) {
        return await this.sistemaConfigService.updateSistemaConfigDTO(idSistemaConfig, updateSistemaConfigDTO)
    }

    @Get("getAllSistemasConfig")
    public async getAllSistemasConfig() {
        return await this.sistemaConfigService.getAllSistemasConfig()
    }

    
    @Get("getAllBelongConfig/:version")
    //@UseGuards(AuthGuard)
    public async getAllBelongConfig(@Param("version") versionConfig: number, @Query("nombre") nombre: String, @Query("nombreHerramienta") nombreHerramienta: String) {
        
        return await this.sistemaConfigService.getAllSistemasConfig(versionConfig, nombre, nombreHerramienta)
    }

    @Delete("deleteSistemaConfig/:id")
    public async deleteSistemaConfig(@Param("id", ParseIntPipe) idSistema: number) {
        return await this.sistemaConfigService.deleteSistemaConfig(idSistema)
    }
}
