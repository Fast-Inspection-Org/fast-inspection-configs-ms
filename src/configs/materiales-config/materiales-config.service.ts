import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MaterialConfig } from './material-config.entity';
import { EntityManager, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MaterialConfigDTO } from './material-config.dto';
import { SubsistemaConfig } from '../subsistemas-config/subsistema-config.entity';
import { TipoDeterioroConfigDTO } from '../tipo-deterioros-config/tipo-deterioro-config.dto';
import { TipoDeterioroAnalisisCriticidadConfigService } from '../tipo-deterioro-analisis-criticidad-config/tipo-deterioro-analisis-criticidad-config.service';
import { TipoTipoDeterioro } from '../tipo-deterioros-config/tipo-deterioro-config.entity';
import { MaterialConfigSerializable } from './material-config.serializable';
import { UpdateMaterialConfigDTO } from './update-material-config.dto';

@Injectable()
export class MaterialesConfigService {

    constructor(@InjectRepository(MaterialConfig) private materialConfigRepository: Repository<MaterialConfig>,
        private tipoDeterioroAnalisisCriticidadConfigService: TipoDeterioroAnalisisCriticidadConfigService) { }

    // Método para obtener los materiales config

    public async getAllMaterialesConfig(idSubsistemaConfig?: number, nombre?: String): Promise<Array<MaterialConfigSerializable>> {
        const materialesConfigSerializables: Array<MaterialConfigSerializable> = new Array<MaterialConfigSerializable>()
        // se obtienen todos los materiales de la base de datos
        const materialesConfig: Array<MaterialConfig> = await this.materialConfigRepository.find({
            where: {
                subsistemaConfigId: idSubsistemaConfig,
                nombre: nombre ? Like(`%${nombre}%`) : nombre
            }
        })

        // Se iteran los materiales para crear los objetos de serialización

        for (let index = 0; index < materialesConfig.length; index++) {
            const materialConfig: MaterialConfig = materialesConfig[index]
            materialesConfigSerializables.push(new MaterialConfigSerializable(materialConfig.id, materialConfig.nombre, await materialConfig.cantTiposDeterioros()))
        }

        return materialesConfigSerializables
    }

    // Método para obtener el material config

    public async getMaterialConfig(idMaterialConfig: number, idSubsistemaConfig?: number, nombre?: String) {
        return await this.materialConfigRepository.findOne({
            where: {
                id: idMaterialConfig,
                subsistemaConfigId: idSubsistemaConfig,
                nombre: nombre
            }
        })
    }

    public async createMaterialConfig(materialConfigDTO: MaterialConfigDTO, entityManager?: EntityManager) {
        // si no existe un material con ese nombre
        if (!(await this.getMaterialConfig(undefined, materialConfigDTO.subsistemaConfig.id, materialConfigDTO.nombre))) {
            if (!entityManager) // No se trata de una llamada con una transacción heredada
                await this.materialConfigRepository.manager.transaction(async (transactionManager: EntityManager) => { // Se crea una transaccion para este procedimiento
                    await this.createMaterialConfigWithEntityManager(materialConfigDTO, transactionManager)
                })
            else // se continua con la transacción heredada
                await this.createMaterialConfigWithEntityManager(materialConfigDTO, entityManager)
        }
        else
            throw new HttpException("Ya existe un material con ese nombre", HttpStatus.BAD_REQUEST)

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

    // Método para actualizar la información de un material config

    public async updateMaterialConfig(idMaterialConfig: number, idSubsistemaConfig: number, updateMaterialConfigDTO: UpdateMaterialConfigDTO) {
        const materialConfig: MaterialConfig = await this.getMaterialConfig(undefined, idSubsistemaConfig, updateMaterialConfigDTO.nombre) // se obtiene al material con ese id de la base de datos
        // Si no hay materiales con ese nombre o si el que existe es el mismo
        if (!materialConfig || materialConfig.id === idMaterialConfig) {
           await this.materialConfigRepository.update({ id: idMaterialConfig }, updateMaterialConfigDTO) // se actualiza el material en la base de datos
        }
        else
            throw new HttpException("Ya existe un material con ese nombre", HttpStatus.BAD_REQUEST)
    }

    // Método para eliminar un material config de la base de datos
    public async deleteMaterialConfig(idMaterialConfig: number) {
        await this.materialConfigRepository.delete({ id: idMaterialConfig })
    }
}
