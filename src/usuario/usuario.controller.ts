import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors, ClassSerializerInterceptor, Query, ParseIntPipe } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolGuard } from 'src/auth/guards/rol/rol.guard';
import { Roles } from 'src/decoradores/rol.decorator';
import { RolEnum } from './entities/usuario.entity';


@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post()
  public async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return await this.usuarioService.create(createUsuarioDto);
  }

  @Get("allUsers")
  @UseInterceptors(ClassSerializerInterceptor) // se indica que se usan interceptores para personalizar la serialización del objeto de retorno del método
  //@Roles([RolEnum.Administrador]) // se autoriza el acceso solo al rol administrador
  //@UseGuards(AuthGuard, RolGuard) // verifica el acceso a la solicitud
  public async findAll(@Request() req, @Query("nombre") nombre: string, @Query("rol") rol: RolEnum) {
    // con el request luego se registra una traza de auditoria
    return await this.usuarioService.findAll(nombre, rol);
  }

  @Get(':id')
  public async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usuarioService.findOne(id);
  }

  @Patch('updateUser/:id')
 public async update(@Param('id', ParseIntPipe) id: number, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return  await this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete('deleteUser/:id')
  public async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.usuarioService.delete(id)
  }
}
