import { Injectable } from '@nestjs/common';
import { Config } from './config.entity';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigDTO } from './config.dto';
import { HerramientaAnalisisCriticidadService } from './herramienta-analisis-criticidad/herramienta-analisis-criticidad.service';
import { HerramientaAnalisisCriticidadDTO } from './herramienta-analisis-criticidad/herramienta-analisis-criticidad.dto';
import { IndiceCalculableIntervaloDTO } from './indice-calculable-intervalo/indice-calculable-intervalo.dto';
import { IndiceCalculableIntervaloService } from './indice-calculable-intervalo/indice-calculable-intervalo.service';
import { IndiceCalculableSinIntervaloService } from './indice-calculable-sin-intervalo/indice-calculable-sin-intervalo.service';
import { SistemasConfigService } from './sistemas-config/sistemas-config.service';
import { IndiceCalculableSinIntervaloDTO } from './indice-calculable-sin-intervalo/indice-calculable-sin-intervalo.dto';
import { SistemaConfigDTO } from './sistemas-config/sistema-config.dto';


@Injectable()
export class ConfigsService {
    lastConfig: Config | undefined
    constructor(@InjectRepository(Config) private configuracionRepository: Repository<Config>,
        private herramientaAnalisisCriticidadService: HerramientaAnalisisCriticidadService,
        private indiceCalculableIntervaloService: IndiceCalculableIntervaloService,
        private indiceCalculableSinIntervaloService: IndiceCalculableSinIntervaloService,
        private sistemaConfigService: SistemasConfigService) { }

    //Metodo para obtener todas  las configuraciones
    public async getAllConfigs() {
        return await this.configuracionRepository.find({
            relations: { "sistemasConfig": true }
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

    // Metodo para obtener una configuración en especifico
    public async getConfig(versionConfig: number): Promise<Config> {

        return await this.configuracionRepository.findOne({
            where: {
                version: versionConfig
            }
        })
    }


    // Metodo para crear una nueva configuración basada en otra
    public async createConfigByOtherConfig(versionOtherConfig: number) {
        const otherConfig: Config = await this.getConfig(versionOtherConfig) // se obtiene la otra configuración
        otherConfig.replicarVersion() // se replica la versión de esta configuración para ser añadida a la base de datos como una configuración nueva
        await this.configuracionRepository.save(otherConfig)
    }



    // Metodo para crear una nueva configuración
    public async createConfig(cofingDTO: ConfigDTO, entityManager?: EntityManager) {
        if (!entityManager) // No se trata de una llamada con una transacción heredada
            await this.configuracionRepository.manager.transaction(async (transactionManager: EntityManager) => { // Se crea una transaccion para este procedimiento
                await this.createConfigWithEntitiManager(cofingDTO, transactionManager)
            })
        else // se continua con la transacción heredada
            await this.createConfigWithEntitiManager(cofingDTO, entityManager)
    }

    // Metodo auxiliar para crear una configuración con la entityManager correspondiente
    private async createConfigWithEntitiManager(configDTO: ConfigDTO, entityManager: EntityManager) {
        const configInsertada: Config = await entityManager.save(this.configuracionRepository.create(configDTO)) // Se almacena en la base de datos la configuracion y se obtiene con su id
        if (configDTO.herramientasAnalisisCriticidad)
            await this.saveHerramientasConfig(configDTO.herramientasAnalisisCriticidad, configInsertada, entityManager) // se insertan las herramientas pertenecientes a esta configuración en la base de datos
        if (configDTO.indicesCalculablesIntervalo)
            await this.saveIndicesCalculablesIntervalo(configDTO.indicesCalculablesIntervalo, configInsertada, entityManager) // se insertan los indicesCalculables por Intervalo pertenecientes a esta configuración en la base de datos
        if (configDTO.indicesCalculablesSinIntervalo)
            await this.saveIndicesCalculablesSinIntervalo(configDTO.indicesCalculablesSinIntervalo, configInsertada, entityManager) // se insertan los indicesCalculables sin Intervalo pertenecientes a esta configuración en la base de datos
        if (configDTO.sistemasConfigs)
            await this.saveSistemasConfig(configDTO.sistemasConfigs, configInsertada, entityManager) // se insertan los sistemasConfig  pertenecientes a esta configuración en la base de datos
        //Además se utiliza await para que la transacción espere a que se realicen todas las operaciones en los demás servicios
    }

    // Metodo para registrar en la base de datos los indicesCalculablesIntervalo que forman parte de una configuracion
    private async saveIndicesCalculablesIntervalo(indicesCalculablesIntervaloDTO: Array<IndiceCalculableIntervaloDTO>, configInsertada: Config, entityManager: EntityManager) {
        for (let index = 0; index < indicesCalculablesIntervaloDTO.length; index++) {
            indicesCalculablesIntervaloDTO[index].config = configInsertada
            await this.indiceCalculableIntervaloService.createIndiceCalculableIntervalo(indicesCalculablesIntervaloDTO[index], entityManager) /// se manda a insertar al servicio los indices
        }
    }

    // Metodo para registrar en la base de datos los indicesCalculablesSinIntervalo que forman parte de una configuracion
    private async saveIndicesCalculablesSinIntervalo(indicesCalculablesSinIntervaloDTO: Array<IndiceCalculableSinIntervaloDTO>, configInsertada: Config, entityManager: EntityManager) {
        for (let index = 0; index < indicesCalculablesSinIntervaloDTO.length; index++) {
            indicesCalculablesSinIntervaloDTO[index].config = configInsertada
            await this.indiceCalculableSinIntervaloService.createIndiceCalculableSinIntervalo(indicesCalculablesSinIntervaloDTO[index], entityManager) // se manda insertar al servicio los indices
        }
    }

    // Metodo para registrar en la base de datos las herramientas que forman parte de una configuracion
    private async saveHerramientasConfig(herramientas: Array<HerramientaAnalisisCriticidadDTO>, configInsertada: Config, entityManager: EntityManager) {
        // Se indica por herramientas a que configuracion registrada en la base de datos pertenecen
        for (let index = 0; index < herramientas.length; index++) {
            herramientas[index].config = configInsertada
            await this.herramientaAnalisisCriticidadService.createHerramientaAnalisisCriticidad(herramientas[index], entityManager) // se manda a insertar al servicio de herramienta analisis criticidad la herramienta en la base de datos   
        }

    }

    // Metodo para registrar en la base de datos las herramientas que forman parte de una configuracion
    private async saveSistemasConfig(sistemasConfigDTO: Array<SistemaConfigDTO>, configInsertada: Config, entityManager: EntityManager) {
        // Se indica por herramientas a que configuracion registrada en la base de datos pertenecen
        for (let index = 0; index < sistemasConfigDTO.length; index++) {
            sistemasConfigDTO[index].config = configInsertada
            
            await this.sistemaConfigService.createSistemaConfig(sistemasConfigDTO[index], entityManager) // se manda a insertar al servicio el sistema config  
        }

    }



    // Metodo para eliminar una configuración en especifico (Metodo de super Administrador)
    public deleteConfig(versionConfig: number) {
        try {
            this.configuracionRepository.delete({ version: versionConfig })
        } catch (error) {
            //Se lanza HTTP Exception
        }
    }


    // Metodo para eliminar todas las configuraciones (Método de super administrador)
    public async deleteAllConfigs() {
        await this.configuracionRepository.delete({})
    }
}
