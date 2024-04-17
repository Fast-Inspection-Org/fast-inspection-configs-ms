import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, SerializeOptions, UseInterceptors } from '@nestjs/common';
import { LevantamientoService } from './levantamiento.service';
import { LevantamientoDTO } from './levantamiento.dto';

@Controller('levantamiento')
export class LevantamientoController {
  constructor(private levantamientoService: LevantamientoService) { }


  // EndPoints de obtencion


  @UseInterceptors(ClassSerializerInterceptor)
  @Get("getAllLevantamientos")
  public async getAllLevantamientos() {
    return await this.levantamientoService.getAllLevantamientosDomain()
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    groups: ["getLevantamiento"]
  })
  @Get("getLevantamiento/:id")
  public async getLevantamiento(@Param("id", ParseIntPipe) idLevantamiento) {
    return await this.levantamientoService.getLevantamiento(idLevantamiento)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @SerializeOptions({
    groups: ["getLevantamiento"]
  })
  @Get("getSistemasLevantamiento/:id")
  public async getSistemasLevantamiento(@Param("id", ParseIntPipe) idLevantamiento) {
    return await this.levantamientoService.getSistemasLevantamiento(idLevantamiento)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("getSubsistemasSistemaLevantamiento/:id")
  public async getSubsistemasSistemaLevantamiento(@Param("id", ParseIntPipe) idLevantamiento: number, @Query("sistema", ParseIntPipe) idSistema: number) {
    return await this.levantamientoService.getSubSistemasSistemaLevantamiento(idLevantamiento, idSistema)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("getMaterialesSubsistemaSistemaLevantamiento/:id")
  public async getMaterialesSubsistemaSistemaLevantamiento(@Param("id", ParseIntPipe) idLevantamiento: number, @Query("sistema", ParseIntPipe) idSistema: number,
    @Query("subsistema", ParseIntPipe) idSubsistema: number) {
    return await this.levantamientoService.getMaterialesSubsistemaSistemaLevantamiento(idLevantamiento, idSistema, idSubsistema)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("getTiposDeteriorosMaterialSubsistemaSistemaLevantamiento/:id")
  public async getTiposDeteriorosMaterialSubsistemaSistemaLevantamiento(@Param("id", ParseIntPipe) idLevantamiento: number, @Query("sistema", ParseIntPipe) idSistema: number,
    @Query("subsistema", ParseIntPipe) idSubsistema: number, @Query("material", ParseIntPipe) idMaterial: number) {
    return await this.levantamientoService.getTiposDeteriorosMaterialSubsistemaSistemaLevantamiento(idLevantamiento, idSistema, idSubsistema, idMaterial)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("getLevantamientosByEdificacion/:id")
  public async getLevantamientosByEdificacion(@Param("id", ParseIntPipe) idEdificacion: number) {
    return await this.levantamientoService.getLevantamientosByEdificacion(idEdificacion)
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
