import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SistemaConfig } from './sistema-config.entity';
import { EntityManager, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SistemaConfigDTO } from './sistema-config.dto';
import { Herramienta } from '../herramientas/herramienta.entity';
import { Config } from '../config.entity';
import { SubsistemaConfigDTO } from '../subsistemas-config/subsistema-config.dto';
import { SubsistemasConfigService } from '../subsistemas-config/subsistemas-config.service';
import { SistemaConfigSerializable } from './sistema-config.serializable';
import { UpdateSistemaConfigDTO } from './update-sistema-config.dto';
import { HerramientasService } from '../herramientas/herramientas.service';
import { EventEmitter2 } from '@nestjs/event-emitter';


@Injectable()
export class SistemasConfigService {

    constructor(@InjectRepository(SistemaConfig) private sistemaConfigRepository: Repository<SistemaConfig>,
        private subSistemaConfigService: SubsistemasConfigService, private herramientaService: HerramientasService, private eventEmitter: EventEmitter2) { }



    public async getSistemaConfig(id?: number, nombre?: String, configVersion?: number) {
        return await this.sistemaConfigRepository.findOne({
            where: {
                id: id,
                nombre: nombre,
                configVersion: configVersion
            }
        })
    }


    public async createSistemaConfig(sistemaConfigDTO: SistemaConfigDTO, entityManager?: EntityManager) {
        // si no existe un sistema con ese nombre
        if (!(await this.getSistemaConfig(undefined, sistemaConfigDTO.nombre, sistemaConfigDTO.config.version))) { // si no existe el sistema config
            if (!entityManager) // No se trata de una llamada con una transacción heredada
                await this.sistemaConfigRepository.manager.transaction(async (transactionManager: EntityManager) => { // Se crea una transaccion para este procedimiento
                    await this.createSistemaConfigWithEntityManager(sistemaConfigDTO, transactionManager)
                })
            else // se continua con la transacción heredada
                await this.createSistemaConfigWithEntityManager(sistemaConfigDTO, entityManager)
        }
        else {

            throw new HttpException("Ya existe un sistema con el mismo nombre", HttpStatus.BAD_REQUEST);
        }
    }

    // Método para actualizar la información de un Sistema Config
    public async updateSistemaConfigDTO(idSistemaConfig: number, updateSistemaConfigDTO: UpdateSistemaConfigDTO /* representa los datos a actualizar del sistema config */) {
        const sistemaConfig: SistemaConfig = await this.getSistemaConfig(undefined /*se indica que no se va a filtar por este campo */,
            updateSistemaConfigDTO.nombre, updateSistemaConfigDTO.configVersion)

        if (!sistemaConfig || sistemaConfig.id === idSistemaConfig) { // si no existe un configuración con el mismo nombre o si la que existe es ella misma (significa esto ultimo que el usuario  cambió el nombre de ese sistema config por otro)
            const sistemaConfigUpdate: SistemaConfig = await this.getSistemaConfig(idSistemaConfig) // se obtiene el sistema config a modificar
            sistemaConfigUpdate.nombre = updateSistemaConfigDTO.nombre // se actualiza el nombre
            const herramienta: Herramienta = await this.herramientaService.getHerramientaById(updateSistemaConfigDTO.herramienta.id) // se obtiene la herramienta

            if (herramienta) { // si fue encontrada herramienta con ese id
                sistemaConfigUpdate.herramientaId = herramienta.id // se actualiza el id de la herramienta
            }
            await this.sistemaConfigRepository.save(sistemaConfigUpdate) // se actualiza la información del sistema config en la base de datos
        }
        else
            throw new HttpException("Ya existe un sistema con ese nombre" , HttpStatus.BAD_REQUEST)
    }


    // Metodo para obtener todos los sistemas config
    public async getAllSistemasConfig(versionConfig?: number, nombre?: String, nombreHerramienta?: String): Promise<Array<SistemaConfigSerializable>> {
        const sistemasConfigSerializable: Array<SistemaConfigSerializable> = new Array<SistemaConfigSerializable>()
        // se obtienen los sistemas config que cumplen con los valores de los filtros
        const sistemasConfig: Array<SistemaConfig> = await this.sistemaConfigRepository.find({ // filtro de config
            where: {
                configVersion: versionConfig,
                nombre: nombre ? Like(`%${nombre}%`) : nombre
            }
        })

        // se fueron encontrados sistemas con esas características
        if (sistemasConfig) {
            for (let index = 0; index < sistemasConfig.length; index++) {
                const sistemaConfig: SistemaConfig = sistemasConfig[index] // se obtiene el sistema config siguiente en la iteración
                // Se añade a la lista de sistemas que van a ser serializados la información que es necesario serializar del sistema configuración
                const sistemaConfigSerializable: SistemaConfigSerializable = new SistemaConfigSerializable(sistemaConfig.id, sistemaConfig.nombre, await sistemaConfig.cantSubsistemasConfig(),
                    await sistemaConfig.getHerramienta(), sistemaConfig.configVersion) // se construye el sistema config serializable
                if ((nombreHerramienta && sistemaConfigSerializable.herramienta.nombre.toLocaleLowerCase().includes(nombreHerramienta.toString().toLocaleLowerCase()) || !nombreHerramienta))
                    sistemasConfigSerializable.push(sistemaConfigSerializable)
            }
        }

        return sistemasConfigSerializable
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

            // Si no existe un sistema config con el mismo nombre en esa configuración

            // Se crea el sistemaConfig
            const sistemaConfig: SistemaConfig = new SistemaConfig(undefined, sistemaConfigDTO.nombre, herramientaAsignada, sistemaConfigDTO.config
                instanceof Config ? sistemaConfigDTO.config : new Config(sistemaConfigDTO.config.version)) // se crea un sistema config listo para ser insertado

            const sistemaConfigInsertado: SistemaConfig = await entityManager.save(sistemaConfig) // se inserta en la base de datos el sistema de configuracion, y se obtiene la instancia  insertada con un id

            if (sistemaConfigDTO.subSistemasConfig)
                await this.saveSubSistemasConfig(sistemaConfigDTO.subSistemasConfig, sistemaConfigInsertado, entityManager) // se inserta en la base de datos los subSistemasConfig pertenecientes a este sistemaConfig

        }
        else
            throw new HttpException("Herramienta no encontrada dentro de la configuración", HttpStatus.BAD_REQUEST)
    }


    // Metodo para insertar todos los subSistemasConfigs pertenecientes al sistemaConfig
    private async saveSubSistemasConfig(subSistemasConfigDTO: Array<SubsistemaConfigDTO>, sistemaConfigInsertado: SistemaConfig, entityManager: EntityManager) {
        // Se indica por subsistemasConfig a que sistemaConfig registrado en la base de datos pertenecen
        for (let index = 0; index < subSistemasConfigDTO.length; index++) {
            subSistemasConfigDTO[index].sistemaConfig = sistemaConfigInsertado // Registro
            await this.subSistemaConfigService.createSubSistemaConfig(subSistemasConfigDTO[index], entityManager) // Se manda a insertar al servicio de subSistemaConfig en la base de datos
        }
    }

    // Método para eliminar un sistema config en específico
    public async deleteSistemaConfig(idSistemaConfig: number) {
        // se obtiene primero el sistema config  antes de eliminarlo
        const sistemaConfigEliminar: SistemaConfig | undefined = await this.sistemaConfigRepository.findOne({
            where: {
                id: idSistemaConfig
            }
        })

        if (sistemaConfigEliminar) {
            await this.sistemaConfigRepository.delete({ id: idSistemaConfig })
            // se emite el evento
            await this.eventEmitter.emitAsync("accionCritica", sistemaConfigEliminar.configVersion)
        }
        else
            throw new HttpException("No existe un Sistema Config con ese id", HttpStatus.BAD_REQUEST)
    }

    // Operaciones

    // Método para determinar la herramienta del sistema al cual pertenece un material dado
    public async getHerramientaSistemaMaterial(idMaterial: number, versionConfig: number): Promise<Herramienta | undefined> {
        let herramienta: Herramienta | undefined = undefined
        // se obtienen todos los sistemas de la base de datos
        const sistemasConfig: Array<SistemaConfig> = await this.sistemaConfigRepository.find({ // se otienen todos los sistemas pertenecientes a una configuración
            where: {
                configVersion: versionConfig
            }
        })

        for (let index = 0; index < sistemasConfig.length && !herramienta; index++) {
            const sistemaConfig: SistemaConfig = sistemasConfig[index]
            if (await sistemaConfig.isContainsMaterial(idMaterial)) // si el sistema config contiene al material
                herramienta = await sistemaConfig.herramienta
        }

        return herramienta
    }
}
