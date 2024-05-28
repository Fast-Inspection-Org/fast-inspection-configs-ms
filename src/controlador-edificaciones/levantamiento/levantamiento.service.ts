import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Levantamiento } from './levantamiento.entity';
import { EntityManager, Repository } from 'typeorm';
import { LevantamientoDTO } from './levantamiento.dto';
import { LevantamientoDomain } from './estructura-levantamiento/levantamiento.domain';
import { Sistema } from './estructura-levantamiento/sistema.domain';
import { SubSistema } from './estructura-levantamiento/subsistema.domain';
import { Material } from './estructura-levantamiento/material.domain';
import { TipoDeterioro } from './estructura-levantamiento/tipo-deterioro.domain';
import { DeterioroDTO } from '../deterioro/deterioro.dto';
import { DeterioroService } from '../deterioro/deterioro.service';

@Injectable()
export class LevantamientoService {
    constructor(@InjectRepository(Levantamiento) private levantamientoRepository: Repository<Levantamiento>,
        private deterioroService: DeterioroService) { }

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

    // Metodo para insertar un nuevo levantamiento en la base de datos
    public async createLevantamiento(levantamientoDTO: LevantamientoDTO, entityManager?: EntityManager) {
        if (!entityManager) // No se trata de una llamada con una transacción heredada
            await this.levantamientoRepository.manager.transaction(async (transactionManager: EntityManager) => { // Se crea una transaccion para este procedimiento
                await this.createLevantamientoWithEntityManager(levantamientoDTO, transactionManager)
            })
        else // se continua con la transacción heredada
            await this.createLevantamientoWithEntityManager(levantamientoDTO, entityManager)
    }

    // Metodo auxiliar para crear un levantamiento con la entityManager correspondiente
    private async createLevantamientoWithEntityManager(levantamientoDTO: LevantamientoDTO, entityManager: EntityManager) {

        const levantamientoInsertado: Levantamiento = await entityManager.save(new Levantamiento(levantamientoDTO.id, levantamientoDTO.fechaInicio,
            levantamientoDTO.fechaFinalizado
            , levantamientoDTO.edificacion, levantamientoDTO.config
        )) // Se almacena en la base de datos el levantamiento y se obtiene con su id

        if (levantamientoDTO.deterioros)
            await this.saveDeterioros(levantamientoDTO.deterioros, levantamientoInsertado, entityManager) // se insertan en la base de datos los deterioros como parte del levantamiento

        //Además se utiliza await para que la transacción espere a que se realicen todas las operaciones en los demás servicios

    }

    // Método para almacenar en la base de datos todos los deterioros pertenecientes al levantamiento

    private async saveDeterioros(deteriorosDTO: Array<DeterioroDTO>, levantamientoInsertado: Levantamiento, entityManager: EntityManager) {

        for (let index = 0; index < deteriorosDTO.length; index++) {
            const deterioroDTO: DeterioroDTO = deteriorosDTO[index]
            const levantamientoDTO: LevantamientoDTO = new LevantamientoDTO() // se crea un levantamiento DTO que será marcado con el id generado del levantamiento insertado
            levantamientoDTO.id = levantamientoInsertado.id // se marca el levantamiento con el id generado
            deterioroDTO.levantamiento = levantamientoDTO
            this.deterioroService.createDeterioro(deterioroDTO, entityManager)
        }
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
    private async createArrayLevantamientosDomain(levantamientos: Array<Levantamiento>): Promise<Array<LevantamientoDomain>> {
        const levantamientosDomain: Array<LevantamientoDomain> = new Array<LevantamientoDomain>()
        for (let index = 0; index < levantamientos.length; index++) {
            const levantamiento: Levantamiento = levantamientos[index]
            const levantamientoDomain: LevantamientoDomain = await LevantamientoDomain.createInstancie(levantamiento.id, levantamiento.fechaInicio, levantamiento.fechaFinalizado,
                levantamiento.edificacion, await levantamiento.config, await levantamiento.deterioros)
            // se resuelven las promesas
            await levantamientoDomain.obtenerIndiceCriticidad()
            await levantamientoDomain.obtenerPorcentajeData()
            levantamientosDomain.push(levantamientoDomain)
        }

        return levantamientosDomain
    }

    // Metodo para obtener los levantamientos de un edificio en especifico

    public async getLevantamientosByEdificacion(idEdificacion: number): Promise<Array<LevantamientoDomain>> {
        const levantamientos: Array<LevantamientoDomain> = new Array<LevantamientoDomain>()
        const levantamientosDB: Array<Levantamiento> = await this.getLevantamientosByEdificacionDB(idEdificacion)

        // se crean levantamientos del dominio para la realización de operaciones
        for (let index = 0; index < levantamientosDB.length; index++) {
            const levantamiento: Levantamiento = levantamientosDB[index]
            levantamientos.push(await LevantamientoDomain.createInstancie(levantamiento.id, levantamiento.fechaInicio, levantamiento.fechaFinalizado,
                levantamiento.edificacion, await levantamiento.config, await levantamiento.deterioros))
        }

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
            levantamienoDomain = await LevantamientoDomain.createInstancie(levantamiento.id, levantamiento.fechaInicio, levantamiento.fechaFinalizado,
                levantamiento.edificacion, await levantamiento.config, await levantamiento.deterioros) // se crea un levantamiento estrcuturado para ser mostrado

        return levantamienoDomain // se retorna un levantamiento con la estructura definida

    }

    public async getSistemasLevantamiento(idLevantamiento: number) {
        const levantamientoDomain: LevantamientoDomain | undefined = await this.getLevantamiento(idLevantamiento); // se obtiene el levantamiento
        let sistemasDomain: Array<Sistema> | undefined = undefined;

        if (levantamientoDomain) // si fue encontrado levantamiento
            sistemasDomain = levantamientoDomain.getSistemas() // se obtienen los sistemas del levantamiento
        // se ejcutan las operaciones asínronas
        // para la posterior serialización
        for (let index = 0; index < sistemasDomain.length; index++) {
            const sistemaDomain: Sistema = sistemasDomain[index]
            await sistemaDomain.obtenerIndiceCriticidad()
            await sistemaDomain.obtenerPorcentajeData()
        }

        return sistemasDomain;
    }

    // Metodo para obtener todos los subsistemas asociados a un sistema en especifico componente de un levantamiento
    public async getSubSistemasSistemaLevantamiento(idLevantamiento: number, idSistema: number) {
        const levantamientoDomain: LevantamientoDomain | undefined = await this.getLevantamiento(idLevantamiento); // se obtiene el levantamiento
        let subsistemas: Array<SubSistema> | undefined = undefined;

        if (levantamientoDomain) // si fue encontrado levantamiento
            subsistemas = levantamientoDomain.getSubsistemasSistema(idSistema); // se obtienen los subsistemas asociados a ese sistema componente del levantamiento

        // se ejcutan las operaciones asínronas
        // para la posterior serialización
        for (let index = 0; index < subsistemas.length; index++) {
            const subsistema: SubSistema = subsistemas[index]
            await subsistema.obtenerIndiceCriticidad()
            await subsistema.obtenerPorcentajeData()
        }

        return subsistemas;

    }

    // Metodo para obtener todos los materiales asociados a un subsistema en especifico componente de un levantamiento
    public async getMaterialesSubsistemaSistemaLevantamiento(idLevantamiento: number, idSistema: number, idSubsistema: number) {
        const levantamientoDomain: LevantamientoDomain | undefined = await this.getLevantamiento(idLevantamiento); // se obtiene el levantamiento
        let materiales: Array<Material> | undefined = undefined;

        if (levantamientoDomain) // si fue encontrado levantamiento
            materiales = levantamientoDomain.getMaterialesSubsistemaSistema(idSistema, idSubsistema); // se obtienen los materiales asociados a ese subsistema componente del levantamiento

        // se ejcutan las operaciones asínronas
        // para la posterior serialización
        for (let index = 0; index < materiales.length; index++) {
            const material: Material = materiales[index]
            await material.obtenerIndiceCriticidad()
            await material.obtenerPorcentajeData()
        }

        return materiales;

    }

    // Metodo para obtener todos los materiales asociados a un subsistema en especifico componente de un levantamiento
    public async getTiposDeteriorosMaterialSubsistemaSistemaLevantamiento(idLevantamiento: number, idSistema: number, idSubsistema: number, idMaterial: number) {
        const levantamientoDomain: LevantamientoDomain | undefined = await this.getLevantamiento(idLevantamiento); // se obtiene el levantamiento
        let tiposDeterioros: Array<TipoDeterioro> | undefined = undefined;

        if (levantamientoDomain) // si fue encontrado levantamiento
            tiposDeterioros = levantamientoDomain.getTiposDeteriorosMaterialSubsistemaSistema(idSistema, idSubsistema, idMaterial); // se obtienen los tipos de deterioro asociados a ese material componente del levantamiento

        // se ejcutan las operaciones asínronas
        // para la posterior serialización
        for (let index = 0; index < tiposDeterioros.length; index++) {
            const tipoDeterioro: TipoDeterioro = tiposDeterioros[index]
            await tipoDeterioro.obtenerCriticidad()

        }

        return tiposDeterioros;

    }

}
