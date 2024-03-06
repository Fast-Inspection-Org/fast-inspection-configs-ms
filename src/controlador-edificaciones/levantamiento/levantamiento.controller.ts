import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LevantamientoService } from './levantamiento.service';
import { LevantamientoDTO } from './levantamiento.dto';

@Controller('levantamiento')
export class LevantamientoController {
    constructor(private levantamientoService: LevantamientoService) { }

    @Get("getAllLevantamientos")
    public async getAllLevantamientos() {
        await this.levantamientoService.getAllLevantamientos()
    }

    @Post("createLevantamiento")
    public async createLevantamiento(@Body() levantamientoDTO: LevantamientoDTO) {
        await this.levantamientoService.createLevantamiento(levantamientoDTO)
    }

    @Delete("deleteLevantamiento/:id")
    public async deleteLevantamiento(@Param("id") idLevantamiento: number) {
      await  this.levantamientoService.deleteLevantamiento(idLevantamiento)
    }
}
