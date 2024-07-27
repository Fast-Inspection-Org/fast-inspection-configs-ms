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


@Controller('configs')
export class ConfigsController {
    constructor(private configsService: ConfigsService) { }

    @Get("getAllConfigs") // Ruta para obtener todas las configuraciones registradas
    public async getAllConfigs(@Query("version") version: string, @Query("nombre") nombre: String, @Query("orderBy") orderBy: ConfigOrderBy /* parametros representa los filtros de búsqueda */) {

        return await this.configsService.getAllConfigs(orderBy ? orderBy : ConfigOrderBy.Nombre, version ? parseInt(version) : undefined, nombre)
    }

    @Get("getLastConfig") // Ruta para obtener la ultima configuración registrada
    public async getLastConfig() {

        return await this.configsService.getLastConfig()
    }

    @Get("getConfigByVersion/:versionConfig") // Ruta para obtener la configuración con una versión en específico
    public async getConfigByVersion(@Param("versionConfig", ParseIntPipe) versionConfig: number) {
        return await this.configsService.getConfigByVersion(versionConfig)
    }


    @Post("createConfigByOtherConfig/:versionOtherConfig")
    @UseGuards(AuthGuard) // verifica el acceso a la solicitud
    public async createConfigByOtherConfig(@Param("versionOtherConfig", ParseIntPipe) versionOtherConfig: number, @Body() configDTO: ConfigDTO) {
        return await this.configsService.createConfigByOtherConfig(versionOtherConfig, configDTO.nombre, configDTO.descripcion)
    }

    @Post("createNewConfig")
    //@UseGuards(AuthGuard) // verifica el acceso a la solicitud
    public async saveNewConfig(@Body() newConfig: ConfigDTO, @Req() req: RequestWithUser) {
        // se debe registrar traza
        return await this.configsService.createConfig(newConfig)
    }

    @Delete("deleteConfig/:version") // Ruta para eliminar una configuración en especifico (Método de super administrador)
    @Roles([RolEnum.Administrador]) // Solo el rol administrador tiene acceso a la rutaa
    @UseGuards(AuthGuard, RolGuard) // verifica el acceso a la solicitud
    public async deleteConfig(@Param("version", ParseIntPipe) versionConfig: number) {
        return await this.configsService.deleteConfig(versionConfig)
    }

    @Delete("deleteAllConfigs") // Ruta para eliminar todas las configuraciones (Método de super administrador)
    public async deletedeleteAllConfigs() {
        await this.configsService.deleteAllConfigs()
    }

    @Patch("updateConfig/:version")
    @UseGuards(AuthGuard) // verifica el acceso a la solicitud
    public async updateConfig(@Param("version", ParseIntPipe) version: number, @Body() updateConfigDTO: UpdateConfigDTO) {
        await this.configsService.updateConfig(version, updateConfigDTO)
    }

    @Patch("marcarAsActivaConfig/:version")
    public async marcarAsActivaConfig(@Param("version", ParseIntPipe) version: number) {
        return await this.configsService.marcarAsActivaConfig(version)
    }
}
