import { Controller, Delete, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { HerramientasService } from './herramientas.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('herramientas')
export class HerramientasController {
    constructor(private herramientaService: HerramientasService) { }

    @Delete("deleteHerramienta/:id")
    public async deleteHerramienta(@Param("id", ParseIntPipe) idHerramienta: number) {
        return await this.herramientaService.deleteHerramienta(idHerramienta)
    }
}
