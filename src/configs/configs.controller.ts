import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post } from '@nestjs/common';
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
   
    @Post("createNewConfig")
    public async saveNewConfig(@Body() newConfig: ConfigDTO) {
       await this.configsService.createConfig(newConfig)
              
    }

    @Delete("deleteConfig/:version") // Ruta para eliminar una configuración en especifico (Método de super administrador)
    public async deleteConfig(@Param("version", ParseIntPipe) versionConfig: number) {
        try {
            await  this.configsService.deleteConfig(versionConfig)
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
