import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/usuario/dto/create-usuario.dto';
import { LoginDTO } from 'src/usuario/dto/login-dto';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { UsuarioService } from 'src/usuario/usuario.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
    constructor(private userService: UsuarioService,
        private jwtService: JwtService
    ) { }

    // Metodo para logear un usuario en el sistema
    public async login(loginDTO: LoginDTO) {
        const userEntity: Usuario = await this.userService.findOneByNombreUsuario(loginDTO.nombreUsuario) // se obtiene la usuario por su nombre de usuario

        if (!await bcrypt.compare(loginDTO.contrasena, userEntity.contrasena)) // si la contraseña es incorrecta
            throw new BadRequestException("La contrasena es incorrecta") // se lanza la exeption y se detiene la ejecución del método
// se crea un payload esto es la información adicional que va a hacer almacenada como parte del token generado
            const payload = {userId: userEntity.id, rol: userEntity.rol} 

            // se crea el token

            const token = await this.jwtService.signAsync(payload) // se crea un token con la información del payload

        return {token: token, payload} // se retorna el token junto con el id del usuario
    }

    // Metodo para registrar un usuario en el sistema
    public async registrer(userDTO: CreateUsuarioDto) {
        return await this.userService.create(userDTO) // Se manda a registrar al usuario en la base de datos al servicio de usuarios
    }

}
