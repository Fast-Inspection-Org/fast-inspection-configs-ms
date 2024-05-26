import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsuarioService {
  constructor(@InjectRepository(Usuario) private ususarioRepository: Repository<Usuario>) { }

  public async create(createUsuarioDto: CreateUsuarioDto) {
    // se encripta la contraseña
    createUsuarioDto.contrasena = await bcrypt.hash(createUsuarioDto.contrasena, 10)
    const userEntity = this.ususarioRepository.create(createUsuarioDto) // se crea un usuario entity basado en la información del usuario dto
    return await this.ususarioRepository.save(userEntity); // se almacena al usuario en la base de datos
  }

  public async findOneByEmail(email: string) {
    const userEntity: Usuario = await this.ususarioRepository.findOneBy({ email: email })
    if (!userEntity) // si no fue encontrado un usuario con ese email
      throw new NotFoundException(`No fue encontrado un usuario con email ${email}`);

    return userEntity
  }

  // Metodo para obtener un usuario por su nombre de usuario
  public async findOneByNombreUsuario(nombreUsuario: string) {
    const userEntity: Usuario = await this.ususarioRepository.findOneBy({ nombreUsuario: nombreUsuario })
    if (!userEntity) // si no fue encontrado un usuario con ese email
      throw new NotFoundException(`No fue encontrado un usuario con nombre de usuario ${nombreUsuario}`);

    return userEntity
  }

 

  findAll() {
    return this.ususarioRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
