import { Injectable } from '@nestjs/common';
import { Edificacion } from './edificacion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EdificacionDTO } from './edificacion.dto';
import { EdificacionDomain } from './edificacion.domain';
import { LevantamientoService } from '../levantamiento/levantamiento.service';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { LevantamientoDomain } from '../levantamiento/estructura-levantamiento/levantamiento.domain';

@Injectable()
export class EdificacionService {
    constructor(@InjectRepository(Edificacion) private edificacionRepository: Repository<Edificacion>, private levantamientoService: LevantamientoService) {
    }

    // Metoodo para obtener todos las edificaciones
    public async getAllEdificaciones() {
        const edificaciones: Array<Edificacion> = await this.edificacionRepository.find() // se obtienen todas las edificaciones de la base de datos
    
        return this.createEdificacionesDomain(edificaciones)
    }

    // Metodo para insertar una Edificacion
    public async createEdificacion(edificacionDTO: EdificacionDTO) {
        await this.edificacionRepository.save(this.edificacionRepository.create(edificacionDTO))
    }

    // Metodo para obtener una edificacion
    public async getEdificacion(idEdificacion: number) {
        let edificacionDomain: EdificacionDomain | undefined = undefined
        const edificacion: Edificacion | undefined = await this.edificacionRepository.findOne({
            where: { // se obtiene la edificación de la base de datos
                id: idEdificacion
            }
        })

        if (edificacion) // si fue encontrada edificación
            edificacionDomain = new EdificacionDomain(edificacion.id, edificacion.nombre, edificacion.direccion,
                edificacion.ubicacionX, edificacion.ubicacionY, await this.levantamientoService.getLevantamientosByEdificacion(edificacion.id))

        return edificacionDomain
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

    // Metodo para crear un arreglo de edificaciones del dominio

    private async createEdificacionesDomain(edificaciones: Array<Edificacion>) {
        const edificacionesDomain: Array<EdificacionDomain> = new Array<EdificacionDomain>()
        
        // Se crean y se añaden a la lista edificaciones del dominio
      for (let i = 0; i < edificaciones.length; i++) {
        edificacionesDomain.push(new EdificacionDomain(edificaciones[i].id, edificaciones[i].nombre, edificaciones[i].direccion,
            edificaciones[i].ubicacionX, edificaciones[i].ubicacionY, await this.levantamientoService.getLevantamientosByEdificacion(edificaciones[i].id)))
      }

        

        return edificacionesDomain
    }

}
