import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SistemaConfig } from './sistema-config.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SistemaConfigDTO } from './sistema-config.dto';
import { Herramienta } from '../herramientas/herramienta.entity';
import { Config } from '../config.entity';
import { SubsistemaConfigDTO } from '../subsistemas-config/subsistema-config.dto';
import { SubsistemasConfigService } from '../subsistemas-config/subsistemas-config.service';


@Injectable()
export class SistemasConfigService {

    constructor(@InjectRepository(SistemaConfig) private sistemaConfigRepository: Repository<SistemaConfig>,
        private subSistemaConfigService: SubsistemasConfigService) { }

    public async createSistemaConfig(sistemaConfigDTO: SistemaConfigDTO, entityManager?: EntityManager) {
        if (!await this.getSistemaConfigIdConfigVersion(sistemaConfigDTO.nombre, sistemaConfigDTO.config.version)) { // si no existe el sistema config
            if (!entityManager) // No se trata de una llamada con una transacción heredada
                await this.sistemaConfigRepository.manager.transaction(async (transactionManager: EntityManager) => { // Se crea una transaccion para este procedimiento
                    await this.createSistemaConfigWithEntityManager(sistemaConfigDTO, transactionManager)
                })
            else // se continua con la transacción heredada
                await this.createSistemaConfigWithEntityManager(sistemaConfigDTO, entityManager)
        }
        else {
            console.log("Entreeqeq")
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'Sistema con igual nombre',
            }, HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }


    // Metodo para obtener todos los sistemas config
    public async getAllSistemasConfig(versionConfig?: number) {
        if (!versionConfig)
            return await this.sistemaConfigRepository.find() // no hay filtros
        else
            return await this.sistemaConfigRepository.find({ // filtro de config
                where: {
                    configVersion: versionConfig
                }
            })
    }

    private async getSistemaConfigIdConfigVersion(nombre: String, verionConfig: number) {
        return this.sistemaConfigRepository.findOne({
            where: {
                nombre: nombre,
                configVersion: verionConfig
            }
        })
    }



    private async createSistemaConfigWithEntityManager(sistemaConfigDTO: SistemaConfigDTO, entityManager: EntityManager) {
        // Primero se buscar la herramienta de la configuración asignada a ese sistema dentro del mismo contexto
        let herramientaAsignada: Herramienta | undefined = undefined;

        if (sistemaConfigDTO.herramienta.id) // si se proporcionó  un id para a herramienta

            herramientaAsignada = await entityManager.findOne(Herramienta, { // se busca una herramienta por ese id y por la configuracion
                where: {
                    "id": sistemaConfigDTO.herramienta.id,
                    "configVersion": sistemaConfigDTO.config.version
                }
            })
        else { // si no se proporcionó un id para la herramienta

            herramientaAsignada = await entityManager.findOne(Herramienta, { // se busca una herramienta en la base de datos para la misma configuración que tenga el mismo nombre
                where: {
                    "nombre": sistemaConfigDTO.herramienta.nombre,
                    "configVersion": sistemaConfigDTO.config.version
                }
            })

        }
        // fin del proceso de busqueda de la herramienta

        if (herramientaAsignada) { // si fue posible encontrar una herramienta
            // Se crea el sistemaConfig
            const sistemaConfig: SistemaConfig = new SistemaConfig(undefined, sistemaConfigDTO.nombre, herramientaAsignada, sistemaConfigDTO.config
                instanceof Config ? sistemaConfigDTO.config : new Config(sistemaConfigDTO.config.version)) // se crea un sistema config listo para ser insertado

            const sistemaConfigInsertado: SistemaConfig = await entityManager.save(sistemaConfig) // se inserta en la base de datos el sistema de configuracion, y se obtiene la instancia  insertada con un id

            if (sistemaConfigDTO.subSistemasConfig)
                await this.saveSubSistemasConfig(sistemaConfigDTO.subSistemasConfig, sistemaConfigInsertado, entityManager) // se inserta en la base de datos los subSistemasConfig pertenecientes a este sistemaConfig
        }
        else
            throw new HttpException("Herramienta no encontrada dentro de la configuración", 500)

    }


    // Metodo para insertar todos los subSistemasConfigs pertenecientes al sistemaConfig
    private async saveSubSistemasConfig(subSistemasConfigDTO: Array<SubsistemaConfigDTO>, sistemaConfigInsertado: SistemaConfig, entityManager: EntityManager) {
        // Se indica por subsistemasConfig a que sistemaConfig registrado en la base de datos pertenecen
        for (let index = 0; index < subSistemasConfigDTO.length; index++) {
            subSistemasConfigDTO[index].sistemaConfig = sistemaConfigInsertado // Registro
            await this.subSistemaConfigService.createSubSistemaConfig(subSistemasConfigDTO[index], entityManager) // Se manda a insertar al servicio de subSistemaConfig en la base de datos
        }
    }

}
