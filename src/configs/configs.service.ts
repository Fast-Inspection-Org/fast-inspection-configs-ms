import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Config, ConfigOrderBy } from './config.entity';
import { EntityManager, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigDTO } from './config.dto';
import { HerramientaAnalisisCriticidadService } from './herramienta-analisis-criticidad/herramienta-analisis-criticidad.service';
import { IndiceCalculableIntervaloService } from './indice-calculable-intervalo/indice-calculable-intervalo.service';
import { IndiceCalculableSinIntervaloService } from './indice-calculable-sin-intervalo/indice-calculable-sin-intervalo.service';
import { SistemasConfigService } from './sistemas-config/sistemas-config.service';
import { SistemaConfigDTO } from './sistemas-config/sistema-config.dto';
import { HerramientaDTO } from './herramientas/herramienta.dto';
import { TipoHerramienta } from './herramientas/herramienta.entity';
import { IndiceCalculableDTO } from './indice-calculable/indice-calculable.dto';
import { TipoIndiceCalculable } from './indice-calculable/indice-calculable.entity';
import { UpdateConfigDTO } from './config-update.dto';




@Injectable()
export class ConfigsService {
    lastConfig: Config | undefined
    constructor(@InjectRepository(Config) private configuracionRepository: Repository<Config>,
        private herramientaAnalisisCriticidadService: HerramientaAnalisisCriticidadService,
        private indiceCalculableIntervaloService: IndiceCalculableIntervaloService,
        private indiceCalculableSinIntervaloService: IndiceCalculableSinIntervaloService,
        private sistemaConfigService: SistemasConfigService) { }

    //Metodo para obtener todas  las configuraciones
    public async getAllConfigs(orderBy: ConfigOrderBy, version?: number, nombre?: String) {

        const orderObject = {}
        if (orderBy === ConfigOrderBy.Nombre)
            orderObject[orderBy] = "ASC"
        else if (orderBy === ConfigOrderBy.Version)
            orderObject[orderBy] = "DESC"

        return await this.configuracionRepository.find({
            where: {
                version: version,
                nombre: nombre ? Like(`%${nombre}%`) : nombre
            },
            order: orderObject,

        })
    }

    // Metodo para obtener la configuración más reciente
    public async getLastConfig(): Promise<Config> | undefined {
        if (!this.lastConfig) { // Si no hay cargada ninguna configuración en caché
            const maxVersion = await this.configuracionRepository
                .createQueryBuilder('config')
                .select('MAX(config.version)', 'max')
                .getRawOne();
            if (maxVersion.max) { // si fue encontrada un maxima version

                this.lastConfig = await this.configuracionRepository.findOne({
                    where: {
                        version: maxVersion.max
                    }
                })
            }
        }


        return this.lastConfig
    }

    // Metodo para obtener una configuración con una versión en específico
    public async getConfigByVersion(versionConfig: number) {
        return await this.configuracionRepository.findOne({
            where: {
                version: versionConfig
            }
        })

    }

    // Méotodo para obtener una configuración con un nombre en especifico (para validar repitencias de nombre)
    public async getConfigByName(nombreConfig: String): Promise<Config> {
        return await this.configuracionRepository.findOneBy({
            nombre: nombreConfig
        })
    }


    // Metodo para crear una nueva configuración basada en otra (Replicación de Configuración)
    public async createConfigByOtherConfig(versionOtherConfig: number, nombreConfig: String, descripcionConfig: String) {
        const otherConfig: Config = await this.getConfigByVersion(versionOtherConfig) // se obtiene la otra configuración
        const configDTO: ConfigDTO = new ConfigDTO() // se crea una config dto para ser almacenada en la base de datos
        await configDTO.constuirDTO(nombreConfig, descripcionConfig, await otherConfig.herramientas, await otherConfig.indicesCalculables,
            await otherConfig.sistemasConfig) // se construye un DTO con la información de la configuración a replicar
        await this.createConfig(configDTO) // Luego se inserta en la base de datos dicha configuración
    }



    // Metodo para crear una nueva configuración
    public async createConfig(cofingDTO: ConfigDTO, entityManager?: EntityManager) {
        if (!await this.getConfigByName(cofingDTO.nombre)) { // si no existe un configuración con el mismo nombre
            if (!entityManager) // No se trata de una llamada con una transacción heredada
                await this.configuracionRepository.manager.transaction(async (transactionManager: EntityManager) => { // Se crea una transaccion para este procedimiento
                    await this.createConfigWithEntitiManager(cofingDTO, transactionManager)
                })
            else // se continua con la transacción heredada
                await this.createConfigWithEntitiManager(cofingDTO, entityManager)
        }
        else
            throw new HttpException({ message: "Ya existe una configuración con ese nombre" }, HttpStatus.BAD_REQUEST)
    }

    // Metodo auxiliar para crear una configuración con la entityManager correspondiente
    private async createConfigWithEntitiManager(configDTO: ConfigDTO, entityManager: EntityManager) {

        const configInsertada: Config = await entityManager.save(new Config(undefined, configDTO.nombre, configDTO.descripcion)) // Se almacena en la base de datos la configuracion y se obtiene con su id
        if (configDTO.herramientas)
            await this.saveHerramientasConfig(configDTO.herramientas, configInsertada, entityManager) // se insertan las herramientas pertenecientes a esta configuración en la base de datos
        if (configDTO.indicesCalculables)
            await this.saveIndicesCalculables(configDTO.indicesCalculables, configInsertada, entityManager) // se insertan los indicesCalculables por Intervalo pertenecientes a esta configuración en la base de datos
        if (configDTO.sistemasConfigs)
            await this.saveSistemasConfig(configDTO.sistemasConfigs, configInsertada, entityManager) // se insertan los sistemasConfig  pertenecientes a esta configuración en la base de datos
        //Además se utiliza await para que la transacción espere a que se realicen todas las operaciones en los demás servicios

    }

    // Metodo para registrar en la base de datos los indicesCalculablesIntervalo que forman parte de una configuracion
    private async saveIndicesCalculables(indicesCalculablesIntervaloDTO: Array<IndiceCalculableDTO>, configInsertada: Config, entityManager: EntityManager) {
        // Se indica por indices calculables a que configuracion registrada en la base de datos pertenecen
        for (let index = 0; index < indicesCalculablesIntervaloDTO.length; index++) {
            indicesCalculablesIntervaloDTO[index].config = configInsertada
            if (indicesCalculablesIntervaloDTO[index].tipo === TipoIndiceCalculable.InidiceCalculableIntervalo) // si se trata de un indice calculable tipo intervalos
                await this.indiceCalculableIntervaloService.createIndiceCalculableIntervalo(indicesCalculablesIntervaloDTO[index], entityManager) // se manda a insertar al servicio los indices con intervalo
            else
                await this.indiceCalculableSinIntervaloService.createIndiceCalculableSinIntervalo(indicesCalculablesIntervaloDTO[index], entityManager) // se manda a insertar al servicio los indices sin intervalos
        }
    }


    // Metodo para registrar en la base de datos las herramientas que forman parte de una configuracion
    private async saveHerramientasConfig(herramientas: Array<HerramientaDTO>, configInsertada: Config, entityManager: EntityManager) {
        // Se indica por herramientas a que configuracion registrada en la base de datos pertenecen
        for (let index = 0; index < herramientas.length; index++) {
            herramientas[index].config = configInsertada

            if (herramientas[index].tipo === TipoHerramienta.AnalisisCriticidad) // si se trata de una herramienta analisis criticidad
                await this.herramientaAnalisisCriticidadService.createHerramientaAnalisisCriticidad(herramientas[index], entityManager) // se manda a insertar al servicio de herramienta analisis criticidad la herramienta en la base de datos   

        }

    }

    // Metodo para registrar en la base de datos las herramientas que forman parte de una configuracion
    private async saveSistemasConfig(sistemasConfigDTO: Array<SistemaConfigDTO>, configInsertada: Config, entityManager: EntityManager) {
        // Se indica por sistemas de configuracion a que configuracion registrada en la base de datos pertenecen

        for (let index = 0; index < sistemasConfigDTO.length; index++) {
            sistemasConfigDTO[index].config = configInsertada

            await this.sistemaConfigService.createSistemaConfig(sistemasConfigDTO[index], entityManager) // se manda a insertar al servicio el sistema config  
        }

    }



    // Metodo para eliminar una configuración en especifico (Metodo de super Administrador)
    public async deleteConfig(versionConfig: number) {
        if (await this.getConfigByVersion(versionConfig)) // si existe la config
            await this.configuracionRepository.delete({ version: versionConfig })
        else
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'No exite una configuración con ese id',
            }, HttpStatus.INTERNAL_SERVER_ERROR);

    }


    // Metodo para eliminar todas las configuraciones (Método de super administrador)
    public async deleteAllConfigs() {

        await this.configuracionRepository.delete({})
    }

    // Método para modificar una configuración en específico

    public async updateConfig(version: number, updateConfigDTO: UpdateConfigDTO) {
        const config: Config = await this.getConfigByName(updateConfigDTO.nombre)
        if (!config || config.version === version) // si no existe un configuración con el mismo nombre o si la que existe es ella misma (significa esto ultimo que el usuario no cambió el nombre)
            await this.configuracionRepository.update({ version: version }, updateConfigDTO)
        else
            throw new HttpException({ message: "Ya existe una configuración con ese nombre" }, HttpStatus.BAD_REQUEST)
    }
}
