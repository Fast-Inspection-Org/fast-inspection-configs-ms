import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SubsistemasConfigService } from './subsistemas-config.service';
import { SubsistemaConfigDTO } from './subsistema-config.dto';
import { UpdateSubsistemaConfigDTO } from './update-subsistema-config.dto';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { FiltersSubsistemaConfigDTO } from './filters-subsistema-config.dto';

@Controller('subsistemas-config')
export class SubsistemasConfigController {
  constructor(private subsistemasConfigService: SubsistemasConfigService) {}

  @MessagePattern('getAllSubsistemasConfig')
  public async getAllSubsistemasConfig(
    filtersSubsistemaConfigDTO: FiltersSubsistemaConfigDTO,
  ) {
    try {
      return await this.subsistemasConfigService.getAllSubsistemasConfig(
        filtersSubsistemaConfigDTO.idSistemaConfig,
        filtersSubsistemaConfigDTO.nombre,
      );
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('createSubsistemaConfig')
  public async createSubsistemaConfig(subistemaConfigDTO: SubsistemaConfigDTO) {
    try {
      await this.subsistemasConfigService.createSubSistemaConfig(
        subistemaConfigDTO,
      );
      return { success: true };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('updateSubsistemaConfig')
  public async updateSubsistemaConfig(payload: {
    idSubsistemaConfig: number;
    updateSubsistemaConfigDTO: UpdateSubsistemaConfigDTO;
  }) {
    try {
      await this.subsistemasConfigService.updateSubsistemaConfig(
        payload.idSubsistemaConfig,
        payload.updateSubsistemaConfigDTO,
      );
      return { success: true };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('deleteSubsistemaConfig')
  public async deleteSubsistemaConfig(idSubsistemaConfig: number) {
    try {
      await this.subsistemasConfigService.deleteSubsistemaConfig(
        idSubsistemaConfig,
      );
      return { success: true };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }
}
