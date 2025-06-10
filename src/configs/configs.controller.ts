import { Controller } from '@nestjs/common';
import { ConfigsService } from './configs.service';
import { ConfigDTO } from './config.dto';
import { UpdateConfigDTO } from './config-update.dto';
import { ConfigOrderBy } from './config.entity';
import { FiltersConfigDTO } from './filters-config.dto';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { Calculos } from './indice-calculable/indice-calculable.entity';

@Controller('configs')
export class ConfigsController {
  constructor(private configsService: ConfigsService) {}

  @MessagePattern('getAllConfigs') // Ruta para obtener todas las configuraciones registradas
  public async getAllConfigs(
    filtersConfig: FiltersConfigDTO /* parametros representa los filtros de búsqueda */,
  ) {
    try {
      return await this.configsService.getAllConfigs(
        filtersConfig.orderBy ? filtersConfig.orderBy : ConfigOrderBy.Nombre,
        filtersConfig.version
          ? parseInt(filtersConfig.version.toString())
          : undefined,
        filtersConfig.nombre,
      );
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('getSistemasConfig') // Ruta para obtener todas las configuraciones registradas
  public async getSistemasConfig(payload: { version: number }) {
    try {
      return await this.configsService.getSistemasConfig(payload.version);
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('getLastConfig') // Ruta para obtener la ultima configuración registrada
  public async getLastConfig() {
    try {
      return await this.configsService.getLastConfig();
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('getConfigByVersion') // Ruta para obtener la configuración con una versión en específico
  public async getConfigByVersion(versionConfig: number) {
    try {
      return await this.configsService.getConfigByVersion(versionConfig);
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('createConfigByOtherConfig')
  public async createConfigByOtherConfig(
    payload: {
      versionOtherConfig: number;
      configDTO: ConfigDTO;
    } /* Representa el payload del mensaje */,
  ) {
    try {
      await this.configsService.createConfigByOtherConfig(
        payload.versionOtherConfig,
        payload.configDTO.nombre,
        payload.configDTO.descripcion,
      );
      return { success: true };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('createNewConfig')
  public async saveNewConfig(newConfig: ConfigDTO) {
    try {
      // se debe registrar traza
      await this.configsService.createConfig(newConfig);
      return { success: true };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('deleteConfig') // Ruta para eliminar una configuración en especifico (Método de super administrador)
  public async deleteConfig(versionConfig: number) {
    try {
      await this.configsService.deleteConfig(versionConfig);
      return { success: true };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('deleteAllConfigs') // Ruta para eliminar todas las configuraciones (Método de super administrador)
  public async deletedeleteAllConfigs() {
    try {
      await this.configsService.deleteAllConfigs();
      return { success: true };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('updateConfig')
  public async updateConfig(payload: {
    version: number;
    updateConfigDTO: UpdateConfigDTO;
  }) {
    try {
      await this.configsService.updateConfig(
        payload.version,
        payload.updateConfigDTO,
      );
      return { success: true };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('marcarAsActivaConfig')
  public async marcarAsActivaConfig(version: number) {
    try {
      await this.configsService.marcarAsActivaConfig(version);
      return { success: true };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('getIndicadorCalculo')
  public async getIndicadorCalculo(payload: {
    version: number;
    valorCalculo: number;
    calculo: Calculos;
  }) {
    try {
      return await this.configsService.getIndicadorCalculo(
        payload.version,
        payload.valorCalculo,
        payload.calculo,
      );
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }
}
