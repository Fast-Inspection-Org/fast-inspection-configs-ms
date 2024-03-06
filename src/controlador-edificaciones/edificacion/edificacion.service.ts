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
        try {
            await this.edificacionRepository.save(this.edificacionRepository.create(edificacionDTO))
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Error en la insercción de la edificacion',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
