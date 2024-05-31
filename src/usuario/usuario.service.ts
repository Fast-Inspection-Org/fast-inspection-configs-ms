import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Like, Repository } from 'typeorm';
import { RolEnum, Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsuarioService {
  constructor(@InjectRepository(Usuario) private ususarioRepository: Repository<Usuario>) { }

  public async create(createUsuarioDto: CreateUsuarioDto) {
    // se encripta la contraseña
    createUsuarioDto.contrasena = await bcrypt.hash(createUsuarioDto.contrasena, 10)
    const userEntity = this.ususarioRepository.create(createUsuarioDto) // se crea un usuario entity basado en la información del usuario dto
    // se verifica que no exista un usuario con el mismo nombre o email

    if (await this.findOneByEmail(createUsuarioDto.email)) // se existe un usuario con el mismo email
      throw new HttpException("Ya este email tiene asociado una cuenta", HttpStatus.BAD_REQUEST)
    if (await this.findOneByNombreUsuario(createUsuarioDto.nombreUsuario))
      throw new HttpException("Ya el nombre usuario está siendo usado", HttpStatus.BAD_REQUEST)

    return await this.ususarioRepository.save(userEntity); // se almacena al usuario en la base de datos
  }

  public async findOneByEmail(email: string): Promise<Usuario | undefined> {
    const userEntity: Usuario | undefined = await this.ususarioRepository.findOneBy({ email: email })

    return userEntity
  }

  // Metodo para obtener un usuario por su nombre de usuario
  public async findOneByNombreUsuario(nombreUsuario: string): Promise<Usuario | undefined> {
    const userEntity: Usuario | undefined = await this.ususarioRepository.findOneBy({ nombreUsuario: nombreUsuario })

    return userEntity
  }



  public async findAll(nombre?: string, rol?: RolEnum): Promise<Array<Usuario>> {
    return await this.ususarioRepository.find({
      where: {
        nombreUsuario: nombre ? Like(`%${nombre}%`) : nombre,
        rol: rol
      }
    });
  }

  public async findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  // Método para actualizar la información de un usuario
  public async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    await this.ususarioRepository.update({ id: id }, updateUsuarioDto)
  }

  // Método para eliminar un usuario en específico
  public async delete(id: number) {
    await this.ususarioRepository.delete({ id: id })
  }
}
