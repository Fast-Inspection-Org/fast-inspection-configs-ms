import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { HerramientasService } from './herramientas.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('herramientas')
export class HerramientasController {
    constructor(private herramientaService: HerramientasService) { }

    @Get("getAllHerramientasBelongConfig/:versionConfig")
    @UseGuards(AuthGuard)
    public async getAllHerramientasBelongConfig(@Param("versionConfig", ParseIntPipe) versionConfig: number) {
        return this.herramientaService.getAllHerramientasBelongConfig(versionConfig)
    }
}
