import { RolEnum } from "../entities/usuario.entity"

export class CreateUsuarioDto {
    nombreUsuario: string
    contrasena: string
    email: string
    rol: RolEnum
}
