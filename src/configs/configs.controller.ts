import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Req, Request, UseGuards } from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { ConfigDTO } from './config.dto';

import { RequestWithUser } from 'src/auth/request-with-user';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateConfigDTO } from './config-update.dto';
import { ConfigOrderBy } from './config.entity';
import { Roles } from 'src/decoradores/rol.decorator';
import { RolEnum } from 'src/usuario/entities/usuario.entity';
import { RolGuard } from 'src/auth/guards/rol/rol.guard';
import { FiltersConfigDTO } from './filters-config.dto';
import { MessagePattern } from '@nestjs/microservices';


@Controller('configs')
export class ConfigsController {
    constructor(private configsService: ConfigsService) { }

    @MessagePattern('getAllConfigs') // Ruta para obtener todas las configuraciones registradas
    public async getAllConfigs(filtersConfig: FiltersConfigDTO /* parametros representa los filtros de búsqueda */) {

        return await this.configsService.getAllConfigs(filtersConfig.orderBy ? filtersConfig.orderBy : ConfigOrderBy.Nombre, filtersConfig.version ? parseInt(filtersConfig.version.toString()) : undefined, filtersConfig.nombre)
    }

    @MessagePattern('getLastConfig') // Ruta para obtener la ultima configuración registrada
    public async getLastConfig() {

        return await this.configsService.getLastConfig()
    }


    @MessagePattern('getConfigByVersion') // Ruta para obtener la configuración con una versión en específico
    public async getConfigByVersion(versionConfig: number) {
        return await this.configsService.getConfigByVersion(versionConfig)
    }


    @MessagePattern('createConfigByOtherConfig')
    public async createConfigByOtherConfig(payload: { versionOtherConfig: number, configDTO: ConfigDTO } /* Representa el payload del mensaje */) {
        return await this.configsService.createConfigByOtherConfig(payload.versionOtherConfig, payload.configDTO.nombre, payload.configDTO.descripcion)
    }

    @MessagePattern('createNewConfig')
    public async saveNewConfig(newConfig: ConfigDTO) {
        // se debe registrar traza
        return await this.configsService.createConfig(newConfig)
    }


    @MessagePattern('deleteConfig') // Ruta para eliminar una configuración en especifico (Método de super administrador)
    public async deleteConfig(versionConfig: number) {
        return await this.configsService.deleteConfig(versionConfig)
    }

    @MessagePattern('deleteAllConfigs') // Ruta para eliminar todas las configuraciones (Método de super administrador)
    public async deletedeleteAllConfigs() {
        await this.configsService.deleteAllConfigs()
    }


    @MessagePattern('updateConfig')
    public async updateConfig(payload: { version: number, updateConfigDTO: UpdateConfigDTO }) {
        await this.configsService.updateConfig(payload.version, payload.updateConfigDTO)
    }

    @MessagePattern('marcarAsActivaConfig')
    public async marcarAsActivaConfig(version: number) {
        return await this.configsService.marcarAsActivaConfig(version)
    }
}
