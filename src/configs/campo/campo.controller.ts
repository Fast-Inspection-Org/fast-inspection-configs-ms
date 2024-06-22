import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CampoService } from './campo.service';
import { CampoDTO } from './campo.dto';
import { UpdateCampoDTO } from './update-campo.dto';

@Controller('campo')
export class CampoController {
    constructor(private campoService: CampoService) { }

    @Get("getAllCampos")
    public async getAllCampos(@Query("nombre") nombre: String, @Query("importancia") importancia: String, @Query("idHerramienta") idHerramienta: String) {
        return await this.campoService.getAllCampos(nombre, importancia ? parseInt(importancia.toString()) : undefined, idHerramienta ? parseInt(idHerramienta.toString()) : undefined)
    }

    @Post("createCampo")
    public async createCampo(@Body() campoDTO: CampoDTO) {
        return await this.campoService.createCampo(campoDTO)
    }

    @Patch("updateCampo/:id")
    public async updateCampo(@Param("id", ParseIntPipe) idCampo: number, @Body() updateCampoDTO: UpdateCampoDTO) {
        return await this.campoService.updateCampo(idCampo, updateCampoDTO)
    }

    @Delete("deleteCampo/:id")
    public async deleteCampo(@Param("id", ParseIntPipe) idCampo: number) {
        return await this.campoService.deleteCampo(idCampo)
    }
}
