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
import { MaterialesConfigService } from './materiales-config.service';
import { MaterialConfigDTO } from './material-config.dto';
import { UpdateMaterialConfigDTO } from './update-material-config.dto';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { FiltersMaterialConfigDTO } from './filters-material-config.dto';

@Controller('materiales-config')
export class MaterialesConfigController {
  constructor(private materialesConfigService: MaterialesConfigService) {}

  @MessagePattern('getAllMaterialesConfig')
  public async getAllMaterialesConfig(
    filtersMaterialConfigDTO: FiltersMaterialConfigDTO,
  ) {
    try {
      return await this.materialesConfigService.getAllMaterialesConfig(
        filtersMaterialConfigDTO.idSubsistemaConfig,
        filtersMaterialConfigDTO.nombre,
      );
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('createMaterialConfig')
  public async createMaterialConfig(materialConfig: MaterialConfigDTO) {
    try {
      await this.materialesConfigService.createMaterialConfig(materialConfig);
      return { success: true };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('updateMaterialConfig')
  public async updateMaterialConfig(payload: {
    idMaterialConfig: number;
    updateMaterialConfigDTO: UpdateMaterialConfigDTO;
  }) {
    try {
      await this.materialesConfigService.updateMaterialConfig(
        payload.idMaterialConfig,
        payload.updateMaterialConfigDTO,
      );
      return { success: true };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  @MessagePattern('deleteMaterialConfig')
  public async deleteMaterialConfig(idMaterialConfig: number) {
    try {
      await this.materialesConfigService.deleteMaterialConfig(idMaterialConfig);
      return { success: true };
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }
}
