import { Controller, Delete, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { HerramientasService } from './herramientas.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('herramientas')
export class HerramientasController {
    constructor(private herramientaService: HerramientasService) { }
    
    @MessagePattern('deleteHerramienta')
    public async deleteHerramienta(idHerramienta: number) {
        return await this.herramientaService.deleteHerramienta(idHerramienta)
    }
}
