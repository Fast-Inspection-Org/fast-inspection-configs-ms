import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Edificacion } from './edificacion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EdificacionDTO } from './edificacion.dto';

@Injectable()
export class EdificacionService {
    constructor(@InjectRepository(Edificacion) private edificacionRepository: Repository<Edificacion>) {
    }

    // Metoodo para obtener todos las edificaciones
    public async getAllEdificaciones() {
        return this.edificacionRepository.find()
    }

    // Metodo para insertar una Edificacion
    public async createEdificacion(edificacionDTO: EdificacionDTO) {
        await this.edificacionRepository.save(this.edificacionRepository.create(edificacionDTO))
    }

    // Metodo para obtener una edificacion
    public async getEdificacion(id: number) {
        return await this.edificacionRepository.findOne({
            where: {
                id: id
            }
        })
    }

    // Metodo para eliminar todas las edificaciones (super administrador)
    public async deleteAllEdificaciones() {
        await this.edificacionRepository.delete({})
    }

    // Metodo para eliminar una edificación  (super administrador)
    public async deleteEdificacion(idEdificio: number) {
        await this.edificacionRepository.delete({
            id: idEdificio
        })
    }

}
