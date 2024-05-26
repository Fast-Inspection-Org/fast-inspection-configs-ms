import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
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
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get("allUsers")
  @UseInterceptors(ClassSerializerInterceptor) // se indica que se usan interceptores para personalizar la serialización del objeto de retorno del método
  @Roles([RolEnum.Administrador]) // se autoriza el acceso solo al rol administrador
  @UseGuards(AuthGuard, RolGuard) // verifica el acceso a la solicitud
  public findAll(@Request() req) {
    // con el request luego se registra una traza de auditoria
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
