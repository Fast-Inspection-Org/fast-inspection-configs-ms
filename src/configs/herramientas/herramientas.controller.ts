import { Controller, Delete, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { HerramientasService } from './herramientas.service';
import { MessagePattern, RpcException } from '@nestjs/microservices';

@Controller('herramientas')
export class HerramientasController {
    constructor(private herramientaService: HerramientasService) { }

    @MessagePattern('deleteHerramienta')
    public async deleteHerramienta(idHerramienta: number) {
        try {
            await this.herramientaService.deleteHerramienta(idHerramienta)
            return { success: true }
        } catch (error) {
            throw new RpcException({
                message: error.message,
                status: error.status
            })
        }
    }
}
