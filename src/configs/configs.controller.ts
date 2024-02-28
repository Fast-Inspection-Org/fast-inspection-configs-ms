import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { ConfigDTO } from './config.dto';

@Controller('configs')
export class ConfigsController {
    constructor(private configsService: ConfigsService) { }

    @Get("getAllConfigs") // Ruta para obtener todas las configuraciones registradas
    public getAllConfigs() {
        return this.configsService.getAllConfigs()
    }

    @Get("getLastConfig") // Ruta para obtener la ultima configuración registrada
    public getLastConfig() {

        return this.configsService.getLastConfig()
    }


    @Post("createConfigByOtherConfig/:versionOtherConfig")
    public createConfigByOtherConfig(@Param("versionOtherConfig", ParseIntPipe) versionOtherConfig: number) {
        this.configsService.createConfigByOtherConfig(versionOtherConfig)
    }

    @Post("saveNewConfig")
    public saveNewConfig(@Body() newConfig: ConfigDTO) {
        this.configsService.createConfig(newConfig)
    }

    @Delete("deleteConfig/:version") // Ruta para eliminar una configuración en especifico (Método de super administrador)
    public deleteConfig(@Param("version", ParseIntPipe) versionConfig: number) {
        this.configsService.deleteConfig(versionConfig)
    }

    @Delete("deleteAllConfigs") // Ruta para eliminar todas las configuraciones (Método de super administrador)
    public deletedeleteAllConfigs() {
        this.configsService.deleteAllConfigs()
    }


}
