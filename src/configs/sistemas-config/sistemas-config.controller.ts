import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { SistemasConfigService } from './sistemas-config.service';
import { SistemaConfigDTO } from './sistema-config.dto';
import { UpdateSistemaConfigDTO } from './update-sistema-config.dto';
import { MessagePattern } from '@nestjs/microservices';
import { FiltersSistemaConfigDTO } from './filters-sistema-config.dto';

@Controller('sistemas-config')
export class SistemasConfigController {
    constructor(private sistemaConfigService: SistemasConfigService) { }

    @MessagePattern('createSistemaConfig')
    public async createSistemaConfig(sistemaConfigDTO: SistemaConfigDTO) {

        return await this.sistemaConfigService.createSistemaConfig(sistemaConfigDTO)
    }

    @MessagePattern('updateSistemaConfig')
    public async updateSistemaConfig(payload: { idSistemaConfig: number, updateSistemaConfigDTO: UpdateSistemaConfigDTO }) {
        return await this.sistemaConfigService.updateSistemaConfigDTO(payload.idSistemaConfig, payload.updateSistemaConfigDTO)
    }


    @MessagePattern('getAllSistemasConfig')
    public async getAllSistemasConfig() {
        return await this.sistemaConfigService.getAllSistemasConfig()
    }

    // cambiar el enfoque de los filtros
    @MessagePattern('getAllBelongConfig')
    public async getAllBelongConfig(filtersSistemaConfigDTO: FiltersSistemaConfigDTO) {

        return await this.sistemaConfigService.getAllSistemasConfig(filtersSistemaConfigDTO.versionConfig, filtersSistemaConfigDTO.nombre,
            filtersSistemaConfigDTO.nombreHerramienta)
    }

    @MessagePattern('deleteSistemaConfig')
    public async deleteSistemaConfig(idSistema: number) {
        return await this.sistemaConfigService.deleteSistemaConfig(idSistema)
    }

    @MessagePattern('getHerramientaSistemaMaterial')
    public async getHerramientaSistemaMaterial(payload: { idMaterial: number, versionConfig: number }) {
        return await this.sistemaConfigService.getHerramientaSistemaMaterial(payload.idMaterial, payload.versionConfig)
    }
}
