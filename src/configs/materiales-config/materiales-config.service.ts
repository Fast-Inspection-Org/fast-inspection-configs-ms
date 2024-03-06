import { Injectable } from '@nestjs/common';
import { MaterialConfig } from './material-config.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialConfigDTO } from './material-config.dto';
import { SubsistemaConfig } from '../subsistemas-config/subsistema-config.entity';
import { TipoDeterioroConfigDTO } from '../tipo-deterioros-config/tipo-deterioro-config.dto';
import { TipoDeterioroAnalisisCriticidadConfigService } from '../tipo-deterioro-analisis-criticidad-config/tipo-deterioro-analisis-criticidad-config.service';
import { TipoTipoDeterioro } from '../tipo-deterioros-config/tipo-deterioro-config.entity';

@Injectable()
export class MaterialesConfigService {

    constructor(@InjectRepository(MaterialConfig) private materialConfigRepository: Repository<MaterialConfig>,
        private tipoDeterioroAnalisisCriticidadConfigService: TipoDeterioroAnalisisCriticidadConfigService) { }

    public async createMaterialConfig(materialConfigDTO: MaterialConfigDTO, entityManager?: EntityManager) {
        if (!entityManager) // No se trata de una llamada con una transacción heredada
            await this.materialConfigRepository.manager.transaction(async (transactionManager: EntityManager) => { // Se crea una transaccion para este procedimiento
                await this.createMaterialConfigWithEntityManager(materialConfigDTO, transactionManager)
            })
        else // se continua con la transacción heredada
            await this.createMaterialConfigWithEntityManager(materialConfigDTO, entityManager)

    }

    private async createMaterialConfigWithEntityManager(materialConfigDTO: MaterialConfigDTO, entityManager: EntityManager) {

        const materialConfig: MaterialConfig = new MaterialConfig(undefined, materialConfigDTO.nombre, materialConfigDTO.subsistemaConfig instanceof SubsistemaConfig ?
            materialConfigDTO.subsistemaConfig : new SubsistemaConfig(materialConfigDTO.subsistemaConfig.id)) // se crea un materialConfig para ser insertado en la base de datos

        const materialConfigInsertado: MaterialConfig = await entityManager.save(materialConfig) // se inserta el material config en la base de datos

        if (materialConfigDTO.tiposDeteriorosConfig)
           await this.saveTipoDeteriorosConfig(materialConfigDTO.tiposDeteriorosConfig, materialConfigInsertado, entityManager) /*Se insertan todos los tipos de deterioro pertenecientes
    a este material */

    }

    // Metodo para insertar en la base de datos todos los tipo de deteioros config pertenecientes al materialConfig
    private async saveTipoDeteriorosConfig(tipoDeteriorosConfigDTO: Array<TipoDeterioroConfigDTO>, materialConfigInsertado: MaterialConfig, entityManager: EntityManager) {
        // Se indica por materiales a que subSistemaConfig registrado en la base de datos pertenecen
        for (let index = 0; index < tipoDeteriorosConfigDTO.length; index++) {
            tipoDeteriorosConfigDTO[index].materialConfig = materialConfigInsertado // Se Registra
            if (tipoDeteriorosConfigDTO[index].tipo === TipoTipoDeterioro.TipoDeterioroAnalisisCriticidad) // Si si trata de un tipoDeterioro AnalisisCriticidad
                await this.tipoDeterioroAnalisisCriticidadConfigService.createTipoDeterioroAnalisisCriticidadConfig(tipoDeteriorosConfigDTO[index], entityManager) // Se manda al servicio de tipoDeterioroAnalisisCriticidad a insertar en la base de datos al tipoDeterioro

        }
    }
}
