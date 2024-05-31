import { BadRequestException, Body, Controller, Param, Post } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/usuario/dto/login-dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }
    @Post("login")
    public async login(@Body() loginDTO: LoginDTO) {
      return  await this.authService.login(loginDTO)
    }

    @Post("registrer")
    public async registrer(@Body() userDTO: CreateUsuarioDto) {
           return await this.authService.registrer(userDTO)     
    }
}
