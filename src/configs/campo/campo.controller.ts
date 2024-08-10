import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CampoService } from './campo.service';
import { CampoDTO } from './campo.dto';
import { UpdateCampoDTO } from './update-campo.dto';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { FiltersCampoDTO } from './filters-campo.dto';

@Controller('campo')
export class CampoController {
    constructor(private campoService: CampoService) { }

    @MessagePattern('getAllCampos')
    public async getAllCampos(filtersCampoDTO: FiltersCampoDTO) {
        try {
            return await this.campoService.getAllCampos(filtersCampoDTO.nombre, filtersCampoDTO.importancia ?
                parseInt(filtersCampoDTO.importancia.toString()) : undefined, filtersCampoDTO.idHerramienta ?
                parseInt(filtersCampoDTO.idHerramienta.toString()) : undefined)
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }

    @MessagePattern('createCampo')
    public async createCampo(campoDTO: CampoDTO) {
        try {
            await this.campoService.createCampo(campoDTO)
            return { success: true }
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }

    @MessagePattern('updateCampo')
    public async updateCampo(payload: { idCampo: number, updateCampoDTO: UpdateCampoDTO }) {
        try {
            await this.campoService.updateCampo(payload.idCampo, payload.updateCampoDTO)
            return { success: true }
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }

    @MessagePattern('deleteCampo')
    public async deleteCampo(idCampo: number) {
        try {
            await this.campoService.deleteCampo(idCampo)
            return { success: true }
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }
}
