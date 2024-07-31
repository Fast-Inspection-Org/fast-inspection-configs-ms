import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SubsistemaConfig } from './subsistema-config.entity';
import { EntityManager, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubsistemaConfigDTO } from './subsistema-config.dto';
import { SistemaConfig } from '../sistemas-config/sistema-config.entity';
import { MaterialConfigDTO } from '../materiales-config/material-config.dto';
import { MaterialesConfigService } from '../materiales-config/materiales-config.service';
import { SubsistemaConfigSerializable } from './subsistema-config.serializable';
import { UpdateSubsistemaConfigDTO } from './update-subsistema-config.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';


@Injectable()
export class SubsistemasConfigService {

    constructor(@InjectRepository(SubsistemaConfig) private subSistemaConfigRepository: Repository<SubsistemaConfig>,
        private materialConfigService: MaterialesConfigService, private eventEmitter: EventEmitter2) { }

    public async getAllSubsistemasConfig(idSistemaConfig: number, nombre?: String): Promise<Array<SubsistemaConfigSerializable>> {
        const subsistemasConfigSerializable: Array<SubsistemaConfigSerializable> = new Array<SubsistemaConfigSerializable>()
        // se obtienen los subsistemas config de la base de datos
        const subsistemasConfig: Array<SubsistemaConfig> = await this.subSistemaConfigRepository.find({
            where: {
                sistemaConfigId: idSistemaConfig,
                nombre: nombre ? Like(`%${nombre}%`) : nombre
            }
        })

        // se iteran los subsistemas de la base de datos para crear los objetos serializables
        for (let index = 0; index < subsistemasConfig.length; index++) {
            const subsistemaConfig: SubsistemaConfig = subsistemasConfig[index]
            subsistemasConfigSerializable.push(new SubsistemaConfigSerializable(subsistemaConfig.id, subsistemaConfig.nombre, await subsistemaConfig.cantMateriales()))
        }

        return subsistemasConfigSerializable
    }

    public async getSubSistemaConfig(idSubsistemaConfig?: number, idSistemaConfig?: number, nombre?: String): Promise<SubsistemaConfig> {
        return this.subSistemaConfigRepository.findOne({
            where: {
                id: idSubsistemaConfig,
                sistemaConfigId: idSistemaConfig,
                nombre: nombre
            }
        })
    }

    public async createSubSistemaConfig(subSistemaConfigDTO: SubsistemaConfigDTO, entityManager?: EntityManager) {
        // si no existe un subsistema con ese nombre
        if (!(await this.getSubSistemaConfig(undefined, subSistemaConfigDTO.sistemaConfig.id, subSistemaConfigDTO.nombre))) {
            if (!entityManager) // No se trata de una llamada con una transacción heredada
                await this.subSistemaConfigRepository.manager.transaction(async (transactionManager: EntityManager) => { // Se crea una transaccion para este procedimiento
                    await this.createSubSistemaConfigWithEntity(subSistemaConfigDTO, transactionManager)
                })
            else // se continua con la transacción heredada
                await this.createSubSistemaConfigWithEntity(subSistemaConfigDTO, entityManager)
        }
        else
            throw new HttpException("Ya existe un subsistema con ese nombre", HttpStatus.BAD_REQUEST)

    }

    private async createSubSistemaConfigWithEntity(subSistemaConfigDTO: SubsistemaConfigDTO, entityManager: EntityManager) {
        const subSistemaConfig: SubsistemaConfig = new SubsistemaConfig(undefined, subSistemaConfigDTO.nombre, subSistemaConfigDTO.sistemaConfig instanceof SistemaConfig ?
            subSistemaConfigDTO.sistemaConfig : new SistemaConfig(subSistemaConfigDTO.sistemaConfig.id)) // se crea el subSistemaConfig para ser insertado

        const subSistemaConfigInsertado: SubsistemaConfig = await entityManager.save(subSistemaConfig) // se inserta en la base de datos el subSistemaConfig y se obtiene una instancia con el id insertado

        if (subSistemaConfigDTO.materialesConfig)
            await this.saveMaterialesConfig(subSistemaConfigDTO.materialesConfig, subSistemaConfigInsertado, entityManager) // se inserta en la base de datos todos los materialesConfig pertenecientes al subSistemaConfig


    }

    // Metodo para insertar en la base de datos todos los materiales config pertenecientes al subSistemaConfig
    private async saveMaterialesConfig(materialesConfigDTO: Array<MaterialConfigDTO>, subSistemaConfigInsertado: SubsistemaConfig, entityManager: EntityManager) {
        // Se indica por materiales a que subSistemaConfig registrado en la base de datos pertenecen
        for (let index = 0; index < materialesConfigDTO.length; index++) {
            materialesConfigDTO[index].subsistemaConfig = subSistemaConfigInsertado // Registro
            await this.materialConfigService.createMaterialConfig(materialesConfigDTO[index], entityManager) // Se manda a insertar al servicio de materialConfig en la base de datos

        }
    }

    // Método para modificar la información de un subsistema config en específico
    public async updateSubsistemaConfig(idSubsistemaConfig: number, idSistemaConfig: number, updateSubsistemaConfigDTO: UpdateSubsistemaConfigDTO) {
        // se obtiene un subsistema config con ese nombre
        const subsistemaConfig: SubsistemaConfig = await this.getSubSistemaConfig(undefined, idSistemaConfig, updateSubsistemaConfigDTO.nombre)
        // si no fue encontrado un subsistema config con ese nombre o si el que fue encontrado fue el mismo
        if (!subsistemaConfig || subsistemaConfig.id === idSubsistemaConfig) {
            // se actualiza la información del subsistema config en la base de datos
            await this.subSistemaConfigRepository.update({ id: idSubsistemaConfig }, updateSubsistemaConfigDTO)
        }
        else
            throw new HttpException("Ya existe un subsistema con ese nombre", HttpStatus.BAD_REQUEST)

    }

    // Método para eliminar un subsistemaConfig en específico 
    public async deleteSubsistemaConfig(idSubsistemaConfig: number) {
        // se obtiene primero el subsistema config  antes de eliminarlo
        const subSistemaConfigEliminar: SubsistemaConfig | undefined = await this.subSistemaConfigRepository.findOne({
            where: {
                id: idSubsistemaConfig
            },
            relations: ['sistemaConfig'] // Solo se carga la relación subsistemaConfig
        })

        if (subSistemaConfigEliminar) {
            await this.subSistemaConfigRepository.delete({ id: idSubsistemaConfig })
            // se emite el evento
            await this.eventEmitter.emitAsync("accionCritica", subSistemaConfigEliminar.sistemaConfig.configVersion)
        }
        else
            throw new HttpException("No existe un Subsistema Config con ese id", HttpStatus.BAD_REQUEST)
    }
}
