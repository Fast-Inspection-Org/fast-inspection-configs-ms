import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { SistemasConfigService } from './sistemas-config.service';
import { SistemaConfigDTO } from './sistema-config.dto';

@Controller('sistemas-config')
export class SistemasConfigController {
    constructor(private sistemaConfigService: SistemasConfigService) { }

    @Post("createSistemaConfig")
    public async createSistemaConfig(@Body() sistemaConfigDTO: SistemaConfigDTO) {

        await this.sistemaConfigService.createSistemaConfig(sistemaConfigDTO)
    }

    @Get("getAllSistemasConfig")
    public async getAllSistemasConfig() {
        return await this.sistemaConfigService.getAllSistemasConfig()
    }

    @Get("getAllBelongConfig/:version")
    public async getAllBelongConfig(@Param("version") versionConfig: number) {
        return await this.sistemaConfigService.getAllSistemasConfig(versionConfig)
    }

    @Delete("deleteSistemaConfig/:id")
    public async deleteSistemaConfig(@Param("version") idSistema: number) {

    }
}
