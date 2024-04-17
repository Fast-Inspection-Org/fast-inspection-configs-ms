import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Levantamiento } from './levantamiento.entity';
import { Repository } from 'typeorm';
import { LevantamientoDTO } from './levantamiento.dto';
import { LevantamientoDomain } from './estructura-levantamiento/levantamiento.domain';
import { Sistema } from './estructura-levantamiento/sistema.domain';
import { SubSistema } from './estructura-levantamiento/subsistema.domain';
import { Material } from './estructura-levantamiento/material.domain';
import { TipoDeterioro } from './estructura-levantamiento/tipo-deterioro.domain';

@Injectable()
export class LevantamientoService {
    constructor(@InjectRepository(Levantamiento) private levantamientoRepository: Repository<Levantamiento>) { }

    // Metodo para obtener todos los levantamientos registrados
    public async getAllLevantamientosDB() {
        return await this.levantamientoRepository.find()
    }

    public async getLevantamientosByEdificacionDB(idEdificacion: number) {
        return this.levantamientoRepository.find({ // se obtienen desde la base de datos los levantamientos que pertenecen a una edificación en especifico
            where: {
                edificacionId: idEdificacion
            }
        })
    }

    // Metodo para insertar un nuevo levantamiento a la base de datos
    public async createLevantamiento(letantamientoDTO: LevantamientoDTO) {
        await this.levantamientoRepository.save(this.levantamientoRepository.create(letantamientoDTO))
    }

    //Metodo para eliminar un levantamiento
    public async deleteLevantamiento(idLevantamiento: number) {
        await this.levantamientoRepository.delete({ id: idLevantamiento })
    }


    // Metodo obtener todos los levantamientos procesados y estructurados
    public async getAllLevantamientosDomain() {
        const levantamientos: Array<Levantamiento> = await this.getAllLevantamientosDB();

        return this.createArrayLevantamientosDomain(levantamientos)
    }



    // Metodo para construir una lista de levantamientos domain (levantammientos estructurados y procesados)
    private createArrayLevantamientosDomain(levantamientos: Array<Levantamiento>) {
        const levantamientosDomain: Array<LevantamientoDomain> = new Array<LevantamientoDomain>()
        levantamientos.forEach((levantamiento) => {
            levantamientosDomain.push(new LevantamientoDomain(levantamiento.id, levantamiento.fechaInicio, levantamiento.fechaFinalizado,
                levantamiento.edificacion, levantamiento.config, levantamiento.deterioros))
        })

        return levantamientosDomain
    }

    // Metodo para obtener los levantamientos de un edificio en especifico

    public async getLevantamientosByEdificacion(idEdificacion: number): Promise<Array<LevantamientoDomain>> {
        const levantamientos: Array<LevantamientoDomain> = new Array<LevantamientoDomain>()
        const levantamientosDB: Array<Levantamiento> = await this.getLevantamientosByEdificacionDB(idEdificacion)

        // se crean levantamientos del dominio para la realización de operaciones
        levantamientosDB.forEach((levantamiento) => {
            levantamientos.push(new LevantamientoDomain(levantamiento.id, levantamiento.fechaInicio, levantamiento.fechaFinalizado,
                levantamiento.edificacion, levantamiento.config, levantamiento.deterioros))
        })

        return levantamientos;

    }

    // Metodo para obtener un Levantamiento estrcuturado con un id en especifico
    public async getLevantamiento(id: number) {
        let levantamienoDomain: LevantamientoDomain | undefined = undefined
        const levantamiento: Levantamiento = await this.levantamientoRepository.findOne({ // se obtiene al levantamiento desde la base de datos
            where: {
                id: id
            }
        })

        if (levantamiento)
            levantamienoDomain = new LevantamientoDomain(levantamiento.id, levantamiento.fechaInicio, levantamiento.fechaFinalizado,
                levantamiento.edificacion, levantamiento.config, levantamiento.deterioros) // se crea un levantamiento estrcuturado para ser mostrado

        return levantamienoDomain // se retorna un levantamiento con la estructura definida

    }

    public async getSistemasLevantamiento(idLevantamiento: number) {
        const levantamientoDomain: LevantamientoDomain | undefined = await this.getLevantamiento(idLevantamiento); // se obtiene el levantamiento
        let sistemasDomain: Array<Sistema> | undefined = undefined;

        if (levantamientoDomain) // si fue encontrado levantamiento
            sistemasDomain = levantamientoDomain.getSistemas() // se obtienen los sistemas del levantamiento

        return sistemasDomain;
    }

    // Metodo para obtener todos los subsistemas asociados a un sistema en especifico componente de un levantamiento
    public async getSubSistemasSistemaLevantamiento(idLevantamiento: number, idSistema: number) {
        const levantamientoDomain: LevantamientoDomain | undefined = await this.getLevantamiento(idLevantamiento); // se obtiene el levantamiento
        let subsistemas: Array<SubSistema> | undefined = undefined;

        if (levantamientoDomain) // si fue encontrado levantamiento
            subsistemas = levantamientoDomain.getSubsistemasSistema(idSistema); // se obtienen los subsistemas asociados a ese sistema componente del levantamiento

        return subsistemas;

    }

    // Metodo para obtener todos los materiales asociados a un subsistema en especifico componente de un levantamiento
    public async getMaterialesSubsistemaSistemaLevantamiento(idLevantamiento: number, idSistema: number, idSubsistema: number) {
        const levantamientoDomain: LevantamientoDomain | undefined = await this.getLevantamiento(idLevantamiento); // se obtiene el levantamiento
        let materiales: Array<Material> | undefined = undefined;

        if (levantamientoDomain) // si fue encontrado levantamiento
            materiales = levantamientoDomain.getMaterialesSubsistemaSistema(idSistema, idSubsistema); // se obtienen los materiales asociados a ese subsistema componente del levantamiento

        return materiales;

    }

    // Metodo para obtener todos los materiales asociados a un subsistema en especifico componente de un levantamiento
    public async getTiposDeteriorosMaterialSubsistemaSistemaLevantamiento(idLevantamiento: number, idSistema: number, idSubsistema: number, idMaterial: number) {
        const levantamientoDomain: LevantamientoDomain | undefined = await this.getLevantamiento(idLevantamiento); // se obtiene el levantamiento
        let tiposDeterioros: Array<TipoDeterioro> | undefined = undefined;

        if (levantamientoDomain) // si fue encontrado levantamiento
            tiposDeterioros = levantamientoDomain.getTiposDeteriorosMaterialSubsistemaSistema(idSistema, idSubsistema, idMaterial); // se obtienen los tipos de deterioro asociados a ese material componente del levantamiento

        return tiposDeterioros;

    }

}
