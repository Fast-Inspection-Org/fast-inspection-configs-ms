import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { ConfigDTO } from './config.dto';

@Controller('configs')
export class ConfigsController {
    constructor(private configsService: ConfigsService) { }

    @Get("getAllConfigs") // Ruta para obtener todas las configuraciones registradas
    public async getAllConfigs() {
        return await this.configsService.getAllConfigs()
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
    public createConfigByOtherConfig(@Param("versionOtherConfig", ParseIntPipe) versionOtherConfig: number, @Query("nombreConfig") nombreConfig,
        @Query("descripcionConfig") descripcionConfig) {
        return this.configsService.createConfigByOtherConfig(versionOtherConfig, nombreConfig, descripcionConfig)
    }

    @Post("createNewConfig")
    public async saveNewConfig(@Body() newConfig: ConfigDTO) {

        await this.configsService.createConfig(newConfig)

    }

    @Delete("deleteConfig/:version") // Ruta para eliminar una configuración en especifico (Método de super administrador)
    public async deleteConfig(@Param("version", ParseIntPipe) versionConfig: number) {
        try {
            await this.configsService.deleteConfig(versionConfig)
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'No exite una configuración con ese id',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @Delete("deleteAllConfigs") // Ruta para eliminar todas las configuraciones (Método de super administrador)
    public deletedeleteAllConfigs() {
        this.configsService.deleteAllConfigs()
    }


}
