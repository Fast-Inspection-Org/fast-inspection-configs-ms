import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { LevantamientoService } from './levantamiento.service';
import { LevantamientoDTO } from './levantamiento.dto';

@Controller('levantamiento')
export class LevantamientoController {
  constructor(private levantamientoService: LevantamientoService) { }

  @Get("getAllLevantamientosTest")
  public async getAllLevantamientosTest() {
    return await this.levantamientoService.getAllLevantamientos()
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("getAllLevantamientos")
  public async getAllLevantamientos() {
    return await this.levantamientoService.getAllLevantamientosDomain()
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    groups : ["getLevantamiento"]
  })
  @Get("getLevantamiento/:id")
  public async getLevantamiento(@Param("id", ParseIntPipe) idLevantamiento) {
    return await this.levantamientoService.getLevantamiento(idLevantamiento)
  }

  @Post("createLevantamiento")
  public async createLevantamiento(@Body() levantamientoDTO: LevantamientoDTO) {
    await this.levantamientoService.createLevantamiento(levantamientoDTO)
  }

  @Delete("deleteLevantamiento/:id")
  public async deleteLevantamiento(@Param("id") idLevantamiento: number) {
    await this.levantamientoService.deleteLevantamiento(idLevantamiento)
  }
}
