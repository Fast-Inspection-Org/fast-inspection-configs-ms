import { Injectable } from '@nestjs/common';
import { Edificacion } from './edificacion.entity';
import { EntityManager, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EdificacionDTO } from './edificacion.dto';
import { EdificacionDomain } from './edificacion.domain';
import { LevantamientoService } from '../levantamiento/levantamiento.service';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { LevantamientoDomain } from '../levantamiento/estructura-levantamiento/levantamiento.domain';
import { LevantamientoDTO } from '../levantamiento/levantamiento.dto';

@Injectable()
export class EdificacionService {
    constructor(@InjectRepository(Edificacion) private edificacionRepository: Repository<Edificacion>, private levantamientoService: LevantamientoService) {
    }

    // Metoodo para obtener todos las edificaciones
    public async getAllEdificaciones(nombre?: String) {
        const edificaciones: Array<Edificacion> = await this.edificacionRepository.find({
            where: {
                nombre: nombre ? Like(`%${nombre}%`) : nombre
            }
        }) // se obtienen todas las edificaciones de la base de datos

        return await this.createEdificacionesDomain(edificaciones)
    }

    // Metodo para insertar una nueva edificación en la base de datos
    public async createEdificacion(edificacionDTO: EdificacionDTO, entityManager?: EntityManager) {
        if (!entityManager) // No se trata de una llamada con una transacción heredada
            await this.edificacionRepository.manager.transaction(async (transactionManager: EntityManager) => { // Se crea una transaccion para este procedimiento
                await this.createEdificacionWithEntityManager(edificacionDTO, transactionManager)
            })
        else // se continua con la transacción heredada
            await this.createEdificacionWithEntityManager(edificacionDTO, entityManager)
    }

    // Metodo auxiliar para crear una edificación con la entityManager correspondiente
    private async createEdificacionWithEntityManager(edificacionDTO: EdificacionDTO, entityManager: EntityManager) {

        const edificacionInsertada: Edificacion = await entityManager.save(new Edificacion(edificacionDTO.id, edificacionDTO.nombre, edificacionDTO.direccion,
            edificacionDTO.ubicacionX, edificacionDTO.ubicacionY
        )) // Se almacena en la base de datos de la edificación y se obtiene con su id

        if (edificacionInsertada.levantamientos)
            await this.saveLevantamientos(edificacionDTO.levantamientos, edificacionInsertada, entityManager) // se insertan en la base de datos los levantamientos como parte de la edificación

        //Además se utiliza await para que la transacción espere a que se realicen todas las operaciones en los demás servicios

    }

    private async saveLevantamientos(levantamientosDTO: Array<LevantamientoDTO>, edificacionInsertada: Edificacion, entityManager: EntityManager) {

        for (let index = 0; index < levantamientosDTO.length; index++) {
            const levantamientoDTO: LevantamientoDTO = levantamientosDTO[index]
            // se crea una edificacion dto para ser marcado con el id de la edificación registrada
            const edificacionDTO: EdificacionDTO = new EdificacionDTO()
            edificacionDTO.id = edificacionInsertada.id // se marca la edificación dto con el id de la edificación insertada
            levantamientoDTO.edificacion = edificacionDTO // se marca el levantamiento como parte de la edificación registrada
            await this.levantamientoService.createLevantamiento(levantamientoDTO, entityManager)
        }
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
            const edificacionDomain = new EdificacionDomain(edificaciones[i].id, edificaciones[i].nombre, edificaciones[i].direccion,
                edificaciones[i].ubicacionX, edificaciones[i].ubicacionY, await this.levantamientoService.getLevantamientosByEdificacion(edificaciones[i].id))
            // luego se ejecutan los calculos para exponer las características calculables
            await edificacionDomain.obtenerCriticidad()
            edificacionesDomain.push(edificacionDomain)
        }

        return edificacionesDomain
    }

}
