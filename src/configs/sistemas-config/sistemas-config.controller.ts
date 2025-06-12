import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SistemasConfigService } from './sistemas-config.service';
import { SistemaConfigDTO } from './sistema-config.dto';
import { UpdateSistemaConfigDTO } from './update-sistema-config.dto';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { FiltersSistemaConfigDTO } from './filters-sistema-config.dto';

@Controller('sistemas-config')
export class SistemasConfigController {
  constructor(private sistemaConfigService: SistemasConfigService) {}

  @MessagePattern('createSistemaConfig')
  public async createSistemaConfig(sistemaConfigDTO: SistemaConfigDTO) {
    try {
      await this.sistemaConfigService.createSistemaConfig(sistemaConfigDTO);
      return { success: true };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('updateSistemaConfig')
  public async updateSistemaConfig(payload: {
    idSistemaConfig: number;
    updateSistemaConfigDTO: UpdateSistemaConfigDTO;
  }) {
    try {
      await this.sistemaConfigService.updateSistemaConfigDTO(
        payload.idSistemaConfig,
        payload.updateSistemaConfigDTO,
      );
      return { success: true };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('getAllSistemasConfig')
  public async getAllSistemasConfig() {
    try {
      return await this.sistemaConfigService.getAllSistemasConfig();
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  // cambiar el enfoque de los filtros
  @MessagePattern('getAllBelongConfig')
  public async getAllBelongConfig(
    filtersSistemaConfigDTO: FiltersSistemaConfigDTO,
  ) {
    try {
      return await this.sistemaConfigService.getAllSistemasConfig(
        filtersSistemaConfigDTO.versionConfig,
        filtersSistemaConfigDTO.nombre,
        filtersSistemaConfigDTO.nombreHerramienta,
      );
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('getSistemaConfig')
  public async getSistemaConfig(id: number) {
    try {
      return await this.sistemaConfigService.getSistemaConfig(Number(id));
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('deleteSistemaConfig')
  public async deleteSistemaConfig(idSistema: number) {
    try {
      await this.sistemaConfigService.deleteSistemaConfig(idSistema);
      return { success: true };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('getHerramientaSistemaMaterial')
  public async getHerramientaSistemaMaterial(payload: {
    idMaterial: number;
    versionConfig: number;
  }) {
    try {
      return await this.sistemaConfigService.getHerramientaSistemaMaterial(
        payload.idMaterial,
        payload.versionConfig,
      );
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }
}
