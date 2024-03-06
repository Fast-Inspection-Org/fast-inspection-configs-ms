import { Injectable } from '@nestjs/common';
import { SubsistemaConfig } from './subsistema-config.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SubsistemaConfigDTO } from './subsistema-config.dto';
import { SistemaConfig } from '../sistemas-config/sistema-config.entity';
import { MaterialConfigDTO } from '../materiales-config/material-config.dto';
import { MaterialesConfigService } from '../materiales-config/materiales-config.service';


@Injectable()
export class SubsistemasConfigService {

    constructor(@InjectRepository(SubsistemaConfig) private subSistemaConfigRepository: Repository<SubsistemaConfig>,
        private materialConfigService: MaterialesConfigService) { }

    public async createSubSistemaConfig(subSistemaConfigDTO: SubsistemaConfigDTO, entityManager?: EntityManager) {
        if (!entityManager) // No se trata de una llamada con una transacción heredada
            await this.subSistemaConfigRepository.manager.transaction(async (transactionManager: EntityManager) => { // Se crea una transaccion para este procedimiento
                await this.createSubSistemaConfigWithEntity(subSistemaConfigDTO, transactionManager)
            })
        else // se continua con la transacción heredada
            await this.createSubSistemaConfigWithEntity(subSistemaConfigDTO, entityManager)

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

}
